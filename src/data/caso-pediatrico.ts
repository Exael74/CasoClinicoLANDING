import lesion1 from "@/assets/lesion-1.jpeg"
import lesion2 from "@/assets/lesion-2.jpeg"
import matrizQr from "@/assets/matriz.png"
import metagrafoQr from "@/assets/metagrafo.png"

export type CaseCardBase = {
  id: number
  resumen: string
}

export type PortadaCard = CaseCardBase & {
  tipo: "portada"
  titulo: string
}

export type TablaCard = CaseCardBase & {
  tipo: "tabla"
  tituloBanda: string
  filas: [string, string][]
}

export type ImagenCard = CaseCardBase & {
  tipo: "imagen"
  tituloBanda: string
  subtitulo: string
  imagenes: { src: string; alt: string }[]
}

export type LineaTiempoCard = CaseCardBase & {
  tipo: "linea-de-tiempo"
  tituloBanda: string
  hitos: { fecha: string; subtitulo?: string; puntos: string[] }[]
}

export type TextoCortoCard = CaseCardBase & {
  tipo: "texto-corto"
  tituloBanda: string
  encabezado?: string
  cita?: string
  parrafo?: string
}

export type ColumnasCard = CaseCardBase & {
  tipo: "columnas"
  tituloBanda: string
  columnas: { titulo: string; items: string[] }[]
}

export type ListaNumeradaCard = CaseCardBase & {
  tipo: "lista-numerada"
  tituloBanda: string
  items: { tituloCorto: string; texto: string; estado: string }[]
}

export type TextoLargoCard = CaseCardBase & {
  tipo: "texto-largo"
  tituloBanda: string
  destacado?: string
  parrafos: string[]
  factores?: { facilitadores: string[]; barrera: string[] }
}

export type QrPlaceholderCard = CaseCardBase & {
  tipo: "qr-placeholder"
  tituloBanda: string
  etiqueta: string
  qrSrc?: string
  url?: string
}

export type CaseCard =
  | PortadaCard
  | TablaCard
  | ImagenCard
  | LineaTiempoCard
  | TextoCortoCard
  | ColumnasCard
  | ListaNumeradaCard
  | TextoLargoCard
  | QrPlaceholderCard

export const CASE_CARDS: CaseCard[] = [
  {
    id: 1,
    tipo: "portada",
    titulo: "Caso pediátrico",
    resumen: "Fractura supracondílea de húmero izquierdo · caso clínico pediátrico.",
  },
  {
    id: 2,
    tipo: "tabla",
    tituloBanda: "Anamnesis",
    resumen: "Paciente de 10 años, masculino, procedente de Bogotá D.C.",
    filas: [
      ["Documento de identidad", "N/A"],
      ["Fecha de nacimiento", "25/04/2016"],
      ["Edad", "10 años"],
      ["Sexo", "Masculino"],
      ["Procedencia", "Bogotá D.C"],
      ["Estado civil", "Soltero"],
      ["Natural", "Bogotá D.C"],
      ["Ocupación", "Estudiante"],
    ],
  },
  {
    id: 3,
    tipo: "imagen",
    tituloBanda: "Diagnóstico médico",
    subtitulo: "Imagen relacionada con la lesión",
    resumen: "Fractura supracondílea de húmero izquierdo (tipo extensión).",
    imagenes: [
      {
        src: lesion1,
        alt: "Ilustración anatómica del codo izquierdo con fractura supracondílea de húmero de tipo extensión",
      },
      {
        src: lesion2,
        alt: "Ilustración del codo en vista anatómica con la zona de la fractura",
      },
    ],
  },
  {
    id: 4,
    tipo: "tabla",
    tituloBanda: "Antecedentes",
    resumen: "Sin antecedentes familiares, quirúrgicos ni farmacológicos relevantes.",
    filas: [
      ["Familiares y personales", "No refiere"],
      ["Quirúrgicos", "No refiere"],
      ["Farmacológicos", "No refiere"],
      ["Tóxico alérgicos", "No refiere"],
      ["Traumáticos", "No refiere"],
    ],
  },
  {
    id: 5,
    tipo: "texto-corto",
    tituloBanda: "Motivo de consulta",
    resumen: '"Tuve una fractura en el codo izquierdo."',
    encabezado: "El paciente refiere:",
    cita: "Tuve una fractura en el codo izquierdo",
  },
  {
    id: 6,
    tipo: "linea-de-tiempo",
    tituloBanda: "Cronología de la patología",
    resumen: "Del 14/07/26 al 05/08/26: caída, diagnóstico e inicio de fisioterapia.",
    hitos: [
      {
        fecha: "14/07/26",
        puntos: [
          "Caída durante actividad física.",
          "Impacto directo en codo izquierdo.",
          "Dolor intenso + edema + limitación funcional.",
          "Radiografía: fractura supracondílea de húmero izquierdo.",
          "Sin signos de derrame articular.",
          "Remisión a Ortopedia.",
        ],
      },
      {
        fecha: "15/07/26",
        subtitulo: "Diagnóstico confirmado",
        puntos: ["Inmovilización con férula de yeso.", "Control en 3 semanas."],
      },
      {
        fecha: "05/08/26",
        puntos: [
          "Retiro de férula.",
          "Consolidación ósea satisfactoria.",
          "Inicio de fisioterapia.",
          "Dolor en codo y región interescapular.",
          "Molestias asociadas a inmovilización y compensación postural.",
          "Objetivo: recuperar movilidad y función.",
        ],
      },
    ],
  },
  {
    id: 7,
    tipo: "texto-corto",
    tituloBanda: "Análisis sociodemográfico",
    resumen: "Vive con su núcleo familiar en Bogotá; asiste con normalidad al colegio.",
    parrafo:
      "Paciente vive con **madre, padre, hermana y abuela** en la ciudad de Bogotá, cuenta con el **apoyo económico y emocional** por parte de su vínculo familiar. Actualmente asiste con normalidad al colegio.",
  },
  {
    id: 8,
    tipo: "columnas",
    tituloBanda: "Expectativas, demandas y necesidades",
    resumen: "Volver a jugar fútbol y recuperar la movilidad del brazo.",
    columnas: [
      {
        titulo: "Expectativas",
        items: [
          '"Poder mover mi brazo sin problema"',
          '"Volver a jugar fútbol"',
        ],
      },
      {
        titulo: "Demandas",
        items: [
          '"Rehabilitación oportuna para la recuperación de la movilidad de mi antebrazo izquierdo"',
        ],
      },
      {
        titulo: "Necesidades",
        items: [
          "Recuperar progresivamente la movilidad, fuerza y funcionalidad del miembro superior izquierdo, disminuyendo la rigidez y las molestias asociadas a la inmovilización.",
        ],
      },
    ],
  },
  {
    id: 9,
    tipo: "lista-numerada",
    tituloBanda: "Set de hipótesis",
    resumen: "4 hipótesis fisioterapéuticas, todas validadas.",
    items: [
      {
        tituloCorto: "Limitación del ROM",
        texto:
          "La limitación del rango de movimiento del complejo articular de codo izquierdo es generada por la restricción articular con tope de final óseo y la rigidez de los tejidos periarticulares, secundarias a la inmovilización prolongada con férula.",
        estado: "Validada",
      },
      {
        tituloCorto: "Disminución de fuerza (MRC 2/5)",
        texto:
          "La disminución del rendimiento muscular en flexo-extensores de codo y muñeca izquierdos (MRC 2/5) es generada por el desuso muscular durante el periodo de inmovilización, lo que impide completar el ROM activo contra gravedad.",
        estado: "Validada",
      },
      {
        tituloCorto: "Alteración postural",
        texto:
          "La alteración de la alineación postural (cabeza inclinada, hombro izquierdo ascendido, actitud cifótica) es generada por el mantenimiento de una postura antiálgica-protectora del miembro superior izquierdo durante la inmovilización.",
        estado: "Validada",
      },
      {
        tituloCorto: "Dificultad funcional",
        texto:
          "La dificultad para realizar actividades funcionales finas (escribir) y gruesas (vestirse) es generada por la limitación conjunta de ROM y fuerza muscular del miembro superior izquierdo.",
        estado: "Validada",
      },
    ],
  },
  {
    id: 10,
    tipo: "texto-largo",
    tituloBanda: "Diagnóstico",
    resumen: "Deficiencias en estructuras y funciones del codo izquierdo (CIF).",
    parrafos: [
      "Paciente masculino de 10 años quien presenta deficiencias en estructuras de la extremidad superior (s730), específicamente en estructuras articulares y óseas del húmero izquierdo y el complejo articular del codo (s7300 y s73001), así como deficiencias funcionales en las funciones de la movilidad de la articulación (b710), las funciones de la fuerza muscular (b730), y las funciones relacionadas con la postura (b755), acompañadas de sensación de dolor (b280) localizado en la región húmero-cubital y tensión escapular.",
      "Estas alteraciones le generan limitaciones en la actividad para llevar a cabo tareas sencillas y complejas (d210 y d220), cambiar y mantener la postura corporal (d410-d429), la manipulación y el transporte de objetos (d430-d449), y dificultades específicas en el autocuidado como vestirse (d540) e higiene personal, así como restricciones en la participación en la vida escolar (relacionadas con la escritura) y en las áreas de la vida comunitaria, recreación y ocio (d920), limitando su desempeño en el juego y la práctica deportiva (como jugar fútbol). Todo esto interactúa con factores ambientales (e) que actúan como barreras temporales en su entorno físico y de apoyo durante su proceso de recuperación post inmovilización.",
    ],
  },
  {
    id: 11,
    tipo: "texto-largo",
    tituloBanda: "Pronóstico",
    resumen: "Recuperación funcional esperada en 8 a 12 semanas.",
    destacado: "8 a 12 semanas",
    parrafos: [
      "Paciente masculino de 10 años de edad, con antecedente de fractura supracondílea del húmero izquierdo (Gartland tipo I) secundaria a caída durante actividad física escolar, tratada de manera conservadora mediante inmovilización con férula tipo yeso durante 3 semanas de clasificación nivel I, con posibilidad de recuperación, limitación en la actividad y participación sin restricción funcional final según la escala de la OMS. Este pronóstico se considera teniendo en cuenta las fases de consolidación ósea satisfactoria a la tercera semana y de intervención fisioterapéutica temprana.",
      "Estudios recientes en traumatología pediátrica demuestran que, en pacientes con fracturas supracondíleas, en la mayoría de los casos evaluados se alcanza una consolidación ósea firme alrededor de las 4 semanas, permitiendo una evolución clínica excelente y rápida debido a la alta plasticidad biológica propia de su edad, lo que respalda el inicio de la carga mecánica controlada y la movilidad temprana a la restricción articular, mejoras en la debilidad muscular y en dolor post-inmovilización, así mismo se espera que con tratamiento adecuado tenga recuperación sin restricciones finales a corto y mediano plazo (8 a 12 semanas). (Varios Autores, 2023; Cucalón et al., 2025).",
      "Desde el enfoque fisioterapéutico se espera una progresión rápida hacia la movilidad completa y la eficacia de la mecánica de la marcha (balanceo del brazo izquierdo), siempre que se mantenga un adecuado proceso de rehabilitación enfocado en el control del dolor, la recuperación del rango de movimiento (superando el tope óseo y el déficit de extensión de -5°), el fortalecimiento muscular y la reeducación postural (Morales, 2022; Gutiérrez et al., 2020).",
      "El paciente cuenta con factores facilitadores como la edad (10 años), el amplio apoyo económico y emocional de su núcleo familiar (madre, padre, hermana y abuela), así como su motivación clara por volver a mover el brazo y jugar fútbol, lo que favorece ampliamente la adherencia al tratamiento. Como factores barrera, se destacan la intensidad del dolor agudo al movimiento activo (8/10 EVA), la marcada debilidad muscular (2/5 MRC) y las compensaciones posturales adquiridas tras el uso del inmovilizador (actitud cifótica, cabeza y hombros adelantados, ascenso del hemicuerpo izquierdo), los cuales pueden interferir inicialmente en la tolerancia al ejercicio terapéutico.",
    ],
    factores: {
      facilitadores: [
        "Edad (10 años)",
        "Apoyo económico y emocional del núcleo familiar",
        "Motivación clara por volver a mover el brazo y jugar fútbol",
      ],
      barrera: [
        "Dolor agudo al movimiento activo (8/10 EVA)",
        "Debilidad muscular marcada (2/5 MRC)",
        "Compensaciones posturales tras el uso del inmovilizador",
      ],
    },
  },
  {
    id: 12,
    tipo: "qr-placeholder",
    tituloBanda: "Metagrafo",
    etiqueta: "Metagrafo",
    resumen: "Escanea el código QR o abre el metagrafo.",
    qrSrc: metagrafoQr,
    url: "https://www.canva.com/design/DAHVIhHIVbw/AtMWZYC_OHixhVl6tYAOpA/edit",
  },
  {
    id: 13,
    tipo: "qr-placeholder",
    tituloBanda: "Matriz",
    etiqueta: "Matriz",
    resumen: "Escanea el código QR o abre la matriz.",
    qrSrc: matrizQr,
    url: "https://docs.google.com/spreadsheets/d/15-35GMLYdfI55oC_VXUgVpSTB_G_A1Lc/edit?gid=1247960741#gid=1247960741",
  },
]

export const CASO_PALETTE = {
  banda: "#8C1D2C",
  fondo: "#EFEFEF",
  filaAlterna: "#DCE3EA",
}

export const TAG_BY_TIPO: Record<CaseCard["tipo"], string> = {
  portada: "Portada",
  tabla: "Ficha clínica",
  imagen: "Imagenología",
  "linea-de-tiempo": "Cronología",
  "texto-corto": "Resumen",
  columnas: "Perfil",
  "lista-numerada": "Hipótesis",
  "texto-largo": "Análisis clínico",
  "qr-placeholder": "Código QR",
}

export function cardTitulo(card: CaseCard) {
  return card.tipo === "portada" ? card.titulo : card.tituloBanda
}
