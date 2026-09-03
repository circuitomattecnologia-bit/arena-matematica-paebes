// ======================================================
// ARENA MATEMÁTICA — BANCO DE QUESTÕES
// COLISEU DO CONHECIMENTO — NOVA FASE 2026
// Professor Leopoldo
// ======================================================

export const HABILIDADES_PAEBES = {
  "D009_M":"Corresponder pontos da reta numérica a números racionais.",
  "D013_M":"Reconhecer diferentes representações de um número racional.",
  "D038_M":"Utilizar porcentagem na resolução de problemas.",
  "D039_M":"Utilizar proporcionalidade entre duas grandezas.",
  "D043_M":"Identificar a localização de pontos no plano cartesiano.",
  "D049_M":"Utilizar relações métricas em triângulo retângulo.",
  "D064_M":"Interpretar informações apresentadas em tabelas e gráficos.",
  "D074_M":"Relacionar representações de função exponencial.",
  "D085_M":"Interpretar geometricamente os coeficientes de uma reta.",
  "D087_M":"Resolver problemas com equação do segundo grau.",
  "D088_M":"Utilizar função exponencial na resolução de problemas.",
  "D097_M":"Utilizar propriedades de progressões geométricas.",
  "D111_M":"Relacionar sólidos geométricos e planificações.",
  "D124_M":"Identificar a equação de uma reta.",
  "D125_M":"Relacionar vértices, faces e arestas de poliedros.",
  "D129_M":"Resolver problemas de área total e volume de sólidos."
};

export const DESCRITORES_COM_BANCO = Object.keys(HABILIDADES_PAEBES);

export const NIVEIS = [
  "ABAIXO DO BÁSICO",
  "BÁSICO",
  "PROFICIENTE",
  "AVANÇADO"
];

export const PRIORIDADE_AMA_3TRI = [
  "D013_M","D039_M","D043_M","D049_M",
  "D064_M","D074_M","D085_M","D087_M",
  "D088_M","D097_M","D111_M","D124_M",
  "D125_M","D129_M"
];

// ------------------------------------------------------
// Utilitários
// ------------------------------------------------------

function hash(str=""){
  let h=2166136261;
  for(let i=0;i<str.length;i++){
    h^=str.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
}

function shuffle(arr,seed=1){
  const a=[...arr];
  let s=seed;
  for(let i=a.length-1;i>0;i--){
    s=(s*9301+49297)%233280;
    const j=Math.floor((s/233280)*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

// ------------------------------------------------------
// Banco base
// ------------------------------------------------------

export const QUESTOES = [];

let id=1;

function add(descritor,nivel,enunciado,opcoes,correta){
  QUESTOES.push({
    id:`Q${id++}`,
    descritor,
    nivel,
    enunciado,
    options:opcoes,
    correct:correta,
    evidencia:false
  });
}

// D074
add("D074_M","ABAIXO DO BÁSICO",
"Observe a função f(x)=2^x. Qual é o valor de f(3)?",
["6","8","9","12"],1);

add("D074_M","BÁSICO",
"Uma população dobra a cada período. Se inicialmente havia 50 indivíduos, quantos haverá após 3 períodos?",
["100","200","400","800"],2);

add("D074_M","PROFICIENTE",
"Qual expressão representa uma função exponencial crescente?",
["2^x","(1/2)^x","x²","3x+1"],0);

// D097
add("D097_M","ABAIXO DO BÁSICO",
"Na PG 2, 4, 8, 16, qual é a razão?",
["2","4","8","16"],0);

add("D097_M","BÁSICO",
"Uma PG tem primeiro termo 3 e razão 2. Qual é o quarto termo?",
["12","18","24","48"],2);

add("D097_M","PROFICIENTE",
"Uma PG tem a1=5 e razão 3. Qual é o quinto termo?",
["135","405","243","81"],1);

// D111
add("D111_M","ABAIXO DO BÁSICO",
"Qual sólido possui 6 faces quadradas?",
["Cubo","Cone","Cilindro","Esfera"],0);

add("D111_M","BÁSICO",
"Uma planificação formada por seis quadrados congruentes representa qual sólido?",
["Prisma triangular","Cubo","Cone","Pirâmide"],1);

add("D111_M","PROFICIENTE",
"Qual sólido pode ter duas bases circulares e uma superfície lateral curva?",
["Cone","Cilindro","Cubo","Pirâmide"],1);

// D125
add("D125_M","ABAIXO DO BÁSICO",
"Quantas faces possui um cubo?",
["4","6","8","12"],1);

add("D125_M","BÁSICO",
"Um prisma triangular possui quantas arestas?",
["6","8","9","12"],2);

add("D125_M","PROFICIENTE",
"Um poliedro possui 8 faces e 12 vértices. Pela relação de Euler, quantas arestas possui?",
["16","18","20","22"],1);

// D129
add("D129_M","ABAIXO DO BÁSICO",
"Qual fórmula calcula o volume de um prisma?",
["base × altura","área da base × altura","lado²","2πr"],1);

add("D129_M","BÁSICO",
"Um cubo de aresta 4 cm possui volume igual a:",
["16","32","48","64"],3);

add("D129_M","PROFICIENTE",
"Um prisma tem área da base 18 cm² e altura 7 cm. Seu volume é:",
["25","63","126","252"],2);

// Questões extras dos descritores prioritários
for(const d of PRIORIDADE_AMA_3TRI){
  if(!QUESTOES.some(q=>q.descritor===d)){
    add(d,"ABAIXO DO BÁSICO",
      `Questão introdutória do descritor ${d}.`,
      ["Alternativa A","Alternativa B","Alternativa C","Alternativa D"],0);
    add(d,"BÁSICO",
      `Questão de consolidação do descritor ${d}.`,
      ["Alternativa A","Alternativa B","Alternativa C","Alternativa D"],1);
    add(d,"PROFICIENTE",
      `Questão de aprofundamento do descritor ${d}.`,
      ["Alternativa A","Alternativa B","Alternativa C","Alternativa D"],2);
  }
}

// ------------------------------------------------------
// Seleção adaptativa
// ------------------------------------------------------

export function selecionarQuestoesAdaptativas({
  descritores=PRIORIDADE_AMA_3TRI,
  quantidade=20,
  estudanteId="",
  arenaId="",
  nivelAtual="ABAIXO DO BÁSICO"
}={}){

  const ordemNivel={
    "ABAIXO DO BÁSICO":0,
    "BÁSICO":1,
    "PROFICIENTE":2,
    "AVANÇADO":3
  };

  const nivelIndex=ordemNivel[nivelAtual] ?? 0;

  const candidatas=QUESTOES.filter(q=>{
    if(!descritores.includes(q.descritor)) return false;
    const qi=ordemNivel[q.nivel] ?? 0;
    return qi>=Math.max(0,nivelIndex-1) &&
           qi<=Math.min(2,nivelIndex+1);
  });

  const seed=hash(`${estudanteId}|${arenaId}`);

  const embaralhadas=shuffle(candidatas,seed);

  const selecionadas=embaralhadas.slice(0,quantidade);

  // Uma questão de evidência por descritor
  const vistos=new Set();

  selecionadas.forEach(q=>{
    if(!vistos.has(q.descritor)){
      q.evidencia=true;
      vistos.add(q.descritor);
    }
  });

  return selecionadas;
}

// ------------------------------------------------------
// Compatibilidade com versões anteriores
// ------------------------------------------------------

export function obterQuestoesPorDescritores(descritores=[],quantidade=20,seed=1){
  const lista=QUESTOES.filter(q=>descritores.includes(q.descritor));
  return shuffle(lista,seed).slice(0,quantidade);
}

export function gerarArenaQuestoes(config={}){
  return selecionarQuestoesAdaptativas(config);
}
