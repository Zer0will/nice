// This portfolio edition demonstrates forms; it must never submit personal data.
document.addEventListener('submit', function (event) { event.preventDefault(); }, true);
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('input, select, textarea').forEach(function (field, index) {
    if (['submit', 'button', 'hidden', 'radio', 'checkbox'].includes(field.type)) return;
    if (field.getAttribute('aria-label') || field.closest('label')) return;
    var label = field.id && document.querySelector('label[for="' + CSS.escape(field.id) + '"]');
    if (label && label.textContent.trim()) return;
    var text = field.placeholder || field.name || (field.type === 'file' ? 'Sample resume file' : 'Form field');
    if (!field.id) field.id = 'demo-field-' + index;
    if (!label) { label = document.createElement('label'); label.htmlFor = field.id; field.before(label); }
    label.classList.add('review-field-label');
    label.textContent = text;
  });
});
