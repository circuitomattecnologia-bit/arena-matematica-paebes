import {
  gerarQuestaoDescritor,
  HABILIDADES_PAEBES,
  NUCLEOS_APRENDIZAGEM
} from "./question-bank.js";

export const VERSAO_MOTOR_ADAPTATIVO = "arena-adaptativa-2026-v2";

export const NIVEIS_ORDEM = [
  "ABAIXO DO BÁSICO",
  "BÁSICO",
  "PROFICIENTE",
  "AVANÇADO"
];

export const ESCADA_CONSOLIDACAO = [
  { indice:0, nivel:"ABAIXO DO BÁSICO", situacao:"EM DESENVOLVIMENTO" },
  { indice:1, nivel:"ABAIXO DO BÁSICO", situacao:"CONSOLIDADO" },
  { indice:2, nivel:"BÁSICO", situacao:"EM DESENVOLVIMENTO" },
  { indice:3, nivel:"BÁSICO", situacao:"CONSOLIDADO" },
  { indice:4, nivel:"PROFICIENTE", situacao:"EM DESENVOLVIMENTO" },
  { indice:5, nivel:"PROFICIENTE", situacao:"CONSOLIDADO" },
  { indice:6, nivel:"AVANÇADO", situacao:"EM DESENVOLVIMENTO" },
  { indice:7, nivel:"AVANÇADO", situacao:"CONSOLIDADO" }
];

// Política interna da Arena.
// NÃO representa corte oficial do PAEBES.
export const POLITICA_CONSOLIDACAO_PADRAO = Object.freeze({
  minimoRespostasNoNivel:4,
  percentualParaConsolidar:75,
  minimoAcertosRecentes:2,
  janelaRecente:8,
  naoApagarConsolidacao:true
});

function numero(v,padrao=0){
  const n=Number(v);
  return Number.isFinite(n)?n:padrao;
}

function limitar(n,min,max){
  return Math.max(min,Math.min(max,n));
}

function arraySeguro(v){
  if(Array.isArray(v)) return v;
  if(v&&typeof v==="object") return Object.values(v);
  return [];
}

function normalizarTexto(v=""){
  return String(v)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .trim()
    .toUpperCase();
}

export function normalizarNivel(nivel="ABAIXO DO BÁSICO"){
  const n=normalizarTexto(nivel);

  if(n.includes("AVANC")){
    return "AVANÇADO";
  }

  if(n.includes("PROF")){
    return "PROFICIENTE";
  }

  if(
    n.includes("BASICO") &&
    !n.includes("ABAIXO")
  ){
    return "BÁSICO";
  }

  return "ABAIXO DO BÁSICO";
}

export function normalizarSituacao(
  situacao="EM DESENVOLVIMENTO"
){
  return normalizarTexto(situacao)
    .includes("CONSOLID")
      ? "CONSOLIDADO"
      : "EM DESENVOLVIMENTO";
}

function hashInteiro(texto=""){
  let h=2166136261;

  for(const ch of String(texto)){
    h^=ch.charCodeAt(0);
    h=Math.imul(h,16777619);
  }

  return h>>>0;
}

function descritorQuestao(q={}){
  return String(
    q?.descriptor ||
    q?.descritor ||
    ""
  )
  .trim()
  .toUpperCase();
}

function textoQuestao(q={}){
  return String(
    q?.text ||
    q?.texto ||
    q?.enunciado ||
    q?.pergunta ||
    ""
  );
}

function opcoesQuestao(q={}){
  return arraySeguro(
    q?.options ||
    q?.opcoes ||
    q?.alternativas ||
    []
  );
}

function assinaturaQuestao(q={}){
  return normalizarTexto(
    `${
      descritorQuestao(q)
    }|${
      q?.level ||
      q?.nivel ||
      ""
    }|${
      textoQuestao(q)
    }|${
      opcoesQuestao(q)
        .map(
          o =>
            typeof o==="string"
              ? o
              : o?.texto ||
                o?.text ||
                ""
        )
        .join("|")
    }`
  );
}

function nucleoDoDescritor(descritor){
  return (
    Object
      .values(
        NUCLEOS_APRENDIZAGEM ||
        {}
      )
      .find(
        n =>
          Array.isArray(
            n?.descritores
          ) &&
          n.descritores
            .includes(
              descritor
            )
      )
      ?.nome
  ) || "Recomposição e Consolidação";
}

function etapaPorNivelSituacao(
  nivel,
  situacao
){
  const n=
    normalizarNivel(
      nivel
    );

  const s=
    normalizarSituacao(
      situacao
    );

  return (
    ESCADA_CONSOLIDACAO
      .find(
        e =>
          e.nivel===n &&
          e.situacao===s
      )
  ) || ESCADA_CONSOLIDACAO[0];
}

export function obterEtapaAtual(
  historicoDescritor={}
){
  if(
    Number.isInteger(
      historicoDescritor
        ?.etapaConsolidacao
    )
  ){
    return ESCADA_CONSOLIDACAO[
      limitar(
        historicoDescritor
          .etapaConsolidacao,
        0,
        ESCADA_CONSOLIDACAO
          .length-1
      )
    ];
  }

  const nivel=
    historicoDescritor
      ?.nivelAtual ||
    historicoDescritor
      ?.nivel ||
    historicoDescritor
      ?.nivelAlcancado ||
    "ABAIXO DO BÁSICO";

  const situacao=
    historicoDescritor
      ?.situacaoAtual ||
    historicoDescritor
      ?.situacao ||
    (
      historicoDescritor
        ?.consolidado===true
        ? "CONSOLIDADO"
        : "EM DESENVOLVIMENTO"
    );

  return etapaPorNivelSituacao(
    nivel,
    situacao
  );
}

export function proximaEtapa(
  etapaAtual
){
  const indice=
    limitar(
      numero(
        etapaAtual?.indice,
        0
      )+1,
      0,
      ESCADA_CONSOLIDACAO
        .length-1
    );

  return ESCADA_CONSOLIDACAO[
    indice
  ];
}

export function nivelAlvoDoHistorico(
  historicoDescritor={}
){
  const atual=
    obterEtapaAtual(
      historicoDescritor
    );

  if(
    atual.situacao===
      "CONSOLIDADO"
    &&
    atual.indice<
      ESCADA_CONSOLIDACAO
        .length-1
  ){
    return proximaEtapa(
      atual
    ).nivel;
  }

  return atual.nivel;
}

function temHistoricoSuficiente(
  h={}
){
  const respostas=
    arraySeguro(
      h?.respostas
    );

  const tentativas=
    numero(
      h?.tentativas ??
      h?.questoes ??
      h?.respondidas,
      0
    );

  const acertos=
    numero(
      h?.acertos,
      0
    );

  const possuiNivel=
    Boolean(
      h?.nivelAtual ||
      h?.nivel ||
      h?.nivelAlcancado
    );

  const possuiEtapa=
    Number.isInteger(
      h?.etapaConsolidacao
    );

  return (
    possuiEtapa ||
    possuiNivel ||
    respostas.length>0 ||
    tentativas>0 ||
    acertos>0
  );
}

function nivelDaConfiguracaoProfessor(
  descritor,
  configuracaoDescritores={}
){
  const nivel=
    configuracaoDescritores
      ?.[descritor]
      ?.nivel;

  if(
    !nivel ||
    normalizarTexto(nivel)==="MISTO"
  ){
    return null;
  }

  return normalizarNivel(
    nivel
  );
}

function indiceNivel(nivel){
  return Math.max(
    0,
    NIVEIS_ORDEM
      .indexOf(
        normalizarNivel(
          nivel
        )
      )
  );
}

function nivelParaQuestao(
  descritor,
  historicoPorDescritor={},
  configuracaoDescritores={}
){
  const historico=
    historicoPorDescritor
      ?.[descritor] ||
    {};

  // REGRA PRINCIPAL:
  // sem histórico suficiente,
  // a sondagem sempre inicia em ABB.
  if(
    !temHistoricoSuficiente(
      historico
    )
  ){
    return "ABAIXO DO BÁSICO";
  }

  const adaptativo=
    nivelAlvoDoHistorico(
      historico
    );

  const professor=
    nivelDaConfiguracaoProfessor(
      descritor,
      configuracaoDescritores
    );

  if(
    !professor
  ){
    return adaptativo;
  }

  // O nível configurado pelo professor
  // funciona como teto/prioridade,
  // e não como autorização para
  // pular etapas.
  return NIVEIS_ORDEM[
    Math.min(
      indiceNivel(
        adaptativo
      ),
      indiceNivel(
        professor
      )
    )
  ];
}

function respostasDoNivel(
  historicoDescritor={},
  nivel
){
  return arraySeguro(
    historicoDescritor
      ?.respostas
  )
  .filter(
    r =>
      normalizarNivel(
        r?.nivel ||
        r?.level ||
        nivel
      )===nivel
  );
}

function acertouResposta(r){
  if(
    typeof r?.acertou===
    "boolean"
  ){
    return r.acertou;
  }

  if(
    typeof r?.correta===
    "boolean"
  ){
    return r.correta;
  }

  if(
    typeof r?.isCorrect===
    "boolean"
  ){
    return r.isCorrect;
  }

  return false;
}

export function avaliarConsolidacao(
  historicoDescritor={},
  respostasNovas=[],
  politica={}
){
  const p={
    ...POLITICA_CONSOLIDACAO_PADRAO,
    ...(politica||{})
  };

  const atual=
    obterEtapaAtual(
      historicoDescritor
    );

  const nivelTrabalhado=
    atual.situacao===
      "CONSOLIDADO"
    &&
    atual.indice<7
      ? proximaEtapa(
          atual
        ).nivel
      : atual.nivel;

  const anteriores=
    respostasDoNivel(
      historicoDescritor,
      nivelTrabalhado
    );

  const novas=
    arraySeguro(
      respostasNovas
    )
    .filter(
      r =>
        normalizarNivel(
          r?.nivel ||
          r?.level ||
          nivelTrabalhado
        )===
        nivelTrabalhado
    );

  const todas=[
    ...anteriores,
    ...novas
  ];

  const janela=
    todas.slice(
      -Math.max(
        1,
        numero(
          p.janelaRecente,
          8
        )
      )
    );

  const acertos=
    janela
      .filter(
        acertouResposta
      )
      .length;

  const percentual=
    janela.length
      ? Math.round(
          (
            acertos /
            janela.length
          )*100
        )
      : 0;

  const ultimas=
    janela.slice(
      -Math.max(
        1,
        numero(
          p.minimoAcertosRecentes,
          2
        )
      )
    );

  const acertosRecentes=
    ultimas
      .filter(
        acertouResposta
      )
      .length;

  const consolidou=
    janela.length>=
      Math.max(
        1,
        numero(
          p.minimoRespostasNoNivel,
          4
        )
      )
    &&
    percentual>=
      limitar(
        numero(
          p.percentualParaConsolidar,
          75
        ),
        0,
        100
      )
    &&
    acertosRecentes>=
      Math.max(
        1,
        numero(
          p.minimoAcertosRecentes,
          2
        )
      );

  let etapaDepois=
    atual;

  let evoluiu=
    false;

  if(
    consolidou
  ){
    if(
      atual.situacao===
      "EM DESENVOLVIMENTO"
    ){
      etapaDepois=
        ESCADA_CONSOLIDACAO[
          Math.min(
            atual.indice+1,
            7
          )
        ];

      evoluiu=
        etapaDepois.indice>
        atual.indice;
    }

    else if(
      atual.situacao===
      "CONSOLIDADO"
      &&
      atual.indice<7
    ){
      etapaDepois=
        ESCADA_CONSOLIDACAO[
          Math.min(
            atual.indice+2,
            7
          )
        ];

      evoluiu=
        etapaDepois.indice>
        atual.indice;
    }
  }

  return {
    etapaAntes:atual,
    etapaDepois,
    nivelTrabalhado,
    respostasConsideradas:
      janela.length,
    acertos,
    percentual,
    consolidou,
    evoluiu,
    politicaAplicada:p
  };
}

function pesoDescritor(
  descritor,
  configuracaoDescritores={}
){
  return limitar(
    numero(
      configuracaoDescritores
        ?.[descritor]
        ?.peso,
      1
    ),
    1,
    4
  );
}

function fraquezaDescritor(
  descritor,
  historicoPorDescritor={}
){
  const h=
    historicoPorDescritor
      ?.[descritor] ||
    {};

  if(
    !temHistoricoSuficiente(
      h
    )
  ){
    return -1;
  }

  return obterEtapaAtual(
    h
  ).indice;
}

function montarFilaDescritores(
  descritores,
  quantidade,
  configuracaoDescritores,
  historicoPorDescritor,
  identificador
){
  const validos=[
    ...descritores
  ];

  // Primeiro trabalha os descritores
  // de menor domínio.
  validos.sort(
    (a,b)=>{
      const fa=
        fraquezaDescritor(
          a,
          historicoPorDescritor
        );

      const fb=
        fraquezaDescritor(
          b,
          historicoPorDescritor
        );

      if(
        fa!==fb
      ){
        return fa-fb;
      }

      return (
        hashInteiro(
          `${identificador}|${a}`
        )
        -
        hashInteiro(
          `${identificador}|${b}`
        )
      );
    }
  );

  const fila=[];

  // Garante pelo menos uma questão
  // de cada descritor.
  for(
    const d
    of validos
  ){
    if(
      fila.length>=
      quantidade
    ){
      break;
    }

    fila.push(
      d
    );
  }

  const ponderada=[];

  validos.forEach(
    d=>{
      const peso=
        pesoDescritor(
          d,
          configuracaoDescritores
        );

      for(
        let i=0;
        i<peso;
        i++
      ){
        ponderada.push(
          d
        );
      }
    }
  );

  const deslocamento=
    ponderada.length
      ? hashInteiro(
          identificador
        )%
        ponderada.length
      : 0;

  const rotacionada=[
    ...ponderada.slice(
      deslocamento
    ),
    ...ponderada.slice(
      0,
      deslocamento
    )
  ];

  let i=0;

  while(
    fila.length<
    quantidade
  ){
    fila.push(
      rotacionada[
        i%
        rotacionada.length
      ]
    );

    i++;
  }

  return fila;
}

function posicoesEvidencia(
  total,
  quantidadeEvidencias
){
  if(
    quantidadeEvidencias<=0
  ){
    return [];
  }

  /*
  Para impedir duas fotos seguidas,
  precisamos de pelo menos:
  E + (E - 1) questões.
  */
  if(
    total<
    (
      quantidadeEvidencias*2 -
      1
    )
  ){
    throw new Error(
      `Para manter 1 foto por descritor sem duas fotos consecutivas, ${quantidadeEvidencias} descritores exigem pelo menos ${quantidadeEvidencias*2-1} questões.`
    );
  }

  const posicoes=[];

  for(
    let i=0;
    i<quantidadeEvidencias;
    i++
  ){
    let pos=
      Math.round(
        (
          (i+1)*
          (total+1)
        )
        /
        (
          quantidadeEvidencias+1
        )
      )
      -
      1;

    pos=
      limitar(
        pos,
        0,
        total-1
      );

    while(
      posicoes.includes(
        pos
      )
      ||
      posicoes.some(
        p =>
          Math.abs(
            p-pos
          )<=1
      )
    ){
      pos++;

      if(
        pos>=total
      ){
        pos=0;
      }
    }

    posicoes.push(
      pos
    );
  }

  return posicoes.sort(
    (a,b)=>a-b
  );
}

function distribuirEvidencias(
  questoes,
  descritores,
  identificador
){
  const candidatos=[];
  const usados=
    new Set();

  /*
  Reserva exatamente uma questão
  para cada descritor.
  */
  for(
    let i=0;
    i<questoes.length;
    i++
  ){
    const d=
      descritorQuestao(
        questoes[i]
      );

    if(
      descritores.includes(
        d
      )
      &&
      !usados.has(
        d
      )
    ){
      candidatos.push(
        questoes[i]
      );

      usados.add(
        d
      );
    }
  }

  if(
    candidatos.length!==
    descritores.length
  ){
    const faltantes=
      descritores.filter(
        d =>
          !usados.has(
            d
          )
      );

    throw new Error(
      `Não foi possível reservar uma questão de evidência para: ${faltantes.join(", ")}.`
    );
  }

  const idsCandidatos=
    new Set(
      candidatos
    );

  const normais=
    questoes.filter(
      q =>
        !idsCandidatos.has(
          q
        )
    );

  const ordemCandidatos=[
    ...candidatos
  ]
  .sort(
    (a,b)=>
      hashInteiro(
        `${identificador}|E|${descritorQuestao(a)}`
      )
      -
      hashInteiro(
        `${identificador}|E|${descritorQuestao(b)}`
      )
  );

  const posicoes=
    posicoesEvidencia(
      questoes.length,
      ordemCandidatos.length
    );

  const saida=
    new Array(
      questoes.length
    );

  posicoes.forEach(
    (pos,i)=>{
      saida[pos]={
        ...ordemCandidatos[i],

        exigeEvidenciaCaderno:
          true,

        evidenciaCadernoTipo:
          "CAMERA_AO_VIVO"
      };
    }
  );

  let n=0;

  for(
    let i=0;
    i<saida.length;
    i++
  ){
    if(
      saida[i]
    ){
      continue;
    }

    const q=
      normais[n++];

    saida[i]={
      ...q,

      exigeEvidenciaCaderno:
        false,

      evidenciaCadernoTipo:
        null
    };
  }

  /*
  Defesa final:
  nunca duas evidências consecutivas.
  */
  for(
    let i=1;
    i<saida.length;
    i++
  ){
    if(
      saida[i-1]
        ?.exigeEvidenciaCaderno
      &&
      saida[i]
        ?.exigeEvidenciaCaderno
    ){
      throw new Error(
        "Falha ao espaçar as questões de evidência. Gere novamente a Arena."
      );
    }
  }

  return saida;
}

export function gerarQuestoesAdaptativas({
  quantidade=10,
  descritores=[],
  configuracaoDescritores={},
  historicoPorDescritor={},
  estudanteId="",
  codigoArena=""
}={}){
  const total=
    Math.max(
      1,
      Math.floor(
        numero(
          quantidade,
          10
        )
      )
    );

  const validos=[
    ...new Set(
      (descritores||[])
        .map(
          d =>
            String(d)
              .toUpperCase()
        )
        .filter(
          d =>
            HABILIDADES_PAEBES[
              d
            ]
        )
    )
  ];

  if(
    !validos.length
  ){
    throw new Error(
      "Selecione pelo menos um descritor válido para gerar a trajetória adaptativa."
    );
  }

  if(
    !estudanteId
  ){
    throw new Error(
      "O estudante precisa estar identificado antes da geração adaptativa."
    );
  }

  if(
    total<
    validos.length
  ){
    throw new Error(
      `A Arena possui ${validos.length} descritores e apenas ${total} questões. Para garantir ao menos 1 questão por descritor, aumente a quantidade.`
    );
  }

  const identidade=
    `${
      codigoArena ||
      "ARENA"
    }|${estudanteId}`;

  const fila=
    montarFilaDescritores(
      validos,
      total,
      configuracaoDescritores,
      historicoPorDescritor,
      identidade
    );

  const usadas=
    new Set();

  const questoes=[];

  for(
    let i=0;
    i<fila.length;
    i++
  ){
    const descritor=
      fila[i];

    const nivel=
      nivelParaQuestao(
        descritor,
        historicoPorDescritor,
        configuracaoDescritores
      );

    const etapaAntes=
      obterEtapaAtual(
        historicoPorDescritor
          ?.[descritor] ||
        {}
      );

    let escolhida=
      null;

    for(
      let tentativa=0;
      tentativa<160;
      tentativa++
    ){
      const seed=
        hashInteiro(
          `${identidade}|${descritor}|${nivel}|${i}|${tentativa}`
        );

      const q=
        gerarQuestaoDescritor(
          descritor,
          nivel,
          seed
        );

      const assinatura=
        assinaturaQuestao(
          q
        );

      if(
        usadas.has(
          assinatura
        )
      ){
        continue;
      }

      usadas.add(
        assinatura
      );

      escolhida={
        ...q,

        descritor:
          q?.descritor ||
          q?.descriptor ||
          descritor,

        descriptor:
          q?.descriptor ||
          q?.descritor ||
          descritor,

        nivel,
        level:nivel,

        habilidade:
          q?.habilidade ||
          HABILIDADES_PAEBES[
            descritor
          ] ||
          "",

        nucleo:
          q?.nucleo ||
          nucleoDoDescritor(
            descritor
          ),

        motorAdaptativo:{
          versao:
            VERSAO_MOTOR_ADAPTATIVO,

          estudanteId,
          codigoArena,

          etapaAntes:
            etapaAntes.indice,

          nivelAntes:
            etapaAntes.nivel,

          situacaoAntes:
            etapaAntes.situacao,

          nivelAlvo:
            nivel,

          ordemIndividual:
            i+1,

          sondagemInicial:
            !temHistoricoSuficiente(
              historicoPorDescritor
                ?.[descritor] ||
              {}
            )
        }
      };

      break;
    }

    if(
      !escolhida
    ){
      throw new Error(
        `Não foi possível gerar questão adaptativa inédita para ${descritor}.`
      );
    }

    questoes.push(
      escolhida
    );
  }

  const comEvidencias=
    distribuirEvidencias(
      questoes,
      validos,
      identidade
    );

  if(
    comEvidencias.length!==
    total
  ){
    throw new Error(
      "A quantidade individual de questões ficou diferente da quantidade oficial da Arena."
    );
  }

  /*
  Defesa pedagógica:
  estudante sem histórico não pode
  iniciar a sondagem em Proficiente
  ou Avançado.
  */
  const primeira=
    comEvidencias[0];

  const histPrimeira=
    historicoPorDescritor
      ?.[
        descritorQuestao(
          primeira
        )
      ] ||
    {};

  if(
    !temHistoricoSuficiente(
      histPrimeira
    )
    &&
    indiceNivel(
      primeira?.nivel
    )>0
  ){
    throw new Error(
      "Falha pedagógica: a sondagem inicial deveria começar em Abaixo do Básico."
    );
  }

  return comEvidencias;
}

export function criarRegistroRespostaAdaptativa({
  questao,
  respostaSelecionada,
  acertou,
  dataHora=
    new Date()
      .toISOString(),
  tempoSegundos=null
}={}){
  const descritor=
    descritorQuestao(
      questao
    );

  const nivel=
    normalizarNivel(
      questao?.level ||
      questao?.nivel ||
      "ABAIXO DO BÁSICO"
    );

  return {
    questaoId:
      questao?.questaoId ||
      questao?.id ||
      null,

    descritor,
    nivel,

    acertou:
      Boolean(
        acertou
      ),

    correta:
      Boolean(
        acertou
      ),

    respostaSelecionada,

    alternativa:
      respostaSelecionada,

    respostaCorreta:
      questao?.correct ??
      questao?.correta ??
      null,

    tempoSegundos:
      tempoSegundos==null
        ? null
        : numero(
            tempoSegundos,
            0
          ),

    dataHora,

    timestampCliente:
      Date.now(),

    habilidade:
      questao?.habilidade ||
      HABILIDADES_PAEBES[
        descritor
      ] ||
      "",

    parteHabilidade:
      questao?.parteHabilidade ||
      questao?.tarefa ||
      "",

    nucleo:
      questao?.nucleo ||
      nucleoDoDescritor(
        descritor
      ),

    origem:
      questao?.origem ||
      questao?.origemTipo ||
      "",

    fonteReferencia:
      questao?.fonteReferencia ||
      "",

    exigeEvidenciaCaderno:
      Boolean(
        questao
          ?.exigeEvidenciaCaderno
      ),

    versaoMotor:
      VERSAO_MOTOR_ADAPTATIVO
  };
}

export function montarResumoConsolidacao({
  descritores=[],
  historicoPorDescritor={},
  respostasDaArena=[],
  politica={}
}={}){
  const porDescritor={};

  descritores.forEach(
    d=>{
      const respostas=
        arraySeguro(
          respostasDaArena
        )
        .filter(
          r =>
            (
              r?.descritor ||
              r?.descriptor
            )===d
        );

      porDescritor[d]=
        avaliarConsolidacao(
          historicoPorDescritor
            ?.[d] ||
          {},
          respostas,
          politica
        );
    }
  );

  return porDescritor;
}

export function montarPacotePDFIndividual({
  arena={},
  estudante={},
  questoes=[],
  respostas=[],
  resultado={},
  consolidacao={}
}={}){
  return {
    versao:
      "pdf-individual-arena-2026-v2",

    liberadoSomenteComArenaEncerrada:
      true,

    arena:{
      codigo:
        arena?.codigo ||
        "",

      nome:
        arena?.nome ||
        "Arena Matemática — Coliseu do Conhecimento",

      dataEncerramento:
        arena?.dataEncerramento ||
        arena?.encerradaEm ||
        null
    },

    estudante:{
      id:
        estudante?.estudanteId ||
        estudante?.id ||
        "",

      nome:
        estudante?.nomeCompleto ||
        estudante?.nome ||
        "",

      turma:
        estudante?.turma ||
        ""
    },

    resultado:{
      ...resultado
    },

    consolidacao:{
      ...consolidacao
    },

    questoes:
      arraySeguro(
        questoes
      )
      .map(
        (q,index)=>{
          const ops=
            opcoesQuestao(
              q
            );

          const gab=
            q?.correct ??
            q?.correta ??
            null;

          return {
            ordem:
              index+1,

            questaoId:
              q?.questaoId ||
              q?.id ||
              null,

            descritor:
              descritorQuestao(
                q
              ),

            habilidade:
              q?.habilidade ||
              "",

            parteHabilidade:
              q?.parteHabilidade ||
              q?.tarefa ||
              "",

            nivel:
              q?.level ||
              q?.nivel ||
              "",

            texto:
              textoQuestao(
                q
              ),

            alternativas:
              ops,

            gabaritoIndice:
              gab,

            gabaritoTexto:
              Number.isInteger(
                Number(
                  gab
                )
              )
                ? ops[
                    Number(
                      gab
                    )
                  ] ?? ""
                : "",

            resolucao:
              q?.solucao ||
              "",

            origem:
              q?.origem ||
              q?.origemTipo ||
              "",

            fonteReferencia:
              q?.fonteReferencia ||
              "",

            respostaEstudante:
              arraySeguro(
                respostas
              )
              .find(
                r =>
                  r?.questaoId===
                  (
                    q?.questaoId ||
                    q?.id
                  )
              )
              ||
              null
          };
        }
      )
  };
}

console.log(
  "🧭 Motor Adaptativo v2 carregado — sondagem inicia em ABB sem histórico, evolução cumulativa e evidências espaçadas."
);
