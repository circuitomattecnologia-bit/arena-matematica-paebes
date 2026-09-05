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
  "n1-plano-retas":{
    ordem:1,
    nome:"N1 — Plano Cartesiano e Retas",
    foco:"Localização no plano cartesiano, interpretação dos coeficientes e construção/reconhecimento da equação da reta.",
    descritores:["D043_M","D085_M","D124_M"],
    prioridadeAMA:true
  },
  "n2-exponencial-pg":{
    ordem:2,
    nome:"N2 — Função Exponencial e Progressão Geométrica",
    foco:"Representações da função exponencial, crescimento/decrescimento, aplicações e progressão geométrica.",
    descritores:["D074_M","D088_M","D097_M"],
    prioridadeAMA:true
  },
  "n3-geometria-espacial":{
    ordem:3,
    nome:"N3 — Geometria Espacial",
    foco:"Planificações e vistas, elementos dos poliedros, relação de Euler, área total e volume.",
    descritores:["D111_M","D125_M","D129_M"],
    prioridadeAMA:true
  },
  "n4-numeros-proporcionalidade-metricas":{
    ordem:4,
    nome:"N4 — Números, Proporcionalidade e Relações Métricas",
    foco:"Representações de números racionais, proporcionalidade entre grandezas e relações métricas no triângulo retângulo.",
    descritores:["D013_M","D039_M","D049_M"],
    prioridadeAMA:true
  },
  "n5-dados-graficos":{
    ordem:5,
    nome:"N5 — Dados, Tabelas e Gráficos",
    foco:"Leitura, interpretação e utilização de informações apresentadas em tabelas e gráficos na resolução de problemas.",
    descritores:["D064_M"],
    prioridadeAMA:true
  },
  "n6-funcoes-algebricas":{
    ordem:6,
    nome:"N6 — Funções Algébricas e Resolução de Problemas",
    foco:"Modelagem e resolução de situações-problema envolvendo equação do 2º grau.",
    descritores:["D087_M"],
    prioridadeAMA:true
  }
};

// REGRA PEDAGÓGICA DA CAMPANHA AMA:
// Núcleo organiza o conteúdo; descritor identifica a habilidade;
// o nível é individual e deve evoluir de forma adaptativa:
// ABAIXO DO BÁSICO → BÁSICO → PROFICIENTE → AVANÇADO.
// AVANÇADO é o último estágio e deve ter menor incidência.
// A progressão efetiva do estudante é responsabilidade do motor adaptativo;
// a distribuição abaixo funciona apenas como fallback quando nenhum nível individual é informado.

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

// ======================================================
// FONTES E REFERÊNCIAS — COLISEU v6.2
// Regra: não rotular item autoral como oficial.
// Itens reproduzidos/adaptados de material identificado carregam a referência real;
// geração própria é marcada como EQUIVALENTE/AUTORAL.
// ======================================================
export const FONTES_BANCO = {
  AMA:{tipo:"AMA",rotulo:"AMA — Avaliação de Monitoramento da Aprendizagem",prioridade:1},
  PAEBES:{tipo:"PAEBES",rotulo:"PAEBES — Programa de Avaliação da Educação Básica do Espírito Santo",prioridade:1},
  SAEB:{tipo:"SAEB",rotulo:"SAEB / avaliações externas",prioridade:2},
  MATERIAL_ESTRUTURADO:{tipo:"MATERIAL_ESTRUTURADO",rotulo:"Material público/estruturado",prioridade:3},
  BANCO_PORTAL:{tipo:"BANCO_PORTAL",rotulo:"Banco aprovado do Portal Jornada Matemática",prioridade:4},
  EQUIVALENTE:{tipo:"EQUIVALENTE",rotulo:"Item equivalente ao padrão externo",prioridade:5},
  AUTORAL:{tipo:"AUTORAL",rotulo:"Questão autoral de contingência",prioridade:6}
};

const REFERENCIAS_BANCO = {
  RPE_3SERIE_2TRI_2026:"SEDU-ES — 3ª Série EM Matemática, RPE 2026, 2º trimestre — seção Progressão Geométrica (D097_M)",
  MATRIZES_2026:"Matrizes de Referência AMA/PAEBES 2026 — habilidade/descritor informado no item",
  PORTAL:"Banco de Questões aprovado — Portal Jornada Matemática — Professor Leopoldo"
};

const HIST_KEY = "arenaPAEBES_historicoQuestoes_v3";
const ROUND_KEY = "arenaPAEBES_rodadaBanco";

function clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
function fmt(n){
  const x=Math.round(Number(n)*100)/100;
  return Number.isInteger(x)?String(x):String(x).replace(".",",");
}
function pick(a,s=0){ return a[Math.abs(Number(s)||0)%a.length]; }
function hash(str=""){
  let h=2166136261;
  for(let i=0;i<str.length;i++){
    h^=str.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(36);
}
function norm(v=""){
  return String(v).normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLowerCase().replace(/<[^>]*>/g," ").replace(/[^a-z0-9]+/g," ").trim();
}
function shuffle(arr,seed=1){
  const a=[...arr]; let s=Math.abs(Number(seed)||1);
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
  [resposta,...distratores.map(String),"0","1","2","3","4","5","6","8","10","12","15","20","25","30","40","50","60","100"]
    .forEach(x=>{ if(!unicos.includes(x)) unicos.push(x); });
  const opts=shuffle(unicos.slice(0,5),seed);
  return {options:opts,correct:opts.indexOf(resposta)};
}
function svg(inner,label="Representação matemática"){
  return `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <rect width="520" height="280" rx="18" fill="#07182d"/>${inner}</svg>`;
}
function plano({pontos=[],retas=[]}={}){
  let c="";
  for(let i=-5;i<=5;i++){
    const x=260+i*42,y=140-i*22;
    c+=`<line x1="${x}" y1="20" x2="${x}" y2="255" stroke="#153552"/>
        <line x1="35" y1="${y}" x2="485" y2="${y}" stroke="#153552"/>`;
  }
  c+=`<line x1="35" y1="140" x2="485" y2="140" stroke="#dbeafe" stroke-width="2"/>
      <line x1="260" y1="20" x2="260" y2="255" stroke="#dbeafe" stroke-width="2"/>`;
  retas.forEach((r,idx)=>{
    const pts=[];
    for(let x=-5;x<=5;x+=.25){
      const y=r.m*x+r.b;
      pts.push(`${260+x*42},${140-y*22}`);
    }
    c+=`<polyline points="${pts.join(" ")}" fill="none" stroke="${idx?"#facc15":"#ff6fab"}" stroke-width="4"/>`;
  });
  pontos.forEach(p=>{
    c+=`<circle cx="${260+p.x*42}" cy="${140-p.y*22}" r="6" fill="#22d3ee"/>
        <text x="${270+p.x*42}" y="${132-p.y*22}" fill="#fff" font-size="14">${p.label||""}</text>`;
  });
  return svg(c,"Plano cartesiano");
}
function barras(vals,labels=["A","B","C","D"],titulo="Dados"){
  const max=Math.max(...vals,1); let c=`<text x="260" y="30" text-anchor="middle" fill="#fff">${titulo}</text>`;
  vals.forEach((v,i)=>{
    const h=145*v/max,x=70+i*105;
    c+=`<rect x="${x}" y="${220-h}" width="60" height="${h}" rx="5" fill="#3e8cff"/>
        <text x="${x+30}" y="${208-h}" text-anchor="middle" fill="#fff">${v}</text>
        <text x="${x+30}" y="245" text-anchor="middle" fill="#cbd5e1">${labels[i]}</text>`;
  });
  return svg(c,"Gráfico de barras");
}
function tabela(headers,rows){
  const w=440/headers.length; let c="";
  headers.forEach((h,i)=>{
    c+=`<rect x="${40+i*w}" y="45" width="${w}" height="42" fill="#12385a" stroke="#8bdcff"/>
        <text x="${40+i*w+w/2}" y="72" text-anchor="middle" fill="#fff">${h}</text>`;
  });
  rows.forEach((row,r)=>row.forEach((v,i)=>{
    c+=`<rect x="${40+i*w}" y="${87+r*42}" width="${w}" height="42" fill="#0d2743" stroke="#2b5b7a"/>
        <text x="${40+i*w+w/2}" y="${114+r*42}" text-anchor="middle" fill="#dcecff">${v}</text>`;
  }));
  return svg(c,"Tabela");
}
function cubo(){
  return svg(`<g fill="none" stroke="#8bdcff" stroke-width="5">
  <path d="M150 65 L285 65 L365 125 L230 125 Z"/>
  <path d="M150 65 L150 185 L230 245 L230 125"/>
  <path d="M230 125 L365 125 L365 245 L230 245 Z"/>
  <path d="M285 65 L285 185 L365 245"/><path d="M150 185 L285 185"/></g>`,"Cubo");
}
function cilindro(){
  return svg(`<ellipse cx="260" cy="62" rx="95" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>
  <path d="M165 62 L165 205 M355 62 L355 205" stroke="#8bdcff" stroke-width="4"/>
  <ellipse cx="260" cy="205" rx="95" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>`,"Cilindro");
}
function planCubo(){
  const q=(x,y)=>`<rect x="${x}" y="${y}" width="58" height="58" fill="#17456d" stroke="#8bdcff" stroke-width="3"/>`;
  return svg(q(202,42)+q(144,100)+q(202,100)+q(260,100)+q(318,100)+q(202,158),"Planificação de cubo");
}
function tri(a,b,c){
  return svg(`<polygon points="120,220 410,220 120,60" fill="rgba(62,140,255,.16)" stroke="#8bdcff" stroke-width="4"/>
  <rect x="120" y="198" width="22" height="22" fill="none" stroke="#facc15" stroke-width="3"/>
  <text x="265" y="246" fill="#fff" text-anchor="middle">${a}</text>
  <text x="93" y="145" fill="#fff" text-anchor="middle">${b}</text>
  <text x="290" y="130" fill="#fff" text-anchor="middle">${c}</text>`,"Triângulo retângulo");
}
function meta(descriptor,level,task,contexto="problema",recurso="texto"){
  return {
    habilidade:HABILIDADES_PAEBES[descriptor]||"",
    expectativa:task,
    tarefa:task,
    contexto,
    recurso,
    nivelPedagogico:level,
    nucleo:Object.entries(NUCLEOS_APRENDIZAGEM)
      .filter(([,n])=>n.descritores.includes(descriptor))
      .map(([,n])=>n.nome),
    prioridadeAMA:PRIORIDADE_AMA_3TRI.includes(descriptor),
    origem:"Questão autoral alinhada à Matriz de Referência PAEBES/AMA."
  };
}

function gerar(descriptor,level,seed,variante=0){
  const s=Math.abs(Number(seed)||1), k=Math.abs(Number(variante)||0);
  const mod=k%6;

  if(descriptor==="D009_M"){
    const den=pick([2,4,5,10],s+k),num=1+(s+k)%Math.max(2,den*3),v=num/den;
    return {modeloId:`reta-racional-${mod}`,text:`Na reta numérica, um ponto está localizado em ${fmt(v)}. Qual número racional representa essa posição?`,
      ...alternativas(fmt(v),[fmt(v+1),fmt(v-1),`${num}/${den+1}`,fmt(den/num)],s)};
  }
  if(descriptor==="D013_M"){
    const den=pick([2,4,5,10],s+k),num=1+(s+k)%(den-1),dec=num/den;
    if(mod===0) return {familiaId:"RACIONAL_FRACAO_DECIMAL",modeloId:"racional-fracao-decimal",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; tarefa equivalente de representação de número racional.`,
      text:`Qual representação decimal corresponde à fração ${num}/${den}?`,
      ...alternativas(fmt(dec),[fmt(num+den),fmt(den/num),fmt(dec+0.1),fmt(dec*10)],s)};
    if(mod===1){
      const pct=Math.round(dec*100);
      return {familiaId:"RACIONAL_FRACAO_PERCENTUAL",modeloId:"racional-fracao-percentual",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; tarefa equivalente de conversão entre representações.`,
        text:`A fração ${num}/${den} corresponde a qual percentual?`,
        ...alternativas(`${pct}%`,[`${pct+10}%`,`${Math.max(0,pct-10)}%`,`${num*10}%`,`${den*10}%`],s)};
    }
    if(mod===2){
      const pct=pick([20,25,40,50,60,75],s+k);
      const fracs={20:"1/5",25:"1/4",40:"2/5",50:"1/2",60:"3/5",75:"3/4"};
      return {familiaId:"RACIONAL_PERCENTUAL_FRACAO",modeloId:"racional-percentual-fracao",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; tarefa equivalente de conversão entre representações.`,
        text:`Qual fração representa ${pct}%?`,
        ...alternativas(fracs[pct],["1/10","2/3","3/10","4/5"],s)};
    }
    if(mod===3){
      const val=pick([0.2,0.25,0.4,0.5,0.75],s+k);
      const mapa={"0.2":"1/5","0.25":"1/4","0.4":"2/5","0.5":"1/2","0.75":"3/4"};
      return {familiaId:"RACIONAL_DECIMAL_FRACAO",modeloId:"racional-decimal-fracao",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; tarefa equivalente de representação racional.`,
        text:`Qual fração é equivalente ao número decimal ${fmt(val)}?`,
        ...alternativas(mapa[String(val)],["1/10","2/3","3/5","4/5"],s)};
    }
    if(mod===4){
      const a=pick([0.25,0.4,0.5,0.75],s+k);
      const pct=Math.round(a*100);
      return {familiaId:"RACIONAL_EQUIVALENCIA_TRIPLA",modeloId:"racional-equivalencia-tripla",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; equivalência fração-decimal-percentual.`,
        text:`Qual alternativa apresenta uma representação equivalente a ${fmt(a)}?`,
        ...alternativas(`${pct}%`,[`${pct/10}%`,`${pct+25}%`,`${Math.max(1,pct-20)}%`,`${100-pct}%`],s)};
    }
    return {familiaId:"RACIONAL_COMPARAR_REPRESENTACOES",modeloId:"racional-comparar-representacoes",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; comparação de representações racionais.`,
      text:`Qual dos valores é equivalente a ${num}/${den}?`,
      ...alternativas(fmt(dec),[fmt(dec+0.25),fmt(dec+0.5),fmt(Math.max(0,dec-0.1)),fmt(den/num)],s)};
  }
  if(descriptor==="D033_M"){
    const n=pick([2,3,5,7,8,10,11,13,17],s+k),r=Math.sqrt(n);
    return {modeloId:`irracional-${mod}`,text:`Entre quais números inteiros consecutivos está localizado √${n}?`,
      ...alternativas(`${Math.floor(r)} e ${Math.ceil(r)}`,["0 e 1","1 e 2","2 e 3","3 e 4","4 e 5"],s)};
  }
  if(descriptor==="D038_M"){
    const preco=80+((s+k)%11)*20,p=pick([10,15,20,25,30,40],s+k),d=preco*p/100;
    return {modeloId:`porcentagem-${mod}`,text:`Um produto custa R$ ${preco}. Em uma promoção, recebe desconto de ${p}%. Qual é o valor do desconto?`,
      ...alternativas(fmt(d),[fmt(preco-d),fmt(d+10),fmt(preco*p/10),fmt(p)],s)};
  }
  if(descriptor==="D039_M"){
    const a=2+(s%5),b=3+((s+k)%7),c=a+2,r=b*c/a;
    if(mod===0) return {familiaId:"PROP_DIRETA_CONSUMO",modeloId:"prop-direta-consumo",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; proporcionalidade direta em contexto de consumo.`,
      text:`${a} pessoas consomem ${b} litros de água em uma atividade. Mantendo a mesma proporção, quantos litros serão necessários para ${c} pessoas?`,
      ...alternativas(fmt(r),[fmt(b+2),fmt(b*a),fmt(r+2),fmt(Math.max(1,r-2))],s)};
    if(mod===1){
      const itens=2+(s%4),valor=5+((s+k)%8),novo=itens+3,resp=valor*novo/itens;
      return {familiaId:"PROP_DIRETA_PRECO",modeloId:"prop-direta-preco",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; proporcionalidade direta em situação de compra.`,
        text:`${itens} unidades de um produto custam R$ ${valor}. Mantendo o mesmo preço unitário, quanto custam ${novo} unidades?`,
        ...alternativas(fmt(resp),[fmt(valor+novo),fmt(valor*novo),fmt(resp+5),fmt(Math.max(1,resp-5))],s)};
    }
    if(mod===2){
      const vel=40+10*(s%4),tempo=2+(s+k)%4,dist=vel*tempo,vel2=vel+20,resp=dist/vel2;
      return {familiaId:"PROP_INVERSA_TEMPO_VELOCIDADE",modeloId:"prop-inversa-tempo-velocidade",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; proporcionalidade inversa em percurso de mesma distância.`,
        text:`Um percurso de ${dist} km é feito a ${vel} km/h em ${tempo} h. Se a velocidade passar para ${vel2} km/h, quanto tempo será necessário para o mesmo percurso?`,
        ...alternativas(fmt(resp),[fmt(tempo+1),fmt(tempo-1),fmt(dist/vel),fmt(resp+1)],s)};
    }
    if(mod===3){
      const esc=pick([2,3,4],s+k),med=5+(s%7),real=med*esc;
      return {familiaId:"PROP_ESCALA",modeloId:"prop-escala",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; proporcionalidade aplicada a escala.`,
        text:`Em uma representação, cada 1 cm corresponde a ${esc} m reais. Uma medida de ${med} cm representa quantos metros?`,
        ...alternativas(real,[med+esc,med*esc*10,Math.max(1,real-esc),real+esc],s)};
    }
    if(mod===4){
      const x=3+(s%5),y=4+((s+k)%6),kprop=y/x,novo=x+2,resp=kprop*novo;
      return {familiaId:"PROP_CONSTANTE",modeloId:"prop-constante",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; identificação e uso da constante de proporcionalidade.`,
        text:`As grandezas x e y são diretamente proporcionais. Se x=${x} corresponde a y=${y}, qual valor de y corresponde a x=${novo}?`,
        ...alternativas(fmt(resp),[fmt(y+2),fmt(y*novo),fmt(resp+2),fmt(Math.max(1,resp-2))],s)};
    }
    return {familiaId:"PROP_RAZAO",modeloId:"prop-razao",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; interpretação de razão entre grandezas.`,
      text:`Uma mistura usa ${a} medidas de concentrado para ${b} medidas de água. Mantendo a proporção, quantas medidas de água são necessárias para ${c} medidas de concentrado?`,
      ...alternativas(fmt(r),[fmt(b+c),fmt(a*b),fmt(r+1),fmt(Math.max(1,r-1))],s)};
  }
  if(descriptor==="D042_M"){
    const a=3+s%5,b=2+(s+k)%5,t=a*b;
    return {modeloId:`contagem-${mod}`,text:`Uma loja oferece ${a} modelos de camisa e ${b} modelos de calça. Quantos conjuntos diferentes podem ser formados escolhendo uma camisa e uma calça?`,
      ...alternativas(t,[a+b,t+2,t-2,a*2],s)};
  }
  if(descriptor==="D043_M"){
    const x=-4+(s+k)%9,y=-4+(s*3+k)%9;
    if(mod===0) return {familiaId:"PLANO_LER_COORDENADAS",modeloId:"plano-ler-coordenadas",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; leitura de coordenadas no plano cartesiano.`,
      text:`Observe o ponto A no plano cartesiano. Quais são suas coordenadas?`,
      ...alternativas(`(${x}, ${y})`,[`(${y}, ${x})`,`(${-x}, ${y})`,`(${x}, ${-y})`,`(${-x}, ${-y})`],s),
      visual:plano({pontos:[{x,y,label:"A"}]})};
    if(mod===1){
      const quad=x>=0?(y>=0?"I":"IV"):(y>=0?"II":"III");
      return {familiaId:"PLANO_IDENTIFICAR_QUADRANTE",modeloId:"plano-identificar-quadrante",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; localização por quadrantes.`,
        text:`O ponto A=(${x}, ${y}) está localizado em qual quadrante?`,
        ...alternativas(`${quad} quadrante`,["I quadrante","II quadrante","III quadrante","IV quadrante"].filter(z=>z!==`${quad} quadrante`),s),
        visual:plano({pontos:[{x,y,label:"A"}]})};
    }
    if(mod===2){
      const x2=x+2,y2=y;
      return {familiaId:"PLANO_DESLOCAMENTO_HORIZONTAL",modeloId:"plano-deslocamento-horizontal",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; deslocamento e leitura de coordenadas.`,
        text:`O ponto A=(${x}, ${y}) é deslocado 2 unidades para a direita. Quais são as coordenadas do novo ponto?`,
        ...alternativas(`(${x2}, ${y2})`,[`(${x}, ${y+2})`,`(${x-2}, ${y})`,`(${y}, ${x2})`,`(${x2}, ${-y2})`],s),
        visual:plano({pontos:[{x,y,label:"A"},{x:x2,y:y2,label:"B"}]})};
    }
    if(mod===3){
      const x2=x,y2=y+2;
      return {familiaId:"PLANO_DESLOCAMENTO_VERTICAL",modeloId:"plano-deslocamento-vertical",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; deslocamento vertical no plano cartesiano.`,
        text:`Partindo de A=(${x}, ${y}), um deslocamento de 2 unidades para cima leva a qual ponto?`,
        ...alternativas(`(${x2}, ${y2})`,[`(${x+2}, ${y})`,`(${x}, ${y-2})`,`(${y2}, ${x})`,`(${-x}, ${y2})`],s),
        visual:plano({pontos:[{x,y,label:"A"},{x:x2,y:y2,label:"B"}]})};
    }
    if(mod===4){
      const dist=Math.abs(x);
      return {familiaId:"PLANO_DISTANCIA_EIXO_Y",modeloId:"plano-distancia-eixo-y",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; interpretação geométrica de coordenadas.`,
        text:`Qual é a distância horizontal do ponto A=(${x}, ${y}) até o eixo y?`,
        ...alternativas(dist,[Math.abs(y),Math.abs(x)+1,Math.abs(x-y),Math.abs(x+y)],s),
        visual:plano({pontos:[{x,y,label:"A"}]})};
    }
    return {familiaId:"PLANO_SIMETRIA_EIXO_Y",modeloId:"plano-simetria-eixo-y",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; simetria e coordenadas.`,
      text:`Qual é o ponto simétrico de A=(${x}, ${y}) em relação ao eixo y?`,
      ...alternativas(`(${-x}, ${y})`,[`(${x}, ${-y})`,`(${-x}, ${-y})`,`(${y}, ${x})`,`(${x}, ${y})`],s),
      visual:plano({pontos:[{x,y,label:"A"},{x:-x,y,label:"A'"}]})};
  }
  if(descriptor==="D049_M"){
    const pares=[[3,4],[5,12],[6,8],[8,15],[7,24]],p=pick(pares,s+k),a=p[0],b=p[1],h=Math.sqrt(a*a+b*b);
    if(mod===0) return {familiaId:"TRI_PITAGORAS_HIPOTENUSA",modeloId:"tri-pitagoras-hipotenusa",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; relação de Pitágoras.`,
      text:`Um triângulo retângulo possui catetos de ${a} cm e ${b} cm. Qual é a medida da hipotenusa?`,
      ...alternativas(fmt(h),[fmt(a+b),fmt(a*b),fmt(Math.abs(a-b)),fmt(h+2)],s),visual:tri(a,b,"?")};
    if(mod===1){
      const cat=a,hip=h,resp=b;
      return {familiaId:"TRI_PITAGORAS_CATETO",modeloId:"tri-pitagoras-cateto",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; determinação de cateto.`,
        text:`Em um triângulo retângulo, a hipotenusa mede ${fmt(hip)} cm e um cateto mede ${cat} cm. Quanto mede o outro cateto?`,
        ...alternativas(fmt(resp),[fmt(hip-cat),fmt(cat+resp),fmt(resp+2),fmt(Math.max(1,resp-2))],s),visual:tri(cat,"?",hip)};
    }
    if(mod===2){
      return {familiaId:"TRI_DIAGONAL_RETANGULO",modeloId:"tri-diagonal-retangulo",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; aplicação de relação métrica em diagonal.`,
        text:`Uma tela retangular mede ${a} cm de largura e ${b} cm de altura. Qual é a medida de sua diagonal?`,
        ...alternativas(fmt(h),[fmt(a+b),fmt(a*b),fmt(h+1),fmt(Math.abs(a-b))],s)};
    }
    if(mod===3){
      const base=a,altura=b,escada=h;
      return {familiaId:"TRI_ESCADA",modeloId:"tri-escada",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; relação métrica em contexto cotidiano.`,
        text:`Uma escada encostada em uma parede forma um triângulo retângulo com ${base} m de afastamento da parede e ${altura} m de altura. Qual é o comprimento da escada?`,
        ...alternativas(fmt(escada),[fmt(base+altura),fmt(base*altura),fmt(escada+1),fmt(Math.abs(base-altura))],s)};
    }
    if(mod===4){
      const proj=pick([2,3,4,5],s+k),hip2=pick([8,9,10,12],s+k),cat=Math.sqrt(proj*hip2);
      return {familiaId:"TRI_CATETO_PROJECAO",modeloId:"tri-cateto-projecao",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; relação métrica cateto²=hipotenusa×projeção.`,
        text:`Em um triângulo retângulo, a hipotenusa mede ${hip2} e a projeção de um cateto sobre ela mede ${proj}. Usando c²=a·m, qual é aproximadamente a medida desse cateto?`,
        ...alternativas(fmt(cat),[fmt(proj+hip2),fmt(Math.sqrt(proj+hip2)),fmt(cat+1),fmt(Math.max(1,cat-1))],s)};
    }
    const m=pick([2,3,4],s+k),n=pick([5,6,8],s+k),alt=Math.sqrt(m*n);
    return {familiaId:"TRI_ALTURA_HIPOTENUSA",modeloId:"tri-altura-hipotenusa",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; relação métrica h²=m·n.`,
      text:`A altura relativa à hipotenusa divide-a em segmentos de medidas ${m} e ${n}. Usando h²=m·n, qual é aproximadamente a altura?`,
      ...alternativas(fmt(alt),[fmt(m+n),fmt(Math.abs(n-m)),fmt(alt+1),fmt(Math.max(1,alt-1))],s)};
  }
  if(descriptor==="D051_M"){
    const ang=pick([30,45,60],s+k),hip=10+(s%5)*2,seno=ang===30?.5:ang===45?Math.SQRT1_2:Math.sqrt(3)/2,op=hip*seno;
    return {modeloId:`trig-${mod}`,text:`Em um triângulo retângulo, a hipotenusa mede ${hip} cm e um ângulo agudo mede ${ang}°. Qual é aproximadamente o cateto oposto?`,
      ...alternativas(fmt(op),[fmt(hip-op),fmt(hip),fmt(op+2),fmt(Math.max(1,op-2))],s),visual:tri("adj.","?",hip)};
  }
  if(descriptor==="D057_M"){
    const a=5+s%9,b=3+(s+k)%7,p=2*(a+b);
    return {modeloId:`perimetro-${mod}`,text:`Um terreno retangular mede ${a} m por ${b} m. Quantos metros de cerca são necessários para contorná-lo?`,
      ...alternativas(p,[a*b,a+b,2*a+b,a+2*b],s)};
  }
  if(descriptor==="D058_M"){
    const a=6+s%8,b=4+(s+k)%7,A=a*b;
    return {modeloId:`area-${mod}`,text:`O piso retangular de uma sala mede ${a} m por ${b} m. Qual é sua área?`,
      ...alternativas(`${A} m²`,[`${2*(a+b)} m²`,`${a+b} m²`,`${A+a} m²`,`${A-b} m²`],s)};
  }
  if(descriptor==="D063_M"||descriptor==="D064_M"){
    const v=[12+s%8,18+(s+k)%8,10+(s+2*k)%8,22+(s+3*k)%8];
    if(descriptor==="D063_M"){
      const idx=v.indexOf(Math.max(...v)),labs=["A","B","C","D"];
      return {modeloId:`grafico-corresp-${mod}`,text:"Observe o gráfico. Qual categoria apresenta o maior valor?",
        ...alternativas(labs[idx],labs.filter(x=>x!==labs[idx]),s),visual:barras(v,labs,"Resultados")};
    }
    const soma=v.reduce((a,b)=>a+b,0);
    return {modeloId:`grafico-info-${mod}`,text:"O gráfico apresenta dados de quatro grupos. Qual é o total registrado?",
      ...alternativas(soma,[soma-10,soma+10,Math.max(...v),v[0]+v[1]],s),visual:barras(v,["A","B","C","D"],"Quantidade")};
  }
  if(descriptor==="D065_M"){
    const a=2+s%6,b=3+(s+k)%6,t=a+b;
    return {modeloId:`probabilidade-${mod}`,text:`Uma urna contém ${a} bolas vermelhas e ${b} azuis. Qual é a probabilidade de retirar uma vermelha?`,
      ...alternativas(`${a}/${t}`,[`${b}/${t}`,`${a}/${b}`,`${t}/${a}`,`1/${t}`],s)};
  }
  if(descriptor==="D071_M"){
    const m=pick([-3,-2,-1,1,2,3],s+k),b=-2+(s+k)%5;
    return {modeloId:`crescimento-${mod}`,text:"Observe o gráfico da função. Ela é:",
      ...alternativas(m>0?"crescente":"decrescente",[m>0?"decrescente":"crescente","constante","periódica","sem domínio"],s),
      visual:plano({retas:[{m,b}]})};
  }
  if(descriptor==="D074_M"){
    const base=pick([2,3,4,5],s+k);
    if(mod===0) return {familiaId:"EXP_RECONHECER_FORMA_ALGEBRICA",modeloId:"exp-reconhecer-forma",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; correspondência algébrica de função exponencial.`,
      text:`Qual expressão representa uma função exponencial de base ${base}?`,
      ...alternativas(`f(x)=${base}^x`,[`f(x)=${base}x`,`f(x)=x^${base}`,`f(x)=x+${base}`,`f(x)=${base}-x`],s)};
    if(mod===1){
      const cres=base>1;
      return {familiaId:"EXP_CRESCIMENTO_DECRESCIMENTO",modeloId:"exp-crescimento-decrescimento",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; interpretação do comportamento da função exponencial.`,
        text:`Considere f(x)=${base}^x. Como essa função se comporta quando x aumenta?`,
        ...alternativas(cres?"É crescente.":"É decrescente.",["É constante.","É linear.","É quadrática.","Não possui gráfico."],s)};
    }
    if(mod===2){
      const vals=[0,1,2,3].map(x=>[x,Math.pow(base,x)]);
      return {familiaId:"EXP_TABELA_ALGEBRA",modeloId:"exp-tabela-algebra",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; correspondência entre tabela e expressão exponencial.`,
        text:"Observe a tabela. Qual expressão representa os valores apresentados?",
        ...alternativas(`f(x)=${base}^x`,[`f(x)=${base}x`,`f(x)=x+${base}`,`f(x)=x^${base}`,`f(x)=${base}+x`],s),
        visual:tabela(["x","f(x)"],vals)};
    }
    if(mod===3){
      const y=Math.pow(base,2);
      return {familiaId:"EXP_VALOR_PONTUAL",modeloId:"exp-valor-pontual",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; leitura de valor em função exponencial.`,
        text:`Se f(x)=${base}^x, qual é o valor de f(2)?`,
        ...alternativas(y,[base*2,base+2,Math.pow(base,3),base],s)};
    }
    if(mod===4){
      return {familiaId:"EXP_CARACTERISTICA_GRAFICA",modeloId:"exp-caracteristica-grafica",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; reconhecimento de característica gráfica.`,
        text:`Qual característica é compatível com o gráfico de f(x)=${base}^x?`,
        ...alternativas("Passa pelo ponto (0, 1).",["Passa necessariamente por (0, 0).","É uma reta.","Tem valor máximo em x=0.","É periódica."],s)};
    }
    return {familiaId:"EXP_COMPARAR_REPRESENTACOES",modeloId:"exp-comparar-representacoes",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; distinção entre representações funcionais.`,
      text:`Entre as expressões abaixo, qual apresenta a variável no expoente?`,
      ...alternativas(`${base}^x`,[`${base}x`,`x^${base}`,`${base}+x`,`x-${base}`],s)};
  }
  if(descriptor==="D076_M"){
    const a=1+s%6,b=2+(s+k)%7;
    return {modeloId:`polinomio-${mod}`,text:`Quais são as raízes de P(x)=(x-${a})(x-${b})?`,
      ...alternativas(`${a} e ${b}`,[`${-a} e ${-b}`,`${a+b} e ${a*b}`,`0 e ${a+b}`,`${a} e ${-b}`],s)};
  }
  if(descriptor==="D078_M"||descriptor==="D145_M"){
    const m=pick([-3,-2,-1,1,2,3],s+k),b=-2+(s+k)%5,eq=`y=${m}x${b>=0?"+":""}${b}`;
    return {modeloId:`reta-grafico-${mod}`,text:descriptor==="D078_M"?"Observe o gráfico. Qual expressão representa a reta?":`Considere f(x)=${m}x${b>=0?"+":""}${b}. Qual afirmação está correta?`,
      ...(descriptor==="D078_M"?alternativas(eq,[`y=${b}x+${m}`,`y=${m+1}x${b>=0?"+":""}${b}`,`y=${m}x`,`y=x${b>=0?"+":""}${b}`],s):
      alternativas(m>0?"É uma reta crescente.":"É uma reta decrescente.",[m>0?"É uma reta decrescente.":"É uma reta crescente.","É uma parábola.","É exponencial.","É horizontal."],s)),
      visual:plano({retas:[{m,b}]})};
  }
  if(descriptor==="D080_M"){
    const base=pick([2,3,10],s+k);
    return {modeloId:`log-${mod}`,text:`A função f(x)=log${base}(x) é inversa de qual função?`,
      ...alternativas(`f(x)=${base}^x`,[`f(x)=${base}x`,`f(x)=x^${base}`,`f(x)=x+${base}`,"f(x)=1/x"],s)};
  }
  if(descriptor==="D082_M"){
    return {modeloId:`situacao-grafico-${mod}`,text:"A altura de uma bola lançada para cima aumenta, atinge um máximo e depois diminui. Qual gráfico representa melhor essa situação?",
      ...alternativas("Uma parábola com concavidade para baixo",["Uma reta crescente","Uma reta decrescente","Uma função constante","Uma parábola com concavidade para cima"],s)};
  }
  if(descriptor==="D085_M"){
    const m=pick([-5,-4,-3,-2,-1,1,2,3,4,5],s+k),b=-6+(s+2*k)%13;
    const eq=`y=${m}x${b>=0?"+":""}${b}`;
    if(mod===0){
      return {modeloId:`coef-angular-${mod}`,text:`Na equação ${eq}, qual é o coeficiente angular da reta?`,
        ...alternativas(m,[b,-m,m+b,1],s),visual:plano({retas:[{m,b}]})};
    }
    if(mod===1){
      return {modeloId:`coef-linear-${mod}`,text:`Na equação ${eq}, qual é o coeficiente linear, isto é, o valor em que a reta intercepta o eixo y?`,
        ...alternativas(b,[m,-b,m+b,0],s),visual:plano({retas:[{m,b}]})};
    }
    if(mod===2){
      const resposta=m>0?"A reta é crescente":"A reta é decrescente";
      return {modeloId:`sentido-reta-${mod}`,text:`Considere a reta ${eq}. O que o sinal do coeficiente angular indica sobre o comportamento da reta?`,
        ...alternativas(resposta,[m>0?"A reta é decrescente":"A reta é crescente","A reta é horizontal","A reta é vertical","A reta passa necessariamente pela origem"],s),visual:plano({retas:[{m,b}]})};
    }
    if(mod===3){
      const b2=b===0?3:b+2;
      return {modeloId:`paralelismo-${mod}`,text:`A reta r tem equação ${eq}. Qual das equações abaixo representa uma reta paralela a r?`,
        ...alternativas(`y=${m}x${b2>=0?"+":""}${b2}`,[`y=${-m}x${b2>=0?"+":""}${b2}`,`y=${b}x${m>=0?"+":""}${m}`,`y=${m+1}x${b>=0?"+":""}${b}`,`y=${b}`],s),visual:plano({retas:[{m,b},{m,b:b2}]})};
    }
    if(mod===4){
      const x1=1+(s+k)%4,x2=x1+2,y1=m*x1+b,y2=m*x2+b;
      return {modeloId:`taxa-variacao-${mod}`,text:`Uma reta passa pelos pontos (${x1}, ${y1}) e (${x2}, ${y2}). Qual é sua taxa de variação, isto é, seu coeficiente angular?`,
        ...alternativas(m,[m+1,m-1,y2-y1,x2-x1],s),visual:plano({pontos:[{x:x1,y:y1,label:"A"},{x:x2,y:y2,label:"B"}],retas:[{m,b}]})};
    }
    return {modeloId:`interpretacao-reta-${mod}`,text:`No gráfico da função ${eq}, a cada aumento de 1 unidade em x, de quanto varia o valor de y?`,
      ...alternativas(m,[b,-m,m+b,1],s),visual:plano({retas:[{m,b}]})};
  }
  if(descriptor==="D086_M"){
    const a=1+s%4,b=1+(s+k)%5,rows=[0,1,2,3].map(x=>[x,a*x+b]);
    return {modeloId:`tabela-funcao-${mod}`,text:"Observe a tabela. Qual função representa a relação entre x e y?",
      ...alternativas(`y=${a}x+${b}`,[`y=${b}x+${a}`,`y=${a+1}x+${b}`,`y=${a}x`,`y=x+${b}`],s),visual:tabela(["x","y"],rows)};
  }
  if(descriptor==="D087_M"){
    const r1=1+s%6,r2=2+(s+k)%7,S=r1+r2,P=r1*r2;
    if(mod===0) return {familiaId:"EQ2_RAIZES_FATORAVEIS",modeloId:"eq2-raizes-fatoraveis",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; resolução de equação quadrática fatorável.`,
      text:`Quais são as soluções de x²-${S}x+${P}=0?`,
      ...alternativas(`${r1} e ${r2}`,[`${-r1} e ${-r2}`,`${S} e ${P}`,`0 e ${S}`,`${r1} e ${-r2}`],s)};
    if(mod===1){
      const a=1,b=-(r1+r2),c=r1*r2,delta=b*b-4*a*c;
      return {familiaId:"EQ2_DISCRIMINANTE",modeloId:"eq2-discriminante",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; uso do discriminante.`,
        text:`Para a equação x²${b>=0?"+":""}${b}x+${c}=0, qual é o valor do discriminante Δ?`,
        ...alternativas(delta,[delta+4,Math.abs(b),c,Math.abs(delta-4)],s)};
    }
    if(mod===2){
      const lado=pick([6,8,10,12],s+k),area=lado*lado;
      return {familiaId:"EQ2_AREA_QUADRADO",modeloId:"eq2-area-quadrado",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; equação quadrática em problema geométrico.`,
        text:`A área de um terreno quadrado é ${area} m². Qual é a medida positiva do lado?`,
        ...alternativas(lado,[lado+2,Math.max(1,lado-2),area/2,area],s)};
    }
    if(mod===3){
      const x=pick([4,5,6,7],s+k),produto=x*(x+2);
      return {familiaId:"EQ2_PRODUTO_CONSECUTIVO",modeloId:"eq2-produto-consecutivo",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; modelagem por equação do 2º grau.`,
        text:`O produto de um número positivo por esse número acrescido de 2 é ${produto}. Qual é esse número?`,
        ...alternativas(x,[x+2,Math.max(1,x-2),produto/x,produto],s)};
    }
    if(mod===4){
      const soma=S,prod=P;
      return {familiaId:"EQ2_SOMA_PRODUTO_RAIZES",modeloId:"eq2-soma-produto",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; relações entre coeficientes e raízes.`,
        text:`Uma equação monômia x²-${soma}x+${prod}=0 possui duas raízes. Qual é a soma dessas raízes?`,
        ...alternativas(soma,[prod,-soma,r1-r2,r1*r2+soma],s)};
    }
    const a=1,bcoef=-S,ccoef=P;
    return {familiaId:"EQ2_IDENTIFICAR_COEFICIENTES",modeloId:"eq2-coeficientes",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; identificação de coeficientes da equação quadrática.`,
      text:`Na equação x²-${S}x+${P}=0, quais são os coeficientes a, b e c?`,
      ...alternativas(`${a}, ${bcoef}, ${ccoef}`,[`${a}, ${S}, ${P}`,`${S}, ${P}, ${a}`,`${a}, ${P}, ${bcoef}`,`${bcoef}, ${a}, ${ccoef}`],s)};
  }
  if(descriptor==="D088_M"){
    const ini=pick([50,100,200,500],s+k),f=pick([2,3],s+2*k),n=2+(s+k)%5,total=ini*Math.pow(f,n);
    if(mod===0) return {familiaId:"EXP_PROBLEMA_POPULACAO",modeloId:"exp-problema-populacao",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; função exponencial em crescimento populacional.`,
      text:`Uma população inicial de ${ini} unidades é multiplicada por ${f} a cada período. Qual será a quantidade após ${n} períodos?`,
      ...alternativas(total,[ini*f*n,ini+f*n,total/f,total+ini],s)};
    if(mod===1){
      const capital=pick([100,200,500,1000],s+k),taxa=pick([2,3],s+k),periodos=pick([2,3,4],s+k),mont=capital*Math.pow(taxa,periodos);
      return {familiaId:"EXP_PROBLEMA_FINANCEIRO",modeloId:"exp-problema-financeiro",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; crescimento multiplicativo em contexto financeiro simplificado.`,
        text:`Um valor inicial de R$ ${capital} é multiplicado por ${taxa} a cada etapa de um modelo. Após ${periodos} etapas, qual será o valor previsto?`,
        ...alternativas(mont,[capital*taxa*periodos,mont/taxa,mont+capital,capital+taxa*periodos],s)};
    }
    if(mod===2){
      const bact=pick([20,40,80,100],s+k),dobros=pick([3,4,5],s+k),resp=bact*Math.pow(2,dobros);
      return {familiaId:"EXP_PROBLEMA_DUPLICACAO",modeloId:"exp-problema-duplicacao",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; duplicação sucessiva.`,
        text:`Uma cultura inicia com ${bact} unidades e dobra a cada ciclo. Quantas unidades haverá após ${dobros} ciclos?`,
        ...alternativas(resp,[bact*2*dobros,resp/2,resp+bact,bact+2*dobros],s)};
    }
    if(mod===3){
      const inicial=pick([640,960,1280],s+k),metades=pick([2,3,4],s+k),resp=inicial/Math.pow(2,metades);
      return {familiaId:"EXP_DECAIMENTO_MEIA",modeloId:"exp-decaimento-meia",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; decaimento exponencial simplificado.`,
        text:`Uma quantidade inicial de ${inicial} unidades é reduzida à metade a cada período. Qual será a quantidade após ${metades} períodos?`,
        ...alternativas(resp,[inicial/2*metades,inicial-metades*2,resp*2,resp+metades],s)};
    }
    if(mod===4){
      const base=pick([2,3],s+k),x=pick([2,3,4],s+k),resp=Math.pow(base,x);
      return {familiaId:"EXP_MODELAGEM_VALOR",modeloId:"exp-modelagem-valor",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; uso direto de modelo exponencial.`,
        text:`Um fenômeno é modelado por Q(t)=${base}^t. Qual é o valor de Q(${x})?`,
        ...alternativas(resp,[base*x,base+x,Math.pow(x,base),resp+base],s)};
    }
    const inicial=pick([100,200,400],s+k),final=inicial*8;
    return {familiaId:"EXP_DETERMINAR_PERIODOS",modeloId:"exp-determinar-periodos",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; determinação do número de períodos em crescimento exponencial.`,
      text:`Uma quantidade dobra a cada período. Partindo de ${inicial}, após quantos períodos ela atingirá ${final}?`,
      ...alternativas(3,[2,4,5,8],s)};
  }
  if(descriptor==="D096_M"){
    const a1=2+s%8,r=2+(s+k)%6,n=5+(s+k)%6,an=a1+(n-1)*r;
    return {modeloId:`pa-${mod}`,text:`Em uma PA, a₁=${a1} e r=${r}. Qual é o ${n}º termo?`,
      ...alternativas(an,[a1+n*r,a1*r,an-r,an+r],s)};
  }
  if(descriptor==="D097_M"){
    // D097_M — famílias pedagógicas reais. Alterar números NÃO cria nova família.
    // As três primeiras famílias partem de tarefas presentes no material estruturado SEDU/RPE.
    const familia=k%7;

    if(familia===0){
      const sequencias=[
        {seq:[4,8,16,32,64],q:2},
        {seq:[3,9,27,81,243],q:3},
        {seq:[5,10,20,40,80],q:2},
        {seq:[2,6,18,54,162],q:3}
      ];
      const z=pick(sequencias,s+k);
      return {
        familiaId:"PG_RAZAO_SEQUENCIA",
        modeloId:"pg-razao-sequencia",
        fonteTipo:"MATERIAL_ESTRUTURADO",
        fonteReferencia:REFERENCIAS_BANCO.RPE_3SERIE_2TRI_2026,
        text:`A sequência (${z.seq.join(", ")}, ...) é uma progressão geométrica. Qual é a razão dessa PG?`,
        ...alternativas(z.q,[z.q+1,z.q-1,z.q*2,z.seq[1]-z.seq[0]],s)
      };
    }

    if(familia===1){
      const dados=[
        {a1:-3,q:-3,n:5},
        {a1:2,q:3,n:5},
        {a1:4,q:2,n:6},
        {a1:5,q:2,n:5}
      ];
      const z=pick(dados,s+k);
      const correta=z.a1*Math.pow(z.q,z.n-1);
      return {
        familiaId:"PG_TERMO_GERAL",
        modeloId:"pg-termo-geral",
        fonteTipo:"MATERIAL_ESTRUTURADO",
        fonteReferencia:REFERENCIAS_BANCO.RPE_3SERIE_2TRI_2026,
        text:`Uma PG tem primeiro termo ${z.a1} e razão ${z.q}. Qual é o ${z.n}º termo?`,
        ...alternativas(correta,[z.a1*Math.pow(z.q,z.n),z.a1*z.q*z.n,z.a1*Math.pow(z.q,z.n-2),z.a1+z.q*z.n],s)
      };
    }

    if(familia===2){
      const dados=[
        {a1:-5,q:-3,n:8},
        {a1:2,q:2,n:6},
        {a1:3,q:2,n:5},
        {a1:1,q:3,n:5}
      ];
      const z=pick(dados,s+k);
      const correta=z.q===1?z.a1*z.n:z.a1*(Math.pow(z.q,z.n)-1)/(z.q-1);
      return {
        familiaId:"PG_SOMA_FINITA",
        modeloId:"pg-soma-finita",
        fonteTipo:"MATERIAL_ESTRUTURADO",
        fonteReferencia:REFERENCIAS_BANCO.RPE_3SERIE_2TRI_2026,
        text:`Em uma PG, a₁=${z.a1} e q=${z.q}. Qual é a soma dos ${z.n} primeiros termos?`,
        ...alternativas(correta,[correta+z.a1,correta-z.a1,z.a1*Math.pow(z.q,z.n-1),z.a1*z.q*z.n],s)
      };
    }

    if(familia===3){
      const a1=pick([2,3,4,5],s+k),q=pick([2,3,4],s*2+k),a2=a1*q;
      const a3=a2*q;
      return {
        familiaId:"PG_IDENTIFICAR_TERMO_FALTANTE",
        modeloId:"pg-termo-faltante",
        fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; item equivalente produzido para diversificação pedagógica.`,
        text:`A sequência (${a1}, ${a2}, __, ${a3*q}, ...) é uma PG. Qual número completa corretamente a sequência?`,
        ...alternativas(a3,[a2+q,a2*q*q,a1+a2,a3+q],s)
      };
    }

    if(familia===4){
      const q=pick([2,3,4],s+k),a1=pick([1,2,3,5],s*3+k),a2=a1*q;
      const a3=a2*q;
      const correta=`${a1}, ${a2}, ${a3}`;
      return {
        familiaId:"PG_RECONHECER_SEQUENCIA",
        modeloId:"pg-reconhecer-sequencia",
        fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; item equivalente produzido para diversificação pedagógica.`,
        text:`Qual das sequências abaixo é uma progressão geométrica de razão ${q}?`,
        ...alternativas(correta,[`${a1}, ${a1+q}, ${a1+2*q}`,`${a1}, ${a2}, ${a3+q}`,`${a1}, ${a1*q+1}, ${(a1*q+1)*q}`,`${a1}, ${a1+q}, ${(a1+q)*q}`],s)
      };
    }

    if(familia===5){
      const inicial=pick([50,100,200,250],s+k),q=pick([2,3],s*2+k),periodos=pick([3,4,5],s*3+k);
      const correta=inicial*Math.pow(q,periodos);
      return {
        familiaId:"PG_CONTEXTO_CRESCIMENTO",
        modeloId:"pg-contexto-crescimento",
        fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; situação equivalente contextualizada.`,
        text:`Uma cultura de microrganismos começa com ${inicial} unidades e, a cada período, sua quantidade é multiplicada por ${q}. Mantido esse padrão, quantas unidades haverá após ${periodos} períodos?`,
        ...alternativas(correta,[inicial*q*periodos,inicial*Math.pow(q,periodos-1),inicial+q*periodos,inicial*Math.pow(q,periodos+1)],s)
      };
    }

    const a1=pick([2,3,4,5],s+k),q=pick([2,3],s*2+k),n=pick([4,5,6],s*3+k);
    const an=a1*Math.pow(q,n-1);
    return {
      familiaId:"PG_DETERMINAR_RAZAO_POR_TERMOS",
      modeloId:"pg-razao-por-termos",
      fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; item equivalente produzido para diversificação pedagógica.`,
      text:`Em uma PG, a₁=${a1} e a${n}=${an}. Sabendo que a razão é positiva e inteira, qual é o valor de q?`,
      ...alternativas(q,[q+1,Math.max(1,q-1),q*2,n],s)
    };
  }

  if(descriptor==="D111_M"){
    if(mod%3===0) return {modeloId:"planificacao-cubo",text:"Observe a planificação. Qual sólido é formado ao dobrá-la?",
      ...alternativas("Cubo",["Cilindro","Cone","Prisma triangular","Pirâmide"],s),visual:planCubo()};
    if(mod%3===1) return {modeloId:"reconhece-cilindro",text:"O sólido possui duas bases circulares paralelas e superfície lateral curva. Qual é esse sólido?",
      ...alternativas("Cilindro",["Cone","Cubo","Pirâmide","Prisma triangular"],s),visual:cilindro()};
    return {modeloId:"reconhece-cubo",text:"O sólido apresentado possui seis faces quadradas congruentes. Qual é seu nome?",
      ...alternativas("Cubo",["Prisma triangular","Cilindro","Cone","Pirâmide"],s),visual:cubo()};
  }
  if(descriptor==="D119_M"){
    const a=3+s%5,f=2+(s+k)%3,b=4+(s*2+k)%6,r=b*f;
    return {modeloId:`semelhanca-${mod}`,text:`Dois triângulos semelhantes têm lados correspondentes ${a} cm e ${a*f} cm. Se outro lado do menor mede ${b} cm, quanto mede o correspondente no maior?`,
      ...alternativas(r,[b+f,r+f,r-f,a*f],s)};
  }
  if(descriptor==="D124_M"){
    const m=1+s%4,x1=1+(s+k)%3,y1=2+(s*2+k)%6,b=y1-m*x1,eq=`y=${m}x${b>=0?"+":""}${b}`;
    if(mod===0) return {familiaId:"RETA_PONTO_INCLINACAO",modeloId:"reta-ponto-inclinacao",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; equação da reta a partir de ponto e inclinação.`,
      text:`Uma reta passa pelo ponto (${x1}, ${y1}) e tem coeficiente angular ${m}. Qual é sua equação?`,
      ...alternativas(eq,[`y=${x1}x+${y1}`,`y=${m+1}x${b>=0?"+":""}${b}`,`y=${m}x+${y1}`,`y=x${b>=0?"+":""}${b}`],s),
      visual:plano({pontos:[{x:x1,y:y1,label:"A"}],retas:[{m,b}]})};
    if(mod===1){
      const x2=x1+2,y2=m*x2+b;
      return {familiaId:"RETA_DOIS_PONTOS",modeloId:"reta-dois-pontos",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; equação da reta determinada por dois pontos.`,
        text:`A reta passa pelos pontos A(${x1}, ${y1}) e B(${x2}, ${y2}). Qual é sua equação?`,
        ...alternativas(eq,[`y=${m+1}x${b>=0?"+":""}${b}`,`y=${m}x+${y1}`,`y=${x1}x+${b}`,`y=x${b>=0?"+":""}${b}`],s),
        visual:plano({pontos:[{x:x1,y:y1,label:"A"},{x:x2,y:y2,label:"B"}],retas:[{m,b}]})};
    }
    if(mod===2){
      return {familiaId:"RETA_GRAFICO_EQUACAO",modeloId:"reta-grafico-equacao",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; correspondência gráfico-equação.`,
        text:"Observe o gráfico da reta. Qual equação a representa?",
        ...alternativas(eq,[`y=${-m}x${b>=0?"+":""}${b}`,`y=${m}x${-b>=0?"+":""}${-b}`,`y=${b}x+${m}`,`y=x+${m}`],s),
        visual:plano({retas:[{m,b}]})};
    }
    if(mod===3){
      return {familiaId:"RETA_INTERCEPTO_E_INCLINACAO",modeloId:"reta-intercepto-inclinacao",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; construção de equação por coeficientes.`,
        text:`Uma reta tem coeficiente angular ${m} e intercepta o eixo y em ${b}. Qual é sua equação?`,
        ...alternativas(eq,[`y=${b}x+${m}`,`y=${m+1}x${b>=0?"+":""}${b}`,`y=${m}x`,`y=x${b>=0?"+":""}${b}`],s)};
    }
    if(mod===4){
      const y0=b;
      return {familiaId:"RETA_RECONHECER_PONTO",modeloId:"reta-reconhecer-ponto",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; verificação de ponto pertencente à reta.`,
        text:`Qual ponto pertence à reta ${eq}?`,
        ...alternativas(`(0, ${y0})`,[`(0, ${y0+1})`,`(1, ${b})`,`(${x1}, ${y1+1})`,`(2, ${b})`],s)};
    }
    const xZero=-b/m;
    return {familiaId:"RETA_INTERSECAO_EIXO_X",modeloId:"reta-intersecao-eixo-x",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; interpretação da equação da reta.`,
      text:`Em qual valor de x a reta ${eq} intercepta o eixo x?`,
      ...alternativas(fmt(xZero),[fmt(xZero+1),fmt(xZero-1),fmt(b),fmt(m)],s)};
  }
  if(descriptor==="D125_M"){
    const V=6+2*(s%4),A=V+3+(k%5),F=2-V+A;
    if(mod===0) return {familiaId:"EULER_DETERMINAR_FACES",modeloId:"euler-faces",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; relação de Euler em poliedros.`,
      text:`Um poliedro possui ${V} vértices e ${A} arestas. Pela relação de Euler V - A + F = 2, quantas faces possui?`,
      ...alternativas(F,[F-1,F+1,V,A],s)};
    if(mod===1){
      const faces=F,arestas=A,verts=2+arestas-faces;
      return {familiaId:"EULER_DETERMINAR_VERTICES",modeloId:"euler-vertices",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; uso inverso da relação de Euler.`,
        text:`Um poliedro possui ${faces} faces e ${arestas} arestas. Quantos vértices ele possui?`,
        ...alternativas(verts,[verts-1,verts+1,faces,arestas],s)};
    }
    if(mod===2){
      const faces=F,verts=V,arestas=verts+faces-2;
      return {familiaId:"EULER_DETERMINAR_ARESTAS",modeloId:"euler-arestas",fonteTipo:"EQUIVALENTE",
        fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; determinação de arestas pela relação de Euler.`,
        text:`Um poliedro possui ${verts} vértices e ${faces} faces. Quantas arestas possui?`,
        ...alternativas(arestas,[arestas-1,arestas+1,verts,faces],s)};
    }
    if(mod===3) return {familiaId:"POLIEDRO_CUBO_ELEMENTOS",modeloId:"poliedro-cubo-elementos",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; reconhecimento de elementos de poliedro.`,
      text:"Quantos vértices, faces e arestas possui um cubo, respectivamente?",
      ...alternativas("8, 6 e 12",["6, 8 e 12","8, 12 e 6","6, 12 e 8","12, 8 e 6"],s),visual:cubo()};
    if(mod===4) return {familiaId:"EULER_VERIFICAR_RELACAO",modeloId:"euler-verificar-relacao",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; verificação da relação de Euler.`,
      text:"Qual igualdade expressa corretamente a relação de Euler para poliedros convexos?",
      ...alternativas("V - A + F = 2",["V + A + F = 2","V - F + A = 0","V + F = A","A - V - F = 2"],s)};
    return {familiaId:"POLIEDRO_COMPARAR_ELEMENTOS",modeloId:"poliedro-comparar-elementos",fonteTipo:"EQUIVALENTE",
      fonteReferencia:`${REFERENCIAS_BANCO.MATRIZES_2026}; interpretação de vértices, faces e arestas.`,
      text:`Se um poliedro possui ${V} vértices e ${F} faces, qual número de arestas é compatível com a relação de Euler?`,
      ...alternativas(A,[A-2,A+2,V+F,V*F],s)};
  }
  if(descriptor==="D126_M"){
    const alvo=pick(["seno","cosseno"],s+k);
    return {modeloId:`trig-grafico-${mod}`,text:`Uma função periódica oscila regularmente entre -1 e 1. Qual função pode apresentar esse comportamento?`,
      ...alternativas(alvo==="seno"?"f(x)=sen(x)":"f(x)=cos(x)",["f(x)=2^x","f(x)=x²","f(x)=3x+1","f(x)=log(x)"],s)};
  }
  if(descriptor==="D127_M"||descriptor==="D154_M"){
    const x=1+s%4,y=1+(s+k)%5,m1=1,b1=y-x,m2=-1,b2=y+x;
    return {modeloId:`sistema-grafico-${mod}`,text:descriptor==="D127_M"?`Duas retas se intersectam em (${x}, ${y}). Esse ponto representa:`:"Observe as duas retas do sistema. O ponto de interseção representa:",
      ...alternativas("a solução que satisfaz simultaneamente as duas equações",["o coeficiente angular das duas retas","o valor máximo do sistema","o produto das equações","um ponto que satisfaz apenas uma equação"],s),
      visual:plano({pontos:[{x,y,label:"P"}],retas:[{m:m1,b:b1},{m:m2,b:b2}]})};
  }
  if(descriptor==="D129_M"){
    if(mod%3===0){
      const l=2+s%7,V=l**3;
      return {modeloId:"volume-cubo",text:`Um reservatório cúbico possui aresta interna de ${l} m. Qual é seu volume?`,
        ...alternativas(`${V} m³`,[`${l*l} m³`,`${6*l*l} m³`,`${3*l} m³`,`${V+l} m³`],s),visual:cubo()};
    }
    if(mod%3===1){
      const r=2+s%5,h=4+(s+k)%7,V=3.14*r*r*h;
      return {modeloId:"volume-cilindro",text:`Um cilindro possui raio ${r} cm e altura ${h} cm. Use π≈3,14. Qual é aproximadamente o volume?`,
        ...alternativas(`${fmt(V)} cm³`,[`${fmt(3.14*r*h)} cm³`,`${fmt(2*3.14*r*h)} cm³`,`${fmt(3.14*r*r)} cm³`,`${fmt(V/2)} cm³`],s),visual:cilindro()};
    }
    const l=3+s%6,A=6*l*l;
    return {modeloId:"area-cubo",text:`Um cubo possui aresta de ${l} cm. Qual é sua área total?`,
      ...alternativas(`${A} cm²`,[`${l**3} cm²`,`${l*l} cm²`,`${4*l*l} cm²`,`${6*l} cm²`],s),visual:cubo()};
  }
  if(descriptor==="D132_M"){
    const taxa=2+s%8,fixa=5+(s+k)%15,x=3+(s*2+k)%8,total=taxa*x+fixa;
    return {modeloId:`funcao1-${mod}`,text:`Um serviço cobra taxa fixa de R$ ${fixa} mais R$ ${taxa} por unidade. Qual o valor para ${x} unidades?`,
      ...alternativas(total,[taxa*x,fixa+x,total+taxa,total-taxa],s)};
  }
  if(descriptor==="D133_M"){
    const h=1+s%5,kmax=4+(s+k)%8;
    return {modeloId:`maximo-${mod}`,text:`Uma parábola com concavidade para baixo tem vértice em (${h}, ${kmax}). Qual é o valor máximo da função?`,
      ...alternativas(kmax,[h,-kmax,h+kmax,0],s)};
  }
  if(descriptor==="D155_M"){
    const h=-3+(s+k)%7,kk=-3+(s*2+k)%7,r=2+(s+k)%5;
    const eq=`(x${h>=0?"-":"+"}${Math.abs(h)})²+(y${kk>=0?"-":"+"}${Math.abs(kk)})²=${r*r}`;
    return {modeloId:`circunferencia-${mod}`,text:`Uma circunferência tem centro C(${h}, ${kk}) e raio ${r}. Qual é sua equação?`,
      ...alternativas(eq,[`(x-${r})²+(y-${r})²=${h*h+kk*kk}`,`x²+y²=${r}`,`(x${h>=0?"+":"-"}${Math.abs(h)})²+(y${kk>=0?"+":"-"}${Math.abs(kk)})²=${r*r}`,`x+y=${r*r}`],s),
      visual:plano({pontos:[{x:h,y:kk,label:"C"}]})};
  }
  if(descriptor==="D157_M"){
    const a=1+s%4,b=2+(s+k)%5,c=2+(s*2+k)%5,d=1+(s*3+k)%4;
    const det=a*d-b*c;
    return {modeloId:`matriz-det-${mod}`,text:`Considere a matriz A = [[${a}, ${b}], [${c}, ${d}]]. Qual é o determinante de A?`,
      ...alternativas(det,[a*d+b*c,a+b+c+d,b*c-a*d,a*d],s),visual:tabela(["","C1","C2"],[["L1",a,b],["L2",c,d]])};
  }

  throw new Error(`Descritor ${descriptor} ainda não possui gerador configurado.`);
}

function assinatura(q){
  return hash([
    q.descriptor||"",
    q.level||"",
    norm(q.text),
    (q.options||[]).map(norm).sort().join("|"),
    norm(q.visual?.svg||q.visual||"")
  ].join("|||"));
}
function questaoValida(q){
  if(!q||!String(q.text||"").trim()) return false;
  if(!Array.isArray(q.options)||q.options.length<4) return false;
  if(new Set(q.options.map(norm)).size!==q.options.length) return false;
  return Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.options.length;
}
function lerHist(){
  try{
    const x=JSON.parse(localStorage.getItem(HIST_KEY)||"{}");
    return {assinaturas:Array.isArray(x.assinaturas)?x.assinaturas:[],modelos:Array.isArray(x.modelos)?x.modelos:[]};
  }catch(e){ return {assinaturas:[],modelos:[]}; }
}
function salvarHist(h){
  try{
    localStorage.setItem(HIST_KEY,JSON.stringify({
      assinaturas:[...new Set(h.assinaturas||[])].slice(-12000),
      modelos:[...new Set(h.modelos||[])].slice(-12000),
      atualizadoEm:new Date().toISOString()
    }));
  }catch(e){}
}
function rodada(){
  try{
    const n=Number(localStorage.getItem(ROUND_KEY)||0)+1;
    localStorage.setItem(ROUND_KEY,String(n));
    return n;
  }catch(e){ return Math.floor(Date.now()/1000); }
}
function filaDescritores(validos,cfg,qtd){
  const pesos=Object.fromEntries(validos.map(d=>[d,clamp(Number(cfg[d]?.peso||1),1,4)]));
  const cont=Object.fromEntries(validos.map(d=>[d,0]));
  const fila=[];
  for(const d of validos){
    if(fila.length>=qtd) break;
    fila.push(d); cont[d]++;
  }
  while(fila.length<qtd){
    const ultimo=fila[fila.length-1];
    const cands=validos.map(d=>({d,idx:cont[d]/pesos[d],c:cont[d]}))
      .sort((a,b)=>a.idx-b.idx||a.c-b.c||validos.indexOf(a.d)-validos.indexOf(b.d));
    const d=(cands.find(x=>x.d!==ultimo)||cands[0]).d;
    fila.push(d); cont[d]++;
  }
  return {fila,pesos};
}
function niveisDistrib(dis,qtd){
  const v={
    abb:Number(dis?.abb??40), basico:Number(dis?.basico??35),
    proficiente:Number(dis?.proficiente??25), avancado:Number(dis?.avancado??0)
  };
  const t=v.abb+v.basico+v.proficiente+v.avancado||100;
  const metas={
    "ABAIXO DO BÁSICO":Math.round(qtd*v.abb/t),
    "BÁSICO":Math.round(qtd*v.basico/t),
    "PROFICIENTE":Math.round(qtd*v.proficiente/t),
    "AVANÇADO":Math.round(qtd*v.avancado/t)
  };
  let soma=Object.values(metas).reduce((a,b)=>a+b,0);
  while(soma<qtd){ metas["ABAIXO DO BÁSICO"]++; soma++; }
  while(soma>qtd){
    for(const n of ["AVANÇADO","PROFICIENTE","BÁSICO","ABAIXO DO BÁSICO"]){
      if(metas[n]>0&&soma>qtd){ metas[n]--; soma--; }
    }
  }
  const out=[],ordem=["ABAIXO DO BÁSICO","BÁSICO","PROFICIENTE","AVANÇADO"];
  while(out.length<qtd){
    for(const n of ordem){
      if(metas[n]>0){ out.push(n); metas[n]--; }
      if(out.length>=qtd) break;
    }
  }
  return out;
}

function letraOpcao(i){ return i>=0 && i<26 ? String.fromCharCode(65+i) : "?"; }

function solucaoOrientada(descriptor,q){
  const correta=Number(q?.correct);
  const resposta=Array.isArray(q?.options) && correta>=0 ? q.options[correta] : "";
  const base=`Gabarito: alternativa ${letraOpcao(correta)}${resposta!==""?` — ${resposta}`:""}.`;
  const guia={
    "D009_M":"Localize o valor racional na reta numérica, comparando sua posição com os números de referência.",
    "D013_M":"Converta e compare as representações do número racional (fração, decimal ou porcentagem) até identificar equivalência.",
    "D033_M":"Aproxime o número irracional por valores decimais conhecidos e localize-o entre dois números consecutivos na reta.",
    "D038_M":"Transforme a porcentagem em fração ou decimal e multiplique pelo valor de referência.",
    "D039_M":"Identifique as grandezas, estabeleça a razão de proporcionalidade e aplique a relação correspondente.",
    "D042_M":"Separe as etapas independentes da escolha e multiplique a quantidade de possibilidades de cada etapa.",
    "D043_M":"Leia primeiro a coordenada x no eixo horizontal e depois a coordenada y no eixo vertical.",
    "D049_M":"Use as relações métricas do triângulo retângulo, especialmente o Teorema de Pitágoras quando houver dois lados conhecidos.",
    "D051_M":"Identifique cateto oposto, cateto adjacente e hipotenusa; depois aplique seno, cosseno ou tangente conforme os dados.",
    "D057_M":"Some os comprimentos de todos os lados da figura; em retângulos, use P=2(a+b).",
    "D058_M":"Identifique a figura e aplique sua fórmula de área; em retângulos, A=base×altura.",
    "D063_M":"Compare os dados da tabela ou gráfico e identifique a representação que conserva exatamente as mesmas informações.",
    "D064_M":"Leia os valores apresentados no gráfico ou tabela e execute apenas a operação pedida pelo problema.",
    "D065_M":"Calcule a razão entre casos favoráveis e total de casos possíveis.",
    "D071_M":"Observe onde o gráfico cresce, decresce e cruza o eixo x para identificar comportamento e zeros.",
    "D074_M":"Relacione a expressão exponencial ao comportamento do gráfico, observando base, crescimento/decrescimento e interceptos.",
    "D076_M":"Iguale cada fator a zero; as soluções obtidas são as raízes do polinômio.",
    "D078_M":"Compare coeficiente angular, coeficiente linear e inclinação do gráfico da função do 1º grau.",
    "D080_M":"Use a relação de inversão entre função logarítmica e exponencial e observe domínio e comportamento do gráfico.",
    "D082_M":"Traduza a situação descrita em comportamento gráfico: crescimento, decrescimento, máximo, mínimo ou constância.",
    "D085_M":"Na forma y=mx+b, m é o coeficiente angular (taxa de variação) e b é o coeficiente linear (interseção com o eixo y). Para dois pontos, m=(y₂−y₁)/(x₂−x₁).",
    "D086_M":"Calcule a variação de y quando x aumenta uma unidade e use um par da tabela para determinar a expressão algébrica.",
    "D087_M":"Organize a equação do 2º grau e resolva por fatoração ou pela fórmula de Bhaskara.",
    "D088_M":"Modele a situação por uma função exponencial, identificando valor inicial, fator de multiplicação e número de períodos.",
    "D096_M":"Em uma PA, use a razão constante e as relações an=a1+(n−1)r ou a soma dos termos quando necessário.",
    "D097_M":"Em uma PG, determine a razão q e use an=a1·q^(n−1), ou avance termo a termo quando a sequência for curta.",
    "D111_M":"Compare faces, bases, superfícies curvas e disposição das partes para relacionar o sólido à planificação ou vista correta.",
    "D119_M":"Verifique a proporcionalidade entre lados correspondentes e a igualdade dos ângulos para reconhecer semelhança.",
    "D124_M":"Calcule a inclinação m e depois use y=mx+b ou a forma ponto-inclinação para determinar a equação da reta.",
    "D125_M":"Use a relação de Euler V−A+F=2 para poliedros convexos, identificando corretamente vértices, arestas e faces.",
    "D126_M":"Reconheça período, amplitude, zeros e pontos característicos para distinguir os gráficos trigonométricos.",
    "D127_M":"A solução do sistema corresponde ao ponto de interseção das retas; resolva o sistema ou leia esse ponto no gráfico.",
    "D129_M":"Identifique a base e as dimensões do sólido. Para volume de prismas/cilindros use V=Ab·h; para área total, some as áreas de todas as faces/superfícies.",
    "D132_M":"Modele a situação por f(x)=ax+b, substitua o valor conhecido e interprete o resultado no contexto.",
    "D133_M":"Identifique o vértice da parábola; o valor máximo ou mínimo ocorre em xv=−b/(2a) e yv=f(xv).",
    "D145_M":"Na função y=ax+b, o sinal e valor de a determinam a inclinação e b indica onde a reta cruza o eixo y.",
    "D154_M":"Relacione cada equação do sistema a uma reta e interprete a solução como o ponto de interseção.",
    "D155_M":"Use a forma (x−a)²+(y−b)²=r², em que (a,b) é o centro e r é o raio.",
    "D157_M":"Organize os coeficientes na matriz/sistema, aplique operações algébricas equivalentes e interprete a solução encontrada."
  };
  return `${guia[descriptor]||"Resolva a situação usando a habilidade indicada pelo descritor, conferindo os dados e a operação necessária."} ${base}`;
}

function preparar(descriptor,level,g,peso,index,round){
  const visual=typeof g.visual==="string"?{svg:g.visual}:g.visual?.svg?g.visual:null;
  const m=meta(descriptor,level,HABILIDADES_PAEBES[descriptor]||"");
  return {
    id:`${descriptor}-${index+1}-${round}-${Date.now().toString(36)}-${hash(g.text+index)}`,
    questaoId:`Q-${descriptor}-${hash(g.text+"|"+(g.modeloId||""))}`,
    descriptor,
    habilidade:HABILIDADES_PAEBES[descriptor]||"",
    expectativa:m.expectativa,
    tarefa:m.tarefa,
    parteHabilidade:m.tarefa,
    level,
    text:String(g.text||"").trim(),
    options:(g.options||[]).map(String),
    correct:Number(g.correct),
    visual,
    pesoDescritor:peso,
    baseXP:Math.round((XP_NIVEL[level]||120)*peso),
    modeloId:g.modeloId||null,
    familiaId:g.familiaId||g.modeloId||`${descriptor}-familia-generica`,
    nucleo:m.nucleo,
    prioridadeAMA:m.prioridadeAMA,
    contexto:m.contexto,
    recurso:visual?"visual":"texto",
    origem:g.fonteTipo ? (FONTES_BANCO[g.fonteTipo]?.rotulo||g.fonteTipo) : m.origem,
    origemTipo:g.fonteTipo||"EQUIVALENTE",
    fonteReferencia:g.fonteReferencia||"Matrizes de Referência AMA/PAEBES 2026 — item equivalente/alinhado; não reproduzido como item oficial",
    statusBanco:g.statusBanco||"aprovado",
    solucao:String(g.solucao||solucaoOrientada(descriptor,{options:(g.options||[]).map(String),correct:Number(g.correct)})),
    versaoBanco:"coliseu-3tri-2026-v6.2"
  };
}

export function habilidadeDoDescritor(descritor){
  return HABILIDADES_PAEBES[descritor]||"";
}

export function gerarQuestaoDescritor(descritor,nivel="BÁSICO",seed=Date.now()){
  if(!HABILIDADES_PAEBES[descritor]) throw new Error("Descritor não pertence à matriz configurada.");
  const g=gerar(descritor,nivel,seed,Math.abs(Number(seed)||0));
  const q=preparar(descritor,nivel,g,1,0,rodada());
  if(!questaoValida(q)) throw new Error("Questão especial inválida.");
  return q;
}

export function gerarQuestoesArena({
  quantidade=15,
  descritores=[],
  configuracaoDescritores={},
  distribuicaoNiveis={abb:45,basico:35,proficiente:17,avancado:3}
}={}){
  quantidade=Math.max(5,Math.floor(Number(quantidade)||15));

  const validos=[...new Set(descritores.filter(d=>HABILIDADES_PAEBES[d]))];
  if(!validos.length) throw new Error("Selecione pelo menos um descritor.");

  const {fila,pesos}=filaDescritores(validos,configuracaoDescritores,quantidade);
  const nivs=niveisDistrib(distribuicaoNiveis,quantidade);
  const round=rodada(),seedArena=round*10007+(Date.now()%1000003);

  const hist=lerHist();
  const histA=new Set(hist.assinaturas),histM=new Set(hist.modelos);
  const usadasA=new Set(),usadasTexto=new Set(),usadasModelo=new Set(),usadasFamilia=new Set();
  const novasA=[],novasM=[],questoes=[],uso={};

  for(let i=0;i<quantidade;i++){
    const d=fila[i],cfg=configuracaoDescritores[d]||{};
    const level=cfg.nivel&&cfg.nivel!=="MISTO"?cfg.nivel:(nivs[i]||"BÁSICO");
    const chave=`${d}|${level}`,base=Number(uso[chave]||0);
    let escolhida=null;

    // 1ª fase: tenta inédita também no histórico.
    for(let tentativa=0;tentativa<500;tentativa++){
      const seed=seedArena+(i+1)*7919+validos.indexOf(d)*104729+tentativa*15485863;
      const variante=base+round+tentativa+i*7;
      let g;
      try{ g=gerar(d,level,seed,variante); }catch(e){ continue; }
      const q=preparar(d,level,g,pesos[d],i,round);
      if(!questaoValida(q)) continue;
      const a=assinatura(q),txt=norm(q.text),mk=`${d}|${q.familiaId||q.modeloId||""}`;
      if(usadasA.has(a)||usadasTexto.has(txt)) continue;
      if(histA.has(a)||histM.has(mk)||usadasModelo.has(mk)||usadasFamilia.has(`${d}|${q.familiaId||q.modeloId||""}`)) continue;
      escolhida=q; usadasA.add(a); usadasTexto.add(txt); usadasModelo.add(mk); usadasFamilia.add(`${d}|${q.familiaId||q.modeloId||""}`);
      novasA.push(a); if(q.modeloId) novasM.push(mk); break;
    }

    // 2ª fase: se histórico estiver esgotado, pode reutilizar modelo antigo,
    // mas jamais repete questão/texto dentro da Arena atual.
    if(!escolhida){
      for(let tentativa=500;tentativa<2500;tentativa++){
        const seed=seedArena+i*99991+tentativa*32452843+Date.now();
        let g;
        try{ g=gerar(d,level,seed,base+tentativa+17+i*13); }catch(e){ continue; }
        const q=preparar(d,level,g,pesos[d],i,round);
        if(!questaoValida(q)) continue;
        const a=assinatura(q),txt=norm(q.text),mk=`${d}|${q.familiaId||q.modeloId||""}`;
        if(usadasA.has(a)||usadasTexto.has(txt)||usadasFamilia.has(`${d}|${q.familiaId||q.modeloId||""}`)) continue;
        escolhida=q; usadasA.add(a); usadasTexto.add(txt); usadasFamilia.add(`${d}|${q.familiaId||q.modeloId||""}`);
        novasA.push(a); if(q.modeloId) novasM.push(mk); break;
      }
    }

    // 3ª fase — contingência pedagógica.
    // Se os modelos anteriores tiverem sido esgotados no histórico, o sistema
    // continua tentando novas variações autorais alinhadas ao MESMO descritor e nível.
    // O histórico entre Arenas deixa de bloquear a criação; a proteção de duplicata
    // permanece dentro da Arena atual.
    if(!escolhida){
      for(let tentativa=2500;tentativa<20000;tentativa++){
        const seed=seedArena+(i+11)*2147483+tentativa*49979687+(Date.now()%100000);
        let g;
        try{
          g=gerar(d,level,seed,base+tentativa+round*31+i*101);
        }catch(e){
          continue;
        }
        const q=preparar(d,level,g,pesos[d],i,round);
        if(!questaoValida(q)) continue;
        const a=assinatura(q),txt=norm(q.text),mk=`${d}|${q.familiaId||q.modeloId||""}`;
        if(usadasA.has(a)||usadasTexto.has(txt)) continue;
        escolhida=q;
        usadasA.add(a);usadasTexto.add(txt);usadasModelo.add(mk);usadasFamilia.add(`${d}|${q.familiaId||q.modeloId||""}`);
        novasA.push(a);if(q.modeloId)novasM.push(mk);
        break;
      }
    }

    if(!escolhida){
      throw new Error(`Falha interna de validação do banco para ${d}. A Arena não foi reduzida; revise a estrutura deste descritor.`);
    }
    uso[chave]=base+1;
    questoes.push(escolhida);
  }

  if(questoes.length!==quantidade) throw new Error("A quantidade final de questões não corresponde à configuração da Arena.");

  salvarHist({
    assinaturas:[...hist.assinaturas,...novasA],
    modelos:[...hist.modelos,...novasM]
  });

  return questoes;
}

export function descritoresSemBanco(descritores=[]){
  return descritores.filter(d=>!HABILIDADES_PAEBES[d]);
}

console.log("🏛️ Banco Coliseu v6.2 carregado — Arena competitiva, 14 descritores AMA, progressão ABB→Básico→Proficiente e Avançado reduzido, diversidade por família e fontes rastreáveis.");
