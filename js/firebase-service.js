// ======================================================
// FIREBASE SERVICE
// ARENA MATEMÁTICA — RUMO AO PAEBES
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
  set,
  get,
  update,
  remove,
  push,
  onValue,
  serverTimestamp,
  runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

let app = null;
let db = null;

const RAIZ = "arenaMatematica";

// ======================================================
// INICIALIZAÇÃO
// ======================================================

export function iniciarFirebase() {
  if (!app) {
    app = getApps().length > 0
      ? getApp()
      : initializeApp(FIREBASE.configuracao);

    db = getDatabase(app);
    console.log("🔥 Firebase inicializado.");
  }

  return db;
}

export function banco() {
  if (!db) iniciarFirebase();
  return db;
}

export function caminhoSeguro(valor = "") {
  return String(valor)
    .trim()
    .toUpperCase()
    .replace(/[.#$\[\]\/]/g, "-");
}

export function criarId(prefixo = "id") {
  return (
    prefixo +
    "-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

// ======================================================
// ARENA
// ======================================================

export async function salvarArena(codigo, dados = {}) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const arena = {
    ...dados,
    codigo: String(codigo).trim().toUpperCase(),
    atualizadoEm: serverTimestamp()
  };

  await set(
    ref(database, `${RAIZ}/arenas/${arenaId}`),
    arena
  );

  return arena;
}

export async function buscarArena(codigo) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  if (!arenaId) return null;

  const snapshot = await get(
    ref(database, `${RAIZ}/arenas/${arenaId}`)
  );

  if (!snapshot.exists()) return null;

  return snapshot.val();
}

export function observarArena(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(database, `${RAIZ}/arenas/${arenaId}`),
    snapshot => {
      callback(snapshot.exists() ? snapshot.val() : null);
    }
  );
}

export async function atualizarArena(codigo, dados = {}) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  await update(
    ref(database, `${RAIZ}/arenas/${arenaId}`),
    {
      ...dados,
      atualizadoEm: serverTimestamp()
    }
  );
}

export async function removerArena(codigo) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  await remove(
    ref(database, `${RAIZ}/arenas/${arenaId}`)
  );
}

// ======================================================
// RETOMAR ARENA EXISTENTE
// ======================================================

export async function retomarArena(codigo) {
  const arena = await buscarArena(codigo);

  if (!arena) {
    throw new Error("Arena não encontrada.");
  }

  if (arena.status === "encerrada") {
    throw new Error(
      "Esta Arena já foi encerrada. Utilize a função de reutilizar Arena para criar uma nova disputa."
    );
  }

  return arena;
}

// ======================================================
// ENTRADA / REENTRADA DO ESTUDANTE
// ======================================================

export async function entrarNaArena(codigo, competidor = {}) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const arenaSnapshot = await get(
    ref(database, `${RAIZ}/arenas/${arenaId}`)
  );

  if (!arenaSnapshot.exists()) {
    throw new Error("Arena não encontrada.");
  }

  const arena = arenaSnapshot.val();
  const competidoresExistentes = arena.competidores || {};

  const nomeRecebido = String(
    competidor.nome || competidor.name || ""
  )
    .trim()
    .toLowerCase();

  const encontrados = Object.entries(competidoresExistentes)
    .filter(([, dados]) =>
      String(dados?.nome || "")
        .trim()
        .toLowerCase() === nomeRecebido
    )
    .sort(
      ([, a], [, b]) =>
        Number(b?.xp || 0) - Number(a?.xp || 0)
    );

  const registroExistente =
    encontrados.length > 0 ? encontrados[0] : null;

  const idInformado =
    competidor.id ||
    competidor.jogadorId ||
    competidor.uid ||
    null;

  const idInformadoExiste = Boolean(
    idInformado && competidoresExistentes[idInformado]
  );

  const ehReentrada = Boolean(
    idInformadoExiste || registroExistente
  );

  const dadosRegistroExistente = idInformadoExiste
    ? competidoresExistentes[idInformado]
    : registroExistente
      ? registroExistente[1]
      : null;

  if (dadosRegistroExistente?.bloqueado === true) {
    throw new Error(
      "Seu acesso a esta Arena está bloqueado pelo professor."
    );
  }

  // Reentrada continua permitida mesmo se novas entradas estiverem bloqueadas
  if (!ehReentrada) {
    if (
      arena.entradaLiberada === false ||
      arena.aceitaNovos === false
    ) {
      throw new Error(
        "A entrada de novos estudantes está bloqueada."
      );
    }

    const limite = Math.max(
      1,
      Number(arena.limite || 60)
    );

    const totalAtual =
      Object.keys(competidoresExistentes).length;

    if (totalAtual >= limite) {
      throw new Error(
        "O limite de participantes desta Arena foi atingido."
      );
    }
  }

  const jogadorId =
    (idInformadoExiste ? idInformado : null) ||
    (registroExistente ? registroExistente[0] : null) ||
    idInformado ||
    criarId("competidor");

  const dadosAnteriores =
    competidoresExistentes[jogadorId] ||
    (registroExistente ? registroExistente[1] : {});

  const dadosCompetidor = {
    ...dadosAnteriores,
    ...competidor,

    id: jogadorId,
    jogadorId,

    nome:
      competidor.nome ||
      competidor.name ||
      dadosAnteriores.nome ||
      "Competidor",

    xp: Number(
      dadosAnteriores.xp ??
      competidor.xp ??
      0
    ),

    sequencia: Number(
      dadosAnteriores.sequencia ??
      dadosAnteriores.streak ??
      competidor.sequencia ??
      competidor.streak ??
      0
    ),

    acertos: Number(
      dadosAnteriores.acertos ??
      dadosAnteriores.hits ??
      competidor.acertos ??
      competidor.hits ??
      0
    ),

    estrelas: Number(
      dadosAnteriores.estrelas ??
      competidor.estrelas ??
      0
    ),

    questaoAtual: Number(
      dadosAnteriores.questaoAtual ??
      dadosAnteriores.questionIndex ??
      competidor.questaoAtual ??
      competidor.questionIndex ??
      0
    ),

    pontosRegulares: Number(
      dadosAnteriores.pontosRegulares ??
      competidor.pontosRegulares ??
      0
    ),

    regularConcluida: Boolean(
      dadosAnteriores.regularConcluida ??
      competidor.regularConcluida ??
      false
    ),

    bossFinalConcluido: Boolean(
      dadosAnteriores.bossFinalConcluido ??
      competidor.bossFinalConcluido ??
      false
    ),

    bossFinalAcertou: Boolean(
      dadosAnteriores.bossFinalAcertou ??
      competidor.bossFinalAcertou ??
      false
    ),

    bloqueado: Boolean(
      dadosAnteriores.bloqueado ??
      competidor.bloqueado ??
      false
    ),

    diamanteConquistado: Boolean(
      dadosAnteriores.diamanteConquistado ??
      competidor.diamanteConquistado ??
      false
    ),

    diamanteDisponivel: Boolean(
      dadosAnteriores.diamanteDisponivel ??
      competidor.diamanteDisponivel ??
      false
    ),

    diamanteUsado: Boolean(
      dadosAnteriores.diamanteUsado ??
      competidor.diamanteUsado ??
      false
    ),

    diamanteBloqueioPendente: Boolean(
      dadosAnteriores.diamanteBloqueioPendente ??
      false
    ),

    online: true,

    entrouEm:
      dadosAnteriores.entrouEm ||
      serverTimestamp(),

    atualizadoEm: serverTimestamp()
  };

  await set(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}`
    ),
    dadosCompetidor
  );

  return jogadorId;
}

// ======================================================
// COMPETIDORES / RANKING
// ======================================================

export async function atualizarCompetidor(
  codigo,
  jogadorId,
  dados = {}
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  if (!jogadorId) {
    throw new Error(
      "ID do competidor não informado."
    );
  }

  await update(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}`
    ),
    {
      ...dados,
      atualizadoEm: serverTimestamp()
    }
  );
}

export async function buscarCompetidor(
  codigo,
  jogadorId
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const snapshot = await get(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}`
    )
  );

  if (!snapshot.exists()) return null;

  return snapshot.val();
}

export function observarCompetidores(
  codigo,
  callback
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/competidores`
    ),
    snapshot => {
      callback(
        snapshot.exists()
          ? snapshot.val()
          : {}
      );
    }
  );
}

export async function removerCompetidor(
  codigo,
  jogadorId
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  await remove(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}`
    )
  );
}

// ======================================================
// RESPOSTAS
// ======================================================

export async function salvarResposta(
  codigo,
  jogadorId,
  resposta = {}
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const referencia = push(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/respostas/${jogadorId}`
    )
  );

  await set(referencia, {
    ...resposta,
    jogadorId,
    criadoEm: serverTimestamp()
  });

  return referencia.key;
}

export function observarRespostas(
  codigo,
  callback
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/respostas`
    ),
    snapshot => {
      callback(
        snapshot.exists()
          ? snapshot.val()
          : {}
      );
    }
  );
}

// ======================================================
// EVENTOS EM TEMPO REAL
// ======================================================

export async function registrarEvento(
  codigo,
  evento = {}
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const referencia = push(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/eventos`
    )
  );

  await set(referencia, {
    ...evento,
    criadoEm: serverTimestamp()
  });

  return referencia.key;
}

export function observarEventos(
  codigo,
  callback
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/eventos`
    ),
    snapshot => {
      callback(
        snapshot.exists()
          ? snapshot.val()
          : {}
      );
    }
  );
}

// ======================================================
// DUELO MATEMÁTICO
// ======================================================

export async function criarDuelo(
  codigo,
  duelo = {}
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const dueloId =
    duelo.id || criarId("duelo");

  const dados = {
    ...duelo,

    id: dueloId,
    status: "ativo",

    vencedorId: null,
    vencedorNome: null,

    respostas: {},

    criadoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp()
  };

  await set(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/dueloAtual`
    ),
    dados
  );

  return dueloId;
}

export function observarDueloAtual(
  codigo,
  callback
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/dueloAtual`
    ),
    snapshot =>
      callback(
        snapshot.exists()
          ? snapshot.val()
          : null
      )
  );
}

export async function responderDuelo(
  codigo,
  jogadorId,
  resposta
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const dueloRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/dueloAtual`
  );

  const snap = await get(dueloRef);

  if (!snap.exists()) {
    throw new Error(
      "Não há duelo ativo."
    );
  }

  const duelo = snap.val();

  if (duelo.status !== "ativo") {
    return {
      correta: false,
      vencedor: false,
      encerrado: true
    };
  }

  const participantes = [
    duelo.competidor1Id,
    duelo.competidor2Id
  ];

  if (!participantes.includes(jogadorId)) {
    throw new Error(
      "Este competidor não participa do duelo atual."
    );
  }

  if (
    duelo.respostas &&
    duelo.respostas[jogadorId]
  ) {
    return {
      correta: Boolean(
        duelo.respostas[jogadorId].correta
      ),
      vencedor:
        duelo.vencedorId === jogadorId,
      jaRespondido: true
    };
  }

  const correta =
    Number(resposta) ===
    Number(duelo.correta);

  const competidorRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}`
  );

  const competidorSnap =
    await get(competidorRef);

  const competidor =
    competidorSnap.exists()
      ? competidorSnap.val()
      : {};

  await set(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/dueloAtual/respostas/${jogadorId}`
    ),
    {
      resposta: Number(resposta),
      correta,
      nome:
        competidor.nome ||
        "Competidor",
      respondidoEm:
        serverTimestamp()
    }
  );

  let vencedor = false;

  if (correta) {
    const vencedorRef = ref(
      database,
      `${RAIZ}/arenas/${arenaId}/dueloAtual/vencedorId`
    );

    const resultado =
      await runTransaction(
        vencedorRef,
        atual => {
          if (atual) return;
          return jogadorId;
        }
      );

    vencedor =
      resultado.committed &&
      resultado.snapshot.val() === jogadorId;

    if (vencedor) {
      const bonusXP =
        Number(
          duelo.bonusXP || 200
        );

      // XP usando transação para impedir perda de pontos
      await runTransaction(
        ref(
          database,
          `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}/xp`
        ),
        atual =>
          Number(atual || 0) + bonusXP
      );

      await update(
        dueloRef,
        {
          status: "encerrado",

          vencedorId:
            jogadorId,

          vencedorNome:
            competidor.nome ||
            "Competidor",

          encerradoEm:
            serverTimestamp(),

          atualizadoEm:
            serverTimestamp()
        }
      );

      await registrarEvento(
        codigo,
        {
          nome:
            "DUELO MATEMÁTICO",

          tipo:
            "duelo_encerrado",

          vencedorId:
            jogadorId,

          vencedorNome:
            competidor.nome ||
            "Competidor",

          dueloId:
            duelo.id ||
            null,

          bonusXP
        }
      );
    }
  }

  return {
    correta,
    vencedor,
    bonusXP:
      Number(
        duelo.bonusXP || 200
      )
  };
}

export async function encerrarDuelo(
  codigo,
  motivo = "encerrado"
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  await update(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/dueloAtual`
    ),
    {
      status: motivo,
      encerradoEm:
        serverTimestamp(),
      atualizadoEm:
        serverTimestamp()
    }
  );
}

// ======================================================
// BOSS FINAL
// ======================================================

export async function liberarBossFinal(
  codigo,
  boss = {}
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const dados = {
    status: "liberado",

    titulo:
      boss.titulo ||
      "BOSS FINAL",

    descriptor:
      boss.descriptor ||
      "DESAFIO FINAL",

    level:
      boss.level ||
      "BOSS",

    text:
      boss.text ||
      "Uma escola realizou uma atividade com 40 estudantes. 75% participaram e, entre os participantes, 1/3 acertou o desafio final. Quantos estudantes acertaram?",

    options:
      boss.options ||
      [
        "8 estudantes",
        "10 estudantes",
        "12 estudantes",
        "15 estudantes",
        "30 estudantes"
      ],

    correct:
      Number(
        boss.correct ?? 1
      ),

    bonusXP:
      Number(
        boss.bonusXP || 300
      ),

    liberadoEm:
      serverTimestamp(),

    atualizadoEm:
      serverTimestamp()
  };

  await set(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/bossFinal`
    ),
    dados
  );

  await registrarEvento(
    codigo,
    {
      nome:
        "BOSS FINAL",

      tipo:
        "boss_final",

      texto:
        "👑 BOSS FINAL liberado! O desafio final já está disponível."
    }
  );

  return dados;
}

export async function responderBossFinal(
  codigo,
  jogadorId,
  resposta
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const bossRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/bossFinal`
  );

  const bossSnap = await get(bossRef);

  if (!bossSnap.exists()) {
    throw new Error(
      "Boss Final ainda não foi liberado."
    );
  }

  const boss = bossSnap.val();

  if (boss.status !== "liberado") {
    throw new Error(
      "Boss Final não está ativo."
    );
  }

  const respostaRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/bossFinal/respostas/${jogadorId}`
  );

  const respostaSnap =
    await get(respostaRef);

  if (respostaSnap.exists()) {
    return {
      ...respostaSnap.val(),
      jaRespondido: true
    };
  }

  const correta =
    Number(resposta) ===
    Number(boss.correct);

  const bonusXP =
    correta
      ? Number(
          boss.bonusXP || 300
        )
      : 0;

  if (correta && bonusXP > 0) {
    await runTransaction(
      ref(
        database,
        `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}/xp`
      ),
      atual =>
        Number(atual || 0) + bonusXP
    );
  }

  await atualizarCompetidor(
    codigo,
    jogadorId,
    {
      bossFinalConcluido: true,
      bossFinalAcertou: correta
    }
  );

  const competidor =
    await buscarCompetidor(
      codigo,
      jogadorId
    );

  const resultado = {
    jogadorId,

    nome:
      competidor?.nome ||
      "Competidor",

    resposta:
      Number(resposta),

    correta,

    bonusXP,

    respondidoEm:
      serverTimestamp()
  };

  await set(
    respostaRef,
    resultado
  );

  return resultado;
}

export function observarBossFinal(
  codigo,
  callback
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/bossFinal`
    ),
    snapshot =>
      callback(
        snapshot.exists()
          ? snapshot.val()
          : null
      )
  );
}

// ======================================================
// EVENTOS ESPECIAIS
// ======================================================

export async function criarEventoEspecial(
  codigo,
  evento = {}
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const eventoId =
    evento.id ||
    criarId("especial");

  const dados = {
    ...evento,

    id: eventoId,
    status: "ativo",

    respostas: {},

    criadoEm:
      serverTimestamp(),

    atualizadoEm:
      serverTimestamp()
  };

  await set(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/eventoEspecialAtual`
    ),
    dados
  );

  await registrarEvento(
    codigo,
    {
      nome:
        evento.nome ||
        "EVENTO ESPECIAL",

      tipo:
        "evento_especial",

      eventoId,

      momento:
        new Date().toISOString()
    }
  );

  return eventoId;
}

export function observarEventoEspecial(
  codigo,
  callback
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/eventoEspecialAtual`
    ),
    snapshot =>
      callback(
        snapshot.exists()
          ? snapshot.val()
          : null
      )
  );
}

export async function responderEventoEspecial(
  codigo,
  jogadorId,
  resposta
) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const eventoRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/eventoEspecialAtual`
  );

  const eventoSnap =
    await get(eventoRef);

  if (!eventoSnap.exists()) {
    throw new Error(
      "Não há Evento Especial ativo."
    );
  }

  const evento =
    eventoSnap.val();

  if (evento.status !== "ativo") {
    throw new Error(
      "Este Evento Especial já foi encerrado."
    );
  }

  if (
    evento.tipo === "cacada" &&
    evento.liderId &&
    evento.liderId === jogadorId
  ) {
    throw new Error(
      "O líder acompanha a Caçada como alvo da rodada."
    );
  }

  const respostaRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/eventoEspecialAtual/respostas/${jogadorId}`
  );

  const respostaAnterior =
    await get(respostaRef);

  if (respostaAnterior.exists()) {
    return {
      ...respostaAnterior.val(),
      jaRespondido: true
    };
  }

  const correta =
    Number(resposta) ===
    Number(evento.correta);

  const competidor =
    await buscarCompetidor(
      codigo,
      jogadorId
    ) || {};

  const bonusXP =
    correta
      ? Number(
          evento.bonusXP || 0
        )
      : 0;

  if (correta && bonusXP > 0) {
    await runTransaction(
      ref(
        database,
        `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}/xp`
      ),
      atual =>
        Number(atual || 0) + bonusXP
    );
  }

  let shieldNovo =
    Number(
      competidor.shield ??
      competidor.escudo ??
      0
    );

  if (
    correta &&
    evento.tipo === "escudo"
  ) {
    shieldNovo += 1;

    await atualizarCompetidor(
      codigo,
      jogadorId,
      {
        shield: shieldNovo
      }
    );
  }

  const resultado = {
    jogadorId,

    nome:
      competidor.nome ||
      "Competidor",

    resposta:
      Number(resposta),

    correta,

    bonusXP,

    shield:
      shieldNovo,

    respondidoEm:
      serverTimestamp()
  };

  await set(
    respostaRef,
    resultado
  );

  return resultado;
}

// ======================================================
// CONTROLE DA ARENA
// ======================================================

export async function liberarEntrada(codigo) {
  await atualizarArena(
    codigo,
    {
      entradaLiberada: true,
      aceitaNovos: true
    }
  );
}

export async function bloquearEntrada(codigo) {
  await atualizarArena(
    codigo,
    {
      entradaLiberada: false,
      aceitaNovos: false
    }
  );
}

export async function definirStatusArena(
  codigo,
  status
) {
  const permitidos = [
    "preparacao",
    "iniciada",
    "pausada",
    "continuada",
    "encerrada"
  ];

  if (!permitidos.includes(status)) {
    throw new Error(
      "Status da Arena inválido."
    );
  }

  await atualizarArena(
    codigo,
    {
      status
    }
  );
}

// ======================================================
// INICIALIZAÇÃO
// ======================================================

iniciarFirebase();

console.log(
  "🔥 Serviço Firebase da Arena Matemática carregado."
);
