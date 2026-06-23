/**
 * GestorFPQRS — Formulario de Radicación FPQRS
 * Selects en cascada, validación, upload de archivos, envío simulado
 */

$(document).ready(function () {
  if ($('#fpqrs-form').length === 0) return;

  const servicios = APP_DATA.servicios;
  let uploadedFiles = [];

  /* ========== Selects en Cascada ========== */

  // Servicio → Categoría
  $('#servicio').on('change', function () {
    const servicioId = $(this).val();
    const $categoria = $('#categoria');
    const $subcategoria = $('#subcategoria');

    $categoria.html('<option value="">Seleccionar categoría...</option>');
    $subcategoria.html('<option value="">Seleccionar subcategoría...</option>').prop('disabled', true);

    if (!servicioId) {
      $categoria.prop('disabled', true);
      return;
    }

    const servicio = servicios.find(s => s.id === servicioId);
    if (servicio) {
      servicio.categorias.forEach(cat => {
        $categoria.append(`<option value="${cat.id}">${cat.nombre}</option>`);
      });
      $categoria.prop('disabled', false);
    }
  });

  // Categoría → Subcategoría
  $('#categoria').on('change', function () {
    const categoriaId = $(this).val();
    const servicioId = $('#servicio').val();
    const $subcategoria = $('#subcategoria');

    $subcategoria.html('<option value="">Seleccionar subcategoría...</option>');

    if (!categoriaId) {
      $subcategoria.prop('disabled', true);
      return;
    }

    const servicio = servicios.find(s => s.id === servicioId);
    if (servicio) {
      const categoria = servicio.categorias.find(c => c.id === categoriaId);
      if (categoria) {
        categoria.subcategorias.forEach(sub => {
          $subcategoria.append(`<option value="${sub}">${sub}</option>`);
        });
        $subcategoria.prop('disabled', false);
      }
    }
  });

  /* ========== File Upload ========== */
  const $fileZone = $('#file-upload-zone');
  const $fileInput = $('#file-input');
  const $fileList = $('#file-list');
  const MAX_FILES = 5;
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  // Drag & drop (native click is handled by the HTML label)

  // Drag & drop
  $fileZone.on('dragover', function (e) {
    e.preventDefault();
    $(this).addClass('dragover');
  });

  $fileZone.on('dragleave drop', function (e) {
    e.preventDefault();
    $(this).removeClass('dragover');
  });

  $fileZone.on('drop', function (e) {
    e.preventDefault();
    const files = e.originalEvent.dataTransfer.files;
    handleFiles(files);
  });

  $fileInput.on('change', function () {
    handleFiles(this.files);
    $(this).val(''); // Reset input
  });

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (uploadedFiles.length >= MAX_FILES) {
        showToast(`Máximo ${MAX_FILES} archivos permitidos`, 'error');
        return;
      }

      if (file.size > MAX_SIZE) {
        showToast(`"${file.name}" excede el límite de 5 MB`, 'error');
        return;
      }

      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'jpg', 'jpeg', 'png', 'docx'].includes(ext)) {
        showToast(`Formato no permitido: .${ext}`, 'error');
        return;
      }

      // Check duplicates
      if (uploadedFiles.find(f => f.name === file.name)) {
        showToast(`"${file.name}" ya fue agregado`, 'error');
        return;
      }

      uploadedFiles.push({
        name: file.name,
        size: formatFileSize(file.size),
        type: ext.toUpperCase()
      });
    });

    renderFileList();
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function renderFileList() {
    $fileList.empty();

    uploadedFiles.forEach((file, idx) => {
      const icon = ['PDF', 'DOCX'].includes(file.type) ? 'file-text' : 'image';
      $fileList.append(`
        <div class="file-item fade-in">
          <i data-lucide="${icon}" style="width:16px;height:16px;color:var(--primary);flex-shrink:0;"></i>
          <div class="flex-grow-1">
            <p class="fw-medium mb-0" style="font-size:0.8125rem;">${file.name}</p>
            <p class="text-muted mb-0" style="font-size:0.6875rem;">${file.size} · ${file.type}</p>
          </div>
          <button type="button" class="file-item-remove" data-idx="${idx}" title="Eliminar archivo">
            <i data-lucide="x" style="width:14px;height:14px;"></i>
          </button>
        </div>
      `);
    });

  }

  // Remove file
  $(document).on('click', '.file-item-remove', function () {
    const idx = parseInt($(this).data('idx'));
    uploadedFiles.splice(idx, 1);
    renderFileList();
  });

  /* ========== Form Validation ========== */
  function validateForm() {
    let isValid = true;
    const requiredFields = [
      { id: '#tipo-id', name: 'Tipo de identificación' },
      { id: '#identificacion', name: 'Número de identificación' },
      { id: '#nombre-completo', name: 'Nombre completo' },
      { id: '#correo', name: 'Correo electrónico' },
      { id: '#celular', name: 'Número de celular' },
      { id: '#tipo-caso', name: 'Tipo de caso' },
      { id: '#servicio', name: 'Servicio' },
      { id: '#categoria', name: 'Categoría' },
      { id: '#subcategoria', name: 'Subcategoría' },
      { id: '#descripcion', name: 'Descripción' }
    ];

    // Remove previous error states
    $('.form-control-custom').css('border-color', '');
    $('.field-error').remove();

    requiredFields.forEach(field => {
      const $el = $(field.id);
      const val = $el.val();
      if (!val || val.trim() === '') {
        isValid = false;
        $el.css('border-color', 'var(--red-500)');
        $el.after(`<p class="field-error" style="color:var(--red-500);font-size:0.75rem;margin-top:4px;">Este campo es obligatorio</p>`);
      }
    });

    // Email format
    const correo = $('#correo').val();
    if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      isValid = false;
      $('#correo').css('border-color', 'var(--red-500)');
      $('#correo').next('.field-error').remove();
      $('#correo').after(`<p class="field-error" style="color:var(--red-500);font-size:0.75rem;margin-top:4px;">Ingrese un correo válido</p>`);
    }

    // Data treatment consent
    if (!$('#acepta-tratamiento').is(':checked')) {
      isValid = false;
      showToast('Debe aceptar la política de tratamiento de datos', 'error');
    }

    return isValid;
  }

  /* ========== Form Submission ========== */
  $('#fpqrs-form').on('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Por favor complete todos los campos obligatorios', 'error');
      // Scroll to first error
      const firstError = $('.field-error').first();
      if (firstError.length) {
        $('html, body').animate({
          scrollTop: firstError.offset().top - 100
        }, 400);
      }
      return;
    }

    // Simulate submission
    const $btn = $(this).find('button[type="submit"]');
    const btnText = $btn.html();
    $btn.prop('disabled', true).html(
      '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Procesando...'
    );

    setTimeout(() => {
      const radicado = generarRadicado();

      // Show success modal
      document.getElementById('modal-radicado').textContent = radicado;
      document.getElementById('modal-exito').classList.add('show');

      $btn.prop('disabled', false).html(btnText);
    }, 1500);
  });

  // Modal actions
  $('#btn-ir-bandeja').on('click', function () {
    window.location.href = 'bandeja.html';
  });

  $('#btn-nuevo-caso').on('click', function () {
    document.getElementById('modal-exito').classList.remove('show');
    // Reset form
    $('#fpqrs-form')[0].reset();
    $('#categoria').html('<option value="">Seleccionar categoría...</option>').prop('disabled', true);
    $('#subcategoria').html('<option value="">Seleccionar subcategoría...</option>').prop('disabled', true);
    uploadedFiles = [];
    renderFileList();
    $('.form-control-custom').css('border-color', '');
    $('.field-error').remove();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Clear validation on input
  $(document).on('input change', '.form-control-custom', function () {
    $(this).css('border-color', '');
    $(this).next('.field-error').remove();
  });
});
