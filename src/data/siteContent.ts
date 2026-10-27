export interface SpecialtyItem {
  id: string;
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  iconName: 'Activity' | 'ShieldCheck' | 'Sparkles' | 'Crown' | 'Stethoscope';
  brandTag: 'Dra. Pamela Pazmiño' | 'Dental Check UIO · Especialidades';
  symptomsToWatch: string[];
  procedures: {
    name: string;
    detail: string;
  }[];
  clinicalBenefit: string;
  durationOrFormat: string;
  imageSvgType: 'atm' | 'bruxism' | 'rehab' | 'esthetic' | 'dentalcheck';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'ATM Integral' | 'Bruxismo y Ciencia' | 'Rehabilitación Oral' | 'Prevención Dental Check' | 'Estética Biológica';
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    highlightBox?: string;
  }[];
  relatedSpecialtyId: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  clinicalContext: string;
  options: {
    label: string;
    points: number;
    tag: string;
  }[];
}

export interface SonoramaVideoItem {
  id: string;
  title: string;
  dateLabel: string;
  category: string;
  youtubeUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
}

export const SONORAMA_YOUTUBE_VIDEOS: SonoramaVideoItem[] = [
  {
    id: 'YEiBtw4KfyM',
    title: 'Sonorama Vital con Pamela Pazmiño · 08 Octubre 2026',
    dateLabel: '08 Octubre 2026',
    category: 'Programa Completo · Sonorama Digital',
    youtubeUrl: 'https://www.youtube.com/watch?v=YEiBtw4KfyM',
    embedUrl: 'https://www.youtube.com/embed/YEiBtw4KfyM?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/YEiBtw4KfyM/hqdefault.jpg',
  },
  {
    id: 'tsvZlHxC_Ik',
    title: 'Detección Temprana de Cáncer de Mama | Sonorama Vital con Pamela Pazmiño',
    dateLabel: 'Octubre 2026',
    category: 'Prevención y Salud Integral',
    youtubeUrl: 'https://www.youtube.com/watch?v=tsvZlHxC_Ik',
    embedUrl: 'https://www.youtube.com/embed/tsvZlHxC_Ik?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/tsvZlHxC_Ik/hqdefault.jpg',
  },
  {
    id: '8MJjhTdVmw8',
    title: 'Sonorama Vital con Pamela Pazmiño · 27 Agosto 2026',
    dateLabel: '27 Agosto 2026',
    category: 'Salud y Bienestar · Radio Sonorama',
    youtubeUrl: 'https://www.youtube.com/watch?v=8MJjhTdVmw8',
    embedUrl: 'https://www.youtube.com/embed/8MJjhTdVmw8?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/8MJjhTdVmw8/hqdefault.jpg',
  },
  {
    id: 'T4QtHbxK0R4',
    title: 'Sonorama Vital con Pamela Pazmiño · 20 Agosto 2026',
    dateLabel: '20 Agosto 2026',
    category: 'Salud y Bienestar · Radio Sonorama',
    youtubeUrl: 'https://www.youtube.com/watch?v=T4QtHbxK0R4',
    embedUrl: 'https://www.youtube.com/embed/T4QtHbxK0R4?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/T4QtHbxK0R4/hqdefault.jpg',
  },
  {
    id: '1NLe74AVgkM',
    title: 'Sonorama Vital con Pamela Pazmiño · 23 Julio 2026',
    dateLabel: '23 Julio 2026',
    category: 'Entrevista Médica · Sonorama Digital',
    youtubeUrl: 'https://www.youtube.com/watch?v=1NLe74AVgkM',
    embedUrl: 'https://www.youtube.com/embed/1NLe74AVgkM?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/1NLe74AVgkM/hqdefault.jpg',
  },
  {
    id: 'ie1ikAahXbg',
    title: 'Sonorama Vital · 02 Julio 2026',
    dateLabel: '02 Julio 2026',
    category: 'Salud Integral · Sonorama Digital',
    youtubeUrl: 'https://www.youtube.com/watch?v=ie1ikAahXbg',
    embedUrl: 'https://www.youtube.com/embed/ie1ikAahXbg?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/ie1ikAahXbg/hqdefault.jpg',
  },
  {
    id: '3ZRuDV421-g',
    title: 'Sonorama Vital con Pamela Pazmiño · 11 Junio 2026',
    dateLabel: '11 Junio 2026',
    category: 'Programa Completo · Sonorama Digital',
    youtubeUrl: 'https://www.youtube.com/watch?v=3ZRuDV421-g',
    embedUrl: 'https://www.youtube.com/embed/3ZRuDV421-g?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/3ZRuDV421-g/hqdefault.jpg',
  },
  {
    id: '4ZdV3ZT42So',
    title: 'Sonorama Vital con Pamela Pazmiño · 23 Abril 2026',
    dateLabel: '23 Abril 2026',
    category: 'Salud y Prevención · Radio Sonorama',
    youtubeUrl: 'https://www.youtube.com/watch?v=4ZdV3ZT42So',
    embedUrl: 'https://www.youtube.com/embed/4ZdV3ZT42So?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/4ZdV3ZT42So/hqdefault.jpg',
  },
  {
    id: 'Qai_yc69Mbw',
    title: 'Sonorama Vital con Pamela Pazmiño · 16 Abril 2026',
    dateLabel: '16 Abril 2026',
    category: 'Salud y Bienestar · Radio Sonorama',
    youtubeUrl: 'https://www.youtube.com/watch?v=Qai_yc69Mbw',
    embedUrl: 'https://www.youtube.com/embed/Qai_yc69Mbw?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/Qai_yc69Mbw/hqdefault.jpg',
  },
  {
    id: 'UkKJ_xV6p8M',
    title: 'Sonorama Vital · 26 Marzo 2026',
    dateLabel: '26 Marzo 2026',
    category: 'Sonorama Digital',
    youtubeUrl: 'https://www.youtube.com/watch?v=UkKJ_xV6p8M',
    embedUrl: 'https://www.youtube.com/embed/UkKJ_xV6p8M?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/UkKJ_xV6p8M/hqdefault.jpg',
  },
  {
    id: 'zrJu2DADeQ8',
    title: 'Sonorama Vital | Síndrome de Ovario Poliquístico y Fertilidad',
    dateLabel: 'Especial Clínico',
    category: 'Salud Integral',
    youtubeUrl: 'https://www.youtube.com/watch?v=zrJu2DADeQ8',
    embedUrl: 'https://www.youtube.com/embed/zrJu2DADeQ8?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/zrJu2DADeQ8/hqdefault.jpg',
  },
  {
    id: 'YnW22r-_Zxs',
    title: 'Sonorama Vital | El arte de pensar diferente, un mundo Neurodivergente',
    dateLabel: 'Especial Bienestar',
    category: 'Salud y Mente',
    youtubeUrl: 'https://www.youtube.com/watch?v=YnW22r-_Zxs',
    embedUrl: 'https://www.youtube.com/embed/YnW22r-_Zxs?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/YnW22r-_Zxs/hqdefault.jpg',
  },
  {
    id: 'T0RbE62CSrI',
    title: 'Sonorama Vital · 11 Diciembre 2025',
    dateLabel: '11 Diciembre 2025',
    category: 'Sonorama Digital',
    youtubeUrl: 'https://www.youtube.com/watch?v=T0RbE62CSrI',
    embedUrl: 'https://www.youtube.com/embed/T0RbE62CSrI?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/T0RbE62CSrI/hqdefault.jpg',
  },
  {
    id: 'PuFDxxAzzKY',
    title: 'Sonorama Vital · 16 Octubre 2025',
    dateLabel: '16 Octubre 2025',
    category: 'Sonorama Digital',
    youtubeUrl: 'https://www.youtube.com/watch?v=PuFDxxAzzKY',
    embedUrl: 'https://www.youtube.com/embed/PuFDxxAzzKY?rel=0',
    thumbnailUrl: 'https://i.ytimg.com/vi/PuFDxxAzzKY/hqdefault.jpg',
  },
];

export const CLINIC_REAL_PHOTOS = [
  {
    id: 'dra-pame-hero',
    src: '/images/clinic/hero-dra-pamela.jpg',
    badge: 'Directora Clínica · Dental Check UIO',
    title: 'Dra. Pamela Pazmiño',
    caption: 'Especialista en Rehabilitación Oral, ATM Integral, Bruxismo y Dolor Orofacial.',
  },
  {
    id: 'dra-pame-diplomas',
    src: '/images/clinic/dentalcheck-08.jpg',
    badge: 'Excelencia Académica · UDLA',
    title: 'Dra. Pamela Pazmiño · Especialista y Docente UDLA',
    caption: 'Trayectoria académica respaldada por publicaciones científicas internacionales y docencia universitaria.',
  },
  {
    id: 'dra-pame-chair',
    src: '/images/clinic/dentalcheck-02.jpg',
    badge: 'Tecnología & Bioseguridad',
    title: 'Consultorio Clínico Dental Check',
    caption: 'Equipamiento moderno para diagnóstico de ATM, rehabilitación oral y estética dental.',
  },
  {
    id: 'dra-pame-patient',
    src: '/images/clinic/dentalcheck-10.jpg',
    badge: 'Nuestro mejor proyecto, Tu sonrisa',
    title: 'Atención Empática y Sin Dolor',
    caption: 'Acompañamiento personalizado y resultados que devuelven la confianza al sonreír.',
  },
  {
    id: 'cadcam-splint-3d',
    src: '/images/clinic/dentalcheck-06.jpg',
    badge: 'ATM Integral · CAD/CAM 3D',
    title: 'Diseño Digital 3D de Férula Oclusal',
    caption: 'Planificación tridimensional de dispositivos oclusales rígidos para bruxismo y descompresión articular.',
  },
  {
    id: 'smile-before-after',
    src: '/images/clinic/dentalcheck-05.jpg',
    badge: 'Caso Clínico Real · Antes y Después',
    title: 'Diseño de Sonrisa Natural y Biomimética',
    caption: 'Armonía estética respetando la anatomía, translucidez y biología de tus dientes.',
  },
  {
    id: 'biomimetic-veneers',
    src: '/images/clinic/dentalcheck-07.jpg',
    badge: 'Laboratorio de Alta Precisión',
    title: 'Laminados e Incrustaciones Cerámicas',
    caption: 'Microtextura y translucidez incisal que imitan a la perfección el esmalte dental natural.',
  },
  {
    id: 'rehab-prosthesis',
    src: '/images/clinic/dentalcheck-04.jpg',
    badge: 'Rehabilitación Oral Integral',
    title: 'Caracterización Gingival y Dental Biomimética',
    caption: 'Recuperación funcional y estética de alta complejidad.',
  },
  {
    id: 'fortune-plaza-building',
    src: '/images/clinic/dentalcheck-01.jpg',
    badge: 'Ubicación en Quito · Fortune Plaza',
    title: 'Edificio Fortune Plaza · Torre Alemania',
    caption: 'Av. Eloy Alfaro y Alemania (Sector La Pradera / Iñaquito), Quito.',
  },
];

export const SITE_CONFIG = {
  doctorName: 'Dra. Pamela Pazmiño',
  doctorFullName: 'Dra. Eliana Pamela Pazmiño Troncoso',
  doctorTitle: 'Especialista en Rehabilitación Oral · ATM Integral, Bruxismo y Dolor Orofacial',
  academicRole: 'Docente Universitaria e Investigadora Científica (UDLA)',
  clinicName: 'Dental Check UIO',
  clinicTagline: 'Nuestro mejor proyecto, Tu sonrisa',
  domain: 'drapamelapazmino.com',
  whatsappNumberClean: '593960424887',
  whatsappDisplay: '096 042 4887',
  whatsappInternational: '+593 96 042 4887',
  email: 'consultas@drapamelapazmino.com',
  address: {
    street: 'Av. Eloy Alfaro esq. y Alemania · Edificio Fortune Plaza (Torre Alemania)',
    sector: 'Sector La Pradera · 170519 Quito',
    city: 'Quito, Ecuador',
    reference: 'Edificio Fortune Plaza · Torre Alemania (Av. Eloy Alfaro y Alemania), con parqueadero y accesibilidad universal',
    googleMapsShareUrl: 'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjg3fqLk9uXAxUAAAAAHQAAAAAQIA..i&fvr=1&pvq=Cg0vZy8xMW5uMGN3OXFf&cs=1&um=1&ie=UTF-8&fb=1&gl=ec&sa=X&ftid=0x91d5912ce4b1be17:0x46de3827080205ae',
    googleMapsEmbedQuery: 'https://www.google.com/maps?q=-0.1935118,-78.4915978&hl=es&z=17&output=embed',
  },
  hours: {
    weekdays: 'Lunes a Viernes: 08h30 a 19h00',
    saturdays: 'Sábados: 08h30 a 17h00 (Previa cita)',
    note: 'Atención personalizada bajo agenda previa para garantizar el tiempo clínico que cada paciente merece.',
  },
  social: {
    instagramPersonal: {
      handle: '@drapamelapazmino',
      url: 'https://www.instagram.com/drapamelapazmino/',
      description: 'Divulgación científica en ATM Integral, Bruxismo, Dolor Orofacial y Rehabilitación Oral.',
    },
    instagramClinic: {
      handle: '@dentalcheck.uio',
      url: 'https://www.instagram.com/dentalcheck.uio/',
      description: 'Centro Odontológico Integral Dental Check en Quito: "Nuestro mejor proyecto, Tu sonrisa".',
    },
    googleProfile: {
      label: 'Ubicación y 36+ Reseñas 5★ en Google Maps',
      url: 'https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjg3fqLk9uXAxUAAAAAHQAAAAAQIA..i&fvr=1&pvq=Cg0vZy8xMW5uMGN3OXFf&cs=1&um=1&ie=UTF-8&fb=1&gl=ec&sa=X&ftid=0x91d5912ce4b1be17:0x46de3827080205ae',
    },
  },
  images: {
    doctorPortraitLocal: '/images/clinic/hero-dra-pamela.jpg',
    clinicPhotoLocal: '/images/clinic/dentalcheck-02.jpg',
  },
};

export const EMPATHY_SYMPTOMS = [
  {
    id: 'atm-pain',
    title: 'Dolor, chasquidos o bloqueo en la mandíbula (ATM)',
    description:
      'Sientes "clicks" al abrir la boca, fatiga al masticar o limitación en la apertura bucal que nadie ha evaluado de forma integral.',
    badge: 'ATM Integral',
    recommendedSpecialty: 'atm-integral',
  },
  {
    id: 'neck-headache',
    title: 'Cefaleas matutinas, dolor de oído o tensión cráneo-cervical',
    description:
      'Despiertas con dolor en las sienes, cuello rígido o sensación de oído tapado sin causa otorrinolaringológica aparente.',
    badge: 'Conexión Cráneo-Mandibular',
    recommendedSpecialty: 'atm-integral',
  },
  {
    id: 'bruxism-wear',
    title: 'Aprietas los dientes de día o de noche (Bruxismo)',
    description:
      'Notas tus dientes más cortos, bordes astillados, sensibilidad al frío o te han dicho que necesitas una placa pero buscas un diagnóstico real.',
    badge: 'Bruxismo Basado en Evidencia',
    recommendedSpecialty: 'bruxismo',
  },
  {
    id: 'tooth-rehab',
    title: 'Restauraciones antiguas, piezas ausentes o dificultad al masticar',
    description:
      'Necesitas recuperar piezas perdidas o desgastadas con coronas, incrustaciones o prótesis que devuelvan firmeza, confort y longevidad.',
    badge: 'Rehabilitación Oral',
    recommendedSpecialty: 'rehabilitacion-oral',
  },
  {
    id: 'natural-smile',
    title: 'Deseas mejorar tu sonrisa sin desgastar tus dientes sanos',
    description:
      'Buscas un diseño de sonrisa de aspecto natural, armónico con tu rostro y biológicamente respetuoso, lejos de resultados artificiales.',
    badge: 'Estética Biomimética',
    recommendedSpecialty: 'estetica-natural',
  },
  {
    id: 'pre-ortho-check',
    title: 'Quieres un chequeo integral seguro antes de ortodoncia o tratamiento',
    description:
      'En Dental Check UIO evaluamos encías, raíces y tu articulación (ATM) antes de mover dientes o iniciar procedimientos complejos.',
    badge: 'Dental Check UIO',
    recommendedSpecialty: 'dental-check-integral',
  },
];

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'atm-integral',
    slug: 'atm-integral-dolor-orofacial',
    badge: 'Especialidad Insignia',
    title: 'ATM Integral y Dolor Orofacial',
    subtitle: 'Evaluación y tratamiento clínico de la Articulación Temporomandibular y su eje cráneo-cervical',
    shortDescription:
      'Abordaje científico e integral de ruidos articulares, dolor mandibular, bloqueo al abrir la boca, cefaleas tensionales y su relación directa con la postura cráneo-cervical y la oclusión.',
    fullDescription:
      'La Articulación Temporomandibular (ATM) no funciona de forma aislada: forma una unidad biomecánica y neurológica con los músculos masticatorios, la oclusión dental y la columna cervical. Bajo el enfoque de ATM Integral, realizamos un diagnóstico diferencial riguroso para identificar el origen exacto del dolor orofacial o disfunción articular, combinando terapia oclusal reversible, desprogramación neuromuscular, manejo de inflamación articular y reeducación funcional.',
    iconName: 'Activity',
    brandTag: 'Dra. Pamela Pazmiño',
    symptomsToWatch: [
      'Chasquidos ("clicks") o crepitación al abrir y cerrar la boca',
      'Dolor delante del oído, en las sienes o en el ángulo de la mandíbula',
      'Dificultad o desviación al abrir la boca por completo',
      'Dolor de cuello, hombros y cefaleas tensionales recurrentes',
      'Sensación de mordida inestable o cansancio al hablar/masticar',
    ],
    procedures: [
      {
        name: 'Diagnóstico Clínico de ATM y Mapa del Dolor',
        detail: 'Palpación muscular especializada, auscultación articular, análisis de rangos de movimiento mandibular y evaluación de la postura cráneo-cervical.',
      },
      {
        name: 'Férulas Oclusales Estabilizadoras (Tipo Michigan / Desprogramadoras)',
        detail: 'Dispositivos intraorales rígidos de acrílico termocurado diseñados a medida y calibrados en céntrica para descomprimir la articulación y relajar la musculatura.',
      },
      {
        name: 'Terapia Integral del Dolor Miofascial y Articular',
        detail: 'Protocolos clínicos de termoterapia, farmacoterapia dirigida cuando corresponde, ejercicios terapéuticos mandibulares y coordinación con fisioterapia cráneo-cervical.',
      },
      {
        name: 'Estabilización Oclusal Post-Terapia Articular',
        detail: 'Una vez alcanzada la calma articular y muscular, planificamos una mordida estable y fisiológica a largo plazo.',
      },
    ],
    clinicalBenefit: 'Alivio real del dolor orofacial y protección de la articulación temporomandibular con protocolos respaldados por investigación científica.',
    durationOrFormat: 'Consulta inicial de valoración especializada (60 min) + plan por fases',
    imageSvgType: 'atm',
  },
  {
    id: 'bruxismo',
    slug: 'manejo-clinico-bruxismo',
    badge: 'Investigación y Clínica',
    title: 'Bruxismo del Sueño y de Vigilia',
    subtitle: 'Más allá de una placa: diagnóstico neurofisiológico y protección dental biomimética',
    shortDescription:
      'Identificamos si tu bruxismo ocurre durante el día (vigilia) o la noche (sueño), evaluamos factores de estrés oxidativo, calidad de sueño y protegemos tus dientes y articulaciones.',
    fullDescription:
      'La ciencia odontológica contemporánea demuestra que el bruxismo no es simplemente "nervios", sino una actividad muscular masticatoria regulada por el sistema nervioso central, con manifestaciones distintas en el sueño y en la vigilia. Como investigadora en el área de bruxismo y trastornos temporomandibulares, la Dra. Pamela Pazmiño aplica protocolos actualizados que combinan la protección mecánica de alta precisión con estrategias de autorregulación y control de factores desencadenantes.',
    iconName: 'ShieldCheck',
    brandTag: 'Dra. Pamela Pazmiño',
    symptomsToWatch: [
      'Despertar con la mandíbula rígida o dientes adoloridos',
      'Sorprenderte apretando los dientes frente al computador o al conducir',
      'Desgaste progresivo de los bordes dentales (dientes más cortos o planos)',
      'Abfracciones (desgastes en el cuello del diente cerca de la encía) e hipersensibilidad',
      'Fracturas repetidas de resinas, carillas o coronas previas',
    ],
    procedures: [
      {
        name: 'Diferenciación Clínica: Bruxismo de Vigilia vs. Bruxismo del Sueño',
        detail: 'Evaluación mediante cuestionarios validados, signos clínicos intraorales de desgaste (facetas) y análisis de hipertrofia muscular.',
      },
      {
        name: 'Dispositivos Oclusales de Protección y Controles Periódicos',
        detail: 'Diseño digital o analógico de férulas rígidas con guías caninas y contactos puntiformes equilibrados (nunca placas blandas que estimulan más el apretamiento).',
      },
      {
        name: 'Protocolo de Conciencia Conductual (Biofeedback de Vigilia)',
        detail: 'Estrategias prácticas para mantener la posición de reposo mandibular ("labios juntos, dientes separados") durante la jornada laboral.',
      },
      {
        name: 'Restauración de Cuellos y Bordes Desgastados',
        detail: 'Recubrimiento adhesivo mínimamente invasivo de zonas con dentina expuesta para eliminar la sensibilidad térmica.',
      },
    ],
    clinicalBenefit: 'Detiene la destrucción silenciosa del esmalte dental y reduce la sobrecarga sobre los músculos masticatorios y la ATM.',
    durationOrFormat: 'Valoración diagnóstica + confección y calibración oclusal personalizada',
    imageSvgType: 'bruxism',
  },
  {
    id: 'rehabilitacion-oral',
    slug: 'rehabilitacion-oral-biomimetica',
    badge: 'Especialidad Clínica',
    title: 'Rehabilitación Oral y Prótesis de Alta Precisión',
    subtitle: 'Recuperación integral de la función masticatoria, dimensión vertical y armonía oclusal',
    shortDescription:
      'Devolvemos la integridad, fuerza y estética a bocas con desgastes severos, restauraciones defectuosas o pérdida de piezas dentales mediante odontología biomimética y adhesiva.',
    fullDescription:
      'La Rehabilitación Oral es la especialidad encargada de diagnosticar y restaurar de forma integral el sistema estomatognático cuando se ha perdido estructura dental o piezas completas. Nuestro enfoque biomimético busca imitar la naturaleza del diente original: priorizamos técnicas adhesivas conservadoras (incrustaciones, overlays, coronas libres de metal en disilicato de litio o zirconia multicapa) y rehabilitaciones sobre implantes que respetan la encía y la articulación.',
    iconName: 'Crown',
    brandTag: 'Dra. Pamela Pazmiño',
    symptomsToWatch: [
      'Pérdida de una o varias piezas dentales que dificulta masticar con seguridad',
      'Desgaste severo que ha disminuido la altura del tercio inferior de tu rostro',
      'Coronas antiguas con bordes oscuros, filtraciones o inflamación de encía',
      'Amalgamas o resinas extensas fracturadas que requieren protección estructural',
      'Incomodidad o inseguridad al hablar y sonreír con prótesis desajustadas',
    ],
    procedures: [
      {
        name: 'Rehabilitación Adhesiva y Biomimética (Inlays, Onlays, Overlays)',
        detail: 'Restauraciones parciales en cerámica o cerómero que refuerzan molares debilitados sin necesidad de desgastar todo el diente para una corona tradicional.',
      },
      {
        name: 'Coronas y Puentes Libres de Metal (Zirconia / Disilicato E-max)',
        detail: 'Alta resistencia biomecánica y translucidez idéntica al esmalte natural, con sellado marginal microscópico.',
      },
      {
        name: 'Rehabilitación de la Dimensión Vertical Oclusal (Full-Mouth Rehab)',
        detail: 'Para pacientes con bruxismo crónico o erosión ácida severa: devolvemos la altura original de los dientes tras una fase de prueba funcional con provisionales.',
      },
      {
        name: 'Prótesis sobre Implantes y Prótesis Fija/Removible de Precisión',
        detail: 'Planificación protésicamente guiada para reemplazar dientes ausentes con estabilidad oclusal óptima.',
      },
    ],
    clinicalBenefit: 'Vuelve a comer, hablar y sonreír con total confianza mediante restauraciones duraderas diseñadas en equilibrio con tu ATM.',
    durationOrFormat: 'Estudio diagnóstico fotográfico, radiográfico y modelos de estudio',
    imageSvgType: 'rehab',
  },
  {
    id: 'estetica-natural',
    slug: 'estetica-dental-diseno-sonrisa-natural',
    badge: 'Armonía Biológica',
    title: 'Estética Dental y Diseño de Sonrisa Natural',
    subtitle: 'Belleza auténtica que respeta la biología de tus dientes y la dinámica de tus labios',
    shortDescription:
      'Carillas de mínima invasión, aclaramiento clínico seguro y remodelado estético personalizado para lograr una sonrisa luminosa, natural y funcional.',
    fullDescription:
      'Una sonrisa verdaderamente atractiva no se ve rígida ni artificial; refleja salud, proporción con tus rasgos faciales y naturalidad en la textura y el color. Como especialista en Rehabilitación Oral, la Dra. Pamela Pazmiño diseña cada sonrisa asegurándose de que la estética jamás comprometa la salud de tu encía ni tu función masticatoria. Antes de colocar cualquier carilla o realizar un aclaramiento, verificamos que tu mordida y tu ATM estén protegidas.',
    iconName: 'Sparkles',
    brandTag: 'Dra. Pamela Pazmiño',
    symptomsToWatch: [
      'Dientes con manchas intrínsecas, oscurecimiento o tonos desiguales',
      'Pequeños espacios (diastemas), bordes asimétricos o microfracturas en incisivos',
      'Deseo de rejuvenecer la sonrisa manteniendo una apariencia 100% natural',
      'Temor a los "diseños de sonrisa" agresivos que desgastan dientes sanos',
    ],
    procedures: [
      {
        name: 'Mock-up Digital y Prueba de Sonrisa en Boca',
        detail: 'Visualiza cómo lucirá tu nueva sonrisa directamente sobre tus dientes antes de tocar un solo milímetro de esmalte.',
      },
      {
        name: 'Carillas de Alta Estética (Cerámica Ultrafina y Resina Estratificada)',
        detail: 'Láminas personalizadas con anatomía y opalescencia natural, aplicadas bajo protocolos adhesivos de mínima invasión.',
      },
      {
        name: 'Aclaramiento Dental Clínico y Ambulatorio Supervisado',
        detail: 'Protocolos seguros con agentes desensibilizantes que iluminan el tono dental cuidando la vitalidad pulpar.',
      },
      {
        name: 'Bordes Incisales y Armonización Gingival',
        detail: 'Micro-recontorneado estético para devolver juventud y simetría a la sonrisa con cambios sutiles pero de gran impacto.',
      },
    ],
    clinicalBenefit: 'Resultados luminosos, elegantes y biomiméticos con máxima preservación de tu esmalte dental sano.',
    durationOrFormat: 'Diseño personalizado con prueba estética previa',
    imageSvgType: 'esthetic',
  },
  {
    id: 'dental-check-integral',
    slug: 'dental-check-odontologia-integral-quito',
    badge: 'Centro Clínico @dentalcheck.uio',
    title: 'Odontología Integral y Preventiva — Dental Check UIO',
    subtitle: 'Tu centro de salud oral en Quito: diagnóstico completo y especialidades coordinadas',
    shortDescription:
      'En Dental Check UIO (Av. Eloy Alfaro esq. y Alemania · Edificio Fortune Plaza, Torre Alemania) realizamos valoraciones diagnósticas integrales, prevención periodontal y tratamientos interdisciplinarios seguros.',
    fullDescription:
      'Bajo la dirección clínica de la Dra. Pamela Pazmiño, Dental Check UIO nace con una misión clara: transformar la visita al odontólogo en una experiencia tranquila, transparente y preventiva. Sabemos que ningún tratamiento complejo (como ortodoncia, implantes o estética) debe iniciarse sin antes garantizar encías sanas, ausencia de infecciones y una articulación temporomandibular estable. En nuestro centro en el sector La Pradera (Edificio Fortune Plaza · Torre Alemania) reunimos tecnología diagnóstica y especialistas coordinados en cada área.',
    iconName: 'Stethoscope',
    brandTag: 'Dental Check UIO · Especialidades',
    symptomsToWatch: [
      'Más de 6 meses sin una profilaxis profesional o chequeo odontológico completo',
      'Sangrado de encías al cepillarte o inflamación gingival',
      'Planeas iniciar Ortodoncia (brackets o alineadores) y necesitas un chequeo previo seguro',
      'Dolor dental agudo, caries profundas o necesidad de extraer terceros molares (cordales)',
    ],
    procedures: [
      {
        name: 'Protocolo Diagnóstico "Dental Check Integral"',
        detail: 'Evaluación clínica dental, periodontal, oclusal y de ATM con registro fotográfico para explicarte con claridad el estado real de tu boca.',
      },
      {
        name: 'Prevención y Periodoncia (Profilaxis Ultrasónica y Salud Gingival)',
        detail: 'Eliminación suave de cálculo y biofilm, pulido de superficies y educación personalizada en higiene oral.',
      },
      {
        name: 'Ortodoncia Segura con Control Articular (ATM)',
        detail: 'Alineación dental planificada en conjunto con Rehabilitación Oral y evaluación de ATM para evitar sobrecargas articulares.',
      },
      {
        name: 'Endodoncia, Cirugía Oral e Implantología Coordinada',
        detail: 'Atención interdisciplinaria con especialistas bajo estrictos estándares de bioseguridad y control del dolor.',
      },
    ],
    clinicalBenefit: 'Diagnósticos honestos y tratamientos interdisciplinarios coordinados en un solo lugar en el norte de Quito.',
    durationOrFormat: 'Citas puntuales en Av. Eloy Alfaro esq. y Alemania (Fortune Plaza · Torre Alemania), Quito',
    imageSvgType: 'dentalcheck',
  },
];

export const CREDENTIALS_LIST = [
  {
    category: 'Especialidad Clínica',
    title: 'Especialista en Rehabilitación Oral',
    institution: 'Formación de Posgrado Especializado en Rehabilitación Oral, Oclusión y Prótesis',
    description:
      'Dedicada a la restitución funcional, biomecánica y estética de casos complejos, desgaste dental severo y rehabilitación sobre dientes naturales e implantes.',
  },
  {
    category: 'Enfoque Clínico e Investigativo',
    title: 'ATM Integral, Bruxismo y Dolor Orofacial',
    institution: 'Práctica Basada en Evidencia Científica',
    description:
      'Manejo clínico especializado de Trastornos Temporomandibulares (TTM), relación cráneo-cervical, desprogramación neuromuscular y bruxismo del sueño y de vigilia.',
  },
  {
    category: 'Docencia e Investigación',
    title: 'Docente Universitaria e Investigadora Científica',
    institution: 'Universidad de Las Américas (UDLA) · Quito, Ecuador',
    description:
      'Autora y coautora de artículos científicos indexados internacionalmente (PubMed / NIH / Scopus) sobre bruxismo, dolor orofacial y biomarcadores en trastornos temporomandibulares.',
  },
  {
    category: 'Dirección Clínica',
    title: 'Directora Clínica en Dental Check UIO',
    institution: '@dentalcheck.uio · Av. Eloy Alfaro esq. y Alemania (Fortune Plaza · Torre Alemania), Quito',
    description:
      'Lidera un modelo de atención odontológica preventiva, ética y multidisciplinaria donde cada paciente comprende su diagnóstico antes de cualquier procedimiento.',
  },
];

export const SCIENTIFIC_HIGHLIGHTS = [
  {
    journal: 'Publicación Científica Indexada (PubMed / NIH)',
    topic: 'Trastornos Temporomandibulares, Dolor Orofacial y Biomarcadores de Estrés Oxidativo',
    summary:
      'Investigación académica enfocada en comprender los mecanismos biológicos y clínicos detrás del dolor articular y muscular mandibular para ofrecer tratamientos verdaderamente efectivos y no invasivos.',
  },
  {
    journal: 'Línea de Investigación UDLA · Rehabilitación y Oclusión',
    topic: 'Diagnóstico Diferencial del Bruxismo y Rehabilitación Adhesiva Conservadora',
    summary:
      'Integración de los consensos internacionales actuales sobre bruxismo de sueño y vigilia en la práctica clínica diaria en Quito.',
  },
];

export const ATM_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Al despertar por la mañana o al final del día sientes cansancio, rigidez o dolor en la mandíbula o las sienes?',
    clinicalContext: 'La fatiga matutina suele asociarse a bruxismo del sueño, mientras que el dolor vespertino orienta hacia apretamiento de vigilia.',
    options: [
      { label: 'Sí, casi todos los días o varias veces por semana', points: 3, tag: 'Sobrecarga muscular frecuente' },
      { label: 'Ocasionalmente, sobre todo en etapas de alto estrés laboral', points: 2, tag: 'Tensión muscular episódica' },
      { label: 'Rara vez o nunca siento rigidez mandibular', points: 0, tag: 'Sin fatiga muscular aparente' },
    ],
  },
  {
    id: 2,
    question: '¿Escuchas o sientes algún "click", chasquido, roce o bloqueo al abrir la boca, bostezar o masticar?',
    clinicalContext: 'Los ruidos articulares indican cambios en la posición del disco articular de la ATM que deben evaluarse a tiempo.',
    options: [
      { label: 'Sí, suena con frecuencia o siento que se traba/desvía al abrir', points: 3, tag: 'Signo articular en ATM' },
      { label: 'A veces siento un leve sonido sin dolor', points: 2, tag: 'Desplazamiento discal leve' },
      { label: 'No, abro y cierro la boca con total suavidad', points: 0, tag: 'Movimiento articular libre' },
    ],
  },
  {
    id: 3,
    question: '¿Sufres de dolores de cabeza tensionales, dolor de cuello/nuca o sensación de oído tapado o adolorido?',
    clinicalContext: 'En ATM Integral evaluamos la conexión entre la mordida, los músculos masticatorios y la columna cráneo-cervical.',
    options: [
      { label: 'Sí, tengo dolor de cuello, cabeza u oído con frecuencia', points: 3, tag: 'Compromiso cráneo-cervical / ATM' },
      { label: 'A veces siento tensión en el cuello o sienes', points: 1, tag: 'Tensión cervical moderada' },
      { label: 'No presento estos síntomas', points: 0, tag: 'Sin dolor referido' },
    ],
  },
  {
    id: 4,
    question: '¿Has notado tus dientes más cortos, bordes planos/astillados, cuellos descubiertos o sensibilidad al frío?',
    clinicalContext: 'El desgaste dental mecánico (atrición/abfracción) es la huella física de una sobrecarga oclusal activa.',
    options: [
      { label: 'Sí, noto desgaste visible, fracturas o mucha sensibilidad', points: 3, tag: 'Desgaste dental activo' },
      { label: 'Noto pequeños desgastes o sensibilidad leve en algunos dientes', points: 2, tag: 'Desgaste incipiente' },
      { label: 'Mis dientes conservan su forma y no tengo sensibilidad', points: 0, tag: 'Estructura dental íntegra' },
    ],
  },
  {
    id: 5,
    question: '¿Cuál es tu objetivo principal en este momento para tu salud y estética oral?',
    clinicalContext: 'Esto nos permite orientar tu cita inicial con la Dra. Pamela Pazmiño en Dental Check UIO.',
    options: [
      { label: 'Aliviar dolor de mandíbula/ATM, tratar mi bruxismo o calibrar una férula', points: 2, tag: 'Prioridad: ATM Integral y Bruxismo' },
      { label: 'Recuperar dientes desgastados/ausentes o mejorar la estética natural de mi sonrisa', points: 2, tag: 'Prioridad: Rehabilitación y Estética Natural' },
      { label: 'Realizar un Dental Check preventivo completo (o evaluación antes de ortodoncia)', points: 1, tag: 'Prioridad: Valoración Dental Check Integral' },
    ],
  },
];

export const FREE_GUIDE_CONTENT = {
  badge: 'Recurso Educativo Gratuito · Dra. Pamela Pazmiño',
  title: 'Mandíbula en Calma, Sonrisa Funcional',
  subtitle: 'Guía clínica para comprender el Bruxismo, la ATM Integral y cómo proteger tus dientes sin tratamientos agresivos',
  author: 'Dra. Eliana Pamela Pazmiño Troncoso · Especialista en Rehabilitación Oral y Docente UDLA',
  readingTime: 'Lectura de 7 minutos · Descargable / Imprimible en PDF',
  chapters: [
    {
      number: '01',
      title: 'La regla de oro fisiológica: "Labios juntos, dientes separados"',
      content:
        '¿Sabías que tus dientes superiores e inferiores solo deberían tocarse entre 15 y 20 minutos en total durante todo el día (únicamente al tragar y masticar)? Cuando mantienes los dientes en contacto mientras trabajas frente al computador, conduces en el tráfico de Quito o revisas el celular, estás ejerciendo un Bruxismo de Vigilia. Ese contacto continuo fatiga los músculos maseteros y temporales, comprime la articulación temporomandibular (ATM) y desgasta el esmalte.',
      tip: 'Ejercicio práctico hoy: Al leer este párrafo, nota dónde están tus dientes. Deja caer suavemente la mandíbula unos 2 milímetros manteniendo los labios cerrados y la lengua descansando en el paladar.',
    },
    {
      number: '02',
      title: '¿Por qué la ATM se relaciona con tu dolor de cuello, cabeza y oído?',
      content:
        'La Articulación Temporomandibular se ubica apenas a milímetros del conducto auditivo y comparte vías nerviosas (nervio trigémino) y cadenas musculares con el cráneo y las vértebras cervicales. Por eso, muchos pacientes pasan meses visitando distintos especialistas por "migrañas", "dolor de oído sin infección" o "contracturas cervicales" cuando el origen real es una desarmonía oclusal y articular que requiere un enfoque de ATM Integral.',
      tip: 'Signo de alerta: Si el dolor de cabeza es más intenso al despertar o se acompaña de un "click" al abrir la boca, una valoración de ATM Integral es indispensable.',
    },
    {
      number: '03',
      title: 'El mito de las placas blandas vs. Férulas Oclusales Calibradas',
      content:
        'Un error muy común es utilizar guardas o placas blandas (de silicona flexible) para el bruxismo. La evidencia científica demuestra que las superficies blandas actúan como un "chicle" para el cerebro, estimulando aún más la fuerza de apretamiento nocturno. El estándar clínico en Rehabilitación Oral y ATM es una férula rígida estabilizadora, confeccionada a medida y calibrada milimétricamente para que todos tus dientes contacten en equilibrio y tu articulación descanse en su posición fisiológica.',
      tip: 'Si ya tienes una férula rígida, recuerda que debe revisarse y equilibrarse periódicamente en consulta.',
    },
    {
      number: '04',
      title: 'Rehabilitación Biomimética: recuperar lo desgastado cuidando tu diente sano',
      content:
        'Cuando el bruxismo o el paso del tiempo ya han acortado tus dientes o fracturado restauraciones antiguas, hoy no necesitamos "limar" los dientes sanos para colocar coronas invasivas. Gracias a la Odontología Biomimética y Adhesiva, restituimos únicamente el esmalte y la dentina perdidos mediante incrustaciones cerámicas (overlays/veneerlays) y resinas de alta carga que devuelven la altura facial y protegen el nervio del diente.',
      tip: 'Nunca inicies un diseño de sonrisa puramente cosmético ni una ortodoncia sin haber estabilizado primero tu ATM y tu bruxismo.',
    },
  ],
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'atm-integral-dolor-cuello-oido-mordida',
    slug: 'atm-integral-dolor-cuello-oido-mordida',
    title: 'ATM Integral: Por qué el dolor de cuello, oído y cabeza puede originarse en tu mordida',
    excerpt:
      'Muchos pacientes conviven durante años con cefaleas matutinas, zumbidos de oído o tensión cervical sin saber que su Articulación Temporomandibular (ATM) está pidiendo ayuda.',
    category: 'ATM Integral',
    readTime: '5 min de lectura',
    date: 'Octubre 2026',
    author: 'Dra. Eliana Pamela Pazmiño Troncoso',
    authorRole: 'Especialista en Rehabilitación Oral · Docente e Investigadora UDLA',
    relatedSpecialtyId: 'atm-integral',
    keyTakeaways: [
      'La ATM está separada del conducto auditivo por una lámina ósea milimétrica, por lo que su inflamación suele confundirse con dolor de oído.',
      'La postura adelantada de la cabeza altera la posición de cierre mandibular y sobrecarga los músculos cervicales.',
      'El diagnóstico clínico de ATM Integral evalúa músculos, disco articular, oclusión y postura en una sola sesión.',
    ],
    sections: [
      {
        heading: 'El síndrome del dolor silencioso',
        paragraphs: [
          'En nuestra consulta en Quito es sumamente frecuente recibir pacientes que ya han pasado por el otorrinolaringólogo, el neurólogo y múltiples sesiones de masaje descontracturante. Sus exámenes de oído salen normales, pero el dolor punzante delante de la oreja, la pesadez en las sienes al despertar y la rigidez en la nuca persisten.',
          'La explicación anatómica y neurofisiológica está en el sistema estomatognático. La Articulación Temporomandibular (ATM) conecta la mandíbula con la base del cráneo y está inervada por el nervio trigémino, el principal centro de relevo sensitivo de la cabeza y el cuello.',
        ],
        highlightBox:
          'Cuando el disco articular se desplaza o los músculos masticatorios entran en espasmo crónico, el cerebro interpreta a menudo ese dolor como una migraña tensional o una otalgia (dolor de oído).',
      },
      {
        heading: 'La conexión cráneo-cervical: ¿Qué significa "ATM Integral"?',
        paragraphs: [
          'Llamamos ATM Integral a la visión clínica que comprende que los dientes, los músculos de la masticación, las articulaciones temporomandibulares y la columna cervical funcionan como un sistema de engranajes interdependientes.',
          'Por ejemplo, trabajar horas frente al portátil con la cabeza proyectada hacia adelante tensa la musculatura infrahioidea y obliga a la mandíbula a retruirse, comprimiendo la zona retrodiscal de la ATM (la zona más rica en vasos sanguíneos y nervios del oído medio y la articulación).',
        ],
      },
      {
        heading: '¿Cómo abordamos el tratamiento sin procedimientos invasivos?',
        paragraphs: [
          'La evidencia científica actual respalda los tratamientos conservadores, reversibles y ortopédicos como primera línea de acción. A través de una historia clínica detallada, palpación muscular mapeada, desprogramación neuromuscular y férulas estabilizadoras rigurosamente equilibradas, devolvemos a la articulación el espacio biológico que necesita para desinflamarse y sanar.',
        ],
      },
    ],
  },
  {
    id: 'bruxismo-nocturno-vs-vigilia-ciencia',
    slug: 'bruxismo-nocturno-vs-vigilia-ciencia',
    title: 'Bruxismo del sueño vs. bruxismo de vigilia: Más allá de una simple placa de descarga',
    excerpt:
      '¿Aprietas los dientes mientras trabajas o los rechinas al dormir? La ciencia odontológica actual distingue dos condiciones diferentes que requieren estrategias clínicas personalizadas.',
    category: 'Bruxismo y Ciencia',
    readTime: '6 min de lectura',
    date: 'Octubre 2026',
    author: 'Dra. Eliana Pamela Pazmiño Troncoso',
    authorRole: 'Especialista en Rehabilitación Oral · Docente e Investigadora UDLA',
    relatedSpecialtyId: 'bruxismo',
    keyTakeaways: [
      'El bruxismo de vigilia (diurno) se caracteriza por apretamiento silencioso vinculado a concentración y estrés.',
      'El bruxismo del sueño se relaciona con microdespertares del sistema nervioso central y calidad respiratoria nocturna.',
      'Las placas blandas de farmacia o sin ajuste oclusal pueden empeorar la actividad muscular.',
    ],
    sections: [
      {
        heading: 'No todo bruxismo ocurre con los ojos cerrados',
        paragraphs: [
          'Durante décadas se pensó que el bruxismo ocurría exclusivamente por la noche y que su única causa era tener "dientes chuecos". Hoy, a través de consensos internacionales de investigación en dolor orofacial, sabemos que el bruxismo es una actividad muscular regulada centralmente y que se divide en dos entidades claras: Bruxismo del Sueño y Bruxismo de Vigilia.',
          'En la consulta clínica observamos que más del 60% de los adultos jóvenes y profesionales presentan bruxismo de vigilia: mantienen los dientes fuertemente apretados mientras responden correos, conducen o realizan tareas de alta concentración, sin siquiera notarlo.',
        ],
      },
      {
        heading: 'Por qué una placa mal diseñada puede ser contraproducente',
        paragraphs: [
          'Colocar un plástico blando o una placa sin ajuste en relación céntrica ni guías caninas es como caminar con un zapato ortopédico desnivelado. Si la férula tiene contactos prematuros en la zona posterior, los músculos maseteros aumentan su contracción involuntaria tratando de "acomodar" la mordida.',
          'Una férula oclusal verdaderamente terapéutica se diseña en acrílico rígido de alta densidad y se calibra en boca hasta lograr contactos puntiformes simultáneos y desoclusión inmediata en los movimientos laterales.',
        ],
        highlightBox:
          'El tratamiento exitoso del bruxismo combina una férula estabilizadora calibrada para la noche con protocolos de autorregulación neuromuscular durante el día.',
      },
    ],
  },
  {
    id: 'evaluar-atm-antes-de-ortodoncia',
    slug: 'evaluar-atm-antes-de-ortodoncia',
    title: '¿Por qué es vital evaluar tu articulación (ATM) antes de iniciar Ortodoncia o Diseño de Sonrisa?',
    excerpt:
      'Mover los dientes o cambiar su forma modifica directamente la posición de tu mandíbula. Conoce por qué el protocolo diagnóstico de Dental Check UIO protege tu salud a largo plazo.',
    category: 'Prevención Dental Check',
    readTime: '4 min de lectura',
    date: 'Septiembre 2026',
    author: 'Dra. Eliana Pamela Pazmiño Troncoso',
    authorRole: 'Directora Clínica Dental Check UIO · Especialista en Rehabilitación Oral',
    relatedSpecialtyId: 'dental-check-integral',
    keyTakeaways: [
      'Cada diente que se mueve o restaura influye en la trayectoria de cierre de la Articulación Temporomandibular.',
      'Iniciar ortodoncia con una inflamación articular activa puede desencadenar dolor o reabsorción condilar.',
      'El protocolo Dental Check evalúa encías, raíces y ATM antes de cualquier tratamiento estético u ortodóncico.',
    ],
    sections: [
      {
        heading: 'Los cimientos antes de la fachada',
        paragraphs: [
          'Imagina remodelar un edificio sin revisar antes el estado de sus columnas y cimientos. En odontología, los cimientos son el hueso periodontal, las encías y las Articulaciones Temporomandibulares (ATM).',
          'En Dental Check UIO (@dentalcheck.uio) promovemos una odontología ética y segura: antes de colocar brackets, alineadores invisibles o carillas estéticas, realizamos una valoración integral para confirmar que tus articulaciones estén estables y libres de inflamación.',
        ],
      },
      {
        heading: '¿Qué sucede si ya tienes chasquidos o bruxismo y quieres ortodoncia?',
        paragraphs: [
          '¡Sí puedes alinear tu sonrisa! Pero el orden de los factores lo cambia todo. Primero estabilizamos tu ATM, desprogramamos la musculatura y controlamos la inflamación articular. Una vez que tu mandíbula se encuentra en una posición estable y sin dolor, el ortodoncista y el rehabilitador oral trabajan en equipo para llevar tus dientes a una mordida tanto estética como funcionalmente saludable.',
        ],
        highlightBox:
          'En Dental Check UIO, nuestras especialidades trabajan de forma coordinada bajo un mismo techo en Quito para que tu tratamiento sea seguro de principio a fin.',
      },
    ],
  },
  {
    id: 'rehabilitacion-oral-biomimetica-dientes-desgastados',
    slug: 'rehabilitacion-oral-biomimetica-dientes-desgastados',
    title: 'Rehabilitación Oral Biomimética: Cómo recuperar dientes desgastados sin sacrificar tejido sano',
    excerpt:
      'La odontología moderna dejó atrás el desgaste agresivo de dientes sanos. Descubre cómo las incrustaciones adhesivas y cerámicas de última generación imitan la biomecánica del esmalte natural.',
    category: 'Rehabilitación Oral',
    readTime: '5 min de lectura',
    date: 'Septiembre 2026',
    author: 'Dra. Eliana Pamela Pazmiño Troncoso',
    authorRole: 'Especialista en Rehabilitación Oral · Docente e Investigadora UDLA',
    relatedSpecialtyId: 'rehabilitacion-oral',
    keyTakeaways: [
      'La odontología biomimética conserva hasta un 70% más de estructura dental sana en comparación con las coronas tradicionales.',
      'Los materiales cerámicos adhesivos (disilicato de litio y resinas reforzadas) flexionan y transmiten fuerzas igual que el diente natural.',
      'Es posible recuperar la altura de dientes acortados por bruxismo devolviendo juventud al tercio inferior del rostro.',
    ],
    sections: [
      {
        heading: '¿Qué significa "Biomimética" en Rehabilitación Oral?',
        paragraphs: [
          'Biomimética significa literalmente "imitar la vida". En la odontología clásica del siglo pasado, cuando una muela sufría una fractura o el paciente presentaba desgaste por bruxismo, la solución habitual era tallar todo el diente alrededor en forma de muñón para colocar una corona completa con metal en su interior.',
          'Hoy contamos con sistemas adhesivos de estándar de oro y cerámicas vítreas que se fusionan químicamente al esmalte y la dentina. Esto nos permite reponer exclusivamente el fragmento o la altura que el diente perdió, preservando intacta su estructura sana y manteniendo vivo el nervio dental.',
        ],
      },
      {
        heading: 'Devolver la Dimensión Vertical: el rejuvenecimiento funcional',
        paragraphs: [
          'Cuando los dientes se desgastan a lo largo de los años, la distancia entre la nariz y el mentón (Dimensión Vertical) disminuye: los labios pierden soporte, se marcan los surcos alrededor de la boca y la ATM sufre compresión. Mediante una Rehabilitación Oral planificada paso a paso —con una fase de prueba reversible en boca— devolvemos a tus dientes su longitud original, rejuveneciendo tu sonrisa y aliviando la tensión articular.',
        ],
      },
    ],
  },
  {
    id: 'diseno-sonrisa-natural-estetica-biologica',
    slug: 'diseno-sonrisa-natural-estetica-biologica',
    title: 'Diseño de Sonrisa Natural: El equilibrio entre estética facial y función masticatoria',
    excerpt:
      'Por qué la tendencia mundial en estética dental se aleja de los dientes blancos opacos y cuadrados, apostando por la translucidez, la textura natural y el respeto gingival.',
    category: 'Estética Biológica',
    readTime: '4 min de lectura',
    date: 'Agosto 2026',
    author: 'Dra. Eliana Pamela Pazmiño Troncoso',
    authorRole: 'Especialista en Rehabilitación Oral · Directora Dental Check UIO',
    relatedSpecialtyId: 'estetica-natural',
    keyTakeaways: [
      'Un diente natural nunca es de un solo bloque blanco opaco: tiene degradado de color, mamelones y bordes translúcidos.',
      'El mejor diseño de sonrisa es aquel donde las personas notan que te ves radiante, pero nadie sospecha que llevas restauraciones.',
      'Cada carilla o borde estético debe respetar la guía anterior para no fracturarse al masticar.',
    ],
    sections: [
      {
        heading: 'La belleza está en la naturalidad y en la salud de la encía',
        paragraphs: [
          'Seguramente has visto en redes sociales sonrisas que lucen excesivamente blancas, voluminosas y artificiales, acompañadas a menudo de encías inflamadas. Esto ocurre cuando se colocan materiales sobrecontorneados sin respetar el perfil de emergencia biológico del diente ni las guías de movimiento mandibular.',
          'Nuestro enfoque en Diseño de Sonrisa Natural parte de un análisis facial e individualizado: estudiamos la línea de tu sonrisa, la curvatura de tu labio inferior, el tono de tu piel y la personalidad de tu rostro.',
        ],
      },
      {
        heading: 'Prueba tu sonrisa antes de empezar (Mock-up Clínico)',
        paragraphs: [
          'Antes de realizar cualquier procedimiento definitivo, transferimos el diseño planificado a tus dientes mediante una resina provisional estética (Mock-up). Así puedes verte al espejo, hablar, sonreír y validar junto a la Dra. Pamela Pazmiño la forma y longitud de tus dientes con total seguridad.',
        ],
      },
    ],
  },
  {
    id: 'estres-oxidativo-sueno-dolor-orofacial-investigacion',
    slug: 'estres-oxidativo-sueno-dolor-orofacial-investigacion',
    title: 'Estrés, sueño y salud oral: Lo que dice la ciencia sobre el dolor orofacial',
    excerpt:
      'Una mirada accesible desde la investigación universitaria sobre cómo el estrés crónico, la calidad del descanso y los biomarcadores inflamatorios impactan nuestra salud mandibular.',
    category: 'Bruxismo y Ciencia',
    readTime: '6 min de lectura',
    date: 'Agosto 2026',
    author: 'Dra. Eliana Pamela Pazmiño Troncoso',
    authorRole: 'Especialista en Rehabilitación Oral · Docente e Investigadora UDLA',
    relatedSpecialtyId: 'atm-integral',
    keyTakeaways: [
      'Las investigaciones científicas recientes demuestran vínculos entre el dolor orofacial crónico, la calidad del sueño y marcadores biológicos de estrés.',
      'El abordaje moderno del paciente con dolor mandibular requiere empatía, escucha activa y educación terapéutica.',
      'Pequeños cambios en la higiene del sueño y ergonomía potencian el éxito del tratamiento odontológico.',
    ],
    sections: [
      {
        heading: 'Cuando la ciencia en el laboratorio ilumina la consulta clínica',
        paragraphs: [
          'En la investigación académica universitaria sobre Trastornos Temporomandibulares (TTM) y bruxismo hemos estudiado cómo el estrés sostenido y la sobrecarga mecánica generan respuestas bioquímicas reales —incluyendo cambios en biomarcadores de estrés oxidativo e inflamación articular— que sensibilizan las fibras nerviosas del rostro.',
          'Comprender esto cambia por completo la forma en que tratamos a un paciente en consulta: quien sufre de dolor orofacial o bruxismo necesita un espacio clínico empático, sin prisas, donde se valide lo que siente y se aborde tanto la mecánica dental como el bienestar integral.',
        ],
        highlightBox:
          'La odontología contemporánea une la precisión de la Rehabilitación Oral con la neurobiología del dolor y la prevención integral.',
      },
    ],
  },
];

export const INSTAGRAM_SHOWCASE = [
  {
    id: 'ig-1',
    account: '@drapamelapazmino',
    accountUrl: 'https://www.instagram.com/drapamelapazmino/',
    imageUrl: '/images/clinic/dentalcheck-06.jpg',
    badge: 'ATM Integral & Bruxismo 3D',
    title: '¿Dolor de cabeza al despertar o chasquidos al abrir la boca?',
    caption:
      'Tu articulación temporomandibular (ATM) y tu postura cervical están conectadas. Planificamos férulas oclusales digitales 3D calibradas para tu caso.',
    format: 'Diagnóstico Digital 3D',
    likesLabel: 'Comunidad Salud Oral Quito',
  },
  {
    id: 'ig-2',
    account: '@drapamelapazmino',
    accountUrl: 'https://www.instagram.com/drapamelapazmino/',
    imageUrl: '/images/clinic/dentalcheck-05.jpg',
    badge: 'Caso Real · Antes y Después',
    title: 'Diseño de Sonrisa Natural: Armonía que respeta tu biología',
    caption:
      'Resultados luminosos, translúcidos y conservadores. Devolvemos la anatomía perdida sin desgastar tejido dental sano.',
    format: 'Caso Clínico Real',
    likesLabel: 'Odontología Biomimética',
  },
  {
    id: 'ig-3',
    account: '@dentalcheck.uio',
    accountUrl: 'https://www.instagram.com/dentalcheck.uio/',
    imageUrl: '/images/clinic/dentalcheck-02.jpg',
    badge: 'Dental Check UIO · Quito',
    title: 'Dra. Pamela Pazmiño · "Nuestro mejor proyecto, Tu sonrisa"',
    caption:
      'Antes de colocar brackets, alineadores o carillas, evaluamos encías, raíces y tu ATM en nuestro centro de Fortune Plaza (Torre Alemania).',
    format: 'Directora Clínica',
    likesLabel: 'Prevención Segura en Quito',
  },
  {
    id: 'ig-4',
    account: '@dentalcheck.uio',
    accountUrl: 'https://www.instagram.com/dentalcheck.uio/',
    imageUrl: '/images/clinic/dentalcheck-10.jpg',
    badge: 'Pacientes Felices · 5.0 ★',
    title: 'Bioseguridad, tecnología y mano suave sin dolor en cada consulta',
    caption:
      'Un equipo de especialistas liderado por la Dra. Pamela Pazmiño para cuidar tu sonrisa con empatía y precisión clínica.',
    format: 'Experiencia en Clínica',
    likesLabel: 'Dental Check Quito',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Julio Olmedo',
    role: 'Reseña Verificada en Google Maps · 5.0 ★',
    quote:
      'La Dra. Pame es muy profesional y minuciosa, tenía años sin ir al dentista por malas experiencias respecto al manejo del dolor, pero ella en verdad que tiene muy buena mano.',
    specialty: 'Atención Sin Dolor · Dra. Pamela Pazmiño',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Estefanía Bravo',
    role: 'Reseña Verificada en Google Maps · 5.0 ★',
    quote:
      'Muy buena atención, muy suave la mano de la doctora, sin dolor. Muy buena atención y muy chévere cómo te cuentan qué es lo que está pasando y te dan muchas opciones.',
    specialty: 'Diagnóstico Claro y Empático',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Selene López',
    role: 'Reseña Verificada en Google Maps · 5.0 ★',
    quote:
      'La verdad es que me ha ido muy bien, la Dra. Pame siempre se asegura que no me sienta incómoda o me duela en cada uno de mis tratamientos, me gusta ir y sentirme sana con mis dientes. 🦷 Buena experiencia.',
    specialty: 'Rehabilitación y Salud Oral Integral',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Santiago Zavala',
    role: 'Reseña Verificada en Google Maps · 5.0 ★',
    quote:
      'Dental Check me devolvió la confianza y quitó la fobia que había desarrollado a visitar al dentista. Su personal es excelente, empático y muy profesional; sus equipos son modernos. Dental Check es referente en el área odontológica.',
    specialty: 'Dental Check UIO · Quito',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Jairo Daniel',
    role: 'Reseña Verificada en Google Maps · 5.0 ★',
    quote:
      'Excelente servicio, les recomiendo a la Doc. Pame y a su equipo de trabajo en Dental Check.',
    specialty: 'Especialidades Odontológicas',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: '¿Cómo es la primera consulta de valoración con la Dra. Pamela Pazmiño?',
    answer:
      'Es una sesión clínica dedicada sin prisas. Iniciamos con una escucha activa de tus síntomas o expectativas estéticas, realizamos una inspección dental y periodontal completa (Dental Check), evaluamos la musculatura masticatoria, el rango de movimiento de tu Articulación Temporomandibular (ATM) y la estabilidad de tu mordida. Al finalizar te explicamos de forma clara y transparente tu diagnóstico y las alternativas de tratamiento.',
  },
  {
    question: '¿Qué diferencia al enfoque de "ATM Integral" frente a una placa común para bruxismo?',
    answer:
      'Muchas placas convencionales se entregan sin un diagnóstico articular previo ni ajuste oclusal en céntrica. Nuestro protocolo de ATM Integral evalúa la articulación, los músculos masticatorios, la postura cráneo-cervical y diferencia entre bruxismo de sueño y de vigilia. La férula estabilizadora se confecciona en material rígido y se calibra milimétricamente en boca a lo largo de controles programados.',
  },
  {
    question: '¿Dónde está ubicado el consultorio y cómo puedo llegar?',
    answer:
      'Atendemos en nuestro centro odontológico Dental Check UIO, ubicado en Av. Eloy Alfaro esq. y Alemania, Edificio Fortune Plaza (Torre Alemania), Sector La Pradera (170519 Quito). Contamos con fácil acceso vehicular, parqueadero y accesibilidad universal.',
  },
  {
    question: '¿En el Diseño de Sonrisa Natural es necesario desgastar mis dientes sanos?',
    answer:
      'No. Nuestra filosofía como especialistas en Rehabilitación Oral es la máxima preservación biológica. Priorizamos aclaramiento clínico seguro, bordes adhesivos y carillas de mínima invasión o sin desgaste cuando el caso lo permite, verificando siempre una prueba estética previa (Mock-up) y una mordida equilibrada.',
  },
];
