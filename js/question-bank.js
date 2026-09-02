// ======================================================
// ARENA MATEMÁTICA — BANCO DE QUESTÕES
// COLISEU DO CONHECIMENTO — 3º TRIMESTRE 2026
// Professor Leopoldo
//
// Compatibilidade:
// - mantém as exports usadas pelo professor.html/estudante.html
// - não altera questões já gravadas em Arenas antigas/pausadas
// - não possui teto fixo de 40 questões por Arena
// - evita repetição dentro da mesma Arena
// - mantém rotação local entre Arenas no mesmo navegador
// - preparado para futura sincronização do histórico via Firebase
// ======================================================

export const HABILIDADES_PAEBES = {
  "D009_M":"Corresponder pontos da reta numérica a números racionais.",
  "D013_M":"Reconhecer as diferentes representações de um número racional.",
  "D033_M":"Identificar a localização de números irracionais na reta numérica.",
  "D038_M":"Utilizar porcentagem na resolução de problemas.",
  "D039_M":"Utilizar proporcionalidade entre duas grandezas na resolução de problema.",
  "D042_M":"Utilizar o princípio multiplicativo de contagem na resolução de problema.",
  "D043_M":"Identificar a localização de pontos no plano cartesiano.",
  "D049_M":"Utilizar relações métricas em um triângulo retângulo na resolução de problemas.",
  "D051_M":"Resolver problema que envolva razões trigonométricas no triângulo retângulo.",
  "D057_M":"Utilizar o perímetro de uma figura bidimensional na resolução de problema.",
  "D058_M":"Utilizar área de figuras bidimensionais na resolução de problema.",
  "D063_M":"Corresponder listas e/ou tabelas simples aos gráficos que as representam.",
  "D064_M":"Utilizar informações apresentadas em tabelas ou gráficos na resolução de problemas.",
  "D065_M":"Resolver problema envolvendo noções de probabilidade.",
  "D071_M":"Analisar crescimento, decrescimento e zeros de funções apresentadas em gráficos.",
  "D074_M":"Corresponder as representações algébrica e gráfica de uma função exponencial.",
  "D076_M":"Corresponder um polinômio fatorado às suas raízes.",
  "D078_M":"Corresponder uma função polinomial do 1º grau a seu gráfico.",
  "D080_M":"Identificar representação algébrica e gráfica de uma função logarítmica.",
  "D082_M":"Identificar o gráfico que representa uma situação descrita em um texto.",
  "D085_M":"Interpretar geometricamente os coeficientes da equação de uma reta.",
  "D086_M":"Reconhecer expressão algébrica que representa uma função a partir de uma tabela.",
  "D087_M":"Resolver problema envolvendo equação do 2º grau.",
  "D088_M":"Utilizar função exponencial na resolução de problemas.",
  "D096_M":"Utilizar propriedades de progressões aritméticas na resolução de problemas.",
  "D097_M":"Utilizar propriedades de progressões geométricas na resolução de problemas.",
  "D111_M":"Relacionar diferentes poliedros ou corpos redondos com suas planificações ou vistas.",
  "D119_M":"Identificar triângulos semelhantes mediante relações de proporcionalidade.",
  "D124_M":"Identificar a equação de uma reta apresentada a partir de dois pontos dados ou de um ponto e sua inclinação.",
  "D125_M":"Identificar a relação entre o número de vértices, faces e/ou arestas de poliedros expressa em um problema.",
  "D126_M":"Identificar gráficos de funções trigonométricas.",
  "D127_M":"Relacionar a intersecção de retas à resolução de sistemas de equações.",
  "D129_M":"Resolver problema envolvendo a área total e/ou volume de um sólido.",
  "D132_M":"Resolver problema envolvendo uma função do 1º grau.",
  "D133_M":"Resolver problemas envolvendo máximo ou mínimo de função do 2º grau.",
  "D145_M":"Reconhecer o gráfico de uma função polinomial de primeiro grau por meio de seus coeficientes.",
  "D154_M":"Relacionar representações algébricas e geométricas de sistemas de equações lineares.",
  "D155_M":"Reconhecer a equação de uma circunferência no plano cartesiano.",
  "D157_M":"Resolver e interpretar situações envolvendo matrizes e sistemas lineares."
};

export const DESCRITORES_COM_BANCO =
  Object.keys(HABILIDADES_PAEBES);

export const NIVEIS = [
  "ABAIXO DO BÁSICO",
  "BÁSICO",
  "PROFICIENTE",
  "AVANÇADO"
];

export const NUCLEOS_APRENDIZAGEM = {

  "plano-retas":{
    nome:"Plano Cartesiano e Retas",
    descritores:[
      "D009_M",
      "D043_M",
      "D085_M",
      "D124_M"
    ]
  },

  "circunferencia":{
    nome:"Circunferência no Plano Cartesiano",
    descritores:[
      "D043_M",
      "D155_M"
    ]
  },

  "sistemas-matrizes":{
    nome:"Sistemas Lineares e Matrizes",
    descritores:[
      "D043_M",
      "D085_M",
      "D154_M",
      "D127_M",
      "D157_M"
    ]
  },

  "exponencial-pg":{
    nome:"Exponencial e PG",
    descritores:[
      "D074_M",
      "D088_M",
      "D097_M"
    ]
  },

  "geometria-espacial":{
    nome:"Geometria Espacial",
    descritores:[
      "D111_M",
      "D125_M",
      "D129_M"
    ]
  },

  "trigonometria":{
    nome:"Trigonometria",
    descritores:[
      "D039_M",
      "D049_M",
      "D051_M"
    ]
  },

  "funcoes-trig":{
    nome:"Funções Trigonométricas",
    descritores:[
      "D043_M",
      "D051_M",
      "D071_M",
      "D126_M"
    ]
  },

  "fundamentos":{
    nome:"Fundamentos e Recuperação",
    descritores:[
      "D013_M",
      "D038_M",
      "D039_M",
      "D049_M",
      "D058_M",
      "D064_M",
      "D087_M"
    ]
  }
};

export const PRIORIDADE_AMA_3TRI = [
  "D013_M",
  "D039_M",
  "D043_M",
  "D049_M",
  "D064_M",
  "D074_M",
  "D085_M",
  "D087_M",
  "D088_M",
  "D097_M",
  "D111_M",
  "D124_M",
  "D125_M",
  "D129_M"
];

const XP_NIVEL = {
  "ABAIXO DO BÁSICO":100,
  "BÁSICO":120,
  "PROFICIENTE":180,
  "AVANÇADO":240
};

const HIST_KEY =
  "arenaPAEBES_historicoQuestoes_v3";

const ROUND_KEY =
  "arenaPAEBES_rodadaBanco";

function clamp(n,min,max){
  return Math.max(
    min,
    Math.min(max,n)
  );
}

function fmt(n){

  const x =
    Math.round(
      Number(n) * 100
    ) / 100;

  return Number.isInteger(x)
    ? String(x)
    : String(x).replace(".",",");
}

function pick(a,s=0){

  return a[
    Math.abs(
      Number(s) || 0
    ) % a.length
  ];

}

function hash(str=""){

  let h =
    2166136261;

  for(
    let i=0;
    i<str.length;
    i++
  ){

    h ^=
      str.charCodeAt(i);

    h =
      Math.imul(
        h,
        16777619
      );

  }

  return (
    h >>> 0
  ).toString(36);

}

function norm(v=""){

  return String(v)
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .replace(
      /<[^>]*>/g,
      " "
    )
    .replace(
      /[^a-z0-9]+/g,
      " "
    )
    .trim();

}

function shuffle(
  arr,
  seed=1
){

  const a =
    [...arr];

  let s =
    Math.abs(
      Number(seed) || 1
    );

  for(
    let i=a.length-1;
    i>0;
    i--
  ){

    s =
      (
        s*9301 +
        49297
      ) % 233280;

    const j =
      Math.floor(
        (
          s/233280
        ) * (i+1)
      );

    [
      a[i],
      a[j]
    ] = [
      a[j],
      a[i]
    ];

  }

  return a;

}

function alternativas(
  correta,
  distratores,
  seed
){

  const resposta =
    String(correta);

  const unicos =
    [];

  [
    resposta,
    ...distratores.map(String),
    "0","1","2","3","4",
    "5","6","8","10","12",
    "15","20","25","30",
    "40","50","60","100"
  ].forEach(
    x => {

      if(
        !unicos.includes(x)
      ){
        unicos.push(x);
      }

    }
  );

  const opts =
    shuffle(
      unicos.slice(0,5),
      seed
    );

  return {
    options:opts,
    correct:
      opts.indexOf(
        resposta
      )
  };

}

function svg(
  inner,
  label="Representação matemática"
){

  return `
  <svg
    viewBox="0 0 520 280"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="${label}"
  >
    <rect
      width="520"
      height="280"
      rx="18"
      fill="#07182d"
    />
    ${inner}
  </svg>
  `;

}

function plano({
  pontos=[],
  retas=[]
}={}){

  let c="";

  for(
    let i=-5;
    i<=5;
    i++
  ){

    const x =
      260 + i*42;

    const y =
      140 - i*22;

    c += `
      <line
        x1="${x}"
        y1="20"
        x2="${x}"
        y2="255"
        stroke="#153552"
      />

      <line
        x1="35"
        y1="${y}"
        x2="485"
        y2="${y}"
        stroke="#153552"
      />
    `;

  }

  c += `
    <line
      x1="35"
      y1="140"
      x2="485"
      y2="140"
      stroke="#dbeafe"
      stroke-width="2"
    />

    <line
      x1="260"
      y1="20"
      x2="260"
      y2="255"
      stroke="#dbeafe"
      stroke-width="2"
    />
  `;

  retas.forEach(
    (r,idx) => {

      const pts=[];

      for(
        let x=-5;
        x<=5;
        x+=0.25
      ){

        const y =
          r.m*x +
          r.b;

        pts.push(
          `${260+x*42},${140-y*22}`
        );

      }

      c += `
        <polyline
          points="${pts.join(" ")}"
          fill="none"
          stroke="${
            idx
              ? "#facc15"
              : "#ff6fab"
          }"
          stroke-width="4"
        />
      `;

    }
  );

  pontos.forEach(
    p => {

      c += `
        <circle
          cx="${260+p.x*42}"
          cy="${140-p.y*22}"
          r="6"
          fill="#22d3ee"
        />

        <text
          x="${270+p.x*42}"
          y="${132-p.y*22}"
          fill="#ffffff"
          font-size="14"
        >
          ${p.label || ""}
        </text>
      `;

    }
  );

  return svg(
    c,
    "Plano cartesiano"
  );

}
