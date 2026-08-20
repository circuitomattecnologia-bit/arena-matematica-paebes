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


// ======================================================
// CONFIGURAÇÃO
// ======================================================

let app = null;
let db = null;

const RAIZ = "arenaMatematica";


// ======================================================
// INICIAR FIREBASE
// ======================================================

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


// ======================================================
// BANCO
// ======================================================

export function banco() {

  if (!db) {
    iniciarFirebase();
  }

  return db;
}


// ======================================================
// CAMINHO SEGURO
// ======================================================

export function caminhoSeguro(valor = "") {

  return String(valor)
    .trim()
    .toUpperCase()
    .replace(/[.#$\[\]\/]/g, "-");
}


// ======================================================
// CRIAR ID
// ======================================================

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
// CAMINHO DA ARENA
// ======================================================

function caminhoArena(codigo) {

  return `${RAIZ}/arenas/${caminhoSeguro(codigo)}`;
}


// ======================================================
// SALVAR ARENA
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

  console.log("✅ Arena salva:", codigo);

  return arena;
}


// ======================================================
// BUSCAR ARENA
// ======================================================

export async function buscarArena(codigo) {

  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const snapshot = await get(
    ref(database, `${RAIZ}/arenas/${arenaId}`)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val();
}


// ======================================================
// OBSERVAR ARENA EM TEMPO REAL
// ======================================================

export function observarArena(codigo, callback) {

  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const referencia = ref(
    database,
    `${RAIZ}/arenas/${arenaId}`
  );

  return onValue(referencia, snapshot => {

    if (!snapshot.exists()) {
      callback(null);
      return;
    }

    callback(snapshot.val());
  });
}


// ======================================================
// ATUALIZAR ARENA
// ======================================================

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

  console.log("🔄 Arena atualizada:", codigo);
}


// ======================================================
// REMOVER ARENA
// ======================================================

export async function removerArena(codigo) {

  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  await remove(
    ref(database, `${RAIZ}/arenas/${arenaId}`)
  );
}


// ======================================================
// ENTRAR NA ARENA
// ======================================================

export async function entrarNaArena(codigo, competidor = {}) {

  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  // Confere se a Arena realmente existe
  const arenaSnapshot = await get(
    ref(database, `${RAIZ}/arenas/${arenaId}`)
  );

  if (!arenaSnapshot.exists()) {
    throw new Error("Arena não encontrada.");
  }

  const arena = arenaSnapshot.val();

  // Se existir controle de entrada e estiver bloqueado
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

const jogadorId =
  competidor.id ||
  competidor.jogadorId ||
  competidor.uid ||
  (registroExistente ? registroExistente[0] : null) ||
  criarId("competidor");

const dadosAnteriores =
  registroExistente ? registroExistente[1] : {};

 const dadosCompetidor = {

  ...dadosAnteriores,
  ...competidor,

  id: jogadorId,
  jogadorId: jogadorId,

  nome:
    competidor.nome ||
    competidor.name ||
    dadosAnteriores.nome ||
    "Competidor",

  xp: registroExistente
    ? Number(dadosAnteriores.xp || 0)
    : Number(competidor.xp || 0),

  sequencia: registroExistente
    ? Number(
        dadosAnteriores.sequencia ??
        dadosAnteriores.streak ??
        0
      )
    : Number(
        competidor.sequencia ??
        competidor.streak ??
        0
      ),

  acertos: registroExistente
    ? Number(
        dadosAnteriores.acertos ??
        dadosAnteriores.hits ??
        0
      )
    : Number(
        competidor.acertos ??
        competidor.hits ??
        0
      ),

  estrelas: registroExistente
    ? Number(dadosAnteriores.estrelas || 0)
    : Number(competidor.estrelas || 0),

  bloqueado: registroExistente
    ? Boolean(dadosAnteriores.bloqueado)
    : Boolean(competidor.bloqueado),

  jaFoiBloqueado: registroExistente
    ? Boolean(dadosAnteriores.jaFoiBloqueado)
    : Boolean(competidor.jaFoiBloqueado),

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

  console.log(
    "👤 Competidor entrou:",
    dadosCompetidor.nome,
    codigo
  );

  return jogadorId;
}


// ======================================================
// ATUALIZAR COMPETIDOR
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


// ======================================================
// BUSCAR COMPETIDOR
// ======================================================

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

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val();
}


// ======================================================
// OBSERVAR COMPETIDORES
// ======================================================

export function observarCompetidores(
  codigo,
  callback
) {

  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const referencia = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/competidores`
  );

  return onValue(referencia, snapshot => {

    if (!snapshot.exists()) {
      callback({});
      return;
    }

    callback(snapshot.val());
  });
}


// ======================================================
// REMOVER COMPETIDOR
// ======================================================

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
// STATUS ONLINE
// ======================================================

export async function definirCompetidorOnline(
  codigo,
  jogadorId,
  online = true
) {

  return atualizarCompetidor(
    codigo,
    jogadorId,
    {
      online: Boolean(online)
    }
  );
}


// ======================================================
// SALVAR RESPOSTA
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

  await set(
    referencia,
    {
      ...resposta,
      jogadorId,
      criadoEm: serverTimestamp()
    }
  );

  return referencia.key;
}


// ======================================================
// OBSERVAR RESPOSTAS
// ======================================================

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
// REGISTRAR EVENTO
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

  await set(
    referencia,
    {
      ...evento,
      criadoEm: serverTimestamp()
    }
  );

  return referencia.key;
}


// ======================================================
// OBSERVAR EVENTOS
// ======================================================

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
// LIBERAR ENTRADA
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


// ======================================================
// BLOQUEAR NOVAS ENTRADAS
// ======================================================

export async function bloquearEntrada(codigo) {

  await atualizarArena(
    codigo,
    {
      entradaLiberada: false,
      aceitaNovos: false
    }
  );
}


// ======================================================
// STATUS DA ARENA
// ======================================================

export async function definirStatusArena(
  codigo,
  status
) {

  await atualizarArena(
    codigo,
    {
      status
    }
  );
}


// ======================================================
// INICIAR AUTOMATICAMENTE
// ======================================================

iniciarFirebase();

console.log(
  "🔥 Serviço Firebase da Arena Matemática carregado."
);
