// ======================================================
// ARENA MATEMÁTICA — BANCO GERADOR PAEBES 2025 — 3ª SÉRIE
// Questões AUTORAIS e parametrizadas, alinhadas à habilidade oficial.
// Referência de estilo: avaliações externas de larga escala.
// Não copia itens protegidos de provas anteriores.
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

function rot(arr, s=0) {
  const n=((s%arr.length)+arr.length)%arr.length;
  return [...arr.slice(n),...arr.slice(0,n)];
}

function alternativas(correta, distratores, seed=0) {
  const vals=[String(correta),...distratores.map(String)];
  const unicos=[...new Set(vals)];
  const extras=["Nenhuma das alternativas","Não é possível determinar","0","1","2","3","4","5","6","8","10","12"];
  for(const e of extras) if(unicos.length<5 && !unicos.includes(e)) unicos.push(e);
  const arr=rot(unicos.slice(0,5),seed);
  return { options:arr, correct:arr.indexOf(String(correta)) };
}

function svg(conteudo, label="Representação matemática") {
  return `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <rect width="520" height="260" rx="18" fill="#07182d"/>
  ${conteudo}</svg>`;
}

function planoCartesiano(pontos=[], reta=null) {
  let marks="";
  for(let i=-5;i<=5;i++){
    const x=260+i*42, y=130-i*20;
    marks += `<line x1="${x}" y1="126" x2="${x}" y2="134" stroke="#789"/><text x="${x}" y="151" fill="#9db5d1" font-size="11" text-anchor="middle">${i}</text>`;
    if(i!==0) marks += `<line x1="256" y1="${130-i*20}" x2="264" y2="${130-i*20}" stroke="#789"/><text x="247" y="${134-i*20}" fill="#9db5d1" font-size="11" text-anchor="end">${i}</text>`;
  }
  let r="";
  if(reta){
    const pts=[];
    for(let x=-5;x<=5;x++) {
      const y=reta.m*x+reta.b;
      pts.push(`${260+x*42},${130-y*20}`);
    }
    r=`<polyline points="${pts.join(" ")}" fill="none" stroke="#ff6fab" stroke-width="4"/>`;
  }
  const ps=pontos.map(p=>`<circle cx="${260+p.x*42}" cy="${130-p.y*20}" r="6" fill="#22d3ee"/><text x="${270+p.x*42}" y="${122-p.y*20}" fill="#fff" font-size="12">${p.label||""}</text>`).join("");
  return svg(`<line x1="35" y1="130" x2="485" y2="130" stroke="#9db5d1" stroke-width="2"/><line x1="260" y1="20" x2="260" y2="240" stroke="#9db5d1" stroke-width="2"/>${marks}${r}${ps}`,"Plano cartesiano");
}

function graficoBarras(vals, labels=["A","B","C","D"]) {
  const max=Math.max(...vals,1);
  const bars=vals.map((v,i)=>{
    const h=140*v/max, x=75+i*100;
    return `<rect x="${x}" y="${210-h}" width="58" height="${h}" rx="6" fill="#3e8cff"/>
    <text x="${x+29}" y="${198-h}" fill="#fff" text-anchor="middle">${v}</text>
    <text x="${x+29}" y="235" fill="#cbd5e1" text-anchor="middle">${labels[i]}</text>`;
  }).join("");
  return svg(`<line x1="45" y1="210" x2="480" y2="210" stroke="#9db5d1" stroke-width="2"/>${bars}`,"Gráfico de barras");
}

function cuboSvg() {
 return svg(`<g fill="none" stroke="#8bdcff" stroke-width="5" stroke-linejoin="round">
 <path d="M165 65 L285 65 L355 120 L235 120 Z"/><path d="M165 65 L165 175 L235 230 L235 120"/>
 <path d="M235 120 L355 120 L355 230 L235 230 Z"/><path d="M285 65 L285 175 L355 230"/><path d="M165 175 L285 175"/></g>`,"Cubo");
}

function cilindroSvg(){
 return svg(`<ellipse cx="260" cy="55" rx="95" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>
 <path d="M165 55 L165 190 M355 55 L355 190" stroke="#8bdcff" stroke-width="4"/>
 <ellipse cx="260" cy="190" rx="95" ry="28" fill="#17456d" stroke="#8bdcff" stroke-width="4"/>`,"Cilindro");
}

function trianguloSvg(a,b,c, right=true){
 return svg(`<polygon points="120,210 400,210 120,60" fill="rgba(62,140,255,.16)" stroke="#8bdcff" stroke-width="4"/>
 ${right?'<rect x="120" y="190" width="20" height="20" fill="none" stroke="#facc15" stroke-width="3"/>':""}
 <text x="255" y="235" fill="#fff" text-anchor="middle">${a}</text>
 <text x="95" y="140" fill="#fff" text-anchor="middle">${b}</text>
 <text x="285" y="125" fill="#fff" text-anchor="middle">${c}</text>`,"Triângulo");
}

function graficoTrig(tipo="sen") {
 const pts=[];
 for(let i=0;i<=100;i++){
   const x=i/100*4*Math.PI;
   let y=Math.sin(x);
   if(tipo==="cos") y=Math.cos(x);
   if(tipo==="tan") y=Math.max(-3,Math.min(3,Math.tan(x)));
   pts.push(`${40+i*4.4},${130-y*55}`);
 }
 return svg(`<line x1="35" y1="130" x2="485" y2="130" stroke="#9db5d1" stroke-width="2"/>
 <polyline points="${pts.join(" ")}" fill="none" stroke="#ff6fab" stroke-width="4"/>`,"Gráfico trigonométrico");
}

function nivelDelta(level) {
 return { "ABAIXO DO BÁSICO":0, "BÁSICO":1, "PROFICIENTE":2, "AVANÇADO":3 }[level] ?? 1;
}

function gerarPorDescritor(d, level, s) {
  const k=nivelDelta(level);

  switch(d) {
    case "D009_M": {
      const den=[2,4,5,10][s%4], num=1+(s%(den*2-1));
      const v=num/den;
      return {text:`Na reta numérica, qual número racional corresponde ao ponto localizado em ${v}?`,
        ...alternativas(v,[v+0.5,v-0.5,num,den],s)};
    }
    case "D033_M": {
      const n=[2,3,5,7][s%4], raiz=Math.sqrt(n);
      const a=Math.floor(raiz), b=a+1;
      return {text:`Entre quais números inteiros está localizado √${n} na reta numérica?`,
        ...alternativas(`${a} e ${b}`,[`${a-1} e ${a}`,`${b} e ${b+1}`,`0 e 1`,`3 e 4`],s)};
    }
    case "D038_M": {
      const valor=100+(s%6)*50, p=[10,15,20,25,30][s%5];
      const desc=valor*p/100;
      const final=k<2?desc:valor-desc;
      return {text:k<2?`Um produto custa R$ ${valor},00. Qual é ${p}% desse valor?`:`Um produto de R$ ${valor},00 recebeu desconto de ${p}%. Qual é o preço final?`,
        ...alternativas(final,[desc,valor,final+10,Math.max(0,final-10)],s)};
    }
    case "D039_M": {
      const a=2+(s%4), b=3+(s%5), c=a*b;
      return {text:`Se ${a} unidades custam R$ ${c},00, mantendo a proporcionalidade, quanto custam ${a+2} unidades?`,
        ...alternativas((a+2)*b,[c,(a+1)*b,(a+3)*b,b],s)};
    }
    case "D042_M": {
      const cam=2+(s%4), cal=2+((s+1)%4);
      return {text:`Uma pessoa possui ${cam} opções de camisa e ${cal} opções de calça. Quantos conjuntos diferentes pode formar escolhendo uma camisa e uma calça?`,
        ...alternativas(cam*cal,[cam+cal,cam*cal+1,cam*cal-1,cam+cal+1],s)};
    }
    case "D043_M": {
      const x=(s%7)-3, y=((s*2)%7)-3;
      return {text:`Observe o ponto P no plano cartesiano. Quais são suas coordenadas?`,
        ...alternativas(`(${x}, ${y})`,[`(${y}, ${x})`,`(${-x}, ${y})`,`(${x}, ${-y})`,`(${-x}, ${-y})`],s),
        visual:planoCartesiano([{x,y,label:"P"}])};
    }
    case "D049_M": {
      const a=3+(s%3), b=4+(s%3), hip=Math.sqrt(a*a+b*b);
      const h2=Math.round(hip*100)/100;
      return {text:`Em um triângulo retângulo com catetos medindo ${a} cm e ${b} cm, qual é aproximadamente a medida da hipotenusa?`,
        ...alternativas(h2,[a+b,Math.abs(a-b),a*b,Math.round((h2+1)*100)/100],s),visual:trianguloSvg(a,b,"?")};
    }
    case "D051_M": {
      const ang=[30,45,60][s%3];
      const val=ang===30?0.5:ang===45?Math.SQRT1_2:Math.sqrt(3)/2;
      const resp=Math.round(val*100)/100;
      return {text:`Em um triângulo retângulo, o seno de ${ang}° é aproximadamente:`,
        ...alternativas(resp,[Math.round((1-resp)*100)/100,1,0,Math.round(Math.tan(ang*Math.PI/180)*100)/100],s),visual:trianguloSvg("adj.","op.","hip.")};
    }
    case "D057_M": {
      const a=4+(s%6), b=3+(s%5), per=2*(a+b);
      return {text:`Um terreno retangular mede ${a} m por ${b} m. Qual é seu perímetro?`,
        ...alternativas(per,[a*b,a+b,2*a+b,a+2*b],s)};
    }
    case "D058_M": {
      const a=4+(s%6), b=3+(s%5), area=a*b;
      return {text:`Uma região retangular mede ${a} m por ${b} m. Qual é sua área?`,
        ...alternativas(area,[2*(a+b),a+b,area+a,area-b],s)};
    }
    case "D063_M": {
      const vals=[10+s%5,16+s%7,12+s%4,20+s%6];
      const maior=Math.max(...vals), idx=vals.indexOf(maior), lab=["A","B","C","D"][idx];
      return {text:`A tabela informa A=${vals[0]}, B=${vals[1]}, C=${vals[2]} e D=${vals[3]}. No gráfico correspondente, qual categoria deve possuir a barra mais alta?`,
        ...alternativas(lab,["A","B","C","D"].filter(x=>x!==lab),s),visual:graficoBarras(vals)};
    }
    case "D064_M": {
      const vals=[12+s%5,18+s%5,9+s%4,22+s%6], total=vals.reduce((a,b)=>a+b,0);
      return {text:`Observe o gráfico. Qual é a soma dos valores das quatro categorias?`,
        ...alternativas(total,[Math.max(...vals),total-5,total+5,vals[0]+vals[1]],s),visual:graficoBarras(vals)};
    }
    case "D065_M": {
      const total=10+(s%6), fav=2+(s%5);
      const p=`${fav}/${total}`;
      return {text:`Em uma urna há ${total} fichas igualmente prováveis e ${fav} são azuis. Qual é a probabilidade de retirar uma ficha azul?`,
        ...alternativas(p,[`${total-fav}/${total}`,`${fav}/${total-fav}`,`1/${total}`,`1/${fav}`],s)};
    }
    case "D071_M": {
      const m=(s%2===0?1:-1)*(1+(s%3)), b=(s%5)-2;
      const zero=-b/m;
      return {text:`Observe o gráfico da função linear. Qual é o zero da função?`,
        ...alternativas(zero,[b,m,-m,-b],s),visual:planoCartesiano([],{m,b})};
    }
    case "D074_M": {
      const base=[2,3,4][s%3];
      return {text:`Qual expressão representa uma função exponencial de base ${base} e valor inicial 1?`,
        ...alternativas(`f(x) = ${base}^x`,[`f(x) = ${base}x`,`f(x) = x^${base}`,`f(x) = x + ${base}`,`f(x) = ${base}/x`],s)};
    }
    case "D076_M": {
      const r1=1+(s%4), r2=-(2+(s%3));
      return {text:`Quais são as raízes do polinômio fatorado P(x) = (x - ${r1})(x - (${r2}))?`,
        ...alternativas(`${r1} e ${r2}`,[`${-r1} e ${-r2}`,`${r1} e ${-r2}`,`${-r1} e ${r2}`,`0 e ${r1+r2}`],s)};
    }
    case "D078_M": {
      const m=(s%4)+1, b=(s%5)-2;
      return {text:`Observe a reta representada. Qual expressão algébrica corresponde ao gráfico?`,
        ...alternativas(`y = ${m}x ${b>=0?"+ "+b:"- "+Math.abs(b)}`,[`y = ${b}x + ${m}`,`y = ${m+1}x + ${b}`,`y = x + ${b}`,`y = ${m}x`],s),visual:planoCartesiano([],{m,b})};
    }
    case "D080_M": {
      const base=[2,3,10][s%3];
      return {text:`A função inversa de f(x) = ${base}^x é:`,
        ...alternativas(`f⁻¹(x) = log_${base}(x)`,[`f⁻¹(x) = ${base}x`,`f⁻¹(x) = x^${base}`,`f⁻¹(x) = 1/x`,`f⁻¹(x) = ln(${base}x)`],s)};
    }
    case "D082_M": {
      const m=(s%2===0?2:-2);
      const texto=m>0?"A quantidade aumenta de forma constante ao longo do tempo.":"A quantidade diminui de forma constante ao longo do tempo.";
      return {text:`${texto} Qual tipo de gráfico melhor representa a situação?`,
        ...alternativas(m>0?"Reta crescente":"Reta decrescente",["Reta horizontal",m>0?"Reta decrescente":"Reta crescente","Parábola","Gráfico sem tendência"],s),visual:planoCartesiano([],{m,b:0})};
    }
    case "D085_M": {
      const m=(s%4)-2 || 1, b=(s%7)-3;
      return {text:`Na equação y = ${m}x ${b>=0?"+ "+b:"- "+Math.abs(b)}, o coeficiente angular da reta é:`,
        ...alternativas(m,[b,-m,-b,m+b],s),visual:planoCartesiano([],{m,b})};
    }
    case "D086_M": {
      const m=2+(s%3), b=1+(s%4);
      const xs=[0,1,2], ys=xs.map(x=>m*x+b);
      return {text:`Uma tabela apresenta x = 0, 1, 2 e y = ${ys.join(", ")}. Qual função representa essa relação?`,
        ...alternativas(`y = ${m}x + ${b}`,[`y = ${b}x + ${m}`,`y = ${m+1}x + ${b}`,`y = x + ${b}`,`y = ${m}x`],s)};
    }
    case "D087_M": {
      const r1=1+(s%4), r2=2+(s%5), B=-(r1+r2), C=r1*r2;
      return {text:`Quais são as soluções de x² ${B>=0?"+ "+B:"- "+Math.abs(B)}x + ${C} = 0?`,
        ...alternativas(`${r1} e ${r2}`,[`${-r1} e ${-r2}`,`${r1} e ${-r2}`,`0 e ${C}`,`${r1+r2} e ${C}`],s)};
    }
    case "D088_M": {
      const inicial=100*(1+(s%3)), taxa=[2,3][s%2], t=2+(s%3), final=inicial*Math.pow(taxa,t);
      return {text:`Uma população de ${inicial} organismos multiplica-se por ${taxa} a cada período. Quantos organismos haverá após ${t} períodos?`,
        ...alternativas(final,[inicial*taxa*t,inicial+taxa*t,final/taxa,final+inicial],s)};
    }
    case "D096_M": {
      const a1=2+(s%5), r=2+(s%4), n=5+(s%5), an=a1+(n-1)*r;
      return {text:`Uma PA tem primeiro termo ${a1} e razão ${r}. Qual é o ${n}º termo?`,
        ...alternativas(an,[a1+n*r,an+r,an-r,n*r],s)};
    }
    case "D097_M": {
      const a1=2+(s%3), q=2+(s%2), n=4+(s%3), an=a1*Math.pow(q,n-1);
      return {text:`Uma PG tem primeiro termo ${a1} e razão ${q}. Qual é o ${n}º termo?`,
        ...alternativas(an,[a1*q*n,an/q,an+q,a1+(n-1)*q],s)};
    }
    case "D111_M": {
      const casos=[
        ["Quantas faces possui um cubo?",6,[4,5,8,12],cuboSvg()],
        ["Qual sólido possui duas bases circulares paralelas e superfície lateral curva?","Cilindro",["Cone","Cubo","Pirâmide","Prisma"],cilindroSvg()],
        ["Quantas faces possui um prisma triangular?",5,[4,6,7,8],null],
        ["Uma pirâmide de base quadrada possui quantas faces?",5,[4,6,7,8],null]
      ];
      const c=casos[s%casos.length];
      return {text:c[0],...alternativas(c[1],c[2],s),visual:c[3]};
    }
    case "D119_M": {
      const a=3+(s%4), b=4+(s%4), k=2+(s%3);
      return {text:`Dois triângulos semelhantes têm lados correspondentes ${a} e ${a*k}. Se outro lado do menor mede ${b}, quanto mede o correspondente no maior?`,
        ...alternativas(b*k,[b+k,b*k+k,b*k-k,a*k],s)};
    }
    case "D124_M": {
      const m=1+(s%4), x1=1+(s%3), y1=2+(s%4), b=y1-m*x1;
      const eq=`y = ${m}x ${b>=0?"+ "+b:"- "+Math.abs(b)}`;
      return {text:`Uma reta passa pelo ponto (${x1}, ${y1}) e possui inclinação ${m}. Qual é sua equação?`,
        ...alternativas(eq,[`y = ${x1}x + ${y1}`,`y = ${m+1}x + ${b}`,`y = ${m}x + ${y1}`,`y = x + ${b}`],s),visual:planoCartesiano([],{m,b})};
    }
    case "D125_M": {
      const casos=[
        ["Um cubo possui 8 vértices e 6 faces. Quantas arestas possui?",12,[10,14,8,6]],
        ["Um tetraedro possui 4 vértices e 4 faces. Quantas arestas possui?",6,[4,8,10,12]],
        ["Usando V - A + F = 2, se V=6 e F=5, qual é A?",9,[7,8,10,11]]
      ];
      const c=casos[s%casos.length];
      return {text:c[0],...alternativas(c[1],c[2],s),visual:s%3===0?cuboSvg():null};
    }
    case "D126_M": {
      const tipo=["sen","cos","tan"][s%3], nome={sen:"seno",cos:"cosseno",tan:"tangente"}[tipo];
      return {text:`O gráfico apresentado corresponde a qual função trigonométrica?`,
        ...alternativas(nome,["seno","cosseno","tangente","função linear"].filter(x=>x!==nome),s),visual:graficoTrig(tipo)};
    }
    case "D127_M": {
      const x=1+(s%4), y=2+(s%4);
      const c1=x+y, c2=2*x-y;
      return {text:`O sistema x + y = ${c1} e 2x - y = ${c2} possui qual solução?`,
        ...alternativas(`(${x}, ${y})`,[`(${y}, ${x})`,`(${-x}, ${y})`,`(${x}, ${-y})`,`(${c1}, ${c2})`],s),visual:planoCartesiano([{x,y,label:"P"}])};
    }
    case "D129_M": {
      const r=2+(s%4), h=3+(s%5);
      if(s%2===0){
        const v=Math.round(Math.PI*r*r*h*100)/100;
        return {text:`Um cilindro tem raio ${r} cm e altura ${h} cm. Qual é aproximadamente seu volume? Use π ≈ 3,14.`,
          ...alternativas(Math.round(3.14*r*r*h*100)/100,[r*r*h,2*3.14*r*h,3.14*r*h,Math.round(3.14*r*r*(h+1)*100)/100],s),visual:cilindroSvg()};
      }
      const a=2+(s%5), vol=a*a*a;
      return {text:`Um cubo possui aresta de ${a} cm. Qual é seu volume?`,
        ...alternativas(vol,[6*a*a,a*a,12*a,a*a*a+a],s),visual:cuboSvg()};
    }
    case "D132_M": {
      const tarifa=5+(s%5), taxa=10+(s%5), x=3+(s%6), total=taxa+tarifa*x;
      return {text:`Um serviço cobra taxa fixa de R$ ${taxa},00 mais R$ ${tarifa},00 por unidade. Qual será o custo para ${x} unidades?`,
        ...alternativas(total,[tarifa*x,taxa*x,total+tarifa,total-tarifa],s)};
    }
    case "D133_M": {
      const h=2+(s%4), k=5+(s%6);
      return {text:`A função f(x) = (x - ${h})² + ${k} possui valor mínimo igual a:`,
        ...alternativas(k,[h,h+k,k-h,0],s)};
    }
    case "D145_M": {
      const m=(s%4)+1,b=(s%5)-2;
      return {text:`Considere f(x) = ${m}x ${b>=0?"+ "+b:"- "+Math.abs(b)}. Qual gráfico corresponde a essa função?`,
        ...alternativas(`Reta com inclinação ${m} e intercepto ${b}`,[`Reta com inclinação ${b} e intercepto ${m}`,`Parábola com vértice (${m},${b})`,`Reta horizontal em y=${b}`,`Função exponencial de base ${m}`],s),visual:planoCartesiano([],{m,b})};
    }
  }
  throw new Error(`Descritor ${d} sem gerador.`);
}

function construirFilaNiveis(distribuicao, quantidade) {
  const pares=[
    ["ABAIXO DO BÁSICO",Number(distribuicao?.abb ?? 40)],
    ["BÁSICO",Number(distribuicao?.basico ?? 30)],
    ["PROFICIENTE",Number(distribuicao?.proficiente ?? 20)],
    ["AVANÇADO",Number(distribuicao?.avancado ?? 10)]
  ];
  const fila=[];
  let usados=0;
  pares.forEach(([nivel,p],idx)=>{
    const n=idx===pares.length-1 ? quantidade-usados : Math.round(quantidade*p/100);
    for(let i=0;i<Math.max(0,n);i++) fila.push(nivel);
    usados=fila.length;
  });
  while(fila.length<quantidade) fila.push("BÁSICO");
  return fila.slice(0,quantidade);
}

export function habilidadeDoDescritor(descritor) {
  return HABILIDADES_PAEBES[descritor] || "";
}

export function gerarQuestaoDescritor(descritor, nivel="BÁSICO", seed=1) {
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
}={}) {
  quantidade=Math.max(5,Math.min(40,Number(quantidade)||15));
  const validos=descritores.filter(d=>HABILIDADES_PAEBES[d]);
  if(validos.length===0) throw new Error("Selecione pelo menos um descritor da matriz PAEBES 2025.");

  const pool=[];
  validos.forEach(d=>{
    const peso=Math.max(1,Math.min(4,Number(configuracaoDescritores[d]?.peso||1)));
    for(let i=0;i<peso;i++) pool.push(d);
  });

  const niveis=construirFilaNiveis(distribuicaoNiveis,quantidade);
  const questoes=[];

  for(let i=0;i<quantidade;i++){
    const descriptor=pool[i%pool.length];
    const cfg=configuracaoDescritores[descriptor]||{};
    const nivel=cfg.nivel && cfg.nivel!=="MISTO" ? cfg.nivel : niveis[i];
    const gerada=gerarPorDescritor(descriptor,nivel,i+1+Math.floor(i/pool.length)*13);
    const peso=Math.max(1,Math.min(4,Number(cfg.peso||1)));
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

export function descritoresSemBanco(descritores=[]) {
  return descritores.filter(d=>!HABILIDADES_PAEBES[d]);
}
