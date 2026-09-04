// ==========================================================
// ARENA MATEMÁTICA — PAINEL PEDAGÓGICO DO PROFESSOR
// Professor Leopoldo — 2026
//
// ORGANIZAÇÃO:
// NÚCLEO / HABILIDADE
// → DESCRITOR
// → O QUE TRABALHA
// → PARTE / SUB-HABILIDADE
// → NÍVEL PRIORITÁRIO
// → PESO PEDAGÓGICO
//
// PRIORIDADE FIXA:
// 1º ABAIXO DO BÁSICO = PESO 4
// 2º BÁSICO          = PESO 3
// 3º PROFICIENTE     = PESO 2
// 4º AVANÇADO        = PESO 1
// ==========================================================

import {
  HABILIDADES_PAEBES
} from "./question-bank.js";


// ==========================================================
// NÚCLEOS DE APRENDIZAGEM
// ==========================================================

const NUCLEOS_PEDAGOGICOS = [

  {
    id: "retas",
    nome: "Plano Cartesiano e Retas",
    foco: "Da localização de pontos à construção e interpretação da reta.",
    descritores: [
      "D009_M",
      "D043_M",
      "D085_M",
      "D124_M"
    ]
  },

  {
    id: "circunferencia",
    nome: "Circunferência no Plano",
    foco: "Localização, centro, raio e representação da circunferência.",
    descritores: [
      "D043_M",
      "D155_M"
    ]
  },

  {
    id: "sistemas",
    nome: "Sistemas Lineares e Matrizes",
    foco: "Representações algébricas, gráficas, sistemas e matrizes.",
    descritores: [
      "D043_M",
      "D085_M",
      "D154_M",
      "D127_M",
      "D157_M"
    ]
  },

  {
    id: "exponencial",
    nome: "Exponencial e Progressão Geométrica",
    foco: "Função exponencial, crescimento, decrescimento e PG.",
    descritores: [
      "D074_M",
      "D088_M",
      "D097_M"
    ]
  },

  {
    id: "espacial",
    nome: "Geometria Espacial",
    foco: "Planificações, sólidos, área e volume.",
    descritores: [
      "D111_M",
      "D125_M",
      "D129_M"
    ]
  },

  {
    id: "trigonometria",
    nome: "Trigonometria",
    foco: "Proporcionalidade, relações métricas e razões trigonométricas.",
    descritores: [
      "D039_M",
      "D049_M",
      "D051_M"
    ]
  },

  {
    id: "funcoesTrig",
    nome: "Funções Trigonométricas",
    foco: "Plano cartesiano, razões e comportamento gráfico.",
    descritores: [
      "D043_M",
      "D051_M",
      "D071_M",
      "D126_M"
    ]
  },

  {
    id: "recuperacao",
    nome: "Fundamentos e Recuperação",
    foco: "Recomposição das aprendizagens necessárias para avançar.",
    descritores: [
      "D013_M",
      "D038_M",
      "D039_M",
      "D049_M",
      "D058_M",
      "D064_M",
      "D087_M"
    ]
  }

];


// ==========================================================
// PRIORIDADE AMA
// ==========================================================

const PRIORIDADE_AMA = [
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


// ==========================================================
// PARTES / SUB-HABILIDADES
// Somente detalhamentos pedagógicos que já fazem parte
// da organização trabalhada na Arena.
// ==========================================================

const PARTES_HABILIDADE = {

  D009_M: [
    "reta numérica",
    "ordenação",
    "localização de números"
  ],

  D013_M: [
    "representações de números racionais",
    "frações",
    "decimais",
    "equivalências"
  ],

  D038_M: [
    "porcentagem",
    "aumento",
    "desconto",
    "situações-problema"
  ],

  D039_M: [
    "proporcionalidade",
    "razão",
    "grandezas proporcionais"
  ],

  D043_M: [
    "plano cartesiano",
    "coordenadas",
    "localização de pontos",
    "quadrantes"
  ],

  D049_M: [
    "triângulo retângulo",
    "relações métricas",
    "catetos",
    "hipotenusa"
  ],

  D051_M: [
    "seno",
    "cosseno",
    "tangente",
    "triângulo retângulo"
  ],

  D058_M: [
    "relações geométricas",
    "medidas",
    "resolução de problemas"
  ],

  D064_M: [
    "tratamento algébrico",
    "expressões",
    "relações entre grandezas"
  ],

  D071_M: [
    "representação gráfica",
    "comportamento de funções",
    "interpretação no plano cartesiano"
  ],

  D074_M: [
    "função exponencial",
    "representação algébrica",
    "representação gráfica",
    "crescimento e decrescimento"
  ],

  D085_M: [
    "equação da reta",
    "coeficiente angular",
    "inclinação",
    "coeficiente linear",
    "intercepto"
  ],

  D087_M: [
    "conceitos algébricos fundamentais",
    "recomposição",
    "resolução de problemas"
  ],

  D088_M: [
    "função exponencial",
    "modelagem",
    "crescimento exponencial",
    "resolução de problemas"
  ],

  D097_M: [
    "progressão geométrica",
    "razão da PG",
    "termos da sequência",
    "regularidade"
  ],

  D111_M: [
    "sólidos geométricos",
    "faces",
    "arestas",
    "vértices",
    "planificações"
  ],

  D124_M: [
    "equação da reta",
    "dois pontos",
    "inclinação",
    "representação algébrica"
  ],

  D125_M: [
    "geometria espacial",
    "área de sólidos",
    "superfícies",
    "medidas"
  ],

  D126_M: [
    "funções trigonométricas",
    "gráficos",
    "periodicidade",
    "interpretação"
  ],

  D127_M: [
    "sistemas",
    "representações algébricas",
    "relações entre equações"
  ],

  D129_M: [
    "volume",
    "área da base",
    "altura",
    "sólidos geométricos"
  ],

  D154_M: [
    "sistemas lineares",
    "recomposição",
    "representação algébrica"
  ],

  D155_M: [
    "circunferência",
    "centro",
    "raio",
    "plano cartesiano"
  ],

  D157_M: [
    "matrizes",
    "organização de dados",
    "operações e relações"
  ]

};


// ==========================================================
// UTILITÁRIOS
// ==========================================================

function selecionadosAgora() {

  return [
    ...document.querySelectorAll(
      ".desc input:checked"
    )
  ]
    .filter(x => !x.disabled)
    .map(x => x.value);

}


function encontrarNucleos(descritor) {

  return NUCLEOS_PEDAGOGICOS
    .filter(n =>
      n.descritores.includes(descritor)
    );

}


function pesoDoNivel(nivel) {

  const mapa = {
    "ABAIXO DO BÁSICO": 4,
    "BÁSICO": 3,
    "PROFICIENTE": 2,
    "AVANÇADO": 1,
    "MISTO": 4
  };

  return mapa[nivel] || 4;

}


function nomePrioridade(peso) {

  const mapa = {
    4: "PRIORIDADE MÁXIMA",
    3: "PRIORIDADE ALTA",
    2: "PRIORIDADE MÉDIA",
    1: "PRIORIDADE DE CONSOLIDAÇÃO"
  };

  return mapa[peso] || "PRIORIDADE";

}


function configuracaoAtualDaTela() {

  const resultado = {};

  document
    .querySelectorAll(".configLinha")
    .forEach(linha => {

      const d =
        linha.dataset.desc;

      if (!d) return;

      resultado[d] = {

        peso:
          Number(
            linha
              .querySelector(".pesoDesc")
              ?.value || 4
          ),

        nivel:
          linha
            .querySelector(".nivelDesc")
            ?.value ||
          "ABAIXO DO BÁSICO"

      };

    });

  return resultado;

}


// ==========================================================
// ESTILO DO NOVO PAINEL
// ==========================================================

function instalarEstilo() {

  if (
    document.getElementById(
      "estiloPainelPedagogicoArena"
    )
  ) return;

  const style =
    document.createElement("style");

  style.id =
    "estiloPainelPedagogicoArena";

  style.textContent = `

    .grupoPedagogico{
      margin:18px 0;
      border:1px solid rgba(244,199,91,.30);
      border-radius:18px;
      overflow:hidden;
      background:#0b0e14;
    }

    .grupoPedagogicoTopo{
      padding:15px 16px;
      background:
        linear-gradient(
          90deg,
          rgba(244,199,91,.14),
          rgba(124,58,237,.08)
        );
      border-bottom:
        1px solid rgba(244,199,91,.22);
    }

    .grupoPedagogicoTopo strong{
      display:block;
      color:#ffdf83;
      font-size:17px;
    }

    .grupoPedagogicoTopo span{
      display:block;
      margin-top:5px;
      color:#d4c7b6;
      font-size:12px;
      line-height:1.45;
    }

    .configLinha.pedagogica{
      margin:10px;
      grid-template-columns:
        minmax(180px,1.3fr)
        minmax(180px,1fr)
        minmax(190px,1fr);
    }

    .codigoDescritor{
      font-size:18px;
      color:#fff;
      font-weight:1000;
    }

    .seloAma{
      display:inline-block;
      margin-left:6px;
      padding:3px 7px;
      border-radius:999px;
      background:#6b4b05;
      color:#ffe59b;
      font-size:10px;
      vertical-align:middle;
    }

    .descricaoHabilidade{
      grid-column:1/-1;
      padding:10px 12px;
      border-radius:10px;
      background:#15151b;
      color:#eee3d3;
      line-height:1.5;
      font-size:13px;
    }

    .partesHabilidade{
      grid-column:1/-1;
      color:#b9d9ff;
      font-size:12px;
      line-height:1.55;
    }

    .hierarquiaNivel{
      grid-column:1/-1;
      padding:9px 11px;
      border-left:4px solid #f4c75b;
      background:#17140f;
      border-radius:8px;
      color:#f7e5bc;
      font-size:12px;
    }

    .semSelecaoPedagogica{
      padding:15px;
      border-radius:12px;
      background:#11131a;
      color:#d4c7b6;
    }

    @media(max-width:900px){

      .configLinha.pedagogica{
        grid-template-columns:1fr;
      }

    }

  `;

  document.head.appendChild(style);

}


// ==========================================================
// RENDERIZAÇÃO PEDAGÓGICA
// ==========================================================

function renderPainelPedagogico(
  configuracaoForcada = null
) {

  instalarEstilo();

  const area =
    document.getElementById(
      "configDescritores"
    );

  if (!area) return;

  const selecionados =
    selecionadosAgora();

  if (!selecionados.length) {

    area.innerHTML = `
      <div class="semSelecaoPedagogica">
        Selecione um Núcleo de Aprendizagem
        ou um ou mais descritores.
      </div>
    `;

    return;
  }

  const configuracaoAnterior =
    configuracaoForcada ||
    configuracaoAtualDaTela();

  const grupos = [];

  NUCLEOS_PEDAGOGICOS.forEach(nucleo => {

    const ds =
      selecionados.filter(d =>
        nucleo.descritores.includes(d)
      );

    if (!ds.length) return;

    grupos.push({
      nucleo,
      descritores: ds
    });

  });


  // Descritores que eventualmente não pertençam
  // a nenhum Núcleo cadastrado.
  const jaAgrupados =
    new Set(
      grupos.flatMap(
        g => g.descritores
      )
    );

  const avulsos =
    selecionados.filter(
      d => !jaAgrupados.has(d)
    );

  if (avulsos.length) {

    grupos.push({

      nucleo: {
        id: "outros",
        nome: "Outras habilidades selecionadas",
        foco:
          "Descritores selecionados individualmente pelo professor."
      },

      descritores:
        avulsos

    });

  }


  const utilizados =
    new Set();

  area.innerHTML =
    grupos
      .map(grupo => {

        const descritoresUnicos =
          grupo.descritores.filter(d => {

            if (utilizados.has(d)) {
              return false;
            }

            utilizados.add(d);
            return true;

          });

        if (!descritoresUnicos.length) {
          return "";
        }

        return `

          <div class="grupoPedagogico">

            <div class="grupoPedagogicoTopo">

              <strong>
                🏛️ ${grupo.nucleo.nome}
              </strong>

              <span>
                ${grupo.nucleo.foco}
              </span>

            </div>

            ${descritoresUnicos
              .map(d => {

                const salvo =
                  configuracaoAnterior[d] ||
                  {};

                let nivel =
                  salvo.nivel ||
                  "ABAIXO DO BÁSICO";

                if (
                  ![
                    "ABAIXO DO BÁSICO",
                    "BÁSICO",
                    "PROFICIENTE",
                    "AVANÇADO",
                    "MISTO"
                  ].includes(nivel)
                ) {
                  nivel =
                    "ABAIXO DO BÁSICO";
                }

                const peso =
                  Number(
                    salvo.peso ||
                    pesoDoNivel(nivel)
                  );

                const habilidade =
                  HABILIDADES_PAEBES?.[d] ||
                  "Habilidade correspondente ao descritor selecionado.";

                const partes =
                  PARTES_HABILIDADE[d] ||
                  [
                    "partes da habilidade serão definidas pelas questões do banco"
                  ];

                return `

                  <div
                    class="configLinha pedagogica"
                    data-desc="${d}"
                  >

                    <div>

                      <div class="codigoDescritor">

                        ${d}

                        ${
                          PRIORIDADE_AMA.includes(d)
                            ? `<span class="seloAma">
                                AMA
                               </span>`
                            : ""
                        }

                      </div>

                      <div
                        style="
                          margin-top:5px;
                          color:#bba990;
                          font-size:11px
                        "
                      >
                        Descritor selecionado
                        para esta Arena
                      </div>

                    </div>


                    <select
                      class="nivelDesc"
                      aria-label="Nível prioritário ${d}"
                    >

                      <option
                        value="ABAIXO DO BÁSICO"
                        ${
                          nivel ===
                          "ABAIXO DO BÁSICO"
                            ? "selected"
                            : ""
                        }
                      >
                        1º — ABAIXO DO BÁSICO
                      </option>

                      <option
                        value="BÁSICO"
                        ${
                          nivel === "BÁSICO"
                            ? "selected"
                            : ""
                        }
                      >
                        2º — BÁSICO
                      </option>

                      <option
                        value="PROFICIENTE"
                        ${
                          nivel ===
                          "PROFICIENTE"
                            ? "selected"
                            : ""
                        }
                      >
                        3º — PROFICIENTE
                      </option>

                      <option
                        value="AVANÇADO"
                        ${
                          nivel ===
                          "AVANÇADO"
                            ? "selected"
                            : ""
                        }
                      >
                        4º — AVANÇADO
                      </option>

                      <option
                        value="MISTO"
                        ${
                          nivel === "MISTO"
                            ? "selected"
                            : ""
                        }
                      >
                        MISTO — usa a distribuição geral
                      </option>

                    </select>


                    <select
                      class="pesoDesc"
                      aria-label="Peso pedagógico ${d}"
                    >

                      <option
                        value="4"
                        ${
                          peso === 4
                            ? "selected"
                            : ""
                        }
                      >
                        Peso 4 — Prioridade máxima
                      </option>

                      <option
                        value="3"
                        ${
                          peso === 3
                            ? "selected"
                            : ""
                        }
                      >
                        Peso 3 — Prioridade alta
                      </option>

                      <option
                        value="2"
                        ${
                          peso === 2
                            ? "selected"
                            : ""
                        }
                      >
                        Peso 2 — Prioridade média
                      </option>

                      <option
                        value="1"
                        ${
                          peso === 1
                            ? "selected"
                            : ""
                        }
                      >
                        Peso 1 — Consolidação
                      </option>

                    </select>


                    <div class="descricaoHabilidade">

                      <strong>
                        📘 Habilidade / do que se trata:
                      </strong>

                      <br>

                      ${habilidade}

                    </div>


                    <div class="partesHabilidade">

                      <strong>
                        🔹 Partes / sub-habilidades:
                      </strong>

                      ${partes.join(" • ")}

                    </div>


                    <div class="hierarquiaNivel">

                      <strong>
                        Ordem de prioridade:
                      </strong>

                      ABAIXO DO BÁSICO
                      <strong>→</strong>
                      BÁSICO
                      <strong>→</strong>
                      PROFICIENTE
                      <strong>→</strong>
                      AVANÇADO

                      &nbsp; | &nbsp;

                      <strong>
                        Peso atual:
                        ${peso}
                      </strong>

                      —
                      ${nomePrioridade(peso)}

                    </div>

                  </div>

                `;

              })
              .join("")}

          </div>

        `;

      })
      .join("");


  // --------------------------------------------------
  // Se o professor mudar o nível,
  // o peso acompanha automaticamente a hierarquia.
  // --------------------------------------------------

  area
    .querySelectorAll(".nivelDesc")
    .forEach(selectNivel => {

      selectNivel.addEventListener(
        "change",
        () => {

          const linha =
            selectNivel.closest(
              ".configLinha"
            );

          if (!linha) return;

          const peso =
            pesoDoNivel(
              selectNivel.value
            );

          const selectPeso =
            linha.querySelector(
              ".pesoDesc"
            );

          if (selectPeso) {
            selectPeso.value =
              String(peso);
          }

          atualizarResumoPeso(linha);

        }
      );

    });


  area
    .querySelectorAll(".pesoDesc")
    .forEach(selectPeso => {

      selectPeso.addEventListener(
        "change",
        () => {

          const linha =
            selectPeso.closest(
              ".configLinha"
            );

          atualizarResumoPeso(linha);

        }
      );

    });

}


// ==========================================================
// ATUALIZA RESUMO DA LINHA
// ==========================================================

function atualizarResumoPeso(linha) {

  if (!linha) return;

  const peso =
    Number(
      linha
        .querySelector(".pesoDesc")
        ?.value || 4
    );

  const resumo =
    linha.querySelector(
      ".hierarquiaNivel"
    );

  if (!resumo) return;

  resumo.innerHTML = `

    <strong>
      Ordem de prioridade:
    </strong>

    ABAIXO DO BÁSICO
    <strong>→</strong>
    BÁSICO
    <strong>→</strong>
    PROFICIENTE
    <strong>→</strong>
    AVANÇADO

    &nbsp; | &nbsp;

    <strong>
      Peso atual: ${peso}
    </strong>

    —
    ${nomePrioridade(peso)}

  `;

}


// ==========================================================
// SINCRONIZAÇÃO COM CHECKBOXES DOS DESCRITORES
// ==========================================================

function instalarObservacaoDescritores() {

  document
    .querySelectorAll(
      ".desc input"
    )
    .forEach(input => {

      if (
        input.dataset
          .pedagogicoObservado === "1"
      ) {
        return;
      }

      input.dataset
        .pedagogicoObservado = "1";

      input.addEventListener(
        "change",
        () => {

          const cfg =
            configuracaoAtualDaTela();

          setTimeout(
            () =>
              renderPainelPedagogico(
                cfg
              ),
            0
          );

        }
      );

    });

}


// ==========================================================
// SINCRONIZAÇÃO COM NÚCLEOS
// ==========================================================

function instalarObservacaoNucleos() {

  document
    .querySelectorAll(
      ".selNucleo"
    )
    .forEach(input => {

      if (
        input.dataset
          .pedagogicoObservado === "1"
      ) {
        return;
      }

      input.dataset
        .pedagogicoObservado = "1";

      input.addEventListener(
        "change",
        () => {

          setTimeout(
            () =>
              renderPainelPedagogico(),
            0
          );

        }
      );

    });

}


// ==========================================================
// BOTÃO PRIORIDADE AMA
// ==========================================================

window.marcarAMA = function() {

  const cfg =
    configuracaoAtualDaTela();

  document
    .querySelectorAll(
      ".desc input"
    )
    .forEach(input => {

      if (input.disabled) {
        return;
      }

      input.checked =
        PRIORIDADE_AMA.includes(
          input.value
        );

  });


  renderPainelPedagogico(cfg);


  // Atualiza seleção visual dos Núcleos.
  document
    .querySelectorAll(
      ".selNucleo"
    )
    .forEach(ch => {

      const nucleo =
        NUCLEOS_PEDAGOGICOS.find(
          n =>
            n.id ===
            ch.dataset.nucleo
        );

      if (!nucleo) return;

      const ativos =
        nucleo.descritores
          .map(d =>
            document.querySelector(
              `.desc input[value="${d}"]`
            )
          )
          .filter(
            x =>
              x &&
              !x.disabled
          );

      ch.checked =
        ativos.length > 0 &&
        ativos.every(
          x => x.checked
        );

    });


  alert(
    "🎯 Prioridade AMA selecionada.\n\n" +
    "O painel pedagógico foi atualizado " +
    "somente com os descritores que " +
    "participarão desta Arena."
  );

};


// ==========================================================
// BOTÃO LIMPAR
// ==========================================================

window.limpar = function() {

  document
    .querySelectorAll(
      ".desc input"
    )
    .forEach(input => {

      input.checked = false;

    });


  document
    .querySelectorAll(
      ".selNucleo"
    )
    .forEach(input => {

      input.checked = false;

    });


  renderPainelPedagogico({});


  alert(
    "Seleção da Arena limpa."
  );

};


// ==========================================================
// DISTRIBUIÇÃO PADRÃO DOS NÍVEIS
// ==========================================================

function aplicarDistribuicaoPadrao() {

  const abb =
    document.getElementById(
      "pctAbb"
    );

  const basico =
    document.getElementById(
      "pctBasico"
    );

  const prof =
    document.getElementById(
      "pctProficiente"
    );

  const avanc =
    document.getElementById(
      "pctAvancado"
    );


  // Mantemos a regra pedagógica:
  // ABB > Básico > Proficiente > Avançado.

  if (abb) {
    abb.value = 40;
  }

  if (basico) {
    basico.value = 35;
  }

  if (prof) {
    prof.value = 25;
  }

  if (avanc) {
    avanc.value = 0;
  }

}


// ==========================================================
// CORRIGE TEXTO EXPLICATIVO DA TELA
// ==========================================================

function corrigirTextoTela() {

  const config =
    document.getElementById(
      "configDescritores"
    );

  if (!config) return;

  const status =
    config.previousElementSibling;

  if (
    status &&
    status.classList.contains(
      "status"
    )
  ) {

    status.innerHTML = `

      <strong>
        🎯 CONFIGURAÇÃO PEDAGÓGICA DA ARENA
      </strong>

      <div
        class="small"
        style="margin-top:7px"
      >

        Abaixo aparecem
        <strong>
          somente os descritores selecionados
          para esta Arena.
        </strong>

        Para cada um serão apresentados:
        Núcleo/Habilidade,
        o que o descritor trabalha,
        partes da habilidade,
        nível prioritário
        e peso pedagógico.

        <br><br>

        <strong>
          Ordem de prioridade:
        </strong>

        Abaixo do Básico
        → Básico
        → Proficiente
        → Avançado.

      </div>

    `;

  }

}


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

function iniciarPainelPedagogico() {

  instalarEstilo();

  corrigirTextoTela();

  aplicarDistribuicaoPadrao();

  instalarObservacaoDescritores();

  instalarObservacaoNucleos();

  renderPainelPedagogico();

  console.log(
    "✅ Painel Pedagógico da Arena Matemática carregado."
  );

}


// O professor.html monta os descritores por JavaScript.
// Esperamos a matriz aparecer antes de instalar.
let tentativas = 0;

const espera = setInterval(
  () => {

    tentativas++;

    const descritores =
      document.querySelectorAll(
        ".desc input"
      );

    const config =
      document.getElementById(
        "configDescritores"
      );

    if (
      descritores.length &&
      config
    ) {

      clearInterval(espera);

      iniciarPainelPedagogico();

    }

    if (tentativas > 100) {

      clearInterval(espera);

      console.warn(
        "Painel Pedagógico: matriz de descritores não encontrada."
      );

    }

  },
  100
);
