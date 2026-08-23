// ======================================================
// ARENA MATEMÁTICA — BANCO GERADOR FORTALECIDO
// PAEBES 2025 — 3ª SÉRIE
// Questões autorais, parametrizadas e alinhadas à habilidade oficial.
// Variedade de modelos + dificuldade real por nível + visuais em SVG.
// ======================================================

export const HABILIDADES_PAEBES = {
  "D009_M": "Corresponder pontos da reta numérica a números racionais.",
  "D033_M": "Identificar a localização de números irracionais na reta numérica.",
  "D038_M": "Utilizar porcentagem na resolução de problemas.",
  "D039_M": "Utilizar proporcionalidade entre duas grandezas na resolução de problema.",
  "D042_M": "Utilizar o princípio multiplicativo de contagem na resolução de problema.",
  "D043_M": "Identificar a localização de pontos no plano cartesiano.",
  "D049_M": "Utilizar relações métricas em um triângulo retângulo na resolução de problemas.",
  "D051_M": "Resolver problema que envolva razões trigonométricas no triângulo retângulo (seno, cosseno, tangente).",
  "D057_M": "Utilizar o perímetro de uma figura bidimensional na resolução de problema.",
  "D058_M": "Utilizar área de figuras bidimensionais na resolução de problema.",
  "D063_M": "Corresponder listas e/ou tabelas simples aos gráficos que as representam.",
  "D064_M": "Utilizar informações apresentadas em tabelas ou gráficos na resolução de problemas.",
  "D065_M": "Resolver problema envolvendo noções de probabilidade.",
  "D071_M": "Analisar crescimento/decrescimento, zeros de funções reais apresentadas em gráficos.",
  "D074_M": "Corresponder as representações algébrica e gráfica de uma função exponencial.",
  "D076_M": "Corresponder um polinômio fatorado por meio de polinômios de 1º grau às suas raízes.",
  "D078_M": "Corresponder uma função polinomial do 1º grau a seu gráfico.",
  "D080_M": "Identificar a representação algébrica e/ou gráfica de uma função logarítmica, reconhecendo-a como inversa da função exponencial.",
  "D082_M": "Identificar o gráfico que representa uma situação descrita em um texto.",
  "D085_M": "Interpretar geometricamente os coeficientes da equação de uma reta.",
  "D086_M": "Reconhecer expressão algébrica que representa uma função a partir de uma tabela.",
  "D087_M": "Resolver problema envolvendo equação do 2º grau.",
  "D088_M": "Utilizar função exponencial na resolução de problemas.",
  "D096_M": "Utilizar propriedades de progressões aritméticas na resolução de problemas.",
  "D097_M": "Utilizar propriedades de progressões geométricas na resolução de problemas.",
  "D111_M": "Relacionar diferentes poliedros ou corpos redondos com suas planificações ou vistas.",
  "D119_M": "Identificar triângulos semelhantes mediante o reconhecimento de relações de proporcionalidade.",
  "D124_M": "Identificar a equação de uma reta apresentada a partir de dois pontos dados ou de um ponto e sua inclinação.",
  "D125_M": "Identificar a relação entre o número de vértices, faces e/ou arestas de poliedros expressa em um problema.",
  "D126_M": "Identificar gráficos de funções trigonométricas (seno, cosseno, tangente) reconhecendo suas propriedades.",
  "D127_M": "Relacionar a determinação do ponto de intersecção de duas ou mais retas com a resolução de um sistema de equações com duas incógnitas.",
  "D129_M": "Resolver problema envolvendo a área total e/ou volume de um sólido.",
  "D132_M": "Resolver problema envolvendo uma função do 1º grau.",
  "D133_M": "Resolver problemas que envolvam os pontos de máximo ou de mínimo de uma função do 2º grau.",
  "D145_M": "Reconhecer o gráfico de uma função polinomial de primeiro grau por meio de seus coeficientes."
};

export const DESCRITORES_COM_BANCO = Object.keys(HABILIDADES_PAEBES);
export const NIVEIS = ["ABAIXO DO BÁSICO","BÁSICO","PROFICIENTE","AVANÇADO"];

const XP_NIVEL = {
  "ABAIXO DO BÁSICO":100,
  "BÁSICO":120,
  "PROFICIENTE":180,
  "AVANÇADO":240
};

const NIVEL_IDX = {
  "ABAIXO DO BÁSICO":0,
  "BÁSICO":1,
  "PROFICIENTE":2,
  "AVANÇADO":3
};

function nidx(level){ return NIVEL_IDX[level] ?? 1; }
function pick(arr, seed=0){ return arr[Math.abs(seed)%arr.length]; }
function clamp(n,a,b){ return Math.max(a,Math.min(b,n)); }
function fmt(n){
  if(Number.isInteger(n)) return String(n);
  return String(Math.round(n*100)/100).replace(".",",");
}
function rot(arr, s=0){
  const n=((s%arr.length)+arr.length)%arr.length;
  return [...arr.slice(n),...arr.slice(0,n)];
}
function alternativas(correta, distratores, seed=0){
  const vals=[String(correta),...distratores.map(String)];
  const unicos=[...new Set(vals)];
  const extras=["Nenhuma das alternativas","Não é possível determinar","0","1","2","3","4","5","6","8","10","12"];
  for(const e of extras) if(unicos.length<5 && !unicos.includes(e)) unicos.push(e);
  const arr=rot(unicos.slice(0,5),seed);
  return {options:arr,correct:arr.indexOf(String(correta))};
}

function svg(conteudo,label="Representação matemática"){
  return `<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <rect width="520" height="280" rx="18" fill="#07182d"/>
  ${conteudo}</svg>`;
}

function planoCartesiano({pontos=[],reta=null,parabola=null,expo=null}={}){
  let grid="";
  for(let i=-5;i<=5;i++){
    const x=260+i*42, y=140-i*22;
    grid+=`<line x1="${x}" y1="20" x2="${x}" y2="255" stroke="#12304d" stroke-width="1"/>`;
    grid+=`<line x1="35" y1="${y}" x2="485" y2="${y}" stroke="#12304d" stroke-width="1"/>`;
  }
  let marks="";
  for(let i=-5;i<=5;i++){
    const x=260+i*42, y=140-i*22;
    marks+=`<text x="${x}" y="158" fill="#9db5d1" font-size="10" text-anchor="middle">${i}</text>`;
    if(i!==0) marks+=`<text x="250" y="${y+4}" fill="#9db5d1" font-size="10" text-anchor="end">${i}</text>`;
  }
  let curve="";
  if(reta){
    const pts=[];
    for(let x=-5;x<=5;x+=0.25){
      const y=reta.m*x+reta.b;
      pts.push(`${260+x*42},${140-y*22}`);
    }
    curve+=`<polyline points="${pts.join(" ")}" fill="none" stroke="#ff6fab" stroke-width="4"/>`;
  }
  if(parabola){
    const pts=[];
    for(let x=-5;x<=5;x+=0.12){
      const y=parabola.a*(x-parabola.h)*(x-parabola.h)+parabola.k;
      pts.push(`${260+x*42},${140-y*22}`);
    }
    curve+=`<polyline points="${pts.join(" ")}" fill="none" stroke="#ff6fab" stroke-width="4"/>`;
  }
  if(expo){
    const pts=[];
    for(let x=-4;x<=4;x+=0.12){
      const y=expo.c*Math.pow(expo.base,x);
      if(y>-5 && y<6) pts.push(`${260+x*42},${140-y*22}`);
    }
    curve+=`<polyline points="${pts.join(" ")}" fill="none" stroke="#ff6fab" stroke-width="4"/>`;
  }
  const ps=pontos.map(p=>`<circle cx="${260+p.x*42}" cy="${140-p.y*22}" r="6" fill="#22d3ee"/><text x="${270+p.x*42}" y="${132-p.y*22}" fill="#fff" font-size="12">${p.label||""}</text>`).join("");
  return svg(`${grid}<line x1="35" y1="140" x2="485" y2="140" stroke="#b8c8d8" stroke-width="2"/><line x1="260" y1="20" x2="260" y2="255" stroke="#b8c8d8" stroke-width="2"/>${marks}${curve}${ps}`,"Plano cartesiano");
}

function graficoBarras(vals,labels=["A","B","C","D"],titulo=""){
  const max=Math.max(...vals,1);
  const bars=vals.map((v,i)=>{
    const h=145*v/max, x=70+i*105;
    return `<rect x="${x}" y="${220-h}" width="60" height="${h}" rx="5" fill="#3e8cff"/>
    <text x="${x+30}" y="${208-h}" fill="#fff" text-anchor="middle" font-size="13">${v}</text>
    <text x="${x+30}" y="245" fill="#cbd5e1" text-anchor="middle" font-size="12">${labels[i]}</text>`;
  }).join("");
  return svg(`<text x="260" y="28" fill="#fff" text-anchor="middle" font-size="16">${titulo}</text><line x1="40" y1="220" x2="480" y2="220" stroke="#9db5d1" stroke-width="2"/>${bars}`,"Gráfico de barras");
}

function tabelaSvg(headers,rows){
  const cols=headers.length, cw=440/cols;
  let s=`<rect x="40" y="45" width="440" height="${(rows.length+1)*42}" fill="none" stroke="#8bdcff" stroke-width="2"/>`;
  for(let c=0;c<cols;c++){
    s+=`<rect x="${40+c*cw}" y="45" width="${cw}" height="42" fill="#12385a" stroke="#8bdcff"/><text x="${40+c*cw+cw/2}" y="72" fill="#fff" text-anchor="middle" font-size="13">${headers[c]}</text>`;
  }
  rows.forEach((r,ri)=>{
    r.forEach((v,c)=>{
      const x=40+c*cw,y=87+ri*42;
      s+=`<rect x="${x}" y="${y}" width="${cw}" height="42" fill="#0d2743" stroke="#2b5b7a"/><text x="${x+cw/2}" y="${y+27}" fill="#dcecff" text-anchor="middle" font-size="13">${v}</text>`;
    });
  });
  return svg(s,"Tabela");
}

function cuboSvg(){
 return svg(`<g fill="none" stroke="#8bdcff" stroke-width="5" stroke-linejoin="round">
 <path d="M150 65 L285 65 L365 125 L230 125 Z"/><path d="M150 65 L150 185 L230 245 L230 125"/>
 <path d="M230 125 L365 125 L365 245 L230 245 Z"/><path d="M285 65 L285 185 L365 245"/><path d="M150 185 L285 185"/></g>`,"Cubo");
}
function cilindroSvg(){
 return svg(`<ellipse cx="260" cy="62" rx="95" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>
 <path d="M165 62 L165 205 M355 62 L355 205" stroke="#8bdcff" stroke-width="4"/>
 <ellipse cx="260" cy="205" rx="95" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>`,"Cilindro");
}
function coneSvg(){
 return svg(`<ellipse cx="260" cy="215" rx="105" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>
 <path d="M155 215 L260 50 L365 215" fill="rgba(62,140,255,.16)" stroke="#8bdcff" stroke-width="4"/>`,"Cone");
}
function prismaTriangularSvg(){
 return svg(`<g fill="none" stroke="#8bdcff" stroke-width="4">
 <polygon points="110,210 190,80 270,210"/><polygon points="250,210 330,80 410,210"/>
 <line x1="110" y1="210" x2="250" y2="210"/><line x1="190" y1="80" x2="330" y2="80"/><line x1="270" y1="210" x2="410" y2="210"/>
 </g>`,"Prisma triangular");
}
function planificacaoCuboSvg(){
 const q=(x,y)=>`<rect x="${x}" y="${y}" width="58" height="58" fill="#17456d" stroke="#8bdcff" stroke-width="3"/>`;
 return svg(`${q(202,42)}${q(144,100)}${q(202,100)}${q(260,100)}${q(318,100)}${q(202,158)}`,"Planificação de cubo");
}
function planificacaoPrismaTriangularSvg(){
 return svg(`<rect x="100" y="90" width="80" height="100" fill="#17456d" stroke="#8bdcff" stroke-width="3"/>
 <rect x="180" y="90" width="80" height="100" fill="#17456d" stroke="#8bdcff" stroke-width="3"/>
 <rect x="260" y="90" width="80" height="100" fill="#17456d" stroke="#8bdcff" stroke-width="3"/>
 <polygon points="100,90 140,30 180,90" fill="#17456d" stroke="#8bdcff" stroke-width="3"/>
 <polygon points="260,190 300,250 340,190" fill="#17456d" stroke="#8bdcff" stroke-width="3"/>`,"Planificação de prisma triangular");
}
function vistasSolidoSvg(tipo="cubo"){
  if(tipo==="cilindro"){
    return svg(`<g fill="none" stroke="#8bdcff" stroke-width="4">
    <circle cx="110" cy="135" r="55"/><rect x="225" y="80" width="110" height="110"/><rect x="390" y="80" width="70" height="110"/>
    <text x="110" y="225" fill="#fff" text-anchor="middle">superior</text><text x="280" y="225" fill="#fff" text-anchor="middle">frontal</text><text x="425" y="225" fill="#fff" text-anchor="middle">lateral</text></g>`,"Vistas de sólido");
  }
  return svg(`<g fill="none" stroke="#8bdcff" stroke-width="4">
  <rect x="60" y="80" width="100" height="100"/><rect x="210" y="80" width="100" height="100"/><rect x="360" y="80" width="100" height="100"/>
  <text x="110" y="225" fill="#fff" text-anchor="middle">superior</text><text x="260" y="225" fill="#fff" text-anchor="middle">frontal</text><text x="410" y="225" fill="#fff" text-anchor="middle">lateral</text></g>`,"Vistas de sólido");
}
function trianguloSvg(a,b,c,right=true){
 return svg(`<polygon points="120,220 410,220 120,60" fill="rgba(62,140,255,.16)" stroke="#8bdcff" stroke-width="4"/>
 ${right?'<rect x="120" y="198" width="22" height="22" fill="none" stroke="#facc15" stroke-width="3"/>':""}
 <text x="265" y="246" fill="#fff" text-anchor="middle">${a}</text>
 <text x="93" y="145" fill="#fff" text-anchor="middle">${b}</text>
 <text x="290" y="130" fill="#fff" text-anchor="middle">${c}</text>`,"Triângulo");
}
function graficoTrig(tipo="sen"){
 const pts=[];
 for(let i=0;i<=120;i++){
   const x=i/120*4*Math.PI;
   let y=Math.sin(x);
   if(tipo==="cos") y=Math.cos(x);
   if(tipo==="tan") y=clamp(Math.tan(x),-2.8,2.8);
   pts.push(`${40+i*3.65},${140-y*58}`);
 }
 return svg(`<line x1="35" y1="140" x2="485" y2="140" stroke="#9db5d1" stroke-width="2"/>
 <polyline points="${pts.join(" ")}" fill="none" stroke="#ff6fab" stroke-width="4"/>`,"Gráfico trigonométrico");
}

function gerarPorDescritor(d,level,s){
  const k=nidx(level);
  const v=s%6;

  switch(d){

    case "D009_M":{
      const den=pick([2,4,5,10],s), num=1+(s%(den*2-1)), val=num/den;
      if(k===0) return {text:`Qual número racional corresponde ao ponto ${fmt(val)} na reta numérica?`,...alternativas(fmt(val),[fmt(val+0.5),fmt(val-0.5),num,den],s)};
      if(k===1) return {text:`Um ponto P representa ${num}/${den}. Qual número decimal deve aparecer na mesma posição da reta?`,...alternativas(fmt(val),[fmt(num+den),fmt(den/num),fmt(val+0.1),fmt(val-0.1)],s)};
      if(k===2) return {text:`Entre quais inteiros consecutivos está localizado o número ${fmt(val+2.25)}?`,...alternativas(`${Math.floor(val+2.25)} e ${Math.ceil(val+2.25)}`,[`0 e 1`,`1 e 2`,`2 e 3`,`4 e 5`],s)};
      return {text:`Na reta numérica, A representa ${num}/${den} e B representa ${fmt(val+1.5)}. Qual é a distância entre A e B?`,...alternativas(fmt(1.5),[fmt(val),fmt(val+1.5),fmt(1.5+val/2),fmt(Math.abs(val-1.5))],s)};
    }

    case "D033_M":{
      const n=pick([2,3,5,7,11,13],s), r=Math.sqrt(n), a=Math.floor(r), b=a+1;
      if(k<=1) return {text:`Entre quais números inteiros consecutivos está localizado √${n}?`,...alternativas(`${a} e ${b}`,[`${a-1} e ${a}`,`${b} e ${b+1}`,`0 e 1`,`3 e 4`],s)};
      if(k===2) return {text:`Qual valor melhor aproxima √${n} na reta numérica?`,...alternativas(fmt(r),[fmt(r+0.4),fmt(r-0.4),fmt(n/2),fmt(n-1)],s)};
      return {text:`Considere x = √${n} + 1. Entre quais inteiros consecutivos x está localizado?`,...alternativas(`${a+1} e ${b+1}`,[`${a} e ${b}`,`${b+1} e ${b+2}`,`1 e 2`,`4 e 5`],s)};
    }

    case "D038_M":{
      const valor=120+(s%7)*40, p=pick([10,15,20,25,30],s), parte=valor*p/100;
      if(k===0) return {text:`Quanto é ${p}% de R$ ${valor},00?`,...alternativas(fmt(parte),[fmt(valor-parte),fmt(valor+p),fmt(parte+10),fmt(parte-10)],s)};
      if(k===1) return {text:`Uma mochila de R$ ${valor},00 recebeu desconto de ${p}%. Qual é o valor do desconto?`,...alternativas(fmt(parte),[fmt(valor-parte),fmt(valor),fmt(parte+valor/10),fmt(valor*p/10)],s)};
      if(k===2) return {text:`Um equipamento de R$ ${valor},00 teve desconto de ${p}% e, depois, acréscimo de 10% sobre o preço com desconto. Qual é o preço final?`,...alternativas(fmt((valor-parte)*1.1),[fmt(valor-parte),fmt(valor*1.1),fmt(valor*(1-p/100+0.1)),fmt(parte)],s)};
      return {text:`Após um aumento de ${p}%, um produto passou a custar R$ ${fmt(valor*(1+p/100))}. Qual era aproximadamente o preço antes do aumento?`,...alternativas(fmt(valor),[fmt(valor*(1+p/100)),fmt(valor-parte),fmt(valor+p),fmt(parte)],s)};
    }

    case "D039_M":{
      const a=2+(s%4), b=3+(s%5), c=a*b;
      if(k===0) return {text:`Se ${a} cadernos custam R$ ${c},00, quanto custam ${a+1} cadernos mantendo o mesmo preço unitário?`,...alternativas((a+1)*b,[c,a+b,(a+2)*b,b],s)};
      if(k===1) return {text:`Uma receita para ${a} pessoas usa ${c} colheres de um ingrediente. Quantas colheres são necessárias para ${a*2} pessoas?`,...alternativas(c*2,[c+a,c*3,c+a*2,c/2],s)};
      if(k===2) return {text:`Uma máquina produz ${c} peças em ${a} horas. Mantendo a taxa, quantas peças produzirá em ${a+3} horas?`,...alternativas((a+3)*b,[c+a+3,c*(a+3),b*(a+2),c+b],s)};
      return {text:`Um mapa está na escala 1:${10000*(a+1)}. Uma distância de ${b} cm no mapa corresponde a quantos metros reais?`,...alternativas(b*100*(a+1),[b*10*(a+1),b*1000*(a+1),b*(a+1),b*100],s)};
    }

    case "D042_M":{
      const x=2+(s%4),y=2+((s+1)%4),z=2+((s+2)%3);
      if(k===0) return {text:`Há ${x} camisetas e ${y} calças. Quantos conjuntos diferentes podem ser formados escolhendo uma camiseta e uma calça?`,...alternativas(x*y,[x+y,x*y+1,x*y-1,x+y+1],s)};
      if(k===1) return {text:`Uma lanchonete oferece ${x} sanduíches, ${y} bebidas e ${z} sobremesas. Quantos pedidos diferentes podem ser formados escolhendo um de cada?`,...alternativas(x*y*z,[x+y+z,x*y+z,x+y*z,x*y],s)};
      if(k===2) return {text:`Uma senha tem 2 letras distintas escolhidas entre ${x+3} letras e depois 1 algarismo entre 0 e 9. Quantas senhas podem ser formadas?`,...alternativas((x+3)*(x+2)*10,[(x+3)*10,(x+3)**2*10,(x+3)*(x+2),10*(x+2)],s)};
      return {text:`De uma turma com ${x+5} estudantes, quantas maneiras há de escolher presidente e vice-presidente, sem acumular cargos?`,...alternativas((x+5)*(x+4),[(x+5)+(x+4),(x+5)*(x+5),x+5,(x+5)*(x+4)/2],s)};
    }

    case "D043_M":{
      const x=(s%7)-3,y=((s*2)%7)-3;
      if(k<=1) return {text:`Observe o ponto P no plano cartesiano. Quais são suas coordenadas?`,...alternativas(`(${x}, ${y})`,[`(${y}, ${x})`,`(${-x}, ${y})`,`(${x}, ${-y})`,`(${-x}, ${-y})`],s),visual:planoCartesiano({pontos:[{x,y,label:"P"}]})};
      if(k===2) return {text:`O ponto A está em (${x}, ${y}). Qual é o ponto simétrico de A em relação ao eixo y?`,...alternativas(`(${-x}, ${y})`,[`(${x}, ${-y})`,`(${-x}, ${-y})`,`(${y}, ${x})`,`(${x}, ${y})`],s),visual:planoCartesiano({pontos:[{x,y,label:"A"}]})};
      return {text:`Um ponto P(${x}, ${y}) é transladado 2 unidades à direita e 3 para cima. Quais são as novas coordenadas?`,...alternativas(`(${x+2}, ${y+3})`,[`(${x-2}, ${y+3})`,`(${x+2}, ${y-3})`,`(${y+3}, ${x+2})`,`(${x+3}, ${y+2})`],s)};
    }

    case "D049_M":{
      const a=3+(s%3),b=4+(s%3),h=Math.sqrt(a*a+b*b);
      if(k===0) return {text:`Em um triângulo retângulo com catetos ${a} cm e ${b} cm, qual é aproximadamente a hipotenusa?`,...alternativas(fmt(h),[a+b,a*b,fmt(h+1),fmt(h-1)],s),visual:trianguloSvg(a,b,"?")};
      if(k===1) return {text:`Uma escada de ${Math.round(h)} m alcança uma parede. Se a base está a ${a} m da parede, qual altura aproximada ela atinge?`,...alternativas(fmt(Math.sqrt(Math.round(h)**2-a*a)),[a,Math.round(h)-a,fmt(h),a*a],s),visual:trianguloSvg(a,"? ",Math.round(h))};
      if(k===2){ const hip=13,cat=5; return {text:`Uma rampa forma triângulo retângulo de hipotenusa ${hip} m e um cateto ${cat} m. Qual mede o outro cateto?`,...alternativas(12,[8,10,13,18],s),visual:trianguloSvg(cat,"?",hip)};}
      return {text:`Num triângulo retângulo, a altura relativa à hipotenusa divide-a em segmentos 4 e 9. Qual é a medida da altura?`,...alternativas(6,[5,13,Math.sqrt(13),36],s)};
    }

    case "D051_M":{
      const ang=pick([30,45,60],s);
      const sen=ang===30?0.5:ang===45?Math.SQRT1_2:Math.sqrt(3)/2;
      if(k===0) return {text:`Qual é aproximadamente o valor de sen(${ang}°)?`,...alternativas(fmt(sen),[fmt(1-sen),1,0,fmt(Math.tan(ang*Math.PI/180))],s),visual:trianguloSvg("adj.","op.","hip.")};
      if(k===1){ const hip=10+(s%3)*2; const op=hip*sen; return {text:`Em um triângulo retângulo, a hipotenusa mede ${hip} cm e um ângulo agudo mede ${ang}°. Qual é aproximadamente o cateto oposto?`,...alternativas(fmt(op),[fmt(hip*(1-sen)),hip,fmt(op+2),fmt(op-2)],s),visual:trianguloSvg("adj.","?",hip)};}
      if(k===2){ const dist=20+(s%4)*5; const tg=Math.tan(ang*Math.PI/180); return {text:`De um ponto a ${dist} m da base de um prédio, o ângulo de elevação ao topo é ${ang}°. Qual é aproximadamente a altura do prédio?`,...alternativas(fmt(dist*tg),[fmt(dist*sen),fmt(dist/tg),dist,fmt(dist*(1-tg))],s)};}
      return {text:`Um cabo forma ângulo de 60° com o solo e alcança altura de 12 m. Qual é aproximadamente o comprimento do cabo?`,...alternativas(fmt(12/(Math.sqrt(3)/2)),[12,fmt(12*Math.sqrt(3)/2),24,fmt(12*Math.sqrt(3))],s)};
    }

    case "D057_M":{
      const a=5+(s%6),b=3+(s%5);
      if(k===0) return {text:`Um retângulo mede ${a} m por ${b} m. Qual é seu perímetro?`,...alternativas(2*(a+b),[a*b,a+b,2*a+b,a+2*b],s)};
      if(k===1) return {text:`Uma praça quadrada tem lado ${a} m. Quantos metros de grade são necessários para contorná-la?`,...alternativas(4*a,[a*a,2*a,3*a,4*a*a],s)};
      if(k===2) return {text:`Um terreno retangular mede ${a+4} m por ${b+2} m, mas possui uma entrada de 3 m sem cerca. Quantos metros de cerca são necessários?`,...alternativas(2*((a+4)+(b+2))-3,[2*((a+4)+(b+2)),(a+4)*(b+2)-3,(a+b)*2,3],s)};
      return {text:`Um jardim tem formato de semicírculo de raio ${a} m. Considerando π≈3,14, qual é aproximadamente o perímetro total, incluindo o diâmetro?`,...alternativas(fmt(Math.PI*a+2*a),[fmt(2*Math.PI*a),fmt(Math.PI*a),fmt(Math.PI*a*a/2),2*a],s)};
    }

    case "D058_M":{
      const a=4+(s%6),b=3+(s%5);
      if(k===0) return {text:`Um retângulo mede ${a} m por ${b} m. Qual é sua área?`,...alternativas(a*b,[2*(a+b),a+b,a*b+a,a*b-b],s)};
      if(k===1) return {text:`Um piso quadrado tem lado ${a} m. Qual é a área?`,...alternativas(a*a,[4*a,2*a,a+2,a*a+a],s)};
      if(k===2) return {text:`Uma parede retangular mede ${a+2} m por ${b+1} m e possui uma porta de 2 m². Qual é a área que deverá ser pintada?`,...alternativas((a+2)*(b+1)-2,[(a+2)*(b+1),2*((a+2)+(b+1)),(a+2)*(b+1)+2,2],s)};
      return {text:`Uma região é formada por um retângulo ${a}×${b} m e um semicírculo de diâmetro ${b} m. Use π≈3,14. Qual é a área aproximada total?`,...alternativas(fmt(a*b+3.14*(b/2)**2/2),[fmt(a*b+3.14*b*b),fmt(a*b+3.14*(b/2)**2),a*b,fmt(3.14*(b/2)**2/2)],s)};
    }

    case "D063_M":{
      const vals=[10+s%5,16+s%7,12+s%4,20+s%6],labels=["A","B","C","D"],mx=Math.max(...vals),lab=labels[vals.indexOf(mx)];
      if(k<=1) return {text:`A tabela mostra A=${vals[0]}, B=${vals[1]}, C=${vals[2]} e D=${vals[3]}. Qual categoria deve ter a barra mais alta no gráfico correspondente?`,...alternativas(lab,labels.filter(x=>x!==lab),s),visual:graficoBarras(vals,labels,"Valores por categoria")};
      if(k===2) return {text:`Observe o gráfico. Qual tabela representa corretamente os dados apresentados?`,...alternativas(`A=${vals[0]}, B=${vals[1]}, C=${vals[2]}, D=${vals[3]}`,[`A=${vals[1]}, B=${vals[0]}, C=${vals[2]}, D=${vals[3]}`,`A=${vals[0]}, B=${vals[2]}, C=${vals[1]}, D=${vals[3]}`,`A=${vals[3]}, B=${vals[2]}, C=${vals[1]}, D=${vals[0]}`,`A=${vals[0]+1}, B=${vals[1]}, C=${vals[2]}, D=${vals[3]}`],s),visual:graficoBarras(vals,labels,"Leitura do gráfico")};
      return {text:`Qual afirmação descreve corretamente o gráfico?`,...alternativas(`${lab} possui o maior valor`,labels.filter(x=>x!==lab).map(x=>`${x} possui o maior valor`).concat(["Todos têm o mesmo valor"]),s),visual:graficoBarras(vals,labels,"Comparação")};
    }

    case "D064_M":{
      const vals=[12+s%5,18+s%5,9+s%4,22+s%6],labels=["Seg","Ter","Qua","Qui"];
      const total=vals.reduce((a,b)=>a+b,0),media=total/4;
      if(k===0) return {text:`Observe o gráfico. Qual é o maior valor apresentado?`,...alternativas(Math.max(...vals),[Math.min(...vals),total,Math.round(media),vals[0]],s),visual:graficoBarras(vals,labels,"Atendimentos")};
      if(k===1) return {text:`Observe o gráfico. Qual é o total dos quatro dias?`,...alternativas(total,[Math.max(...vals),total-5,total+5,vals[0]+vals[1]],s),visual:graficoBarras(vals,labels,"Atendimentos")};
      if(k===2) return {text:`Com base no gráfico, qual é a média diária aproximada?`,...alternativas(fmt(media),[fmt(total),fmt(media+2),fmt(media-2),Math.max(...vals)],s),visual:graficoBarras(vals,labels,"Atendimentos")};
      return {text:`Se na sexta-feira houver 20% a mais que na quinta-feira, qual será aproximadamente o valor de sexta?`,...alternativas(fmt(vals[3]*1.2),[vals[3],fmt(vals[3]*0.8),fmt(vals[3]+20),fmt(total/4)],s),visual:graficoBarras(vals,labels,"Atendimentos")};
    }

    case "D065_M":{
      const total=10+(s%6),fav=2+(s%5);
      if(k===0) return {text:`Uma urna tem ${total} fichas, das quais ${fav} são azuis. Qual é a probabilidade de retirar uma azul?`,...alternativas(`${fav}/${total}`,[`${total-fav}/${total}`,`${fav}/${total-fav}`,`1/${total}`,`1/${fav}`],s)};
      if(k===1) return {text:`Ao lançar um dado comum, qual é a probabilidade de sair número par?`,...alternativas("1/2",["1/3","2/3","1/6","5/6"],s)};
      if(k===2) return {text:`Duas moedas honestas são lançadas. Qual é a probabilidade de obter exatamente uma cara?`,...alternativas("1/2",["1/4","3/4","1/3","2/3"],s)};
      return {text:`Uma caixa possui 4 bolas vermelhas e 6 azuis. Duas bolas são retiradas sem reposição. Qual é a probabilidade de ambas serem vermelhas?`,...alternativas("2/15",["4/10","4/25","1/5","8/15"],s)};
    }

    case "D071_M":{
      const m=(s%2===0?1:-1)*(1+(s%3)),b=(s%5)-2,zero=-b/m;
      if(k===0) return {text:`Observe o gráfico. A função é crescente ou decrescente?`,...alternativas(m>0?"Crescente":"Decrescente",[m>0?"Decrescente":"Crescente","Constante","Sem domínio","Periódica"],s),visual:planoCartesiano({reta:{m,b}})};
      if(k===1) return {text:`Observe o gráfico. Qual é aproximadamente o zero da função?`,...alternativas(fmt(zero),[b,m,-m,-b],s),visual:planoCartesiano({reta:{m,b}})};
      if(k===2) return {text:`Para a reta mostrada, em qual intervalo a função assume valores positivos?`,...alternativas(m>0?`x > ${fmt(zero)}`:`x < ${fmt(zero)}`,[m>0?`x < ${fmt(zero)}`:`x > ${fmt(zero)}`,`x = ${fmt(zero)}`,"Para todo x","Para nenhum x"],s),visual:planoCartesiano({reta:{m,b}})};
      return {text:`A partir do gráfico, qual afirmação combina corretamente monotonicidade e zero da função?`,...alternativas(`${m>0?"crescente":"decrescente"} e zero em x=${fmt(zero)}`,[`${m>0?"decrescente":"crescente"} e zero em x=${fmt(zero)}`,`${m>0?"crescente":"decrescente"} e zero em x=${fmt(zero+1)}`,"constante e sem zero","periódica"],s),visual:planoCartesiano({reta:{m,b}})};
    }

    case "D074_M":{
      const base=pick([2,3,4],s);
      if(k===0) return {text:`Qual expressão representa uma função exponencial de base ${base} e valor inicial 1?`,...alternativas(`f(x) = ${base}^x`,[`f(x) = ${base}x`,`f(x) = x^${base}`,`f(x) = x + ${base}`,`f(x) = ${base}/x`],s)};
      if(k===1) return {text:`Observe o gráfico de uma função exponencial crescente que passa por (0,1) e (1,${base}). Qual expressão corresponde a ele?`,...alternativas(`f(x) = ${base}^x`,[`f(x) = x + ${base}`,`f(x) = ${base}x`,`f(x) = x^${base}`,`f(x) = (1/${base})^x`],s),visual:planoCartesiano({expo:{base,c:1}})};
      if(k===2) return {text:`Uma função exponencial satisfaz f(0)=1 e f(2)=${base**2}. Qual lei é compatível com esses valores?`,...alternativas(`f(x) = ${base}^x`,[`f(x) = ${base}x`,`f(x) = x^${base}`,`f(x) = ${base}+x`,`f(x) = ${base}^{x+1}`],s),visual:tabelaSvg(["x","f(x)"],[[0,1],[1,base],[2,base**2]])};
      return {text:`O gráfico mostrado é decrescente, passa por (0,1) e por (1,1/${base}). Qual função o representa?`,...alternativas(`f(x) = (1/${base})^x`,[`f(x) = ${base}^x`,`f(x) = -${base}^x`,`f(x) = x/${base}`,`f(x) = ${base}^{-x+1}`],s),visual:planoCartesiano({expo:{base:1/base,c:1}})};
    }

    case "D076_M":{
      const r1=1+(s%4),r2=-(2+(s%3));
      if(k<=1) return {text:`Quais são as raízes de P(x)=(x-${r1})(x-(${r2}))?`,...alternativas(`${r1} e ${r2}`,[`${-r1} e ${-r2}`,`${r1} e ${-r2}`,`${-r1} e ${r2}`,`0 e ${r1+r2}`],s)};
      if(k===2) return {text:`Um polinômio tem fatoração (x-2)(x+5)(x-1). Quais são suas raízes?`,...alternativas("2, -5 e 1",["-2, 5 e -1","2, 5 e 1","-2, -5 e -1","2, -5 e -1"],s)};
      return {text:`Se x=3 é raiz de P(x) e x=-4 também é raiz, qual fatoração parcial obrigatoriamente divide P(x)?`,...alternativas("(x-3)(x+4)",["(x+3)(x-4)","(x-3)(x-4)","(x+3)(x+4)","x²-7"],s)};
    }

    case "D078_M":{
      const m=(s%4)+1,b=(s%5)-2;
      if(k===0) return {text:`Qual expressão representa uma função do 1º grau?`,...alternativas(`y=${m}x${b>=0?"+":""}${b}`,[`y=x²+${m}`,`y=${m}^x`,`y=${m}/x`,`y=√x`],s)};
      if(k===1) return {text:`Observe a reta. Qual expressão algébrica corresponde ao gráfico?`,...alternativas(`y=${m}x${b>=0?"+":""}${b}`,[`y=${b}x+${m}`,`y=${m+1}x+${b}`,`y=x+${b}`,`y=${m}x`],s),visual:planoCartesiano({reta:{m,b}})};
      if(k===2) return {text:`Uma reta passa pelos pontos (0,${b}) e (1,${m+b}). Qual é sua função?`,...alternativas(`y=${m}x${b>=0?"+":""}${b}`,[`y=${b}x+${m}`,`y=${m+b}x`,`y=x+${b}`,`y=${m}x`],s),visual:planoCartesiano({pontos:[{x:0,y:b,label:"A"},{x:1,y:m+b,label:"B"}]})};
      return {text:`Qual função possui gráfico paralelo à reta y=${m}x+1 e intercepta o eixo y em ${b}?`,...alternativas(`y=${m}x${b>=0?"+":""}${b}`,[`y=${b}x+${m}`,`y=${m+1}x+${b}`,`y=-${m}x+${b}`,`y=${m}x`],s)};
    }

    case "D080_M":{
      const base=pick([2,3,10],s);
      if(k===0) return {text:`A função inversa de f(x)=${base}^x é:`,...alternativas(`f⁻¹(x)=log_${base}(x)`,[`f⁻¹(x)=${base}x`,`f⁻¹(x)=x^${base}`,`f⁻¹(x)=1/x`,`f⁻¹(x)=ln(${base}x)`],s)};
      if(k===1) return {text:`Qual função logarítmica é inversa de y=${base}^x?`,...alternativas(`y=log_${base}(x)`,[`y=log_x(${base})`,`y=${base}log(x)`,`y=ln(x)+${base}`,`y=x^${base}`],s)};
      if(k===2) return {text:`Se y=log_${base}(x), qual ponto pertence ao gráfico?`,...alternativas(`(${base},1)`,[`(1,${base})`,`(${base},0)`,`(0,1)`,`(1,1)`],s)};
      return {text:`A função y=log_${base}(x) é inversa de uma função exponencial. Qual transformação geométrica relaciona os dois gráficos?`,...alternativas("Reflexão em relação à reta y=x",["Reflexão no eixo x","Reflexão no eixo y","Translação vertical de 1 unidade","Rotação de 90°"],s)};
    }

    case "D082_M":{
      const crescer=s%2===0;
      if(k===0) return {text:`Uma quantidade ${crescer?"aumenta":"diminui"} de forma constante ao longo do tempo. Qual gráfico representa melhor a situação?`,...alternativas(crescer?"Reta crescente":"Reta decrescente",["Reta horizontal",crescer?"Reta decrescente":"Reta crescente","Parábola","Gráfico periódico"],s),visual:planoCartesiano({reta:{m:crescer?2:-2,b:0}})};
      if(k===1) return {text:`A temperatura cai 2°C por hora durante 5 horas. Qual formato de gráfico é compatível com essa descrição?`,...alternativas("Reta decrescente",["Reta crescente","Parábola crescente","Exponencial crescente","Reta horizontal"],s)};
      if(k===2) return {text:`Uma bola é lançada para cima, sobe, atinge altura máxima e depois desce. Qual tipo de gráfico altura×tempo melhor representa a situação?`,...alternativas("Parábola com concavidade para baixo",["Reta crescente","Reta decrescente","Exponencial crescente","Senoide"],s),visual:planoCartesiano({parabola:{a:-0.5,h:0,k:4}})};
      return {text:`Um capital cresce por juros compostos a taxa positiva constante. Qual comportamento gráfico é esperado?`,...alternativas("Crescimento exponencial",["Crescimento linear","Decrescimento linear","Parábola côncava para baixo","Constante"],s)};
    }

    case "D085_M":{
      const m=(s%4)-2||1,b=(s%7)-3;
      if(k===0) return {text:`Na equação y=${m}x${b>=0?"+":""}${b}, qual é o coeficiente angular?`,...alternativas(m,[b,-m,-b,m+b],s)};
      if(k===1) return {text:`Observe a reta. O que o coeficiente angular ${m} indica?`,...alternativas(m>0?"A reta é crescente":"A reta é decrescente",[m>0?"A reta é decrescente":"A reta é crescente","A reta é horizontal","A reta não possui intercepto","A reta é uma parábola"],s),visual:planoCartesiano({reta:{m,b}})};
      if(k===2) return {text:`Duas retas têm coeficientes angulares iguais a ${m}. Qual relação geométrica pode ocorrer entre elas?`,...alternativas("São paralelas ou coincidentes",["São sempre perpendiculares","Uma é parábola","Têm necessariamente o mesmo intercepto","Não podem se cruzar"],s)};
      return {text:`Uma reta tem coeficiente angular 2 e passa por (0,-3). Qual interpretação está correta?`,...alternativas("A cada aumento de 1 em x, y aumenta 2, e a reta corta o eixo y em -3",["A cada 2 em x, y diminui 1","A reta corta o eixo x em -3","A reta é decrescente","O coeficiente linear é 2"],s)};
    }

    case "D086_M":{
      const m=2+(s%3),b=1+(s%4),xs=[0,1,2],ys=xs.map(x=>m*x+b);
      if(k<=1) return {text:`A tabela mostra x=0,1,2 e y=${ys.join(", ")}. Qual função representa a relação?`,...alternativas(`y=${m}x+${b}`,[`y=${b}x+${m}`,`y=${m+1}x+${b}`,`y=x+${b}`,`y=${m}x`],s),visual:tabelaSvg(["x","y"],[[0,ys[0]],[1,ys[1]],[2,ys[2]]])};
      if(k===2) return {text:`Uma tabela apresenta pares (1,${m+b}), (2,${2*m+b}) e (3,${3*m+b}). Qual expressão geral representa y em função de x?`,...alternativas(`y=${m}x+${b}`,[`y=${b}x+${m}`,`y=${m+b}x`,`y=x+${b}`,`y=${m}x`],s)};
      return {text:`Os valores de y aumentam sempre ${m} quando x aumenta 1, e y=${b} quando x=0. Qual função descreve a tabela?`,...alternativas(`y=${m}x+${b}`,[`y=${m}^x+${b}`,`y=x^${m}+${b}`,`y=${b}x+${m}`,`y=${m}x`],s)};
    }

    case "D087_M":{
      const r1=1+(s%4),r2=2+(s%5),B=-(r1+r2),C=r1*r2;
      if(k===0) return {text:`Quais são as raízes de x²${B>=0?"+":""}${B}x+${C}=0?`,...alternativas(`${r1} e ${r2}`,[`${-r1} e ${-r2}`,`${r1} e ${-r2}`,`0 e ${C}`,`${r1+r2} e ${C}`],s)};
      if(k===1) return {text:`A área de um retângulo é 48 m² e seus lados medem x e x+2. Qual equação representa o problema?`,...alternativas("x²+2x-48=0",["x²+2x+48=0","2x+48=0","x²-2x-48=0","x(x+2)=0"],s)};
      if(k===2) return {text:`Uma bola tem altura h(t)=-5t²+20t+1. Em que instante aproximado ela atinge novamente 1 m?`,...alternativas("4 s",["2 s","1 s","5 s","20 s"],s)};
      return {text:`Uma equação do 2º grau possui discriminante Δ<0. O que isso significa no conjunto dos números reais?`,...alternativas("Não possui raízes reais",["Possui duas raízes reais distintas","Possui uma raiz real dupla","Possui infinitas raízes","É sempre crescente"],s)};
    }

    case "D088_M":{
      const base=pick([2,3],s),t=2+(s%3),ini=100*(1+(s%3)),final=ini*Math.pow(base,t);
      if(k===0){
        const modelos=[
          {text:`Uma cultura começa com ${ini} bactérias e dobra a cada hora. Quantas haverá após ${t} horas?`,ans:ini*2**t},
          {text:`Um vídeo começa com ${ini} visualizações e seu total triplica a cada rodada de divulgação. Após ${t} rodadas, quantas visualizações haverá?`,ans:ini*3**t},
          {text:`Uma população inicial de ${ini} indivíduos multiplica-se por ${base} a cada período. Qual é o total após ${t} períodos?`,ans:final},
          {text:`Uma sequência começa em ${ini} e cada termo é ${base} vezes o anterior. Qual é o termo após ${t} multiplicações?`,ans:final}
        ];
        const q=pick(modelos,s); return {text:q.text,...alternativas(q.ans,[q.ans/base,q.ans+ini,ini*base*t,q.ans-base],s)};
      }
      if(k===1){
        const modelos=[
          {text:`Um equipamento custa R$ ${ini},00 e perde 20% do valor a cada ano. Qual será aproximadamente o valor após ${t} anos?`,ans:ini*0.8**t},
          {text:`Uma aplicação de R$ ${ini},00 cresce 10% ao mês. Qual é o valor após ${t} meses?`,ans:ini*1.1**t},
          {text:`Uma cultura com ${ini} células cresce por fator ${base} a cada ciclo. Escreva a expressão que calcula o total após x ciclos.`,expr:`${ini}·${base}^x`}
        ];
        const q=pick(modelos,s);
        if(q.expr) return {text:q.text,...alternativas(q.expr,[`${ini}+${base}x`,`${ini}x^${base}`,`${ini}·x^${base}`,`${base}·${ini}^x`],s)};
        return {text:q.text,...alternativas(fmt(q.ans),[fmt(q.ans+ini/10),fmt(q.ans-ini/10),fmt(ini+t*10),fmt(ini*(1+t/10))],s)};
      }
      if(k===2){
        const modelos=[
          {text:`Uma população é modelada por P(t)=200·2^t. Em que instante P(t)=1600?`,ans:"t = 3"},
          {text:`Um investimento é modelado por V(t)=500·1,2^t. Qual interpretação correta do fator 1,2?`,ans:"Aumento de 20% por período"},
          {text:`Uma substância decai segundo M(t)=800·(1/2)^t. Qual será a massa após 3 períodos?`,ans:"100"},
          {text:`Uma cidade tinha 10.000 habitantes e cresce 5% ao ano. Qual expressão modela a população após t anos?`,ans:"10000·1,05^t"}
        ];
        const q=pick(modelos,s);
        return {text:q.text,...alternativas(q.ans,["t = 2","Aumento de 2% por período","200","10000+0,05t"],s)};
      }
      const modelos=[
        {text:`Uma função exponencial satisfaz f(1)=6 e f(3)=54. Admitindo f(x)=a·b^x, qual é b?`,ans:"3"},
        {text:`Um valor dobra a cada 4 horas. Qual fator de multiplicação corresponde a 12 horas?`,ans:"8"},
        {text:`Uma população segue P(t)=1000·1,05^t. Aproximadamente em quantos anos ela ultrapassa 1200?`,ans:"4"},
        {text:`Uma quantidade é reduzida 25% a cada etapa. Qual fator exponencial deve ser usado?`,ans:"0,75"}
      ];
      const q=pick(modelos,s); return {text:q.text,...alternativas(q.ans,["2","4","1,25","0,25"],s)};
    }

    case "D096_M":{
      const a1=2+(s%5),r=2+(s%4),n=5+(s%5),an=a1+(n-1)*r;
      if(k===0) return {text:`Uma PA tem primeiro termo ${a1} e razão ${r}. Qual é o ${n}º termo?`,...alternativas(an,[a1+n*r,an+r,an-r,n*r],s)};
      if(k===1) return {text:`Uma arquibancada tem ${a1+10} assentos na primeira fila e cada fila seguinte tem ${r} assentos a mais. Quantos assentos há na ${n}ª fila?`,...alternativas((a1+10)+(n-1)*r,[(a1+10)+n*r,(a1+10)*n,r*n,(a1+10)+(n-2)*r],s)};
      if(k===2) return {text:`Em uma PA, a3=12 e a7=28. Qual é a razão?`,...alternativas(4,[2,3,5,8],s)};
      return {text:`A soma dos 10 primeiros termos de uma PA com a1=3 e razão 2 é:`,...alternativas(120,[100,110,130,210],s)};
    }

    case "D097_M":{
      const a1=2+(s%3),q=2+(s%2),n=4+(s%3),an=a1*Math.pow(q,n-1);
      if(k===0) return {text:`Uma PG tem primeiro termo ${a1} e razão ${q}. Qual é o ${n}º termo?`,...alternativas(an,[a1*q*n,an/q,an+q,a1+(n-1)*q],s)};
      if(k===1) return {text:`Uma sequência começa em ${a1} e cada termo é ${q} vezes o anterior. Qual é o ${n}º termo?`,...alternativas(an,[a1+(n-1)*q,a1*q*n,an+q,an/q],s)};
      if(k===2) return {text:`Em uma PG, a2=6 e a4=54. Qual é a razão positiva?`,...alternativas(3,[2,4,6,9],s)};
      return {text:`Qual é a soma dos 5 primeiros termos da PG 2, 4, 8, 16, ...?`,...alternativas(62,[32,60,64,30],s)};
    }

    case "D111_M":{
      if(k===0){
        const qs=[
          {text:"Qual sólido corresponde à planificação apresentada?",ans:"Cubo",visual:planificacaoCuboSvg()},
          {text:"Qual sólido possui duas bases circulares paralelas e superfície lateral curva?",ans:"Cilindro",visual:cilindroSvg()},
          {text:"Qual sólido corresponde à figura apresentada?",ans:"Prisma triangular",visual:prismaTriangularSvg()}
        ];
        const q=pick(qs,s); return {text:q.text,...alternativas(q.ans,["Cone","Cubo","Pirâmide","Prisma triangular"].filter(x=>x!==q.ans),s),visual:q.visual};
      }
      if(k===1){
        const qs=[
          {text:"A planificação apresentada é formada por 6 quadrados congruentes. Qual sólido ela forma?",ans:"Cubo",visual:planificacaoCuboSvg()},
          {text:"A planificação apresenta 3 retângulos e 2 triângulos. Qual sólido é formado?",ans:"Prisma triangular",visual:planificacaoPrismaTriangularSvg()},
          {text:"Observe as vistas superior, frontal e lateral. Qual sólido é compatível com elas?",ans:"Cubo",visual:vistasSolidoSvg("cubo")}
        ];
        const q=pick(qs,s); return {text:q.text,...alternativas(q.ans,["Cilindro","Cone","Pirâmide quadrangular","Prisma triangular"].filter(x=>x!==q.ans),s),visual:q.visual};
      }
      if(k===2){
        const qs=[
          {text:"A planificação mostra 3 faces retangulares consecutivas e 2 faces triangulares. Qual sólido será obtido ao dobrá-la?",ans:"Prisma triangular",visual:planificacaoPrismaTriangularSvg()},
          {text:"As vistas superior é circular e as vistas frontal e lateral são retangulares. Qual sólido é compatível com essas três vistas?",ans:"Cilindro",visual:vistasSolidoSvg("cilindro")},
          {text:"Qual característica permite concluir que esta planificação pode formar um cubo?",ans:"Possui 6 quadrados congruentes conectados adequadamente",visual:planificacaoCuboSvg()}
        ];
        const q=pick(qs,s); return {text:q.text,...alternativas(q.ans,["Possui 4 triângulos e 1 quadrado","Possui 2 círculos e 1 retângulo","Possui 3 retângulos e 2 triângulos","Possui apenas 5 quadrados"],s),visual:q.visual};
      }
      const qs=[
        {text:"Uma peça possui vista superior quadrada, vista frontal quadrada e vista lateral quadrada, todas com mesma medida. Qual sólido é mais compatível?",ans:"Cubo",visual:vistasSolidoSvg("cubo")},
        {text:"Uma planificação válida contém duas bases triangulares congruentes e três faces laterais retangulares. Qual sólido e quantas faces ele possui?",ans:"Prisma triangular, 5 faces",visual:planificacaoPrismaTriangularSvg()},
        {text:"A vista superior de um sólido é um círculo e a vista frontal é um triângulo isósceles. Qual sólido é o mais compatível?",ans:"Cone",visual:coneSvg()}
      ];
      const q=pick(qs,s); return {text:q.text,...alternativas(q.ans,["Cilindro, 3 faces","Cubo, 6 faces","Pirâmide quadrangular, 5 faces","Esfera"],s),visual:q.visual};
    }

    case "D119_M":{
      const a=3+(s%4),b=4+(s%4),f=2+(s%3);
      if(k===0) return {text:`Dois triângulos semelhantes têm lados correspondentes ${a} e ${a*f}. Se outro lado do menor mede ${b}, quanto mede o correspondente no maior?`,...alternativas(b*f,[b+f,b*f+f,b*f-f,a*f],s)};
      if(k===1) return {text:`Uma sombra de ${a} m corresponde a uma altura de ${b} m. No mesmo instante, um prédio projeta sombra de ${a*f} m. Qual é sua altura?`,...alternativas(b*f,[b+f,a*f,b*f+1,b*f-f],s)};
      if(k===2) return {text:`Dois triângulos são semelhantes na razão 3:5. Um lado do menor mede 12 cm. Quanto mede o correspondente no maior?`,...alternativas(20,[15,18,24,30],s)};
      return {text:`Num triângulo, uma reta paralela a um lado determina segmentos proporcionais. Se 4/6 = x/15, qual é x?`,...alternativas(10,[8,9,12,15],s)};
    }

    case "D124_M":{
      const m=1+(s%4),x1=1+(s%3),y1=2+(s%4),b=y1-m*x1,eq=`y=${m}x${b>=0?"+":""}${b}`;
      if(k===0) return {text:`Uma reta passa por (${x1},${y1}) e tem inclinação ${m}. Qual é sua equação?`,...alternativas(eq,[`y=${x1}x+${y1}`,`y=${m+1}x+${b}`,`y=${m}x+${y1}`,`y=x+${b}`],s)};
      if(k===1) return {text:`Qual é a equação da reta que passa por (0,${b}) e (1,${m+b})?`,...alternativas(eq,[`y=${b}x+${m}`,`y=${m+b}x`,`y=x+${b}`,`y=${m}x`],s),visual:planoCartesiano({pontos:[{x:0,y:b,label:"A"},{x:1,y:m+b,label:"B"}]})};
      if(k===2) return {text:`A reta passa pelos pontos (2,5) e (4,9). Qual é sua equação?`,...alternativas("y=2x+1",["y=x+3","y=4x-3","y=2x-1","y=3x-1"],s)};
      return {text:`Uma reta é perpendicular a y=2x+1 e passa por (0,3). Qual é sua equação?`,...alternativas("y=-0,5x+3",["y=2x+3","y=-2x+3","y=0,5x+3","y=-0,5x+1"],s)};
    }

    case "D125_M":{
      if(k===0) return {text:"Um cubo possui 8 vértices e 6 faces. Quantas arestas possui?",...alternativas(12,[10,14,8,6],s),visual:cuboSvg()};
      if(k===1) return {text:"Usando V-A+F=2, se V=6 e F=5, qual é A?",...alternativas(9,[7,8,10,11],s)};
      if(k===2) return {text:"Um poliedro convexo possui 10 vértices e 7 faces. Quantas arestas possui?",...alternativas(15,[13,14,16,17],s)};
      return {text:"Um poliedro convexo possui 12 faces e 18 arestas. Quantos vértices possui?",...alternativas(8,[6,10,12,14],s)};
    }

    case "D126_M":{
      const tipo=pick(["sen","cos","tan"],s),nome={sen:"seno",cos:"cosseno",tan:"tangente"}[tipo];
      if(k===0) return {text:"O gráfico apresentado corresponde a qual função trigonométrica?",...alternativas(nome,["seno","cosseno","tangente","função linear"].filter(x=>x!==nome),s),visual:graficoTrig(tipo)};
      if(k===1) return {text:`Qual característica ajuda a identificar o gráfico de ${nome}?`,...alternativas(tipo==="tan"?"Possui descontinuidades periódicas":"É periódico e limitado",[tipo==="tan"?"É limitado entre -1 e 1":"Possui assíntotas verticais em todos os pontos","É sempre crescente","É uma reta"],s),visual:graficoTrig(tipo)};
      if(k===2) return {text:"Um gráfico trigonométrico inicia em 0, cresce até 1, volta a 0 e depois atinge -1. Qual função básica é compatível?",...alternativas("seno",["cosseno","tangente","função linear","exponencial"],s),visual:graficoTrig("sen")};
      return {text:"Qual função trigonométrica possui período π e assíntotas verticais?",...alternativas("tangente",["seno","cosseno","secante","função linear"],s),visual:graficoTrig("tan")};
    }

    case "D127_M":{
      const x=1+(s%4),y=2+(s%4),c1=x+y,c2=2*x-y;
      if(k===0) return {text:`O sistema x+y=${c1} e 2x-y=${c2} possui qual solução?`,...alternativas(`(${x}, ${y})`,[`(${y}, ${x})`,`(${-x}, ${y})`,`(${x}, ${-y})`,`(${c1}, ${c2})`],s)};
      if(k===1) return {text:"Duas retas se cruzam no ponto (2,3). O que esse ponto representa em relação ao sistema formado pelas duas equações?",...alternativas("A solução do sistema",["O coeficiente angular","A origem","Um ponto sem relação","A soma das equações"],s),visual:planoCartesiano({pontos:[{x:2,y:3,label:"P"}]})};
      if(k===2) return {text:"Resolva geometricamente: y=x+1 e y=-x+5. Qual é o ponto de interseção?",...alternativas("(2,3)",["(1,4)","(3,2)","(0,5)","(5,0)"],s),visual:planoCartesiano({reta:{m:1,b:1},pontos:[{x:2,y:3,label:"P"}]})};
      return {text:"Um sistema de duas equações lineares possui retas paralelas distintas. Quantas soluções ele possui?",...alternativas("Nenhuma",["Uma","Duas","Infinitas","Depende do eixo y"],s)};
    }

    case "D129_M":{
      const r=2+(s%4),h=3+(s%5),a=2+(s%5);
      if(k===0) return {text:`Um cubo possui aresta ${a} cm. Qual é seu volume?`,...alternativas(a**3,[6*a*a,a*a,12*a,a**3+a],s),visual:cuboSvg()};
      if(k===1) return {text:`Um cilindro tem raio ${r} cm e altura ${h} cm. Use π≈3,14. Qual é aproximadamente seu volume?`,...alternativas(fmt(3.14*r*r*h),[fmt(r*r*h),fmt(2*3.14*r*h),fmt(3.14*r*h),fmt(3.14*r*r*(h+1))],s),visual:cilindroSvg()};
      if(k===2) return {text:`Uma caixa retangular mede ${a+2} cm × ${a+1} cm × ${a} cm. Qual é seu volume?`,...alternativas((a+2)*(a+1)*a,[(a+2)*(a+1),2*((a+2)+(a+1)+a),(a+2)+(a+1)+a,(a+2)*(a+1)*a+10],s)};
      return {text:`Um cone tem raio 3 cm e altura 12 cm. Use π≈3,14. Qual é aproximadamente seu volume?`,...alternativas(fmt((1/3)*3.14*9*12),[fmt(3.14*9*12),fmt(3.14*3*12),fmt((1/2)*3.14*9*12),fmt(3.14*9)],s),visual:coneSvg()};
    }

    case "D132_M":{
      const tarifa=5+(s%5),taxa=10+(s%5),x=3+(s%6),total=taxa+tarifa*x;
      if(k===0) return {text:`Um serviço cobra R$ ${taxa},00 fixos mais R$ ${tarifa},00 por unidade. Qual o custo para ${x} unidades?`,...alternativas(total,[tarifa*x,taxa*x,total+tarifa,total-tarifa],s)};
      if(k===1) return {text:`Uma corrida de aplicativo custa R$ ${taxa},00 de bandeirada mais R$ ${tarifa},00 por km. Qual função representa o preço P(x)?`,...alternativas(`P(x)=${tarifa}x+${taxa}`,[`P(x)=${taxa}x+${tarifa}`,`P(x)=${tarifa+taxa}x`,`P(x)=${tarifa}^x+${taxa}`,`P(x)=x+${taxa}`],s)};
      if(k===2) return {text:`Uma empresa cobra C(x)=8x+50. Para qual x o custo é R$ 130?`,...alternativas(10,[8,12,15,20],s)};
      return {text:`Duas empresas cobram A(x)=5x+40 e B(x)=7x+20. Para qual x os preços são iguais?`,...alternativas(10,[5,15,20,30],s)};
    }

    case "D133_M":{
      const h=2+(s%4),kv=5+(s%6);
      if(k===0) return {text:`A função f(x)=(x-${h})²+${kv} possui valor mínimo igual a:`,...alternativas(kv,[h,h+kv,kv-h,0],s)};
      if(k===1) return {text:`Qual é o vértice da parábola y=(x-${h})²+${kv}?`,...alternativas(`(${h},${kv})`,[`(${-h},${kv})`,`(${h},${-kv})`,`(0,${kv})`,`(${kv},${h})`],s),visual:planoCartesiano({parabola:{a:1,h,k:kv}})};
      if(k===2) return {text:"A altura de um objeto é h(t)=-5t²+20t+2. Em que instante ocorre a altura máxima?",...alternativas("2 s",["1 s","4 s","5 s","20 s"],s)};
      return {text:"Uma função quadrática tem vértice (3,-4) e concavidade para cima. Qual é seu valor mínimo?",...alternativas("-4",["3","4","-3","0"],s)};
    }

    case "D145_M":{
      const m=(s%4)+1,b=(s%5)-2;
      if(k===0) return {text:`Considere f(x)=${m}x${b>=0?"+":""}${b}. O gráfico é:`,...alternativas(m>0?"Uma reta crescente":"Uma reta decrescente",["Uma parábola","Uma exponencial","Uma reta horizontal","Uma circunferência"],s)};
      if(k===1) return {text:`Qual gráfico corresponde à função f(x)=${m}x${b>=0?"+":""}${b}?`,...alternativas(`Reta com inclinação ${m} e intercepto ${b}`,[`Reta com inclinação ${b} e intercepto ${m}`,"Parábola",`Reta horizontal y=${b}`,"Exponencial"],s),visual:planoCartesiano({reta:{m,b}})};
      if(k===2) return {text:`A função f(x)=-2x+5 possui qual comportamento gráfico?`,...alternativas("Reta decrescente que corta o eixo y em 5",["Reta crescente que corta y em 5","Reta decrescente que corta y em -2","Parábola com vértice 5","Exponencial decrescente"],s)};
      return {text:`Duas funções lineares têm coeficientes angulares 3 e -1. Qual afirmação é verdadeira?`,...alternativas("Uma é crescente e a outra decrescente",["Ambas são crescentes","Ambas são decrescentes","Ambas são horizontais","São necessariamente paralelas"],s)};
    }
  }
  throw new Error(`Descritor ${d} sem gerador.`);
}

function construirFilaNiveis(distribuicao,quantidade){
  const pares=[
    ["ABAIXO DO BÁSICO",Number(distribuicao?.abb ?? 40)],
    ["BÁSICO",Number(distribuicao?.basico ?? 30)],
    ["PROFICIENTE",Number(distribuicao?.proficiente ?? 20)],
    ["AVANÇADO",Number(distribuicao?.avancado ?? 10)]
  ];
  const fila=[];
  let usados=0;
  pares.forEach(([nivel,p],idx)=>{
    const n=idx===pares.length-1?quantidade-usados:Math.round(quantidade*p/100);
    for(let i=0;i<Math.max(0,n);i++) fila.push(nivel);
    usados=fila.length;
  });
  while(fila.length<quantidade) fila.push("BÁSICO");
  return fila.slice(0,quantidade);
}

function intercalarNiveis(distribuicao,quantidade){
  const base=construirFilaNiveis(distribuicao,quantidade);
  const buckets={};
  base.forEach(n=>(buckets[n] ||= []).push(n));
  const ordem=["ABAIXO DO BÁSICO","BÁSICO","PROFICIENTE","AVANÇADO"];
  const out=[];
  while(out.length<quantidade){
    let mudou=false;
    for(const n of ordem){
      if(buckets[n]?.length){
        out.push(buckets[n].pop());
        mudou=true;
        if(out.length>=quantidade) break;
      }
    }
    if(!mudou) break;
  }
  return out;
}

function montarFilaDescritores(validos,configuracaoDescritores,quantidade){
  const pesos=Object.fromEntries(validos.map(d=>[d,clamp(Number(configuracaoDescritores[d]?.peso||1),1,4)]));
  const cont=Object.fromEntries(validos.map(d=>[d,0]));
  const fila=[];

  // Cobertura mínima: todos aparecem uma vez antes da repetição.
  for(const d of validos){
    if(fila.length>=quantidade) break;
    fila.push(d); cont[d]++;
  }

  // Depois, prioridade proporcional, evitando repetição consecutiva.
  while(fila.length<quantidade){
    const ultimo=fila[fila.length-1];
    const cand=validos.map(d=>({
      d,peso:pesos[d],cont:cont[d],
      indice:cont[d]/pesos[d]
    })).sort((a,b)=>{
      if(a.indice!==b.indice) return a.indice-b.indice;
      if(a.cont!==b.cont) return a.cont-b.cont;
      return validos.indexOf(a.d)-validos.indexOf(b.d);
    });
    const escolhido=cand.find(x=>x.d!==ultimo)?.d || cand[0].d;
    fila.push(escolhido); cont[escolhido]++;
  }
  return {fila,pesos};
}

export function habilidadeDoDescritor(descritor){
  return HABILIDADES_PAEBES[descritor] || "";
}

export function gerarQuestaoDescritor(descritor,nivel="BÁSICO",seed=1){
  if(!HABILIDADES_PAEBES[descritor]) throw new Error("Descritor não pertence à matriz PAEBES 2025 da 3ª série.");
  const q=gerarPorDescritor(descritor,nivel,seed);
  return {
    id:`${descritor}-especial-${Date.now().toString(36)}-${seed}`,
    descriptor:descritor,
    habilidade:HABILIDADES_PAEBES[descritor],
    level:nivel,
    text:q.text,
    options:q.options,
    correct:q.correct,
    visual:q.visual||null,
    baseXP:XP_NIVEL[nivel]||120
  };
}

export function gerarQuestoesArena({
  quantidade=15,
  descritores=[],
  configuracaoDescritores={},
  distribuicaoNiveis={abb:40,basico:30,proficiente:20,avancado:10}
}={}){
  quantidade=clamp(Number(quantidade)||15,5,40);
  const validos=descritores.filter(d=>HABILIDADES_PAEBES[d]);
  if(validos.length===0) throw new Error("Selecione pelo menos um descritor da matriz PAEBES 2025.");

  const {fila,pesos}=montarFilaDescritores(validos,configuracaoDescritores,quantidade);
  const niveis=intercalarNiveis(distribuicaoNiveis,quantidade);
  const questoes=[];
  const assinaturas=new Set();

  for(let i=0;i<quantidade;i++){
    const descriptor=fila[i];
    const cfg=configuracaoDescritores[descriptor]||{};
    const nivel=cfg.nivel && cfg.nivel!=="MISTO" ? cfg.nivel : (niveis[i]||"BÁSICO");
    let gerada=null;
    let tentativa=0;
    let seed=(i+1)*37 + validos.indexOf(descriptor)*101;

    // Evita enunciado idêntico dentro da mesma Arena.
    while(tentativa<12){
      gerada=gerarPorDescritor(descriptor,nivel,seed+tentativa*53);
      const sig=`${descriptor}|${nivel}|${gerada.text}`;
      if(!assinaturas.has(sig)){
        assinaturas.add(sig);
        break;
      }
      tentativa++;
    }

    const peso=pesos[descriptor];
    questoes.push({
      id:`${descriptor}-${i+1}-${Date.now().toString(36)}`,
      descriptor,
      habilidade:HABILIDADES_PAEBES[descriptor],
      level:nivel,
      text:gerada.text,
      options:gerada.options,
      correct:gerada.correct,
      visual:gerada.visual||null,
      pesoDescritor:peso,
      baseXP:Math.round((XP_NIVEL[nivel]||120)*peso),
      origem:"Questão autoral alinhada à Matriz de Referência PAEBES 2025 — 3ª série"
    });
  }

  return questoes;
}

export function descritoresSemBanco(descritores=[]){
  return descritores.filter(d=>!HABILIDADES_PAEBES[d]);
}
