const images = document.querySelectorAll('.tab img');
const box = document.getElementById('imageBox');
const undoBtn = document.getElementById('undoBtn');
const restartBtn = document.getElementById('restartBtn');
const bgChangeBtn = document.getElementById('bgChangeBtn');

const droppedImages = [];
const backgrounds = ['background.png', 'background2.png', 'background3.png'];
let bgIndex = 0;

// Initial background
box.style.backgroundImage = `url('${backgrounds[bgIndex]}')`;
box.style.backgroundSize = "cover";
box.style.backgroundPosition = "center";
box.style.backgroundRepeat = "no-repeat";

// Drag from tabs
images.forEach(img => {
    img.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', img.src);
    });
});

// Drag over box
box.addEventListener('dragover', e => {
    e.preventDefault();
    box.classList.add('drag-over');
});
box.addEventListener('dragleave', () => box.classList.remove('drag-over'));

// Drop image
box.addEventListener('drop', e => {
    e.preventDefault();
    box.classList.remove('drag-over');

    const src = e.dataTransfer.getData('text/plain');
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const img = document.createElement('img');
    img.src = src;
    img.style.position = 'absolute';
    img.style.left = `${x - 50}px`;
    img.style.top = `${y - 50}px`;
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.cursor = 'grab';

    droppedImages.push(img);
    box.appendChild(img);
});

// Drag images inside box
box.addEventListener('mousedown', e => {
    if (e.target.tagName === 'IMG') {
        const img = e.target;
        let offsetX = e.clientX - img.getBoundingClientRect().left;
        let offsetY = e.clientY - img.getBoundingClientRect().top;

        function move(eMove) {
            img.style.left = `${eMove.clientX - box.getBoundingClientRect().left - offsetX}px`;
            img.style.top = `${eMove.clientY - box.getBoundingClientRect().top - offsetY}px`;
        }

        function up() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        }

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    }
});

// Undo
undoBtn.addEventListener('click', () => {
    if (droppedImages.length > 0) {
        const lastImg = droppedImages.pop();
        if (box.contains(lastImg)) box.removeChild(lastImg);
    }
});

// Restart
restartBtn.addEventListener('click', () => location.reload());

// Change background
bgChangeBtn.addEventListener('click', () => {
    bgIndex = (bgIndex + 1) % backgrounds.length;
    box.style.backgroundImage = `url('${backgrounds[bgIndex]}')`;
});

// ---------------------------
// Audio control with image
// ---------------------------
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let audioStarted = false;

musicBtn.addEventListener('click', () => {
    if (!audioStarted) {
        bgMusic.play();
        audioStarted = true;
        return;
    }

    if (bgMusic.paused) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
});