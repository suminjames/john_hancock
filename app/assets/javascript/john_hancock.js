//= require signature_pad

document.addEventListener('DOMContentLoaded', function(){
  const allCanvas = document.querySelectorAll(".JohnHancock-canvas");

  allCanvas.forEach((canvas) => {
    let wrapper = canvas.closest('.JohnHancock-wrapper');
    let hidden_field = wrapper.querySelector(".JohnHancock-hidden");
    let clear_canvas = wrapper.querySelector(".clear-canvas");

    if (hidden_field) {
      const parent_form = canvas.closest("form");
      const signaturePad = new SignaturePad(canvas);

      parent_form.addEventListener('submit', function() {
        hidden_field.value = signaturePad.toDataURL()
      });

      function resizeCanvas() {
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear();
      }

      window.addEventListener("resize", resizeCanvas, true);
      resizeCanvas();
    }

    clear_canvas?.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var canvas = wrapper.querySelector(".JohnHancock-canvas");
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  });
}, false)
