/* OSM Argentina/Brasil — Catálogo (único origen de datos).
   Categorías y productos con campos i18n {es,pt,en}. Sin specs inventadas:
   los valores numéricos provienen del scraping de osmcnc.com; donde el
   fabricante no publica el dato se indica "Consultar / Sob consulta / On request". */
(function () {
  "use strict";

  // Valor "a consultar" en los 3 idiomas (para specs sin dato publicado).
  var ASK = { es: "Consultar", pt: "Sob consulta", en: "On request" };

  var CATEGORIES = [
    {
      slug: "industria-4-0",
      name: { es: "Industria 4.0", pt: "Industria 4.0", en: "Industria 4.0" },
      image: "assets/robotic-hp11030.webp",
      tagline: {
        es: "Automatización robótica de plegado",
        pt: "Automação robótica de dobra",
        en: "Robotic bending automation"
      },
      intro: {
        es: "Celdas de plegado robotizado que integran prensa, robot y software para producción continua sin operario.",
        pt: "Células de dobra robotizada que integram dobradeira, robô e software para produção contínua sem operador.",
        en: "Robotic bending cells integrating press brake, robot and software for continuous lights-out production."
      }
    },
    {
      slug: "cnc-press-brake",
      name: { es: "CNC Press Brake", pt: "CNC Press Brake", en: "CNC Press Brake" },
      image: "assets/og-100.webp",
      tagline: {
        es: "Prensas plegadoras CNC",
        pt: "Dobradeiras CNC",
        en: "CNC press brakes"
      },
      intro: {
        es: "Prensas plegadoras CNC hidráulicas y servoeléctricas de alta precisión y repetibilidad para chapa metálica. Elegí la serie según tu necesidad.",
        pt: "Dobradeiras CNC hidráulicas e servoelétricas de alta precisão e repetibilidade para chapa metálica. Escolha a série conforme sua necessidade.",
        en: "Hydraulic and servo-electric CNC press brakes with high precision and repeatability for sheet metal. Pick the series that fits your need."
      },
      series: [
        {
          slug: "og", name: { es: "Serie OG", pt: "Série OG", en: "OG Series" },
          image: "assets/og-100.webp",
          tagline: { es: "Hidráulica ascendente (up-acting)", pt: "Hidráulica ascendente (up-acting)", en: "Up-acting hydraulic" },
          intro: {
            es: "Prensas plegadoras hidráulicas de accionamiento ascendente, robustas y de alta precisión para chapa de gran longitud.",
            pt: "Dobradeiras hidráulicas de acionamento ascendente, robustas e de alta precisão para chapa de grande comprimento.",
            en: "Up-acting hydraulic press brakes, rugged and high-precision for long sheet metal."
          }
        },
        {
          slug: "hp", name: { es: "Serie HP", pt: "Série HP", en: "HP Series" },
          image: "assets/hp-11030.webp",
          tagline: { es: "Electrohidráulica", pt: "Eletro-hidráulica", en: "Electro-hydraulic" },
          intro: {
            es: "Prensas electrohidráulicas de doble articulación, potencia hidráulica con control electrónico para chapa grande.",
            pt: "Dobradeiras eletro-hidráulicas de dupla articulação, potência hidráulica com controle eletrônico para chapa grande.",
            en: "Dual-linkage electro-hydraulic press brakes: hydraulic power with electronic control for large sheets."
          }
        },
        {
          slug: "se", name: { es: "Serie SE", pt: "Série SE", en: "SE Series" },
          image: "assets/serie-se.webp",
          tagline: { es: "Servo 100% eléctrica", pt: "Servo 100% elétrica", en: "Full electric servo" },
          intro: {
            es: "Prensas plegadoras servo totalmente eléctricas: máxima precisión, eficiencia energética y diseño compacto.",
            pt: "Dobradeiras servo totalmente elétricas: máxima precisão, eficiência energética e design compacto.",
            en: "Fully electric servo press brakes: top precision, energy efficiency and compact design."
          }
        },
        {
          slug: "sh", name: { es: "Serie SH", pt: "Série SH", en: "SH Series" },
          image: "assets/serie-sh.webp",
          tagline: { es: "Híbrida dual-servo", pt: "Híbrida dual-servo", en: "Dual-servo hybrid" },
          intro: {
            es: "Prensas híbridas dual-servo que combinan accionamiento servo e hidráulico para potencia y precisión.",
            pt: "Dobradeiras híbridas dual-servo que combinam acionamento servo e hidráulico para potência e precisão.",
            en: "Dual-servo hybrid press brakes combining servo and hydraulic drive for power and precision."
          }
        }
      ]
    },
    {
      slug: "flexible-bending-center",
      name: { es: "Flexible Bending Center", pt: "Flexible Bending Center", en: "Flexible Bending Center" },
      image: "assets/zx-1600x.webp",
      tagline: {
        es: "Centro de plegado flexible",
        pt: "Centro de dobra flexível",
        en: "Flexible bending center"
      },
      intro: {
        es: "Centros de plegado automáticos con cambio rápido de molde y carga/descarga para piezas complejas y series cortas.",
        pt: "Centros de dobra automáticos com troca rápida de molde e carga/descarga para peças complexas e séries curtas.",
        en: "Automatic bending centers with rapid tool change and load/unload for complex parts and short runs."
      }
    }
  ];

  // ---- Contenido compartido de la serie OG (overview/aplicación, características
  //      y tabla de parámetros del tamaño OG-35; idéntico entre OG-35II y OG-35III). ----
  var OG_DESC = {
    es: [
      "La prensa plegadora de la serie OG conforma chapa de múltiples espesores con alta precisión gracias a una estructura hidráulica ascendente (up-acting) de doble guía y un sistema de compensación de ajuste fino por cuña inclinada. Combinada con un conjunto de molde de liberación rápida de doble lado y un sistema hidráulico de baja avería, procesa de forma eficiente y estable piezas de distintas formas.",
      "Equipada con tres cilindros hidráulicos de accionamiento sincronizado y tecnología FR Bending, alcanza una precisión ultraalta de ±0,5° y procesamiento de contornos complejos. Ideal para componentes de chasis automotriz, bandejas de baterías de nueva energía, disipadores 5G, recubrimientos de aleación de titanio aeroespacial y otras piezas irregulares; sirve a sectores premium como automotriz, baterías de potencia de nueva energía, optoelectrónica y aeroespacial."
    ],
    pt: [
      "A dobradeira da série OG conforma chapa de múltiplas espessuras com alta precisão graças a uma estrutura hidráulica ascendente (up-acting) de dupla guia e um sistema de compensação de ajuste fino por cunha inclinada. Combinada com um conjunto de molde de liberação rápida de duplo lado e um sistema hidráulico de baixa falha, processa de forma eficiente e estável peças de diferentes formas.",
      "Equipada com três cilindros hidráulicos de acionamento sincronizado e tecnologia FR Bending, alcança precisão ultra-alta de ±0,5° e processamento de contornos complexos. Ideal para componentes de chassi automotivo, bandejas de baterias de nova energia, dissipadores 5G, revestimentos de liga de titânio aeroespacial e outras peças irregulares; atende a setores premium como automotivo, baterias de potência de nova energia, optoeletrônica e aeroespacial."
    ],
    en: [
      "The OG series press brake forms multi-thickness sheet metal with high precision through a hydraulic up-acting dual-guide structure and an inclined wedge fine tuning compensation system. When combined with a dual-sided quick-release mold assembly and a low-fault hydraulic system, they efficiently and stably process various shaped workpieces.",
      "Equipped with triple hydraulic cylinders featuring synchronized drive and FR Bending Technology, this machine achieves ±0.5° ultra-high precision and complex contour processing. Ideal for automotive chassis components, new energy battery trays, 5G heat sinks, aerospace titanium alloy skins, and other irregular parts, it serves premium sectors including automotive manufacturing, new energy power batteries, optoelectronics, and aerospace."
    ]
  };
  var OG_FEATURE_BLOCKS = [
    {
      title: { es: "Alta eficiencia, precisión constante", pt: "Alta eficiência, precisão constante", en: "High Efficiency, Consistent Precision" },
      text: {
        es: "Diseñada específicamente para el plegado de chapa, combina operación de alta velocidad con precisión para lograr los ángulos/formas deseados tanto en chapa gruesa como fina, asegurando eficiencia de tiempo/mano de obra y calidad constante.",
        pt: "Projetada especificamente para a dobra de chapa, combina operação de alta velocidade com precisão para obter os ângulos/formas desejados tanto em chapa grossa quanto fina, garantindo eficiência de tempo/mão de obra e qualidade constante.",
        en: "Specifically engineered for metal sheet bending, combining high-speed operation with precision accuracy to deliver desired angles/shapes for both thick and thin plates, ensuring time/labor efficiency and consistent quality."
      }
    },
    {
      title: { es: "Molde versátil para amplias aplicaciones", pt: "Molde versátil para amplas aplicações", en: "Versatile Mold for Broad Applications" },
      text: {
        es: "Mediante matrices superiores/inferiores de distintos perfiles, permite la fabricación de piezas complejas para diversos requerimientos, con adaptación flexible a pedidos a medida.",
        pt: "Com matrizes superiores/inferiores de diferentes perfis, permite a fabricação de peças complexas para diversos requisitos, com adaptação flexível a pedidos sob medida.",
        en: "Utilizing upper/lower dies of various profiles, the system enables complex workpiece fabrication to meet diverse processing requirements, offering flexible adaptation to custom orders."
      }
    },
    {
      title: { es: "Sistema hidráulico integrado para operación confiable", pt: "Sistema hidráulico integrado para operação confiável", en: "Integrated Hydraulic System for Reliable Operation" },
      text: {
        es: "Con un sistema hidráulico ascendente de diseño integrado, logra una estructura compacta, baja tasa de fallas y mínimo mantenimiento para una operación confiable.",
        pt: "Com um sistema hidráulico ascendente de design integrado, alcança estrutura compacta, baixa taxa de falhas e mínima manutenção para operação confiável.",
        en: "Featuring an up-acting hydraulic system with integrated design, it achieves compact structure, low failure rate, and minimal maintenance requirements for reliable operation."
      }
    },
    {
      title: { es: "Estructura de doble guía para consistencia angular", pt: "Estrutura de dupla guia para consistência angular", en: "Dual Guide Structure Ensuring Angular Consistency" },
      text: {
        es: "El doble resguardo de guía lateral del cilindro y posicionamiento del tope superior asegura un movimiento suave del pisón y un control preciso del ángulo en cada ciclo de plegado.",
        pt: "O duplo resguardo de guia lateral do cilindro e posicionamento do batente superior garante movimento suave do martelo e controle preciso do ângulo em cada ciclo de dobra.",
        en: "Dual safeguards of cylinder side guidance and upper stopper positioning ensure smooth ram movement and precise angle control during every bending cycle."
      }
    },
    {
      title: { es: "Alternativa nacional rentable con servicio dedicado", pt: "Alternativa nacional rentável com serviço dedicado", en: "Cost-Effective Domestic Alternative with Dedicated Service" },
      text: {
        es: "Como prensa plegadora hidráulica ascendente, ofrece una relación costo-eficiencia óptima con asistencia técnica localizada y servicio posventa rápido, siendo la opción preferida por usuarios de gama media-alta.",
        pt: "Como dobradeira hidráulica ascendente, oferece ótima relação custo-eficiência com assistência técnica localizada e serviço pós-venda rápido, sendo a escolha preferida por usuários de gama média-alta.",
        en: "As an up-acting hydraulic press brake, it offers optimal cost-efficiency supported by localized technical assistance and rapid after-sales service, making it the preferred choice for mid-to-high-end users."
      }
    }
  ];
  var OG35_TAGLINE = {
    es: "Prensa plegadora hidráulica ascendente de 350 kN y 1250 mm.",
    pt: "Dobradeira hidráulica ascendente de 350 kN e 1250 mm.",
    en: "350 kN, 1250 mm up-acting hydraulic press brake."
  };
  // Helper: arma la tabla de 16 specs OG desde un array de valores (en orden).
  // v = [fuerza, mesa, longPlegado, distColumnas, carrera, daylight, vAprox,
  //      vPlegado, vRetorno, largo, ancho, alto, motor, potTotal, cable, peso]
  var OG_SPEC_LABELS = [
    ["Fuerza nominal", "Força nominal", "Nominal force"],
    ["Mesa de trabajo", "Mesa de trabalho", "Workbench"],
    ["Longitud de plegado", "Comprimento de dobra", "Bending length"],
    ["Distancia entre columnas", "Distância entre colunas", "Column distance"],
    ["Carrera", "Curso", "Stroke distance"],
    ["Apertura máx. (daylight)", "Abertura máx. (daylight)", "Max. daylight"],
    ["Velocidad de aproximación", "Velocidade de aproximação", "Approach speed"],
    ["Velocidad de plegado", "Velocidade de dobra", "Bending speed"],
    ["Velocidad de retorno", "Velocidade de retorno", "Return speed"],
    ["Dimensiones – Largo", "Dimensões – Comprimento", "Dimensions – Length"],
    ["Dimensiones – Ancho", "Dimensões – Largura", "Dimensions – Width"],
    ["Dimensiones – Alto", "Dimensões – Altura", "Dimensions – Height"],
    ["Potencia motor principal", "Potência motor principal", "Main motor power"],
    ["Potencia total", "Potência total", "Total power"],
    ["Cable de alimentación", "Cabo de alimentação", "Power supply cable"],
    ["Peso bruto (aprox.)", "Peso bruto (aprox.)", "Gross weight (approx.)"]
  ];
  function ogSpecs(v) {
    return OG_SPEC_LABELS.map(function (l, i) {
      return { label: { es: l[0], pt: l[1], en: l[2] }, value: v[i] };
    });
  }
  function ogTagline(force, len) {
    return {
      es: "Prensa plegadora hidráulica ascendente de " + force + " y " + len + ".",
      pt: "Dobradeira hidráulica ascendente de " + force + " e " + len + ".",
      en: force + ", " + len + " up-acting hydraulic press brake."
    };
  }
  //                       fuerza   mesa     plegado  columnas carrera daylight aprox       plegado     retorno  largo    ancho    alto     motor    total     cable      peso
  var OG35_SPECS  = ogSpecs(["350 kN", "1200 mm", "1250 mm", "1010 mm", "100 mm", "400 mm", "56–68 mm/s", "1–9.5 mm/s", "60 mm/s", "1450 mm", "1350 mm", "2150 mm", "3 kW",   "5 kW",   "2.5 mm²", "2100 kg"]);
  var OG50_SPECS  = ogSpecs(["500 kN", "1200 mm", "1250 mm", "1010 mm", "100 mm", "400 mm", "53–65 mm/s", "1–9.6 mm/s", "50 mm/s", "1500 mm", "1530 mm", "2110 mm", "4 kW",   "5.5 kW", "2.5 mm²", "2540 kg"]);
  var OG50L_SPECS = ogSpecs(["500 kN", "1500 mm", "1500 mm", "1310 mm", "100 mm", "400 mm", "53–65 mm/s", "1–9.6 mm/s", "45 mm/s", "1800 mm", "1450 mm", "2100 mm", "4 kW",   "5.5 kW", "2.5 mm²", "2900 kg"]);
  var OG60_SPECS  = ogSpecs(["600 kN", "2000 mm", "2200 mm", "1690 mm", "100 mm", "400 mm", "50–63 mm/s", "1–11 mm/s",  "40 mm/s", "2200 mm", "1400 mm", "2200 mm", "5.5 kW", "7 kW",   "4 mm²",   "3350 kg"]);
  var OG100_SPECS = ogSpecs(["1000 kN", "3000 mm", "3200 mm", "2540 mm", "100 mm", "400 mm", "50–63 mm/s", "1–13 mm/s", "55 mm/s", "3350 mm", "1600 mm", "2450 mm", "7.5 kW", "9 kW",   "4 mm²",   "6700 kg"]);
  var OG150_SPECS = ogSpecs(["1500 kN", "3200 mm", "3200 mm", "2540 mm", "100 mm", "400 mm", "50–63 mm/s", "1–13 mm/s", "50 mm/s", "3350 mm", "1600 mm", "2500 mm", "11 kW",  "12.5 kW", "6 mm²",  "8000 kg"]);
  var OG50_TAGLINE  = ogTagline("500 kN", "1250 mm");
  var OG50L_TAGLINE = ogTagline("500 kN", "1500 mm");
  var OG60_TAGLINE  = ogTagline("600 kN", "2200 mm");
  var OG100_TAGLINE = ogTagline("1000 kN", "3200 mm");
  var OG150_TAGLINE = ogTagline("1500 kN", "3200 mm");

  // ---- Contenido compartido de la serie HP (electrohidráulica). ----
  var HP_SPEC_LABELS = [
    ["Fuerza nominal", "Força nominal", "Nominal force"],
    ["Mesa de trabajo", "Mesa de trabalho", "Workbench"],
    ["Apertura (daylight)", "Abertura (daylight)", "Daylight"],
    ["Carrera", "Curso", "Stroke distance"],
    ["Velocidad de retorno", "Velocidade de retorno", "Return speed"],
    ["Velocidad de plegado", "Velocidade de dobra", "Bending speed"],
    ["Velocidad de aproximación", "Velocidade de aproximação", "Approach speed"],
    ["Dimensiones – Largo", "Dimensões – Comprimento", "Dimensions – Length"],
    ["Dimensiones – Ancho", "Dimensões – Largura", "Dimensions – Width"],
    ["Dimensiones – Alto", "Dimensões – Altura", "Dimensions – Height"],
    ["Capacidad total", "Capacidade total", "Total capacity"],
    ["Potencia por motor", "Potência por motor", "Single motor power"],
    ["Ejes controlados", "Eixos controlados", "Total controlled axes"],
    ["Peso bruto (aprox.)", "Peso bruto (aprox.)", "Gross weight (approx.)"]
  ];
  function hpSpecs(v) {
    return HP_SPEC_LABELS.map(function (l, i) {
      return { label: { es: l[0], pt: l[1], en: l[2] }, value: v[i] };
    });
  }
  function hpTagline(force, len) {
    return {
      es: "Prensa plegadora electrohidráulica CNC de " + force + " y " + len + ".",
      pt: "Dobradeira eletro-hidráulica CNC de " + force + " e " + len + ".",
      en: force + ", " + len + " electro-hydraulic CNC press brake."
    };
  }
  var HP_DESC = {
    es: [
      "La serie HP integra plataformas CNC Laimore/Delem/CybTouch con control estándar de 4+1 ejes (6+1 opcional). Se construye sobre un bastidor monobloque rígido y está equipada con hidráulica alemana HAWE/Rexroth, que aporta tonelaje y velocidad mediante balanceo de presión y eficiencia multietapa. Un sistema de tope trasero multieje permite el posicionamiento rápido de la pieza, mientras que la sincronización en lazo cerrado asegura precisión en el conformado de alta velocidad, especialmente en geometrías irregulares.",
      "Ideal para vehículos, baterías, chasis 5G y marcos de aluminio. Pliega muy bien materiales de alta resistencia. El utillaje modular y una librería de procesos inteligente permiten una producción flexible por lotes, convirtiéndola en una solución versátil para la fabricación de chapa metálica."
    ],
    pt: [
      "A série HP integra plataformas CNC Laimore/Delem/CybTouch com controle padrão de 4+1 eixos (6+1 opcional). É construída sobre um chassi monobloco rígido e equipada com hidráulica alemã HAWE/Rexroth, que entrega tonelagem e velocidade por meio de balanceamento de pressão e eficiência multiestágio. Um sistema de batente traseiro multieixo permite o posicionamento rápido da peça, enquanto a sincronização em malha fechada garante precisão na conformação de alta velocidade, especialmente em geometrias irregulares.",
      "Ideal para veículos, baterias, chassi 5G e estruturas de alumínio. Dobra muito bem materiais de alta resistência. O ferramental modular e uma biblioteca de processos inteligente permitem produção flexível em lotes, tornando-a uma solução versátil para a fabricação de chapa metálica."
    ],
    en: [
      "The HP series features Laimore/Delem/CybTouch CNC platforms with 4+1-axis standard control (6+1 optional). It is built on a rigid monoblock frame and is equipped with German HAWE/Rexroth hydraulics for tonnage and speed via pressure balancing and multi-stage efficiency. A multi-axis backgauge system enables fast part positioning, while full-loop synchronization ensures precision in high-speed forming, especially for irregular geometries.",
      "It's ideal for vehicles, batteries, 5G chassis, and aluminum frames. It bends high-strength materials well. Modular tooling and a smart process library support flexible batch production, making it a versatile solution for sheet metal fabrication."
    ]
  };
  var HP_FEATURE_BLOCKS = [
    {
      title: { es: "Sistema hidráulico HAWE AMB / Rexroth", pt: "Sistema hidráulico HAWE AMB / Rexroth", en: "HAWE AMB / Rexroth Hydraulic System" },
      text: {
        es: "Regulación de presión avanzada con ajuste adaptativo de tonelaje que reduce el consumo energético un 15–25%, balanceo de presión con estabilidad de ±1,5% y gestión térmica inteligente que mantiene el aceite a 40–55 °C.",
        pt: "Regulação de pressão avançada com ajuste adaptativo de tonelagem que reduz o consumo de energia em 15–25%, balanceamento de pressão com estabilidade de ±1,5% e gestão térmica inteligente que mantém o óleo a 40–55 °C.",
        en: "Advanced pressure regulation with adaptive tonnage adjustment reducing energy consumption 15–25%, pressure balancing achieving ±1.5% stability, and intelligent thermal management maintaining 40–55 °C oil temperature."
      }
    },
    {
      title: { es: "Pedal de pie", pt: "Pedal de pé", en: "Foot Pedal Switch" },
      text: {
        es: "Reduce la fatiga del operario y mejora la eficiencia. Con una resistencia mecánica de más de 1 millón de ciclos, asegura fiabilidad a largo plazo.",
        pt: "Reduz a fadiga do operador e melhora a eficiência. Com resistência mecânica de mais de 1 milhão de ciclos, garante confiabilidade a longo prazo.",
        en: "Reduces operator fatigue while enhancing operational efficiency. With a mechanical endurance exceeding 1 million cycles, it ensures long-term reliability."
      }
    },
    {
      title: { es: "Sistema de seguridad láser (opcional)", pt: "Sistema de segurança a laser (opcional)", en: "Laser Safety Protection System (optional)" },
      text: {
        es: "Sistema de seguridad láser de alta sensibilidad con monitoreo en tiempo real que detiene de inmediato el movimiento del pisón al detectar un obstáculo.",
        pt: "Sistema de segurança a laser de alta sensibilidade com monitoramento em tempo real que detém imediatamente o movimento do martelo ao detectar um obstáculo.",
        en: "High-sensitivity laser safety system with real-time monitoring that immediately halts ram movement upon obstacle detection."
      }
    },
    {
      title: { es: "Límite inferior arbitrario", pt: "Limite inferior arbitrário", en: "Arbitrary Lower Limit" },
      text: {
        es: "El control directo por encoder digital evita recorridos en vacío innecesarios y mejora la productividad.",
        pt: "O controle direto por encoder digital evita cursos em vazio desnecessários e melhora a produtividade.",
        en: "Direct digital encoder control prevents unnecessary empty travel and improves production efficiency."
      }
    },
    {
      title: { es: "Doble dispositivo de sujeción rápida", pt: "Duplo dispositivo de fixação rápida", en: "Double Quick Release and Clamping Device" },
      text: {
        es: "Instalación simple y estable que evita el desplazamiento de la herramienta, con ciclos rápidos de liberación/sujeción que reducen el tiempo de preparación.",
        pt: "Instalação simples e estável que evita o deslocamento da ferramenta, com ciclos rápidos de liberação/fixação que reduzem o tempo de preparação.",
        en: "Straightforward, stable installation preventing tool displacement, with rapid release/clamping cycles that reduce setup time."
      }
    }
  ];

  // ---- Contenido compartido de la serie SE (servo 100% eléctrica). ----
  // Mismos campos de spec que HP -> se reusa hpSpecs().
  function seTagline(force, len) {
    return {
      es: "Prensa plegadora servo eléctrica CNC de " + force + " y " + len + ".",
      pt: "Dobradeira servo elétrica CNC de " + force + " e " + len + ".",
      en: force + ", " + len + " full-electric servo CNC press brake."
    };
  }
  var SE_DESC = {
    es: [
      "La prensa plegadora servo 100% eléctrica de la serie SE usa dobles servomotores para accionar directamente husillos a bolas de alta resistencia, con control en lazo cerrado para calibración de posición en tiempo real (precisión de ±0,01 mm, respuesta de par en milisegundos). El diseño totalmente eléctrico reduce la complejidad (60% menos fallas, 50% menos mantenimiento). El tope trasero automático con servo multieje (1/2/4/6 ejes) y la planificación de trayectoria CNC permiten el plegado complejo de chapa fina.",
      "Orientada a sectores de alta gama: chapa automotriz, carcasas de baterías de nueva energía, filtros 5G, piezas de titanio aeroespacial. Procesa aluminio, acero inoxidable y aceros de alta resistencia, de la pieza única a la producción en serie. Sin contaminación hidráulica, bajo ruido y alta eficiencia energética: ideal para talleres limpios y chapa de precisión, especialmente en sectores médico y electrónico con exigencias estrictas de limpieza."
    ],
    pt: [
      "A dobradeira servo 100% elétrica da série SE usa duplos servomotores para acionar diretamente fusos de esferas de alta resistência, com controle em malha fechada para calibração de posição em tempo real (precisão de ±0,01 mm, resposta de torque em milissegundos). O design totalmente elétrico reduz a complexidade (60% menos falhas, 50% menos manutenção). O batente traseiro automático com servo multieixo (1/2/4/6 eixos) e o planejamento de trajetória CNC permitem a dobra complexa de chapa fina.",
      "Voltada a setores de alta gama: chapa automotiva, carcaças de baterias de nova energia, filtros 5G, peças de titânio aeroespacial. Processa alumínio, aço inoxidável e aços de alta resistência, da peça única à produção em série. Sem poluição hidráulica, baixo ruído e alta eficiência energética: ideal para oficinas limpas e chapa de precisão, especialmente nos setores médico e eletrônico com exigências rígidas de limpeza."
    ],
    en: [
      "The SE series full electric servo CNC press brake uses dual servo motors to direct-drive heavy-duty ball screws, with closed-loop control for real-time position calibration (±0.01 mm accuracy, millisecond torque response). The fully electric design reduces complexity (60% lower failure rate, 50% lower maintenance). Auto backgauge with multi-axis servo (1/2/4/6-axis) and CNC path planning enables complex thin-plate bending.",
      "Targets high-end sectors: automotive sheet metal, new energy battery casings, 5G filters, aerospace titanium parts. Processes aluminum/stainless steel/high-strength steel, covering single-piece to mass production. Zero hydraulic pollution, low noise, and high energy efficiency suit clean workshops and precision sheet metal, especially medical/electronics sectors with strict cleanliness needs."
    ]
  };
  var SE_SERVO_BLOCK = {
    title: { es: "Servoaccionamiento de alta eficiencia", pt: "Servoacionamento de alta eficiência", en: "High-Efficiency Servo Drive System" },
    text: {
      es: "Dos servomotores sincronizados accionan husillos a bolas de alta resistencia (alta eficiencia de transmisión, baja fricción), con detección de posición de alta precisión y realimentación en tiempo real (≤±0,03 mm de repetibilidad), presión de plegado uniforme y control de enlace inteligente que se adapta al proceso.",
      pt: "Dois servomotores sincronizados acionam fusos de esferas de alta resistência (alta eficiência de transmissão, baixa fricção), com detecção de posição de alta precisão e realimentação em tempo real (≤±0,03 mm de repetibilidade), pressão de dobra uniforme e controle de enlace inteligente que se adapta ao processo.",
      en: "Two synchronized servo motors drive heavy-duty ball screws (high transmission efficiency, low friction), with high-precision position detection and real-time feedback (≤±0.03 mm repeatable accuracy), consistent bending pressure and a smart linkage control that adapts to the process."
    }
  };
  // SE ficha: servo + (pedal, láser, límite inferior, sujeción rápida reusados de HP).
  var SE_FEATURE_BLOCKS = [SE_SERVO_BLOCK].concat(HP_FEATURE_BLOCKS.slice(1));

  // ---- Contenido compartido de la serie SH (híbrida dual-servo). ----
  function shTagline(force, len) {
    return {
      es: "Prensa plegadora híbrida dual-servo CNC de " + force + " y " + len + ".",
      pt: "Dobradeira híbrida dual-servo CNC de " + force + " e " + len + ".",
      en: force + ", " + len + " dual-servo hybrid CNC press brake."
    };
  }
  var SH_DESC = {
    es: [
      "El accionamiento híbrido oleo-eléctrico HAWE (Alemania) eleva la eficiencia energética de la serie SH un 50%, con una precisión de posicionamiento de 0,005 mm y una reducción de los costos de energía del 40%. El mecanismo de bombeo (crowning) asegura una precisión de plegado consistente en anchos de 500 a 3.200 mm. La escala magnética de 5 micras y el filtro de presión reducen el tiempo de ciclo un 10%, el uso de aceite hidráulico un 50% y el ruido.",
      "La serie SH apunta a piezas automotrices livianas, baterías de nueva energía, marcos de comunicación 5G y titanio aeroespacial. Procesa acero de alta resistencia, aluminio e inoxidable, admitiendo superficies curvas y producción flexible. Su tecnología híbrida de ahorro energético se alinea con la fabricación de bajo carbono."
    ],
    pt: [
      "O acionamento híbrido óleo-elétrico HAWE (Alemanha) eleva a eficiência energética da série SH em 50%, com precisão de posicionamento de 0,005 mm e redução dos custos de energia de 40%. O mecanismo de bombeamento (crowning) garante precisão de dobra consistente em larguras de 500 a 3.200 mm. A escala magnética de 5 mícrons e o filtro de pressão reduzem o tempo de ciclo em 10%, o uso de óleo hidráulico em 50% e o ruído.",
      "A série SH é voltada a peças automotivas leves, baterias de nova energia, estruturas de comunicação 5G e titânio aeroespacial. Processa aço de alta resistência, alumínio e inox, suportando superfícies curvas e produção flexível. Sua tecnologia híbrida de economia de energia alinha-se à fabricação de baixo carbono."
    ],
    en: [
      "Germany's HAWE oil-electric hybrid drive boosts SH series energy efficiency by 50%, delivering 0.005 mm positioning accuracy and cutting power costs by 40%. The crowning mechanism ensures consistent bending precision across 500–3,200 mm widths. A 5-micron magnetic scale and pressure filter reduce cycle time by 10%, hydraulic oil use by 50%, and noise.",
      "The SH series targets lightweight automotive parts, new energy batteries, 5G communication frames, and aerospace titanium. It processes high-strength steel, aluminum and stainless steel, supporting curved surfaces and flexible production. Hybrid energy-saving tech aligns with low-carbon manufacturing."
    ]
  };
  var SH_HYBRID_BLOCK = {
    title: { es: "Accionamiento híbrido HAWE ePrAX", pt: "Acionamento híbrido HAWE ePrAX", en: "HAWE ePrAX Hybrid Drive System" },
    text: {
      es: "Integra tecnologías hidráulica y servoeléctrica con conmutación inteligente entre operación eléctrica (baja carga) e hidráulica (alta carga): +50% de eficiencia energética, precisión de posicionamiento de 0,005 mm, control en lazo cerrado que autocalibra la presión de los ejes Y1/Y2, y bomba servo con filtro de presión para mayor estabilidad.",
      pt: "Integra tecnologias hidráulica e servoelétrica com comutação inteligente entre operação elétrica (baixa carga) e hidráulica (alta carga): +50% de eficiência energética, precisão de posicionamento de 0,005 mm, controle em malha fechada que autocalibra a pressão dos eixos Y1/Y2 e bomba servo com filtro de pressão para maior estabilidade.",
      en: "Integrates hydraulic and electric servo technologies with intelligent switching between electric (low-load) and hydraulic (high-load) operation: 50% higher energy efficiency, 0.005 mm positioning accuracy, closed-loop control that auto-calibrates Y1/Y2 axis pressure, and an integrated servo pump with pressure filter for stability."
    }
  };
  var SH_FEATURE_BLOCKS = [SH_HYBRID_BLOCK].concat(HP_FEATURE_BLOCKS.slice(1));

  var PRODUCTS = [
    {
      id: "robotic-automated-bending-workstation",
      category: "industria-4-0",
      name: "Robotic Automated Bending Workstation",
      model: "Celda robótica HP-11030",
      featured: true,
      images: ["assets/robotic-hp11030.webp"],
      source: "https://osmcnc.com/products/robotic-automated-bending-workstation-97.html",
      tagline: {
        es: "Celda de plegado robotizada para producción 24/7 sin operario.",
        pt: "Célula de dobra robotizada para produção 24/7 sem operador.",
        en: "Robotic bending cell for 24/7 lights-out production."
      },
      features: [
        { es: "Plegado de alta precisión con repetibilidad de hasta ±0,1 mm, asegurando resultados consistentes sin depender de operarios calificados.", pt: "Dobra de alta precisão com repetibilidade de até ±0,1 mm, garantindo resultados consistentes sem depender de operadores qualificados.", en: "High-precision bending with repeat accuracy up to ±0.1 mm, ensuring consistent results without relying on skilled operators." },
        { es: "Operación robótica totalmente automatizada que integra carga, posicionamiento, volteo, plegado y descarga.", pt: "Operação robótica totalmente automatizada que integra carga, posicionamento, viragem, dobra e descarga.", en: "Fully automated robotic operation integrating loading, positioning, flipping, bending, and unloading." },
        { es: "Producción continua de alta eficiencia, aumentando la productividad global de 2 a 5 veces.", pt: "Produção contínua de alta eficiência, aumentando a produtividade global de 2 a 5 vezes.", en: "Continuous high-efficiency production, increasing overall productivity by 2–5 times." },
        { es: "Reduce hasta un 80% la dependencia de mano de obra, minimizando costos de personal y gestión.", pt: "Reduz até 80% a dependência de mão de obra, minimizando custos de pessoal e gestão.", en: "Reduce up to 80% labor dependency, minimizing workforce and management costs." },
        { es: "Reduce los costos totales de producción en más del 50%, mejorando significativamente los márgenes.", pt: "Reduz os custos totais de produção em mais de 50%, melhorando significativamente as margens.", en: "Lower total production costs by over 50%, significantly improving profit margins." },
        { es: "Cambio de programa con un clic, ideal para producción flexible de múltiples productos y series cortas.", pt: "Troca de programa com um clique, ideal para produção flexível de múltiplos produtos e séries curtas.", en: "One-click program switching, ideal for flexible production with multiple products and small batches." }
      ],
      sections: [
        {
          type: "bullets",
          title: { es: "Estándares Industria 4.0", pt: "Padrões Indústria 4.0", en: "Industry 4.0 Standards" },
          subtitle: { es: "Integración perfecta con los principales sistemas robóticos", pt: "Integração perfeita com os principais sistemas robóticos", en: "Seamless Integration with Leading Robotic Systems" },
          image: "assets/robotic-cell.webp",
          caption: { es: "Celda HP-11030 con brazo robótico", pt: "Célula HP-11030 com braço robótico", en: "HP-11030 cell with robotic arm" },
          text: {
            es: "Nuestra prensa plegadora está diseñada para una compatibilidad perfecta con los brazos robóticos más utilizados, incluidos modelos de ABB, KUKA, Yaskawa y FANUC. Garantiza una integración sin esfuerzo en líneas de producción automatizadas cumpliendo los estándares de la Industria 4.0. El sistema admite comunicación en tiempo real, control adaptativo y coordinación inteligente para mejorar la eficiencia productiva y minimizar la intervención manual. Tanto para producción de alta variedad y bajo volumen como para fabricación a gran escala, ofrece la flexibilidad y eficiencia que exigen las aplicaciones industriales modernas.",
            pt: "Nossa dobradeira é projetada para compatibilidade perfeita com os braços robóticos mais usados, incluindo modelos da ABB, KUKA, Yaskawa e FANUC. Garante integração sem esforço em linhas de produção automatizadas cumprindo os padrões da Indústria 4.0. O sistema suporta comunicação em tempo real, controle adaptativo e coordenação inteligente para melhorar a eficiência produtiva e minimizar a intervenção manual. Seja para produção de alta variedade e baixo volume ou fabricação em larga escala, oferece a flexibilidade e eficiência exigidas pelas aplicações industriais modernas.",
            en: "Our press brake is meticulously engineered for seamless compatibility with mainstream robotic arms, including models from ABB, KUKA, Yaskawa, and FANUC. It guarantees effortless integration into automated production lines while meeting Industry 4.0 standards. The system supports real-time communication, adaptive control, and intelligent coordination to enhance production efficiency and minimize manual intervention. Whether you need a solution for high-mix, low-volume production or large-scale manufacturing, ours delivers the flexibility and efficiency required by modern industrial applications."
          },
          items: [
            { es: "Integración robótica perfecta", pt: "Integração robótica perfeita", en: "Seamless Robotic Integration" },
            { es: "Modos de producción flexibles", pt: "Modos de produção flexíveis", en: "Flexible Production Modes" },
            { es: "Sistema de control inteligente", pt: "Sistema de controle inteligente", en: "Intelligent Control System" },
            { es: "Cumplimiento de Industria 4.0", pt: "Conformidade com Indústria 4.0", en: "Industry 4.0 Compliance" },
            { es: "Alta precisión y consistencia", pt: "Alta precisão e consistência", en: "High Precision and Consistency" },
            { es: "Reserva de interfaces estándar", pt: "Reserva de interfaces padrão", en: "Standard Interface Reservation" }
          ]
        }
      ]
    },
    {
      id: "og-35ii",
      category: "cnc-press-brake",
      series: "og",
      name: "OSM OG-35II",
      model: "OG-35II",
      featured: true,
      images: ["assets/og-35ii.webp"],
      source: "https://osmcnc.com/products/og-35ii-up-acting-hydraulic-press-brake-16.html",
      tagline: OG35_TAGLINE,
      description: OG_DESC,
      featureBlocks: OG_FEATURE_BLOCKS,
      specs: OG35_SPECS
    },
    {
      id: "og-35iii",
      category: "cnc-press-brake",
      series: "og",
      name: "OSM OG-35III",
      model: "OG-35III",
      featured: false,
      images: ["assets/og-35iii.webp"],
      source: "https://osmcnc.com/products/og-35iii-up-acting-hydraulic-press-brake-43.html",
      tagline: OG35_TAGLINE,
      description: OG_DESC,
      featureBlocks: OG_FEATURE_BLOCKS,
      specs: OG35_SPECS
    },
    {
      id: "og-50ii",
      category: "cnc-press-brake",
      series: "og",
      name: "OSM OG-50II",
      model: "OG-50II",
      featured: false,
      images: ["assets/og-50ii.webp"],
      source: "https://osmcnc.com/products/og-50ii-up-acting-hydraulic-press-brake-77.html",
      tagline: OG50_TAGLINE,
      description: OG_DESC,
      featureBlocks: OG_FEATURE_BLOCKS,
      specs: OG50_SPECS
    },
    {
      id: "og-50iii",
      category: "cnc-press-brake",
      series: "og",
      name: "OSM OG-50III",
      model: "OG-50III",
      featured: false,
      images: ["assets/og-50iii.webp"],
      source: "https://osmcnc.com/products/og-50iii-up-acting-hydraulic-press-brake-44.html",
      tagline: OG50_TAGLINE,
      description: OG_DESC,
      featureBlocks: OG_FEATURE_BLOCKS,
      specs: OG50_SPECS
    },
    {
      id: "og-50lii",
      category: "cnc-press-brake",
      series: "og",
      name: "OSM OG-50LII",
      model: "OG-50LII",
      featured: false,
      images: ["assets/og-50lii.webp"],
      source: "https://osmcnc.com/products/og-50lii-up-acting-hydraulic-press-brake-78.html",
      tagline: OG50L_TAGLINE,
      description: OG_DESC,
      featureBlocks: OG_FEATURE_BLOCKS,
      specs: OG50L_SPECS
    },
    {
      id: "og-50liii", category: "cnc-press-brake", series: "og",
      name: "OSM OG-50LIII", model: "OG-50LIII", featured: false,
      images: ["assets/og-50liii.webp"],
      source: "https://osmcnc.com/products/og-50liii-up-acting-hydraulic-press-brake-45.html",
      tagline: OG50L_TAGLINE, description: OG_DESC, featureBlocks: OG_FEATURE_BLOCKS, specs: OG50L_SPECS
    },
    {
      id: "og-60iii", category: "cnc-press-brake", series: "og",
      name: "OSM OG-60III", model: "OG-60III", featured: false,
      images: ["assets/og-60iii.webp"],
      source: "https://osmcnc.com/products/og-60iii-up-acting-hydraulic-press-brake-46.html",
      tagline: OG60_TAGLINE, description: OG_DESC, featureBlocks: OG_FEATURE_BLOCKS, specs: OG60_SPECS
    },
    {
      id: "og-100ii", category: "cnc-press-brake", series: "og",
      name: "OSM OG-100II", model: "OG-100II", featured: false,
      images: ["assets/og-100ii.webp"],
      source: "https://osmcnc.com/products/og-100ii-up-acting-hydraulic-press-brake-80.html",
      tagline: OG100_TAGLINE, description: OG_DESC, featureBlocks: OG_FEATURE_BLOCKS, specs: OG100_SPECS
    },
    {
      id: "og-100iii", category: "cnc-press-brake", series: "og",
      name: "OSM OG-100III", model: "OG-100III", featured: true,
      images: ["assets/og-100iii.webp"],
      source: "https://osmcnc.com/products/og-100iii-up-acting-hydraulic-press-brake-47.html",
      tagline: OG100_TAGLINE, description: OG_DESC, featureBlocks: OG_FEATURE_BLOCKS, specs: OG100_SPECS
    },
    {
      id: "og-150ii", category: "cnc-press-brake", series: "og",
      name: "OSM OG-150II", model: "OG-150II", featured: false,
      images: ["assets/og-150ii.webp"],
      source: "https://osmcnc.com/products/og-150ii-up-acting-hydraulic-press-brake-81.html",
      tagline: OG150_TAGLINE, description: OG_DESC, featureBlocks: OG_FEATURE_BLOCKS, specs: OG150_SPECS
    },
    {
      id: "og-150iii", category: "cnc-press-brake", series: "og",
      name: "OSM OG-150III", model: "OG-150III", featured: true,
      images: ["assets/og-150iii.webp"],
      source: "https://osmcnc.com/products/og-150iii-up-acting-hydraulic-press-brake-48.html",
      tagline: OG150_TAGLINE, description: OG_DESC, featureBlocks: OG_FEATURE_BLOCKS, specs: OG150_SPECS
    },
    {
      id: "hp-5015", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-5015", model: "HP-5015", featured: false,
      images: ["assets/hp-5015.webp"],
      source: "https://osmcnc.com/products/hp-5015-electro-hydraulic-cnc-press-brake-64.html",
      tagline: hpTagline("500 kN", "1500 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["500 kN", "1500 mm", "460 mm", "160 mm", "150 mm/s", "8–12 mm/s", "160 mm/s", "2450 mm", "1700 mm", "2370 mm", "6 kVA", "4 kW", "4 / 6", "4 t"])
    },
    {
      id: "hp-6020", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-6020", model: "HP-6020", featured: false,
      images: ["assets/hp-6020.webp"],
      source: "https://osmcnc.com/products/hp-6020-electro-hydraulic-cnc-press-brake-63.html",
      tagline: hpTagline("600 kN", "2000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["600 kN", "2000 mm", "460 mm", "160 mm", "150 mm/s", "8–12 mm/s", "200 mm/s", "2650 mm", "1850 mm", "2380 mm", "9.5 kVA", "7.5 kW", "4 / 6", "4.7 t"])
    },
    {
      id: "hp-8025", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-8025", model: "HP-8025", featured: false,
      images: ["assets/hp-8025.webp"],
      source: "https://osmcnc.com/products/hp-8025-electro-hydraulic-cnc-press-brake-62.html",
      tagline: hpTagline("800 kN", "2500 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["800 kN", "2500 mm", "460 mm", "160 mm", "140–150 mm/s", "8–12 mm/s", "140–160 mm/s", "3180 mm", "1700 mm", "2380 mm", "10 kVA", "7.5 kW", "4 / 6", "5.8 t"])
    },
    {
      id: "hp-11030", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-11030", model: "HP-11030", featured: true,
      images: ["assets/hp-11030.webp"],
      source: "https://osmcnc.com/products/hp-11030-electro-hydraulic-cnc-press-brake-61.html",
      tagline: hpTagline("1100 kN", "3200 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["1100 kN", "3200 mm", "500 mm", "200 mm", "120–160 mm/s", "10–15 mm/s", "160–180 mm/s", "3950 mm", "1900 mm", "2450 mm", "14.5 kVA", "11 kW", "4+1 / 6+1", "7.6 t"])
    },
    {
      id: "hp-11040", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-11040", model: "HP-11040", featured: false,
      images: ["assets/hp-11040.webp"],
      source: "https://osmcnc.com/products/hp-11040-electro-hydraulic-cnc-press-brake-76.html",
      tagline: hpTagline("1100 kN", "4000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["1100 kN", "4000 mm", "500 mm", "200 mm", "120–130 mm/s", "10–15 mm/s", "160–180 mm/s", "4750 mm", "1850 mm", "2470 mm", "14.5 kVA", "11 kW", "4+1 / 6+1", "8.5 t"])
    },
    {
      id: "hp-13030", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-13030", model: "HP-13030", featured: false,
      images: ["assets/hp-13030.webp"],
      source: "https://osmcnc.com/products/hp-13030-electro-hydraulic-cnc-press-brake-60.html",
      tagline: hpTagline("1300 kN", "3200 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["1300 kN", "3200 mm", "500 mm", "200 mm", "110–120 mm/s", "9–14 mm/s", "160–180 mm/s", "3950 mm", "1850 mm", "2550 mm", "18.5 kVA", "15 kW", "4+1 / 6+1", "8 t"])
    },
    {
      id: "hp-13040", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-13040", model: "HP-13040", featured: false,
      images: ["assets/hp-13040.webp"],
      source: "https://osmcnc.com/products/hp-13040-electro-hydraulic-cnc-press-brake-59.html",
      tagline: hpTagline("1300 kN", "4000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["1300 kN", "4000 mm", "500 mm", "200 mm", "110–120 mm/s", "9–14 mm/s", "150–175 mm/s", "4750 mm", "1850 mm", "2570 mm", "18.5 kVA", "15 kW", "4+1 / 6+1", "9.6 t"])
    },
    {
      id: "hp-17030", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-17030", model: "HP-17030", featured: false,
      images: ["assets/hp-17030.webp"],
      source: "https://osmcnc.com/products/hp-17030-electro-hydraulic-cnc-press-brake-58.html",
      tagline: hpTagline("1700 kN", "3200 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["1700 kN", "3200 mm", "500 mm", "200 mm", "130–140 mm/s", "9–14 mm/s", "140–160 mm/s", "4000 mm", "1800 mm", "2650 mm", "21.5 kVA", "18.5 kW", "4+1 / 6+1", "8.8 t"])
    },
    {
      id: "hp-17040", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-17040", model: "HP-17040", featured: false,
      images: ["assets/hp-17040.webp"],
      source: "https://osmcnc.com/products/hp-17040-electro-hydraulic-cnc-press-brake-57.html",
      tagline: hpTagline("1700 kN", "4000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["1700 kN", "4000 mm", "500 mm", "200 mm", "120–130 mm/s", "9–14 mm/s", "130–150 mm/s", "4650 mm", "1900 mm", "2650 mm", "21.5 kVA", "18.5 kW", "4+1 / 6+1", "10.8 t"])
    },
    {
      id: "hp-20030", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-20030", model: "HP-20030", featured: false,
      images: ["assets/hp-20030.webp"],
      source: "https://osmcnc.com/products/hp-20030-electro-hydraulic-cnc-press-brake-56.html",
      tagline: hpTagline("2000 kN", "3200 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["2000 kN", "3200 mm", "500 / 550 mm", "200 mm", "120–137 mm/s", "8–9.5 mm/s", "120–140 mm/s", "4000 mm", "2050 mm", "2780 mm", "21.5 kVA", "18.5 kW", "4+1 / 6+1", "11.2 t"])
    },
    {
      id: "hp-20040", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-20040", model: "HP-20040", featured: true,
      images: ["assets/hp-20040.webp"],
      source: "https://osmcnc.com/products/hp-20040-electro-hydraulic-cnc-press-brake-55.html",
      tagline: hpTagline("2000 kN", "4000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["2000 kN", "4000 mm", "500 / 550 mm", "200 mm", "110–125 mm/s", "8–9 mm/s", "110–135 mm/s", "4680 mm", "1900 mm", "2820 mm", "21.5 kVA", "18.5 kW", "4+1 / 6+1", "13 t"])
    },
    {
      id: "hp-20050", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-20050", model: "HP-20050", featured: false,
      images: ["assets/hp-20050.webp"],
      source: "https://osmcnc.com/products/hp-20050-electro-hydraulic-cnc-press-brake-42.html",
      tagline: hpTagline("2000 kN", "5000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["2000 kN", "5000 mm", "500 / 550 mm", "200 mm", "105–115 mm/s", "7–8 mm/s", "100–120 mm/s", "5500 mm", "2000 mm", "2850 mm", "21.5 kVA", "18.5 kW", "4+1 / 6+1", "18 t"])
    },
    {
      id: "hp-25040", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-25040", model: "HP-25040", featured: false,
      images: ["assets/hp-25040.webp"],
      source: "https://osmcnc.com/products/hp-25040-electro-hydraulic-cnc-press-brake-41.html",
      tagline: hpTagline("2500 kN", "4000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["2500 kN", "4000 mm", "500 / 550 mm", "250 mm", "100–115 mm/s", "6–8 mm/s", "100–110 mm/s", "4670 mm", "1750 mm", "2750 mm", "21.5 kVA", "18.5 kW", "4+1 / 6+1", "15.89 t"])
    },
    {
      id: "hp-25050", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-25050", model: "HP-25050", featured: false,
      images: ["assets/hp-25050.webp"],
      source: "https://osmcnc.com/products/hp-25050-electro-hydraulic-cnc-press-brake-40.html",
      tagline: hpTagline("2500 kN", "5000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["2500 kN", "5000 mm", "500 / 550 mm", "250 mm", "95–110 mm/s", "5–8 mm/s", "90–105 mm/s", "5600 mm", "2200 mm", "2900 mm", "21.5 kVA", "18.5 kW", "4+1 / 6+1", "19 t"])
    },
    {
      id: "hp-32040", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-32040", model: "HP-32040", featured: false,
      images: ["assets/hp-32040.webp"],
      source: "https://osmcnc.com/products/hp-32040-electro-hydraulic-cnc-press-brake-39.html",
      tagline: hpTagline("3200 kN", "4000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["3200 kN", "4000 mm", "550 / 600 mm", "300 mm", "85–110 mm/s", "7–9.5 mm/s", "75–100 mm/s", "4800 mm", "2300 mm", "3700 mm", "24.5 kVA", "22 kW", "4+1 / 6+1", "24 t"])
    },
    {
      id: "hp-32050", category: "cnc-press-brake", series: "hp",
      name: "OSM HP-32050", model: "HP-32050", featured: false,
      images: ["assets/hp-32050.webp"],
      source: "https://osmcnc.com/products/hp-32050-electro-hydraulic-cnc-press-brake-38.html",
      tagline: hpTagline("3200 kN", "5000 mm"), description: HP_DESC, featureBlocks: HP_FEATURE_BLOCKS,
      specs: hpSpecs(["3200 kN", "5000 mm", "550 / 600 mm", "300 mm", "80–100 mm/s", "6–8 mm/s", "70–85 mm/s", "5600 mm", "2400 mm", "3700 mm", "24.5 kVA", "22 kW", "4+1 / 6+1", "28 t"])
    },
    {
      id: "sh-11030", category: "cnc-press-brake", series: "sh",
      name: "OSM SH-11030", model: "SH-11030", featured: true,
      images: ["assets/sh-11030.webp"],
      source: "https://osmcnc.com/products/sh-11030-dual-servo-hybrid-cnc-press-brake-33.html",
      tagline: shTagline("1100 kN", "3200 mm"), description: SH_DESC, featureBlocks: SH_FEATURE_BLOCKS,
      specs: hpSpecs(["1100 kN", "3200 mm", "500 mm", "200 mm", "170–190 mm/s", "10–15 mm/s", "180–200 mm/s", "3950 mm", "1900 mm", "2450 mm", "12.5 kVA", "4.4 kW", "4+1 / 6+1", "8.2 t"])
    },
    {
      id: "sh-13030", category: "cnc-press-brake", series: "sh",
      name: "OSM SH-13030", model: "SH-13030", featured: false,
      images: ["assets/sh-13030.webp"],
      source: "https://osmcnc.com/products/sh-13030-dual-servo-hybrid-cnc-press-brake-32.html",
      tagline: shTagline("1300 kN", "3200 mm"), description: SH_DESC, featureBlocks: SH_FEATURE_BLOCKS,
      specs: hpSpecs(["1300 kN", "3200 mm", "500 mm", "200 mm", "150–180 mm/s", "10–15 mm/s", "160–190 mm/s", "3950 mm", "1850 mm", "2550 mm", "14.5 kVA", "5.5 kW", "4+1 / 6+1", "8.6 t"])
    },
    {
      id: "sh-17030", category: "cnc-press-brake", series: "sh",
      name: "OSM SH-17030", model: "SH-17030", featured: false,
      images: ["assets/sh-17030.webp"],
      source: "https://osmcnc.com/products/sh-17030-dual-servo-hybrid-cnc-press-brake-34.html",
      tagline: shTagline("1700 kN", "3200 mm"), description: SH_DESC, featureBlocks: SH_FEATURE_BLOCKS,
      specs: hpSpecs(["1700 kN", "3200 mm", "500 mm", "200 mm", "140–170 mm/s", "8–13 mm/s", "150–180 mm/s", "4000 mm", "1800 mm", "2650 mm", "15 kVA", "5.5 kW", "4+1 / 6+1", "9.5 t"])
    },
    {
      id: "se-1608", category: "cnc-press-brake", series: "se",
      name: "OSM SE-1608", model: "SE-1608", featured: false,
      images: ["assets/se-1608.webp"],
      source: "https://osmcnc.com/products/se-1608-full-electric-servo-cnc-press-brake-51.html",
      tagline: seTagline("160 kN", "800 mm"), description: SE_DESC, featureBlocks: SE_FEATURE_BLOCKS,
      specs: hpSpecs(["160 kN", "800 mm", "450 mm", "150 mm", "160 mm/s", "5–15 mm/s", "140–160 mm/s", "1600 mm", "1120 mm", "2360 mm", "10.5 kVA", "7.5 kW", "3", "2.5 t"])
    },
    {
      id: "se-3512", category: "cnc-press-brake", series: "se",
      name: "OSM SE-3512", model: "SE-3512", featured: true,
      images: ["assets/se-3512.webp"],
      source: "https://osmcnc.com/products/se-3512-full-electric-servo-cnc-press-brake-52.html",
      tagline: seTagline("350 kN", "1250 mm"), description: SE_DESC, featureBlocks: SE_FEATURE_BLOCKS,
      specs: hpSpecs(["350 kN", "1250 mm", "450 mm", "180 mm", "180 mm/s", "5–20 mm/s", "170–200 mm/s", "1700 mm", "1670 mm", "2420 mm", "18.5 kVA", "7.5 kW", "6", "3.5 t"])
    },
    {
      id: "se-4015", category: "cnc-press-brake", series: "se",
      name: "OSM SE-4015", model: "SE-4015", featured: false,
      images: ["assets/se-4015.webp"],
      source: "https://osmcnc.com/products/se-4015-full-electric-servo-cnc-press-brake-53.html",
      tagline: seTagline("400 kN", "1500 mm"), description: SE_DESC, featureBlocks: SE_FEATURE_BLOCKS,
      specs: hpSpecs(["400 kN", "1500 mm", "480 mm", "180 mm", "190 mm/s", "10–20 mm/s", "150–200 mm/s", "2500 mm", "1700 mm", "2500 mm", "33.5 kVA", "15 kW", "6", "4.5 t"])
    },
    {
      id: "se-6020", category: "cnc-press-brake", series: "se",
      name: "OSM SE-6020", model: "SE-6020", featured: false,
      images: ["assets/se-6020.webp"],
      source: "https://osmcnc.com/products/se-6020-full-electric-servo-cnc-press-brake-54.html",
      tagline: seTagline("600 kN", "2000 mm"), description: SE_DESC, featureBlocks: SE_FEATURE_BLOCKS,
      specs: hpSpecs(["600 kN", "2000 mm", "480 mm", "180 mm", "170 mm/s", "5–10 mm/s", "120–170 mm/s", "2400 mm", "1800 mm", "2400 mm", "47.5 kVA", "22 kW", "6 / 6+1", "5.8 t"])
    },
    {
      id: "se-8025", category: "cnc-press-brake", series: "se",
      name: "OSM SE-8025", model: "SE-8025", featured: false,
      images: ["assets/se-8025.webp"],
      source: "https://osmcnc.com/products/se-8025-full-electric-servo-cnc-press-brake-93.html",
      tagline: seTagline("800 kN", "2500 mm"), description: SE_DESC, featureBlocks: SE_FEATURE_BLOCKS,
      specs: hpSpecs(["800 kN", "2500 mm", "480 mm", "180 mm", "170 mm/s", "5–20 mm/s", "120–170 mm/s", "3180 mm", "1800 mm", "2700 mm", "56.3 kVA", "25 kW", "6 / 6+1", "6.4 t"])
    },
    {
      id: "se-10025", category: "cnc-press-brake", series: "se",
      name: "OSM SE-10025", model: "SE-10025", featured: false,
      images: ["assets/se-10025.webp"],
      source: "https://osmcnc.com/products/se-10025-full-electric-servo-cnc-press-brake-94.html",
      tagline: seTagline("1000 kN", "2500 mm"), description: SE_DESC, featureBlocks: SE_FEATURE_BLOCKS,
      specs: hpSpecs(["1000 kN", "2500 mm", "500 mm", "200 mm", "170 mm/s", "5–20 mm/s", "120–170 mm/s", "3200 mm", "1800 mm", "2850 mm", "73.5 kVA", "35 kW", "6 / 6+1", "7.1 t"])
    },
    {
      id: "se-10030", category: "cnc-press-brake", series: "se",
      name: "OSM SE-10030", model: "SE-10030", featured: false,
      images: ["assets/se-10030.webp"],
      source: "https://osmcnc.com/products/se-10030-full-electric-servo-cnc-press-brake-96.html",
      tagline: seTagline("1000 kN", "3200 mm"), description: SE_DESC, featureBlocks: SE_FEATURE_BLOCKS,
      specs: hpSpecs(["1000 kN", "3200 mm", "500 mm", "200 mm", "120–150 mm/s", "5–30 mm/s", "120–175 mm/s", "3680 mm", "1650 mm", "2750 mm", "70.5 kVA", "33 kW", "6+1", "9.35 t"])
    },
    {
      id: "zx-1600x",
      category: "flexible-bending-center",
      name: "OSM ZX-1600X",
      model: "ZX-1600X",
      featured: true,
      images: ["assets/zx-1600x.webp"],
      source: "https://osmcnc.com/products/bending-center-zx-1600x-72.html",
      tagline: {
        es: "Centro de plegado flexible: 0,5 s/paso, cambio de herramienta en 30 s y operación 24/7.",
        pt: "Centro de dobra flexível: 0,5 s/passo, troca de ferramenta em 30 s e operação 24/7.",
        en: "Flexible bending center: 0.5 s/step, 30 s tool change and 24/7 operation."
      },
      description: {
        es: [
          "El centro de plegado flexible de la serie ZX adopta un diseño de bastidor tipo pórtico (gantry) combinado con un sistema CNC de nivel industrial y posicionamiento láser, que se ajusta automáticamente a las propiedades del material (acero, aluminio, inoxidable), alcanzando velocidades de plegado de 0,5 s/paso y cambios de herramienta en 30 s.",
          "Ideal para automoción, aeroespacial, comunicaciones 5G y electrodomésticos inteligentes, con fuerte alineación a los mercados de nueva energía y electrónica emergente. La sincronización servo multieje aumenta la eficiencia un 50% y reduce el consumo un 35%, soporta superficies curvas complejas en un solo conformado y se integra con robots ABB, KUKA, Yaskawa y FANUC según los estándares de la Industria 4.0."
        ],
        pt: [
          "O centro de dobra flexível da série ZX adota um design de chassi tipo pórtico (gantry) combinado com um sistema CNC de nível industrial e posicionamento a laser, que se ajusta automaticamente às propriedades do material (aço, alumínio, inox), alcançando velocidades de dobra de 0,5 s/passo e trocas de ferramenta em 30 s.",
          "Ideal para automotivo, aeroespacial, comunicações 5G e eletrodomésticos inteligentes, com forte alinhamento aos mercados de nova energia e eletrônica emergente. A sincronização servo multieixo aumenta a eficiência em 50% e reduz o consumo em 35%, suporta superfícies curvas complexas em uma única conformação e integra-se com robôs ABB, KUKA, Yaskawa e FANUC segundo os padrões da Indústria 4.0."
        ],
        en: [
          "The ZX series flexible bending center adopts a gantry-frame design paired with an industrial-grade CNC system and laser positioning, automatically adjusting to material properties (steel, aluminum, stainless steel) and achieving 0.5 s/step bending speeds and 30 s tooling changes.",
          "Suited for automotive, aerospace, 5G communication and intelligent home appliances, with strong alignment to new energy and emerging electronics markets. Multi-axis servo synchronization increases efficiency by 50% and cuts energy use by 35%, supports complex curved surfaces in a single forming, and integrates with ABB, KUKA, Yaskawa and FANUC robots per Industry 4.0 standards."
        ]
      },
      featureBlocks: [
        {
          title: { es: "Gestión rápida de herramientas", pt: "Gestão rápida de ferramentas", en: "Rapid Tool Management" },
          text: { es: "Cambio rápido de molde mediante librería de herramientas y sistema de memoria.", pt: "Troca rápida de molde mediante biblioteca de ferramentas e sistema de memória.", en: "Rapid mold change with a tool library and memory system." }
        },
        {
          title: { es: "Capacidad de automatización", pt: "Capacidade de automação", en: "Automation Capability" },
          text: { es: "Carga y descarga automáticas con operación continua 24/7.", pt: "Carga e descarga automáticas com operação contínua 24/7.", en: "Automatic loading/unloading and 24/7 operation." }
        },
        {
          title: { es: "Multifunción", pt: "Multifunção", en: "Multi-Functionality" },
          text: { es: "Procesamiento multitarea: una máquina reemplaza de 3 a 5 unidades convencionales.", pt: "Processamento multitarefa: uma máquina substitui de 3 a 5 unidades convencionais.", en: "Multi-task processing: one machine replaces 3–5 units." }
        },
        {
          title: { es: "Control de precisión", pt: "Controle de precisão", en: "Precision Control" },
          text: { es: "Posicionamiento láser + compensación por servomotor, con error de plegado ≤0,1°.", pt: "Posicionamento a laser + compensação por servomotor, com erro de dobra ≤0,1°.", en: "Laser positioning + servo motor compensation, bending error ≤0.1°." }
        },
        {
          title: { es: "Simulación de proceso", pt: "Simulação de processo", en: "Process Simulation" },
          text: { es: "Vista previa de simulación: importá planos y simulá el proceso de plegado antes de producir.", pt: "Pré-visualização de simulação: importe desenhos e simule o processo de dobra antes de produzir.", en: "Simulation preview: import drawings to simulate the bending process." }
        },
        {
          title: { es: "Sincronización servo", pt: "Sincronização servo", en: "Servo Synchronization" },
          text: { es: "Enlace multieje preciso que aumenta la eficiencia de mecanizado un 50% y reduce el consumo energético un 35%.", pt: "Enlace multieixo preciso que aumenta a eficiência de usinagem em 50% e reduz o consumo de energia em 35%.", en: "Precise multi-axis linkage that increases machining efficiency by 50% and reduces energy consumption by 35%." }
        }
      ],
      specs: [
        { label: { es: "Modelo", pt: "Modelo", en: "Model" }, value: "ZX-1600X" },
        { label: { es: "Estructura", pt: "Estrutura", en: "Structure" }, value: { es: "Bastidor tipo pórtico (gantry)", pt: "Chassi tipo pórtico (gantry)", en: "Gantry-frame design" } },
        { label: { es: "Velocidad de plegado", pt: "Velocidade de dobra", en: "Bending speed" }, value: { es: "0,5 s/paso", pt: "0,5 s/passo", en: "0.5 s/step" } },
        { label: { es: "Cambio de herramienta", pt: "Troca de ferramenta", en: "Tooling change" }, value: "30 s" },
        { label: { es: "Error de plegado", pt: "Erro de dobra", en: "Bending error" }, value: "≤ 0,1°" },
        { label: { es: "Posicionamiento", pt: "Posicionamento", en: "Positioning" }, value: { es: "Láser + compensación servo", pt: "Laser + compensação servo", en: "Laser + servo compensation" } },
        { label: { es: "Operación", pt: "Operação", en: "Operation" }, value: { es: "Automática 24/7", pt: "Automática 24/7", en: "Automatic 24/7" } },
        { label: { es: "Eficiencia", pt: "Eficiência", en: "Efficiency" }, value: { es: "+50% / consumo −35%", pt: "+50% / consumo −35%", en: "+50% / −35% energy" } },
        { label: { es: "Productividad", pt: "Produtividade", en: "Productivity" }, value: { es: "Reemplaza 3–5 máquinas", pt: "Substitui 3–5 máquinas", en: "Replaces 3–5 machines" } },
        { label: { es: "Robots compatibles", pt: "Robôs compatíveis", en: "Compatible robots" }, value: "ABB · KUKA · Yaskawa · FANUC" }
      ]
    }
  ];

  // ---- Secciones compartidas de la serie OG (contenido de toda la serie) ----
  var A = "assets/og-series/";
  var OG_SECTIONS = [
    {
      type: "mediaGrid",
      title: { es: "Detalles de la serie OG", pt: "Detalhes da série OG", en: "OG Series Press Brake Details" },
      items: [
        {
          image: A + "detail-foot-switch.webp",
          title: { es: "Pedal de pie", pt: "Pedal de pé", en: "Foot Switch" },
          text: {
            es: "El pedal reduce la intensidad de trabajo del operario y mejora la eficiencia. Vida mecánica de más de 1 millón de ciclos.",
            pt: "O pedal reduz a intensidade de trabalho do operador e melhora a eficiência. Vida mecânica de mais de 1 milhão de ciclos.",
            en: "The use of foot pedal switch effectively reduces the work intensity of the workers and improves efficiency. With a mechanical life of over 1 million cycles."
          }
        },
        {
          image: A + "detail-handwheel.webp",
          title: { es: "Volante de control de ejes D y L", pt: "Volante de controle dos eixos D e L", en: "Handwheel Control for D & L Axes" },
          text: {
            es: "Al realizar la primera prueba de plegado de la pieza, el ajuste por volante facilita la comprensión de la operación y mejora la seguridad.",
            pt: "Ao realizar o primeiro teste de dobra da peça, o ajuste por volante facilita a compreensão da operação e melhora a segurança.",
            en: "When the first piece bending test is performed, the handwheel adjustment function greatly facilitates understanding of the operation and improves security."
          }
        },
        {
          image: A + "detail-lower-limit.webp",
          title: { es: "Límite inferior arbitrario", pt: "Limite inferior arbitrário", en: "Arbitrary Lower Limit" },
          text: {
            es: "Mediante el control directo del encoder digital se controla la altura del tope de la mesa, evitando recorridos en vacío innecesarios y mejorando la productividad.",
            pt: "Por meio do controle direto do encoder digital controla-se a altura do batente da mesa, evitando cursos em vazio desnecessários e melhorando a produtividade.",
            en: "By using direct control of the digital encoder, the height of the worktable stop is directly controlled to avoid unnecessary empty travel, greatly improving production efficiency."
          }
        },
        {
          image: A + "detail-quick-clamp.webp",
          title: { es: "Doble dispositivo de sujeción rápida", pt: "Duplo dispositivo de fixação rápida", en: "Double Quick Release and Clamping Device" },
          text: {
            es: "El sujetador rápido de la herramienta superior asegura una instalación simple y estable, evita el desplazamiento de la herramienta, permite ciclos rápidos de liberación/sujeción y reduce el tiempo de preparación.",
            pt: "O fixador rápido da ferramenta superior garante instalação simples e estável, evita o deslocamento da ferramenta, permite ciclos rápidos de liberação/fixação e reduz o tempo de preparação.",
            en: "The upper tool quick-clamping device ensures straightforward and stable installation, prevents upper tool displacement, enables rapid release/clamping cycles, and significantly reduces setup time."
          }
        }
      ]
    },
    {
      type: "bullets",
      title: { es: "Cilindro hidráulico", pt: "Cilindro hidráulico", en: "Hydraulic Cylinder" },
      subtitle: { es: "Cilindro hidráulico de alto rendimiento", pt: "Cilindro hidráulico de alto desempenho", en: "High-Performance Hydraulic Cylinder" },
      image: A + "cylinder.webp",
      caption: { es: "Carcasa de alta resistencia anticorrosión", pt: "Carcaça de alta resistência anticorrosão", en: "Corrosion-resistant high-strength housing" },
      items: [
        { es: "Mayor resistencia: cuerpo de acero aleado de alta resistencia, con +30% de resistencia a la presión para alta carga y alta frecuencia.", pt: "Maior resistência: corpo de aço-liga de alta resistência, com +30% de resistência à pressão para alta carga e alta frequência.", en: "Enhanced Strength: high-strength alloy steel body with a 30% increase in pressure resistance for high-load, high-frequency operation." },
        { es: "Control preciso: respuesta rápida (≤0,1 s) y precisión de posicionamiento de ±0,05 mm para ángulos de plegado precisos.", pt: "Controle preciso: resposta rápida (≤0,1 s) e precisão de posicionamento de ±0,05 mm para ângulos de dobra precisos.", en: "Precision Control: rapid response (≤0.1 s) with ±0.05 mm positioning accuracy for precise bending angles." },
        { es: "Sellado avanzado: tecnología de sellado nano, alta resistencia al desgaste y a fugas, duplicando la vida útil y reduciendo costos.", pt: "Vedação avançada: tecnologia de vedação nano, alta resistência ao desgaste e a vazamentos, dobrando a vida útil e reduzindo custos.", en: "Advanced Sealing: nano-level sealing technology highly resistant to wear and leakage, doubling service life and reducing maintenance costs." },
        { es: "Eficiencia energética: circuito hidráulico de bajo consumo, 25% de ahorro frente a cilindros tradicionales.", pt: "Eficiência energética: circuito hidráulico de baixo consumo, 25% de economia frente a cilindros tradicionais.", en: "Energy Efficiency: low-consumption hydraulic circuit achieving 25% energy savings vs traditional cylinders." },
        { es: "Protección contra sobrepresión: alivio automático de presión al superar los límites seguros, protegiendo el equipo.", pt: "Proteção contra sobrepressão: alívio automático de pressão ao ultrapassar os limites seguros, protegendo o equipamento.", en: "Overpressure Protection: automatic pressure relief when pressure exceeds safe limits, safeguarding the equipment." }
      ]
    },
    {
      type: "mediaGrid",
      title: { es: "Estructura del bastidor (Core Frame)", pt: "Estrutura do chassi (Core Frame)", en: "Core Frame Structure" },
      items: [
        {
          image: A + "frame-cnc-machining.webp",
          title: { es: "Mecanizado CNC de una pieza", pt: "Usinagem CNC de uma peça", en: "One-piece CNC machining" },
          text: {
            es: "Las prensas se sueldan y luego se mecanizan como un todo en un centro de mecanizado CNC tipo pórtico, asegurando precisión e integridad estructural.",
            pt: "As dobradeiras são soldadas e depois usinadas como um todo num centro de usinagem CNC tipo pórtico, garantindo precisão e integridade estrutural.",
            en: "Our press brakes are welded into shape and then machined as a whole using a large gantry CNC machining center, ensuring superior precision and structural integrity."
          }
        },
        {
          image: A + "frame-nested.webp",
          title: { es: "Diseño de bastidor anidado", pt: "Design de chassi aninhado", en: "Nested frame design" },
          text: {
            es: "Frente a las estructuras soldadas tradicionales, el bastidor anidado elimina distorsión y deflexión, manteniendo geometría estable y precisión a largo plazo.",
            pt: "Frente às estruturas soldadas tradicionais, o chassi aninhado elimina distorção e deflexão, mantendo geometria estável e precisão a longo prazo.",
            en: "Compared to traditional welded structures, the nested frame design eliminates distortion and deflection, ensuring stable geometry and machining accuracy over long-term use."
          }
        },
        {
          image: A + "frame-welding.webp",
          title: { es: "Soldadura multicapa y multipasada", pt: "Soldagem multicamada e multipasse", en: "Multi-layer and multi-pass welding" },
          text: {
            es: "Soldadura robótica automática combinada con repaso manual. Cada unión del bastidor se suelda 10 veces según el estándar multicapa para máxima resistencia.",
            pt: "Soldagem robótica automática combinada com retoque manual. Cada junção do chassi é soldada 10 vezes segundo o padrão multicamada para máxima resistência.",
            en: "Robotic automatic welding combined with manual touch-up. Every connection on the frame is welded 10 times, following the multi-layer, multi-pass standard for maximum strength and durability."
          }
        },
        {
          image: A + "frame-tempering.webp",
          title: { es: "Templado integral", pt: "Têmpera integral", en: "Overall tempering" },
          text: {
            es: "Tras soldar el cuerpo como estructura integral, se somete a un templado a 400–650 °C, garantizando alta consistencia en la resistencia del cuerpo de la máquina.",
            pt: "Após soldar o corpo como estrutura integral, ele passa por uma têmpera a 400–650 °C, garantindo alta consistência na resistência do corpo da máquina.",
            en: "After the body is welded into an integral structure, it undergoes overall tempering at 400–650 °C, ensuring high consistency in the strength of the machine body."
          }
        },
        {
          image: A + "frame-painting.webp",
          title: { es: "Pintura protectora de triple capa", pt: "Pintura protetora de tripla camada", en: "Triple-layer protective painting" },
          text: {
            es: "El bastidor se granalla por completo y se recubre con una capa de imprimación y dos de acabado con pintura ecológica al agua, para excelente adherencia y un acabado que no se descascara.",
            pt: "O chassi é jateado por completo e recebe uma camada de primer e duas de acabamento com tinta ecológica à base de água, para excelente aderência e um acabamento que não descasca.",
            en: "The mainframe is fully sandblasted and coated with one primer layer and two topcoats using eco-friendly water-based paint, ensuring excellent adhesion and a finish that never peels."
          }
        },
        {
          image: A + "frame-manganese.webp",
          title: { es: "Acero de alto manganeso", pt: "Aço de alto manganês", en: "High manganese steel" },
          text: {
            es: "Fabricado con aceros de alto manganeso Q355 y Q235, del mismo tipo de alto límite elástico que el usado en buques de guerra, submarinos y puentes sobre el mar.",
            pt: "Fabricado com aços de alto manganês Q355 e Q235, do mesmo tipo de alto limite de escoamento usado em navios de guerra, submarinos e pontes sobre o mar.",
            en: "Made of high-manganese steel grades Q355 and Q235, the same high-yield-strength steel used in warships, submarines and cross-sea bridges."
          }
        }
      ]
    },
    {
      type: "mediaGrid",
      title: { es: "Tope trasero (Back Gauge) de la serie OG", pt: "Batente traseiro (Back Gauge) da série OG", en: "OG Series Back Gauge Assembly" },
      items: [
        {
          image: A + "backgauge-auto.webp",
          title: { es: "Tope trasero semiautomático / totalmente automático (opcional)", pt: "Batente traseiro semiautomático / totalmente automático (opcional)", en: "Semi-automatic / fully automatic back gauge assembly (optional)" },
          text: {
            es: "Ventajas de los bloques de tope de 2 / 3 ejes: A. Con escalas de guía lineal, los bloques se deslizan libremente a posiciones precisas con facilidad de movimiento. B. Escalas ajustables en modo manual/eléctrico unilateral para ajustes rápidos y precisos, facilitando la calibración del posicionamiento vertical.",
            pt: "Vantagens dos blocos de batente de 2 / 3 eixos: A. Com escalas de guia linear, os blocos deslizam livremente até posições precisas com facilidade de movimento. B. Escalas ajustáveis em modo manual/elétrico unilateral para ajustes rápidos e precisos, facilitando a calibração do posicionamento vertical.",
            en: "The advantages of 2-axis/3-axis back gauge blocks: A. Equipped with linear guide rail scales, back gauge blocks freely slide to precise positions with ease of movement. B. Scales adjustable via unilateral manual/electric modes for fast, precise adjustments, facilitating vertical positioning calibration."
          }
        },
        {
          image: A + "backgauge-manual.webp",
          title: { es: "Tope trasero manual (configuración estándar)", pt: "Batente traseiro manual (configuração padrão)", en: "Manual back gauge assembly (standard configuration)" },
          text: {
            es: "Utiliza una escala de acero de rigidez, dureza y resistencia a la deformación superiores. Tiene bloques de posicionamiento ajustables manualmente, fáciles de desmontar y reubicar, y se adapta a distintos requerimientos de plegado. La escala permite ajuste de altura unilateral, acomodando piezas de formas irregulares con una operación simple y amigable.",
            pt: "Utiliza uma escala de aço de rigidez, dureza e resistência à deformação superiores. Possui blocos de posicionamento ajustáveis manualmente, fáceis de desmontar e reposicionar, e adapta-se a diferentes requisitos de dobra. A escala permite ajuste de altura unilateral, acomodando peças de formas irregulares com operação simples e amigável.",
            en: "This back gauge assembly utilizes a steel scale with superior rigidity, hardness, and deformation resistance. It has manually adjustable positioning blocks that are easy to disassemble and relocate, and it adapts to different bending requirements. The scale features unilateral height adjustment capability, accommodating irregularly shaped workpieces during bending operations while ensuring simple and user-friendly operation."
          }
        }
      ]
    },
    {
      type: "mediaGrid",
      title: { es: "Funciones de plegado", pt: "Funções de dobra", en: "Powerful Bending Function" },
      items: [
        {
          image: A + "bend-slow.webp",
          title: { es: "Plegado lento", pt: "Dobra lenta", en: "Slow bending function" },
          text: {
            es: "Permite fijar la velocidad de plegado, la posición donde inicia el plegado lento y el tiempo de espera entre pasos, con ajuste digital o manual, mejorando flexibilidad y control de precisión.",
            pt: "Permite definir a velocidade de dobra, a posição onde inicia a dobra lenta e o tempo de espera entre passos, com ajuste digital ou manual, melhorando flexibilidade e controle de precisão.",
            en: "Lets you set the bending speed, where slow bending starts and the waiting time between steps, with digital or manual selection, improving processing flexibility and precision control."
          }
        },
        {
          image: A + "bend-pullback.webp",
          title: { es: "Retroceso y plegado (pull-back)", pt: "Recuo e dobra (pull-back)", en: "Pull-back and bending function" },
          text: {
            es: "Se activa tras sujetar el material: realiza un movimiento de subida y bajada para confirmar que la pieza está bien sujeta, evitando interferencias durante el plegado.",
            pt: "Ativa-se após fixar o material: realiza um movimento de subida e descida para confirmar que a peça está bem fixada, evitando interferências durante a dobra.",
            en: "Activated after the mold clamps the material; it performs an up-and-down movement to confirm the material is securely clamped, preventing interference during bending."
          }
        },
        {
          image: A + "bend-arc.webp",
          title: { es: "Plegado en arco circular", pt: "Dobra em arco circular", en: "Circular arc bending function" },
          text: {
            es: "Permite el plegado automático en arco ingresando el espaciado, convirtiendo los pasos en curvas suaves con precisión y consistencia para chapa metálica.",
            pt: "Permite a dobra automática em arco inserindo o espaçamento, convertendo os passos em curvas suaves com precisão e consistência para chapa metálica.",
            en: "Enables automatic arc bending by entering spacing, converting steps into smooth curves with precision and consistency for sheet metal applications."
          }
        },
        {
          image: A + "bend-line.webp",
          title: { es: "Plegado por marcado de línea", pt: "Dobra por marcação de linha", en: "Line marking bending function" },
          text: {
            es: "Asegura un conformado preciso posicionando líneas predibujadas y optimizando parámetros, moldes y sistemas inteligentes, mejorando eficiencia y consistencia.",
            pt: "Garante conformação precisa posicionando linhas pré-desenhadas e otimizando parâmetros, moldes e sistemas inteligentes, melhorando eficiência e consistência.",
            en: "Ensures precise forming by positioning pre-drawn lines and optimizing parameters, molds and intelligent systems, enhancing efficiency and consistency."
          }
        }
      ]
    },
    {
      type: "image",
      title: { es: "Tabla de referencia de tonelaje", pt: "Tabela de referência de tonelagem", en: "Press Brake Tonnage Reference Table" },
      image: A + "tonnage-chart.webp",
      caption: { es: "Tabla de presión de plegado (solo para plegado al aire).", pt: "Tabela de pressão de dobra (apenas para dobra ao ar).", en: "Bending pressure chart (for air bending only)." }
    },
    {
      type: "drawing",
      title: { es: "Plano dimensional de la serie OG", pt: "Desenho dimensional da série OG", en: "OG Series Drawing" },
      image: A + "drawing.webp",
      tableTitle: { es: "Dimensiones (mm)", pt: "Dimensões (mm)", en: "Dimensions (mm)" },
      headers: ["", "OG-35", "OG-50", "OG-50L", "OG-60", "OG-100", "OG-150 (3m)", "OG-150 (4m)"],
      rows: [
        ["A", "1400", "1400", "2000", "2170", "3090", "3300", "4200"],
        ["B", "1210", "1210", "1500", "2020", "3000", "3200", "4000"],
        ["C", "1010", "1020", "1320", "1700", "2550", "2550", "3100"],
        ["D", "300", "400", "400", "400", "400", "400", "400"],
        ["E", "280", "280", "280", "280", "280", "280", "280"],
        ["F", "400", "400", "400", "400", "400", "400", "400"],
        ["G", "60", "60", "60", "60", "90", "90", "90"],
        ["H", "1960", "1960", "2000", "2020", "2300", "2400", "2400"],
        ["I", "1210", "1220", "1500", "1900", "2800", "2800", "3350"],
        ["J", "950", "950", "950", "950", "1030", "1030", "1030"],
        ["L", "1065", "1290", "1290", "1290", "1390", "1500", "1500"]
      ]
    }
  ];
  // Buscar una sección de OG por su título en inglés (para reusar en HP).
  function ogSection(enTitle) {
    return OG_SECTIONS.filter(function (s) { return s.title && s.title.en === enTitle; })[0];
  }

  // ---- Secciones compartidas de la serie HP ----
  var H = "assets/hp-series/";
  var HP_SECTIONS = [
    {
      type: "bullets",
      title: { es: "Sistema hidráulico HAWE / Rexroth", pt: "Sistema hidráulico HAWE / Rexroth", en: "HAWE AMB / Rexroth Hydraulic System" },
      subtitle: { es: "Hidráulica alemana de alta eficiencia", pt: "Hidráulica alemã de alta eficiência", en: "High-efficiency German hydraulics" },
      image: H + "hydraulic.webp",
      caption: { es: "Sistema HAWE / Rexroth para prensas plegadoras CNC", pt: "Sistema HAWE / Rexroth para dobradeiras CNC", en: "HAWE / Rexroth system for CNC press brakes" },
      items: [
        { es: "Regulación de presión adaptativa y bloques de balanceo de presión para eficiencia y estabilidad de salida a largo plazo.", pt: "Regulação de pressão adaptativa e blocos de balanceamento de pressão para eficiência e estabilidade de saída a longo prazo.", en: "Adaptive pressure regulation and pressure-balancing blocks for efficiency and long-term output stability." },
        { es: "Reducción de consumo energético del 15–25%.", pt: "Redução de consumo de energia de 15–25%.", en: "15–25% reduction in energy consumption." },
        { es: "Disminución de la temperatura del aceite de hasta 40%.", pt: "Redução da temperatura do óleo de até 40%.", en: "Oil temperature reduced by up to 40%." },
        { es: "Vida útil de la bomba hidráulica extendida a 25.000 horas.", pt: "Vida útil da bomba hidráulica estendida a 25.000 horas.", en: "Hydraulic pump life extended to 25,000 hours." }
      ]
    },
    {
      type: "mediaGrid",
      title: { es: "Detalles de la serie HP", pt: "Detalhes da série HP", en: "HP Series Press Brake Details" },
      items: [
        {
          image: H + "detail-foot-switch.webp",
          title: { es: "Pedal de pie", pt: "Pedal de pé", en: "Foot Pedal Switch" },
          text: { es: "Reduce la fatiga del operario y mejora la eficiencia, con una resistencia mecánica de más de 1 millón de ciclos para fiabilidad industrial a largo plazo.", pt: "Reduz a fadiga do operador e melhora a eficiência, com resistência mecânica de mais de 1 milhão de ciclos para confiabilidade industrial a longo prazo.", en: "Reduces operator fatigue while enhancing efficiency, with a mechanical endurance exceeding 1 million cycles for long-term industrial reliability." }
        },
        {
          image: H + "detail-laser-safety.webp",
          title: { es: "Sistema de seguridad láser (opcional)", pt: "Sistema de segurança a laser (opcional)", en: "Laser Safety Protection System (optional)" },
          text: { es: "Sistema láser de alta sensibilidad con monitoreo en tiempo real que detiene de inmediato el pisón al detectar un obstáculo, previniendo lesiones y cumpliendo normas CE.", pt: "Sistema a laser de alta sensibilidade com monitoramento em tempo real que detém imediatamente o martelo ao detectar um obstáculo, prevenindo lesões e cumprindo normas CE.", en: "High-sensitivity laser system with real-time monitoring that immediately halts ram movement upon obstacle detection, preventing injury and meeting CE safety standards." }
        },
        {
          image: "assets/og-series/detail-lower-limit.webp",
          title: { es: "Límite inferior arbitrario", pt: "Limite inferior arbitrário", en: "Arbitrary Lower Limit" },
          text: { es: "El encoder digital controla directamente la altura del tope de la mesa para evitar recorridos en vacío, mejorando la productividad y la seguridad.", pt: "O encoder digital controla diretamente a altura do batente da mesa para evitar cursos em vazio, melhorando a produtividade e a segurança.", en: "The digital encoder directly controls the worktable stop height to avoid empty travel, improving production efficiency and safety." }
        },
        {
          image: "assets/og-series/detail-quick-clamp.webp",
          title: { es: "Doble dispositivo de sujeción rápida", pt: "Duplo dispositivo de fixação rápida", en: "Double Quick Release and Clamping Device" },
          text: { es: "El sujetador rápido de la herramienta superior asegura instalación simple y estable, evita el desplazamiento y permite ciclos rápidos de liberación/sujeción.", pt: "O fixador rápido da ferramenta superior garante instalação simples e estável, evita o deslocamento e permite ciclos rápidos de liberação/fixação.", en: "The upper tool quick-clamping device ensures straightforward, stable installation, prevents displacement and enables rapid release/clamping cycles." }
        },
        {
          image: H + "detail-magnetic-scale.webp",
          title: { es: "Escala magnética de precisión", pt: "Escala magnética de precisão", en: "Precision Magnetic Scale" },
          text: { es: "Escala de alta precisión con resolución de 0,5 a 5 μm, diseño resistente a vibraciones, inducción sin contacto y alta resistencia a la contaminación para un posicionamiento exacto.", pt: "Escala de alta precisão com resolução de 0,5 a 5 μm, design resistente a vibrações, indução sem contato e alta resistência à contaminação para posicionamento exato.", en: "High-precision scale with 0.5–5 μm resolution, vibration-resistant design, non-contact induction and superior pollution resistance for accurate positioning." }
        }
      ]
    },
    {
      type: "bullets",
      title: { es: "Sistema de tope trasero automático", pt: "Sistema de batente traseiro automático", en: "Automatic Backgauge System" },
      subtitle: { es: "Servo de alta precisión", pt: "Servo de alta precisão", en: "High-precision servo drive" },
      image: H + "backgauge.webp",
      caption: { es: "Tope trasero automático con doble husillo y guía lineal", pt: "Batente traseiro automático com duplo fuso e guia linear", en: "Automatic backgauge with dual ball screw and linear guide" },
      items: [
        { es: "Accionado por servomotores de alta precisión con doble husillo a bolas y guía lineal para velocidad, estabilidad y exactitud sobresalientes.", pt: "Acionado por servomotores de alta precisão com duplo fuso de esferas e guia linear para velocidade, estabilidade e exatidão excelentes.", en: "Driven by high-precision servo motors with dual ball screw and linear guide for outstanding speed, stability and accuracy." },
        { es: "Precisión de posicionamiento dentro de ±0,05 mm.", pt: "Precisão de posicionamento dentro de ±0,05 mm.", en: "Positioning accuracy within ±0.05 mm." },
        { es: "Configuración de ejes flexible: combinaciones opcionales de 1, 2 o 4 ejes según la necesidad de plegado.", pt: "Configuração de eixos flexível: combinações opcionais de 1, 2 ou 4 eixos conforme a necessidade de dobra.", en: "Flexible axis configuration: optional 1-, 2- or 4-axis combinations to meet different bending demands." },
        { es: "Detección inteligente anticolisión y funciones de memoria para mayor eficiencia y seguridad.", pt: "Detecção inteligente anticolisão e funções de memória para maior eficiência e segurança.", en: "Intelligent anti-collision detection and memory functions for enhanced efficiency and safety." }
      ]
    },
    {
      type: "mediaGrid",
      title: { es: "Sistema de control CNC", pt: "Sistema de controle CNC", en: "Press Brake CNC Control System" },
      items: [
        {
          image: H + "cnc-laimore.webp",
          title: { es: "Laimore EL15T / MT15T", pt: "Laimore EL15T / MT15T", en: "Laimore EL15T / MT15T" },
          text: { es: "Pantalla táctil color de alta definición con PLC embebido: programación gráfica 2D, cálculo de longitud y operación multimodo con simulación de plegado y coordinación entre dos máquinas.", pt: "Tela sensível ao toque colorida de alta definição com PLC embarcado: programação gráfica 2D, cálculo de comprimento e operação multimodo com simulação de dobra e coordenação entre duas máquinas.", en: "High-definition color touchscreen with embedded PLC: 2D graphical programming, length calculation and multi-mode operation with bending simulation and dual-machine coordination." }
        },
        {
          image: H + "cnc-delem.webp",
          title: { es: "Delem DA-53T", pt: "Delem DA-53T", en: "Delem DA-53T" },
          text: { es: "Pantalla ancha TFT de alta resolución con interfaz multitáctil industrial, diseño ergonómico y teclas de acceso rápido para una programación simple y amigable.", pt: "Tela ampla TFT de alta resolução com interface multitoque industrial, design ergonômico e teclas de acesso rápido para programação simples e amigável.", en: "High-resolution TFT widescreen with an industrial multi-touch interface, ergonomic design and shortcut keys for simple, user-friendly programming." }
        },
        {
          image: H + "cnc-step.webp",
          title: { es: "STEP Bending OS", pt: "STEP Bending OS", en: "STEP Bending Operating System" },
          text: { es: "HMI full-touch de 12/15\" con controladores de nueva generación: alta resolución, programación gráfica 2D, simulación de plegado 3D e importación de archivos DXF.", pt: "HMI full-touch de 12/15\" com controladores de nova geração: alta resolução, programação gráfica 2D, simulação de dobra 3D e importação de arquivos DXF.", en: "Full-touch HMI with 12/15\" displays and next-gen controllers: high resolution, 2D graphical programming, 3D bending simulation and DXF import." }
        },
        {
          image: H + "cnc-cybtouch.webp",
          title: { es: "CybTouch 12 PS / 15PS, VT19", pt: "CybTouch 12 PS / 15PS, VT19", en: "CybTouch 12 PS / 15PS, VT19" },
          text: { es: "Funcionalidad integral de plegado con calibración rápida, almacenamiento de procesos multietapa, operación manual y capacidades avanzadas de automatización.", pt: "Funcionalidade integral de dobra com calibração rápida, armazenamento de processos multietapa, operação manual e capacidades avançadas de automação.", en: "Comprehensive press-brake functionality with quick calibration, multi-step process storage, manual operation and advanced automation capabilities." }
        }
      ]
    },
    ogSection("Core Frame Structure"),
    ogSection("Powerful Bending Function"),
    ogSection("Press Brake Tonnage Reference Table")
  ];

  // Buscar una sección de HP por su título en inglés (para reusar en SE).
  function hpSection(enTitle) {
    return HP_SECTIONS.filter(function (s) { return s.title && s.title.en === enTitle; })[0];
  }

  // ---- Secciones compartidas de la serie SE ----
  var SES = "assets/se-series/";
  var SE_SECTIONS = [
    {
      type: "bullets",
      title: { es: "Servoaccionamiento de alta eficiencia", pt: "Servoacionamento de alta eficiência", en: "High-Efficiency Servo Drive System" },
      subtitle: { es: "Estable · Preciso · Potente", pt: "Estável · Preciso · Potente", en: "Stable · Precise · Powerful" },
      image: SES + "servo-drive.webp",
      caption: { es: "Transmisión por husillo a bolas de alta resistencia", pt: "Transmissão por fuso de esferas de alta resistência", en: "Heavy-duty ball screw transmission" },
      items: [
        { es: "Doble servomotor sincronizado: movimiento alternativo robusto y estable de la mesa.", pt: "Duplo servomotor sincronizado: movimento alternativo robusto e estável da mesa.", en: "Dual synchronized servo motors: robust, stable reciprocating worktable motion." },
        { es: "Husillos a bolas de uso industrial: alta eficiencia de transmisión, baja fricción y operación suave.", pt: "Fusos de esferas de uso industrial: alta eficiência de transmissão, baixa fricção e operação suave.", en: "Industrial-grade ball screws: high transmission efficiency, low friction, smooth operation." },
        { es: "Detección de posición de alta precisión y realimentación en tiempo real: repetibilidad ≤±0,03 mm.", pt: "Detecção de posição de alta precisão e realimentação em tempo real: repetibilidade ≤±0,03 mm.", en: "High-precision position detection and real-time feedback: ≤±0.03 mm repeatable accuracy." },
        { es: "Presión de plegado uniforme en toda la pieza.", pt: "Pressão de dobra uniforme em toda a peça.", en: "Consistent, uniform bending pressure across the part." },
        { es: "Control de enlace inteligente que se adapta automáticamente a los requisitos del proceso.", pt: "Controle de enlace inteligente que se adapta automaticamente aos requisitos do processo.", en: "Smart linkage control that automatically adapts to process requirements." }
      ]
    },
    { type: "mediaGrid", title: { es: "Detalles de la serie SE", pt: "Detalhes da série SE", en: "SE Series Press Brake Details" }, items: hpSection("HP Series Press Brake Details").items },
    hpSection("Automatic Backgauge System"),
    ogSection("Core Frame Structure"),
    ogSection("Powerful Bending Function"),
    hpSection("Press Brake CNC Control System"),
    ogSection("Press Brake Tonnage Reference Table")
  ];

  // ---- Secciones compartidas de la serie SH ----
  var SHS = "assets/sh-series/";
  var SH_SECTIONS = [
    {
      type: "bullets",
      title: { es: "Accionamiento híbrido HAWE ePrAX", pt: "Acionamento híbrido HAWE ePrAX", en: "HAWE ePrAX Hybrid Drive System" },
      subtitle: { es: "Híbrido óleo-eléctrico de alta eficiencia", pt: "Híbrido óleo-elétrico de alta eficiência", en: "High-efficiency oil-electric hybrid" },
      image: SHS + "hybrid-drive.webp",
      caption: { es: "Sistema híbrido HAWE ePrAX (Alemania)", pt: "Sistema híbrido HAWE ePrAX (Alemanha)", en: "HAWE ePrAX hybrid system (Germany)" },
      items: [
        { es: "Conmutación inteligente entre operación eléctrica (baja carga) e hidráulica (alta carga).", pt: "Comutação inteligente entre operação elétrica (baixa carga) e hidráulica (alta carga).", en: "Intelligent switching between electric (low-load) and hydraulic (high-load) operation." },
        { es: "+50% de eficiencia energética y −40% en costos de energía.", pt: "+50% de eficiência energética e −40% nos custos de energia.", en: "50% higher energy efficiency and 40% lower power costs." },
        { es: "Precisión de posicionamiento de 0,005 mm y capacidad de carrera de 400 mm.", pt: "Precisão de posicionamento de 0,005 mm e capacidade de curso de 400 mm.", en: "0.005 mm positioning accuracy and 400 mm stroke capability." },
        { es: "Control en lazo cerrado que autocalibra la presión de los ejes Y1/Y2.", pt: "Controle em malha fechada que autocalibra a pressão dos eixos Y1/Y2.", en: "Closed-loop control that auto-calibrates Y1/Y2 axis pressure." },
        { es: "Bomba servo integrada y filtro de presión: −10% tiempo de ciclo, −50% uso de aceite y menor ruido.", pt: "Bomba servo integrada e filtro de pressão: −10% tempo de ciclo, −50% uso de óleo e menor ruído.", en: "Integrated servo pump and pressure filter: −10% cycle time, −50% oil use and less noise." }
      ]
    },
    { type: "mediaGrid", title: { es: "Detalles de la serie SH", pt: "Detalhes da série SH", en: "SH Series Press Brake Details" }, items: hpSection("HP Series Press Brake Details").items },
    hpSection("Automatic Backgauge System"),
    ogSection("Core Frame Structure"),
    ogSection("Powerful Bending Function"),
    hpSection("Press Brake CNC Control System"),
    ogSection("Press Brake Tonnage Reference Table")
  ];

  // Adjuntar las secciones a las series OG, HP, SE y SH.
  (function () {
    var c = CATEGORIES.filter(function (x) { return x.slug === "cnc-press-brake"; })[0];
    if (!c) return;
    var byslug = {};
    c.series.forEach(function (s) { byslug[s.slug] = s; });
    if (byslug.og) byslug.og.sections = OG_SECTIONS;
    if (byslug.hp) byslug.hp.sections = HP_SECTIONS;
    if (byslug.se) byslug.se.sections = SE_SECTIONS;
    if (byslug.sh) byslug.sh.sections = SH_SECTIONS;
  })();

  var CONTACT = {
    countries: [
      {
        code: "br",
        label: "Brasil",
        whatsapp: "554199787178",
        whatsappDisplay: "+55 41 99787178",
        email: "osmcncbrasil@gmail.com",
        instagram: "https://www.instagram.com/osmcnc.br/",
        instagramHandle: "@osmcnc.br"
      },
      {
        code: "ar",
        label: "Argentina",
        whatsapp: "5491131442389",
        whatsappDisplay: "+54 9 11 3144-2389",
        email: "osmcncargentina@gmail.com",
        instagram: "https://www.instagram.com/osmcnc.arg/",
        instagramHandle: "@osmcnc.arg"
      }
    ]
  };

  window.OSM_DATA = {
    categories: CATEGORIES,
    products: PRODUCTS,
    contact: CONTACT,
    getCategory: function (slug) {
      return CATEGORIES.filter(function (c) { return c.slug === slug; })[0] || null;
    },
    getSeries: function (catSlug, serieSlug) {
      var c = this.getCategory(catSlug);
      if (!c || !c.series) return null;
      return c.series.filter(function (s) { return s.slug === serieSlug; })[0] || null;
    },
    getProduct: function (id) {
      return PRODUCTS.filter(function (p) { return p.id === id; })[0] || null;
    },
    productsByCategory: function (slug) {
      return PRODUCTS.filter(function (p) { return p.category === slug; });
    },
    productsBySeries: function (catSlug, serieSlug) {
      return PRODUCTS.filter(function (p) { return p.category === catSlug && p.series === serieSlug; });
    },
    // Helper: elige el texto del idioma (acepta string o {es,pt,en}).
    t: function (val, lang) {
      if (val == null) return "";
      if (typeof val === "string") return val;
      return val[lang] || val.es || "";
    }
  };
})();
