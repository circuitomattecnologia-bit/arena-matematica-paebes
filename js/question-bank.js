// ======================================================
// BANCO / GERADOR DE QUESTÕES — ARENA MATEMÁTICA PAEBES
// Base estrutural extensível.
// Banco atual coberto: D074_M, D088_M, D097_M, D111_M, D125_M.
// ======================================================

export const DESCRITORES_COM_BANCO = [
  "D074_M","D088_M","D097_M","D111_M","D125_M"
];

export const NIVEIS = [
  "ABAIXO DO BÁSICO",
  "BÁSICO",
  "PROFICIENTE",
  "AVANÇADO"
];

const XP_NIVEL = {
  "ABAIXO DO BÁSICO": 100,
  "BÁSICO": 120,
  "PROFICIENTE": 180,
  "AVANÇADO": 240
};

function pct(v,p){ return Math.round((v*p)/100); }

function embaralharOpcoes(correta, distratores, seed=0){
  const valores = [correta, ...distratores].map(String);
  const unicos = [...new Set(valores)];
  const extrasTexto=["Nenhuma das anteriores","Não é possível determinar","Todas as anteriores","Outro valor"];
  let extraIndex=0;
  while(unicos.length < 5){
    const numero=Number(correta);
    const extra=Number.isFinite(numero)
      ? String(numero + unicos.length + 1)
      : extrasTexto[extraIndex++ % extrasTexto.length];
    if(!unicos.includes(extra)) unicos.push(extra);
  }
  const arr = unicos.slice(0,5);
  const giro = Math.abs(seed) % arr.length;
  const rodada = [...arr.slice(giro), ...arr.slice(0,giro)];
  return { options: rodada, correct: rodada.indexOf(String(correta)) };
}

function svgBase(conteudo, viewBox="0 0 520 240"){
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Representação matemática">
    <rect width="100%" height="100%" rx="18" fill="#07182d"/>
    ${conteudo}
  </svg>`;
}

function visualCubo(){
  return svgBase(`
    <g fill="none" stroke="#8bdcff" stroke-width="5" stroke-linejoin="round">
      <path d="M170 75 L290 75 L350 125 L230 125 Z"/>
      <path d="M170 75 L170 175 L230 225 L230 125"/>
      <path d="M230 125 L350 125 L350 225 L230 225 Z"/>
      <path d="M290 75 L290 175 L350 225"/>
      <path d="M170 175 L290 175"/>
    </g>
  `);
}

function visualCilindro(){
  return svgBase(`
    <ellipse cx="260" cy="60" rx="90" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>
    <path d="M170 60 L170 180 M350 60 L350 180" stroke="#8bdcff" stroke-width="4"/>
    <ellipse cx="260" cy="180" rx="90" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>
    <path d="M170 60 C170 90 350 90 350 60" fill="none" stroke="#8bdcff" stroke-width="4"/>
  `);
}

function visualBarras(a,b,c,d){
  const vals=[a,b,c,d];
  const max=Math.max(...vals,1);
  return svgBase(`
    <line x1="60" y1="200" x2="480" y2="200" stroke="#9db5d1" stroke-width="2"/>
    ${vals.map((v,i)=>{
      const h=Math.round(130*v/max);
      const x=95+i*95;
      return `<rect x="${x}" y="${200-h}" width="55" height="${h}" rx="6" fill="#3e8cff"/>
              <text x="${x+27}" y="${190-h}" text-anchor="middle" fill="#ffffff" font-size="18">${v}</text>`;
    }).join("")}
    <text x="122" y="226" text-anchor="middle" fill="#cbd5e1">A</text>
    <text x="217" y="226" text-anchor="middle" fill="#cbd5e1">B</text>
    <text x="312" y="226" text-anchor="middle" fill="#cbd5e1">C</text>
    <text x="407" y="226" text-anchor="middle" fill="#cbd5e1">D</text>
  `);
}

function visualFuncao(m,b){
  const pts=[];
  for(let x=-4;x<=4;x++){
    const y=m*x+b;
    const px=260+x*45, py=120-y*18;
    pts.push(`${px},${py}`);
  }
  return svgBase(`
    <line x1="40" y1="120" x2="480" y2="120" stroke="#9db5d1" stroke-width="2"/>
    <line x1="260" y1="20" x2="260" y2="220" stroke="#9db5d1" stroke-width="2"/>
    <polyline points="${pts.join(" ")}" fill="none" stroke="#ff6fab" stroke-width="5"/>
    <text x="470" y="112" fill="#cbd5e1">x</text>
    <text x="270" y="32" fill="#cbd5e1">y</text>
  `);
}

function questaoD074(level, s){
  const valor = 80 + (s%6)*20;
  const percentuais = [10,15,20,25,30,40];
  const p = percentuais[s%percentuais.length];
  const desconto = pct(valor,p);
  if(level==="ABAIXO DO BÁSICO"){
    const r=embaralharOpcoes(desconto,[desconto+10,Math.max(5,desconto-5),valor-p,p],s);
    return {text:`Um produto custa R$ ${valor},00 e recebeu desconto de ${p}%. Qual é o valor do desconto?`,...r};
  }
  if(level==="BÁSICO"){
    const final=valor-desconto;
    const r=embaralharOpcoes(final,[valor,desconto,final+10,Math.max(0,final-10)],s);
    return {text:`Um produto de R$ ${valor},00 recebeu desconto de ${p}%. Qual é o preço final?`,...r};
  }
  if(level==="PROFICIENTE"){
    const acresc = p;
    const final=valor+pct(valor,acresc);
    const r=embaralharOpcoes(final,[valor,pct(valor,acresc),final+20,final-10],s);
    return {text:`Após um aumento de ${acresc}%, um produto que custava R$ ${valor},00 passa a custar quanto?`,...r};
  }
  const p2=[5,10,15][s%3];
  const aposDesc=valor-desconto;
  const final=aposDesc+pct(aposDesc,p2);
  const r=embaralharOpcoes(final,[aposDesc,valor,final+10,Math.max(0,final-10)],s);
  return {text:`Um produto de R$ ${valor},00 recebe desconto de ${p}% e depois acréscimo de ${p2}% sobre o novo preço. Qual é o valor final aproximado em reais?`,...r};
}

function questaoD088(level,s){
  const inicio=1+(s%7), passo=2+(s%5);
  if(level==="ABAIXO DO BÁSICO"){
    const seq=[inicio,inicio+passo,inicio+2*passo,inicio+3*passo];
    const correta=inicio+4*passo;
    const r=embaralharOpcoes(correta,[correta+1,correta-1,correta+passo,correta-passo],s);
    return {text:`Observe a sequência: ${seq.join(", ")}, __. Qual é o próximo termo?`,...r};
  }
  if(level==="BÁSICO"){
    const n=6+(s%4), correta=inicio+(n-1)*passo;
    const r=embaralharOpcoes(correta,[correta+passo,correta-passo,correta+1,correta-2],s);
    return {text:`Na sequência aritmética que começa em ${inicio} e aumenta de ${passo} em ${passo}, qual é o ${n}º termo?`,...r};
  }
  if(level==="PROFICIENTE"){
    const n=10+(s%5), correta=inicio+(n-1)*passo;
    const r=embaralharOpcoes(correta,[correta+passo,correta-passo,inicio+n*passo,passo*n],s);
    return {text:`Uma PA tem primeiro termo ${inicio} e razão ${passo}. Qual é o ${n}º termo?`,...r};
  }
  const n=8+(s%5);
  const an=inicio+(n-1)*passo;
  const soma=n*(inicio+an)/2;
  const r=embaralharOpcoes(soma,[an,n*passo,soma+passo,soma-inicio],s);
  return {text:`Uma PA tem primeiro termo ${inicio}, razão ${passo} e ${n} termos. Qual é a soma desses ${n} termos?`,...r};
}

function questaoD097(level,s){
  const a=1+(s%4), x=2+(s%9), b=2+(s%7), c=a*x+b;
  if(level==="ABAIXO DO BÁSICO"){
    const r=embaralharOpcoes(x,[x+1,x-1,c,b],s);
    return {text:`Se x + ${b} = ${x+b}, qual é o valor de x?`,...r, visual:visualFuncao(1,b)};
  }
  if(level==="BÁSICO"){
    const r=embaralharOpcoes(x,[x+1,x-1,a*x,c-b],s);
    return {text:`Resolva a equação: ${a}x + ${b} = ${c}.`,...r};
  }
  if(level==="PROFICIENTE"){
    const d=1+(s%3);
    const esquerdaA=a+d;
    const direitaConst=esquerdaA*x+b-d*x;
    const r=embaralharOpcoes(x,[x+1,x-1,direitaConst,esquerdaA],s);
    return {text:`Resolva: ${esquerdaA}x + ${b} = ${direitaConst} + ${d}x.`,...r, visual:visualFuncao(a,b)};
  }
  const m=1+(s%3), bb=(s%5)-2, xx=2+(s%5), yy=m*xx+bb;
  const r=embaralharOpcoes(yy,[yy+m,yy-m,m+bb,xx],s);
  return {text:`Considere f(x) = ${m}x ${bb>=0?"+ "+bb:"- "+Math.abs(bb)}. Qual é o valor de f(${xx})?`,...r, visual:visualFuncao(m,bb)};
}

function questaoD111(level,s){
  const variante=s%8;

  if(level==="ABAIXO DO BÁSICO"){
    const casos=[
      {text:"Observe o sólido representado. Quantas faces possui um cubo?", correta:6, dist:[4,5,8,12], visual:visualCubo()},
      {text:"Quantas bases circulares possui um cilindro?", correta:2, dist:[0,1,3,4], visual:visualCilindro()},
      {text:"Um prisma triangular possui quantas bases triangulares?", correta:2, dist:[1,3,4,5]},
      {text:"Uma pirâmide de base quadrada possui quantas bases?", correta:1, dist:[0,2,4,5]}
    ];
    const c=casos[variante%casos.length];
    return {text:c.text,...embaralharOpcoes(c.correta,c.dist,s),visual:c.visual||null};
  }

  if(level==="BÁSICO"){
    const casos=[
      {text:"Qual sólido possui duas bases circulares paralelas e uma superfície lateral curva?", correta:"Cilindro", dist:["Cone","Cubo","Pirâmide","Prisma triangular"], visual:visualCilindro()},
      {text:"Qual sólido possui 6 faces quadradas congruentes?", correta:"Cubo", dist:["Cilindro","Cone","Pirâmide","Prisma triangular"], visual:visualCubo()},
      {text:"Um prisma triangular possui quantas faces ao todo?", correta:5, dist:[4,6,7,8]},
      {text:"Uma pirâmide de base quadrada possui quantas faces ao todo?", correta:5, dist:[4,6,7,8]}
    ];
    const c=casos[variante%casos.length];
    return {text:c.text,...embaralharOpcoes(c.correta,c.dist,s),visual:c.visual||null};
  }

  if(level==="PROFICIENTE"){
    const casos=[
      {text:"Um prisma triangular tem 2 bases triangulares e 3 faces laterais. Quantas faces possui ao todo?", correta:5, dist:[4,6,7,8]},
      {text:"Um prisma retangular possui 6 faces. Quantas dessas faces formam pares de faces opostas?", correta:3, dist:[2,4,5,6]},
      {text:"Na planificação de um cubo, quantos quadrados devem aparecer?", correta:6, dist:[4,5,8,12]},
      {text:"Um cilindro é formado por duas bases circulares e uma superfície lateral. Quantas partes aparecem em sua planificação?", correta:3, dist:[2,4,5,6], visual:visualCilindro()}
    ];
    const c=casos[variante%casos.length];
    return {text:c.text,...embaralharOpcoes(c.correta,c.dist,s),visual:c.visual||null};
  }

  const casos=[
    {text:"Uma pirâmide de base pentagonal possui 1 base e 5 faces laterais. Quantas faces possui ao todo?", correta:6, dist:[5,7,8,10]},
    {text:"Um prisma de base hexagonal possui 2 bases e 6 faces laterais. Quantas faces possui ao todo?", correta:8, dist:[6,7,10,12]},
    {text:"Um poliedro possui 8 faces triangulares. Qual sólido clássico corresponde a essa descrição?", correta:"Octaedro", dist:["Cubo","Tetraedro","Prisma triangular","Pirâmide quadrangular"]},
    {text:"Em um cubo, quantas arestas se encontram em cada vértice?", correta:3, dist:[2,4,6,8], visual:visualCubo()}
  ];
  const c=casos[variante%casos.length];
  return {text:c.text,...embaralharOpcoes(c.correta,c.dist,s),visual:c.visual||null};
}

function questaoD125(level,s){
  const vals=[12+(s%5)*2,18+(s%4)*3,24+(s%3)*4,30+(s%5)*2];
  const total=vals.reduce((a,b)=>a+b,0);
  const maior=Math.max(...vals);
  const indice=vals.indexOf(maior);
  const letras=["A","B","C","D"];
  if(level==="ABAIXO DO BÁSICO"){
    const r=embaralharOpcoes(maior,[...vals.filter(v=>v!==maior),total],s);
    return {text:"Observe o gráfico. Qual é o maior valor apresentado?",...r,visual:visualBarras(...vals)};
  }
  if(level==="BÁSICO"){
    const r=embaralharOpcoes(letras[indice],letras.filter(x=>x!==letras[indice]),s);
    return {text:"Observe o gráfico. Qual categoria apresenta o maior valor?",...r,visual:visualBarras(...vals)};
  }
  if(level==="PROFICIENTE"){
    const dif=Math.max(...vals)-Math.min(...vals);
    const r=embaralharOpcoes(dif,[dif+2,Math.max(0,dif-2),maior,total],s);
    return {text:"No gráfico, qual é a diferença entre o maior e o menor valor?",...r,visual:visualBarras(...vals)};
  }
  const p=Math.round((vals[0]/total)*100);
  const r=embaralharOpcoes(p+"%",[(p+5)+"%",Math.max(0,p-5)+"%",Math.round(vals[1]/total*100)+"%","50%"],s);
  return {text:"Considerando o total das quatro categorias, aproximadamente qual percentual corresponde à categoria A?",...r,visual:visualBarras(...vals)};
}

const GERADORES = {
  D074_M: questaoD074,
  D088_M: questaoD088,
  D097_M: questaoD097,
  D111_M: questaoD111,
  D125_M: questaoD125
};

function construirFilaNiveis(distribuicao, quantidade){
  const ordem=[
    ["ABAIXO DO BÁSICO",Number(distribuicao?.abb ?? 40)],
    ["BÁSICO",Number(distribuicao?.basico ?? 30)],
    ["PROFICIENTE",Number(distribuicao?.proficiente ?? 20)],
    ["AVANÇADO",Number(distribuicao?.avancado ?? 10)]
  ];
  const fila=[];
  ordem.forEach(([nivel,p])=>{
    const n=Math.max(0,Math.round((p/100)*quantidade));
    for(let i=0;i<n;i++) fila.push(nivel);
  });
  while(fila.length<quantidade) fila.push("BÁSICO");
  return fila.slice(0,quantidade);
}

export function gerarQuestoesArena({
  quantidade=15,
  descritores=[],
  configuracaoDescritores={},
  distribuicaoNiveis={abb:40,basico:30,proficiente:20,avancado:10}
}={}){
  quantidade=Math.max(5,Math.min(40,Number(quantidade)||15));
  const cobertos=descritores.filter(d=>GERADORES[d]);
  if(cobertos.length===0){
    throw new Error("Nenhum dos descritores selecionados possui banco de questões cadastrado.");
  }

  const pool=[];
  cobertos.forEach(d=>{
    const peso=Math.max(1,Math.min(4,Number(configuracaoDescritores[d]?.peso||1)));
    for(let i=0;i<peso;i++) pool.push(d);
  });

  const filaNiveis=construirFilaNiveis(distribuicaoNiveis,quantidade);
  const questoes=[];

  for(let i=0;i<quantidade;i++){
    const descriptor=pool[i%pool.length];
    const cfg=configuracaoDescritores[descriptor]||{};
    const nivel=cfg.nivel && cfg.nivel!=="MISTO" ? cfg.nivel : filaNiveis[i];
    const gerada=GERADORES[descriptor](nivel,i+Math.floor(i/pool.length)*7);
    const peso=Math.max(1,Math.min(4,Number(cfg.peso||1)));
    questoes.push({
      id:`${descriptor}-${i+1}-${Date.now().toString(36)}`,
      descriptor,
      level:nivel,
      text:gerada.text,
      options:gerada.options,
      correct:gerada.correct,
      visual:gerada.visual||null,
      pesoDescritor:peso,
      baseXP:Math.round((XP_NIVEL[nivel]||120)*peso)
    });
  }

  return questoes;
}

export function descritoresSemBanco(descritores=[]){
  return descritores.filter(d=>!GERADORES[d]);
}
