// ======================================================
// DIAMANTE — PODER DE BLOQUEIO
// ARENA MATEMÁTICA — RUMO AO PAEBES
// VERSÃO ROBUSTA — FILA + CONSUMO ATÔMICO
// ======================================================

import { FIREBASE } from "./firebase-config.js";

import {
  initializeApp,
  getApps,
  getApp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

let app = null;
let db = null;

const RAIZ = "arenaMatematica";

// ======================================================
// FIREBASE
// ======================================================

function banco() {
  if (!app) {
    app = getApps().length
      ? getApp()
      : initializeApp(FIREBASE.configuracao);

    db = getDatabase(app);
  }

  return db;
}

function caminhoSeguro(valor = "") {
  return String(valor)
    .trim()
    .toUpperCase()
    .replace(/[.#$\[\]\/]/g, "-");
}

function criarBloqueioId() {
  return (
    "diamante-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

// ======================================================
// BLOQUEIO VISUAL LOCAL
// ======================================================

function bloquearInteracaoLocalDuranteDiamante() {
  try {
    if (typeof window !== "undefined") {
      window.__diamanteBloqueioAtivo = true;
    }

    if (typeof document !== "undefined") {
      document
        .querySelectorAll("#options .option")
        .forEach(botao => {
          botao.disabled = true;
          botao.style.pointerEvents = "none";
          botao.style.opacity = ".55";
        });

      const confirmar =
        document.getElementById("confirmButton");

      if (confirmar) {
        confirmar.disabled = true;
        confirmar.style.pointerEvents = "none";
      }
    }

    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.__diamanteBloqueioAtivo = false;
      }

      if (typeof document !== "undefined") {
        document
          .querySelectorAll("#options .option")
          .forEach(botao => {
            botao.disabled = false;
            botao.style.pointerEvents = "";
            botao.style.opacity = "";
            botao.classList.remove("selected");
          });

        const confirmar =
          document.getElementById("confirmButton");

        if (confirmar) {
          confirmar.style.pointerEvents = "";
          confirmar.disabled = true;
        }
      }
    }, 1900);

  } catch (erro) {
    console.error(
      "Falha ao processar bloqueio visual do Diamante:",
      erro
    );
  }
}

// ======================================================
// META DO DIAMANTE
// ======================================================

export function metaDiamante(questoes = []) {
  const lista =
    Array.isArray(questoes)
      ? questoes
      : [];

  const totalMaximo =
    lista.reduce(
      (soma, questao) =>
        soma +
        Math.max(
          0,
          Number(questao?.baseXP || 0)
        ),
      0
    );

  if (totalMaximo > 0) {
    return Math.ceil(
      totalMaximo * 0.60
    );
  }

  return Math.ceil(
    lista.length *
    100 *
    0.60
  );
}

// ======================================================
// CONCEDER DIAMANTE
// ======================================================

export async function concederDiamanteSeAtingiu(
  codigo,
  jogadorId,
  pontosRegulares,
  questoes = []
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const meta =
    metaDiamante(questoes);

  if (
    !jogadorId ||
    Number(pontosRegulares || 0) < meta
  ) {
    return {
      conquistado: false,
      disponivel: false,
      meta
    };
  }

  const jogadorRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}`
  );

  let concedidoAgora = false;

  const resultado =
    await runTransaction(
      jogadorRef,
      atual => {
        if (!atual) {
          return atual;
        }

        const jaConquistado =
          atual.diamanteConquistado === true;

        const jaUsado =
          atual.diamanteUsado === true;

        // Já conquistou e ainda não usou:
        // garante que o Diamante continue disponível.
        if (
          jaConquistado &&
          !jaUsado
        ) {
          return {
            ...atual,

            pontosRegulares:
              Math.max(
                Number(
                  atual.pontosRegulares || 0
                ),
                Number(
                  pontosRegulares || 0
                )
              ),

            diamanteConquistado:
              true,

            diamanteDisponivel:
              true
          };
        }

        // Já utilizou: nunca concede outro Diamante
        // dentro da mesma Arena.
        if (
          jaConquistado &&
          jaUsado
        ) {
          return atual;
        }

        concedidoAgora = true;

        return {
          ...atual,

          pontosRegulares:
            Number(
              pontosRegulares || 0
            ),

          diamanteConquistado:
            true,

          diamanteDisponivel:
            true,

          diamanteUsado:
            false,

          diamanteConquistadoEm:
            Date.now()
        };
      }
    );

  const final =
    resultado.snapshot.exists()
      ? resultado.snapshot.val()
      : null;

  return {
    conquistado:
      Boolean(
        final?.diamanteConquistado
      ),

    concedidoAgora:
      Boolean(
        resultado.committed &&
        concedidoAgora
      ),

    disponivel:
      Boolean(
        final?.diamanteDisponivel
      ),

    usado:
      Boolean(
        final?.diamanteUsado
      ),

    meta
  };
}

// ======================================================
// USAR DIAMANTE
// ======================================================

export async function usarDiamanteBloqueio(
  codigo,
  autorId,
  alvoId
) {
  if (
    !codigo ||
    !autorId ||
    !alvoId
  ) {
    throw new Error(
      "Dados do Poder de Bloqueio incompletos."
    );
  }

  if (
    String(autorId) ===
    String(alvoId)
  ) {
    throw new Error(
      "Você não pode bloquear a si mesmo."
    );
  }

  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const arenaRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}`
  );

  let bloqueioCriado = null;
  let motivoFalha = "";

  const resultado =
    await runTransaction(
      arenaRef,
      arena => {
        if (!arena) {
          motivoFalha =
            "Arena não encontrada.";
          return;
        }

        const competidores =
          arena.competidores || {};

        const autor =
          competidores[autorId];

        const alvo =
          competidores[alvoId];

        if (!autor) {
          motivoFalha =
            "Seu registro não foi encontrado na Arena.";
          return;
        }

        if (!alvo) {
          motivoFalha =
            "O competidor escolhido não foi encontrado.";
          return;
        }

        if (
          autor.diamanteConquistado !== true ||
          autor.diamanteDisponivel !== true ||
          autor.diamanteUsado === true
        ) {
          motivoFalha =
            "Seu Diamante já foi utilizado ou não está disponível.";
          return;
        }

        if (
          alvo.regularConcluida === true
        ) {
          motivoFalha =
            "Este competidor já concluiu as questões regulares.";
          return;
        }

        if (
          alvo.bloqueado === true
        ) {
          motivoFalha =
            "Este competidor está bloqueado pelo professor.";
          return;
        }

        const bloqueioId =
          criarBloqueioId();

        const agora =
          Date.now();

        // ==================================================
        // FILA DE BLOQUEIOS
        // Permite que dois Diamantes diferentes tenham
        // o mesmo alvo sem fazer o segundo uso falhar.
        // ==================================================

        const filaAtual = {
          ...(
            alvo.diamanteBloqueiosPendentes ||
            {}
          )
        };

        filaAtual[bloqueioId] = {
          id: bloqueioId,
          autorId,
          criadoEm: agora
        };

        // Compatibilidade com o estudante.html atual.
        // diamanteBloqueioId aponta para o PRIMEIRO item
        // ainda pendente.
        const idsPendentes =
          Object.keys(filaAtual)
            .sort(
              (a, b) =>
                Number(
                  filaAtual[a]?.criadoEm || 0
                ) -
                Number(
                  filaAtual[b]?.criadoEm || 0
                )
            );

        const primeiroPendente =
          idsPendentes[0] ||
          bloqueioId;

        competidores[autorId] = {
          ...autor,

          diamanteDisponivel:
            false,

          diamanteUsado:
            true,

          diamanteUsadoEm:
            agora
        };

        competidores[alvoId] = {
          ...alvo,

          diamanteBloqueioPendente:
            true,

          diamanteBloqueioId:
            primeiroPendente,

          diamanteBloqueiosPendentes:
            filaAtual,

          diamanteBloqueioRecebidoEm:
            agora
        };

        const historico = {
          ...(
            arena.historicoDiamantes ||
            {}
          )
        };

        historico[bloqueioId] = {
          id:
            bloqueioId,

          autorId,

          autorNome:
            autor.nome ||
            "Competidor",

          alvoId,

          alvoNome:
            alvo.nome ||
            "Competidor",

          questaoAlvo:
            Number(
              alvo.questaoAtual ??
              alvo.questionIndex ??
              0
            ) + 1,

          status:
            "pendente",

          criadoEm:
            agora
        };

        const eventos = {
          ...(
            arena.eventos ||
            {}
          )
        };

        const eventoId =
          "diamante-publico-" +
          bloqueioId;

        eventos[eventoId] = {
          nome:
            "PODER DE BLOQUEIO",

          tipo:
            "diamante_bloqueio",

          texto:
            "💎 Um Poder de Bloqueio foi utilizado na Arena.",

          criadoEm:
            agora
        };

        bloqueioCriado =
          historico[bloqueioId];

        return {
          ...arena,
          competidores,
          historicoDiamantes:
            historico,
          eventos
        };
      }
    );

  if (
    !resultado.committed ||
    !bloqueioCriado
  ) {
    throw new Error(
      motivoFalha ||
      "Não foi possível utilizar o Diamante neste momento."
    );
  }

  return {
    ok: true,

    bloqueioId:
      bloqueioCriado.id,

    alvoId,

    mensagem:
      "Poder de Bloqueio utilizado com sucesso."
  };
}

// ======================================================
// CONSUMIR BLOQUEIO
// ======================================================

export async function consumirBloqueioDiamante(
  codigo,
  jogadorId
) {
  if (
    !codigo ||
    !jogadorId
  ) {
    return false;
  }

  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const arenaRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}`
  );

  let consumido = null;

  const resultado =
    await runTransaction(
      arenaRef,
      arena => {
        if (!arena) {
          return;
        }

        const competidores =
          arena.competidores || {};

        const jogador =
          competidores[jogadorId];

        if (!jogador) {
          return;
        }

        const fila = {
          ...(
            jogador.diamanteBloqueiosPendentes ||
            {}
          )
        };

        // ==================================================
        // COMPATIBILIDADE COM BLOQUEIOS ANTIGOS
        // ==================================================

        if (
          Object.keys(fila).length === 0 &&
          jogador.diamanteBloqueioPendente === true
        ) {
          const legadoId =
            jogador.diamanteBloqueioId ||
            (
              "diamante-legado-" +
              Date.now().toString(36)
            );

          fila[legadoId] = {
            id:
              legadoId,

            autorId:
              null,

            criadoEm:
              Number(
                jogador.diamanteBloqueioRecebidoEm ||
                Date.now()
              )
          };
        }

        const ids =
          Object.keys(fila)
            .sort(
              (a, b) =>
                Number(
                  fila[a]?.criadoEm || 0
                ) -
                Number(
                  fila[b]?.criadoEm || 0
                )
            );

        if (!ids.length) {
          return;
        }

        const bloqueioId =
          ids[0];

        const dadosBloqueio =
          fila[bloqueioId] ||
          {};

        delete fila[bloqueioId];

        const restantes =
          Object.keys(fila)
            .sort(
              (a, b) =>
                Number(
                  fila[a]?.criadoEm || 0
                ) -
                Number(
                  fila[b]?.criadoEm || 0
                )
            );

        const proximoId =
          restantes.length
            ? restantes[0]
            : null;

        const historico = {
          ...(
            arena.historicoDiamantes ||
            {}
          )
        };

        if (
          historico[bloqueioId]
        ) {
          historico[bloqueioId] = {
            ...historico[bloqueioId],

            status:
              "concluido",

            concluidoEm:
              Date.now()
          };
        }

        competidores[jogadorId] = {
          ...jogador,

          diamanteBloqueioPendente:
            restantes.length > 0,

          diamanteBloqueioId:
            proximoId,

          diamanteBloqueiosPendentes:
            fila,

          diamanteBloqueioConsumidoEm:
            Date.now(),

          diamanteBloqueiosRecebidos:
            Number(
              jogador.diamanteBloqueiosRecebidos ||
              0
            ) + 1
        };

        consumido = {
          id:
            bloqueioId,

          autorId:
            dadosBloqueio.autorId ||
            null,

          aindaHaPendentes:
            restantes.length > 0,

          proximoId
        };

        return {
          ...arena,

          competidores,

          historicoDiamantes:
            historico
        };
      }
    );

  if (
    !resultado.committed ||
    !consumido
  ) {
    return false;
  }

  bloquearInteracaoLocalDuranteDiamante();

  // Mantemos retorno booleano para compatibilidade
  // com o estudante.html existente.
  return true;
}

// ======================================================
// CONSULTAR QUANTIDADE PENDENTE
// ======================================================

export function quantidadeBloqueiosPendentes(
  competidor = {}
) {
  const fila =
    competidor?.diamanteBloqueiosPendentes ||
    {};

  const quantidade =
    Object.keys(fila).length;

  if (quantidade > 0) {
    return quantidade;
  }

  return competidor?.diamanteBloqueioPendente
    ? 1
    : 0;
}

// ======================================================
// HISTÓRICO DO PROFESSOR
// ======================================================

export function observarHistoricoDiamante(
  codigo,
  callback
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/historicoDiamantes`
    ),

    snapshot =>
      callback(
        snapshot.exists()
          ? snapshot.val()
          : {}
      )
  );
}
