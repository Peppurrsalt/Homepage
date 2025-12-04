document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');

    // Show shovel after text pulses 3 times (9s)
    setTimeout(() => {
        startButton.classList.add('show');
    }, 9000); // 3s per pulse * 3 pulses = 9s

    startButton.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'black';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '99999';
        overlay.style.flexDirection = 'column';

        const video = document.createElement('video');
        video.src = 'Trailer.mp4';
        video.autoplay = true;
        video.controls = false;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        video.style.marginBottom = '20px';

        const skipButton = document.createElement('button');
        skipButton.textContent = 'Skip';
        skipButton.style.padding = '3px 8px';
        skipButton.style.fontSize = '0.75rem';
        skipButton.style.cursor = 'pointer';
        skipButton.style.border = 'none';
        skipButton.style.borderRadius = '8px';
        skipButton.style.background = 'white';
        skipButton.style.color = 'black';
        skipButton.style.position = 'absolute';
        skipButton.style.top = '20px';
        skipButton.style.right = '20px';

        overlay.appendChild(video);
        overlay.appendChild(skipButton);
        document.body.appendChild(overlay);

        video.play();

        video.addEventListener('ended', () => {
            window.location.href = '2index.html';
        });

        skipButton.addEventListener('click', () => {
            window.location.href = '2index.html';
        });
    });
});