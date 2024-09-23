//= require signature_pad

document.addEventListener('turbolinks:load', function () {
  console.log('JS triggered')
  const allCanvas = document.querySelectorAll(".JohnHancock-canvas");

  allCanvas.forEach((canvas) => {
    let wrapper = canvas.closest('.JohnHancock-wrapper');
    let hidden_field = wrapper.querySelector(".JohnHancock-hidden");
    let clear_canvas = wrapper.querySelector(".clear-canvas");

    if (hidden_field) {
      const signaturePad = new SignaturePad(canvas);
      const base64Prefix = "data:image/png;base64,";
      const savedSignature = hidden_field.value.startsWith(base64Prefix)
          ? hidden_field.value
          : base64Prefix + hidden_field.value;

      const context = canvas.getContext("2d");

      // Load existing signature if present
      if (savedSignature) {
        const image = new Image();
        image.src = savedSignature;

        image.onload = function () {
          requestAnimationFrame(function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            console.log('Image rendered');
          });
        };

        image.onerror = function () {
          console.error("Failed to load the image.");
        };
      }

      // Save signature on form submit
      const parent_form = canvas.closest("form");
      parent_form.addEventListener('submit', function () {
        hidden_field.value = signaturePad.toDataURL();
      });

      function resizeCanvas(canvas, signaturePad) {
        const savedContent = signaturePad.toDataURL(); // Save current canvas content

        canvas.width = Math.min(500, $(window).width()); // Adjust this logic as needed
        canvas.height = Math.min(300, $(window).height());

        // Restore the canvas content
        restoreCanvasContent(canvas, savedContent);
      }

      function restoreCanvasContent(canvas, savedContent) {
        var image = new Image();
        image.src = savedContent;

        image.onload = function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, canvas.width, canvas.height); // Draw content scaled
          console.log(image)
          console.log(`after resize:${savedContent}`)
        };
      }

      window.addEventListener("resize", function () {
        resizeCanvas(canvas, signaturePad); // Adjust this to match your current setup
      });

      clear_canvas?.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      });
    }
  });
});
