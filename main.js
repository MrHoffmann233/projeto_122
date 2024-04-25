// Capturar elementos HTML
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const selectFrame = document.getElementById('selectFrame');
const photoContainer = document.getElementById('photoContainer');
const captureButton = document.getElementById('captureButton');

// Obter acesso à webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.error('Erro ao acessar a webcam: ', err);
    });

// Função para capturar a foto
captureButton.addEventListener('click', function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frame = new Image();
    frame.src = selectFrame.value + '.png'; // Supondo que as molduras estejam em arquivos PNG
    frame.onload = function() {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        const finalImg = new Image();
        finalImg.src = canvas.toDataURL();
        photoContainer.innerHTML = '';
        photoContainer.appendChild(finalImg);
    };
});
