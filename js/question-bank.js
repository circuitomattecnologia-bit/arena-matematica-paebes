// ======================================================
// ARENA MATEMÁTICA — BANCO DE QUESTÕES
// RUMO AO PAEBES
// 3ª SÉRIE DO ENSINO MÉDIO
//
// VERSÃO FORTALECIDA
// - 35 descritores
// - níveis ABB / Básico / Proficiente / Avançado
// - questões parametrizadas
// - imagens SVG
// - rotação entre Arenas
// - bloqueio de questões repetidas na mesma Arena
// - validação de alternativas
// ======================================================


// ======================================================
// HABILIDADES
// ======================================================

export const HABILIDADES_PAEBES = {

  "D009_M":
    "Corresponder pontos da reta numérica a números racionais.",

  "D033_M":
    "Identificar a localização de números irracionais na reta numérica.",

  "D038_M":
    "Utilizar porcentagem na resolução de problemas.",

  "D039_M":
    "Utilizar proporcionalidade entre duas grandezas na resolução de problema.",

  "D042_M":
    "Utilizar o princípio multiplicativo de contagem na resolução de problema.",

  "D043_M":
    "Identificar a localização de pontos no plano cartesiano.",

  "D049_M":
    "Utilizar relações métricas em um triângulo retângulo na resolução de problemas.",

  "D051_M":
    "Resolver problema que envolva razões trigonométricas no triângulo retângulo.",

  "D057_M":
    "Utilizar o perímetro de uma figura bidimensional na resolução de problema.",

  "D058_M":
    "Utilizar área de figuras bidimensionais na resolução de problema.",

  "D063_M":
    "Corresponder listas e/ou tabelas simples aos gráficos que as representam.",

  "D064_M":
    "Utilizar informações apresentadas em tabelas ou gráficos na resolução de problemas.",

  "D065_M":
    "Resolver problema envolvendo noções de probabilidade.",

  "D071_M":
    "Analisar crescimento, decrescimento e zeros de funções apresentadas em gráficos.",

  "D074_M":
    "Corresponder as representações algébrica e gráfica de uma função exponencial.",

  "D076_M":
    "Corresponder um polinômio fatorado às suas raízes.",

  "D078_M":
    "Corresponder uma função polinomial do 1º grau a seu gráfico.",

  "D080_M":
    "Identificar representação algébrica e gráfica de uma função logarítmica.",

  "D082_M":
    "Identificar o gráfico que representa uma situação descrita em um texto.",

  "D085_M":
    "Interpretar geometricamente os coeficientes da equação de uma reta.",

  "D086_M":
    "Reconhecer expressão algébrica que representa uma função a partir de uma tabela.",

  "D087_M":
    "Resolver problema envolvendo equação do 2º grau.",

  "D088_M":
    "Utilizar função exponencial na resolução de problemas.",

  "D096_M":
    "Utilizar propriedades de progressões aritméticas na resolução de problemas.",

  "D097_M":
    "Utilizar propriedades de progressões geométricas na resolução de problemas.",

  "D111_M":
    "Relacionar diferentes poliedros ou corpos redondos com suas planificações ou vistas.",

  "D119_M":
    "Identificar triângulos semelhantes mediante relações de proporcionalidade.",

  "D124_M":
    "Identificar a equação de uma reta a partir de pontos ou inclinação.",

  "D125_M":
    "Identificar a relação entre vértices, faces e arestas de poliedros.",

  "D126_M":
    "Identificar gráficos de funções trigonométricas.",

  "D127_M":
    "Relacionar a intersecção de retas à resolução de sistemas de equações.",

  "D129_M":
    "Resolver problema envolvendo área total e/ou volume de um sólido.",

  "D132_M":
    "Resolver problema envolvendo uma função do 1º grau.",

  "D133_M":
    "Resolver problemas envolvendo máximo ou mínimo de função do 2º grau.",

  "D145_M":
    "Reconhecer o gráfico de uma função polinomial de primeiro grau por meio de seus coeficientes."

};


export const DESCRITORES_COM_BANCO =
  Object.keys(HABILIDADES_PAEBES);


export const NIVEIS = [
  "ABAIXO DO BÁSICO",
  "BÁSICO",
  "PROFICIENTE",
  "AVANÇADO"
];


// ======================================================
// XP
// ======================================================

const XP_NIVEL = {

  "ABAIXO DO BÁSICO": 100,

  "BÁSICO": 120,

  "PROFICIENTE": 180,

  "AVANÇADO": 240

};


// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function clamp(n, min, max) {

  return Math.max(
    min,
    Math.min(max, n)
  );

}


function fmt(n) {

  if (Number.isInteger(n)) {
    return String(n);
  }

  return String(
    Math.round(n * 100) / 100
  ).replace(".", ",");

}


function pick(lista, seed = 0) {

  if (!Array.isArray(lista) || !lista.length) {
    return null;
  }

  return lista[
    Math.abs(seed) % lista.length
  ];

}


function embaralhar(lista, seed = 1) {

  const arr = [...lista];

  let s =
    Math.abs(Number(seed) || 1);

  for (
    let i = arr.length - 1;
    i > 0;
    i--
  ) {

    s =
      (s * 9301 + 49297) %
      233280;

    const j =
      Math.floor(
        (s / 233280) *
        (i + 1)
      );

    [
      arr[i],
      arr[j]
    ] = [
      arr[j],
      arr[i]
    ];

  }

  return arr;

}


function normalizarTexto(valor = "") {

  return String(valor)

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

    .trim()

    .replace(
      /\s+/g,
      " "
    );

}


// ======================================================
// ALTERNATIVAS
// ======================================================

function montarAlternativas(
  correta,
  distratores = [],
  seed = 1
) {

  const resposta =
    String(correta);

  const valores = [
    resposta,
    ...distratores.map(String)
  ];

  const unicos = [];

  for (const valor of valores) {

    if (
      !unicos.includes(valor)
    ) {

      unicos.push(valor);

    }

  }

  const extras = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "8",
    "10",
    "12",
    "15",
    "20",
    "25",
    "30"
  ];

  for (const extra of extras) {

    if (
      unicos.length >= 5
    ) {
      break;
    }

    if (
      !unicos.includes(extra)
    ) {

      unicos.push(extra);

    }

  }

  const selecionadas =
    embaralhar(
      unicos.slice(0, 5),
      seed
    );

  return {

    options:
      selecionadas,

    correct:
      selecionadas.indexOf(
        resposta
      )

  };

}


// ======================================================
// SVG
// ======================================================

function svg(
  conteudo,
  label =
    "Representação matemática"
) {

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

    ${conteudo}

  </svg>
  `;

}


// ======================================================
// PLANO CARTESIANO
// ======================================================

function planoCartesiano({
  pontos = [],
  reta = null,
  parabola = null,
  expo = null
} = {}) {

  let conteudo = "";

  for (
    let i = -5;
    i <= 5;
    i++
  ) {

    const x =
      260 + i * 42;

    const y =
      140 - i * 22;

    conteudo += `
      <line
        x1="${x}"
        y1="20"
        x2="${x}"
        y2="255"
        stroke="#12304d"
        stroke-width="1"
      />

      <line
        x1="35"
        y1="${y}"
        x2="485"
        y2="${y}"
        stroke="#12304d"
        stroke-width="1"
      />
    `;

  }


  conteudo += `

    <line
      x1="35"
      y1="140"
      x2="485"
      y2="140"
      stroke="#cbd5e1"
      stroke-width="2"
    />

    <line
      x1="260"
      y1="20"
      x2="260"
      y2="255"
      stroke="#cbd5e1"
      stroke-width="2"
    />

  `;


  if (reta) {

    const pontosLinha = [];

    for (
      let x = -5;
      x <= 5;
      x += 0.25
    ) {

      const y =
        reta.m * x +
        reta.b;

      pontosLinha.push(
        `${260 + x * 42},${140 - y * 22}`
      );

    }

    conteudo += `
      <polyline
        points="${pontosLinha.join(" ")}"
        fill="none"
        stroke="#ff6fab"
        stroke-width="4"
      />
    `;

  }


  if (parabola) {

    const pontosLinha = [];

    for (
      let x = -5;
      x <= 5;
      x += 0.12
    ) {

      const y =
        parabola.a *
        (x - parabola.h) *
        (x - parabola.h) +
        parabola.k;

      pontosLinha.push(
        `${260 + x * 42},${140 - y * 22}`
      );

    }

    conteudo += `
      <polyline
        points="${pontosLinha.join(" ")}"
        fill="none"
        stroke="#ff6fab"
        stroke-width="4"
      />
    `;

  }


  if (expo) {

    const pontosLinha = [];

    for (
      let x = -4;
      x <= 4;
      x += 0.12
    ) {

      const y =
        expo.c *
        Math.pow(
          expo.base,
          x
        );

      if (
        y > -5 &&
        y < 7
      ) {

        pontosLinha.push(
          `${260 + x * 42},${140 - y * 22}`
        );

      }

    }

    conteudo += `
      <polyline
        points="${pontosLinha.join(" ")}"
        fill="none"
        stroke="#ff6fab"
        stroke-width="4"
      />
    `;

  }


  for (const p of pontos) {

    conteudo += `

      <circle
        cx="${260 + p.x * 42}"
        cy="${140 - p.y * 22}"
        r="6"
        fill="#22d3ee"
      />

      <text
        x="${270 + p.x * 42}"
        y="${132 - p.y * 22}"
        fill="#ffffff"
        font-size="13"
      >
        ${p.label || ""}
      </text>

    `;

  }


  return svg(
    conteudo,
    "Plano cartesiano"
  );

}


// ======================================================
// GRÁFICO DE BARRAS
// ======================================================

function graficoBarras(
  valores,
  labels =
    ["A", "B", "C", "D"],
  titulo = ""
) {

  const max =
    Math.max(
      ...valores,
      1
    );

  let conteudo = `

    <text
      x="260"
      y="28"
      fill="#ffffff"
      font-size="16"
      text-anchor="middle"
    >
      ${titulo}
    </text>

    <line
      x1="40"
      y1="220"
      x2="480"
      y2="220"
      stroke="#9db5d1"
      stroke-width="2"
    />

  `;


  valores.forEach(
    (valor, i) => {

      const altura =
        145 *
        valor /
        max;

      const x =
        70 +
        i * 105;

      conteudo += `

        <rect
          x="${x}"
          y="${220 - altura}"
          width="60"
          height="${altura}"
          rx="5"
          fill="#3e8cff"
        />

        <text
          x="${x + 30}"
          y="${207 - altura}"
          fill="#ffffff"
          font-size="13"
          text-anchor="middle"
        >
          ${valor}
        </text>

        <text
          x="${x + 30}"
          y="245"
          fill="#cbd5e1"
          font-size="12"
          text-anchor="middle"
        >
          ${labels[i]}
        </text>

      `;

    }
  );


  return svg(
    conteudo,
    "Gráfico de barras"
  );

}


// ======================================================
// TABELA
// ======================================================

function tabelaSvg(
  headers,
  rows
) {

  const cols =
    headers.length;

  const largura =
    440 / cols;

  let conteudo = "";


  headers.forEach(
    (h, i) => {

      conteudo += `

        <rect
          x="${40 + i * largura}"
          y="45"
          width="${largura}"
          height="42"
          fill="#12385a"
          stroke="#8bdcff"
        />

        <text
          x="${40 + i * largura + largura / 2}"
          y="72"
          fill="#ffffff"
          font-size="13"
          text-anchor="middle"
        >
          ${h}
        </text>

      `;

    }
  );


  rows.forEach(
    (linha, r) => {

      linha.forEach(
        (valor, c) => {

          conteudo += `

            <rect
              x="${40 + c * largura}"
              y="${87 + r * 42}"
              width="${largura}"
              height="42"
              fill="#0d2743"
              stroke="#2b5b7a"
            />

            <text
              x="${40 + c * largura + largura / 2}"
              y="${114 + r * 42}"
              fill="#dcecff"
              font-size="13"
              text-anchor="middle"
            >
              ${valor}
            </text>

          `;

        }
      );

    }
  );


  return svg(
    conteudo,
    "Tabela"
  );

}


// ======================================================
// GEOMETRIA ESPACIAL
// ======================================================

function cuboSvg() {

  return svg(`

    <g
      fill="none"
      stroke="#8bdcff"
      stroke-width="5"
      stroke-linejoin="round"
    >

      <path
        d="M150 65 L285 65 L365 125 L230 125 Z"
      />

      <path
        d="M150 65 L150 185 L230 245 L230 125"
      />

      <path
        d="M230 125 L365 125 L365 245 L230 245 Z"
      />

      <path
        d="M285 65 L285 185 L365 245"
      />

      <path
        d="M150 185 L285 185"
      />

    </g>

  `, "Cubo");

}


function cilindroSvg() {

  return svg(`

    <ellipse
      cx="260"
      cy="62"
      rx="95"
      ry="28"
      fill="#17456d"
      stroke="#8bdcff"
      stroke-width="4"
    />

    <path
      d="M165 62 L165 205 M355 62 L355 205"
      stroke="#8bdcff"
      stroke-width="4"
    />

    <ellipse
      cx="260"
      cy="205"
      rx="95"
      ry="28"
      fill="#17456d"
      stroke="#8bdcff"
      stroke-width="4"
    />

  `, "Cilindro");

}


function planificacaoCuboSvg() {

  const quadrado =
    (x, y) => `
      <rect
        x="${x}"
        y="${y}"
        width="58"
        height="58"
        fill="#17456d"
        stroke="#8bdcff"
        stroke-width="3"
      />
    `;

  return svg(

    quadrado(202, 42) +

    quadrado(144, 100) +

    quadrado(202, 100) +

    quadrado(260, 100) +

    quadrado(318, 100) +

    quadrado(202, 158),

    "Planificação de cubo"

  );

}


// ======================================================
// TRIÂNGULO
// ======================================================

function trianguloSvg(
  a,
  b,
  c
) {

  return svg(`

    <polygon
      points="120,220 410,220 120,60"
      fill="rgba(62,140,255,.16)"
      stroke="#8bdcff"
      stroke-width="4"
    />

    <rect
      x="120"
      y="198"
      width="22"
      height="22"
      fill="none"
      stroke="#facc15"
      stroke-width="3"
    />

    <text
      x="265"
      y="246"
      fill="#ffffff"
      text-anchor="middle"
    >
      ${a}
    </text>

    <text
      x="93"
      y="145"
      fill="#ffffff"
      text-anchor="middle"
    >
      ${b}
    </text>

    <text
      x="290"
      y="130"
      fill="#ffffff"
      text-anchor="middle"
    >
      ${c}
    </text>

  `, "Triângulo retângulo");

}


// ======================================================
// FORMATAÇÃO DA QUESTÃO
// ======================================================

function formatarQuestaoMatematica(
  questao
) {

  if (!questao) {

    throw new Error(
      "Não foi possível gerar a questão."
    );

  }

  const options =
    Array.isArray(
      questao.options
    )
      ? questao.options.map(String)
      : [];


  if (
    options.length < 2
  ) {

    throw new Error(
      "Questão gerada sem alternativas válidas."
    );

  }


  let correct =
    Number(
      questao.correct
    );


  if (
    !Number.isInteger(correct) ||
    correct < 0 ||
    correct >= options.length
  ) {

    correct = 0;

  }


  return {

    ...questao,

    text:
      String(
        questao.text || ""
      ).trim(),

    options,

    correct

  };

}


// ======================================================
// GERADORES POR DESCRITOR
// ======================================================

function gerarPorDescritor(
  descriptor,
  level,
  seed,
  variante = 0
) {

  const s =
    Math.abs(
      Number(seed) || 1
    );

  const k =
    Math.abs(
      Number(variante) || 0
    ) % 8;


  // ====================================================
  // D009
  // ====================================================

  if (descriptor === "D009_M") {

    const denominador =
      pick(
        [2, 4, 5, 10],
        s
      );

    const numerador =
      1 +
      (
        s %
        (
          denominador *
          3
        )
      );

    const valor =
      numerador /
      denominador;

    return {

      modeloId:
        `reta-racional-${k}`,

      text:
        `Na reta numérica, qual número corresponde ao ponto localizado em ${fmt(valor)}?`,

      ...montarAlternativas(
        fmt(valor),
        [
          fmt(valor + 1),
          fmt(valor - 1),
          fmt(numerador + denominador),
          fmt(
            denominador /
            numerador
          )
        ],
        s
      )

    };

  }


  // ====================================================
  // D033
  // ====================================================

  if (descriptor === "D033_M") {

    const n =
      pick(
        [2, 3, 5, 7, 8, 10],
        s
      );

    const raiz =
      Math.sqrt(n);

    return {

      modeloId:
        `irracional-${n}-${k}`,

      text:
        `Entre quais números inteiros consecutivos está localizado √${n}?`,

      ...montarAlternativas(
        `${Math.floor(raiz)} e ${Math.ceil(raiz)}`,
        [
          "0 e 1",
          "1 e 2",
          "2 e 3",
          "3 e 4"
        ],
        s
      )

    };

  }


  // ====================================================
  // D038
  // ====================================================

  if (descriptor === "D038_M") {

    const preco =
      80 +
      (
        s % 9
      ) * 20;

    const percentual =
      pick(
        [10, 15, 20, 25, 30],
        s + k
      );

    const desconto =
      preco *
      percentual /
      100;

    return {

      modeloId:
        `porcentagem-${k}`,

      text:
        `Um produto custa R$ ${preco}. Em uma promoção, recebe desconto de ${percentual}%. Qual é o valor do desconto?`,

      ...montarAlternativas(
        fmt(desconto),
        [
          fmt(
            preco - desconto
          ),
          fmt(
            desconto + 10
          ),
          fmt(
            preco *
            percentual /
            10
          ),
          fmt(percentual)
        ],
        s
      )

    };

  }


  // ====================================================
  // D039
  // ====================================================

  if (descriptor === "D039_M") {

    const pessoas =
      2 +
      s % 5;

    const quantidade =
      4 +
      s % 7;

    const novasPessoas =
      pessoas +
      2;

    const resultado =
      quantidade *
      novasPessoas /
      pessoas;

    return {

      modeloId:
        `proporcao-${k}`,

      text:
        `${pessoas} pessoas utilizam ${quantidade} litros de uma bebida em determinada atividade. Mantendo a mesma proporção, quantos litros serão necessários para ${novasPessoas} pessoas?`,

      ...montarAlternativas(
        fmt(resultado),
        [
          fmt(
            quantidade + 2
          ),
          fmt(
            quantidade *
            pessoas
          ),
          fmt(
            resultado + 2
          ),
          fmt(
            resultado - 2
          )
        ],
        s
      )

    };

  }


  // ====================================================
  // D042
  // ====================================================

  if (descriptor === "D042_M") {

    const camisas =
      3 +
      s % 4;

    const calcas =
      2 +
      (
        s + k
      ) % 4;

    const total =
      camisas *
      calcas;

    return {

      modeloId:
        `contagem-${k}`,

      text:
        `Uma pessoa possui ${camisas} camisas diferentes e ${calcas} calças diferentes. Quantos conjuntos distintos pode formar escolhendo uma camisa e uma calça?`,

      ...montarAlternativas(
        total,
        [
          camisas + calcas,
          total + 2,
          total - 2,
          camisas * 2
        ],
        s
      )

    };

  }


  // ====================================================
  // D043
  // ====================================================

  if (descriptor === "D043_M") {

    const x =
      -4 +
      s % 9;

    const y =
      -4 +
      (
        s * 3
      ) % 9;

    return {

      modeloId:
        `plano-ponto-${x}-${y}-${k}`,

      text:
        `Observe o ponto A representado no plano cartesiano. Quais são suas coordenadas?`,

      ...montarAlternativas(
        `(${x}, ${y})`,
        [
          `(${y}, ${x})`,
          `(${-x}, ${y})`,
          `(${x}, ${-y})`,
          `(${-x}, ${-y})`
        ],
        s
      ),

      visual:
        planoCartesiano({
          pontos: [
            {
              x,
              y,
              label:
                "A"
            }
          ]
        })

    };

  }


  // ====================================================
  // D049
  // ====================================================

  if (descriptor === "D049_M") {

    const a =
      pick(
        [3, 5, 6, 8, 9],
        s
      );

    const b =
      pick(
        [4, 12, 8, 15],
        s + k
      );

    const h =
      Math.sqrt(
        a * a +
        b * b
      );

    return {

      modeloId:
        `pitagoras-${k}`,

      text:
        `Um triângulo retângulo possui catetos medindo ${a} cm e ${b} cm. Qual é aproximadamente a medida da hipotenusa?`,

      ...montarAlternativas(
        fmt(h),
        [
          fmt(a + b),
          fmt(
            a * b
          ),
          fmt(
            Math.abs(a - b)
          ),
          fmt(
            h + 2
          )
        ],
        s
      ),

      visual:
        trianguloSvg(
          a,
          b,
          "?"
        )

    };

  }


  // ====================================================
  // D051
  // ====================================================

  if (descriptor === "D051_M") {

    const angulo =
      pick(
        [30, 45, 60],
        s
      );

    const hip =
      10 +
      (
        s % 4
      ) * 2;

    const seno =
      angulo === 30
        ? 0.5
        : angulo === 45
          ? Math.SQRT1_2
          : Math.sqrt(3) / 2;

    const oposto =
      hip *
      seno;

    return {

      modeloId:
        `trigonometria-${angulo}-${k}`,

      text:
        `Em um triângulo retângulo, a hipotenusa mede ${hip} cm e um ângulo agudo mede ${angulo}°. Qual é aproximadamente a medida do cateto oposto a esse ângulo?`,

      ...montarAlternativas(
        fmt(oposto),
        [
          fmt(
            hip *
            (1 - seno)
          ),
          fmt(hip),
          fmt(
            oposto + 2
          ),
          fmt(
            Math.max(
              1,
              oposto - 2
            )
          )
        ],
        s
      ),

      visual:
        trianguloSvg(
          "adj.",
          "?",
          hip
        )

    };

  }


  // ====================================================
  // D057
  // ====================================================

  if (descriptor === "D057_M") {

    const a =
      5 +
      s % 8;

    const b =
      3 +
      (
        s + k
      ) % 6;

    const perimetro =
      2 *
      (a + b);

    return {

      modeloId:
        `perimetro-${k}`,

      text:
        `Um terreno retangular mede ${a} m de comprimento e ${b} m de largura. Quantos metros de cerca são necessários para contornar todo o terreno?`,

      ...montarAlternativas(
        perimetro,
        [
          a * b,
          a + b,
          2 * a + b,
          a + 2 * b
        ],
        s
      )

    };

  }


  // ====================================================
  // D058
  // ====================================================

  if (descriptor === "D058_M") {

    const a =
      6 +
      s % 7;

    const b =
      4 +
      (
        s + k
      ) % 6;

    const area =
      a * b;

    return {

      modeloId:
        `area-retangulo-${k}`,

      text:
        `O piso retangular de uma sala mede ${a} m por ${b} m. Qual é a área desse piso?`,

      ...montarAlternativas(
        `${area} m²`,
        [
          `${2 * (a + b)} m²`,
          `${a + b} m²`,
          `${area + a} m²`,
          `${area - b} m²`
        ],
        s
      )

    };

  }


  // ====================================================
  // D063
  // ====================================================

  if (descriptor === "D063_M") {

    const valores = [
      10 + s % 8,
      12 + (s * 2) % 10,
      8 + (s * 3) % 12,
      14 + (s * 4) % 10
    ];

    const maior =
      Math.max(...valores);

    const indice =
      valores.indexOf(maior);

    const nomes =
      ["A", "B", "C", "D"];

    return {

      modeloId:
        `grafico-correspondencia-${k}`,

      text:
        `Observe o gráfico. Qual categoria apresenta o maior valor?`,

      ...montarAlternativas(
        nomes[indice],
        nomes.filter(
          nome =>
            nome !==
            nomes[indice]
        ),
        s
      ),

      visual:
        graficoBarras(
          valores,
          nomes,
          "Resultados"
        )

    };

  }


  // ====================================================
  // D064
  // ====================================================

  if (descriptor === "D064_M") {

    const valores = [
      12 + s % 8,
      18 + (s + 2) % 8,
      10 + (s + 4) % 8,
      22 + (s + 6) % 8
    ];

    const soma =
      valores.reduce(
        (a, b) =>
          a + b,
        0
      );

    return {

      modeloId:
        `grafico-informacao-${k}`,

      text:
        `O gráfico mostra a quantidade registrada em quatro grupos. Qual é o total dos quatro grupos?`,

      ...montarAlternativas(
        soma,
        [
          soma - 10,
          soma + 10,
          Math.max(...valores),
          valores[0] + valores[1]
        ],
        s
      ),

      visual:
        graficoBarras(
          valores,
          ["A", "B", "C", "D"],
          "Quantidade por grupo"
        )

    };

  }


  // ====================================================
  // D065
  // ====================================================

  if (descriptor === "D065_M") {

    const vermelhas =
      2 +
      s % 5;

    const azuis =
      3 +
      (
        s + k
      ) % 5;

    const total =
      vermelhas +
      azuis;

    return {

      modeloId:
        `probabilidade-${k}`,

      text:
        `Uma urna contém ${vermelhas} bolas vermelhas e ${azuis} bolas azuis. Ao retirar uma bola ao acaso, qual é a probabilidade de ela ser vermelha?`,

      ...montarAlternativas(
        `${vermelhas}/${total}`,
        [
          `${azuis}/${total}`,
          `${vermelhas}/${azuis}`,
          `${total}/${vermelhas}`,
          `1/${total}`
        ],
        s
      )

    };

  }


  // ====================================================
  // D071
  // ====================================================

  if (descriptor === "D071_M") {

    const m =
      pick(
        [-2, -1, 1, 2],
        s
      );

    const b =
      -2 +
      (
        s + k
      ) % 5;

    const comportamento =
      m > 0
        ? "crescente"
        : "decrescente";

    return {

      modeloId:
        `crescimento-${m}-${b}-${k}`,

      text:
        `Observe o gráfico da função representada. A função é:`,

      ...montarAlternativas(
        comportamento,
        [
          m > 0
            ? "decrescente"
            : "crescente",
          "constante",
          "periódica",
          "sem domínio"
        ],
        s
      ),

      visual:
        planoCartesiano({
          reta: {
            m,
            b
          }
        })

    };

  }


  // ====================================================
  // D074
  // ====================================================

  if (descriptor === "D074_M") {

    const base =
      pick(
        [2, 3, 4],
        s
      );

    return {

      modeloId:
        `grafico-exponencial-${base}-${k}`,

      text:
        `Observe o gráfico. Qual expressão pode representar essa função exponencial?`,

      ...montarAlternativas(
        `f(x)=${base}^x`,
        [
          `f(x)=${base}x`,
          `f(x)=x^${base}`,
          `f(x)=x+${base}`,
          `f(x)=${base}-x`
        ],
        s
      ),

      visual:
        planoCartesiano({
          expo: {
            base,
            c: 1
          }
        })

    };

  }


  // ====================================================
  // D076
  // ====================================================

  if (descriptor === "D076_M") {

    const a =
      1 +
      s % 5;

    const b =
      2 +
      (
        s + k
      ) % 5;

    return {

      modeloId:
        `polinomio-fatorado-${a}-${b}-${k}`,

      text:
        `Quais são as raízes do polinômio P(x)=(x-${a})(x-${b})?`,

      ...montarAlternativas(
        `${a} e ${b}`,
        [
          `${-a} e ${-b}`,
          `${a + b} e ${a * b}`,
          `0 e ${a + b}`,
          `${a} e ${-b}`
        ],
        s
      )

    };

  }


  // ====================================================
  // D078
  // ====================================================

  if (descriptor === "D078_M") {

    const m =
      1 +
      s % 4;

    const b =
      -2 +
      (
        s + k
      ) % 5;

    const eq =
      `y=${m}x${b >= 0 ? "+" : ""}${b}`;

    return {

      modeloId:
        `funcao-linear-grafico-${m}-${b}-${k}`,

      text:
        `Observe o gráfico da reta. Qual expressão representa essa função?`,

      ...montarAlternativas(
        eq,
        [
          `y=${b}x+${m}`,
          `y=${m + 1}x${b >= 0 ? "+" : ""}${b}`,
          `y=${m}x`,
          `y=x${b >= 0 ? "+" : ""}${b}`
        ],
        s
      ),

      visual:
        planoCartesiano({
          reta: {
            m,
            b
          }
        })

    };

  }


  // ====================================================
  // D080
  // ====================================================

  if (descriptor === "D080_M") {

    const base =
      pick(
        [2, 3, 10],
        s
      );

    return {

      modeloId:
        `logaritmica-${base}-${k}`,

      text:
        `A função f(x)=log${base}(x) é inversa de qual função?`,

      ...montarAlternativas(
        `f(x)=${base}^x`,
        [
          `f(x)=${base}x`,
          `f(x)=x^${base}`,
          `f(x)=x+${base}`,
          `f(x)=1/x`
        ],
        s
      )

    };

  }


  // ====================================================
  // D082
  // ====================================================

  if (descriptor === "D082_M") {

    const altura =
      4 +
      s % 4;

    return {

      modeloId:
        `situacao-grafico-${altura}-${k}`,

      text:
        `A altura de uma bola lançada para cima aumenta, atinge um máximo e depois diminui. Qual tipo de gráfico representa melhor essa situação?`,

      ...montarAlternativas(
        "Uma parábola com concavidade para baixo",
        [
          "Uma reta crescente",
          "Uma reta decrescente",
          "Uma função constante",
          "Uma parábola com concavidade para cima"
        ],
        s
      ),

      visual:
        planoCartesiano({
          parabola: {
            a: -0.5,
            h: 0,
            k: altura
          }
        })

    };

  }


  // ====================================================
  // D085
  // ====================================================

  if (descriptor === "D085_M") {

    const m =
      pick(
        [-2, -1, 1, 2, 3],
        s
      );

    const b =
      -3 +
      (
        s + k
      ) % 7;

    return {

      modeloId:
        `coeficiente-reta-${m}-${b}-${k}`,

      text:
        `Na função y=${m}x${b >= 0 ? "+" : ""}${b}, qual é o coeficiente angular da reta?`,

      ...montarAlternativas(
        m,
        [
          b,
          -m,
          m + b,
          1
        ],
        s
      ),

      visual:
        planoCartesiano({
          reta: {
            m,
            b
          }
        })

    };

  }


  // ====================================================
  // D086
  // ====================================================

  if (descriptor === "D086_M") {

    const a =
      1 +
      s % 4;

    const b =
      1 +
      (
        s + k
      ) % 5;

    const valores =
      [0, 1, 2, 3].map(
        x =>
          [
            x,
            a * x + b
          ]
      );

    return {

      modeloId:
        `tabela-funcao-${a}-${b}-${k}`,

      text:
        `Observe a tabela. Qual função representa a relação entre x e y?`,

      ...montarAlternativas(
        `y=${a}x+${b}`,
        [
          `y=${b}x+${a}`,
          `y=${a + 1}x+${b}`,
          `y=${a}x`,
          `y=x+${b}`
        ],
        s
      ),

      visual:
        tabelaSvg(
          ["x", "y"],
          valores
        )

    };

  }


  // ====================================================
  // D087
  // ====================================================

  if (descriptor === "D087_M") {

    const r1 =
      1 +
      s % 5;

    const r2 =
      2 +
      (
        s + k
      ) % 6;

    const soma =
      r1 + r2;

    const produto =
      r1 * r2;

    return {

      modeloId:
        `equacao-segundo-grau-${r1}-${r2}-${k}`,

      text:
        `Quais são as soluções da equação x²-${soma}x+${produto}=0?`,

      ...montarAlternativas(
        `${r1} e ${r2}`,
        [
          `${-r1} e ${-r2}`,
          `${soma} e ${produto}`,
          `0 e ${soma}`,
          `${r1} e ${-r2}`
        ],
        s
      )

    };

  }


  // ====================================================
  // D088
  // ====================================================

  if (descriptor === "D088_M") {

    const inicial =
      pick(
        [50, 100, 200, 500],
        s
      );

    const fator =
      pick(
        [2, 3],
        s + k
      );

    const periodos =
      2 +
      (
        s + k
      ) % 4;

    const total =
      inicial *
      Math.pow(
        fator,
        periodos
      );

    return {

      modeloId:
        `problema-exponencial-${fator}-${periodos}-${k}`,

      text:
        `Uma quantidade inicial de ${inicial} unidades é multiplicada por ${fator} a cada período. Qual será a quantidade após ${periodos} períodos?`,

      ...montarAlternativas(
        total,
        [
          inicial *
          fator *
          periodos,

          inicial +
          fator *
          periodos,

          total /
          fator,

          total +
          inicial
        ],
        s
      )

    };

  }


  // ====================================================
  // D096
  // ====================================================

  if (descriptor === "D096_M") {

    const a1 =
      2 +
      s % 8;

    const razao =
      2 +
      (
        s + k
      ) % 6;

    const n =
      5 +
      (
        s + k
      ) % 5;

    const an =
      a1 +
      (n - 1) *
      razao;

    return {

      modeloId:
        `pa-${a1}-${razao}-${n}-${k}`,

      text:
        `Em uma progressão aritmética, o primeiro termo é ${a1} e a razão é ${razao}. Qual é o ${n}º termo?`,

      ...montarAlternativas(
        an,
        [
          a1 +
          n *
          razao,

          a1 *
          razao,

          an - razao,

          an + razao
        ],
        s
      )

    };

  }


  // ====================================================
  // D097
  // ====================================================

  if (descriptor === "D097_M") {

    const a1 =
      pick(
        [1, 2, 3, 5],
        s
      );

    const razao =
      pick(
        [2, 3],
        s + k
      );

    const n =
      4 +
      (
        s + k
      ) % 3;

    const an =
      a1 *
      Math.pow(
        razao,
        n - 1
      );

    return {

      modeloId:
        `pg-${a1}-${razao}-${n}-${k}`,

      text:
        `Em uma progressão geométrica, o primeiro termo é ${a1} e a razão é ${razao}. Qual é o ${n}º termo?`,

      ...montarAlternativas(
        an,
        [
          a1 +
          (n - 1) *
          razao,

          a1 *
          razao *
          n,

          an /
          razao,

          an +
          razao
        ],
        s
      )

    };

  }


  // ====================================================
  // D111
  // ====================================================

  if (descriptor === "D111_M") {

    const modelo =
      k % 3;

    if (modelo === 0) {

      return {

        modeloId:
          `planificacao-cubo-${s}-${k}`,

        text:
          `Observe a planificação apresentada. Qual sólido é formado ao dobrá-la corretamente?`,

        ...montarAlternativas(
          "Cubo",
          [
            "Cilindro",
            "Cone",
            "Prisma triangular",
            "Pirâmide"
          ],
          s
        ),

        visual:
          planificacaoCuboSvg()

      };

    }


    if (modelo === 1) {

      return {

        modeloId:
          `vista-cilindro-${s}-${k}`,

        text:
          `Um sólido possui duas bases circulares paralelas e uma superfície lateral curva. Qual é esse sólido?`,

        ...montarAlternativas(
          "Cilindro",
          [
            "Cone",
            "Cubo",
            "Pirâmide",
            "Prisma triangular"
          ],
          s
        ),

        visual:
          cilindroSvg()

      };

    }


    return {

      modeloId:
        `reconhecimento-cubo-${s}-${k}`,

      text:
        `O sólido apresentado possui seis faces quadradas congruentes. Qual é o nome desse sólido?`,

      ...montarAlternativas(
        "Cubo",
        [
          "Prisma triangular",
          "Cilindro",
          "Cone",
          "Pirâmide"
        ],
        s
      ),

      visual:
        cuboSvg()

    };

  }


  // ====================================================
  // D119
  // ====================================================

  if (descriptor === "D119_M") {

    const menor =
      3 +
      s % 5;

    const fator =
      2 +
      (
        s + k
      ) % 3;

    const outro =
      4 +
      (
        s * 2
      ) % 5;

    const resposta =
      outro *
      fator;

    return {

      modeloId:
        `semelhanca-${menor}-${fator}-${k}`,

      text:
        `Dois triângulos semelhantes possuem lados correspondentes ${menor} cm e ${menor * fator} cm. Se outro lado do menor mede ${outro} cm, quanto mede o lado correspondente do maior?`,

      ...montarAlternativas(
        resposta,
        [
          outro + fator,
          resposta + fator,
          resposta - fator,
          menor * fator
        ],
        s
      )

    };

  }


  // ====================================================
  // D124
  // ====================================================

  if (descriptor === "D124_M") {

    const m =
      1 +
      s % 4;

    const x1 =
      1 +
      (
        s + k
      ) % 3;

    const y1 =
      2 +
      (
        s * 2
      ) % 5;

    const b =
      y1 -
      m * x1;

    const eq =
      `y=${m}x${b >= 0 ? "+" : ""}${b}`;

    return {

      modeloId:
        `equacao-reta-${m}-${x1}-${y1}-${k}`,

      text:
        `Uma reta passa pelo ponto (${x1}, ${y1}) e possui coeficiente angular ${m}. Qual é sua equação?`,

      ...montarAlternativas(
        eq,
        [
          `y=${x1}x+${y1}`,
          `y=${m + 1}x${b >= 0 ? "+" : ""}${b}`,
          `y=${m}x+${y1}`,
          `y=x${b >= 0 ? "+" : ""}${b}`
        ],
        s
      ),

      visual:
        planoCartesiano({
          pontos: [
            {
              x:
                x1,
              y:
                y1,
              label:
                "A"
            }
          ],
          reta: {
            m,
            b
          }
        })

    };

  }


  // ====================================================
  // D125
  // ====================================================

  if (descriptor === "D125_M") {

    const modelo =
      k % 3;

    if (modelo === 0) {

      return {

        modeloId:
          `euler-cubo-${k}`,

        text:
          `Um cubo possui 8 vértices e 12 arestas. Quantas faces ele possui?`,

        ...montarAlternativas(
          6,
          [
            4,
            8,
            10,
            12
          ],
          s
        ),

        visual:
          cuboSvg()

      };

    }


    if (modelo === 1) {

      return {

        modeloId:
          `euler-prisma-${k}`,

        text:
          `Um poliedro possui 6 vértices e 9 arestas. Utilizando a relação de Euler V - A + F = 2, quantas faces possui?`,

        ...montarAlternativas(
          5,
          [
            3,
            4,
            6,
            7
          ],
          s
        )

      };

    }


    return {

      modeloId:
        `euler-geral-${s}-${k}`,

      text:
        `Um poliedro possui 10 vértices e 15 arestas. Quantas faces possui, sabendo que V - A + F = 2?`,

      ...montarAlternativas(
        7,
        [
          5,
          6,
          8,
          10
        ],
        s
      )

    };

  }


  // ====================================================
  // D126
  // ====================================================

  if (descriptor === "D126_M") {

    return {

      modeloId:
        `trig-grafico-${k}`,

      text:
        `Uma função periódica oscila regularmente entre -1 e 1. Qual função pode apresentar esse comportamento?`,

      ...montarAlternativas(
        "f(x)=sen(x)",
        [
          "f(x)=2^x",
          "f(x)=x²",
          "f(x)=3x+1",
          "f(x)=log(x)"
        ],
        s
      )

    };

  }


  // ====================================================
  // D127
  // ====================================================

  if (descriptor === "D127_M") {

    const x =
      1 +
      s % 4;

    const y =
      1 +
      (
        s + k
      ) % 5;

    return {

      modeloId:
        `sistema-${x}-${y}-${k}`,

      text:
        `Duas retas se intersectam no ponto (${x}, ${y}). Esse ponto representa, em um sistema de duas equações, o:`,

      ...montarAlternativas(
        "par ordenado que resolve simultaneamente as duas equações",
        [
          "coeficiente angular das duas retas",
          "valor máximo das funções",
          "produto das duas equações",
          "ponto em que apenas uma das equações é satisfeita"
        ],
        s
      ),

      visual:
        planoCartesiano({
          pontos: [
            {
              x,
              y,
              label:
                "P"
            }
          ],
          reta: {
            m: 1,
            b:
              y - x
          }
        })

    };

  }


  // ====================================================
  // D129
  // ====================================================

  if (descriptor === "D129_M") {

    const modelo =
      k % 3;

    if (modelo === 0) {

      const lado =
        2 +
        s % 7;

      const volume =
        lado ** 3;

      return {

        modeloId:
          `volume-cubo-${lado}-${k}`,

        text:
          `Um reservatório cúbico possui aresta interna de ${lado} m. Qual é seu volume?`,

        ...montarAlternativas(
          `${volume} m³`,
          [
            `${lado * lado} m³`,
            `${6 * lado * lado} m³`,
            `${3 * lado} m³`,
            `${volume + lado} m³`
          ],
          s
        ),

        visual:
          cuboSvg()

      };

    }


    if (modelo === 1) {

      const raio =
        2 +
        s % 5;

      const altura =
        4 +
        (
          s + k
        ) % 7;

      const volume =
        Math.PI *
        raio *
        raio *
        altura;

      return {

        modeloId:
          `volume-cilindro-${raio}-${altura}-${k}`,

        text:
          `Um cilindro possui raio ${raio} cm e altura ${altura} cm. Considerando π≈3,14, qual é aproximadamente seu volume?`,

        ...montarAlternativas(
          `${fmt(volume)} cm³`,
          [
            `${fmt(Math.PI * raio * altura)} cm³`,
            `${fmt(2 * Math.PI * raio * altura)} cm³`,
            `${fmt(Math.PI * raio * raio)} cm³`,
            `${fmt(volume / 2)} cm³`
          ],
          s
        ),

        visual:
          cilindroSvg()

      };

    }


    const lado =
      3 +
      s % 6;

    const areaTotal =
      6 *
      lado *
      lado;

    return {

      modeloId:
        `area-cubo-${lado}-${k}`,

      text:
        `Um cubo possui aresta de ${lado} cm. Qual é sua área total?`,

      ...montarAlternativas(
        `${areaTotal} cm²`,
        [
          `${lado ** 3} cm²`,
          `${lado * lado} cm²`,
          `${4 * lado * lado} cm²`,
          `${6 * lado} cm²`
        ],
        s
      ),

      visual:
        cuboSvg()

    };

  }


  // ====================================================
  // D132
  // ====================================================

  if (descriptor === "D132_M") {

    const taxa =
      2 +
      s % 8;

    const fixa =
      5 +
      (
        s + k
      ) % 15;

    const x =
      3 +
      (
        s * 2
      ) % 8;

    const total =
      taxa *
      x +
      fixa;

    return {

      modeloId:
        `funcao-primeiro-grau-${taxa}-${fixa}-${x}-${k}`,

      text:
        `Um serviço cobra uma taxa fixa de R$ ${fixa} mais R$ ${taxa} por unidade utilizada. Qual será o valor para ${x} unidades?`,

      ...montarAlternativas(
        total,
        [
          taxa * x,
          fixa + x,
          total + taxa,
          total - taxa
        ],
        s
      )

    };

  }


  // ====================================================
  // D133
  // ====================================================

  if (descriptor === "D133_M") {

    const h =
      1 +
      s % 5;

    const kmax =
      4 +
      (
        s + k
      ) % 8;

    return {

      modeloId:
        `maximo-parabola-${h}-${kmax}-${k}`,

      text:
        `O gráfico apresenta uma parábola com concavidade para baixo e vértice em (${h}, ${kmax}). Qual é o valor máximo da função?`,

      ...montarAlternativas(
        kmax,
        [
          h,
          -kmax,
          h + kmax,
          0
        ],
        s
      ),

      visual:
        planoCartesiano({
          parabola: {
            a: -0.5,
            h,
            k:
              kmax
          }
        })

    };

  }


  // ====================================================
  // D145
  // ====================================================

  if (descriptor === "D145_M") {

    const m =
      pick(
        [-3, -2, -1, 1, 2, 3],
        s
      );

    const b =
      -2 +
      (
        s + k
      ) % 5;

    return {

      modeloId:
        `grafico-coeficientes-${m}-${b}-${k}`,

      text:
        `Considere a função f(x)=${m}x${b >= 0 ? "+" : ""}${b}. Qual afirmação está correta sobre seu gráfico?`,

      ...montarAlternativas(
        m > 0
          ? "É uma reta crescente."
          : "É uma reta decrescente.",

        [
          m > 0
            ? "É uma reta decrescente."
            : "É uma reta crescente.",

          "É uma parábola.",

          "É uma função exponencial.",

          "É uma reta horizontal."
        ],

        s
      ),

      visual:
        planoCartesiano({
          reta: {
            m,
            b
          }
        })

    };

  }


  // ====================================================
  // FALLBACK
  // ====================================================

  return {

    modeloId:
      `fallback-${descriptor}-${k}`,

    text:
      `Questão referente ao descritor ${descriptor}. Assinale a alternativa correta.`,

    ...montarAlternativas(
      "Alternativa correta",
      [
        "Alternativa incorreta A",
        "Alternativa incorreta B",
        "Alternativa incorreta C",
        "Alternativa incorreta D"
      ],
      s
    )

  };

}


// ======================================================
// VISUAL AUTOMÁTICO
// ======================================================

function visualFallback(
  descriptor
) {

  switch (descriptor) {

    case "D043_M":

      return planoCartesiano({
        pontos: [
          {
            x: 2,
            y: 3,
            label: "A"
          }
        ]
      });


    case "D063_M":
    case "D064_M":

      return graficoBarras(
        [12, 18, 10, 22],
        ["A", "B", "C", "D"],
        "Dados para análise"
      );


    case "D071_M":
    case "D078_M":
    case "D085_M":
    case "D124_M":
    case "D145_M":

      return planoCartesiano({
        reta: {
          m: 2,
          b: 1
        }
      });


    case "D074_M":

      return planoCartesiano({
        expo: {
          base: 2,
          c: 1
        }
      });


    case "D082_M":
    case "D133_M":

      return planoCartesiano({
        parabola: {
          a: -0.5,
          h: 0,
          k: 4
        }
      });


    case "D086_M":

      return tabelaSvg(
        ["x", "y"],
        [
          [0, 1],
          [1, 3],
          [2, 5],
          [3, 7]
        ]
      );


    case "D111_M":

      return planificacaoCuboSvg();


    case "D129_M":

      return cuboSvg();


    default:

      return null;

  }

}


// ======================================================
// PREPARAR VISUAL
// ======================================================

function prepararVisual(
  descriptor,
  nivel,
  gerada
) {

  let visual =
    gerada?.visual ||
    null;

  const texto =
    String(
      gerada?.text || ""
    ).toLowerCase();

  const exigeVisual =
    /observe|gráfico|grafico|planificação|planificacao|vista|figura|sólido|solido|tabela/.test(
      texto
    );


  const obrigatorios =
    new Set([
      "D043_M",
      "D049_M",
      "D051_M",
      "D063_M",
      "D064_M",
      "D071_M",
      "D074_M",
      "D078_M",
      "D082_M",
      "D085_M",
      "D086_M",
      "D111_M",
      "D124_M",
      "D127_M",
      "D129_M",
      "D133_M",
      "D145_M"
    ]);


  if (
    !visual &&
    (
      exigeVisual ||
      obrigatorios.has(
        descriptor
      )
    )
  ) {

    visual =
      visualFallback(
        descriptor,
        nivel,
        gerada
      );

  }


  if (
    typeof visual ===
    "string"
  ) {

    return {
      svg:
        visual
    };

  }


  if (
    visual?.svg
  ) {

    return visual;

  }


  return null;

}


// ======================================================
// DISTRIBUIÇÃO DE NÍVEIS
// ======================================================

function intercalarNiveis(
  distribuicao,
  quantidade
) {

  const valores = {

    abb:
      Number(
        distribuicao?.abb ??
        40
      ),

    basico:
      Number(
        distribuicao?.basico ??
        30
      ),

    proficiente:
      Number(
        distribuicao?.proficiente ??
        20
      ),

    avancado:
      Number(
        distribuicao?.avancado ??
        10
      )

  };


  const total =
    valores.abb +
    valores.basico +
    valores.proficiente +
    valores.avancado ||
    100;


  const metas = {

    "ABAIXO DO BÁSICO":
      Math.round(
        quantidade *
        valores.abb /
        total
      ),

    "BÁSICO":
      Math.round(
        quantidade *
        valores.basico /
        total
      ),

    "PROFICIENTE":
      Math.round(
        quantidade *
        valores.proficiente /
        total
      ),

    "AVANÇADO":
      Math.round(
        quantidade *
        valores.avancado /
        total
      )

  };


  let soma =
    Object.values(
      metas
    ).reduce(
      (a, b) =>
        a + b,
      0
    );


  while (
    soma <
    quantidade
  ) {

    metas[
      "ABAIXO DO BÁSICO"
    ]++;

    soma++;

  }


  while (
    soma >
    quantidade
  ) {

    for (
      const nivel of
      [
        "AVANÇADO",
        "PROFICIENTE",
        "BÁSICO",
        "ABAIXO DO BÁSICO"
      ]
    ) {

      if (
        metas[nivel] > 0 &&
        soma > quantidade
      ) {

        metas[nivel]--;

        soma--;

      }

    }

  }


  const resultado = [];


  const ordem = [
    "ABAIXO DO BÁSICO",
    "BÁSICO",
    "PROFICIENTE",
    "AVANÇADO"
  ];


  while (
    resultado.length <
    quantidade
  ) {

    for (
      const nivel of ordem
    ) {

      if (
        metas[nivel] > 0
      ) {

        resultado.push(
          nivel
        );

        metas[nivel]--;

      }


      if (
        resultado.length >=
        quantidade
      ) {

        break;

      }

    }

  }


  return resultado;

}


// ======================================================
// FILA DE DESCRITORES
// ======================================================

function montarFilaDescritores(
  validos,
  configuracaoDescritores,
  quantidade
) {

  const pesos =
    Object.fromEntries(

      validos.map(
        descriptor => [

          descriptor,

          clamp(
            Number(
              configuracaoDescritores[
                descriptor
              ]?.peso ||
              1
            ),
            1,
            4
          )

        ]
      )

    );


  const contagem =
    Object.fromEntries(

      validos.map(
        descriptor => [
          descriptor,
          0
        ]
      )

    );


  const fila = [];


  // Todos os descritores aparecem
  // pelo menos uma vez antes da repetição.
  for (
    const descriptor of validos
  ) {

    if (
      fila.length >=
      quantidade
    ) {
      break;
    }

    fila.push(
      descriptor
    );

    contagem[
      descriptor
    ]++;

  }


  // Depois distribui conforme o peso.
  while (
    fila.length <
    quantidade
  ) {

    const ultimo =
      fila[
        fila.length - 1
      ];


    const candidatos =
      validos

        .map(
          descriptor => ({

            descriptor,

            peso:
              pesos[
                descriptor
              ],

            contagem:
              contagem[
                descriptor
              ],

            indice:
              contagem[
                descriptor
              ] /
              pesos[
                descriptor
              ]

          })
        )

        .sort(
          (a, b) => {

            if (
              a.indice !==
              b.indice
            ) {

              return (
                a.indice -
                b.indice
              );

            }


            if (
              a.contagem !==
              b.contagem
            ) {

              return (
                a.contagem -
                b.contagem
              );

            }


            return (
              validos.indexOf(
                a.descriptor
              ) -
              validos.indexOf(
                b.descriptor
              )
            );

          }
        );


    const escolhido =
      candidatos.find(
        item =>
          item.descriptor !==
          ultimo
      )?.descriptor ||
      candidatos[0].descriptor;


    fila.push(
      escolhido
    );

    contagem[
      escolhido
    ]++;

  }


  return {
    fila,
    pesos
  };

}


// ======================================================
// ASSINATURA ANTI-REPETIÇÃO
// ======================================================

function assinaturaQuestao(
  questao
) {

  const texto =
    normalizarTexto(
      questao?.text
    );


  const alternativas =
    (
      Array.isArray(
        questao?.options
      )
        ? questao.options
        : []
    )

      .map(
        normalizarTexto
      )

      .sort()

      .join("|");


  const visual =
    normalizarTexto(
      questao?.visual?.svg ||
      questao?.visual ||
      ""
    );


  return [
    texto,
    alternativas,
    visual
  ].join("|||");

}


// ======================================================
// VALIDAÇÃO
// ======================================================

function questaoValida(
  questao
) {

  if (
    !questao ||
    !String(
      questao.text || ""
    ).trim()
  ) {

    return false;

  }


  if (
    !Array.isArray(
      questao.options
    )
  ) {

    return false;

  }


  if (
    questao.options.length <
    4
  ) {

    return false;

  }


  const unicas =
    new Set(
      questao.options.map(
        normalizarTexto
      )
    );


  if (
    unicas.size !==
    questao.options.length
  ) {

    return false;

  }


  if (
    !Number.isInteger(
      questao.correct
    )
  ) {

    return false;

  }


  if (
    questao.correct < 0 ||
    questao.correct >=
      questao.options.length
  ) {

    return false;

  }


  return true;

}


// ======================================================
// HABILIDADE
// ======================================================

export function habilidadeDoDescritor(
  descritor
) {

  return (
    HABILIDADES_PAEBES[
      descritor
    ] ||
    ""
  );

}


// ======================================================
// QUESTÃO ESPECIAL
// ======================================================

export function gerarQuestaoDescritor(
  descritor,
  nivel =
    "BÁSICO",
  seed =
    Date.now()
) {

  if (
    !HABILIDADES_PAEBES[
      descritor
    ]
  ) {

    throw new Error(
      "Descritor não pertence à matriz configurada."
    );

  }


  const gerada =
    formatarQuestaoMatematica(

      gerarPorDescritor(
        descritor,
        nivel,
        seed,
        seed % 8
      )

    );


  return {

    id:
      `${descritor}-especial-${Date.now().toString(36)}-${seed}`,

    descriptor:
      descritor,

    habilidade:
      HABILIDADES_PAEBES[
        descritor
      ],

    level:
      nivel,

    text:
      gerada.text,

    options:
      gerada.options,

    correct:
      gerada.correct,

    visual:
      prepararVisual(
        descritor,
        nivel,
        gerada
      ),

    baseXP:
      XP_NIVEL[
        nivel
      ] ||
      120,

    modeloId:
      gerada.modeloId ||
      null,

    origem:
      "Questão autoral alinhada à Matriz de Referência PAEBES."

  };

}


// ======================================================
// GERAR QUESTÕES DA ARENA
// ======================================================

export function gerarQuestoesArena({

  quantidade = 15,

  descritores = [],

  configuracaoDescritores = {},

  distribuicaoNiveis = {
    abb: 40,
    basico: 30,
    proficiente: 20,
    avancado: 10
  }

} = {}) {


  quantidade =
    clamp(
      Number(
        quantidade
      ) ||
      15,
      5,
      40
    );


  const validos =
    descritores.filter(
      descriptor =>
        HABILIDADES_PAEBES[
          descriptor
        ]
    );


  if (
    validos.length === 0
  ) {

    throw new Error(
      "Selecione pelo menos um descritor."
    );

  }


  const {
    fila,
    pesos
  } =
    montarFilaDescritores(
      validos,
      configuracaoDescritores,
      quantidade
    );


  const niveis =
    intercalarNiveis(
      distribuicaoNiveis,
      quantidade
    );


  // ====================================================
  // IDENTIFICADOR DA NOVA ARENA
  // ====================================================

  let rodadaArena = 0;


  try {

    rodadaArena =
      Number(
        localStorage.getItem(
          "arenaPAEBES_rodadaBanco"
        ) ||
        0
      );


    rodadaArena++;


    localStorage.setItem(
      "arenaPAEBES_rodadaBanco",
      String(
        rodadaArena
      )
    );

  } catch (erro) {

    rodadaArena =
      Math.floor(
        Date.now() /
        1000
      );

  }


  const seedArena =
    rodadaArena *
    10007 +
    (
      Date.now() %
      1000003
    );


  // ====================================================
  // CONTROLE DE UNICIDADE
  // ====================================================

  const questoes = [];

  const assinaturas =
    new Set();

  const assinaturasTexto =
    new Set();

  const usosPorDescNivel =
    {};


  // ====================================================
  // GERAR CADA QUESTÃO
  // ====================================================

  for (
    let i = 0;
    i < quantidade;
    i++
  ) {

    const descriptor =
      fila[i];


    const cfg =
      configuracaoDescritores[
        descriptor
      ] ||
      {};


    const nivel =
      (
        cfg.nivel &&
        cfg.nivel !==
          "MISTO"
      )
        ? cfg.nivel
        : (
          niveis[i] ||
          "BÁSICO"
        );


    const chaveUso =
      `${descriptor}|${nivel}`;


    const usoAtual =
      Number(
        usosPorDescNivel[
          chaveUso
        ] ||
        0
      );


    let escolhida =
      null;


    // ==================================================
    // ATÉ 120 TENTATIVAS PARA ENCONTRAR QUESTÃO INÉDITA
    // ==================================================

    for (
      let tentativa = 0;
      tentativa < 120;
      tentativa++
    ) {

      const seed =
        seedArena +
        (
          i + 1
        ) *
        7919 +
        validos.indexOf(
          descriptor
        ) *
        104729 +
        tentativa *
        15485863;


      const variante =
        usoAtual +
        rodadaArena +
        tentativa;


      let gerada;


      try {

        gerada =
          formatarQuestaoMatematica(

            gerarPorDescritor(
              descriptor,
              nivel,
              seed,
              variante
            )

          );

      } catch (erro) {

        continue;

      }


      const visual =
        prepararVisual(
          descriptor,
          nivel,
          gerada
        );


      const candidata = {

        id:
          `${descriptor}-${i + 1}-${rodadaArena}-${Date.now().toString(36)}-${tentativa}`,

        descriptor,

        habilidade:
          HABILIDADES_PAEBES[
            descriptor
          ],

        level:
          nivel,

        text:
          gerada.text,

        options:
          gerada.options,

        correct:
          gerada.correct,

        visual,

        pesoDescritor:
          pesos[
            descriptor
          ],

        baseXP:
          Math.round(
            (
              XP_NIVEL[
                nivel
              ] ||
              120
            ) *
            pesos[
              descriptor
            ]
          ),

        modeloId:
          gerada.modeloId ||
          null,

        origem:
          "Questão autoral alinhada à Matriz de Referência PAEBES."

      };


      if (
        !questaoValida(
          candidata
        )
      ) {

        continue;

      }


      const assinatura =
        assinaturaQuestao(
          candidata
        );


      const assinaturaTexto =
        normalizarTexto(
          candidata.text
        );


      if (
        assinaturas.has(
          assinatura
        )
      ) {

        continue;

      }


      if (
        assinaturasTexto.has(
          assinaturaTexto
        )
      ) {

        continue;

      }


      escolhida =
        candidata;


      assinaturas.add(
        assinatura
      );


      assinaturasTexto.add(
        assinaturaTexto
      );


      break;

    }


    // ==================================================
    // SEGUNDA RODADA DE EMERGÊNCIA
    // ==================================================

    if (!escolhida) {

      for (
        let tentativa = 120;
        tentativa < 300;
        tentativa++
      ) {

        const seed =
          seedArena +
          i *
          99991 +
          tentativa *
          32452843 +
          Date.now();


        const gerada =
          formatarQuestaoMatematica(

            gerarPorDescritor(
              descriptor,
              nivel,
              seed,
              usoAtual +
              tentativa +
              17
            )

          );


        const candidata = {

          id:
            `${descriptor}-${i + 1}-extra-${rodadaArena}-${tentativa}`,

          descriptor,

          habilidade:
            HABILIDADES_PAEBES[
              descriptor
            ],

          level:
            nivel,

          text:
            gerada.text,

          options:
            gerada.options,

          correct:
            gerada.correct,

          visual:
            prepararVisual(
              descriptor,
              nivel,
              gerada
            ),

          pesoDescritor:
            pesos[
              descriptor
            ],

          baseXP:
            Math.round(
              (
                XP_NIVEL[
                  nivel
                ] ||
                120
              ) *
              pesos[
                descriptor
              ]
            ),

          modeloId:
            gerada.modeloId ||
            null,

          origem:
            "Questão autoral alinhada à Matriz de Referência PAEBES."

        };


        const assinatura =
          assinaturaQuestao(
            candidata
          );


        const assinaturaTexto =
          normalizarTexto(
            candidata.text
          );


        if (
          questaoValida(
            candidata
          ) &&
          !assinaturas.has(
            assinatura
          ) &&
          !assinaturasTexto.has(
            assinaturaTexto
          )
        ) {

          escolhida =
            candidata;


          assinaturas.add(
            assinatura
          );


          assinaturasTexto.add(
            assinaturaTexto
          );


          break;

        }

      }

    }


    // ==================================================
    // NÃO ACEITA REPETIÇÃO
    // ==================================================

    if (!escolhida) {

      throw new Error(
        `Não foi possível gerar uma questão inédita para ${descriptor}. Crie novamente a Arena ou utilize mais descritores.`
      );

    }


    usosPorDescNivel[
      chaveUso
    ] =
      usoAtual + 1;


    questoes.push(
      escolhida
    );

  }


  // ====================================================
  // VALIDAÇÃO FINAL DA ARENA
  // ====================================================

  const verificacao =
    new Set();


  for (
    const questao of questoes
  ) {

    const assinatura =
      assinaturaQuestao(
        questao
      );


    if (
      verificacao.has(
        assinatura
      )
    ) {

      throw new Error(
        "A geração identificou uma questão repetida. A Arena não foi criada para proteger a qualidade da avaliação."
      );

    }


    verificacao.add(
      assinatura
    );

  }


  if (
    questoes.length !==
    quantidade
  ) {

    throw new Error(
      "A quantidade final de questões não corresponde à configuração da Arena."
    );

  }


  return questoes;

}


// ======================================================
// DESCRITORES SEM BANCO
// ======================================================

export function descritoresSemBanco(
  descritores = []
) {

  return descritores.filter(
    descriptor =>
      !HABILIDADES_PAEBES[
        descriptor
      ]
  );

}


// ======================================================
// FIM
// ======================================================

console.log(
  "📚 Banco de questões da Arena Matemática carregado — proteção anti-repetição ativa."
);
