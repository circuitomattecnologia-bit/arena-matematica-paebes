// ======================================================
// FIREBASE SERVICE
// ARENA MATEMÁTICA — RUMO AO PAEBES
// ======================================================

import { FIREBASE } from "./firebase-config.js";

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
  push,
  onValue,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

let app = null;
let db = null;

// ------------------------------------------------------
// INICIALIZAÇÃO
// ------------------------------------------------------

export function iniciarFirebase() {
  if (!FIREBASE.habilitado) {
    console.warn("Firebase desabilitado.");
    return null;
  }

  if (!app) {
    app = initializeApp(FIREBASE.configuracao);
    db = getDatabase(app);
  }

  return db;
}

export function banco() {
  if (!db) iniciarFirebase();
  return db;
}

// ------------------------------------------------------
// UTILIDADES
// ------------------------------------------------------

function caminhoSeguro(valor = "") {
  return String(valor)
    .trim()
    .replace(/[.#$/[\]]/g, "-");
}

export function criarId(prefixo = "item") {
  return (
    prefixo +
    "-" +
    Date.now() +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

// ------------------------------------------------------
// ARENAS
// ------------------------------------------------------

export async function salvarArena(codigo, dados) {
  const database = banco();
  const id = caminhoSeguro(codigo);

  await set(ref(database, `arenaMatematica/arenas/${id}`), {
    ...dados,
    codigo,
    atualizadoEm: serverTimestamp()
  });
}

export async function buscarArena(codigo) {
  const database = banco();
  const id = caminhoSeguro(codigo);

  const snapshot = await get(
    ref(database, `arenaMatematica/arenas/${id}`)
  );

  return snapshot.exists() ? snapshot.val() : null;
}

export function observarArena(codigo, callback) {
  const database = banco();
  const id = caminhoSeguro(codigo);

  return onValue(
    ref(database, `arenaMatematica/arenas/${id}`),
    snapshot => {
      callback(snapshot.exists() ? snapshot.val() : null);
    }
  );
}

export async function atualizarArena(codigo, dados) {
  const database = banco();
  const id = caminhoSeguro(codigo);

  await update(ref(database, `arenaMatematica/arenas/${id}`), {
    ...dados,
    atualizadoEm: serverTimestamp()
  });
}

// ------------------------------------------------------
// COMPETIDORES
// ------------------------------------------------------

export async function entrarNaArena(codigo, competidor) {
  const database = banco();

  const arenaId = caminhoSeguro(codigo);
  const jogadorId =
    competidor.id ||
    criarId("competidor");

  await set(
    ref(
      database,
      `arenaMatematica/arenas/${arenaId}/competidores/${jogadorId}`
    ),
    {
      ...competidor,
      id: jogadorId,
      xp: competidor.xp || 0,
      sequencia: competidor.sequencia || 0,
      estrelas: competidor.estrelas || 0,
      bloqueado: false,
      jaFoiBloqueado: false,
      online: true,
      entrouEm: serverTimestamp()
    }
  );

  return jogadorId;
}

export async function atualizarCompetidor(
  codigo,
  jogadorId,
  dados
) {
  const database = banco();

  const arenaId = caminhoSeguro(codigo);
  const id = caminhoSeguro(jogadorId);

  await update(
    ref(
      database,
      `arenaMatematica/arenas/${arenaId}/competidores/${id}`
    ),
    dados
  );
}

export function observarCompetidores(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `arenaMatematica/arenas/${arenaId}/competidores`
    ),
    snapshot => {
      callback(snapshot.exists() ? snapshot.val() : {});
    }
  );
}

// ------------------------------------------------------
// RESPOSTAS
// ------------------------------------------------------

export async function registrarResposta(
  codigo,
  jogadorId,
  numeroQuestao,
  resposta
) {
  const database = banco();

  const arenaId = caminhoSeguro(codigo);
  const id = caminhoSeguro(jogadorId);

  await set(
    ref(
      database,
      `arenaMatematica/arenas/${arenaId}/respostas/${id}/${numeroQuestao}`
    ),
    {
      ...resposta,
      registradaEm: serverTimestamp()
    }
  );
}

// ------------------------------------------------------
// EVENTOS AO VIVO
// ------------------------------------------------------

export async function publicarEvento(codigo, evento) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const novoEvento = push(
    ref(
      database,
      `arenaMatematica/arenas/${arenaId}/eventos`
    )
  );

  await set(novoEvento, {
    ...evento,
    criadoEm: serverTimestamp()
  });

  return novoEvento.key;
}

export function observarEventos(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `arenaMatematica/arenas/${arenaId}/eventos`
    ),
    snapshot => {
      callback(snapshot.exists() ? snapshot.val() : {});
    }
  );
}

// ------------------------------------------------------
// SISTEMA DA ESTRELA
// ------------------------------------------------------

export async function usarEstrela(
  codigo,
  atacanteId,
  alvoId
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const atacanteRef = ref(
    database,
    `arenaMatematica/arenas/${arenaId}/competidores/${caminhoSeguro(atacanteId)}`
  );

  const alvoRef = ref(
    database,
    `arenaMatematica/arenas/${arenaId}/competidores/${caminhoSeguro(alvoId)}`
  );

  const atacanteSnap = await get(atacanteRef);
  const alvoSnap = await get(alvoRef);

  if (!atacanteSnap.exists() || !alvoSnap.exists()) {
    throw new Error("Competidor não encontrado.");
  }

  const atacante = atacanteSnap.val();
  const alvo = alvoSnap.val();

  if ((atacante.estrelas || 0) < 1) {
    throw new Error("Você não possui estrela disponível.");
  }

  if (alvo.jaFoiBloqueado) {
    throw new Error(
      "Este competidor já foi bloqueado e está protegido até o fim da Arena."
    );
  }

  await update(atacanteRef, {
    estrelas: (atacante.estrelas || 0) - 1
  });

  await update(alvoRef, {
    bloqueado: true,
    jaFoiBloqueado: true
  });

  await publicarEvento(codigo, {
    tipo: "bloqueio",
    atacanteId,
    alvoId,
    mensagem:
      "⭐ Uma estrela foi usada! Um competidor ficará fora desta questão."
  });
}

// ------------------------------------------------------
// LIBERAR BLOQUEIO APÓS A QUESTÃO
// ------------------------------------------------------

export async function liberarBloqueados(codigo) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const jogadoresRef = ref(
    database,
    `arenaMatematica/arenas/${arenaId}/competidores`
  );

  const snapshot = await get(jogadoresRef);

  if (!snapshot.exists()) return;

  const jogadores = snapshot.val();

  const tarefas = Object.entries(jogadores).map(
    ([id, jogador]) => {
      if (!jogador.bloqueado) return Promise.resolve();

      return update(
        ref(
          database,
          `arenaMatematica/arenas/${arenaId}/competidores/${id}`
        ),
        {
          bloqueado: false
        }
      );
    }
  );

  await Promise.all(tarefas);
}

// ------------------------------------------------------
// RANKING
// ------------------------------------------------------

export function observarRanking(codigo, callback) {
  return observarCompetidores(codigo, jogadores => {
    const ranking = Object.values(jogadores)
      .sort((a, b) => {
        if ((b.xp || 0) !== (a.xp || 0)) {
          return (b.xp || 0) - (a.xp || 0);
        }

        return (b.sequencia || 0) - (a.sequencia || 0);
      });

    callback(ranking);
  });
}

// ------------------------------------------------------
// ENCERRAR ARENA
// ------------------------------------------------------

export async function encerrarArena(codigo) {
  await atualizarArena(codigo, {
    status: "encerrada",
    encerradaEm: serverTimestamp()
  });
}

// ------------------------------------------------------
// EXCLUIR ARENA
// ------------------------------------------------------

export async function excluirArena(codigo) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  await remove(
    ref(database, `arenaMatematica/arenas/${arenaId}`)
  );
}
