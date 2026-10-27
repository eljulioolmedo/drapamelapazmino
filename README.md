# drapamelapazmino.com — Dra. Eliana Pamela Pazmiño Troncoso · Dental Check UIO

Sitio web oficial de la **Dra. Pamela Pazmiño** (`@drapamelapazmino`) y su centro odontológico **Dental Check UIO** (`@dentalcheck.uio`) en Quito, Ecuador.

Construido con **React 19 + Vite 6 + TypeScript + Tailwind CSS v4 + React Router v7 + Lucide Icons**, diseñado bajo una línea editorial clínica cálida inspirada en `davidjaramillo.org` y optimizado para despliegue directo en **Hostinger**.

---

## Arquitectura del Sitio

1. **Inicio (`/`)**:
   - Hero editorial con identidad de la **Dra. Eliana Pamela Pazmiño Troncoso** (*Especialista en Rehabilitación Oral, ATM Integral, Bruxismo y Dolor Orofacial · Docente e Investigadora UDLA · Directora Clínica en Dental Check UIO*).
   - Sección de empatía clínica: *"¿Te identificas con alguna de estas situaciones?"* (Dolor o chasquidos en ATM, cefaleas matutinas/tensión cervical, bruxismo de día o noche, dientes desgastados, estética natural y chequeo previo a ortodoncia).
   - **5 Pilares Clínicos**:
     1. **ATM Integral y Dolor Orofacial**
     2. **Bruxismo del Sueño y de Vigilia**
     3. **Rehabilitación Oral y Prótesis de Alta Precisión**
     4. **Estética Dental y Diseño de Sonrisa Natural**
     5. **Odontología Integral y Preventiva — Dental Check UIO**
   - **Herramientas Interactivas de Captación**:
     - **Test Interactivo de ATM Integral, Bruxismo y Salud Oral** (con cálculo de perfil clínico y envío directo a WhatsApp).
     - **E-Book / Guía Gratuita para Pacientes**: *"Mandíbula en Calma, Sonrisa Funcional"* (con lector interactivo y opción de Guardar en PDF / Imprimir).
   - **Showcase Dual de Instagram**: `@drapamelapazmino` y `@dentalcheck.uio`.
   - **Testimonios, Blog de Divulgación Científica y Ubicación en Quito**.
2. **Sobre Mí (`/sobre-mi`)**:
   - Trayectoria académica, especialidad en Rehabilitación Oral y ATM Integral, docencia e investigación científica en la UDLA (publicaciones indexadas sobre bruxismo, TTM y dolor orofacial) y presentación de **Dental Check UIO**.
3. **Especialidades y ATM (`/especialidades`)**:
   - Protocolos clínicos detallados por especialidad, síntomas de alerta, diagramas biomecánicos y el paso a paso de la primera consulta.
4. **Blog y Recursos (`/blog` y `/blog/:slug`)**:
   - 6 artículos completos basados en evidencia científica sobre ATM Integral, Bruxismo nocturno vs. vigilia, Evaluación de ATM antes de Ortodoncia, Rehabilitación Oral Biomimética, Diseño de Sonrisa Natural y Estrés Oxidativo/Dolor Orofacial.
5. **Contacto y Ubicación (`/contacto`)**:
   - Formulario inteligente de agendamiento conectado a WhatsApp (`099 189 7077`), teléfono fijo (`(02) 515 1868`), enlace directo a Google Maps (`https://share.google/CnvzdeUfDjMqICTIm`), mapa embebido de **Av. La Coruña y Francisco de Orellana (Sector Iñaquito, Quito)** y Preguntas Frecuentes.

---

## Cómo agregar fotografías reales de la Dra. Pamela Pazmiño

El componente [`DoctorEditorialPortrait`](file:///home/julioolmedo/Documents/Lapso/SeeMon/drapamelapazmino/src/components/ClinicalVisuals.tsx) detecta automáticamente si colocas una fotografía real en:
- `public/images/dra-pamela-pazmino.jpg`

También puedes editar textos, teléfonos, horarios o artículos desde un único archivo centralizado:
- [`src/data/siteContent.ts`](file:///home/julioolmedo/Documents/Lapso/SeeMon/drapamelapazmino/src/data/siteContent.ts)

---

## Comandos de Desarrollo y Compilación

```bash
cd drapamelapazmino
npm install
npm run dev      # Servidor local de desarrollo
npm run build    # Genera la carpeta dist/ lista para Hostinger
```

---

## Despliegue en Hostinger (`drapamelapazmino.com`)

1. Ejecuta `npm run build` dentro de `drapamelapazmino/`.
2. Sube el contenido de la carpeta `dist/` directamente dentro de `public_html/` en el Administrador de Archivos de Hostinger (o configura el despliegue desde Git apuntando el directorio de salida a `dist`).
3. El archivo `public/.htaccess` ya está incluido y se copia automáticamente a `dist/.htaccess` para garantizar que todas las rutas (`/sobre-mi`, `/especialidades`, `/blog`, `/contacto`) funcionen correctamente y redirijan a HTTPS.
