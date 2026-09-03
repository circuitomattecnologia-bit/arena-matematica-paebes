// ======================================================
// FIREBASE SERVICE
// ARENA MATEMÁTICA — NOVA FASE ADAPTATIVA 2026
// Mantém os recursos atuais e adiciona:
// identidade permanente, histórico, evolução, autorizações e evidências.
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
// INICIALIZAÇÃO / UTILITÁRIOS
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

export function normalizarNome(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-zÀ-ÿ0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

export function normalizarSenha3(valor = "") {
  return String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z]/g, "")
    .toUpperCase()
    .slice(0, 3);
}

export function senha3Valida(valor = "") {
  return /^[A-Z]{3}$/.test(normalizarSenha3(valor));
}

function nomesCompativeis(nomeDigitado = "", nomeCadastrado = "") {
  const a = normalizarNome(nomeDigitado);
  const b = normalizarNome(nomeCadastrado);

  if (!a || !b) return false;
  if (a === b) return true;

  if (a.length >= 3 && b.includes(a)) return true;
  if (b.length >= 3 && a.includes(b)) return true;

  const ta = a.split(" ").filter(Boolean);
  const tb = b.split(" ").filter(Boolean);

  if (!ta.length || !tb.length) return false;

  const todosAEmB = ta.every(
    termo => termo.length >= 2 && tb.some(x => x === termo || x.startsWith(termo))
  );

  const todosBEmA = tb.every(
    termo => termo.length >= 2 && ta.some(x => x === termo || x.startsWith(termo))
  );

  return todosAEmB || todosBEmA;
}

function escolherNomeMaisCompleto(a = "", b = "") {
  const na = String(a || "").trim();
  const nb = String(b || "").trim();
  return nb.length > na.length ? nb : na;
}

function nivelPadrao(nivel = "") {
  const n = normalizarNome(nivel);

  if (n.includes("PROFICIENTE")) return "PROFICIENTE";
  if (n === "BASICO" || n.includes("BÁSICO")) return "BÁSICO";
  if (n.includes("ABAIXO") || n === "ABB") return "ABAIXO DO BÁSICO";

  return "ABAIXO DO BÁSICO";
}

// Os limites oficiais podem ser configurados depois.
// Esta função NÃO inventa corte oficial PAEBES.
// Ela apenas aceita um nível já calculado pelo motor pedagógico.
export function normalizarNivelPedagogico(nivel = "") {
  return nivelPadrao(nivel);
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

  return snapshot.exists() ? snapshot.val() : null;
}

export function observarArena(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(database, `${RAIZ}/arenas/${arenaId}`),
    snapshot => callback(snapshot.exists() ? snapshot.val() : null)
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
// CADASTRO PERMANENTE DO ESTUDANTE
// ======================================================

export async function buscarEstudante(estudanteId) {
  if (!estudanteId) return null;

  const snapshot = await get(
    ref(banco(), `${RAIZ}/estudantes/${estudanteId}`)
  );

  return snapshot.exists() ? snapshot.val() : null;
}

export function observarEstudantes(callback) {
  return onValue(
    ref(banco(), `${RAIZ}/estudantes`),
    snapshot => callback(snapshot.exists() ? snapshot.val() : {})
  );
}

export async function salvarPerfilEstudante(estudanteId, perfil = {}) {
  if (!estudanteId) {
    throw new Error("ID permanente do estudante não informado.");
  }

  const senha = perfil.senhaIdentificacao
    ? normalizarSenha3(perfil.senhaIdentificacao)
    : null;

  if (senha && !senha3Valida(senha)) {
    throw new Error("A senha do estudante deve possuir exatamente 3 letras.");
  }

  const atual = await buscarEstudante(estudanteId);
  const perfilAtual = atual?.perfil || {};

  const nomeCompleto = escolherNomeMaisCompleto(
    perfilAtual.nomeCompleto || perfilAtual.nome || "",
    perfil.nomeCompleto || perfil.nome || ""
  );

  const dados = {
    ...perfilAtual,
    ...perfil,
    id: estudanteId,
    estudanteId,
    nomeCompleto: nomeCompleto || "Estudante",
    nome: nomeCompleto || "Estudante",
    nomeNormalizado: normalizarNome(nomeCompleto || "Estudante"),
    senhaIdentificacao: senha || perfilAtual.senhaIdentificacao || null,
    criadoEm: perfilAtual.criadoEm || serverTimestamp(),
    atualizadoEm: serverTimestamp()
  };

  await set(
    ref(banco(), `${RAIZ}/estudantes/${estudanteId}/perfil`),
    dados
  );

  return dados;
}

export async function atualizarPerfilEstudante(estudanteId, dados = {}) {
  const estudante = await buscarEstudante(estudanteId);

  if (!estudante) {
    throw new Error("Estudante não encontrado.");
  }

  return salvarPerfilEstudante(estudanteId, {
    ...(estudante.perfil || {}),
    ...dados
  });
}

async function buscarCandidatosGlobais(nome, senha) {
  const snap = await get(ref(banco(), `${RAIZ}/estudantes`));
  const estudantes = snap.exists() ? snap.val() : {};
  const senhaNorm = normalizarSenha3(senha);

  return Object.entries(estudantes)
    .filter(([, registro]) => {
      const p = registro?.perfil || {};
      return (
        normalizarSenha3(p.senhaIdentificacao) === senhaNorm &&
        nomesCompativeis(nome, p.nomeCompleto || p.nome || "")
      );
    })
    .map(([id, registro]) => ({
      estudanteId: id,
      registro
    }));
}

async function buscarCandidatosHistoricos(nome, senha) {
  const snap = await get(ref(banco(), `${RAIZ}/arenas`));
  const arenas = snap.exists() ? snap.val() : {};
  const senhaNorm = normalizarSenha3(senha);
  const mapa = new Map();

  Object.entries(arenas).forEach(([codigoArena, arena]) => {
    const competidores = arena?.competidores || {};

    Object.entries(competidores).forEach(([id, c]) => {
      if (
        normalizarSenha3(c?.senhaIdentificacao) === senhaNorm &&
        nomesCompativeis(nome, c?.nome || c?.name || "")
      ) {
        const chave = c?.estudanteId || c?.jogadorId || c?.id || id;
        const anterior = mapa.get(chave);

        const candidato = {
          estudanteId: chave,
          nome: c?.nome || c?.name || "",
          fotoPerfil: c?.fotoPerfil || c?.foto || c?.avatar || null,
          senhaIdentificacao: senhaNorm,
          origemArena: codigoArena,
          xp: Number(c?.xp || 0)
        };

        if (
          !anterior ||
          candidato.nome.length > anterior.nome.length ||
          candidato.xp > anterior.xp
        ) {
          mapa.set(chave, candidato);
        }
      }
    });
  });

  return Array.from(mapa.values());
}

export async function resolverEstudantePorNomeESenha(nome, senha) {
  const nomeNorm = normalizarNome(nome);
  const senhaNorm = normalizarSenha3(senha);

  if (nomeNorm.length < 2) {
    throw new Error("Informe seu nome.");
  }

  if (!senha3Valida(senhaNorm)) {
    throw new Error("A senha deve possuir exatamente 3 letras.");
  }

  const globais = await buscarCandidatosGlobais(nomeNorm, senhaNorm);

  if (globais.length === 1) {
    const candidato = globais[0];
    return {
      encontrado: true,
      migrado: false,
      estudanteId: candidato.estudanteId,
      perfil: candidato.registro?.perfil || {}
    };
  }

  if (globais.length > 1) {
    throw new Error(
      "Encontramos mais de um cadastro compatível. Digite uma parte maior do seu nome."
    );
  }

  const historicos = await buscarCandidatosHistoricos(nomeNorm, senhaNorm);

  if (historicos.length === 1) {
    const h = historicos[0];

    await salvarPerfilEstudante(h.estudanteId, {
      nomeCompleto: h.nome,
      senhaIdentificacao: senhaNorm,
      fotoPerfil: h.fotoPerfil || null,
      migradoDoHistorico: true,
      origemMigracao: h.origemArena
    });

    const estudante = await buscarEstudante(h.estudanteId);

    return {
      encontrado: true,
      migrado: true,
      estudanteId: h.estudanteId,
      perfil: estudante?.perfil || {}
    };
  }

  if (historicos.length > 1) {
    throw new Error(
      "Há mais de um histórico compatível. Digite seu nome com mais detalhes."
    );
  }

  return {
    encontrado: false,
    migrado: false,
    estudanteId: null,
    perfil: null
  };
}

export async function criarNovoEstudante(perfil = {}) {
  const nome = String(perfil.nomeCompleto || perfil.nome || "").trim();
  const senha = normalizarSenha3(perfil.senhaIdentificacao || "");

  if (normalizarNome(nome).length < 2) {
    throw new Error("Informe o nome do estudante.");
  }

  if (!senha3Valida(senha)) {
    throw new Error("A senha deve possuir exatamente 3 letras.");
  }

  // Evita criação duplicada quando já existe candidato único.
  const existente = await resolverEstudantePorNomeESenha(nome, senha);

  if (existente.encontrado) {
    return {
      estudanteId: existente.estudanteId,
      perfil: existente.perfil,
      novo: false
    };
  }

  const estudanteId = criarId("estudante");

  const perfilSalvo = await salvarPerfilEstudante(estudanteId, {
    ...perfil,
    nomeCompleto: nome,
    senhaIdentificacao: senha
  });

  return {
    estudanteId,
    perfil: perfilSalvo,
    novo: true
  };
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
  ).trim();

  const senhaRecebida = normalizarSenha3(
    competidor.senhaIdentificacao || ""
  );

  let estudanteId =
    competidor.estudanteId ||
    competidor.jogadorId ||
    competidor.id ||
    null;

  let perfilPermanente = estudanteId
    ? (await buscarEstudante(estudanteId))?.perfil || null
    : null;

  if (!perfilPermanente && senha3Valida(senhaRecebida)) {
    const resolvido = await resolverEstudantePorNomeESenha(
      nomeRecebido,
      senhaRecebida
    );

    if (resolvido.encontrado) {
      estudanteId = resolvido.estudanteId;
      perfilPermanente = resolvido.perfil;
    }
  }

  // Compatibilidade com registros da própria Arena.
  let registroLocal = null;

  if (estudanteId && competidoresExistentes[estudanteId]) {
    registroLocal = [estudanteId, competidoresExistentes[estudanteId]];
  }

  if (!registroLocal) {
    const candidatosLocais = Object.entries(competidoresExistentes)
      .filter(([, dados]) => {
        const senhaOk = !senha3Valida(senhaRecebida) ||
          normalizarSenha3(dados?.senhaIdentificacao) === senhaRecebida;

        return senhaOk && nomesCompativeis(
          nomeRecebido,
          dados?.nome || dados?.name || ""
        );
      });

    if (candidatosLocais.length === 1) {
      registroLocal = candidatosLocais[0];
      estudanteId =
        candidatosLocais[0][1]?.estudanteId ||
        candidatosLocais[0][1]?.jogadorId ||
        candidatosLocais[0][1]?.id ||
        candidatosLocais[0][0];
    } else if (candidatosLocais.length > 1 && senha3Valida(senhaRecebida)) {
      throw new Error(
        "Há mais de um participante compatível. Digite uma parte maior do seu nome."
      );
    }
  }

  let ehReentrada = Boolean(
    estudanteId && competidoresExistentes[estudanteId]
  ) || Boolean(registroLocal);

  // Primeiro acesso de estudante genuinamente novo.
  if (!estudanteId && !ehReentrada) {
    if (!senha3Valida(senhaRecebida)) {
      throw new Error("Crie uma senha pessoal com exatamente 3 letras.");
    }

    const criado = await criarNovoEstudante({
      nomeCompleto: nomeRecebido,
      senhaIdentificacao: senhaRecebida,
      fotoPerfil:
        competidor.fotoPerfil ||
        competidor.foto ||
        competidor.avatar ||
        null
    });

    estudanteId = criado.estudanteId;
    perfilPermanente = criado.perfil;
  }

  if (!estudanteId) {
    estudanteId = criarId("estudante");
  }

  const dadosRegistroExistente =
    competidoresExistentes[estudanteId] ||
    registroLocal?.[1] ||
    {};

  if (dadosRegistroExistente?.bloqueado === true) {
    throw new Error(
      "Seu acesso a esta Arena está bloqueado pelo professor."
    );
  }

  // Reentrada não ocupa nova vaga.
  ehReentrada = Boolean(
    competidoresExistentes[estudanteId] || registroLocal
  );

  if (!ehReentrada) {
    if (
      arena.entradaLiberada === false ||
      arena.aceitaNovos === false
    ) {
      throw new Error(
        "A entrada de novos estudantes está bloqueada."
      );
    }

    const limite = Math.max(1, Number(arena.limite || 60));

    const idsUnicos = new Set(
      Object.entries(competidoresExistentes).map(([id, c]) =>
        c?.estudanteId || c?.jogadorId || c?.id || id
      )
    );

    if (idsUnicos.size >= limite) {
      throw new Error(
        "O limite de participantes desta Arena foi atingido."
      );
    }
  }

  if (!perfilPermanente) {
    const permanente = await buscarEstudante(estudanteId);
    perfilPermanente = permanente?.perfil || null;
  }

  if (!perfilPermanente && senha3Valida(senhaRecebida)) {
    perfilPermanente = await salvarPerfilEstudante(estudanteId, {
      nomeCompleto:
        dadosRegistroExistente.nome ||
        nomeRecebido ||
        "Estudante",
      senhaIdentificacao: senhaRecebida,
      fotoPerfil:
        dadosRegistroExistente.fotoPerfil ||
        competidor.fotoPerfil ||
        null
    });
  }

  const nomeCanonico =
    perfilPermanente?.nomeCompleto ||
    perfilPermanente?.nome ||
    dadosRegistroExistente.nome ||
    nomeRecebido ||
    "Competidor";

  const senhaCanonica =
    perfilPermanente?.senhaIdentificacao ||
    dadosRegistroExistente.senhaIdentificacao ||
    senhaRecebida ||
    null;

  const dadosCompetidor = {
    ...dadosRegistroExistente,
    ...competidor,

    id: estudanteId,
    jogadorId: estudanteId,
    estudanteId,

    nome: nomeCanonico,
    nomeNormalizado: normalizarNome(nomeCanonico),
    senhaIdentificacao: senhaCanonica,

    fotoPerfil:
      perfilPermanente?.fotoPerfil ||
      dadosRegistroExistente.fotoPerfil ||
      competidor.fotoPerfil ||
      competidor.foto ||
      null,

    xp: Number(
      dadosRegistroExistente.xp ??
      competidor.xp ??
      0
    ),

    sequencia: Number(
      dadosRegistroExistente.sequencia ??
      dadosRegistroExistente.streak ??
      competidor.sequencia ??
      competidor.streak ??
      0
    ),

    acertos: Number(
      dadosRegistroExistente.acertos ??
      dadosRegistroExistente.hits ??
      competidor.acertos ??
      competidor.hits ??
      0
    ),

    estrelas: Number(
      dadosRegistroExistente.estrelas ??
      competidor.estrelas ??
      0
    ),

    questaoAtual: Number(
      dadosRegistroExistente.questaoAtual ??
      dadosRegistroExistente.questionIndex ??
      competidor.questaoAtual ??
      competidor.questionIndex ??
      0
    ),

    pontosRegulares: Number(
      dadosRegistroExistente.pontosRegulares ??
      competidor.pontosRegulares ??
      0
    ),

    regularConcluida: Boolean(
      dadosRegistroExistente.regularConcluida ??
      competidor.regularConcluida ??
      false
    ),

    bossFinalConcluido: Boolean(
      dadosRegistroExistente.bossFinalConcluido ??
      competidor.bossFinalConcluido ??
      false
    ),

    bossFinalAcertou: Boolean(
      dadosRegistroExistente.bossFinalAcertou ??
      competidor.bossFinalAcertou ??
      false
    ),

    bloqueado: Boolean(
      dadosRegistroExistente.bloqueado ??
      competidor.bloqueado ??
      false
    ),

    diamanteConquistado: Boolean(
      dadosRegistroExistente.diamanteConquistado ??
      competidor.diamanteConquistado ??
      false
    ),

    diamanteDisponivel: Boolean(
      dadosRegistroExistente.diamanteDisponivel ??
      competidor.diamanteDisponivel ??
      false
    ),

    diamanteUsado: Boolean(
      dadosRegistroExistente.diamanteUsado ??
      competidor.diamanteUsado ??
      false
    ),

    diamanteBloqueioPendente: Boolean(
      dadosRegistroExistente.diamanteBloqueioPendente ??
      false
    ),

    online: true,

    entrouEm:
      dadosRegistroExistente.entrouEm ||
      serverTimestamp(),

    atualizadoEm: serverTimestamp()
  };

  // Corrige eventual typo defensivamente sem mudar comportamento.
  dadosCompetidor.bloqueado = Boolean(
    dadosRegistroExistente.bloqueado ??
    competidor.bloqueado ??
    false
  );

  // Se o registro local antigo tiver outra chave, remove somente o duplicado
  // da Arena atual após migrar para o ID permanente.
  const chaveLocalAntiga = registroLocal?.[0];

  await set(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/competidores/${estudanteId}`
    ),
    dadosCompetidor
  );

  if (
    chaveLocalAntiga &&
    chaveLocalAntiga !== estudanteId &&
    competidoresExistentes[chaveLocalAntiga]
  ) {
    await remove(
      ref(
        database,
        `${RAIZ}/arenas/${arenaId}/competidores/${chaveLocalAntiga}`
      )
    );
  }

  await update(
    ref(database, `${RAIZ}/estudantes/${estudanteId}/perfil`),
    {
      ultimaArena: String(codigo).trim().toUpperCase(),
      ultimaParticipacao: serverTimestamp(),
      atualizadoEm: serverTimestamp()
    }
  );

  return estudanteId;
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

  return snapshot.exists() ? snapshot.val() : null;
}

export function observarCompetidores(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/competidores`
    ),
    snapshot => callback(snapshot.exists() ? snapshot.val() : {})
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
// HISTÓRICO PEDAGÓGICO PERMANENTE
// ======================================================

export async function buscarHistoricoEstudante(estudanteId) {
  const snap = await get(
    ref(banco(), `${RAIZ}/estudantes/${estudanteId}/historico`)
  );

  return snap.exists() ? snap.val() : {};
}

export function observarHistoricoEstudante(estudanteId, callback) {
  return onValue(
    ref(banco(), `${RAIZ}/estudantes/${estudanteId}/historico`),
    snapshot => callback(snapshot.exists() ? snapshot.val() : {})
  );
}

export async function registrarDesempenhoDescritor({
  estudanteId,
  codigoArena,
  descritor,
  correta,
  nivelAntes = null,
  nivelDepois = null,
  xpEvolucao = 0,
  questaoId = null,
  evidenciaId = null
}) {
  if (!estudanteId || !descritor) {
    throw new Error("Estudante e descritor são obrigatórios.");
  }

  const d = caminhoSeguro(descritor);
  const arenaId = caminhoSeguro(codigoArena || "SEM-ARENA");
  const base = `${RAIZ}/estudantes/${estudanteId}/historico/descritores/${d}`;
  const database = banco();

  const tentativaRef = ref(database, `${base}/totais`);

  const tx = await runTransaction(tentativaRef, atual => {
    const a = atual || {};
    const tentativas = Number(a.tentativas || 0) + 1;
    const acertos = Number(a.acertos || 0) + (correta ? 1 : 0);
    const erros = tentativas - acertos;

    return {
      tentativas,
      acertos,
      erros,
      percentual: Math.round((acertos / tentativas) * 10000) / 100
    };
  });

  const totais = tx.snapshot.val() || {};

  const nivelAnterior = nivelAntes
    ? normalizarNivelPedagogico(nivelAntes)
    : null;

  const nivelAtual = nivelDepois
    ? normalizarNivelPedagogico(nivelDepois)
    : nivelAnterior;

  await update(
    ref(database, base),
    {
      descritor,
      nivelAtual: nivelAtual || null,
      ultimaParticipacao: serverTimestamp(),
      atualizadoEm: serverTimestamp()
    }
  );

  const tentativa = {
    arena: String(codigoArena || "").trim().toUpperCase(),
    descritor,
    correta: Boolean(correta),
    questaoId: questaoId || null,
    evidenciaId: evidenciaId || null,
    nivelAntes: nivelAnterior,
    nivelDepois: nivelAtual,
    xpEvolucao: Number(xpEvolucao || 0),
    criadoEm: serverTimestamp()
  };

  const tentativaPush = push(
    ref(database, `${base}/arenas/${arenaId}/tentativas`)
  );

  await set(tentativaPush, tentativa);

  if (
    nivelAnterior &&
    nivelAtual &&
    nivelAnterior !== nivelAtual
  ) {
    const evolucaoPush = push(
      ref(database, `${RAIZ}/estudantes/${estudanteId}/historico/evolucoes`)
    );

    await set(evolucaoPush, {
      arena: String(codigoArena || "").trim().toUpperCase(),
      descritor,
      de: nivelAnterior,
      para: nivelAtual,
      xpBonus: Number(xpEvolucao || 0),
      criadoEm: serverTimestamp()
    });
  }

  return {
    ...totais,
    nivelAtual
  };
}

export async function registrarResultadoArenaNoHistorico(
  estudanteId,
  codigoArena,
  resultado = {}
) {
  if (!estudanteId || !codigoArena) return;

  await set(
    ref(
      banco(),
      `${RAIZ}/estudantes/${estudanteId}/historico/arenas/${caminhoSeguro(codigoArena)}`
    ),
    {
      ...resultado,
      codigoArena: String(codigoArena).trim().toUpperCase(),
      registradoEm: serverTimestamp()
    }
  );
}

export async function concederBonusEvolucao(
  codigoArena,
  estudanteId,
  {
    descritor,
    de,
    para,
    xpBonus = 0
  } = {}
) {
  const bonus = Math.max(0, Number(xpBonus || 0));

  if (bonus <= 0) return 0;

  await runTransaction(
    ref(
      banco(),
      `${RAIZ}/arenas/${caminhoSeguro(codigoArena)}/competidores/${estudanteId}/xp`
    ),
    atual => Number(atual || 0) + bonus
  );

  const bonusRef = push(
    ref(
      banco(),
      `${RAIZ}/estudantes/${estudanteId}/historico/bonificacoes`
    )
  );

  await set(bonusRef, {
    tipo: "EVOLUCAO_PEDAGOGICA",
    arena: String(codigoArena).trim().toUpperCase(),
    descritor: descritor || null,
    de: de ? normalizarNivelPedagogico(de) : null,
    para: para ? normalizarNivelPedagogico(para) : null,
    xpBonus: bonus,
    criadoEm: serverTimestamp()
  });

  return bonus;
}

// ======================================================
// AUTORIZAÇÕES DO PROFESSOR
// ======================================================

export async function liberarEdicaoPerfil(
  estudanteId,
  {
    expiraEm = null,
    usoUnico = true
  } = {}
) {
  await set(
    ref(
      banco(),
      `${RAIZ}/estudantes/${estudanteId}/autorizacoes/editarPerfil`
    ),
    {
      autorizado: true,
      usoUnico: Boolean(usoUnico),
      expiraEm: expiraEm || null,
      autorizadoEm: serverTimestamp()
    }
  );
}

export async function consumirEdicaoPerfil(estudanteId) {
  const caminho = `${RAIZ}/estudantes/${estudanteId}/autorizacoes/editarPerfil`;
  const snap = await get(ref(banco(), caminho));

  if (!snap.exists() || snap.val()?.autorizado !== true) {
    return false;
  }

  const auth = snap.val();

  if (auth.expiraEm && Date.now() > Number(auth.expiraEm)) {
    await remove(ref(banco(), caminho));
    return false;
  }

  if (auth.usoUnico !== false) {
    await remove(ref(banco(), caminho));
  }

  return true;
}

export async function autorizarGaleriaPerfil(estudanteId) {
  await set(
    ref(
      banco(),
      `${RAIZ}/estudantes/${estudanteId}/autorizacoes/galeriaPerfil`
    ),
    {
      autorizado: true,
      usoUnico: true,
      autorizadoEm: serverTimestamp()
    }
  );
}

export async function consumirAutorizacaoGaleriaPerfil(estudanteId) {
  const caminho = `${RAIZ}/estudantes/${estudanteId}/autorizacoes/galeriaPerfil`;
  const snap = await get(ref(banco(), caminho));

  if (!snap.exists() || snap.val()?.autorizado !== true) {
    return false;
  }

  await remove(ref(banco(), caminho));
  return true;
}

export async function relatarProblemaCameraPerfil(
  codigoArena,
  estudanteId,
  dados = {}
) {
  await set(
    ref(
      banco(),
      `${RAIZ}/arenas/${caminhoSeguro(codigoArena)}/problemasCamera/perfil/${estudanteId}`
    ),
    {
      estudanteId,
      tipo: "PERFIL",
      status: "AGUARDANDO_AUTORIZACAO",
      mensagem: "Problema na câmera para foto de perfil",
      ...dados,
      criadoEm: serverTimestamp()
    }
  );
}

// ======================================================
// EVIDÊNCIA DO CADERNO
// ======================================================

export async function salvarEvidenciaCaderno(
  codigoArena,
  estudanteId,
  questaoId,
  evidencia = {}
) {
  const arenaId = caminhoSeguro(codigoArena);
  const q = caminhoSeguro(questaoId);

  await set(
    ref(
      banco(),
      `${RAIZ}/arenas/${arenaId}/evidencias/${estudanteId}/${q}`
    ),
    {
      ...evidencia,
      estudanteId,
      questaoId,
      status: "ENVIADA",
      enviadoEm: serverTimestamp()
    }
  );

  return q;
}

export async function buscarEvidenciaCaderno(
  codigoArena,
  estudanteId,
  questaoId
) {
  const snap = await get(
    ref(
      banco(),
      `${RAIZ}/arenas/${caminhoSeguro(codigoArena)}/evidencias/${estudanteId}/${caminhoSeguro(questaoId)}`
    )
  );

  return snap.exists() ? snap.val() : null;
}

export async function relatarProblemaCameraQuestao(
  codigoArena,
  estudanteId,
  questaoId,
  descritor = null
) {
  const arenaId = caminhoSeguro(codigoArena);
  const q = caminhoSeguro(questaoId);

  await set(
    ref(
      banco(),
      `${RAIZ}/arenas/${arenaId}/problemasCamera/questoes/${estudanteId}/${q}`
    ),
    {
      estudanteId,
      questaoId,
      descritor,
      status: "AGUARDANDO_AUTORIZACAO",
      mensagem: "PROBLEMA NA CÂMERA — aguardando autorização",
      criadoEm: serverTimestamp()
    }
  );
}

export async function liberarQuestaoSemFoto(
  codigoArena,
  estudanteId,
  questaoId
) {
  const arenaId = caminhoSeguro(codigoArena);
  const q = caminhoSeguro(questaoId);

  await set(
    ref(
      banco(),
      `${RAIZ}/arenas/${arenaId}/autorizacoesSemFoto/${estudanteId}/${q}`
    ),
    {
      autorizado: true,
      usoUnico: true,
      autorizadoEm: serverTimestamp()
    }
  );

  await update(
    ref(
      banco(),
      `${RAIZ}/arenas/${arenaId}/problemasCamera/questoes/${estudanteId}/${q}`
    ),
    {
      status: "LIBERADA_SEM_FOTO",
      atualizadoEm: serverTimestamp()
    }
  );
}

export async function verificarQuestaoLiberadaSemFoto(
  codigoArena,
  estudanteId,
  questaoId
) {
  const snap = await get(
    ref(
      banco(),
      `${RAIZ}/arenas/${caminhoSeguro(codigoArena)}/autorizacoesSemFoto/${estudanteId}/${caminhoSeguro(questaoId)}`
    )
  );

  return Boolean(snap.exists() && snap.val()?.autorizado === true);
}

export function observarProblemasCamera(codigoArena, callback) {
  return onValue(
    ref(
      banco(),
      `${RAIZ}/arenas/${caminhoSeguro(codigoArena)}/problemasCamera`
    ),
    snap => callback(snap.exists() ? snap.val() : {})
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
    estudanteId: resposta.estudanteId || jogadorId,
    criadoEm: serverTimestamp()
  });

  return referencia.key;
}

export function observarRespostas(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/respostas`
    ),
    snapshot => callback(snapshot.exists() ? snapshot.val() : {})
  );
}

// ======================================================
// EVENTOS EM TEMPO REAL
// ======================================================

export async function registrarEvento(codigo, evento = {}) {
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

export function observarEventos(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/eventos`
    ),
    snapshot => callback(snapshot.exists() ? snapshot.val() : {})
  );
}

// ======================================================
// DUELO MATEMÁTICO
// ======================================================

export async function criarDuelo(codigo, duelo = {}) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const dueloId = duelo.id || criarId("duelo");

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

export function observarDueloAtual(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/dueloAtual`
    ),
    snapshot => callback(snapshot.exists() ? snapshot.val() : null)
  );
}

export async function responderDuelo(codigo, jogadorId, resposta) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const dueloRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/dueloAtual`
  );

  const snap = await get(dueloRef);

  if (!snap.exists()) {
    throw new Error("Não há duelo ativo.");
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

  if (duelo.respostas && duelo.respostas[jogadorId]) {
    return {
      correta: Boolean(
        duelo.respostas[jogadorId].correta
      ),
      vencedor: duelo.vencedorId === jogadorId,
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

  const competidorSnap = await get(competidorRef);

  const competidor = competidorSnap.exists()
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
      nome: competidor.nome || "Competidor",
      respondidoEm: serverTimestamp()
    }
  );

  let vencedor = false;

  if (correta) {
    const vencedorRef = ref(
      database,
      `${RAIZ}/arenas/${arenaId}/dueloAtual/vencedorId`
    );

    const resultado = await runTransaction(
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
      const bonusXP = Number(duelo.bonusXP || 200);

      await runTransaction(
        ref(
          database,
          `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}/xp`
        ),
        atual => Number(atual || 0) + bonusXP
      );

      await update(
        dueloRef,
        {
          status: "encerrado",
          vencedorId: jogadorId,
          vencedorNome: competidor.nome || "Competidor",
          encerradoEm: serverTimestamp(),
          atualizadoEm: serverTimestamp()
        }
      );

      await registrarEvento(
        codigo,
        {
          nome: "DUELO MATEMÁTICO",
          tipo: "duelo_encerrado",
          vencedorId: jogadorId,
          vencedorNome: competidor.nome || "Competidor",
          dueloId: duelo.id || null,
          bonusXP
        }
      );
    }
  }

  return {
    correta,
    vencedor,
    bonusXP: Number(duelo.bonusXP || 200)
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
      encerradoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp()
    }
  );
}

// ======================================================
// BOSS FINAL
// ======================================================

export async function liberarBossFinal(codigo, boss = {}) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  const dados = {
    status: "liberado",
    titulo: boss.titulo || "BOSS FINAL",
    descriptor: boss.descriptor || "DESAFIO FINAL",
    level: boss.level || "BOSS",
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
    correct: Number(boss.correct ?? 1),
    bonusXP: Number(boss.bonusXP || 300),
    liberadoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp()
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
      nome: "BOSS FINAL",
      tipo: "boss_final",
      texto: "👑 BOSS FINAL liberado! O desafio final já está disponível."
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
    throw new Error("Boss Final não está ativo.");
  }

  const respostaRef = ref(
    database,
    `${RAIZ}/arenas/${arenaId}/bossFinal/respostas/${jogadorId}`
  );

  const respostaSnap = await get(respostaRef);

  if (respostaSnap.exists()) {
    return {
      ...respostaSnap.val(),
      jaRespondido: true
    };
  }

  const correta =
    Number(resposta) ===
    Number(boss.correct);

  const bonusXP = correta
    ? Number(boss.bonusXP || 300)
    : 0;

  if (correta && bonusXP > 0) {
    await runTransaction(
      ref(
        database,
        `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}/xp`
      ),
      atual => Number(atual || 0) + bonusXP
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
    await buscarCompetidor(codigo, jogadorId);

  const resultado = {
    jogadorId,
    nome: competidor?.nome || "Competidor",
    resposta: Number(resposta),
    correta,
    bonusXP,
    respondidoEm: serverTimestamp()
  };

  await set(respostaRef, resultado);

  return resultado;
}

export function observarBossFinal(codigo, callback) {
  const database = banco();
  const arenaId = caminhoSeguro(codigo);

  return onValue(
    ref(
      database,
      `${RAIZ}/arenas/${arenaId}/bossFinal`
    ),
    snapshot => callback(snapshot.exists() ? snapshot.val() : null)
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
    criadoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp()
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
      nome: evento.nome || "EVENTO ESPECIAL",
      tipo: "evento_especial",
      eventoId,
      momento: new Date().toISOString()
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
    snapshot => callback(snapshot.exists() ? snapshot.val() : null)
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

  const eventoSnap = await get(eventoRef);

  if (!eventoSnap.exists()) {
    throw new Error("Não há Evento Especial ativo.");
  }

  const evento = eventoSnap.val();

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

  const respostaAnterior = await get(respostaRef);

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
    await buscarCompetidor(codigo, jogadorId) || {};

  const bonusXP = correta
    ? Number(evento.bonusXP || 0)
    : 0;

  if (correta && bonusXP > 0) {
    await runTransaction(
      ref(
        database,
        `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}/xp`
      ),
      atual => Number(atual || 0) + bonusXP
    );
  }

  let shieldNovo = Number(
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
    nome: competidor.nome || "Competidor",
    resposta: Number(resposta),
    correta,
    bonusXP,
    shield: shieldNovo,
    respondidoEm: serverTimestamp()
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
    throw new Error("Status da Arena inválido.");
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
  "🔥 Serviço Firebase da Arena Matemática — Nova Fase 2026 carregado."
);
