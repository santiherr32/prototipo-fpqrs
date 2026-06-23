/**
 * GestorFPQRS — Detalle de Caso
 * Lógica de tabs, cambio de estado/prioridad, observaciones, acciones
 */

$(document).ready(function () {
  if ($('#case-detail-page').length === 0) return;

  // Verificar autenticación
  if (!Auth.requireAuth()) return;
  Auth.renderUserInfo();

  const caso = APP_DATA.casoDetalle;

  /* ========== Tabs ========== */
  $('.tab-btn').on('click', function () {
    const target = $(this).data('tab');
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-pane').removeClass('active');
    $(`#tab-${target}`).addClass('active');
  });

  /* ========== Render Comentarios ========== */
  function renderComentarios() {
    const container = $('#comentarios-list');
    container.empty();

    caso.comentarios.forEach(c => {
      container.append(`
        <div class="mb-3 fade-in">
          <div class="d-flex align-items-center gap-2 mb-1">
            <div class="sidebar-user-avatar" style="width:24px;height:24px;">
              <i data-lucide="user" style="width:12px;height:12px;color:white;"></i>
            </div>
            <span class="fw-semibold" style="font-size:0.8125rem;">${c.autor}</span>
            <span class="badge-pill badge-radicado" style="font-size:9px;">${c.rol}</span>
            ${c.esRespuesta ? '<span class="badge-pill badge-felicitacion" style="font-size:9px;">Respuesta al asociado</span>' : ''}
            <span class="text-muted ms-auto" style="font-size:0.6875rem;">${c.fecha}</span>
          </div>
          <div style="margin-left:32px;background:var(--background);border-radius:0.5rem;padding:0.75rem;">
            <p style="font-size:0.8125rem;color:var(--foreground);margin:0;line-height:1.5;">${c.texto}</p>
          </div>
        </div>
      `);
    });
  }

  /* ========== Render Adjuntos ========== */
  function renderAdjuntos() {
    const container = $('#adjuntos-list');
    container.empty();

    caso.adjuntos.forEach(a => {
      const icon = a.tipo === 'PDF' ? 'file-text' : 'image';
      container.append(`
        <div class="file-item">
          <i data-lucide="${icon}" style="width:16px;height:16px;color:var(--primary);flex-shrink:0;"></i>
          <div class="flex-grow-1">
            <p class="fw-medium mb-0" style="font-size:0.8125rem;">${a.nombre}</p>
            <p class="text-muted mb-0" style="font-size:0.6875rem;">${a.tamano} · ${a.fecha}</p>
          </div>
          <button class="btn-outline-custom" style="padding:4px 8px;font-size:0.6875rem;">
            <i data-lucide="download" style="width:12px;height:12px;"></i>
          </button>
        </div>
      `);
    });
  }

  /* ========== Render Historial ========== */
  function renderHistorial() {
    const container = $('#historial-list');
    container.empty();

    caso.historial.forEach(h => {
      container.append(`
        <div class="timeline-item">
          <div class="timeline-dot dot-${h.tipo}">
            <i data-lucide="circle" style="width:8px;height:8px;"></i>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center justify-content-between gap-2">
              <p class="fw-semibold mb-0" style="font-size:0.8125rem;">${h.accion}</p>
              <span class="text-muted" style="font-size:0.6875rem;white-space:nowrap;">${h.fecha}</span>
            </div>
            <p class="text-muted mb-0" style="font-size:0.75rem;margin-top:2px;">${h.detalle}</p>
          </div>
        </div>
      `);
    });
  }

  /* ========== Estado Dropdown ========== */
  let estadoDropdownOpen = false;
  $('#btn-cambiar-estado').on('click', function () {
    estadoDropdownOpen = !estadoDropdownOpen;
    if (estadoDropdownOpen) {
      $('#estado-dropdown').removeClass('d-none');
    } else {
      $('#estado-dropdown').addClass('d-none');
    }
  });

  $(document).on('click', '.estado-option', function () {
    const nuevoEstado = $(this).data('estado');
    const badgeClass = getBadgeEstado(nuevoEstado);

    // Update display
    $('#display-estado').text(nuevoEstado).attr('class', `badge-pill badge-lg ${badgeClass}`);
    $('#sidebar-estado').text(nuevoEstado).attr('class', `badge-pill badge-lg ${badgeClass}`);
    $('#btn-cambiar-estado span').text(nuevoEstado);
    $('#estado-dropdown').addClass('d-none');
    estadoDropdownOpen = false;

    // Add to historial
    const now = new Date();
    const fecha = now.toLocaleDateString('es-CO', {day:'2-digit',month:'2-digit',year:'numeric'}) + ' ' +
                  now.toLocaleTimeString('es-CO', {hour:'2-digit',minute:'2-digit'});
    caso.historial.push({
      fecha: fecha,
      accion: 'Cambio de estado',
      detalle: `Estado cambiado a: ${nuevoEstado}`,
      tipo: 'amber'
    });

    showToast(`Estado actualizado a "${nuevoEstado}"`, 'success');
    renderHistorial();
    // Update tab badge count
    $('#historial-count').text(caso.historial.length);
  });

  /* ========== Prioridad Dropdown ========== */
  let prioridadDropdownOpen = false;
  $('#btn-cambiar-prioridad').on('click', function () {
    prioridadDropdownOpen = !prioridadDropdownOpen;
    if (prioridadDropdownOpen) {
      $('#prioridad-dropdown').removeClass('d-none');
    } else {
      $('#prioridad-dropdown').addClass('d-none');
    }
  });

  $(document).on('click', '.prioridad-option', function () {
    const nuevaPrioridad = $(this).data('prioridad');
    const badgeClass = getBadgePrioridad(nuevaPrioridad);
    const slaData = APP_DATA.prioridades.find(p => p.nombre === nuevaPrioridad);
    const slaHoras = slaData ? slaData.slaHoras : caso.slaHoras;

    // Update display
    $('#display-prioridad').text(nuevaPrioridad).attr('class', `badge-pill badge-lg ${badgeClass}`);
    $('#sidebar-prioridad').text(nuevaPrioridad).attr('class', `badge-pill badge-lg ${badgeClass}`);
    $('#display-sla').text(`${slaHoras}h`);
    $('#sidebar-sla').text(`${slaHoras}h`);
    $('#btn-cambiar-prioridad span').text(`Prioridad actual: ${nuevaPrioridad}`);
    $('#prioridad-dropdown').addClass('d-none');
    prioridadDropdownOpen = false;

    caso.prioridad = nuevaPrioridad;
    caso.slaHoras = slaHoras;

    const now = new Date();
    const fecha = now.toLocaleDateString('es-CO', {day:'2-digit',month:'2-digit',year:'numeric'}) + ' ' +
                  now.toLocaleTimeString('es-CO', {hour:'2-digit',minute:'2-digit'});
    caso.historial.push({
      fecha: fecha,
      accion: 'Cambio de prioridad',
      detalle: `Prioridad cambiada a: ${nuevaPrioridad} — SLA: ${slaHoras}h`,
      tipo: 'amber'
    });

    showToast(`Prioridad actualizada a "${nuevaPrioridad}"`, 'success');
    renderHistorial();
    $('#historial-count').text(caso.historial.length);
  });

  /* ========== Reasignación Dropdown ========== */
  let reasignarDropdownOpen = false;
  $('#btn-reasignar').on('click', function () {
    reasignarDropdownOpen = !reasignarDropdownOpen;
    if (reasignarDropdownOpen) {
      $('#reasignar-dropdown').removeClass('d-none');
    } else {
      $('#reasignar-dropdown').addClass('d-none');
    }
  });

  $(document).on('click', '.responsable-option', function () {
    const nombre = $(this).data('nombre');
    const area = $(this).data('area');

    $('#display-responsable').text(nombre);
    $('#display-area-responsable').text(area);
    $('#sidebar-responsable').text(nombre);
    $('#btn-reasignar span').text(`Responsable: ${nombre.split(' ').slice(0,2).join(' ')}`);
    $('#reasignar-dropdown').addClass('d-none');
    reasignarDropdownOpen = false;

    const now = new Date();
    const fecha = now.toLocaleDateString('es-CO', {day:'2-digit',month:'2-digit',year:'numeric'}) + ' ' +
                  now.toLocaleTimeString('es-CO', {hour:'2-digit',minute:'2-digit'});
    caso.historial.push({
      fecha: fecha,
      accion: 'Reasignación',
      detalle: `Caso reasignado a: ${nombre} — ${area}`,
      tipo: 'purple'
    });

    showToast(`Caso reasignado a ${nombre}`, 'success');
    renderHistorial();
    $('#historial-count').text(caso.historial.length);
  });

  // Close dropdowns on outside click
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#btn-cambiar-estado, #estado-dropdown').length) {
      $('#estado-dropdown').addClass('d-none');
      estadoDropdownOpen = false;
    }
    if (!$(e.target).closest('#btn-cambiar-prioridad, #prioridad-dropdown').length) {
      $('#prioridad-dropdown').addClass('d-none');
      prioridadDropdownOpen = false;
    }
    if (!$(e.target).closest('#btn-reasignar, #reasignar-dropdown').length) {
      $('#reasignar-dropdown').addClass('d-none');
      reasignarDropdownOpen = false;
    }
  });

  /* ========== Observación ========== */
  $('#form-observacion').on('submit', function (e) {
    e.preventDefault();
    const texto = $('#observacion-text').val().trim();
    if (!texto) return;

    const esRespuesta = $('#es-respuesta').is(':checked');
    const sesion = Auth.getSesion();
    const now = new Date();
    const fecha = now.toLocaleDateString('es-CO', {day:'2-digit',month:'2-digit',year:'numeric'}) + ' ' +
                  now.toLocaleTimeString('es-CO', {hour:'2-digit',minute:'2-digit'});

    caso.comentarios.push({
      id: `com-${Date.now()}`,
      autor: sesion ? sesion.nombre : 'Usuario',
      rol: sesion ? sesion.rol : 'Operador',
      fecha: fecha,
      texto: texto,
      esRespuesta: esRespuesta
    });

    caso.historial.push({
      fecha: fecha,
      accion: esRespuesta ? 'Respuesta al asociado' : 'Observación interna',
      detalle: texto.length > 60 ? texto.substring(0, 60) + '...' : texto,
      tipo: esRespuesta ? 'green' : 'blue'
    });

    renderComentarios();
    renderHistorial();
    $('#comentarios-count').text(caso.comentarios.length);
    $('#historial-count').text(caso.historial.length);
    $('#observacion-text').val('');
    $('#es-respuesta').prop('checked', false);

    showToast(esRespuesta ? 'Respuesta enviada al asociado' : 'Observación registrada', 'success');
  });

  /* ========== Cerrar / Anular Caso ========== */
  $('#btn-cerrar-caso').on('click', function () {
    $('#modal-cerrar').addClass('show');
  });

  $('#modal-cerrar-cancel, #modal-cerrar-close').on('click', function () {
    $('#modal-cerrar').removeClass('show');
  });

  $('#modal-cerrar-confirm').on('click', function () {
    $('#display-estado').text('Cerrado').attr('class', 'badge-pill badge-lg badge-cerrado');
    $('#sidebar-estado').text('Cerrado').attr('class', 'badge-pill badge-lg badge-cerrado');
    // Hide SLA alert
    $('#sla-alert').slideUp();

    const now = new Date();
    const fecha = now.toLocaleDateString('es-CO', {day:'2-digit',month:'2-digit',year:'numeric'}) + ' ' +
                  now.toLocaleTimeString('es-CO', {hour:'2-digit',minute:'2-digit'});
    caso.historial.push({
      fecha: fecha,
      accion: 'Caso cerrado',
      detalle: 'El caso ha sido cerrado definitivamente',
      tipo: 'green'
    });

    renderHistorial();
    $('#historial-count').text(caso.historial.length);
    $('#modal-cerrar').removeClass('show');
    showToast('Caso cerrado exitosamente', 'success');
  });

  $('#btn-anular-caso').on('click', function () {
    $('#modal-anular').addClass('show');
  });

  $('#modal-anular-cancel, #modal-anular-close').on('click', function () {
    $('#modal-anular').removeClass('show');
  });

  $('#modal-anular-confirm').on('click', function () {
    $('#display-estado').text('Anulado').attr('class', 'badge-pill badge-lg badge-anulado');
    $('#sidebar-estado').text('Anulado').attr('class', 'badge-pill badge-lg badge-anulado');
    $('#sla-alert').slideUp();

    const now = new Date();
    const fecha = now.toLocaleDateString('es-CO', {day:'2-digit',month:'2-digit',year:'numeric'}) + ' ' +
                  now.toLocaleTimeString('es-CO', {hour:'2-digit',minute:'2-digit'});
    caso.historial.push({
      fecha: fecha,
      accion: 'Caso anulado',
      detalle: 'El caso ha sido anulado',
      tipo: 'red'
    });

    renderHistorial();
    $('#historial-count').text(caso.historial.length);
    $('#modal-anular').removeClass('show');
    showToast('Caso anulado', 'error');
  });

  /* ========== Sidebar & Navigation ========== */
  $('#sidebar-toggle').on('click', function () {
    document.getElementById('app-sidebar').classList.toggle('collapsed');
  });

  $('#mobile-menu-btn').on('click', function () {
    document.getElementById('app-sidebar').classList.add('mobile-open');
    document.getElementById('sidebar-overlay').classList.add('show');
  });

  $('#sidebar-overlay').on('click', function () {
    document.getElementById('app-sidebar').classList.remove('mobile-open');
    document.getElementById('sidebar-overlay').classList.remove('show');
  });

  $('#btn-logout').on('click', function (e) {
    e.preventDefault();
    Auth.logout();
  });

  /* ========== Initial Render ========== */
  renderComentarios();
  renderAdjuntos();
  renderHistorial();
});
