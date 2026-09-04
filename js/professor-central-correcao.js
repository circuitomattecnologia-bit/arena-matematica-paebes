// ARENA MATEMÁTICA — CENTRAL DE CORREÇÃO AO VIVO DO PROFESSOR
// Professor Leopoldo — 2026

import {
  observarRespostas,
  buscarEvidenciaCaderno
} from "./firebase-service.js";

let respostasArena = {};
let pararRespostas = null;
let codigoObservado = null;
let estudanteAbertoId = null;

function arenaLocal(){
  try{
    return JSON.parse(localStorage.getItem("arenaPAEBES") || "null");
  }catch{
    return null;
  }
}

function numeroQuestao(j){
  return Math.max(
    0,
    Number(
      j?.questaoAtual ??
      j?.questionIndex ??
      j?.indiceQuestao ??
      0
    ) || 0
  );
}

function textoOpcao(op){
  if(typeof op === "object"){
    return op?.texto ||
           op?.text ||
           op?.valor ||
           JSON.stringify(op);
  }

  return String(op ?? "");
}

function respostasDoEstudante(id){
  return Object
    .values(respostasArena?.[id] || {})
    .sort(
      (a,b)=>
        Number(
          a?.criadoEm ||
          a?.timestampCliente ||
          0
        ) -
        Number(
          b?.criadoEm ||
          b?.timestampCliente ||
          0
        )
    );
}

function respostaDaQuestao(id,idx,q){

  const qid=String(
    q?.questaoId ||
    q?.id ||
    ""
  );

  return [...respostasDoEstudante(id)]
    .reverse()
    .find(r=>
      Number(r?.indiceQuestao) === Number(idx) ||
      (
        qid &&
        String(r?.questaoId || "") === qid
      )
    ) || null;
}

function tempoRestante(j,q){

  const limite=Number(
    j?.tempoQuestaoSegundos ??
    j?.questionTimeLimitSec ??
    j?.tempoLimiteSegundos ??
    q?.tempoSegundos ??
    0
  );

  const bruto=
    j?.questaoIniciadaEm ??
    j?.questionStartedAt ??
    j?.inicioQuestao ??
    j?.questaoInicioEm ??
    null;

  if(!limite || bruto == null){
    return "—";
  }

  let inicio=null;

  if(typeof bruto === "number"){

    inicio=
      bruto < 100000000000
        ? bruto*1000
        : bruto;

  }else if(typeof bruto === "string"){

    const n=Number(bruto);

    inicio=
      Number.isFinite(n) && n>0
        ? (
            n < 100000000000
              ? n*1000
              : n
          )
        : Date.parse(bruto);
  }

  if(!Number.isFinite(inicio)){
    return "—";
  }

  const restante=Math.max(
    0,
    Math.ceil(
      limite-
      (Date.now()-inicio)/1000
    )
  );

  const min=Math.floor(restante/60);
  const seg=restante%60;

  return (
    String(min).padStart(2,"0")+
    ":"+
    String(seg).padStart(2,"0")
  );
}

function garantirEstrutura(){

  const modal=
    document.getElementById(
      "modalQuestaoProfessor"
    );

  const box=
    modal?.querySelector(
      ".modalBox"
    );

  if(!box){
    return false;
  }

  if(
    !document.getElementById(
      "centralCorrecaoProfessorStyle"
    )
  ){

    const style=
      document.createElement("style");

    style.id=
      "centralCorrecaoProfessorStyle";

    style.textContent=`

      .ccpGrid{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:12px;
        margin-top:14px
      }

      .ccpCard{
        background:#11151d;
        border:1px solid rgba(244,199,91,.20);
        border-radius:14px;
        padding:14px;
        line-height:1.55
      }

      .ccpCard h4{
        margin:0 0 8px;
        color:#ffdf83
      }

      .ccpResp.ok{
        border-color:#22c55e
      }

      .ccpResp.erro{
        border-color:#ef4444
      }

      .ccpResp.pendente{
        border-color:#f59e0b
      }

      .ccpImg{
        max-width:100%;
        border-radius:12px;
        margin-top:10px;
        border:1px solid rgba(255,255,255,.16)
      }

      .ccpOrigem{
        font-size:12px;
        color:#d4c7b6;
        margin-top:8px
      }

      @media(max-width:800px){

        .ccpGrid{
          grid-template-columns:1fr
        }

      }

    `;

    document.head.appendChild(style);
  }

  if(
    !document.getElementById(
      "ccpResposta"
    )
  ){

    const bloco=
      document.createElement("div");

    bloco.id="ccpBloco";

    bloco.innerHTML=`

      <div class="ccpGrid">

        <div
          id="ccpResposta"
          class="ccpCard ccpResp pendente"
        >

          <h4>
            🧑‍🎓 Resposta do estudante
          </h4>

          <div>
            Aguardando resposta.
          </div>

        </div>

        <div
          id="ccpGabarito"
          class="ccpCard"
        >

          <h4>
            ✅ Gabarito do professor
          </h4>

          <div>
            —
          </div>

        </div>

      </div>

      <div
        id="ccpSolucao"
        class="ccpCard"
        style="margin-top:12px"
      >

        <h4>
          🧠 Solução passo a passo
        </h4>

        <div>
          —
        </div>

      </div>

      <div
        id="ccpEvidencia"
        class="ccpCard"
        style="margin-top:12px"
      >

        <h4>
          📓 Evidência do caderno
        </h4>

        <div>
          Esta questão não exige evidência
          ou ainda não foi enviada.
        </div>

      </div>

    `;

    box.appendChild(bloco);
  }

  return true;
}

function atualizarMeta(q,j,idx,total){

  const meta=
    document.getElementById(
      "modalMeta"
    );

  if(!meta){
    return;
  }

  const desc=
    q?.descritor ||
    q?.descriptor ||
    j?.descritorAtual ||
    "—";

  const campos=[

    [
      "Progresso",
      `${Math.min(idx+1,total)}/${total}`
    ],

    [
      "Núcleo",
      q?.nucleo || "—"
    ],

    [
      "Descritor",
      desc
    ],

    [
      "Parte da habilidade",
      q?.parteHabilidade ||
      q?.tarefa ||
      "—"
    ],

    [
      "Nível",
      q?.nivel ||
      q?.level ||
      j?.nivelAtual ||
      "—"
    ],

    [
      "Habilidade",
      q?.habilidade ||
      "—"
    ],

    [
      "Origem",
      q?.origem ||
      q?.origemTipo ||
      "—"
    ],

    [
      "Fonte / Referência",
      q?.fonteReferencia ||
      "—"
    ],

    [
      "Tempo restante",
      tempoRestante(j,q)
    ]

  ];

  meta.innerHTML=
    campos
      .map(
        ([k,v])=>
          `
          <div class="metaItem">
            <span>${k}</span>
            <strong>${v}</strong>
          </div>
          `
      )
      .join("");
}

async function renderCorrecao(id){

  if(!garantirEstrutura()){
    return;
  }

  const arena=
    arenaLocal() || {};

  const competidores=
    arena.competidores || {};

  const estudante=
    competidores[id] ||
    Object
      .values(competidores)
      .find(
        x=>
          String(
            x?.id ||
            x?.jogadorId ||
            ""
          ) ===
          String(id)
      );

  if(!estudante){
    return;
  }

  estudanteAbertoId=id;

  const questoes=
    Array.isArray(arena.questoes)
      ? arena.questoes
      : [];

  const idx=
    numeroQuestao(estudante);

  const q=
    questoes[idx] || null;

  const titulo=
    document.getElementById(
      "modalTitulo"
    );

  const subtitulo=
    document.getElementById(
      "modalSubtitulo"
    );

  if(titulo){

    titulo.textContent=
      `👁 ${estudante.nome || "Competidor"} — Central de Correção ao Vivo`;

  }

  if(subtitulo){

    subtitulo.textContent=
      "Questão do estudante • gabarito e solução exclusivos do professor";

  }

  if(!q){

    const resposta=
      document.getElementById(
        "ccpResposta"
      );

    resposta.className=
      "ccpCard ccpResp pendente";

    resposta.innerHTML=`
      <h4>
        🧑‍🎓 Resposta do estudante
      </h4>
      <div>
        Etapa regular concluída
        ou questão indisponível.
      </div>
    `;

    document.getElementById(
      "ccpGabarito"
    ).innerHTML=`
      <h4>
        ✅ Gabarito do professor
      </h4>
      <div>—</div>
    `;

    document.getElementById(
      "ccpSolucao"
    ).innerHTML=`
      <h4>
        🧠 Solução passo a passo
      </h4>
      <div>—</div>
    `;

    return;
  }

  atualizarMeta(
    q,
    estudante,
    idx,
    questoes.length
  );

  const opcoes=
    q.opcoes ||
    q.options ||
    q.alternativas ||
    [];

  const correta=
    Number(
      q.correta ??
      q.correct ??
      -1
    );

  const resposta=
    respostaDaQuestao(
      id,
      idx,
      q
    );

  const letraGab=
    correta>=0
      ? String.fromCharCode(65+correta)
      : "—";

  const textoGab=
    correta>=0 &&
    opcoes[correta]!=null
      ? textoOpcao(
          opcoes[correta]
        )
      : "—";

  document.getElementById(
    "ccpGabarito"
  ).innerHTML=`

    <h4>
      ✅ Gabarito do professor
    </h4>

    <div>
      <strong>${letraGab}</strong>
      —
      ${textoGab}
    </div>

  `;

  if(resposta){

    const alternativa=
      Number(
        resposta.alternativa
      );

    const letraAluno=
      Number.isInteger(alternativa)
        ? String.fromCharCode(
            65+alternativa
          )
        : "—";

    const textoAluno=
      opcoes?.[alternativa]!=null
        ? textoOpcao(
            opcoes[alternativa]
          )
        : "—";

    const acertou=
      resposta.correta === true;

    const box=
      document.getElementById(
        "ccpResposta"
      );

    box.className=
      `ccpCard ccpResp ${
        acertou
          ? "ok"
          : "erro"
      }`;

    box.innerHTML=`

      <h4>
        🧑‍🎓 Resposta do estudante
      </h4>

      <div>

        <strong>
          ${letraAluno}
        </strong>

        —
        ${textoAluno}

        <br>

        <strong>
          ${
            acertou
              ? "✅ ACERTOU"
              : "❌ ERROU"
          }
        </strong>

      </div>

    `;

  }else{

    const box=
      document.getElementById(
        "ccpResposta"
      );

    box.className=
      "ccpCard ccpResp pendente";

    box.innerHTML=`

      <h4>
        🧑‍🎓 Resposta do estudante
      </h4>

      <div>
        Ainda não enviou resposta
        para esta questão.
      </div>

    `;
  }

  document.getElementById(
    "ccpSolucao"
  ).innerHTML=`

    <h4>
      🧠 Solução passo a passo
    </h4>

    <div>

      ${
        q?.solucao ||
        "Solução ainda não registrada para esta questão."
      }

    </div>

    <div class="ccpOrigem">

      ${
        q?.fonteReferencia ||
        q?.origem ||
        ""
      }

    </div>

  `;

  const mapa=
    arena?.questaoEvidenciaPorDescritor ||
    arena?.evidenciasObrigatorias ||
    {};

  const exige=
    Object
      .values(mapa || {})
      .some(
        v=>
          Number(v) ===
          Number(idx)
      );

  const evidenciaBox=
    document.getElementById(
      "ccpEvidencia"
    );

  if(!exige){

    evidenciaBox.innerHTML=`

      <h4>
        📓 Evidência do caderno
      </h4>

      <div>
        Esta questão não é a questão
        de evidência obrigatória
        deste descritor.
      </div>

    `;

    return;
  }

  evidenciaBox.innerHTML=`

    <h4>
      📓 Evidência do caderno
    </h4>

    <div>
      Carregando evidência...
    </div>

  `;

  const questaoId=
    String(
      q?.questaoId ||
      q?.id ||
      `Q${idx}`
    );

  try{

    const evidencia=
      await buscarEvidenciaCaderno(
        arena.codigo,
        id,
        questaoId
      );

    if(evidencia?.fotoBase64){

      evidenciaBox.innerHTML=`

        <h4>
          📓 Evidência do caderno
        </h4>

        <div>
          <strong>
            Foto enviada pelo estudante.
          </strong>
        </div>

        <img
          class="ccpImg"
          src="${evidencia.fotoBase64}"
          alt="Evidência do caderno"
        >

      `;

    }else{

      evidenciaBox.innerHTML=`

        <h4>
          📓 Evidência do caderno
        </h4>

        <div>
          Foto ainda não enviada
          ou questão liberada sem foto.
        </div>

      `;
    }

  }catch{

    evidenciaBox.innerHTML=`

      <h4>
        📓 Evidência do caderno
      </h4>

      <div>
        Não foi possível carregar
        a evidência neste momento.
      </div>

    `;
  }
}

function observarCodigoAtual(){

  const codigo=
    arenaLocal()?.codigo ||
    null;

  if(
    codigo === codigoObservado
  ){
    return;
  }

  if(
    typeof pararRespostas ===
    "function"
  ){
    pararRespostas();
  }

  respostasArena={};

  codigoObservado=
    codigo;

  if(!codigo){
    return;
  }

  pararRespostas=
    observarRespostas(
      codigo,
      dados=>{

        respostasArena=
          dados || {};

        const modal=
          document.getElementById(
            "modalQuestaoProfessor"
          );

        if(
          estudanteAbertoId &&
          modal?.classList.contains(
            "aberto"
          )
        ){

          renderCorrecao(
            estudanteAbertoId
          );

        }

      }
    );
}

function instalar(){

  garantirEstrutura();

  const original=
    window.verQuestaoProfessor;

  window.verQuestaoProfessor=
    function(id){

      if(
        typeof original ===
        "function"
      ){

        original(id);

      }

      setTimeout(
        ()=>renderCorrecao(id),
        0
      );

    };

  const fecharOriginal=
    window.fecharDetalheQuestao;

  window.fecharDetalheQuestao=
    function(){

      estudanteAbertoId=null;

      if(
        typeof fecharOriginal ===
        "function"
      ){

        fecharOriginal();

      }

    };

  observarCodigoAtual();

  setInterval(
    observarCodigoAtual,
    1000
  );

  console.log(
    "✅ Central de Correção ao Vivo do Professor carregada."
  );
}

let tentativas=0;

const espera=
  setInterval(
    ()=>{

      tentativas++;

      if(
        typeof window.verQuestaoProfessor ===
        "function" &&
        document.getElementById(
          "modalQuestaoProfessor"
        )
      ){

        clearInterval(espera);

        instalar();

      }else if(
        tentativas > 30
      ){

        clearInterval(espera);

        console.warn(
          "Central de Correção: professor.html não ficou pronto a tempo."
        );

      }

    },
    100
  );
// ======================================================
// HOTFIX — BOTÕES PRINCIPAIS DO PROFESSOR
// ======================================================

const AMA_HOTFIX=[
  "D013_M","D039_M","D043_M","D049_M","D064_M",
  "D074_M","D085_M","D087_M","D088_M","D097_M",
  "D111_M","D124_M","D125_M","D129_M"
];

window.marcarAMA=function(){
  document.querySelectorAll(".desc input").forEach(x=>{
    if(!x.disabled){
      x.checked=AMA_HOTFIX.includes(x.value);
    }
  });

  if(typeof window.renderConfiguracaoDescritores==="function"){
    window.renderConfiguracaoDescritores();
  }

  alert("🎯 Descritores prioritários da AMA selecionados.");
};

window.limpar=function(){
  document.querySelectorAll(".desc input").forEach(x=>{
    x.checked=false;
  });

  document.querySelectorAll(".selNucleo").forEach(x=>{
    x.checked=false;
  });

  alert("Seleção de descritores limpa.");
};

window.criarArena=async function(){

  try{

    const sel=[
      ...document.querySelectorAll(".desc input:checked")
    ].map(x=>x.value);

    if(!sel.length){
      alert("Selecione pelo menos um descritor.");
      return;
    }

    const quantidade=Math.max(
      10,
      Number(document.getElementById("qtd")?.value || 10)
    );

    const dist={
      abb:Number(document.getElementById("pctAbb")?.value || 40),
      basico:Number(document.getElementById("pctBasico")?.value || 35),
      proficiente:Number(document.getElementById("pctProficiente")?.value || 25),
      avancado:Number(document.getElementById("pctAvancado")?.value || 0)
    };

    if(
      Object.values(dist).reduce((a,b)=>a+b,0)!==100
    ){
      alert("A distribuição dos níveis deve somar 100%.");
      return;
    }

    const banco=await import("./question-bank.js");
    const firebase=await import("./firebase-service.js");

    const configuracao={};

    document.querySelectorAll(".configLinha").forEach(l=>{
      configuracao[l.dataset.desc]={
        peso:Number(
          l.querySelector(".pesoDesc")?.value || 1
        ),
        nivel:
          l.querySelector(".nivelDesc")?.value ||
          "MISTO"
      };
    });

    const questoes=banco.gerarQuestoesArena({
      quantidade,
      descritores:sel,
      configuracaoDescritores:configuracao,
      distribuicaoNiveis:dist
    });

    const evidencia={};

    sel.forEach(d=>{
      const i=questoes.findIndex(q=>
        String(
          q?.descritor ||
          q?.descriptor ||
          ""
        ).toUpperCase()===d
      );

      if(i>=0){
        evidencia[d]=i;
      }
    });

    const cod=
      "MAT-"+Math.floor(1000+Math.random()*9000);

    const dados={
      codigo:cod,
      nome:
        document.getElementById("nomeArena")?.value ||
        "Arena Matemática",
      turma:
        document.getElementById("turma")?.value ||
        "",
      quantidade:questoes.length,
      quantidadeSolicitada:quantidade,
      limite:Number(
        document.getElementById("limite")?.value || 60
      ),
      descritores:sel,
      configuracaoDescritores:configuracao,
      distribuicaoNiveis:dist,
      configBoss:{
        pctAcertos:Number(
          document.getElementById("bossPctAcertos")?.value || 60
        ),
        pctConcluidos:Number(
          document.getElementById("bossPctConcluidos")?.value || 70
        )
      },
      questoes,
      questaoEvidenciaPorDescritor:evidencia,
      status:"preparacao",
      entradaLiberada:false,
      aceitaNovos:false,
      questaoAtual:0,
      competidores:{},
      novaFase:true,
      versaoArena:"nova-fase-2026-v1",
      criadaEm:new Date().toISOString()
    };

    await firebase.salvarArena(cod,dados);

    localStorage.setItem(
      "arenaPAEBES",
      JSON.stringify(dados)
    );

    const codigo=
      document.getElementById("codigo");

    if(codigo){
      codigo.textContent=cod;
    }

    const mensagem=
      document.getElementById("mensagem");

    if(mensagem){
      mensagem.innerHTML=
        `🏛️ Arena criada com sucesso. Código <strong>${cod}</strong>. Agora libere os estudantes.`;
    }

    alert(
      `✅ ARENA CRIADA!\n\nCódigo: ${cod}\nQuestões: ${questoes.length}`
    );

    location.reload();

  }catch(e){

    console.error(
      "ERRO AO CRIAR ARENA:",
      e
    );

    alert(
      "Não foi possível criar a Arena.\n\n"+
      (e?.message || e)
    );
  }
};

console.log(
  "✅ Hotfix dos botões do Professor instalado."
);
