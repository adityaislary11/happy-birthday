/* Birthday page interactions. Selected photos are previewed locally only. */
(function () {
  'use strict';

  document.querySelectorAll('.memory-image').forEach(function (image) {
    function showFallback() {
      image.hidden = true;
      var placeholderId = image.dataset.placeholder;
      var placeholder = document.getElementById(placeholderId);
      if (placeholder) placeholder.hidden = false;
    }

    function showImage() {
      image.hidden = false;
      var placeholderId = image.dataset.placeholder;
      var placeholder = document.getElementById(placeholderId);
      if (placeholder) placeholder.hidden = true;
    }

    image.addEventListener('error', showFallback);
    image.addEventListener('load', showImage);
    if (image.complete && image.naturalWidth === 0) showFallback();
  });

  document.querySelectorAll('.photo-placeholder input[type="file"]').forEach(function (input) {
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file || !file.type.startsWith('image/')) return;

      var preview = document.getElementById(input.dataset.target);
      var placeholder = input.closest('.photo-placeholder');
      if (!preview || !placeholder) return;

      var reader = new FileReader();
      reader.onload = function (event) {
        preview.src = event.target.result;
        preview.hidden = false;
        placeholder.hidden = true;
      };
      reader.readAsDataURL(file);
    });
  });
})();
