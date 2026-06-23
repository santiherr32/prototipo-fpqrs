/**
 * GestorFPQRS — Datos Simulados
 * Módulo de datos estáticos para demostración
 */

const APP_DATA = {
  /* Usuarios de demo */
  usuarios: [
    {
      id: 'u-01',
      nombre: 'Sofía Martínez',
      correo: 'admin@coopfinanzas.com.co',
      contrasena: 'Admin@2026!',
      rol: 'Administrador'
    },
    {
      id: 'u-02',
      nombre: 'Carlos Andrés Moreno',
      correo: 'operador@coopfinanzas.com.co',
      contrasena: 'Oper@2026!',
      rol: 'Operador'
    },
    {
      id: 'u-03',
      nombre: 'Patricia Inés Agudelo',
      correo: 'supervisor@coopfinanzas.com.co',
      contrasena: 'Super@2026!',
      rol: 'Supervisor'
    }
  ],

  /* Tipos de identificación */
  tiposIdentificacion: [
    { id: 'ti-01', nombre: 'Cédula de Ciudadanía' },
    { id: 'ti-02', nombre: 'Cédula de Extranjería' },
    { id: 'ti-03', nombre: 'NIT' },
    { id: 'ti-04', nombre: 'Pasaporte' }
  ],

  /* Tipos de caso */
  tiposCaso: [
    { id: 'tc-01', nombre: 'Felicitación', badge: 'badge-felicitacion' },
    { id: 'tc-02', nombre: 'Petición', badge: 'badge-peticion' },
    { id: 'tc-03', nombre: 'Queja', badge: 'badge-queja' },
    { id: 'tc-04', nombre: 'Reclamo', badge: 'badge-reclamo' },
    { id: 'tc-05', nombre: 'Sugerencia', badge: 'badge-sugerencia' }
  ],

  /* Prioridades */
  prioridades: [
    { id: 'pr-01', nombre: 'Baja', badge: 'badge-baja', slaHoras: 72 },
    { id: 'pr-02', nombre: 'Normal', badge: 'badge-normal', slaHoras: 48 },
    { id: 'pr-03', nombre: 'Alta', badge: 'badge-alta', slaHoras: 24 },
    { id: 'pr-04', nombre: 'Crítica', badge: 'badge-critica', slaHoras: 4 }
  ],

  /* Estados */
  estados: [
    { id: 'es-01', nombre: 'Radicado', badge: 'badge-radicado' },
    { id: 'es-02', nombre: 'En Gestión', badge: 'badge-en-gestion' },
    { id: 'es-03', nombre: 'Pendiente de Información', badge: 'badge-pendiente' },
    { id: 'es-04', nombre: 'Cerrado', badge: 'badge-cerrado' },
    { id: 'es-05', nombre: 'Anulado', badge: 'badge-anulado' }
  ],

  /* Servicios → Categorías → Subcategorías */
  servicios: [
    {
      id: 'sv-01', nombre: 'Crédito',
      categorias: [
        { id: 'cat-01', nombre: 'Crédito de Consumo', subcategorias: ['Solicitud de refinanciación', 'Condiciones del crédito', 'Cobro de intereses'] },
        { id: 'cat-02', nombre: 'Crédito Hipotecario', subcategorias: ['Desembolso tardío', 'Condiciones del crédito hipotecario'] },
        { id: 'cat-03', nombre: 'Refinanciación de Crédito', subcategorias: ['Inconformidad con condiciones de refinanciación', 'Demora en proceso'] }
      ]
    },
    {
      id: 'sv-02', nombre: 'Ahorro y Captación',
      categorias: [
        { id: 'cat-04', nombre: 'Cuenta de Ahorros', subcategorias: ['Cobro de cuota de manejo', 'Bloqueo de cuenta', 'Error en saldo'] },
        { id: 'cat-05', nombre: 'CDT', subcategorias: ['Error en tasa de CDT', 'Renovación de CDT'] },
        { id: 'cat-06', nombre: 'CDAT', subcategorias: ['Liquidación anticipada', 'Rentabilidad del CDAT'] }
      ]
    },
    {
      id: 'sv-03', nombre: 'Canales Digitales',
      categorias: [
        { id: 'cat-07', nombre: 'App Móvil', subcategorias: ['Sugerencia de nueva funcionalidad en app', 'Error en la aplicación', 'Problemas de acceso'] },
        { id: 'cat-08', nombre: 'Portal Web', subcategorias: ['Sugerencia de mejora en portal web', 'Error en transacciones web'] },
        { id: 'cat-09', nombre: 'Banca Virtual', subcategorias: ['Acceso denegado', 'Error en transferencia'] }
      ]
    },
    {
      id: 'sv-04', nombre: 'Atención al Asociado',
      categorias: [
        { id: 'cat-10', nombre: 'Atención Presencial', subcategorias: ['Felicitación por excelente atención', 'Demora en atención', 'Trato inadecuado'] },
        { id: 'cat-11', nombre: 'Atención Virtual', subcategorias: ['Chat sin respuesta oportuna', 'Calidad de atención virtual'] },
        { id: 'cat-12', nombre: 'Call Center', subcategorias: ['Tiempo de espera excesivo', 'Información incorrecta'] }
      ]
    },
    {
      id: 'sv-05', nombre: 'Pagos y Transferencias',
      categorias: [
        { id: 'cat-13', nombre: 'Pago PSE', subcategorias: ['Pago PSE no acreditado en destino', 'Doble débito en pago PSE'] },
        { id: 'cat-14', nombre: 'Transferencias Nacionales', subcategorias: ['Comprobante de transferencia', 'Transferencia no recibida'] },
        { id: 'cat-15', nombre: 'Pago de Nómina', subcategorias: ['Error en dispersión de nómina'] }
      ]
    },
    {
      id: 'sv-06', nombre: 'Seguros y Protección',
      categorias: [
        { id: 'cat-16', nombre: 'Seguro de Vida', subcategorias: ['Reclamación de póliza', 'Cobro indebido'] },
        { id: 'cat-17', nombre: 'Seguro de Deudores', subcategorias: ['Cobertura del seguro'] }
      ]
    },
    {
      id: 'sv-07', nombre: 'Inversiones',
      categorias: [
        { id: 'cat-18', nombre: 'Fondos de Inversión', subcategorias: ['Rentabilidad no esperada', 'Retiro de inversión'] }
      ]
    },
    {
      id: 'sv-08', nombre: 'Centrales de Riesgo',
      categorias: [
        { id: 'cat-19', nombre: 'Reporte en DataCrédito', subcategorias: ['Reporte erróneo', 'Actualización de reporte'] },
        { id: 'cat-20', nombre: 'Consulta de Historial', subcategorias: ['Solicitud de historial crediticio'] }
      ]
    },
    {
      id: 'sv-09', nombre: 'Educación Cooperativa',
      categorias: [
        { id: 'cat-21', nombre: 'Capacitaciones', subcategorias: ['Solicitud de capacitación', 'Sugerencia de temática'] }
      ]
    },
    {
      id: 'sv-10', nombre: 'Vinculación y Retiro',
      categorias: [
        { id: 'cat-22', nombre: 'Vinculación', subcategorias: ['Demora en proceso de vinculación'] },
        { id: 'cat-23', nombre: 'Retiro Voluntario', subcategorias: ['Liquidación de aportes', 'Proceso de retiro'] }
      ]
    },
    {
      id: 'sv-11', nombre: 'Cartera y Cobranza',
      categorias: [
        { id: 'cat-24', nombre: 'Cobro Jurídico', subcategorias: ['Honorarios de cobro jurídico', 'Acuerdo de pago'] },
        { id: 'cat-25', nombre: 'Reestructuración de Crédito', subcategorias: ['Demora en proceso de reestructuración', 'Condiciones de reestructuración'] }
      ]
    },
    {
      id: 'sv-12', nombre: 'Certificaciones y Documentos',
      categorias: [
        { id: 'cat-26', nombre: 'Certificados', subcategorias: ['Paz y salvo', 'Certificación de deuda', 'Certificación tributaria'] }
      ]
    }
  ],

  /* Responsables */
  responsables: [
    { id: 'r-01', nombre: 'Valentina Ospina Ríos', area: 'Atención al Asociado' },
    { id: 'r-02', nombre: 'Jorge Iván Castillo', area: 'Pagos y Transferencias' },
    { id: 'r-03', nombre: 'Iván Darío Zapata', area: 'Canales Digitales' },
    { id: 'r-04', nombre: 'Patricia Inés Agudelo', area: 'Atención al Asociado' },
    { id: 'r-05', nombre: 'Camilo Ernesto Herrera', area: 'Ahorro y Captación' },
    { id: 'r-06', nombre: 'Diana Carolina Ríos', area: 'Crédito' },
    { id: 'r-07', nombre: 'Carlos Andrés Moreno', area: 'Crédito' },
    { id: 'r-08', nombre: 'Adriana Milena Cortés', area: 'Cartera y Cobranza' },
    { id: 'r-09', nombre: 'Rodrigo Esteban Muñoz', area: 'Operaciones Financieras' }
  ],

  /* Casos de la bandeja */
  casos: [
    {
      id: 'c-01', radicado: 'FPQRS-2026-04758', fechaRadicacion: '07/05/2026',
      tipo: 'Felicitación', servicio: 'Atención al Asociado', categoria: 'Atención Presencial',
      subcategoria: 'Felicitación por excelente atención',
      asociado: 'Sandra Milena Aguirre Torres', responsable: 'Valentina Ospina Ríos',
      prioridad: 'Baja', estado: 'Cerrado', limiteSLA: '09/05/2026', semaforo: 'gris'
    },
    {
      id: 'c-02', radicado: 'FPQRS-2026-04290', fechaRadicacion: '07/05/2026',
      tipo: 'Sugerencia', servicio: 'Pagos y Transferencias', categoria: 'Transferencias Nacionales',
      subcategoria: 'Comprobante de transferencia',
      asociado: 'Yolanda Cecilia Prada Niño', responsable: 'Jorge Iván Castillo',
      prioridad: 'Baja', estado: 'Radicado', limiteSLA: '08/05/2026', semaforo: 'verde'
    },
    {
      id: 'c-03', radicado: 'FPQRS-2026-04760', fechaRadicacion: '07/05/2026',
      tipo: 'Sugerencia', servicio: 'Canales Digitales', categoria: 'App Móvil',
      subcategoria: 'Sugerencia de nueva funcionalidad en app',
      asociado: 'Andrés Camilo Rojas Velandia', responsable: 'Iván Darío Zapata',
      prioridad: 'Baja', estado: 'Radicado', limiteSLA: '12/05/2026', semaforo: 'verde'
    },
    {
      id: 'c-04', radicado: 'FPQRS-2026-04510', fechaRadicacion: '07/05/2026',
      tipo: 'Sugerencia', servicio: 'Atención al Asociado', categoria: 'Atención Virtual',
      subcategoria: 'Chat sin respuesta oportuna',
      asociado: 'Beatriz Elena Montoya Arango', responsable: 'Patricia Inés Agudelo',
      prioridad: 'Normal', estado: 'Radicado', limiteSLA: '08/05/2026', semaforo: 'verde'
    },
    {
      id: 'c-05', radicado: 'FPQRS-2026-04700', fechaRadicacion: '06/05/2026',
      tipo: 'Sugerencia', servicio: 'Canales Digitales', categoria: 'Portal Web',
      subcategoria: 'Sugerencia de mejora en portal web',
      asociado: 'Patricia Inés Londoño Vélez', responsable: 'Iván Darío Zapata',
      prioridad: 'Baja', estado: 'Radicado', limiteSLA: '07/05/2026', semaforo: 'amarillo'
    },
    {
      id: 'c-06', radicado: 'FPQRS-2026-04035', fechaRadicacion: '06/05/2026',
      tipo: 'Sugerencia', servicio: 'Ahorro y Captación', categoria: 'CDT',
      subcategoria: 'Error en tasa de CDT',
      asociado: 'Diana Marcela Ríos Castillo', responsable: 'Camilo Ernesto Herrera',
      prioridad: 'Baja', estado: 'Radicado', limiteSLA: '11/05/2026', semaforo: 'verde'
    },
    {
      id: 'c-07', radicado: 'FPQRS-2026-04610', fechaRadicacion: '06/05/2026',
      tipo: 'Sugerencia', servicio: 'Crédito', categoria: 'Refinanciación de Crédito',
      subcategoria: 'Inconformidad con condiciones de refinanciación',
      asociado: 'Beatriz Elena Montoya Arango', responsable: 'Diana Carolina Ríos',
      prioridad: 'Baja', estado: 'Radicado', limiteSLA: '09/05/2026', semaforo: 'verde'
    },
    {
      id: 'c-08', radicado: 'FPQRS-2026-04200', fechaRadicacion: '06/05/2026',
      tipo: 'Sugerencia', servicio: 'Cartera y Cobranza', categoria: 'Reestructuración de Crédito',
      subcategoria: 'Demora en proceso de reestructuración',
      asociado: 'Patricia Inés Londoño Vélez', responsable: 'Adriana Milena Cortés',
      prioridad: 'Baja', estado: 'Radicado', limiteSLA: '09/05/2026', semaforo: 'verde'
    },
    {
      id: 'c-09', radicado: 'FPQRS-2026-04450', fechaRadicacion: '06/05/2026',
      tipo: 'Sugerencia', servicio: 'Crédito', categoria: 'Crédito de Consumo',
      subcategoria: 'Solicitud de refinanciación',
      asociado: 'Andrés Camilo Rojas Velandia', responsable: 'Carlos Andrés Moreno',
      prioridad: 'Baja', estado: 'Radicado', limiteSLA: '10/05/2026', semaforo: 'verde'
    },
    {
      id: 'c-10', radicado: 'FPQRS-2026-04779', fechaRadicacion: '04/05/2026',
      tipo: 'Queja', servicio: 'Pagos y Transferencias', categoria: 'Pago PSE',
      subcategoria: 'Pago PSE no acreditado en destino',
      asociado: 'Jorge Luis Patiño Restrepo', responsable: 'Rodrigo Esteban Muñoz',
      prioridad: 'Crítica', estado: 'Pendiente de Información', limiteSLA: '04/05/2026', semaforo: 'rojo'
    },
    {
      id: 'c-11', radicado: 'FPQRS-2026-04100', fechaRadicacion: '05/05/2026',
      tipo: 'Reclamo', servicio: 'Crédito', categoria: 'Crédito de Consumo',
      subcategoria: 'Cobro de intereses',
      asociado: 'María Fernanda López Gómez', responsable: 'Diana Carolina Ríos',
      prioridad: 'Alta', estado: 'En Gestión', limiteSLA: '06/05/2026', semaforo: 'rojo'
    },
    {
      id: 'c-12', radicado: 'FPQRS-2026-04320', fechaRadicacion: '05/05/2026',
      tipo: 'Petición', servicio: 'Centrales de Riesgo', categoria: 'Reporte en DataCrédito',
      subcategoria: 'Reporte erróneo',
      asociado: 'Luis Eduardo Ramírez Herrera', responsable: 'Camilo Ernesto Herrera',
      prioridad: 'Normal', estado: 'En Gestión', limiteSLA: '07/05/2026', semaforo: 'amarillo'
    },
    {
      id: 'c-13', radicado: 'FPQRS-2026-04555', fechaRadicacion: '03/05/2026',
      tipo: 'Queja', servicio: 'Atención al Asociado', categoria: 'Call Center',
      subcategoria: 'Tiempo de espera excesivo',
      asociado: 'Rosa Elena Vargas Duque', responsable: 'Valentina Ospina Ríos',
      prioridad: 'Normal', estado: 'Radicado', limiteSLA: '05/05/2026', semaforo: 'rojo'
    },
    {
      id: 'c-14', radicado: 'FPQRS-2026-03980', fechaRadicacion: '02/05/2026',
      tipo: 'Petición', servicio: 'Certificaciones y Documentos', categoria: 'Certificados',
      subcategoria: 'Paz y salvo',
      asociado: 'Fernando Alberto Castaño Mejía', responsable: 'Jorge Iván Castillo',
      prioridad: 'Baja', estado: 'Cerrado', limiteSLA: '05/05/2026', semaforo: 'gris'
    },
    {
      id: 'c-15', radicado: 'FPQRS-2026-04890', fechaRadicacion: '07/05/2026',
      tipo: 'Reclamo', servicio: 'Ahorro y Captación', categoria: 'Cuenta de Ahorros',
      subcategoria: 'Error en saldo',
      asociado: 'Claudia Patricia Henao Ruiz', responsable: 'Camilo Ernesto Herrera',
      prioridad: 'Alta', estado: 'Radicado', limiteSLA: '08/05/2026', semaforo: 'verde'
    }
  ],

  /* Detalle de caso (para la vista de detalle) */
  casoDetalle: {
    radicado: 'FPQRS-2026-04779',
    fechaRadicacion: '04/05/2026 18:00',
    canal: 'App Móvil',
    tipo: 'Queja',
    estado: 'Pendiente de Información',
    prioridad: 'Crítica',
    semaforo: 'rojo',
    slaHoras: 4,
    limiteSLA: '04/05/2026 22:00',

    asociado: {
      nombre: 'Jorge Luis Patiño Restrepo',
      tipoId: 'CC',
      identificacion: '71456023',
      correo: 'jl.patino@empresa.com.co',
      celular: '3209876543',
      direccion: 'Av El Poblado #12-45, Medellín'
    },

    caso: {
      servicio: 'Pagos y Transferencias',
      categoria: 'Pago PSE',
      subcategoria: 'Pago PSE no acreditado en destino',
      responsable: 'Rodrigo Esteban Muñoz',
      areaResponsable: 'Operaciones Financieras',
      tipoCausa: 'Falla en pasarela de pago PSE',
      descripcion: 'Pago PSE por $2.350.000 al banco Davivienda no fue acreditado. Código: PSE-20260503-8847.'
    },

    comentarios: [
      {
        id: 'com-01',
        autor: 'Rodrigo Esteban Muñoz',
        rol: 'Operador',
        fecha: '04/05/2026 19:15',
        texto: 'Se verificó con ACH Colombia el estado de la transacción. Se confirma que el pago fue procesado pero quedó en estado pendiente en el banco receptor.',
        esRespuesta: false
      },
      {
        id: 'com-02',
        autor: 'Rodrigo Esteban Muñoz',
        rol: 'Operador',
        fecha: '05/05/2026 08:30',
        texto: 'Se solicita al asociado comprobante de la transacción y extracto bancario para verificar el débito.',
        esRespuesta: true
      },
      {
        id: 'com-03',
        autor: 'Patricia Inés Agudelo',
        rol: 'Supervisor',
        fecha: '05/05/2026 14:00',
        texto: 'Se escala el caso a prioridad Crítica por vencimiento de SLA. Se requiere resolución inmediata.',
        esRespuesta: false
      }
    ],

    adjuntos: [
      { id: 'adj-01', nombre: 'comprobante_pse_20260503.pdf', tamano: '245 KB', tipo: 'PDF', fecha: '04/05/2026' },
      { id: 'adj-02', nombre: 'extracto_bancario_mayo.pdf', tamano: '1.2 MB', tipo: 'PDF', fecha: '05/05/2026' },
      { id: 'adj-03', nombre: 'captura_error_transaccion.png', tamano: '890 KB', tipo: 'Imagen', fecha: '04/05/2026' }
    ],

    historial: [
      { fecha: '04/05/2026 18:00', accion: 'Caso radicado', detalle: 'Caso registrado por el asociado vía App Móvil', tipo: 'blue' },
      { fecha: '04/05/2026 18:01', accion: 'Asignación automática', detalle: 'Asignado a Rodrigo Esteban Muñoz — Operaciones Financieras', tipo: 'purple' },
      { fecha: '04/05/2026 18:01', accion: 'Prioridad asignada', detalle: 'Prioridad: Crítica — SLA: 4h', tipo: 'red' },
      { fecha: '04/05/2026 19:15', accion: 'Observación interna', detalle: 'Verificación con ACH Colombia', tipo: 'blue' },
      { fecha: '04/05/2026 22:00', accion: 'SLA vencido', detalle: 'Fecha límite de respuesta superada', tipo: 'red' },
      { fecha: '05/05/2026 08:30', accion: 'Respuesta al asociado', detalle: 'Se solicita documentación soporte', tipo: 'green' },
      { fecha: '05/05/2026 08:30', accion: 'Cambio de estado', detalle: 'Radicado → Pendiente de Información', tipo: 'amber' },
      { fecha: '05/05/2026 10:00', accion: 'Adjunto añadido', detalle: 'extracto_bancario_mayo.pdf', tipo: 'blue' },
      { fecha: '05/05/2026 14:00', accion: 'Observación supervisor', detalle: 'Escalamiento por vencimiento de SLA', tipo: 'red' },
      { fecha: '06/05/2026 09:00', accion: 'Reasignación', detalle: 'Se mantiene con Rodrigo Esteban Muñoz', tipo: 'purple' },
      { fecha: '06/05/2026 11:30', accion: 'Seguimiento', detalle: 'Pendiente respuesta del banco receptor', tipo: 'blue' }
    ]
  }
};

// Generar más casos dinámicamente para probar paginación (50+ casos en total)
(function generarCasosExtra() {
  const tipos = APP_DATA.tiposCaso.map(t => t.nombre);
  const prioridades = APP_DATA.prioridades.map(p => p.nombre);
  const estados = APP_DATA.estados.map(e => e.nombre);
  const responsables = APP_DATA.responsables.map(r => r.nombre);
  const nombres = ['Luis Gaviria', 'Camila Ruiz', 'Pedro Sánchez', 'María Paz', 'David Jaramillo', 'Ana Herrera', 'Juan Pablo Montoya', 'Diana Rojas', 'Carlos Vargas', 'Luisa Castro', 'Andrés Felipe Gómez', 'Laura Sofía Marín'];
  const semaforos = ['verde', 'amarillo', 'rojo', 'gris'];
  
  // Actualmente hay 15 casos, agregaremos 65 más para tener 80
  for (let i = 16; i <= 80; i++) {
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const semaforo = estado === 'Cerrado' || estado === 'Anulado' ? 'gris' : semaforos[Math.floor(Math.random() * 3)]; // verde, amarillo, rojo
    
    APP_DATA.casos.push({
      id: 'c-' + (i < 10 ? '0' + i : i),
      radicado: 'FPQRS-2026-04' + (700 + i),
      fechaRadicacion: '08/05/2026',
      tipo: tipos[Math.floor(Math.random() * tipos.length)],
      servicio: 'Atención al Asociado',
      categoria: 'Otros',
      subcategoria: 'Caso generado automáticamente',
      asociado: nombres[Math.floor(Math.random() * nombres.length)],
      responsable: responsables[Math.floor(Math.random() * responsables.length)],
      prioridad: prioridades[Math.floor(Math.random() * prioridades.length)],
      estado: estado,
      limiteSLA: '15/05/2026',
      semaforo: semaforo
    });
  }
})();

/*  Helper Functions  */

/* 
 * Obtener badge CSS class según el tipo
 */
function getBadgeTipo(tipo) {
  const map = {
    'Felicitación': 'badge-felicitacion',
    'Petición': 'badge-peticion',
    'Queja': 'badge-queja',
    'Reclamo': 'badge-reclamo',
    'Sugerencia': 'badge-sugerencia'
  };
  return map[tipo] || '';
}

function getBadgePrioridad(prioridad) {
  const map = {
    'Baja': 'badge-baja',
    'Normal': 'badge-normal',
    'Alta': 'badge-alta',
    'Crítica': 'badge-critica'
  };
  return map[prioridad] || '';
}

function getBadgeEstado(estado) {
  const map = {
    'Radicado': 'badge-radicado',
    'En Gestión': 'badge-en-gestion',
    'Pendiente de Información': 'badge-pendiente',
    'Cerrado': 'badge-cerrado',
    'Anulado': 'badge-anulado'
  };
  return map[estado] || '';
}

function getBadgeSemaforo(semaforo) {
  const map = {
    'verde': 'badge-sla-verde',
    'amarillo': 'badge-sla-amarillo',
    'rojo': 'badge-sla-rojo',
    'gris': 'badge-sla-gris'
  };
  return map[semaforo] || '';
}

function getSemaforoTexto(semaforo) {
  const map = {
    'verde': 'En tiempo',
    'amarillo': 'Próximo a vencer',
    'rojo': 'Vencido',
    'gris': 'Cerrado'
  };
  return map[semaforo] || '';
}

/**
 * Generar número de radicado
 */
function generarRadicado() {
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `FPQRS-2026-${num}`;
}

/**
 * Mostrar toast notification
 */
function showToast(mensaje, tipo = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.innerHTML = `
    <i data-lucide="${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'x-circle' : 'info'}" 
       style="width:16px;height:16px;"></i>
    <span>${mensaje}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* Renderizado automatico de iconos con MutationObserver */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide === 'undefined') return;

  function renderIconsAndClean() {
    lucide.createIcons();
    // Remover data-lucide de los SVG generados para evitar loops infinitos si lucide vuelve a escanear
    document.querySelectorAll('svg[data-lucide]').forEach(svg => {
      svg.removeAttribute('data-lucide');
    });
  }

  // Render inicial
  renderIconsAndClean();

  // Observador para nodos dinámicos
  const observer = new MutationObserver((mutations, obs) => {
    let needsRender = false;
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) { // Node.ELEMENT_NODE
          if (node.hasAttribute('data-lucide')) {
            needsRender = true;
            break;
          }
          if (node.querySelectorAll && node.querySelectorAll('[data-lucide]').length > 0) {
            needsRender = true;
            break;
          }
        }
      }
      if (needsRender) break;
    }

    if (needsRender) {
      obs.disconnect(); // Desconectar temporalmente para evitar loop de mutaciones
      renderIconsAndClean();
      obs.observe(document.body, { childList: true, subtree: true });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
