// ======================================================
// DIAMANTE — PODER DE BLOQUEIO
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
  get,
  update,
  onValue,
  runTransaction,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";


let app = null;
let db = null;

const RAIZ = "arenaMatematica";


function banco(){

  if(!app){

    app = getApps().length
      ? getApp()
      : initializeApp(FIREBASE.configuracao);

    db = getDatabase(app);
  }

  return db;
}


function caminhoSeguro(valor=""){

  return String(valor)
    .trim()
    .toUpperCase()
    .replace(/[.#$\[\]\/]/g,"-");
}


// ======================================================
// BLOQUEIO VISUAL IMEDIATO
// ======================================================

function bloquearInteracaoLocalDuranteDiamante(){

  try{

    if(typeof window !== "undefined"){
      window.__diamanteBloqueioAtivo = true;
    }

    if(typeof document !== "undefined"){

      document.querySelectorAll("#options .option").forEach(botao=>{
        botao.disabled = true;
        botao.style.pointerEvents = "none";
        botao.style.opacity = ".55";
      });

      const confirmar = document.getElementById("confirmButton");

      if(confirmar){
        confirmar.disabled = true;
        confirmar.style.pointerEvents = "none";
      }
    }

    setTimeout(()=>{

      if(typeof window !== "undefined"){
        window.__diamanteBloqueioAtivo = false;
      }

      if(typeof document !== "undefined"){

        // libera as alternativas da NOVA questão
        document.querySelectorAll("#options .option").forEach(botao=>{
          botao.disabled = false;
          botao.style.pointerEvents = "";
          botao.style.opacity = "";
        });

        // libera novamente o botão para funcionar
        // quando uma alternativa da nova questão for escolhida
        const confirmar = document.getElementById("confirmButton");

        if(confirmar){
          confirmar.style.pointerEvents = "";
          confirmar.disabled = true;
        }

        if(typeof player !== "undefined"){
          player.selected = null;
        }

        document
          .querySelectorAll("#options .option")
          .forEach(botao=>botao.classList.remove("selected"));
      }

    },2200);

  }catch(e){

    console.error(
      "Falha ao processar o bloqueio do Diamante:",
      e
    );
  }
}

// ======================================================
// META DO DIAMANTE
// ======================================================

export function metaDiamante(questoes=[]){

  const totalMaximo =
    (Array.isArray(questoes) ? questoes : [])
      .reduce(
        (s,q) =>
          s + Math.max(
            0,
            Number(q?.baseXP || 0)
          ),
        0
      );


  if(totalMaximo <= 0){

    return Math.ceil(

      (Array.isArray(questoes)
        ? questoes.length
        : 0)

      * 100
      * 0.60
    );
  }


  return Math.ceil(
    totalMaximo * 0.60
  );
}


// ======================================================
// CONCEDER DIAMANTE
// ======================================================

export async function concederDiamanteSeAtingiu(

  codigo,
  jogadorId,
  pontosRegulares,
  questoes=[]

){

  const database = banco();

  const arenaId =
    caminhoSeguro(codigo);

  const meta =
    metaDiamante(questoes);


  if(
    !jogadorId ||
    Number(pontosRegulares || 0) < meta
  ){

    return {
      conquistado:false,
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

        if(!atual)
          return atual;


        if(
          atual.diamanteConquistado === true
        ){

          return atual;
        }


        concedidoAgora = true;


        return {

          ...atual,

          pontosRegulares:
            Number(pontosRegulares || 0),

          diamanteConquistado:true,

          diamanteDisponivel:true,

          diamanteUsado:false,

          diamanteConquistadoEm:
            Date.now()

        };
      }
    );


  return {

    conquistado:
      Boolean(
        resultado.committed &&
        concedidoAgora
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

){

  if(
    !codigo ||
    !autorId ||
    !alvoId
  ){

    throw new Error(
      "Dados do Poder de Bloqueio incompletos."
    );
  }


  if(autorId === alvoId){

    throw new Error(
      "Você não pode bloquear a si mesmo."
    );
  }


  const database = banco();

  const arenaId =
    caminhoSeguro(codigo);


  const arenaRef = ref(

    database,

    `${RAIZ}/arenas/${arenaId}`

  );


  let registro = null;


  const transacao =
    await runTransaction(

      arenaRef,

      arena => {

        if(!arena)
          return;


        const competidores =
          arena.competidores || {};


        const autor =
          competidores[autorId];


        const alvo =
          competidores[alvoId];


        if(!autor || !alvo)
          return;


        if(

          autor.diamanteDisponivel !== true ||

          autor.diamanteUsado === true

        ){

          return;
        }


        if(
          alvo.diamanteBloqueioPendente === true
        ){

          return;
        }


        if(
          alvo.regularConcluida === true
        ){

          return;
        }


        const bloqueioId =

          "diamante-" +

          Date.now()
            .toString(36) +

          "-" +

          Math.random()
            .toString(36)
            .slice(2,7);


        const agora =
          Date.now();


        competidores[autorId] = {

          ...autor,

          diamanteDisponivel:false,

          diamanteUsado:true,

          diamanteUsadoEm:
            agora

        };


        competidores[alvoId] = {

          ...alvo,

          diamanteBloqueioPendente:true,

          diamanteBloqueioId:
            bloqueioId,

          diamanteBloqueioRecebidoEm:
            agora

        };


        const historico = {

          ...(arena.historicoDiamantes || {})

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

          ...(arena.eventos || {})

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


        registro =
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


  if(
    !transacao.committed ||
    !registro
  ){

    throw new Error(

      "O Diamante não está disponível ou o competidor escolhido não pode ser bloqueado agora."

    );
  }


  return {

    ok:true,

    bloqueioId:
      registro.id
  };
}


// ======================================================
// CONSUMIR BLOQUEIO
// ======================================================

export async function consumirBloqueioDiamante(

  codigo,
  jogadorId

){

  const database = banco();

  const arenaId =
    caminhoSeguro(codigo);


  const jogadorRef = ref(

    database,

    `${RAIZ}/arenas/${arenaId}/competidores/${jogadorId}`

  );


  const snap =
    await get(jogadorRef);


  if(!snap.exists()){

    return false;
  }


  const jogador =
    snap.val();


  if(
    jogador.diamanteBloqueioPendente !== true
  ){

    return false;
  }


  // Bloqueia imediatamente a questão atual
  bloquearInteracaoLocalDuranteDiamante();


  const bloqueioId =
    jogador.diamanteBloqueioId ||
    null;


  await update(

    jogadorRef,

    {

      diamanteBloqueioPendente:false,

      diamanteBloqueioId:null,

      diamanteBloqueioConsumidoEm:
        serverTimestamp(),

      diamanteBloqueiosRecebidos:

        Number(
          jogador.diamanteBloqueiosRecebidos || 0
        ) + 1
    }
  );


  if(bloqueioId){

    await update(

      ref(

        database,

        `${RAIZ}/arenas/${arenaId}/historicoDiamantes/${bloqueioId}`

      ),

      {

        status:
          "concluido",

        concluidoEm:
          serverTimestamp()
      }
    );
  }


  return true;
}


// ======================================================
// HISTÓRICO DO DIAMANTE
// ======================================================

export function observarHistoricoDiamante(

  codigo,
  callback

){

  const database = banco();

  const arenaId =
    caminhoSeguro(codigo);


  return onValue(

    ref(

      database,

      `${RAIZ}/arenas/${arenaId}/historicoDiamantes`

    ),

    snap =>

      callback(

        snap.exists()
          ? snap.val()
          : {}

      )
  );
}
