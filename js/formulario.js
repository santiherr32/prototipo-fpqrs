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
      { id: '#tipo-caso', name: 'Tipo de caso' },
      { id: '#servicio', name: 'Servicio' },
      { id: '#categoria', name: 'Categoría' },
      { id: '#subcategoria', name: 'Subcategoría' }
    ];

    // Remove previous error states
    $('.form-control-custom').removeClass('is-invalid').css('border-color', '');
    $('.field-error, .invalid-feedback-custom').remove();
    $('label[for="celular"]').css('color', '');
    $('#acepta-tratamiento-card').removeClass('checkbox-container-invalid');

    requiredFields.forEach(field => {
      const $el = $(field.id);
      const val = $el.val();
      if (!val || val.trim() === '') {
        isValid = false;
        $el.css('border-color', 'var(--red-600)');
        $el.after(`<p class="field-error" style="color:var(--red-600);font-size:0.75rem;margin-top:4px;">Este campo es obligatorio</p>`);
      }
    });

    // Celular validation
    const celular = $('#celular').val();
    if (!celular || !/^3\d{9}$/.test(celular)) {
      isValid = false;
      $('#celular').addClass('is-invalid');
      $('label[for="celular"]').css('color', 'var(--red-600)');
      $('#celular').after('<div class="invalid-feedback-custom">Ingrese un número celular colombiano válido (10 dígitos)</div>');
    }

    // Descripción validation
    const descripcion = $('#descripcion').val();
    if (!descripcion || descripcion.trim().length < 20) {
      isValid = false;
      $('#descripcion').css('border-color', 'var(--red-600)');
      $('#descripcion').after('<p class="field-error" style="color:var(--red-600);font-size:0.75rem;margin-top:4px;">La descripción debe tener al menos 20 caracteres</p>');
    }

    // Email format
    const correo = $('#correo').val();
    if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      isValid = false;
      $('#correo').css('border-color', 'var(--red-600)');
      $('#correo').next('.field-error').remove();
      $('#correo').after(`<p class="field-error" style="color:var(--red-600);font-size:0.75rem;margin-top:4px;">Ingrese un correo válido</p>`);
    }

    // Data treatment consent
    if (!$('#acepta-tratamiento').is(':checked')) {
      isValid = false;
      $('#acepta-tratamiento-card').addClass('checkbox-container-invalid');
      $('#acepta-tratamiento-container').append('<div class="invalid-feedback-custom mt-0">Debe aceptar el tratamiento de datos personales para continuar</div>');
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

      // Update and show inline success view
      $('#success-radicado').text(radicado);
      
      const now = new Date();
      const formatNum = (n) => n.toString().padStart(2, '0');
      const dateStr = `${formatNum(now.getDate())}/${formatNum(now.getMonth() + 1)}/${now.getFullYear()} ${formatNum(now.getHours())}:${formatNum(now.getMinutes())}`;
      $('#success-fecha').text(dateStr);
      
      now.setHours(now.getHours() + 72); // SLA 72h
      const slaStr = `${formatNum(now.getDate())}/${formatNum(now.getMonth() + 1)}/${now.getFullYear()} ${formatNum(now.getHours())}:${formatNum(now.getMinutes())}`;
      $('#success-sla').text(slaStr);

      $('#form-container').hide();
      $('#success-view').fadeIn();
      
      if (window.lucide) {
        window.lucide.createIcons();
      }

      $btn.prop('disabled', false).html(btnText);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  });

  // Success view actions
  $('#btn-ir-bandeja-inline').on('click', function () {
    window.location.href = 'bandeja.html';
  });

  $('#btn-nuevo-caso-inline').on('click', function () {
    $('#success-view').hide();
    $('#form-container').fadeIn();
    
    // Reset form
    $('#fpqrs-form')[0].reset();
    $('#categoria').html('<option value="">Seleccionar categoría...</option>').prop('disabled', true);
    $('#subcategoria').html('<option value="">Seleccionar subcategoría...</option>').prop('disabled', true);
    uploadedFiles = [];
    renderFileList();
    $('.form-control-custom').css('border-color', '');
    $('.field-error').remove();
    $('.is-invalid').removeClass('is-invalid');
    $('.invalid-feedback-custom').remove();
    $('.checkbox-container-invalid').removeClass('checkbox-container-invalid');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  $('#btn-copiar').on('click', function() {
    const text = $('#success-radicado').text();
    navigator.clipboard.writeText(text).then(() => {
      showToast('Número copiado al portapapeles', 'info');
    });
  });

  // Clear validation on input
  $(document).on('input change', '.form-control-custom', function () {
    $(this).css('border-color', '');
    $(this).next('.field-error').remove();
  });
});
