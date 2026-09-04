import {
  gerarQuestaoDescritor,
  HABILIDADES_PAEBES,
  NUCLEOS_APRENDIZAGEM
} from "./question-bank.js";

export const VERSAO_MOTOR_ADAPTATIVO = "arena-adaptativa-2026-v1";

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
// NÃO representa cortes oficiais de proficiência do PAEBES.
// Poderá ser alterada posteriormente pelo Professor.
export const POLITICA_CONSOLIDACAO_PADRAO = Object.freeze({
  minimoRespostasNoNivel:4,
  percentualParaConsolidar:75,
  minimoAcertosRecentes:2,
  janelaRecente:8,
  naoApagarConsolidacao:true
});

function numero(v, padrao=0){
  const n=Number(v);
  return Number.isFinite(n)?n:padrao;
}

function limitar(n,min,max){
  return Math.max(min,Math.min(max,n));
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

  if(n.includes("BASICO") && !n.includes("ABAIXO")){
    return "BÁSICO";
  }

  return "ABAIXO DO BÁSICO";
}

export function normalizarSituacao(
  situacao="EM DESENVOLVIMENTO"
){
  const s=normalizarTexto(situacao);

  return s.includes("CONSOLID")
    ? "CONSOLIDADO"
    : "EM DESENVOLVIMENTO";
}

function hashInteiro(texto=""){
  let h=2166136261;
  const str=String(texto);

  for(let i=0;i<str.length;i++){
    h^=str.charCodeAt(i);
    h=Math.imul(h,16777619);
  }

  return h>>>0;
}

function assinaturaQuestao(q){
  return normalizarTexto(
    `${
      q?.descriptor||
      q?.descritor||
      ""
    }|${
      q?.level||
      q?.nivel||
      ""
    }|${
      q?.text||
      q?.texto||
      ""
    }|${
      (
        q?.options||
        q?.opcoes||
        []
      ).join("|")
    }`
  );
}

function nucleoDoDescritor(descritor){
  return (
    Object.values(
      NUCLEOS_APRENDIZAGEM||{}
    )
    .find(
      n=>
        Array.isArray(n?.descritores) &&
        n.descritores.includes(descritor)
    )?.nome
  ) || "Recomposição e Consolidação";
}

function etapaPorNivelSituacao(
  nivel,
  situacao
){
  const n=normalizarNivel(nivel);
  const s=normalizarSituacao(situacao);

  return (
    ESCADA_CONSOLIDACAO.find(
      e=>
        e.nivel===n &&
        e.situacao===s
    )
    ||
    ESCADA_CONSOLIDACAO[0]
  );
}

export function obterEtapaAtual(
  historicoDescritor={}
){
  if(
    Number.isInteger(
      historicoDescritor?.etapaConsolidacao
    )
  ){
    return ESCADA_CONSOLIDACAO[
      limitar(
        historicoDescritor.etapaConsolidacao,
        0,
        ESCADA_CONSOLIDACAO.length-1
      )
    ];
  }

  const nivel=
    historicoDescritor?.nivelAtual ||
    historicoDescritor?.nivel ||
    historicoDescritor?.nivelAlcancado ||
    "ABAIXO DO BÁSICO";

  let situacao=
    historicoDescritor?.situacaoAtual ||
    historicoDescritor?.situacao;

  if(!situacao){
    situacao=
      historicoDescritor?.consolidado===true
        ? "CONSOLIDADO"
        : "EM DESENVOLVIMENTO";
  }

  return etapaPorNivelSituacao(
    nivel,
    situacao
  );
}

export function proximaEtapa(
  etapaAtual
){
  const indice=limitar(
    numero(
      etapaAtual?.indice,
      0
    )+1,
    0,
    ESCADA_CONSOLIDACAO.length-1
  );

  return ESCADA_CONSOLIDACAO[indice];
}

export function nivelAlvoDoHistorico(
  historicoDescritor={}
){
  const atual=
    obterEtapaAtual(
      historicoDescritor
    );

  if(
    atual.situacao==="CONSOLIDADO" &&
    atual.indice<
      ESCADA_CONSOLIDACAO.length-1
  ){
    return proximaEtapa(atual).nivel;
  }

  return atual.nivel;
}

function respostasDoNivel(
  historicoDescritor={},
  nivel
){
  const respostas=
    Array.isArray(
      historicoDescritor?.respostas
    )
      ? historicoDescritor.respostas
      : [];

  return respostas.filter(
    r=>
      normalizarNivel(
        r?.nivel||
        r?.level||
        nivel
      )===nivel
  );
}

function acertouResposta(r){
  if(
    typeof r?.acertou==="boolean"
  ){
    return r.acertou;
  }

  if(
    typeof r?.correta==="boolean"
  ){
    return r.correta;
  }

  if(
    typeof r?.isCorrect==="boolean"
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
    atual.situacao==="CONSOLIDADO" &&
    atual.indice<7
      ? proximaEtapa(atual).nivel
      : atual.nivel;

  const anteriores=
    respostasDoNivel(
      historicoDescritor,
      nivelTrabalhado
    );

  const novas=
    (
      Array.isArray(respostasNovas)
        ? respostasNovas
        : []
    ).filter(
      r=>
        normalizarNivel(
          r?.nivel||
          r?.level||
          nivelTrabalhado
        )===nivelTrabalhado
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
    janela.filter(
      acertouResposta
    ).length;

  const percentual=
    janela.length
      ? Math.round(
          (
            acertos/
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
    ultimas.filter(
      acertouResposta
    ).length;

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

  let etapaDepois=atual;
  let evoluiu=false;

  if(consolidou){

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

function montarFilaDescritores(
  descritores,
  quantidade,
  configuracaoDescritores,
  identificador
){
  const expandidos=[];

  descritores.forEach(
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
        expandidos.push(d);
      }
    }
  );

  const deslocamento=
    expandidos.length
      ? hashInteiro(
          identificador
        )%
        expandidos.length
      : 0;

  const rotacionados=[
    ...expandidos.slice(
      deslocamento
    ),
    ...expandidos.slice(
      0,
      deslocamento
    )
  ];

  const fila=[];

  for(
    let i=0;
    i<quantidade;
    i++
  ){
    fila.push(
      rotacionados[
        i%
        rotacionados.length
      ]
    );
  }

  return fila;
}

function configuracaoNivelProfessor(
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

function nivelParaQuestao(
  descritor,
  historicoPorDescritor,
  configuracaoDescritores
){
  const historico=
    historicoPorDescritor
      ?.[descritor]
    || {};

  const adaptativo=
    nivelAlvoDoHistorico(
      historico
    );

  const fixado=
    configuracaoNivelProfessor(
      descritor,
      configuracaoDescritores
    );

  // Se o Professor fixa explicitamente
  // um nível, a Arena respeita.
  // Em MISTO, o histórico individual decide.
  return fixado||adaptativo;
}

function marcarEvidencias(
  questoes,
  descritores
){
  const primeiraPorDescritor=
    new Set();

  return questoes.map(
    q=>{
      const d=
        q.descriptor||
        q.descritor;

      const deve=
        descritores.includes(d)
        &&
        !primeiraPorDescritor.has(d);

      if(deve){
        primeiraPorDescritor.add(d);
      }

      return {
        ...q,
        exigeEvidenciaCaderno:deve,
        evidenciaCadernoTipo:
          deve
            ? "CAMERA_AO_VIVO"
            : null
      };
    }
  );
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
        .filter(
          d=>
            HABILIDADES_PAEBES[d]
        )
    )
  ];

  if(!validos.length){
    throw new Error(
      "Selecione pelo menos um descritor válido para gerar a trajetória adaptativa."
    );
  }

  if(!estudanteId){
    throw new Error(
      "O estudante precisa estar identificado antes da geração adaptativa."
    );
  }

  const identidade=
    `${
      codigoArena||
      "ARENA"
    }|${estudanteId}`;

  const fila=
    montarFilaDescritores(
      validos,
      total,
      configuracaoDescritores,
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
          ?.[descritor]
        || {}
      );

    let escolhida=null;

    for(
      let tentativa=0;
      tentativa<120;
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
        assinaturaQuestao(q);

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

        nivel,
        level:nivel,

        habilidade:
          q.habilidade||
          HABILIDADES_PAEBES[
            descritor
          ]||
          "",

        nucleo:
          q.nucleo||
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
            i+1
        }
      };

      break;
    }

    if(!escolhida){
      throw new Error(
        `Não foi possível gerar questão adaptativa inédita para ${descritor}.`
      );
    }

    questoes.push(
      escolhida
    );
  }

  const comEvidencias=
    marcarEvidencias(
      questoes,
      validos
    );

  if(
    comEvidencias.length!==
    total
  ){
    throw new Error(
      "A quantidade individual de questões ficou diferente da quantidade oficial da Arena."
    );
  }

  return comEvidencias;
}

export function criarRegistroRespostaAdaptativa({
  questao,
  respostaSelecionada,
  acertou,
  dataHora=
    new Date().toISOString(),
  tempoSegundos=null
}={}){
  const descritor=
    questao?.descriptor||
    questao?.descritor||
    "";

  const nivel=
    normalizarNivel(
      questao?.level||
      questao?.nivel||
      "ABAIXO DO BÁSICO"
    );

  return {
    questaoId:
      questao?.questaoId||
      questao?.id||
      null,

    descritor,
    nivel,

    acertou:
      Boolean(acertou),

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

    habilidade:
      questao?.habilidade||
      HABILIDADES_PAEBES[
        descritor
      ]||
      "",

    parteHabilidade:
      questao?.parteHabilidade||
      questao?.tarefa||
      "",

    nucleo:
      questao?.nucleo||
      nucleoDoDescritor(
        descritor
      ),

    origem:
      questao?.origem||
      "",

    fonteReferencia:
      questao?.fonteReferencia||
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
        (
          respostasDaArena||
          []
        ).filter(
          r=>
            (
              r?.descritor||
              r?.descriptor
            )===d
        );

      porDescritor[d]=
        avaliarConsolidacao(
          historicoPorDescritor
            ?.[d]
          || {},
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
      "pdf-individual-arena-2026-v1",

    liberadoSomenteComArenaEncerrada:
      true,

    arena:{
      codigo:
        arena?.codigo||
        "",

      nome:
        arena?.nome||
        "Arena Matemática — Coliseu do Conhecimento",

      dataEncerramento:
        arena?.dataEncerramento||
        arena?.encerradaEm||
        null
    },

    estudante:{
      id:
        estudante?.estudanteId||
        estudante?.id||
        "",

      nome:
        estudante?.nomeCompleto||
        estudante?.nome||
        "",

      turma:
        estudante?.turma||
        ""
    },

    resultado:{
      ...resultado
    },

    consolidacao:{
      ...consolidacao
    },

    questoes:
      (questoes||[])
        .map(
          (q,index)=>({
            ordem:
              index+1,

            questaoId:
              q?.questaoId||
              q?.id||
              null,

            descritor:
              q?.descriptor||
              q?.descritor||
              "",

            habilidade:
              q?.habilidade||
              "",

            parteHabilidade:
              q?.parteHabilidade||
              q?.tarefa||
              "",

            nivel:
              q?.level||
              q?.nivel||
              "",

            texto:
              q?.text||
              q?.texto||
              "",

            alternativas:
              q?.options||
              q?.opcoes||
              [],

            gabaritoIndice:
              q?.correct ??
              q?.correta ??
              null,

            gabaritoTexto:
              (
                q?.options||
                q?.opcoes||
                []
              )[
                q?.correct ??
                q?.correta
              ]
              ??
              "",

            resolucao:
              q?.solucao||
              "",

            origem:
              q?.origem||
              "",

            fonteReferencia:
              q?.fonteReferencia||
              "",

            respostaEstudante:
              (
                respostas||
                []
              ).find(
                r=>
                  r?.questaoId===
                  (
                    q?.questaoId||
                    q?.id
                  )
              )
              ||
              null
          })
        )
  };
}

console.log(
  "🧭 Motor Adaptativo v1 carregado — consolidação crescente ABB → Básico → Proficiente → Avançado."
);
