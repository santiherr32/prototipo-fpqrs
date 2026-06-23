/**
 * GestorFPQRS — Bandeja de Casos
 * Lógica de tabla, búsqueda, filtrado, ordenamiento y paginación
 */

$(document).ready(function () {
  if ($('#cases-table-body').length === 0) return;

  // Verificar autenticación
  if (!Auth.requireAuth()) return;
  Auth.renderUserInfo();

  let PAGE_SIZE = 10;
  let currentPage = 1;
  let sortColumn = 'fechaRadicacion';
  let sortDir = 'desc';
  let searchTerm = '';
  let filterEstado = '';
  let filterTipo = '';
  let filterPrioridad = '';

  /* ========== Render Stats ========== */
  function renderStats() {
    const casos = APP_DATA.casos;
    const activos = casos.filter(c => c.estado !== 'Cerrado' && c.estado !== 'Anulado').length;
    const vencidos = casos.filter(c => c.semaforo === 'rojo').length;
    const proximosVencer = casos.filter(c => c.semaforo === 'amarillo').length;
    const cerradosHoy = casos.filter(c => c.estado === 'Cerrado' && c.fechaRadicacion === '07/05/2026').length;

    document.getElementById('stat-activos').textContent = activos;
    document.getElementById('stat-vencidos').textContent = vencidos;
    document.getElementById('stat-proximos').textContent = proximosVencer;
    document.getElementById('stat-cerrados').textContent = cerradosHoy;
  }

  /* ========== Filter & Sort ========== */
  function getFilteredCases() {
    let casos = [...APP_DATA.casos];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      casos = casos.filter(c =>
        c.radicado.toLowerCase().includes(term) ||
        c.asociado.toLowerCase().includes(term)
      );
    }

    // Filters
    if (filterEstado) {
      casos = casos.filter(c => c.estado === filterEstado);
    }
    if (filterTipo) {
      casos = casos.filter(c => c.tipo === filterTipo);
    }
    if (filterPrioridad) {
      casos = casos.filter(c => c.prioridad === filterPrioridad);
    }

    // Sort
    casos.sort((a, b) => {
      let valA = a[sortColumn] || '';
      let valB = b[sortColumn] || '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return casos;
  }

  /* ========== Render Table ========== */
  function renderTable() {
    const filtered = getFilteredCases();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageCases = filtered.slice(start, start + PAGE_SIZE);

    const tbody = $('#cases-table-body');
    tbody.empty();

    if (pageCases.length === 0) {
      tbody.html(`
        <tr>
          <td colspan="13" class="text-center py-5">
            <div class="text-muted">
              <i data-lucide="search-x" style="width:32px;height:32px;opacity:0.4;"></i>
              <p class="mt-2 fw-semibold">No se encontraron casos</p>
              <p style="font-size:0.75rem;">Intente con otros criterios de búsqueda</p>
            </div>
          </td>
        </tr>
      `);
      renderPagination(filtered.length, totalPages);
      return;
    }

    pageCases.forEach((caso, idx) => {
      const isStriped = idx % 2 === 1;
      const semaforoClass = getBadgeSemaforo(caso.semaforo);
      const semaforoText = getSemaforoTexto(caso.semaforo);
      const limiteSLAClass = caso.semaforo === 'amarillo'
        ? 'style="color:var(--amber-600);font-weight:600;"'
        : caso.semaforo === 'rojo'
        ? 'style="color:var(--red-600);font-weight:600;"'
        : '';

      tbody.append(`
        <tr class="${isStriped ? 'striped' : ''}">
          <td><span class="td-radicado">${caso.radicado}</span></td>
          <td><span class="td-date">${caso.fechaRadicacion}</span></td>
          <td><span class="badge-pill ${getBadgeTipo(caso.tipo)}">${caso.tipo}</span></td>
          <td><span style="font-size:0.75rem;white-space:nowrap;">${caso.servicio}</span></td>
          <td><span style="font-size:0.75rem;">${caso.categoria}</span></td>
          <td><span class="td-truncate text-muted" title="${caso.subcategoria}">${caso.subcategoria}</span></td>
          <td><span class="td-name" title="${caso.asociado}">${caso.asociado}</span></td>
          <td><span class="td-truncate text-muted" title="${caso.responsable}">${caso.responsable}</span></td>
          <td><span class="badge-pill ${getBadgePrioridad(caso.prioridad)}">${caso.prioridad}</span></td>
          <td><span class="badge-pill ${getBadgeEstado(caso.estado)}">${caso.estado}</span></td>
          <td><span class="td-date" ${limiteSLAClass}>${caso.limiteSLA}</span></td>
          <td>
            <span class="badge-pill ${semaforoClass}">
              <span class="sla-dot"></span>${semaforoText}
            </span>
          </td>
          <td class="td-action">
            <a href="detalle.html?id=${caso.id}" class="btn-view" title="Ver detalle del caso">
              <i data-lucide="eye" style="width:14px;height:14px;"></i>
            </a>
          </td>
        </tr>
      `);
    });

    renderPagination(filtered.length, totalPages);
  }

  /* ========== Pagination ========== */
  function renderPagination(total, totalPages) {
    const start = Math.min((currentPage - 1) * PAGE_SIZE + 1, total);
    const end = Math.min(currentPage * PAGE_SIZE, total);

    $('#pagination-info').text(`Mostrando ${start}-${end} de ${total} casos`);

    const controls = $('#pagination-controls');
    controls.empty();

    // Prev
    controls.append(`
      <button class="pagination-btn" ${currentPage <= 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
        <i data-lucide="chevron-left" style="width:14px;height:14px;"></i>
      </button>
    `);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages > 7 && i > 3 && i < totalPages - 1 && Math.abs(i - currentPage) > 1) {
        if (i === 4 || i === totalPages - 2) {
          controls.append(`<span class="px-1 text-muted">...</span>`);
        }
        continue;
      }
      controls.append(`
        <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
      `);
    }

    // Next
    controls.append(`
      <button class="pagination-btn" ${currentPage >= totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
        <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      </button>
    `);

  }

  /* ========== Event Handlers ========== */

  // Search
  $('#search-input').on('input', function () {
    searchTerm = $(this).val();
    currentPage = 1;
    renderTable();
  });

  // Sort
  $(document).on('click', '.sortable-th', function () {
    const col = $(this).data('column');
    if (sortColumn === col) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = col;
      sortDir = 'asc';
    }
    $('.sortable-th').removeClass('sorted');
    $(this).addClass('sorted');
    renderTable();
  });

  // Pagination
  $(document).on('click', '.pagination-btn:not(:disabled)', function () {
    currentPage = parseInt($(this).data('page'));
    renderTable();
    // Scroll to top of table
    $('.data-table-wrapper')[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Items per page
  $('#items-per-page').on('change', function () {
    PAGE_SIZE = parseInt($(this).val());
    currentPage = 1;
    renderTable();
  });

  // Filter toggle
  $('#btn-filters').on('click', function () {
    $('#filter-panel').toggleClass('show');
    $(this).toggleClass('active');
  });

  // Filter selects
  $('#filter-estado').on('change', function () {
    filterEstado = $(this).val();
    currentPage = 1;
    renderTable();
  });

  $('#filter-tipo').on('change', function () {
    filterTipo = $(this).val();
    currentPage = 1;
    renderTable();
  });

  $('#filter-prioridad').on('change', function () {
    filterPrioridad = $(this).val();
    currentPage = 1;
    renderTable();
  });

  // Clear filters
  $('#btn-clear-filters').on('click', function () {
    filterEstado = '';
    filterTipo = '';
    filterPrioridad = '';
    $('#filter-estado, #filter-tipo, #filter-prioridad').val('');
    currentPage = 1;
    renderTable();
  });

  // Refresh
  $('#btn-refresh').on('click', function () {
    showToast('Bandeja actualizada correctamente', 'info');
    renderTable();
  });

  // Export simulation
  $('#btn-export').on('click', function () {
    showToast('Exportación en proceso. El archivo se descargará en breve.', 'info');
  });

  // Sidebar toggle
  $('#sidebar-toggle').on('click', function () {
    document.getElementById('app-sidebar').classList.toggle('collapsed');
  });

  // Mobile menu
  $('#mobile-menu-btn').on('click', function () {
    document.getElementById('app-sidebar').classList.add('mobile-open');
    document.getElementById('sidebar-overlay').classList.add('show');
  });

  $('#sidebar-overlay, #sidebar-close-mobile').on('click', function () {
    document.getElementById('app-sidebar').classList.remove('mobile-open');
    document.getElementById('sidebar-overlay').classList.remove('show');
  });

  // Logout
  $('#btn-logout').on('click', function (e) {
    e.preventDefault();
    Auth.logout();
  });

  // Current date
  const now = new Date();
  const dateStr = now.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('current-datetime').textContent = `${dateStr} ${timeStr}`;

  /* ========== Initial Render ========== */
  renderStats();
  renderTable();
});
