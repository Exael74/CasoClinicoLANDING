import lesion1 from "@/assets/lesion-1.jpeg"
import lesion2 from "@/assets/lesion-2.jpeg"
import iconCasoPediatrico from "@/assets/icons/caso-pediatrico.png"
import iconAnamnesis from "@/assets/icons/anamnesis.png"
import iconDiagnosticoMedico from "@/assets/icons/diagnostico-medico.png"
import iconAntecedentes from "@/assets/icons/antecedentes.png"
import iconMotivo from "@/assets/icons/motivo.png"
import iconCronologia from "@/assets/icons/cronologia.png"
import iconSociodemografico from "@/assets/icons/sociodemografico.png"
import iconExpectativas from "@/assets/icons/expectativas.png"
import iconHipotesis from "@/assets/icons/hipotesis.png"
import iconDiagnostico from "@/assets/icons/diagnostico.png"
import iconPronostico from "@/assets/icons/pronostico.png"
import iconMetagrafo from "@/assets/icons/metagrafo.png"
import iconMatriz from "@/assets/icons/matriz.png"
import iconReferencias from "@/assets/icons/referencias.png"

export type CaseCardBase = {
  id: number
  resumen: string
  icon: string
}

export type PortadaCard = CaseCardBase & {
  tipo: "portada"
  titulo: string
  presentacion: { titulo: string; parrafos: string[] }
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
}

export type TextoCortoCard = CaseCardBase & {
  tipo: "texto-corto"
  tituloBanda: string
  encabezado?: string
  cita?: string
  parrafo?: string
  /** Gráfico opcional que se dibuja bajo el texto. */
  grafico?: "familia"
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
}

export type QrPlaceholderCard = CaseCardBase & {
  tipo: "qr-placeholder"
  tituloBanda: string
  etiqueta: string
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
    icon: iconCasoPediatrico,
    tipo: "portada",
    titulo: "Caso pediátrico",
    presentacion: {
      titulo: "Presentación del paciente",
      parrafos: [
        "Paciente masculino de 10 años, estudiante de quinto de primaria, con diagnóstico de fractura supracondílea del húmero izquierdo tras una caída durante actividad física. Requirió inmovilización con férula durante tres semanas y, después de este período, se retiró la férula e inició su proceso de rehabilitación fisioterapéutica.",
        "Actualmente presenta dolor 8/10 e hiperalgesia en el miembro superior izquierdo, además de limitación de la movilidad y disminución de la fuerza. También presenta dolor escapular asociado a compensaciones posturales.",
        "Vive con sus padres, hermana y abuela en Bogotá, cuenta con apoyo familiar y su principal expectativa es recuperar el movimiento del brazo y volver a jugar fútbol.",
      ],
    },
    resumen: "Fractura supracondílea de húmero izquierdo · caso clínico pediátrico.",
  },
  {
    id: 2,
    icon: iconAnamnesis,
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
    icon: iconDiagnosticoMedico,
    tipo: "imagen",
    tituloBanda: "Diagnóstico médico",
    subtitulo: "Imagen relacionada con la lesión",
    resumen: "Fractura supracondílea de húmero izquierdo (tipo flexión).",
    imagenes: [
      {
        src: lesion1,
        alt: "Ilustración anatómica del codo izquierdo con fractura supracondílea de húmero de tipo flexión",
      },
      {
        src: lesion2,
        alt: "Ilustración del codo en vista anatómica con la zona de la fractura",
      },
    ],
  },
  {
    id: 4,
    icon: iconAntecedentes,
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
    icon: iconMotivo,
    tipo: "texto-corto",
    tituloBanda: "Motivo de consulta",
    resumen: '"Tuve una fractura en el codo izquierdo."',
    encabezado: "El paciente refiere:",
    cita: "Tuve una fractura en el codo izquierdo",
  },
  {
    id: 6,
    icon: iconCronologia,
    tipo: "linea-de-tiempo",
    tituloBanda: "Cronología de la patología",
    resumen: "Del 14/07/26 al 05/08/26: caída, diagnóstico e inicio de fisioterapia.",
  },
  {
    id: 7,
    icon: iconSociodemografico,
    tipo: "texto-corto",
    tituloBanda: "Análisis sociodemográfico",
    resumen: "Vive con su núcleo familiar en Bogotá; asiste con normalidad al colegio.",
    parrafo:
      "Paciente vive con **madre, padre, hermana y abuela** en la ciudad de Bogotá, cuenta con el **apoyo económico y emocional** por parte de su vínculo familiar. Actualmente asiste con normalidad al colegio.",
    grafico: "familia",
  },
  {
    id: 8,
    icon: iconExpectativas,
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
    icon: iconHipotesis,
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
    icon: iconDiagnostico,
    tipo: "texto-largo",
    tituloBanda: "Diagnóstico",
    resumen: "Deficiencias en estructuras y funciones del codo izquierdo (CIF).",
    parrafos: [
      "Paciente masculino de 10 años quien presenta deficiencias en estructuras de la extremidad superior (s730), específicamente en estructuras articulares y óseas del húmero izquierdo y el complejo articular del codo (s7300 y s73001), así como deficiencias funcionales en las categorías de dolor, integridad esquelética, ROM, integridad y movilidad articular, postura e integridad sensorial.",
      "Estas alteraciones le generan limitaciones en la actividad para llevar a cabo tareas sencillas y complejas (d210 y d220), cambiar y mantener la postura corporal (d410-d429), la manipulación y el transporte de objetos (d430-d449), y dificultades específicas en el autocuidado como vestirse (d540) e higiene personal, así como restricciones en la participación en la vida escolar (relacionadas con la escritura) y en las áreas de la vida comunitaria, recreación y ocio (d920), limitando su desempeño en el juego y la práctica deportiva (como jugar fútbol). Todo esto interactúa con factores ambientales (e) que actúan como barreras temporales en su entorno físico y de apoyo durante su proceso de recuperación post inmovilización.",
    ],
  },
  {
    id: 11,
    icon: iconPronostico,
    tipo: "texto-largo",
    tituloBanda: "Pronóstico",
    resumen: "Recuperación funcional esperada en 8 a 12 semanas.",
    destacado: "8 a 12 semanas",
    parrafos: [
      "Paciente masculino de 10 años de edad, con antecedente de fractura supracondílea del húmero izquierdo (Gartland tipo I) secundaria a caída durante actividad física escolar, tratada de manera conservadora mediante inmovilización con férula tipo yeso durante 3 semanas de clasificación nivel I, con posibilidad de recuperación, limitación en la actividad y participación sin restricción funcional final según la escala de la OMS. Este pronóstico se considera teniendo en cuenta las fases de consolidación ósea satisfactoria a la tercera semana y de intervención fisioterapéutica temprana. Estudios recientes en traumatología pediátrica demuestran que, en pacientes con fracturas supracondíleas, en la mayoría de los casos evaluados se alcanza una consolidación ósea firme alrededor de las 4 semanas, permitiendo una evolución clínica excelente y rápida debido a la alta plasticidad biológica propia de su edad, lo que respalda el inicio de la carga mecánica controlada y la movilidad temprana a la restricción articular, mejoras en la debilidad muscular y en dolor post-inmovilización, así mismo se espera que con tratamiento adecuado tenga recuperación sin restricciones finales a corto y mediano plazo (8 a 12 semanas). (Diaz et al., 2023; Cucalón et al., 2025).",
      "Desde el enfoque fisioterapéutico se espera una progresión rápida hacia la movilidad completa y la eficacia de la mecánica de la marcha (balanceo del brazo izquierdo), siempre que se mantenga un adecuado proceso de rehabilitación enfocado en el control del dolor, la recuperación del rango de movimiento (superando el tope óseo y el déficit de extensión de -5°), el fortalecimiento muscular y la reeducación postural (Morales, 2022; Gutiérrez et al., 2020).",
      "El paciente cuenta con factores facilitadores como la edad (10 años), el amplio apoyo económico y emocional de su núcleo familiar (madre, padre, hermana y abuela), así como su motivación clara por volver a mover el brazo y jugar fútbol, lo que favorece ampliamente la adherencia al tratamiento. Como factores barrera, se destacan la intensidad del dolor agudo al movimiento activo (8/10 EVA), la marcada debilidad muscular (2/5 MRC) y las compensaciones posturales adquiridas tras el uso del inmovilizador (actitud cifótica, cabeza y hombros adelantados, ascenso del hemicuerpo izquierdo), los cuales pueden interferir inicialmente en la tolerancia al ejercicio terapéutico.",
    ],
  },
  {
    id: 12,
    icon: iconMetagrafo,
    tipo: "qr-placeholder",
    tituloBanda: "Metagrafo",
    etiqueta: "Metagrafo",
    resumen: "Abre el metagrafo del caso.",
    url: "https://www.canva.com/design/DAHVIhHIVbw/AtMWZYC_OHixhVl6tYAOpA/edit",
  },
  {
    id: 13,
    icon: iconMatriz,
    tipo: "qr-placeholder",
    tituloBanda: "Matriz",
    etiqueta: "Matriz",
    resumen: "Abre la matriz del caso.",
    url: "https://docs.google.com/spreadsheets/d/15-35GMLYdfI55oC_VXUgVpSTB_G_A1Lc/edit?gid=1247960741#gid=1247960741",
  },
  {
    id: 14,
    icon: iconReferencias,
    tipo: "qr-placeholder",
    tituloBanda: "Referencias adicionales",
    etiqueta: "Referencias adicionales",
    resumen: "Abre las referencias adicionales del caso.",
    url: "https://docs.google.com/document/d/1ZiDFMlfueyyseNp6eKp12Uh8wtpE_TU1OSVLVmRQguk/edit?usp=sharing",
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
  "qr-placeholder": "Enlace",
}

export function cardTitulo(card: CaseCard) {
  return card.tipo === "portada" ? card.titulo : card.tituloBanda
}
