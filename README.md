# Sistema Gestor FPQRS — Prototipo Funcional

Este repositorio contiene la implementación frontend del **Sistema de Gestión de Casos Financieros (GestorFPQRS)**, basado estrictamente en los prototipos de diseño suministrados.

## 🚀 Tecnologías Utilizadas

El proyecto se ha construido utilizando exclusivamente tecnologías base del lado del cliente, sin frameworks SPA (React/Angular/Vue) ni compiladores de CSS (Tailwind):

- **HTML5 Semántico**: Estructuración accesible y moderna de las 4 vistas requeridas.
- **CSS3 (Vanilla)**: Implementación de un *Design System* a la medida (`css/styles.css`) con variables CSS (`:root`), que replica fielmente los tokens de diseño del prototipo (colores Slate/Primary, tipografías, sombras y radios de borde).
- **Bootstrap 5.3.3 (CDN)**: Utilizado como base para el sistema de grillas (`row`, `col-md-*`) y utilidades de reseteo, integrándose de forma no intrusiva con el diseño personalizado.
- **JavaScript ES6 (Vanilla) + jQuery 3.7**: Para el manejo del DOM, interactividad (modales, tooltips, acordeones), simulación de base de datos y validaciones de formularios.
- **Lucide Icons (CDN)**: Biblioteca de iconos SVG dinámicos, idéntica a la utilizada en los prototipos originales.
- **Google Fonts (Inter)**: Tipografía principal del sistema para garantizar la misma estética.

---

## 📁 Estructura del Proyecto

El proyecto está diseñado como una aplicación Multi-Page (MPA), donde cada vista es un archivo HTML independiente que se enlaza entre sí.

```text
prototipo-fpqrs/
├── index.html            # Archivo raíz (redirige a login.html)
├── login.html            # Vista 1: Inicio de Sesión
├── bandeja.html          # Vista 2: Bandeja de Casos (Listado principal)
├── detalle.html          # Vista 3: Detalle Completo del Caso
├── formulario.html       # Vista 4: Formulario público de radicación FPQRS
├── README.md             # Documentación técnica
├── css/
│   └── styles.css        # Hoja de estilos global y Design System
├── js/
│   ├── data.js           # Base de datos simulada (JSON estático) y utilidades
│   ├── auth.js           # Lógica de inicio de sesión y protección de rutas
│   ├── bandeja.js        # Lógica de renderizado de tabla, filtros y paginación
│   ├── detalle.js        # Lógica de tabs, cambio de estados, historial y comentarios
│   └── formulario.js     # Validaciones, carga de archivos y selects en cascada
└── assets/
    └── images/
        └── logo.png      # Logo del sistema
```

---

## ⚙️ Instrucciones de Ejecución

Dado que es un proyecto completamente estático, no requiere la instalación de dependencias de Node.js, compiladores ni servidores de base de datos.

### Opción 1: Servidor Local (Recomendado)
Para evitar bloqueos de CORS al cargar los íconos o fuentes y asegurar el correcto funcionamiento del almacenamiento local (`sessionStorage`), se recomienda servir la carpeta a través de un servidor HTTP ligero:

1. **Usando VS Code:**
   - Instale la extensión **Live Server**.
   - Haga clic derecho sobre `index.html` y seleccione "Open with Live Server".

2. **Usando Python:**
   - Abra una terminal en la carpeta del proyecto y ejecute:
     ```bash
     python -m http.server 8000
     ```
   - Ingrese a `http://localhost:8000` en su navegador.

3. **Usando Node.js (http-server):**
   - Si tiene Node instalado, ejecute: `npx http-server`

### Opción 2: Ejecución directa
- También puede simplemente hacer doble clic en el archivo `index.html` para abrirlo directamente en cualquier navegador moderno (Chrome, Firefox, Safari, Edge).

---

## 🔑 Cuentas de Acceso (Demo)

El sistema cuenta con un módulo de autenticación simulada. Puede usar cualquiera de las siguientes credenciales para acceder, o hacer clic en las tarjetas de la pantalla de login para autocompletar:

| Rol | Correo Electrónico | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin@coopfinanzas.com.co` | `Admin@2026!` |
| **Operador** | `operador@coopfinanzas.com.co` | `Oper@2026!` |
| **Supervisor** | `supervisor@coopfinanzas.com.co` | `Super@2026!` |

---

## 🧩 Funcionalidades Implementadas

Aunque el alcance era de maquetación, se agregó lógica en JavaScript para simular una experiencia real (Mockup interactivo):

1. **Autenticación (auth.js):**
   - Validación de credenciales simuladas.
   - Guardado de sesión usando `sessionStorage`/`localStorage` ("Recordarme").
   - Protección de rutas (redirige a login si intenta entrar a la bandeja sin sesión).

2. **Bandeja de Casos (bandeja.js):**
   - Renderizado dinámico desde `data.js` con más de 15 casos simulados.
   - Buscador por número de radicado o nombre del asociado en tiempo real.
   - Paginación funcional (10 ítems por página).
   - Ordenamiento por columnas (clic en encabezados de tabla).
   - Panel desplegable de filtros (Estado, Tipo, Prioridad).
   - Tarjetas de estadísticas (KPIs) calculadas a partir de los datos.

3. **Detalle de Caso (detalle.js):**
   - Sistema de navegación por pestañas (Tabs) sin recargar la página.
   - Menús desplegables personalizados para cambio de **Estado**, **Prioridad** y **Reasignación** de responsable.
   - Simulación de registro de observaciones y envío de respuestas al asociado.
   - Modales interactivos para las acciones críticas de "Cerrar caso" y "Anular caso".
   - Línea de tiempo interactiva (Historial) que se actualiza al realizar acciones en la vista.

4. **Formulario Público (formulario.js):**
   - **Selects en Cascada**: El campo "Categoría" depende del "Servicio" seleccionado, y "Subcategoría" depende de "Categoría" (mapeado desde `data.js`).
   - Zona de subida de archivos (Drag & Drop simulado) con validación de extensiones y peso máximo (5MB).
   - Validaciones de campos obligatorios, formato de correo y check de políticas de datos.
   - Modal de éxito que simula la generación de un número de radicado (Ej: FPQRS-2026-84392).

## 📝 Consideraciones Relevantes sobre la Implementación Realizada

1. **Auditoría de Calidad Web (Lighthouse)**: El prototipo fue sometido a una auditoría técnica donde se aplicaron optimizaciones de **Performance** (preconexiones, eliminación de `@import`, scripts con `defer`), **Accesibilidad** (contraste WCAG AA para validaciones, roles ARIA en gráficos SVG) y **SEO** (metadatos Open Graph y URLs canónicas).
2. **Formulario Público Dinámico**: El flujo de radicación se refactorizó para mostrar una vista de éxito completa dentro de la misma página (sin recargar), reemplazando el uso de modales. Además, se introdujeron validaciones dinámicas en el lado del cliente (ej. regex para celular colombiano de 10 dígitos y reglas de longitud).
3. **Compatibilidad y Librerías**: A solicitud del requerimiento técnico, se mantuvo el uso intensivo de **jQuery** como motor principal de manipulación del DOM y eventos, equilibrando su uso con APIs nativas de JavaScript donde el rendimiento lo exigía.
4. **Fidelidad Visual (Pixel Perfect)**: Se extrajeron las variables de color (Slate, Blue, Emerald, Amber, Red) y propiedades de diseño (tipografías, sombras) desde la especificación original, implementándose a través de un sistema de variables CSS puro (`css/global.css` y `css/components.css`) para evitar dependencias de compiladores externos como Tailwind CSS.
5. **Simulación Mockup**: Todo el manejo de datos (cambios de estado, radicación, comentarios e historial) ocurre en la memoria del navegador, brindando una experiencia "real" sin necesidad de backend.
