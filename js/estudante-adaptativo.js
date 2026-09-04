// ==========================================================
// ARENA MATEMÁTICA — INTEGRAÇÃO ADAPTATIVA DO ESTUDANTE
// Professor Leopoldo
// 3º Trimestre 2026
//
// Responsabilidades:
// - gerar conjunto individual do estudante;
// - preservar o mesmo conjunto quando ele retornar;
// - manter a mesma quantidade oficial de questões;
// - usar histórico por descritor;
// - definir exatamente 1 evidência por descritor;
// - registrar respostas adaptativas;
// - calcular consolidação crescente;
// - preparar dados do resultado final e futuro PDF.
// ==========================================================

import {
  gerarQuestoesAdaptativas,
  criarRegistroRespostaAdaptativa,
  montarResumoConsolidacao,
  obterEtapaAtual,
  montarPacotePDFIndividual,
  VERSAO_MOTOR_ADAPTATIVO
} from "./motor-adaptativo.js";

export const VERSAO_ESTUDANTE_ADAPTATIVO =
  "estudante-adaptativo-2026-v1";

// ----------------------------------------------------------
// UTILITÁRIOS
// ----------------------------------------------------------

function numero(v, padrao = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : padrao;
}

function inteiro(v, padrao = 0) {
  return Math.floor(numero(v, padrao));
}

function arraySeguro(v) {
  if (Array.isArray(v)) return v;
  if (v && typeof v === "object") return Object.values(v);
  return [];
}

function unicos(lista = []) {
  return [...new Set(lista.filter(Boolean))];
}

function descritorQuestao(q = {}) {
  return String(
    q.descriptor ||
    q.descritor ||
    ""
  ).trim();
}

function idQuestao(q = {}, indice = 0) {
  return String(
    q.questaoId ||
    q.id ||
    `q_${indice}`
  );
}

function nivelQuestao(q = {}) {
  return String(
    q.level ||
    q.nivel ||
    "ABAIXO DO BÁSICO"
  );
}

function habilidadeQuestao(q = {}) {
  return String(
    q.habilidade ||
    q.expectativa ||
    q.tarefa ||
    ""
  );
}

// ----------------------------------------------------------
// LEITURA DA CONFIGURAÇÃO DA ARENA
// ----------------------------------------------------------

export function quantidadeOficialArena(arena = {}) {
  const campos = [
    arena.quantidadeQuestoes,
    arena.totalQuestoes,
    arena.qtdQuestoes,
    arena.numeroQuestoes,
    arena.questionCount
  ];

  for (const valor of campos) {
    const n = inteiro(valor);

    if (n > 0) {
      return n;
    }
  }

  const atuais = arraySeguro(
    arena.questoes ||
    arena.questions
  );

  if (atuais.length) {
    return atuais.length;
  }

  return 10;
}

export function descritoresOficiaisArena(arena = {}) {
  const fontes = [
    arena.descritores,
    arena.descritoresSelecionados,
    arena.habilidadesSelecionadas,
    arena.descriptors
  ];

  for (const fonte of fontes) {
    if (Array.isArray(fonte) && fonte.length) {
      const resultado = fonte
        .map(item => {
          if (typeof item === "string") {
            return item.trim().toUpperCase();
          }

          return String(
            item?.descriptor ||
            item?.descritor ||
            item?.codigo ||
            item?.id ||
            ""
          )
          .trim()
          .toUpperCase();
        })
        .filter(Boolean);

      if (resultado.length) {
        return unicos(resultado);
      }
    }
  }

  const configuracao =
    arena.configuracaoDescritores ||
    arena.configDescritores ||
    {};

  if (
    configuracao &&
    typeof configuracao === "object"
  ) {
    const chaves =
      Object.keys(configuracao)
        .map(d => d.trim().toUpperCase())
        .filter(Boolean);

    if (chaves.length) {
      return unicos(chaves);
    }
  }

  const atuais = arraySeguro(
    arena.questoes ||
    arena.questions
  );

  return unicos(
    atuais
      .map(descritorQuestao)
      .filter(Boolean)
  );
}

export function configuracaoDescritoresArena(
  arena = {}
) {
  return (
    arena.configuracaoDescritores ||
    arena.configDescritores ||
    arena.pesosDescritores ||
    {}
  );
}

// ----------------------------------------------------------
// HISTÓRICO
// ----------------------------------------------------------

export function historicoPorDescritor(
  historico = {}
) {
  return (
    historico.descritores ||
    historico.habilidades ||
    historico.resultadosDescritores ||
    {}
  );
}

// ----------------------------------------------------------
// CONJUNTO JÁ SALVO
// ----------------------------------------------------------

export function extrairConjuntoSalvo(
  jogador = {}
) {
  const candidatos = [
    jogador.questoesAdaptativas,
    jogador.conjuntoAdaptativo?.questoes,
    jogador.trajetoriaAdaptativa?.questoes
  ];

  for (const fonte of candidatos) {
    const lista = arraySeguro(fonte);

    if (lista.length) {
      return lista;
    }
  }

  return [];
}

export function extrairMapaEvidenciasSalvo(
  jogador = {}
) {
  return (
    jogador.questaoEvidenciaPorDescritor ||
    jogador.conjuntoAdaptativo
      ?.questaoEvidenciaPorDescritor ||
    jogador.trajetoriaAdaptativa
      ?.questaoEvidenciaPorDescritor ||
    {}
  );
}

// ----------------------------------------------------------
// EVIDÊNCIAS
// exatamente uma por descritor
// ----------------------------------------------------------

export function montarMapaEvidencias(
  questoes = []
) {
  const mapa = {};
  const encontrados = new Set();

  questoes.forEach((q, indice) => {
    const d = descritorQuestao(q);

    if (!d || encontrados.has(d)) {
      return;
    }

    if (
      q.exigeEvidenciaCaderno === true
    ) {
      mapa[d] = idQuestao(q, indice);
      encontrados.add(d);
    }
  });

  /*
  Segurança:
  se alguma versão do motor vier sem a marca,
  escolhe a primeira questão daquele descritor.
  */
  questoes.forEach((q, indice) => {
    const d = descritorQuestao(q);

    if (!d || encontrados.has(d)) {
      return;
    }

    mapa[d] = idQuestao(q, indice);
    encontrados.add(d);
  });

  return mapa;
}

// ----------------------------------------------------------
// GERAÇÃO / RECUPERAÇÃO DO CONJUNTO
// ----------------------------------------------------------

export function prepararConjuntoIndividual({
  arena = {},
  jogador = {},
  historico = {},
  estudanteId = "",
  codigoArena = ""
} = {}) {
  if (!estudanteId) {
    throw new Error(
      "Estudante ainda não identificado."
    );
  }

  /*
  Retorno à Arena:
  nunca gera outro conjunto se este estudante
  já possuir questões personalizadas salvas.
  */
  const salvas =
    extrairConjuntoSalvo(jogador);

  if (salvas.length) {
    return {
      reutilizado: true,

      versaoMotor:
        jogador.versaoMotorAdaptativo ||
        VERSAO_MOTOR_ADAPTATIVO,

      questoes: salvas,

      quantidade:
        salvas.length,

      questaoEvidenciaPorDescritor:
        extrairMapaEvidenciasSalvo(
          jogador
        ),

      descritores:
        unicos(
          salvas
            .map(descritorQuestao)
            .filter(Boolean)
        )
    };
  }

  const quantidade =
    quantidadeOficialArena(arena);

  const descritores =
    descritoresOficiaisArena(arena);

  if (!descritores.length) {
    throw new Error(
      "A Arena ainda não possui descritores configurados."
    );
  }

  const questoes =
    gerarQuestoesAdaptativas({
      quantidade,

      descritores,

      configuracaoDescritores:
        configuracaoDescritoresArena(
          arena
        ),

      historicoPorDescritor:
        historicoPorDescritor(
          historico
        ),

      estudanteId,

      codigoArena
    });

  if (
    !Array.isArray(questoes) ||
    questoes.length !== quantidade
  ) {
    throw new Error(
      `A trajetória individual deveria possuir ${quantidade} questões, mas foram geradas ${Array.isArray(questoes) ? questoes.length : 0}.`
    );
  }

  const mapa =
    montarMapaEvidencias(
      questoes
    );

  return {
    reutilizado: false,

    versaoMotor:
      VERSAO_MOTOR_ADAPTATIVO,

    questoes,

    quantidade,

    descritores,

    questaoEvidenciaPorDescritor:
      mapa
  };
}

// ----------------------------------------------------------
// OBJETO QUE SERÁ SALVO NO COMPETIDOR
// ----------------------------------------------------------

export function dadosParaSalvarNoCompetidor(
  conjunto = {}
) {
  return {
    adaptativoAtivo: true,

    versaoMotorAdaptativo:
      conjunto.versaoMotor ||
      VERSAO_MOTOR_ADAPTATIVO,

    questoesAdaptativas:
      arraySeguro(
        conjunto.questoes
      ),

    quantidadeQuestoesAdaptativas:
      arraySeguro(
        conjunto.questoes
      ).length,

    questaoEvidenciaPorDescritor:
      conjunto
        .questaoEvidenciaPorDescritor ||
      {},

    descritoresAdaptativos:
      conjunto.descritores ||
      [],

    conjuntoAdaptativoCriadoEm:
      new Date().toISOString()
  };
}

// ----------------------------------------------------------
// LISTA EFETIVA DE QUESTÕES
// ----------------------------------------------------------

export function questoesEfetivas({
  jogador = {},
  conjunto = null,
  arena = {}
} = {}) {
  if (
    conjunto &&
    Array.isArray(conjunto.questoes) &&
    conjunto.questoes.length
  ) {
    return conjunto.questoes;
  }

  const salvas =
    extrairConjuntoSalvo(jogador);

  if (salvas.length) {
    return salvas;
  }

  /*
  Compatibilidade de segurança para Arenas antigas.
  */
  return arraySeguro(
    arena.questoes ||
    arena.questions
  );
}

// ----------------------------------------------------------
// MAPA EFETIVO DE EVIDÊNCIAS
// ----------------------------------------------------------

export function mapaEvidenciasEfetivo({
  jogador = {},
  conjunto = null,
  arena = {}
} = {}) {
  if (
    conjunto?.questaoEvidenciaPorDescritor
  ) {
    return conjunto
      .questaoEvidenciaPorDescritor;
  }

  const salvo =
    extrairMapaEvidenciasSalvo(
      jogador
    );

  if (
    salvo &&
    Object.keys(salvo).length
  ) {
    return salvo;
  }

  return (
    arena.questaoEvidenciaPorDescritor ||
    arena.evidenciasObrigatorias ||
    {}
  );
}

// ----------------------------------------------------------
// RESPOSTA INDIVIDUAL
// ----------------------------------------------------------

export function criarRespostaDoEstudante({
  questao,
  indiceQuestao,
  alternativa,
  correta,
  tempoSegundos = null
} = {}) {
  const adaptativa =
    criarRegistroRespostaAdaptativa({
      questao,

      respostaSelecionada:
        alternativa,

      acertou:
        Boolean(correta),

      tempoSegundos
    });

  return {
    ...adaptativa,

    indiceQuestao:
      inteiro(
        indiceQuestao
      ),

    alternativa,

    correta:
      Boolean(correta),

    tipo:
      "regular",

    timestampCliente:
      Date.now(),

    versaoIntegracao:
      VERSAO_ESTUDANTE_ADAPTATIVO
  };
}

// ----------------------------------------------------------
// RESPOSTAS LOCAIS DESTA ARENA
// ----------------------------------------------------------

export function adicionarRespostaLocal(
  respostas = [],
  resposta = {}
) {
  const lista =
    Array.isArray(respostas)
      ? [...respostas]
      : [];

  const id =
    String(
      resposta.questaoId ||
      ""
    );

  const indiceExistente =
    lista.findIndex(
      r =>
        String(
          r?.questaoId ||
          ""
        ) === id
    );

  if (
    id &&
    indiceExistente >= 0
  ) {
    lista[indiceExistente] =
      resposta;
  } else {
    lista.push(resposta);
  }

  return lista;
}

// ----------------------------------------------------------
// CONSOLIDAÇÃO
// ----------------------------------------------------------

export function calcularConsolidacaoArena({
  conjunto = {},
  historico = {},
  respostas = []
} = {}) {
  const descritores =
    conjunto.descritores ||
    unicos(
      arraySeguro(
        conjunto.questoes
      )
      .map(descritorQuestao)
      .filter(Boolean)
    );

  return montarResumoConsolidacao({
    descritores,

    historicoPorDescritor:
      historicoPorDescritor(
        historico
      ),

    respostasDaArena:
      respostas
  });
}

// ----------------------------------------------------------
// LABEL PEDAGÓGICO
// ----------------------------------------------------------

export function textoEtapaPedagogica(
  estado = {}
) {
  const etapa =
    estado.etapaDepois ||
    estado.etapaAntes ||
    obterEtapaAtual(
      estado
    );

  if (!etapa) {
    return "EM ACOMPANHAMENTO";
  }

  return `${etapa.nivel} — ${etapa.situacao}`;
}

// ----------------------------------------------------------
// RESUMO INDIVIDUAL
// ----------------------------------------------------------

export function montarResumoIndividual({
  jogador = {},
  competidores = {},
  conjunto = {},
  consolidacao = {}
} = {}) {
  const questoes =
    arraySeguro(
      conjunto.questoes
    );

  const total =
    questoes.length;

  const tentadas =
    Math.min(
      inteiro(
        jogador.questaoAtual ??
        jogador.questionIndex ??
        0
      ),
      total
    );

  const acertos =
    inteiro(
      jogador.acertos,
      0
    );

  const percentual =
    tentadas
      ? Math.round(
          (
            acertos /
            tentadas
          ) * 100
        )
      : 0;

  const ranking =
    Object.entries(
      competidores ||
      {}
    )
    .map(
      ([id, j]) => ({
        id,
        ...j
      })
    )
    .sort(
      (a, b) =>
        numero(
          b.xp,
          0
        ) -
        numero(
          a.xp,
          0
        )
    );

  const estudanteId =
    jogador.estudanteId ||
    jogador.id ||
    "";

  let posicao =
    ranking.findIndex(
      j =>
        j.id === estudanteId
    ) + 1;

  if (
    !posicao &&
    jogador.jogadorId
  ) {
    posicao =
      ranking.findIndex(
        j =>
          j.id ===
          jogador.jogadorId
      ) + 1;
  }

  return {
    xp:
      numero(
        jogador.xp,
        0
      ),

    questoes:
      tentadas,

    totalQuestoes:
      total,

    acertos,

    erros:
      Math.max(
        0,
        tentadas - acertos
      ),

    percentual,

    colocacao:
      posicao || null,

    totalCompetidores:
      ranking.length,

    consolidacao
  };
}

// ----------------------------------------------------------
// PACOTE PARA FUTURO PDF
// ----------------------------------------------------------

export function prepararPacotePDF({
  arena = {},
  jogador = {},
  estudanteId = "",
  conjunto = {},
  respostas = [],
  resultado = {},
  consolidacao = {}
} = {}) {
  return montarPacotePDFIndividual({
    arena,

    estudante: {
      estudanteId:
        estudanteId ||
        jogador.estudanteId ||
        jogador.id ||
        "",

      nomeCompleto:
        jogador.nome ||
        jogador.nomeCompleto ||
        "",

      turma:
        jogador.turma ||
        arena.turma ||
        ""
    },

    questoes:
      arraySeguro(
        conjunto.questoes
      ),

    respostas,

    resultado,

    consolidacao
  });
}

// ----------------------------------------------------------
// SEGURANÇA DO PDF
// ----------------------------------------------------------

export function podeLiberarPDF(
  arena = {}
) {
  return (
    String(
      arena.status ||
      ""
    )
    .trim()
    .toLowerCase() ===
    "encerrada"
  );
}

// ----------------------------------------------------------
// DIAGNÓSTICO
// ----------------------------------------------------------

export function diagnosticoConjunto(
  conjunto = {}
) {
  const questoes =
    arraySeguro(
      conjunto.questoes
    );

  const porDescritor = {};

  questoes.forEach(q => {
    const d =
      descritorQuestao(q) ||
      "SEM_DESCRITOR";

    porDescritor[d] ||= {
      total: 0,
      niveis: {}
    };

    porDescritor[d].total++;

    const nivel =
      nivelQuestao(q);

    porDescritor[d]
      .niveis[nivel] =
      numero(
        porDescritor[d]
          .niveis[nivel],
        0
      ) + 1;
  });

  return {
    versao:
      VERSAO_ESTUDANTE_ADAPTATIVO,

    motor:
      conjunto.versaoMotor ||
      VERSAO_MOTOR_ADAPTATIVO,

    quantidade:
      questoes.length,

    descritores:
      Object.keys(
        porDescritor
      ),

    porDescritor,

    evidencias:
      conjunto
        .questaoEvidenciaPorDescritor ||
      {}
  };
}

console.log(
  "🎯 Integração adaptativa do estudante carregada — conjuntos individuais, consolidação crescente e evidência por descritor."
);
