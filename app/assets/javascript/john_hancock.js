//= require signature_pad

document.addEventListener('DOMContentLoaded', function(){
  const allCanvas = document.querySelectorAll(".JohnHancock-canvas");

  allCanvas.forEach((canvas) => {
    let wrapper = canvas.closest('.JohnHancock-wrapper');
    let hidden_field = wrapper.querySelector(".JohnHancock-hidden");

    if (hidden_field) {
      const parent_form = canvas.closest("form");
      const signaturePad = new SignaturePad(canvas);

      parent_form.onsubmit = function() {
        hidden_field.value = signaturePad.toDataURL()
      }

      function resizeCanvas() {
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear();
      }

      function signatureClear() {
        var canvas = document.getElementById("JohnHancock-canvas");
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      window.addEventListener("resize", resizeCanvas, true);
      resizeCanvas();
    }
  });
}, false)
