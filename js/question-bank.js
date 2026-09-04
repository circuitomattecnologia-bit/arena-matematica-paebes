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

export const DESCRITORES_COM_BANCO = Object.keys(HABILIDADES_PAEBES);

export const NIVEIS = [
  "ABAIXO DO BÁSICO",
  "BÁSICO",
  "PROFICIENTE",
  "AVANÇADO"
];

export const NUCLEOS_APRENDIZAGEM = {
  "plano-retas":{
    nome:"Plano Cartesiano e Retas",
    descritores:["D009_M","D043_M","D085_M","D124_M"]
  },
  "circunferencia":{
    nome:"Circunferência no Plano Cartesiano",
    descritores:["D043_M","D155_M"]
  },
  "sistemas-matrizes":{
    nome:"Sistemas Lineares e Matrizes",
    descritores:["D043_M","D085_M","D154_M","D127_M","D157_M"]
  },
  "exponencial-pg":{
    nome:"Exponencial e PG",
    descritores:["D074_M","D088_M","D097_M"]
  },
  "geometria-espacial":{
    nome:"Geometria Espacial",
    descritores:["D111_M","D125_M","D129_M"]
  },
  "trigonometria":{
    nome:"Trigonometria",
    descritores:["D039_M","D049_M","D051_M"]
  },
  "funcoes-trig":{
    nome:"Funções Trigonométricas",
    descritores:["D043_M","D051_M","D071_M","D126_M"]
  },
  "fundamentos":{
    nome:"Fundamentos e Recuperação",
    descritores:["D013_M","D038_M","D039_M","D049_M","D058_M","D064_M","D087_M"]
  }
};

export const PRIORIDADE_AMA_3TRI = [
  "D013_M","D039_M","D043_M","D049_M","D064_M","D074_M","D085_M",
  "D087_M","D088_M","D097_M","D111_M","D124_M","D125_M","D129_M"
];

const XP_NIVEL = {
  "ABAIXO DO BÁSICO":100,
  "BÁSICO":120,
  "PROFICIENTE":180,
  "AVANÇADO":240
};

const HIST_KEY = "arenaPAEBES_historicoQuestoes_v3";
const ROUND_KEY = "arenaPAEBES_rodadaBanco";

function clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }

function fmt(n){
  const x=Math.round(Number(n)*100)/100;
  return Number.isInteger(x)?String(x):String(x).replace(".",",");
}

function pick(a,s=0){
  return a[Math.abs(Number(s)||0)%a.length];
}

function hash(str=""){
  let h=2166136261;
  for(let i=0;i<str.length;i++){
    h^=str.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(36);
}

function norm(v=""){
  return String(v)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .replace(/<[^>]*>/g," ")
    .replace(/[^a-z0-9]+/g," ")
    .trim();
}

function shuffle(arr,seed=1){
  const a=[...arr];
  let s=Math.abs(Number(seed)||1);

  for(let i=a.length-1;i>0;i--){
    s=(s*9301+49297)%233280;
    const j=Math.floor((s/233280)*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }

  return a;
}

function alternativas(correta,distratores,seed){
  const resposta=String(correta);
  const unicos=[];

  [
    resposta,
    ...distratores.map(String),
    "0","1","2","3","4","5","6","8","10","12","15","20","25","30","40","50","60","100"
  ].forEach(x=>{
    if(!unicos.includes(x)) unicos.push(x);
  });

  const opts=shuffle(unicos.slice(0,5),seed);

  return {
    options:opts,
    correct:opts.indexOf(resposta)
  };
}

function meta(descriptor,level,habilidade){
  const nucleo=Object.values(NUCLEOS_APRENDIZAGEM)
    .find(n=>n.descritores.includes(descriptor))?.nome||"Recomposição e Consolidação";

  return {
    expectativa:habilidade,
    tarefa:habilidade,
    nucleo,
    prioridadeAMA:PRIORIDADE_AMA_3TRI.includes(descriptor),
    contexto:"Arena Matemática — Rumo à AMA e ao PAEBES",
    origem:"Questão autoral alinhada à matriz de referência",
    level
  };
}

function questaoValida(q){
  return !!(
    q &&
    q.descriptor &&
    q.text &&
    Array.isArray(q.options) &&
    q.options.length>=4 &&
    Number.isInteger(q.correct) &&
    q.correct>=0 &&
    q.correct<q.options.length
  );
}

function assinatura(q){
  return hash(
    `${q.descriptor}|${q.level}|${norm(q.text)}|${q.options.map(norm).join("|")}`
  );
}

function lerHist(){
  try{
    const h=JSON.parse(localStorage.getItem(HIST_KEY)||"{}");

    return {
      assinaturas:Array.isArray(h.assinaturas)?h.assinaturas:[],
      modelos:Array.isArray(h.modelos)?h.modelos:[]
    };
  }catch{
    return {assinaturas:[],modelos:[]};
  }
}

function salvarHist(h){
  try{
    localStorage.setItem(
      HIST_KEY,
      JSON.stringify({
        assinaturas:[...new Set(h.assinaturas||[])].slice(-20000),
        modelos:[...new Set(h.modelos||[])].slice(-10000)
      })
    );
  }catch{}
}

function rodada(){
  try{
    const r=Number(localStorage.getItem(ROUND_KEY)||0)+1;
    localStorage.setItem(ROUND_KEY,String(r));
    return r;
  }catch{
    return Date.now()%99999;
  }
}

function niveisDistrib(dist,quantidade){
  const abb=Math.max(0,Number(dist?.abb||0));
  const basico=Math.max(0,Number(dist?.basico||0));
  const prof=Math.max(0,Number(dist?.proficiente||0));
  const av=Math.max(0,Number(dist?.avancado||0));

  const soma=abb+basico+prof+av||100;

  const faixas=[
    ["ABAIXO DO BÁSICO",abb/soma],
    ["BÁSICO",basico/soma],
    ["PROFICIENTE",prof/soma],
    ["AVANÇADO",av/soma]
  ];

  const arr=[];

  for(let i=0;i<quantidade;i++){
    const p=(i+.5)/quantidade;
    let acumulado=0;
    let escolhido="BÁSICO";

    for(const [nivel,fracao] of faixas){
      acumulado+=fracao;
      if(p<=acumulado){
        escolhido=nivel;
        break;
      }
    }

    arr.push(escolhido);
  }

  return arr;
}

function filaDescritores(validos,config,quantidade){
  const pesos={};

  validos.forEach(d=>{
    pesos[d]=clamp(Number(config?.[d]?.peso||1),1,4);
  });

  const expandida=[];

  validos.forEach(d=>{
    for(let i=0;i<pesos[d];i++){
      expandida.push(d);
    }
  });

  const fila=[];

  for(let i=0;i<quantidade;i++){
    fila.push(expandida[i%expandida.length]);
  }

  return {fila,pesos};
}

function solucaoOrientada(descriptor,q){
  const correta=q.options?.[q.correct];

  const guias={
    "D009_M":"Observe a posição do número em relação ao zero e às marcações da reta. Compare numerador e denominador quando a representação for fracionária.",
    "D013_M":"Converta entre fração, decimal e porcentagem para reconhecer representações equivalentes.",
    "D033_M":"Compare os valores aproximados dos irracionais com inteiros e racionais próximos para localizar o ponto correto na reta.",
    "D038_M":"Transforme a porcentagem em forma decimal e multiplique pelo valor total.",
    "D039_M":"Monte uma proporção entre as grandezas correspondentes e resolva a igualdade entre razões.",
    "D042_M":"Multiplique a quantidade de possibilidades independentes de cada etapa.",
    "D043_M":"Leia primeiro a coordenada x no eixo horizontal e depois a coordenada y no eixo vertical.",
    "D049_M":"Identifique os elementos do triângulo retângulo e aplique Pitágoras ou as relações métricas adequadas.",
    "D051_M":"Escolha seno, cosseno ou tangente conforme os lados conhecidos e o lado procurado.",
    "D057_M":"Some as medidas de todos os lados da figura.",
    "D058_M":"Decomponha a figura quando necessário e aplique a fórmula de área correspondente.",
    "D063_M":"Compare categorias e valores da tabela com alturas ou posições representadas no gráfico.",
    "D064_M":"Localize a informação solicitada no gráfico ou tabela e realize a operação exigida pelo problema.",
    "D065_M":"Calcule a razão entre casos favoráveis e total de casos possíveis.",
    "D071_M":"Observe onde o gráfico cresce, decresce e cruza o eixo x para identificar comportamento e zeros.",
    "D074_M":"Relacione a expressão exponencial ao comportamento do gráfico, observando base, crescimento ou decrescimento.",
    "D076_M":"Iguale cada fator a zero; as soluções obtidas são as raízes.",
    "D078_M":"Compare coeficiente angular, coeficiente linear e inclinação do gráfico.",
    "D080_M":"Use a relação entre função logarítmica e exponencial, observando domínio e crescimento.",
    "D082_M":"Traduza o texto em comportamento gráfico: crescimento, decrescimento, máximo, mínimo ou constância.",
    "D085_M":"Na forma y = mx + b, m é o coeficiente angular e b é o coeficiente linear. Para dois pontos, use m=(y₂−y₁)/(x₂−x₁).",
    "D086_M":"Calcule a variação de y quando x aumenta uma unidade e use um par da tabela para determinar a expressão.",
    "D087_M":"Organize a equação do 2º grau e resolva por fatoração ou fórmula de Bhaskara.",
    "D088_M":"Identifique valor inicial, fator de multiplicação e quantidade de períodos.",
    "D096_M":"Em uma PA, identifique a razão e use an=a1+(n−1)r.",
    "D097_M":"Em uma PG, determine a razão q e use an=a1·q^(n−1).",
    "D111_M":"Compare faces, bases e superfícies para relacionar o sólido à planificação ou vista.",
    "D119_M":"Verifique a proporcionalidade entre lados correspondentes.",
    "D124_M":"Calcule a inclinação e use y=mx+b ou a forma ponto-inclinação.",
    "D125_M":"Use a relação de Euler V−A+F=2.",
    "D126_M":"Observe período, amplitude, zeros e pontos característicos do gráfico.",
    "D127_M":"A solução corresponde ao ponto de interseção das retas.",
    "D129_M":"Para prismas e cilindros use V=Ab·h; para área total, some as áreas das faces ou superfícies.",
    "D132_M":"Modele a situação por f(x)=ax+b e substitua os dados.",
    "D133_M":"Use xv=−b/(2a) e yv=f(xv) para encontrar máximo ou mínimo.",
    "D145_M":"Na função y=ax+b, a determina a inclinação e b indica a interseção com o eixo y.",
    "D154_M":"Relacione cada equação do sistema a uma reta e interprete a solução como interseção.",
    "D155_M":"Use (x−a)²+(y−b)²=r².",
    "D157_M":"Organize coeficientes e termos independentes e resolva o sistema ou matriz equivalente."
  };

  return `${guias[descriptor]||"Resolva utilizando a habilidade indicada pelo descritor."} Resposta correta: ${correta}.`;
}

function gerarGenerica(descriptor,level,seed,variante){
  const s=Math.abs(Number(seed)||1);
  const v=Math.abs(Number(variante)||0);

  switch(descriptor){

    case "D009_M":{
      const den=pick([2,3,4,5,8,10],s+v);
      const num=1+(s+v)%Math.max(1,den-1);
      const valor=num/den;
      const ops=[
        `${num}/${den}`,
        `${num+1}/${den}`,
        `${Math.max(0,num-1)}/${den}`,
        `${den}/${num}`,
        `${num}/${den+1}`
      ];
      return {
        text:`Na reta numérica, qual fração corresponde ao número decimal ${fmt(valor)}?`,
        options:shuffle(ops,s),
        correct:shuffle(ops,s).indexOf(`${num}/${den}`),
        modeloId:`reta-racional-${den}-${v%50}`
      };
    }

    case "D013_M":{
      const p=pick([10,20,25,30,40,50,60,75,80],s+v);
      const correta=fmt(p/100);
      const a=alternativas(correta,[fmt(p/10),String(p),fmt((100-p)/100),fmt(p/1000)],s);
      return {
        text:`Qual representação decimal é equivalente a ${p}%?`,
        ...a,
        modeloId:`racional-representacao-${p}-${v%30}`
      };
    }

    case "D033_M":{
      const n=pick([2,3,5,6,7,8,10,11,13],s+v);
      const raiz=Math.sqrt(n);
      const correta=`entre ${Math.floor(raiz)} e ${Math.ceil(raiz)}`;
      const ops=[
        correta,
        `entre ${Math.floor(raiz)+1} e ${Math.ceil(raiz)+1}`,
        `entre ${Math.max(0,Math.floor(raiz)-1)} e ${Math.floor(raiz)}`,
        `exatamente em ${Math.round(raiz)}`,
        `maior que ${Math.ceil(raiz)+2}`
      ];
      const sh=shuffle(ops,s);
      return {
        text:`Na reta numérica, √${n} está localizado`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`irracional-${n}-${v%40}`
      };
    }

    case "D038_M":{
      const total=pick([120,160,200,240,300,400,500,600,800],s+v);
      const pct=pick([10,15,20,25,30,35,40,50],s*3+v);
      const correta=total*pct/100;
      const a=alternativas(correta,[total*(pct+10)/100,total*(pct-5)/100,total-pct,total+pct],s);
      return {
        text:`Em uma ação escolar, ${pct}% de ${total} participantes correspondem a quantas pessoas?`,
        ...a,
        modeloId:`porcentagem-${pct}-${total}-${v%20}`
      };
    }

    case "D039_M":{
      const a1=pick([2,3,4,5,6],s+v);
      const b1=pick([6,8,10,12,15,18],s*2+v);
      const a2=pick([4,5,6,8,10],s*5+v);
      const correta=b1*a2/a1;
      const a=alternativas(correta,[correta+a1,correta-a1,b1+a2,b1*a1],s);
      return {
        text:`Se ${a1} unidades de uma grandeza correspondem a ${b1} unidades de outra, mantendo-se a proporcionalidade, ${a2} unidades correspondem a quanto?`,
        ...a,
        modeloId:`proporcao-${a1}-${b1}-${a2}-${v%30}`
      };
    }

    case "D042_M":{
      const x=pick([2,3,4,5,6],s+v);
      const y=pick([2,3,4,5],s*2+v);
      const z=pick([2,3,4],s*3+v);
      const correta=x*y*z;
      const a=alternativas(correta,[x+y+z,x*y+z,x+y*z,x*y],s);
      return {
        text:`Uma escolha é formada por ${x} opções na primeira etapa, ${y} na segunda e ${z} na terceira. Quantas escolhas diferentes são possíveis?`,
        ...a,
        modeloId:`contagem-${x}-${y}-${z}-${v%20}`
      };
    }

    case "D043_M":{
      const x=pick([-5,-4,-3,-2,-1,1,2,3,4,5],s+v);
      const y=pick([-5,-4,-3,-2,-1,1,2,3,4,5],s*3+v);
      const correta=`(${x}, ${y})`;
      const ops=[
        correta,
        `(${y}, ${x})`,
        `(${-x}, ${y})`,
        `(${x}, ${-y})`,
        `(${-x}, ${-y})`
      ];
      const sh=shuffle(ops,s);
      return {
        text:`Um ponto P possui abscissa ${x} e ordenada ${y}. Quais são suas coordenadas?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`plano-ponto-${x}-${y}-${v%50}`
      };
    }

    case "D049_M":{
      const trip=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[7,24,25]],s+v);
      const correta=trip[2];
      const a=alternativas(correta,[trip[0]+trip[1],trip[2]-1,trip[2]+1,trip[0]*trip[1]],s);
      return {
        text:`Um triângulo retângulo possui catetos medindo ${trip[0]} cm e ${trip[1]} cm. Quanto mede a hipotenusa?`,
        ...a,
        modeloId:`pitagoras-${trip.join("-")}-${v%30}`
      };
    }

    case "D051_M":{
      const ang=pick([30,45,60],s+v);
      const oposto=pick([5,6,8,10,12],s*2+v);
      const sen={30:.5,45:Math.SQRT1_2,60:Math.sqrt(3)/2}[ang];
      const correta=fmt(oposto/sen);
      const a=alternativas(correta,[fmt(oposto*sen),fmt(oposto/Math.cos(ang*Math.PI/180)),fmt(oposto+ang),fmt(oposto*2)],s);
      return {
        text:`Em um triângulo retângulo, o cateto oposto a um ângulo de ${ang}° mede ${oposto} cm. Usando seno, qual é aproximadamente a hipotenusa?`,
        ...a,
        modeloId:`trig-seno-${ang}-${oposto}-${v%20}`
      };
    }

    case "D057_M":{
      const l=pick([4,5,6,8,10,12],s+v);
      const c=pick([6,8,10,12,15,20],s*2+v);
      const correta=2*(l+c);
      const a=alternativas(correta,[l*c,l+c,2*l+c,l+2*c],s);
      return {
        text:`Um terreno retangular mede ${l} m por ${c} m. Qual é o perímetro?`,
        ...a,
        modeloId:`perimetro-ret-${l}-${c}-${v%30}`
      };
    }

    case "D058_M":{
      const b=pick([4,5,6,8,10,12],s+v);
      const h=pick([3,4,5,6,8,10],s*2+v);
      const correta=b*h;
      const a=alternativas(correta,[2*(b+h),b+h,b*h/2,b*h*2],s);
      return {
        text:`Uma região retangular tem base ${b} m e altura ${h} m. Qual é sua área?`,
        ...a,
        modeloId:`area-ret-${b}-${h}-${v%30}`
      };
    }

    case "D063_M":{
      const vals=[
        5+(s%10),
        8+((s+v)%12),
        6+((s*2+v)%15),
        10+((s*3+v)%9)
      ];
      const maior=Math.max(...vals);
      const idx=vals.indexOf(maior);
      const labels=["A","B","C","D"];
      const correta=labels[idx];
      const sh=shuffle(labels,s);
      return {
        text:`Uma tabela apresenta os valores: A=${vals[0]}, B=${vals[1]}, C=${vals[2]}, D=${vals[3]}. Qual categoria teria a maior barra em um gráfico correspondente?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`tabela-grafico-${vals.join("-")}-${v%30}`
      };
    }

    case "D064_M":{
      const vals=[
        12+(s%10),
        15+((s+v)%10),
        10+((s*2+v)%15),
        18+((s*3+v)%10)
      ];
      const total=vals.reduce((a,b)=>a+b,0);
      const a=alternativas(total,[total-5,total+5,Math.max(...vals),Math.min(...vals)],s);
      return {
        text:`Uma tabela registra ${vals.join(", ")} participantes em quatro atividades. Quantos participantes foram registrados ao todo?`,
        ...a,
        modeloId:`leitura-tabela-${vals.join("-")}-${v%30}`
      };
    }

    case "D065_M":{
      const total=pick([10,12,15,20,24,30],s+v);
      const fav=1+(s*3+v)%(total-1);
      const correta=`${fav}/${total}`;
      const ops=[
        correta,
        `${total-fav}/${total}`,
        `${fav}/${total-fav}`,
        `${total}/${fav}`,
        `${fav+1}/${total}`
      ];
      const sh=shuffle(ops,s);
      return {
        text:`Em uma caixa há ${total} fichas, das quais ${fav} são azuis. Qual é a probabilidade de retirar uma ficha azul ao acaso?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`probabilidade-${fav}-${total}-${v%30}`
      };
    }

    case "D071_M":{
      const a=pick([-3,-2,-1,1,2,3],s+v);
      const correta=a>0?"crescente":"decrescente";
      const ops=["crescente","decrescente","constante","sem zeros","periódica"];
      const sh=shuffle(ops,s);
      return {
        text:`Considere a função f(x)=${a}x+${pick([-5,-3,0,2,4],s*2+v)}. Quanto ao comportamento do gráfico, essa função é`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`crescimento-linear-${a}-${v%30}`
      };
    }

    case "D074_M":{
      const base=pick([2,3,4,5],s+v);
      const correta=`f(x) = ${base}^x`;
      const ops=[
        correta,
        `f(x) = x^${base}`,
        `f(x) = ${base}x`,
        `f(x) = x + ${base}`,
        `f(x) = (1/${base})^x`
      ];
      const sh=shuffle(ops,s);
      return {
        text:`Qual expressão representa uma função exponencial crescente de base ${base}?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`exp-grafico-${base}-${v%50}`
      };
    }

    case "D076_M":{
      const r1=pick([-5,-4,-3,-2,-1,1,2,3,4],s+v);
      let r2=pick([-6,-4,-2,1,2,3,5,6],s*2+v);
      if(r2===r1) r2++;

      const correta=`${r1} e ${r2}`;
      const ops=[
        correta,
        `${-r1} e ${-r2}`,
        `${r1+r2} e ${r1*r2}`,
        `${r1} e ${-r2}`,
        `${-r1} e ${r2}`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Quais são as raízes de (x − (${r1}))(x − (${r2})) = 0?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`polinomio-raizes-${r1}-${r2}-${v%30}`
      };
    }

    case "D078_M":
    case "D145_M":{
      const m=pick([-4,-3,-2,-1,1,2,3,4],s+v);
      const b=pick([-5,-3,-1,0,2,4,5],s*2+v);
      const correta=`y = ${m}x + ${b}`;
      const ops=[
        correta,
        `y = ${b}x + ${m}`,
        `y = ${-m}x + ${b}`,
        `y = ${m}x - ${b}`,
        `y = x + ${b}`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Uma reta possui coeficiente angular ${m} e coeficiente linear ${b}. Qual é sua equação?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`reta-coef-${descriptor}-${m}-${b}-${v%50}`
      };
    }

    case "D080_M":{
      const base=pick([2,3,5,10],s+v);
      const correta=`f(x) = log${base}(x)`;
      const ops=[
        correta,
        `f(x) = ${base}^x`,
        `f(x) = x^${base}`,
        `f(x) = ${base}x`,
        `f(x) = 1/x`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Qual expressão representa uma função logarítmica de base ${base}?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`log-${base}-${v%30}`
      };
    }

    case "D082_M":{
      const taxa=pick([2,3,4,5,6],s+v);
      const correta="crescimento linear";
      const ops=[
        "crescimento linear",
        "decrescimento linear",
        "crescimento exponencial",
        "função constante",
        "comportamento periódico"
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Uma quantidade aumenta sempre ${taxa} unidades a cada período. Que comportamento gráfico melhor representa essa situação?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`situacao-grafico-${taxa}-${v%40}`
      };
    }

    case "D085_M":{
      const m=pick([-5,-4,-3,-2,-1,1,2,3,4,5],s+v);
      const b=pick([-8,-6,-4,-2,0,2,4,6,8],s*2+v);
      const correta=`coeficiente angular ${m} e intercepto em y igual a ${b}`;
      const ops=[
        correta,
        `coeficiente angular ${b} e intercepto em y igual a ${m}`,
        `coeficiente angular ${-m} e intercepto em y igual a ${b}`,
        `coeficiente angular ${m} e intercepto em y igual a ${-b}`,
        `coeficiente angular ${m+b} e intercepto em y igual a 0`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Considere a reta y = ${m}x + ${b}. Qual interpretação geométrica está correta?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`reta-interpretacao-${m}-${b}-${v%500}`
      };
    }

    case "D086_M":{
      const m=pick([2,3,4,5,-2,-3],s+v);
      const b=pick([-4,-2,0,1,3,5],s*2+v);
      const x1=pick([0,1,2],s*3+v);
      const y1=m*x1+b;
      const x2=x1+1;
      const y2=m*x2+b;

      const correta=`y = ${m}x + ${b}`;
      const ops=[
        correta,
        `y = ${b}x + ${m}`,
        `y = ${-m}x + ${b}`,
        `y = ${m}x - ${b}`,
        `y = x + ${b}`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Uma tabela contém os pares (${x1}, ${y1}) e (${x2}, ${y2}). Sabendo que a relação é linear, qual expressão a representa?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`tabela-funcao-${m}-${b}-${x1}-${v%30}`
      };
    }

    case "D087_M":{
      const r1=pick([1,2,3,4,5,6],s+v);
      const r2=pick([-6,-5,-4,-3,-2,-1],s*2+v);
      const soma=r1+r2;
      const prod=r1*r2;

      const correta=`x = ${r1} ou x = ${r2}`;
      const ops=[
        correta,
        `x = ${-r1} ou x = ${-r2}`,
        `x = ${soma}`,
        `x = ${prod}`,
        `x = ${Math.abs(r1-r2)}`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Quais são as soluções da equação x² − (${soma})x + (${prod}) = 0?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`eq2-${r1}-${r2}-${v%40}`
      };
    }

    case "D088_M":{
      const inicial=pick([50,100,150,200,300,500],s+v);
      const fator=pick([2,3,4],s*2+v);
      const t=pick([2,3,4,5],s*3+v);
      const correta=inicial*Math.pow(fator,t);
      const a=alternativas(
        correta,
        [
          inicial*fator*t,
          inicial+fator*t,
          inicial*Math.pow(fator,t-1),
          inicial*Math.pow(fator,t+1)
        ],
        s
      );

      return {
        text:`Uma população inicia com ${inicial} indivíduos e é multiplicada por ${fator} a cada período. Quantos indivíduos haverá após ${t} períodos?`,
        ...a,
        modeloId:`exp-problema-${inicial}-${fator}-${t}-${v%50}`
      };
    }

    case "D096_M":{
      const a1=pick([2,3,4,5,6,10],s+v);
      const r=pick([2,3,4,5,6,8],s*2+v);
      const n=pick([5,6,7,8,10,12],s*3+v);
      const correta=a1+(n-1)*r;
      const a=alternativas(
        correta,
        [
          a1+n*r,
          a1+(n-2)*r,
          a1*r*n,
          a1+n+r
        ],
        s
      );

      return {
        text:`Em uma PA, a₁=${a1} e a razão é ${r}. Qual é o ${n}º termo?`,
        ...a,
        modeloId:`pa-${a1}-${r}-${n}-${v%40}`
      };
    }

    case "D097_M":{
      const a1=pick([1,2,3,4,5],s+v);
      const q=pick([2,3,4],s*2+v);
      const n=pick([4,5,6,7],s*3+v);
      const correta=a1*Math.pow(q,n-1);
      const a=alternativas(
        correta,
        [
          a1*q*n,
          a1*Math.pow(q,n),
          a1*Math.pow(q,n-2),
          a1+q*n
        ],
        s
      );

      return {
        text:`Em uma PG, a₁=${a1} e a razão é ${q}. Qual é o ${n}º termo?`,
        ...a,
        modeloId:`pg-${a1}-${q}-${n}-${v%40}`
      };
    }

    case "D111_M":{
      const tipo=pick(["cubo","cilindro","prisma triangular","cone"],s+v);

      const dados={
        "cubo":{
          correta:"seis quadrados congruentes",
          op:[
            "seis quadrados congruentes",
            "dois círculos e um retângulo",
            "um círculo e um setor circular",
            "dois triângulos e três retângulos",
            "quatro triângulos e um quadrado"
          ]
        },
        "cilindro":{
          correta:"dois círculos e um retângulo",
          op:[
            "dois círculos e um retângulo",
            "seis quadrados congruentes",
            "um círculo e um setor circular",
            "dois triângulos e três retângulos",
            "quatro triângulos e um quadrado"
          ]
        },
        "prisma triangular":{
          correta:"dois triângulos e três retângulos",
          op:[
            "dois triângulos e três retângulos",
            "seis quadrados congruentes",
            "dois círculos e um retângulo",
            "um círculo e um setor circular",
            "quatro triângulos e um quadrado"
          ]
        },
        "cone":{
          correta:"um círculo e um setor circular",
          op:[
            "um círculo e um setor circular",
            "seis quadrados congruentes",
            "dois círculos e um retângulo",
            "dois triângulos e três retângulos",
            "quatro triângulos e um quadrado"
          ]
        }
      }[tipo];

      const sh=shuffle(dados.op,s);

      return {
        text:`Qual conjunto de figuras pode formar uma planificação de um ${tipo}?`,
        options:sh,
        correct:sh.indexOf(dados.correta),
        modeloId:`planificacao-${tipo}-${v%50}`
      };
    }

    case "D119_M":{
      const k=pick([2,3,4,5],s+v);
      const a1=pick([3,4,5,6],s*2+v);
      const b1=pick([4,5,6,8],s*3+v);
      const a2=a1*k;
      const correta=b1*k;

      const a=alternativas(
        correta,
        [
          b1+k,
          b1*k+1,
          b1*k-1,
          a2+b1
        ],
        s
      );

      return {
        text:`Dois triângulos semelhantes têm lados correspondentes ${a1} e ${a2}. Se outro lado do menor mede ${b1}, quanto mede o correspondente no maior?`,
        ...a,
        modeloId:`semelhanca-${k}-${a1}-${b1}-${v%30}`
      };
    }

    case "D124_M":{
      const x1=pick([-4,-3,-2,-1,0,1,2],s+v);
      const m=pick([-4,-3,-2,-1,1,2,3,4],s*2+v);
      const b=pick([-5,-3,-1,0,2,4,5],s*3+v);
      const y1=m*x1+b;
      const x2=x1+2;
      const y2=m*x2+b;

      const correta=`y = ${m}x + ${b}`;
      const ops=[
        correta,
        `y = ${b}x + ${m}`,
        `y = ${-m}x + ${b}`,
        `y = ${m}x - ${b}`,
        `y = x + ${b}`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Qual é a equação da reta que passa pelos pontos (${x1}, ${y1}) e (${x2}, ${y2})?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`reta-2pontos-${x1}-${y1}-${x2}-${y2}-${v%50}`
      };
    }

    case "D125_M":{
      const pol=pick([
        {nome:"cubo",V:8,F:6,A:12},
        {nome:"tetraedro",V:4,F:4,A:6},
        {nome:"prisma triangular",V:6,F:5,A:9},
        {nome:"pirâmide quadrangular",V:5,F:5,A:8}
      ],s+v);

      const correta=pol.A;
      const a=alternativas(
        correta,
        [pol.V,pol.F,pol.V+pol.F,pol.A+2],
        s
      );

      return {
        text:`Um ${pol.nome} possui ${pol.V} vértices e ${pol.F} faces. Usando a relação de Euler, quantas arestas ele possui?`,
        ...a,
        modeloId:`euler-${pol.nome}-${v%30}`
      };
    }

    case "D126_M":{
      const fun=pick(["seno","cosseno"],s+v);
      const correta=fun==="seno"
        ?"passa pela origem"
        :"assume valor máximo 1 quando x=0";

      const ops=[
        correta,
        "é sempre crescente",
        "não possui período",
        "tem domínio apenas positivo",
        "é uma reta"
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Qual característica é compatível com o gráfico da função ${fun}?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`trig-grafico-${fun}-${v%30}`
      };
    }

    case "D127_M":
    case "D154_M":{
      const x=pick([-3,-2,-1,1,2,3,4],s+v);
      const y=pick([-3,-2,-1,1,2,3,4],s*2+v);

      const correta=`(${x}, ${y})`;
      const ops=[
        correta,
        `(${y}, ${x})`,
        `(${-x}, ${y})`,
        `(${x}, ${-y})`,
        `(${-x}, ${-y})`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Duas retas de um sistema se intersectam no ponto (${x}, ${y}). Qual é a solução do sistema?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`sistema-intersec-${descriptor}-${x}-${y}-${v%40}`
      };
    }

    case "D129_M":{
      const forma=pick(["prisma","cilindro"],s+v);

      if(forma==="prisma"){
        const ab=pick([12,15,18,20,24,30],s*2+v);
        const h=pick([4,5,6,8,10],s*3+v);
        const correta=ab*h;

        const a=alternativas(
          correta,
          [
            ab+h,
            ab*2+h,
            ab*h/2,
            ab*h+ab
          ],
          s
        );

        return {
          text:`Um prisma possui área da base igual a ${ab} cm² e altura ${h} cm. Qual é seu volume?`,
          ...a,
          modeloId:`volume-prisma-${ab}-${h}-${v%50}`
        };
      }

      const r=pick([2,3,4,5],s*2+v);
      const h=pick([4,5,6,8,10],s*3+v);
      const correta=`${r*r*h}π cm³`;

      const ops=[
        correta,
        `${2*r*h}π cm³`,
        `${r*h}π cm³`,
        `${r*r}π cm³`,
        `${2*r*r*h}π cm³`
      ];

      const sh=shuffle(ops,s);

      return {
        text:`Um cilindro possui raio ${r} cm e altura ${h} cm. Qual é seu volume?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`volume-cil-${r}-${h}-${v%50}`
      };
    }

    case "D132_M":{
      const taxa=pick([2,3,4,5,6,8,10],s+v);
      const fixo=pick([5,10,15,20,30,40],s*2+v);
      const x=pick([3,4,5,6,8,10],s*3+v);
      const correta=fixo+taxa*x;

      const a=alternativas(
        correta,
        [
          taxa*x,
          fixo*x,
          fixo+taxa,
          fixaSeguro(fixo,taxa,x)
        ],
        s
      );

      return {
        text:`Uma situação é modelada por f(x)=${taxa}x+${fixo}. Qual é o valor de f(${x})?`,
        ...a,
        modeloId:`func1-${taxa}-${fixo}-${x}-${v%40}`
      };
    }

    case "D133_M":{
      const a=-pick([1,2,3],s+v);
      const xv=pick([1,2,3,4,5],s*2+v);
      const c=pick([10,20,30,40,50],s*3+v);
      const b=-2*a*xv;
      const yv=a*xv*xv+b*xv+c;

      const correta=`${fmt(yv)}`;
      const aop=alternativas(
        correta,
        [fmt(yv-5),fmt(yv+5),fmt(xv),fmt(c)],
        s
      );

      return {
        text:`A função f(x)=${a}x²+${b}x+${c} possui valor máximo. Qual é esse valor?`,
        ...aop,
        modeloId:`vertice-${a}-${b}-${c}-${v%30}`
      };
    }

    case "D155_M":{
      const cx=pick([-4,-3,-2,-1,0,1,2,3,4],s+v);
      const cy=pick([-4,-3,-2,-1,0,1,2,3,4],s*2+v);
      const r=pick([2,3,4,5,6],s*3+v);

      const correta=`(x - (${cx}))² + (y - (${cy}))² = ${r*r}`;

      const ops=[
        correta,
        `(x + (${cx}))² + (y + (${cy}))² = ${r*r}`,
        `(x - (${cx}))² + (y - (${cy}))² = ${r}`,
        `x² + y² = ${r}`,
        `(x - (${cy}))² + (y - (${cx}))² = ${r*r}`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Qual é a equação da circunferência de centro (${cx}, ${cy}) e raio ${r}?`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`circ-${cx}-${cy}-${r}-${v%50}`
      };
    }

    case "D157_M":{
      const x=pick([1,2,3,4,5],s+v);
      const y=pick([1,2,3,4,5],s*2+v);

      const soma=x+y;
      const dif=x-y;
      const correta=`x=${x} e y=${y}`;

      const ops=[
        correta,
        `x=${y} e y=${x}`,
        `x=${soma} e y=${dif}`,
        `x=${x+1} e y=${y-1}`,
        `x=${x-1} e y=${y+1}`
      ];
      const sh=shuffle(ops,s);

      return {
        text:`Resolva o sistema x+y=${soma} e x−y=${dif}.`,
        options:sh,
        correct:sh.indexOf(correta),
        modeloId:`matriz-sistema-${x}-${y}-${v%50}`
      };
    }

    default:{
      const n=pick([2,3,4,5,6,8,10,12],s+v);
      const correta=n*2;
      const a=alternativas(
        correta,
        [n,n+2,n*3,n*n],
        s
      );

      return {
        text:`Considere uma situação relacionada ao descritor ${descriptor}. Se uma grandeza de referência vale ${n} e é duplicada, qual é o resultado?`,
        ...a,
        modeloId:`fallback-${descriptor}-${n}-${v%100}`
      };
    }
  }
}

function fixaSeguro(a,b,c){
  return a+b*c+1;
}

function gerar(descriptor,level,seed,variante){
  return gerarGenerica(descriptor,level,seed,variante);
}

function preparar(descriptor,level,g,peso,index,round){
  const m=meta(
    descriptor,
    level,
    HABILIDADES_PAEBES[descriptor]||""
  );

  return {
    id:`${descriptor}-${index+1}-${round}-${Date.now().toString(36)}-${hash(g.text+index)}`,
    questaoId:`Q-${descriptor}-${hash(g.text+"|"+(g.modeloId||""))}`,
    descriptor,
    descritor:descriptor,

    habilidade:HABILIDADES_PAEBES[descriptor]||"",
    expectativa:m.expectativa,
    tarefa:m.tarefa,
    parteHabilidade:m.tarefa,

    level,
    nivel:level,

    text:String(g.text||"").trim(),
    texto:String(g.text||"").trim(),

    options:(g.options||[]).map(String),
    opcoes:(g.options||[]).map(String),

    correct:Number(g.correct),
    correta:Number(g.correct),

    pesoDescritor:peso,
    baseXP:Math.round((XP_NIVEL[level]||120)*peso),

    modeloId:g.modeloId||null,
    nucleo:m.nucleo,
    prioridadeAMA:m.prioridadeAMA,
    contexto:m.contexto,
    recurso:"texto",

    origem:m.origem,
    origemTipo:"autoral_alinhada",
    fonteReferencia:"Matriz de Referência PAEBES/AMA — item autoral alinhado, não reproduzido como item oficial",

    solucao:String(
      g.solucao||
      solucaoOrientada(
        descriptor,
        {
          options:(g.options||[]).map(String),
          correct:Number(g.correct)
        }
      )
    ),

    versaoBanco:"coliseu-3tri-2026-v5"
  };
}

export function habilidadeDoDescritor(descritor){
  return HABILIDADES_PAEBES[descritor]||"";
}

export function gerarQuestaoDescritor(
  descritor,
  nivel="BÁSICO",
  seed=Date.now()
){
  if(!HABILIDADES_PAEBES[descritor]){
    throw new Error("Descritor não pertence à matriz configurada.");
  }

  const g=gerar(
    descritor,
    nivel,
    seed,
    Math.abs(Number(seed)||0)
  );

  const q=preparar(
    descritor,
    nivel,
    g,
    1,
    0,
    rodada()
  );

  if(!questaoValida(q)){
    throw new Error("Questão especial inválida.");
  }

  return q;
}

export function gerarQuestoesArena({
  quantidade=15,
  descritores=[],
  configuracaoDescritores={},
  distribuicaoNiveis={
    abb:40,
    basico:35,
    proficiente:25,
    avancado:0
  }
}={}){
  quantidade=Math.max(
    5,
    Math.floor(Number(quantidade)||15)
  );

  const validos=[
    ...new Set(
      descritores.filter(
        d=>HABILIDADES_PAEBES[d]
      )
    )
  ];

  if(!validos.length){
    throw new Error("Selecione pelo menos um descritor.");
  }

  const {fila,pesos}=filaDescritores(
    validos,
    configuracaoDescritores,
    quantidade
  );

  const nivs=niveisDistrib(
    distribuicaoNiveis,
    quantidade
  );

  const round=rodada();

  const seedArena=
    round*10007+
    (Date.now()%1000003);

  const hist=lerHist();

  const histA=new Set(hist.assinaturas);
  const histM=new Set(hist.modelos);

  const usadasA=new Set();
  const usadasTexto=new Set();
  const usadasModelo=new Set();

  const novasA=[];
  const novasM=[];
  const questoes=[];
  const uso={};

  for(let i=0;i<quantidade;i++){

    const d=fila[i];
    const cfg=configuracaoDescritores[d]||{};

    const level=
      cfg.nivel &&
      cfg.nivel!=="MISTO"
        ? cfg.nivel
        : (nivs[i]||"BÁSICO");

    const chave=`${d}|${level}`;
    const base=Number(uso[chave]||0);

    let escolhida=null;

    // ==================================================
    // FASE 1
    // QUESTÃO INÉDITA TAMBÉM NO HISTÓRICO
    // ==================================================
    for(let tentativa=0;tentativa<500;tentativa++){

      const seed=
        seedArena+
        (i+1)*7919+
        validos.indexOf(d)*104729+
        tentativa*15485863;

      const variante=
        base+
        round+
        tentativa+
        i*7;

      let g;

      try{
        g=gerar(
          d,
          level,
          seed,
          variante
        );
      }catch{
        continue;
      }

      const q=preparar(
        d,
        level,
        g,
        pesos[d],
        i,
        round
      );

      if(!questaoValida(q)){
        continue;
      }

      const a=assinatura(q);
      const txt=norm(q.text);

      const mk=
        `${d}|${level}|${q.modeloId||""}`;

      if(
        usadasA.has(a) ||
        usadasTexto.has(txt)
      ){
        continue;
      }

      if(
        histA.has(a) ||
        histM.has(mk) ||
        usadasModelo.has(mk)
      ){
        continue;
      }

      escolhida=q;

      usadasA.add(a);
      usadasTexto.add(txt);
      usadasModelo.add(mk);

      novasA.push(a);

      if(q.modeloId){
        novasM.push(mk);
      }

      break;
    }

    // ==================================================
    // FASE 2
    // PODE REUTILIZAR MODELO ANTIGO,
    // MAS NÃO REPETE QUESTÃO NA ARENA ATUAL
    // ==================================================
    if(!escolhida){

      for(
        let tentativa=500;
        tentativa<2500;
        tentativa++
      ){

        const seed=
          seedArena+
          i*99991+
          tentativa*32452843+
          Date.now();

        let g;

        try{
          g=gerar(
            d,
            level,
            seed,
            base+
            tentativa+
            17+
            i*13
          );
        }catch{
          continue;
        }

        const q=preparar(
          d,
          level,
          g,
          pesos[d],
          i,
          round
        );

        if(!questaoValida(q)){
          continue;
        }

        const a=assinatura(q);
        const txt=norm(q.text);

        const mk=
          `${d}|${level}|${q.modeloId||""}`;

        if(
          usadasA.has(a) ||
          usadasTexto.has(txt)
        ){
          continue;
        }

        escolhida=q;

        usadasA.add(a);
        usadasTexto.add(txt);

        novasA.push(a);

        if(q.modeloId){
          novasM.push(mk);
        }

        break;
      }
    }

    // ==================================================
    // FASE 3
    // CONTINGÊNCIA PEDAGÓGICA
    // HISTÓRICO NUNCA BLOQUEIA A ARENA
    // ==================================================
    if(!escolhida){

      for(
        let tentativa=2500;
        tentativa<20000;
        tentativa++
      ){

        const seed=
          seedArena+
          (i+11)*2147483+
          tentativa*49979687+
          (Date.now()%100000);

        let g;

        try{
          g=gerar(
            d,
            level,
            seed,
            base+
            tentativa+
            round*31+
            i*101
          );
        }catch{
          continue;
        }

        if(
          g &&
          typeof g.text==="string"
        ){
          const molduras=[
            "Em uma atividade de revisão da Arena, ",
            "Durante uma análise matemática, ",
            "Em uma situação de preparação para avaliação externa, ",
            "Em um desafio de consolidação da habilidade, ",
            "Ao revisar esta habilidade, ",
            "Em uma etapa de verificação da aprendizagem, "
          ];

          const pref=
            molduras[
              tentativa%
              molduras.length
            ];

          g={
            ...g,
            text:
              pref+
              g.text.charAt(0).toLowerCase()+
              g.text.slice(1),

            modeloId:
              `${g.modeloId||"modelo"}-c${tentativa}`
          };
        }

        const q=preparar(
          d,
          level,
          g,
          pesos[d],
          i,
          round
        );

        if(!questaoValida(q)){
          continue;
        }

        const a=assinatura(q);
        const txt=norm(q.text);

        const mk=
          `${d}|${level}|${q.modeloId||""}`;

        if(
          usadasA.has(a) ||
          usadasTexto.has(txt)
        ){
          continue;
        }

        escolhida=q;

        usadasA.add(a);
        usadasTexto.add(txt);
        usadasModelo.add(mk);

        novasA.push(a);

        if(q.modeloId){
          novasM.push(mk);
        }

        break;
      }
    }

    if(!escolhida){
      throw new Error(
        `Falha interna de validação do banco para ${d}. A Arena não foi reduzida; revise a estrutura deste descritor.`
      );
    }

    uso[chave]=base+1;

    questoes.push(
      escolhida
    );
  }

  if(
    questoes.length!==
    quantidade
  ){
    throw new Error(
      "A quantidade final de questões não corresponde à configuração da Arena."
    );
  }

  salvarHist({
    assinaturas:[
      ...hist.assinaturas,
      ...novasA
    ],
    modelos:[
      ...hist.modelos,
      ...novasM
    ]
  });

  return questoes;
}

export function descritoresSemBanco(
  descritores=[]
){
  return descritores.filter(
    d=>!HABILIDADES_PAEBES[d]
  );
}

console.log(
  "🏛️ Banco Coliseu v5 carregado — variedade ampliada, solução pedagógica e contingência sem bloqueio por esgotamento histórico."
);
