#!/usr/bin/env node
/**
 * Seeds the Medusa backend with the Karven Medical Furniture catalogue:
 * one collection per subfamily (handles must match src/lib/catalog.ts)
 * and sample products with technical metadata and temporary stock imagery.
 * Idempotent: collections/products are matched by handle and updated.
 *
 *   node scripts/seed-medusa.mjs            # reads front/.env.local
 *   node scripts/seed-medusa.mjs --prune    # also deletes products/collections not in this file
 */
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const env = Object.fromEntries(
  readFileSync(join(root, ".env.local"), "utf8").split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)
const BACKEND = (env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "").replace(/\/$/, "")
const PRUNE = process.argv.includes("--prune")
if (!BACKEND || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL / ADMIN_EMAIL / ADMIN_PASSWORD in .env.local")

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`
const IMG = {
  bed: img("1512678080530-7760d81faba6"), ward: img("1538108149393-fbbd81895907"), orTable: img("1516549655169-df83a0774514"),
  orRoom: img("1551076805-e1869033e561"), orTeam: img("1504439468489-c8920d796a29"), dental: img("1629909613654-28e377c37b09"),
  lab: img("1583912086096-8c60d75a53f9"), shelving: img("1579684385127-1ef15d508118"), reception: img("1519494026892-80bbd2d6fd0d"),
  consult: img("1666214280557-f1b5022eb634"), labBench: img("1581594549595-35f6edc7b762"),
}

// handle -> title (must match catalog.ts)
const COLLECTIONS = {
  "mesas-clinicas": "Mesas clínicas",
  "camillas-y-camas": "Camillas clínicas",
  "consultorio": "Mobiliario clínico en acero inoxidable",
  "unidades-odontologicas": "Unidades odontológicas",
  "carros-de-transporte": "Carros de transporte clínico",
  "carros-y-estaciones": "Carros de procedimientos",
  "carros-quirurgicos": "Carros quirúrgicos",
  "carros-de-hospitalizacion": "Carros de hospitalización",
  "carros-de-aislamiento": "Carros de aislamiento",
  "atriles-y-soportes": "Atriles clínicos y soportes móviles",
  "mesas-quirurgicas": "Mesas quirúrgicas",
  "mesas-de-instrumental": "Mesas de instrumental",
  "lavamanos-quirurgicos": "Lavamanos quirúrgicos",
  "estaciones-de-lavado": "Estaciones de lavado clínico",
  "laboratorio": "Mesas y superficies de trabajo",
  "almacenamiento-tecnico": "Almacenamiento técnico",
  "mesas-de-patologia": "Mesas especiales de patología",
  "superficies-sanitarias": "Superficies sanitarias especiales",
  "elementos-hospitalarios": "Elementos hospitalarios",
  "apoyo-y-circulacion": "Sistemas de apoyo y circulación",
}

const INOX304 = "Acero inoxidable AISI 304"
const INOX316 = "Acero inoxidable AISI 316"
const STD = { finish: "Satinado grano 180, soldadura TIG pulida", warranty: "3 años estructura · 1 año componentes" }

const P = (o) => o
const PRODUCTS = [
  // ── Clínico fijo
  P({ handle: "cama-hospitalaria-electrica-k300", title: "Cama clínica eléctrica KC-300", subtitle: "Tres motores, cinco posiciones, barandas abatibles", collection: "camillas-y-camas", price: 3850, sku: "KC-300", image: IMG.bed, badge: "Referencia",
    description: "Cama de hospitalización con tres motores de bajo ruido, posiciones Fowler y Trendelenburg, barandas abatibles en policarbonato y freno central. Estructura en acero inoxidable 304 con pintura epóxica en bastidor inferior. Colchón sanitario de 12 cm incluido.",
    metadata: { material: INOX304, gauge: "Calibre 16 (1.5 mm) en bastidor", ...STD, dimensions: "218 × 97 × 45–75 cm", capacity: "250 kg carga segura", wheels: "4 ruedas Ø125 mm, freno central", options: "Cabecero y piecero en HPL, portasuero, soporte de bolsa", features: ["Control de paciente y de enfermería con bloqueo", "Batería de respaldo 8 h", "Altura mínima 45 cm", "Colchón antiescaras incluido"] } }),
  P({ handle: "camilla-de-traslado-hidraulica", title: "Camilla de traslado hidráulica KC-120", subtitle: "Altura variable por pedal, plataforma radiotransparente", collection: "camillas-y-camas", price: 2190, sku: "KC-120", image: IMG.ward,
    description: "Camilla de urgencias con elevación hidráulica por pedal, respaldo neumático hasta 90°, plataforma radiotransparente y quinta rueda direccional para pasillos largos.",
    metadata: { material: INOX304, gauge: "Calibre 16 (1.5 mm)", ...STD, dimensions: "200 × 70 × 55–85 cm", capacity: "220 kg", wheels: "4 ruedas Ø200 mm + quinta rueda, freno y dirección", options: "Portasuero telescópico, porta-tanque de O₂, barandas plegables", features: ["Plataforma radiotransparente", "Respaldo neumático 0–90°", "Barandas plegables bajo colchoneta"] } }),
  P({ handle: "camilla-de-examen-k100", title: "Camilla de examen KC-100", subtitle: "Respaldo reclinable, tapicería sanitaria sin costuras", collection: "camillas-y-camas", price: 690, sku: "KC-100", image: IMG.consult,
    description: "Camilla fija de examen con respaldo reclinable por cremallera, portarrollo de papel y tapicería de vinil sanitario termosellada. Disponible en doce colores de tapicería.",
    metadata: { material: INOX304, gauge: "Tubo Ø32 mm calibre 18", ...STD, dimensions: "185 × 62 × 78 cm", capacity: "180 kg", options: "Escalón de dos peldaños, cajón inferior, tapicería a elección", features: ["Respaldo reclinable 0–45°", "Portarrollo integrado", "Regatones niveladores"] } }),
  P({ handle: "mesa-clinica-de-curaciones", title: "Mesa clínica de curaciones MC-90", subtitle: "Cubierta inox con baranda perimetral y entrepaño", collection: "mesas-clinicas", price: 420, sku: "MC-90", image: IMG.orRoom,
    description: "Mesa fija para curaciones y procedimientos menores. Cubierta de acero inoxidable 304 con baranda de 25 mm, entrepaño inferior y patas con regatones de nivelación.",
    metadata: { material: INOX304, gauge: "Calibre 18 (1.2 mm) cubierta, tubo 25 × 25 mm", ...STD, dimensions: "90 × 50 × 85 cm", capacity: "60 kg", options: "Cajón con cerradura, ruedas en lugar de regatones", features: ["Baranda perimetral 25 mm", "Entrepaño reforzado", "Esquinas redondeadas"] } }),
  P({ handle: "vitrina-medica-acero-inoxidable", title: "Vitrina de instrumental VI-200", subtitle: "Dos puertas de vidrio templado, cuatro entrepaños", collection: "consultorio", price: 880, sku: "VI-200", image: IMG.shelving,
    description: "Vitrina para instrumental y material estéril con estructura en acero inoxidable 304, puertas de vidrio templado de 5 mm con cerradura y cuatro entrepaños de vidrio regulables.",
    metadata: { material: INOX304, gauge: "Calibre 20 (0.9 mm) cuerpo, calibre 18 marco", ...STD, dimensions: "90 × 40 × 170 cm", capacity: "25 kg por entrepaño", options: "Entrepaños en inox, iluminación LED interior, base con ruedas", features: ["Cerradura con dos llaves", "Entrepaños regulables cada 5 cm", "Patas niveladoras"] } }),
  P({ handle: "escritorio-clinico-k40", title: "Escritorio clínico EC-160", subtitle: "Cubierta HPL antibacteriana, cajonera con llave", collection: "consultorio", price: 540, sku: "EC-160", image: IMG.reception,
    description: "Escritorio de consultorio con cubierta de laminado de alta presión antibacteriano, estructura metálica con pintura epóxica y cajonera de tres gavetas con cerradura. Canal de cables integrado.",
    metadata: { material: "Laminado HPL antibacteriano sobre estructura de acero", gauge: "Tubo 40 × 40 mm calibre 18", finish: "Pintura epóxica texturizada", warranty: "2 años", dimensions: "160 × 70 × 75 cm", options: "Cubierta en roble claro, blanco o gris; faldón frontal", features: ["Superficie antibacteriana", "Cajonera con llave", "Pasacables integrado"] } }),
  P({ handle: "unidad-odontologica-integral-k900", title: "Unidad odontológica integral UO-900", subtitle: "Sillón de tres motores, lámpara LED y módulo de cuatro instrumentos", collection: "unidades-odontologicas", price: 9450, sku: "UO-900", image: IMG.dental,
    description: "Unidad dental completa: sillón eléctrico con memoria de posiciones, lámpara LED sin sombras de 30.000 lux, escupidera de cerámica giratoria, módulo de instrumentos con cuatro salidas y banqueta de operador.",
    metadata: { material: "Aluminio fundido y acero con tapicería PU sin costuras", finish: "Pintura epóxica blanca, tapicería PU", warranty: "3 años", dimensions: "Área de trabajo 2.1 × 1.6 m", capacity: "200 kg", options: "Color de tapicería, segunda bandeja de asistente, sistema de agua independiente", features: ["Lámpara LED 30.000 lux", "Memoria de 3 posiciones", "Escupidera de cerámica", "Banqueta ergonómica incluida"] } }),
  // ── Clínico móvil
  P({ handle: "carro-de-curaciones-k20", title: "Carro de curaciones CP-20", subtitle: "Dos bandejas inox con baranda, cubeta y portabolsa", collection: "carros-y-estaciones", price: 390, sku: "CP-20", image: IMG.ward,
    description: "Carro de procedimientos con dos bandejas de acero inoxidable 304 con baranda perimetral, cubeta de desechos, portabolsa y ruedas de 75 mm con freno.",
    metadata: { material: INOX304, gauge: "Calibre 18 bandejas, tubo Ø25 mm", ...STD, dimensions: "75 × 45 × 90 cm", capacity: "40 kg", wheels: "4 ruedas Ø75 mm, 2 con freno", options: "Cajón superior, tercera bandeja, soporte de guantes", features: ["Baranda perimetral 20 mm", "Cubeta extraíble", "Portabolsa con tapa"] } }),
  P({ handle: "carro-de-medicacion-k25", title: "Carro de medicación CM-25", subtitle: "Seis cajones modulares con cerradura centralizada", collection: "carros-y-estaciones", price: 1290, sku: "CM-25", image: IMG.orRoom, badge: "Nuevo",
    description: "Carro de medicación con seis cajones modulares de ABS, cerradura centralizada, superficie de trabajo antibacteriana, portasuero y ruedas antiestáticas de 125 mm.",
    metadata: { material: "Estructura de aluminio anodizado, cajones ABS antibacteriano", finish: "Anodizado natural, ABS blanco", warranty: "3 años", dimensions: "68 × 52 × 100 cm", capacity: "60 kg", wheels: "4 ruedas Ø125 mm antiestáticas, 2 con freno", options: "Separadores de cajón, soporte de laptop, contenedor de punzocortantes", features: ["Cerradura centralizada con llave", "Cajones con cierre suave", "Portasuero integrado"] } }),
  P({ handle: "carro-de-transporte-de-ropa", title: "Carro de transporte de ropa CT-40", subtitle: "Cuerpo cerrado inox, puertas batientes, 400 litros", collection: "carros-de-transporte", price: 1150, sku: "CT-40", image: IMG.ward,
    description: "Carro cerrado para transporte de ropa limpia o sucia entre lavandería y pisos. Cuerpo soldado en acero inoxidable 304, puertas batientes con imán y parachoques perimetral.",
    metadata: { material: INOX304, gauge: "Calibre 20 cuerpo, calibre 16 bastidor", ...STD, dimensions: "110 × 65 × 150 cm", capacity: "400 L · 150 kg", wheels: "2 fijas + 2 giratorias Ø160 mm con freno", options: "Divisor interior, versión con tapa superior, color de identificación", features: ["Parachoques perimetral de PVC", "Puertas con cierre magnético", "Fondo con desagüe"] } }),
  P({ handle: "carro-de-anestesia", title: "Carro de anestesia CQ-60", subtitle: "Cinco cajones, superficie extensible y riel de accesorios", collection: "carros-quirurgicos", price: 1680, sku: "CQ-60", image: IMG.orTeam,
    description: "Carro de anestesia con cinco cajones de distinta altura, cerradura, superficie de trabajo extensible y riel lateral para accesorios. Ruedas antiestáticas para quirófano.",
    metadata: { material: INOX304, gauge: "Calibre 18", ...STD, dimensions: "70 × 50 × 95 cm", capacity: "80 kg", wheels: "4 ruedas Ø100 mm antiestáticas, 2 con freno", options: "Soporte de monitor, portatanque de O₂, contenedor de punzocortantes", features: ["Cajones con cierre suave y tope", "Riel estándar 25 × 10 mm", "Superficie extensible 30 cm"] } }),
  P({ handle: "carro-de-paro", title: "Carro de paro CH-50", subtitle: "Cajones con sello de seguridad, tabla de RCP y soporte de desfibrilador", collection: "carros-de-hospitalizacion", price: 1490, sku: "CH-50", image: IMG.reception,
    description: "Carro de emergencias con cinco cajones sellables, tabla de reanimación, soporte giratorio de desfibrilador, portasuero y porta-tanque de oxígeno.",
    metadata: { material: INOX304, gauge: "Calibre 18", ...STD, dimensions: "72 × 55 × 98 cm", capacity: "80 kg", wheels: "4 ruedas Ø125 mm, 2 con freno", options: "Sellos numerados, soporte de monitor, cajón de medicamentos controlados", features: ["Sistema de sellos de seguridad", "Tabla de RCP incluida", "Portatanque de O₂ tipo E"] } }),
  P({ handle: "carro-de-aislamiento", title: "Carro de aislamiento CA-30", subtitle: "Dispensadores de EPP, contenedor de desechos y tapa", collection: "carros-de-aislamiento", price: 760, sku: "CA-30", image: IMG.reception,
    description: "Carro para áreas de aislamiento con dispensadores de guantes, batas y mascarillas, contenedor de desechos con tapa accionada por pedal y superficie de trabajo.",
    metadata: { material: INOX304, gauge: "Calibre 20", ...STD, dimensions: "60 × 45 × 120 cm", capacity: "30 kg", wheels: "4 ruedas Ø75 mm, 2 con freno", options: "Dispensador de alcohol gel, señalética de aislamiento", features: ["Tapa de desechos por pedal", "Tres dispensadores de guantes", "Gancho para batas"] } }),
  P({ handle: "atril-portasuero", title: "Atril portasuero AP-4", subtitle: "Cuatro ganchos, altura regulable, base de cinco ruedas", collection: "atriles-y-soportes", price: 145, sku: "AP-4", image: IMG.bed,
    description: "Portasuero de altura regulable con cuatro ganchos, tubo telescópico con perilla de bloqueo y base de cinco ruedas para máxima estabilidad.",
    metadata: { material: INOX304, gauge: "Tubo Ø25/19 mm calibre 18", ...STD, dimensions: "Altura 120–210 cm, base Ø60 cm", capacity: "8 kg por gancho", wheels: "5 ruedas Ø50 mm", options: "Base con ruedas antiestáticas, soporte de bomba de infusión", features: ["Bloqueo por perilla", "Ganchos redondeados", "Base de cinco brazos"] } }),
  // ── Quirúrgico
  P({ handle: "mesa-quirurgica-electrohidraulica-k700", title: "Mesa quirúrgica electrohidráulica MQ-700", subtitle: "Control por mando, tablero radiotransparente, riel universal", collection: "mesas-quirurgicas", price: 24900, sku: "MQ-700", image: IMG.orTable, badge: "Serie quirúrgica",
    description: "Mesa de operaciones de uso general con movimientos electrohidráulicos de altura, Trendelenburg, lateral y secciones de respaldo y piernas. Tablero radiotransparente compatible con arco en C y riel lateral universal.",
    metadata: { material: INOX304, gauge: "Columna calibre 14, tablero de resina fenólica", ...STD, dimensions: "208 × 55 × 60–100 cm", capacity: "300 kg", wheels: "Base con freno hidráulico central", options: "Accesorios de ortopedia, soporte de cabeza neuro, colchonetas viscoelásticas", features: ["Compatible con arco en C", "Mando con cable y respaldo manual", "Batería de respaldo", "Riel lateral 25 × 10 mm"] } }),
  P({ handle: "mesa-quirurgica-manual-k500", title: "Mesa quirúrgica hidráulica MQ-500", subtitle: "Control por pedales, cinco secciones, base compacta", collection: "mesas-quirurgicas", price: 11800, sku: "MQ-500", image: IMG.orTeam,
    description: "Mesa de operaciones hidráulica para cirugía menor y ambulatoria, con cabecera y pierneras desmontables, control por pedales y base compacta.",
    metadata: { material: INOX304, gauge: "Columna calibre 14", ...STD, dimensions: "195 × 52 × 72–100 cm", capacity: "250 kg", wheels: "Base con freno central", options: "Pierneras ginecológicas, arco de anestesia", features: ["Control por pedales", "Cabecera y pierneras desmontables", "Colchonetas de 6 cm"] } }),
  P({ handle: "mesa-mayo", title: "Mesa Mayo MM-1", subtitle: "Bandeja extraíble, altura regulable por cremallera", collection: "mesas-de-instrumental", price: 265, sku: "MM-1", image: IMG.orRoom,
    description: "Mesa de instrumental tipo Mayo con bandeja extraíble de 48 × 33 cm, altura regulable por cremallera y base en H con ruedas.",
    metadata: { material: INOX304, gauge: "Bandeja calibre 20, tubo Ø25 mm", ...STD, dimensions: "Bandeja 48 × 33 cm · altura 85–125 cm", capacity: "10 kg", wheels: "4 ruedas Ø50 mm", options: "Bandeja de 60 × 40 cm, ruedas antiestáticas", features: ["Bandeja extraíble autoclavable", "Regulación sin herramientas"] } }),
  P({ handle: "mesa-rinon", title: "Mesa riñón MR-2", subtitle: "Cubierta curva con baranda, entrepaño y ruedas", collection: "mesas-de-instrumental", price: 520, sku: "MR-2", image: IMG.orTable,
    description: "Mesa de instrumental en forma de riñón para quirófano, con cubierta de acero inoxidable 304, baranda perimetral y entrepaño inferior.",
    metadata: { material: INOX304, gauge: "Calibre 18", ...STD, dimensions: "120 × 60 × 90 cm", capacity: "50 kg", wheels: "4 ruedas Ø75 mm, 2 con freno", options: "Segundo entrepaño, cajón", features: ["Baranda perimetral 25 mm", "Esquinas redondeadas", "Entrepaño reforzado"] } }),
  // ── Higiene
  P({ handle: "lavamanos-quirurgico-dos-puestos", title: "Lavamanos quirúrgico LQ-2", subtitle: "Dos puestos, sensor infrarrojo, acero inoxidable 316", collection: "lavamanos-quirurgicos", price: 3900, sku: "LQ-2", image: IMG.orRoom,
    description: "Lavamanos quirúrgico de dos puestos con cuba profunda antisalpicadura, grifería de accionamiento por sensor infrarrojo, dispensador de jabón integrado y respaldo con pendiente de escurrimiento.",
    metadata: { material: INOX316, gauge: "Calibre 16 (1.5 mm)", finish: "Satinado grano 180, soldadura TIG pulida y pasivada", warranty: "5 años estructura · 2 años grifería", dimensions: "160 × 60 × 110 cm", options: "Uno a tres puestos, accionamiento por rodilla o pedal, mezclador termostático", features: ["Cuba de 20 cm de profundidad", "Sensor infrarrojo con apagado automático", "Dispensador de jabón y cepillos integrado", "Sifón accesible por frente"] } }),
  P({ handle: "estacion-de-lavado-clinico", title: "Estación de lavado clínico EL-1", subtitle: "Cuba doble, escurridor y entrepaño, para instrumental", collection: "estaciones-de-lavado", price: 2450, sku: "EL-1", image: IMG.lab,
    description: "Estación de lavado para instrumental y material contaminado, con cuba doble, escurridor con pendiente, respaldo sanitario y grifería de cuello alto con ducha extensible.",
    metadata: { material: INOX316, gauge: "Calibre 16", finish: "Satinado grano 180, soldadura TIG pulida y pasivada", warranty: "5 años estructura · 2 años grifería", dimensions: "180 × 65 × 90 cm", options: "Cuba sencilla o triple, lavachatas, pistola de agua a presión", features: ["Cubas de 40 × 40 × 25 cm", "Ducha extensible", "Respaldo sanitario de 15 cm"] } }),
  // ── Laboratorio
  P({ handle: "meson-de-laboratorio-k60", title: "Mesón de laboratorio ML-60", subtitle: "Cubierta fenólica, lavadero integrado, módulos inferiores", collection: "laboratorio", price: 2350, sku: "ML-60", image: IMG.labBench,
    description: "Mesón técnico para laboratorio clínico con cubierta de resina fenólica resistente a reactivos, lavadero de polipropileno, grifería de laboratorio y módulos inferiores con puertas y gavetas. Fabricado a medida por módulos de 60 cm.",
    metadata: { material: "Resina fenólica 16 mm sobre estructura de acero", gauge: "Tubo 40 × 40 mm calibre 16", finish: "Cubierta negra mate, estructura epóxica gris", warranty: "5 años cubierta · 2 años módulos", dimensions: "A medida (módulos de 60 cm) × 75 × 90 cm", options: "Cubierta en inox 304, repisa de reactivos, tomas eléctricas y de gas", features: ["Resistente a ácidos y solventes", "Lavadero de PP con escurridor", "Canal de servicios posterior"] } }),
  P({ handle: "estanteria-inoxidable-5-niveles", title: "Estantería inox cinco niveles ES-5", subtitle: "Parrillas regulables, 150 kg por nivel", collection: "almacenamiento-tecnico", price: 460, sku: "ES-5", image: IMG.shelving,
    description: "Estantería modular de acero inoxidable 304 para almacén estéril o laboratorio, con cinco parrillas regulables cada 2.5 cm y patas niveladoras.",
    metadata: { material: INOX304, gauge: "Parrilla de varilla Ø6 mm, poste Ø25 mm", ...STD, dimensions: "120 × 50 × 180 cm", capacity: "150 kg por nivel", options: "Ruedas, parrillas lisas, módulos de 90 o 150 cm", features: ["Montaje sin herramientas", "Regulación cada 2.5 cm", "Patas niveladoras"] } }),
  // ── Patología
  P({ handle: "mesa-de-necropsia", title: "Mesa de necropsia MN-1", subtitle: "Cubierta con pendiente, lavadero, ducha y extracción", collection: "mesas-de-patologia", price: 8900, sku: "MN-1", image: IMG.lab,
    description: "Mesa de necropsia en acero inoxidable 316 con cubierta perforada removible, pendiente de escurrimiento, lavadero integrado, ducha de mano y conexión para extracción de aire.",
    metadata: { material: INOX316, gauge: "Calibre 14 (2 mm)", finish: "Satinado, soldadura TIG pulida y pasivada", warranty: "5 años", dimensions: "230 × 80 × 85 cm", capacity: "300 kg", options: "Altura regulable eléctrica, triturador, soporte de cabeza, báscula integrada", features: ["Cubierta perforada removible", "Pendiente de escurrimiento 2%", "Conexión de extracción Ø150 mm"] } }),
  P({ handle: "encimera-sanitaria-inox", title: "Encimera sanitaria ES-316", subtitle: "Superficie continua sin juntas, respaldo y faldón", collection: "superficies-sanitarias", price: 1900, sku: "ES-316", image: IMG.labBench,
    description: "Encimera de acero inoxidable 316 fabricada a medida en una sola pieza, con respaldo sanitario, faldón frontal y esquinas interiores radiadas para limpieza sin retención.",
    metadata: { material: INOX316, gauge: "Calibre 16 (1.5 mm)", finish: "Satinado grano 180, pasivado", warranty: "5 años", dimensions: "A medida hasta 400 cm por tramo", options: "Lavaderos integrados, soporte de pared o módulos inferiores", features: ["Sin juntas ni silicona", "Esquinas radiadas R10", "Respaldo sanitario 10 cm"] } }),
  // ── Arquitectura clínica
  P({ handle: "protector-de-pared-hospitalario", title: "Protector de pared PP-200", subtitle: "Perfil de aluminio con cubierta de PVC, 200 mm", collection: "elementos-hospitalarios", price: 48, sku: "PP-200", image: IMG.reception,
    description: "Protección de pared para pasillos y habitaciones, con perfil de aluminio y cubierta de PVC antibacteriano de 200 mm, esquineros y terminales. Precio por metro lineal.",
    metadata: { material: "Aluminio 6063 con cubierta de PVC antibacteriano", finish: "PVC texturizado en 12 colores", warranty: "5 años", dimensions: "200 mm de alto · tramos de 4 m", options: "Alturas 100 / 150 / 200 mm, esquineros de 90°, versión en inox", features: ["Absorbe impactos de camas y carros", "Antibacteriano y lavable", "Instalación con clips ocultos"] } }),
  P({ handle: "pasamanos-hospitalario", title: "Pasamanos hospitalario PH-40", subtitle: "Doble tubo inox Ø40 mm con soportes de pared", collection: "apoyo-y-circulacion", price: 95, sku: "PH-40", image: IMG.consult,
    description: "Pasamanos de doble tubo en acero inoxidable 304 Ø40 mm con soportes de pared cada 90 cm y retornos a pared. Precio por metro lineal, instalación incluida en Ciudad de Panamá.",
    metadata: { material: INOX304, gauge: "Tubo Ø40 mm calibre 16", ...STD, dimensions: "Alturas 75 y 90 cm · tramos a medida", capacity: "Carga lateral 150 kg", options: "Tubo sencillo, cubierta de PVC, versión en aluminio", features: ["Retornos a pared sin aristas", "Soportes cada 90 cm", "Fijación química en concreto"] } }),
]

const api = async (path, body, method = body === undefined ? "GET" : "POST") => {
  const res = await fetch(`${BACKEND}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${api.token}` },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${JSON.stringify(data).slice(0, 300)}`)
  return data
}

const main = async () => {
  const login = await fetch(`${BACKEND}/auth/user/emailpass`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD }) })
  api.token = (await login.json()).token
  if (!api.token) throw new Error("Admin login failed")

  const { regions } = await api("/admin/regions")
  const region = regions.find((r) => r.currency_code === "pab") || regions[0]
  const { sales_channels } = await api("/admin/sales-channels")
  const sc = sales_channels[0]
  const { shipping_profiles } = await api("/admin/shipping-profiles")
  const profile = shipping_profiles[0]
  console.log(`region=${region?.name} (${region?.currency_code}) sales_channel=${sc?.name}`)

  const existing = (await api("/admin/collections?limit=100")).collections
  const colByHandle = {}
  for (const [handle, title] of Object.entries(COLLECTIONS)) {
    const found = existing.find((e) => e.handle === handle)
    const saved = found
      ? (found.title === title ? found : (await api(`/admin/collections/${found.id}`, { title })).collection)
      : (await api("/admin/collections", { handle, title })).collection
    colByHandle[handle] = saved
    console.log(`${found ? "ok     " : "created"} collection ${handle}`)
  }

  const current = (await api("/admin/products?limit=200&fields=id,handle,title")).products
  for (const p of PRODUCTS) {
    const payload = {
      title: p.title, subtitle: p.subtitle, handle: p.handle, description: p.description, status: "published",
      collection_id: colByHandle[p.collection].id,
      thumbnail: p.image, images: [{ url: p.image }],
      metadata: { ...p.metadata, ...(p.badge ? { badge: p.badge } : {}) },
      ...(profile ? { shipping_profile_id: profile.id } : {}),
    }
    const found = current.find((c) => c.handle === p.handle)
    if (found) {
      await api(`/admin/products/${found.id}`, payload)
      const full = (await api(`/admin/products/${found.id}?fields=*variants`)).product
      const v = full.variants[0]
      if (v) await api(`/admin/products/${found.id}/variants/${v.id}`, { sku: p.sku, prices: [{ currency_code: region.currency_code, amount: p.price }], manage_inventory: false })
      console.log(`updated product ${p.handle}`)
    } else {
      await api("/admin/products", {
        ...payload,
        sales_channels: [{ id: sc.id }],
        options: [{ title: "Modelo", values: ["Estándar"] }],
        variants: [{ title: "Estándar", sku: p.sku, options: { Modelo: "Estándar" }, manage_inventory: false, prices: [{ currency_code: region.currency_code, amount: p.price }] }],
      })
      console.log(`created product ${p.handle}`)
    }
  }

  if (PRUNE) {
    const keep = new Set(PRODUCTS.map((p) => p.handle))
    for (const c of current) if (!keep.has(c.handle)) { await api(`/admin/products/${c.id}`, undefined, "DELETE"); console.log(`deleted product ${c.handle}`) }
    const keepCols = new Set(Object.keys(COLLECTIONS))
    for (const c of existing) if (!keepCols.has(c.handle)) { await api(`/admin/collections/${c.id}`, undefined, "DELETE"); console.log(`deleted collection ${c.handle}`) }
  }
  console.log("done")
}

main().catch((e) => { console.error(e.message); process.exit(1) })
