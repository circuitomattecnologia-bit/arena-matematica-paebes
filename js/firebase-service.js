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
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

let app = null;
let db = null;

const RAIZ = "arenaMatematica";

export function iniciarFirebase() {
  if (!app) {
    if (getApps().length > 0) {
      app = getApp();
    } else {
      app = initializeApp(FIREBASE.configuracao);
    }

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

  await set(ref(database, `${RAIZ}/arenas/${arenaId}`), arena);

  return arena;
}

export async function buscarArena(codigo) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

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

  if (
    arena.entradaLiberada === false ||
    arena.aceitaNovos === false
  ) {
    throw new Error("A entrada de estudantes está bloqueada.");
  }

  const competidoresExistentes = arena.competidores || {};

  const nomeRecebido = String(
    competidor.nome ||
    competidor.name ||
    ""
  ).trim().toLowerCase();

  const encontrados = Object.entries(competidoresExistentes)
    .filter(([id, dados]) =>
      String(dados?.nome || "")
        .trim()
        .toLowerCase() === nomeRecebido
    )
    .sort(([, a], [, b]) =>
      Number(b?.xp || 0) - Number(a?.xp || 0)
    );

  const registroExistente =
    encontrados.length > 0 ? encontrados[0] : null;

  const idInformado =
    competidor.id ||
    competidor.jogadorId ||
    competidor.uid ||
    null;

  const idInformadoExiste =
    Boolean(
      idInformado &&
      competidoresExistentes[idInformado]
    );

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

    xp: Number(dadosAnteriores.xp ?? competidor.xp ?? 0),

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

    bloqueado: Boolean(
      dadosAnteriores.bloqueado ??
      competidor.bloqueado ??
      false
    ),

    jaFoiBloqueado: Boolean(
      dadosAnteriores.jaFoiBloqueado ??
      competidor.jaFoiBloqueado ??
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
    throw new Error("ID do competidor não informado.");
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

export async function buscarCompetidor(codigo, jogadorId) {
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

export function observarCompetidores(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/competidores`
    ),
    snapshot => {
      callback(snapshot.exists() ? snapshot.val() : {});
    }
  );
}

export async function removerCompetidor(codigo, jogadorId) {
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

export function observarRespostas(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(database, `${RAIZ}/arenas/${arenaId}/respostas`),
    snapshot => {
      callback(snapshot.exists() ? snapshot.val() : {});
    }
  );
}

// ======================================================
// EVENTOS EM TEMPO REAL
// ======================================================

export async function registrarEvento(codigo, evento = {}) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const referencia = push(
    ref(database, `${RAIZ}/arenas/${arenaId}/eventos`)
  );

  await set(referencia, {
    ...evento,
    criadoEm: serverTimestamp()
  });

  return referencia.key;
}

export function observarEventos(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(database, `${RAIZ}/arenas/${arenaId}/eventos`),
    snapshot => {
      callback(snapshot.exists() ? snapshot.val() : {});
    }
  );
}

// ======================================================
// CONTROLE
// ======================================================

export async function liberarEntrada(codigo) {
  await atualizarArena(codigo, {
    entradaLiberada: true,
    aceitaNovos: true
  });
}

export async function bloquearEntrada(codigo) {
  await atualizarArena(codigo, {
    entradaLiberada: false,
    aceitaNovos: false
  });
}

export async function definirStatusArena(codigo, status) {
  await atualizarArena(codigo, { status });
}

// ======================================================
// INICIALIZAÇÃO
// ======================================================

iniciarFirebase();

console.log(
  "🔥 Serviço Firebase da Arena Matemática carregado."
);
