const canvas = document.getElementById('gameCanvas');
// Start the game after the user clicks
canvas.addEventListener('click', startGame, { once: true });

// Prevent default behaviors on the canvas
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
canvas.addEventListener('mousedown', (e) => e.preventDefault());
canvas.addEventListener('selectstart', (e) => e.preventDefault());
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player's Ship Properties
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    color: 'white',
};

let star = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 3,
    color: 'white',
    speed: 0.2,
    angle: Math.random() * Math.PI * 2,
    shine: 0
};

const starCount = 50; // Adjust this number to change the amount of stars
let stars = [];

for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1, // Random size between 1 and 3
        speed: Math.random() * 0.5 + 0.5, // Random speed between 0.5 and 1
    });
}

// Bullet Properties
let bullets = [];
const maxBullets = 10;
const initialBulletSize = 20;
const bulletGrowthAmount = 0.08;
const overlapFactor = 0.9;
let bulletPopTimes = [
    51.99999999999977,
    340.0000000000002,
    620,
    980.0000000000005,
    1161.3333333333335,
    1292,
    1601.3333333333335,
    1761.333333333333,
    2100,
    2260,
    2412,
    2580.0000000000005,
    2761.3333333333335,
    2899.999999999999,
    3001.333333333334,
    3139.999999999999,
    3270.666666666666,
    3670.666666666666,
    3841.333333333334,
    3990.666666666667,
    4132,
    4220,
    4892,
    5059.999999999999,
    5201.333333333333,
    5510.666666666666,
    5670.666666666666,
    5852.000000000001,
    6001.333333333334,
    6140.000000000001,
    6492,
    6780,
    6950.666666666668,
    7110.666666666668,
    7252.000000000002,
    7372,
    8940,
    9100,
    9270.666666666668,
    9430.666666666668,
    9612,
    9761.333333333334,
    9940,
    10060.000000000002,
    10380,
    10681.333333333334,
    10990.666666666666,
    11161.333333333334,
    11321.333333333334,
    11630.666666666668,
    11780,
    12132,
    12310.666666666666,
    12470.666666666668,
    12601.333333333334,
    12812,
    12980.000000000002,
    13172.000000000002,
    13332,
    13452,
    13590.666666666668,
    13750.666666666668,
    13900,
    14041.333333333334,
    14161.333333333332,
    14270.666666666668,
    14451.999999999998,
    14601.333333333334,
    14750.666666666668,
    14910.666666666668,
    15060,
    15201.333333333336,
    15561.333333333336,
    15721.333333333336,
    15870.666666666664,
    16180,
    16300,
    16620,
    16940.000000000004,
    17132.000000000004,
    17292.000000000004,
    17412,
    17500,
    17580,
    17652,
    17710.666666666664,
    17780.000000000004,
    17841.333333333336,
    17921.333333333332,
    17990.666666666668,
    18070.666666666668,
    18140,
    18230.666666666668,
    18300,
    18380,
    18460,
    18540,
    18620,
    18692,
    18772,
    18852,
    18921.333333333332,
    19001.333333333332,
    19070.666666666668,
    19140,
    19220,
    19401.333333333336,
    19550.666666666668,
    19710.666666666664,
    20100.000000000004,
    20412,
    20732,
    21060,
    21212,
    21372,
    21670.666666666668,
    21820,
    22121.333333333332,
    22252,
    22441.333333333332,
    22572,
    22721.333333333336,
    22921.333333333332,
    23060,
    23220,
    23372,
    23721.333333333336,
    23870.666666666664,
    24020,
    24132.000000000004,
    24281.333333333332,
    24972.000000000004,
    25132.000000000004,
    25252,
    25620,
    25750.666666666668,
    25892,
    26012,
    26172,
    26510.666666666668,
    26841.333333333336,
    26990.666666666668,
    27132.000000000004,
    27270.666666666668,
    27412,
    29020,
    29161.333333333332,
    29321.333333333332,
    29460,
    29652,
    29790.666666666664,
    29932,
    30052.000000000004,
    30412.000000000004,
    30750.666666666664,
    31052.000000000004,
    31230.666666666668,
    31340,
    31692,
    31860.000000000007,
    32172,
    32310.666666666664,
    32460,
    32612,
    32790.666666666664,
    32932,
    33100,
    33230.66666666667,
    33380,
    33510.66666666667,
    33710.666666666664,
    33852,
    34012,
    34150.66666666667,
    34332,
    34460,
    34670.666666666664,
    34820,
    35001.33333333333,
    35132,
    35270.666666666664,
    35620,
    35750.666666666664,
    35900,
    36201.333333333336,
    36332,
    36681.33333333333,
    36990.666666666664,
    37132,
    37300,
    37441.333333333336,
    37590.66666666667,
    37670.666666666664,
    37732,
    37820,
    37860.00000000001,
    37950.666666666664,
    37980,
    38060,
    38092,
    38190.66666666667,
    38212,
    38310.666666666664,
    38332,
    38430.666666666664,
    38452,
    38572,
    38580,
    38700,
    38700,
    38801.333333333336,
    38830.66666666667,
    38950.666666666664,
    38972,
    39060,
    39100,
    39172,
    39241.333333333336,
    39310.666666666664,
    39441.333333333336,
    39630.666666666664,
    39790.666666666664
];

let bulletPopTimeOffset = -30;
let nextBulletIndex = 0;

// Audio Setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = new Audio('bombrush.wav');
audioElement.loop = true;
const track = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
track.connect(gainNode).connect(audioContext.destination);

const bgmLoopDuration = 40.01 * 1000; // 40.01 seconds in milliseconds
const bpm = 101.15;
const beatsPerLoop = (bpm * bgmLoopDuration) / (60 * 1000);

let loopStartTime = 0;
let lastSyncTime = 0;
const syncInterval = 5000; // Sync every 5 seconds


// Recording mode variables
let isRecording = false;
let recordedTimes = [];
let recordingStartTime = 0;

let gameStarted = false;
let gameStartTime = 0;
let currentTime = '00:00';
const introductionDuration = 5000; // 5 seconds in milliseconds
// Start the BGM
function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    
    audioContext.resume().then(() => {
        audioElement.play();
        loopStartTime = audioContext.currentTime;
        lastSyncTime = loopStartTime;
        gameStartTime = Date.now();
        requestAnimationFrame(gameLoop);
    });

    // Remove click event listener
    canvas.removeEventListener('click', startGame);
}

function updateCurrentTime() {
    const elapsedTime = Date.now() - gameStartTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    currentTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Mouse Movement
function handleMouseMove(event) {
    player.x = event.clientX;
    player.y = event.clientY;
}

canvas.addEventListener('mousemove', handleMouseMove);


// Create a new bullet
function spawnBullet() {
    let lastBullet = bullets[bullets.length - 1];
    let spawnX, spawnY, newSize;

    if (lastBullet) {
        const dx = player.x - lastBullet.x;
        const dy = player.y - lastBullet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        newSize = lastBullet.size + bulletGrowthAmount;
        const spawnDistance = newSize * overlapFactor;
        spawnX = lastBullet.x + (dx / distance) * spawnDistance;
        spawnY = lastBullet.y + (dy / distance) * spawnDistance;
    } else {
        spawnX = canvas.width;
        spawnY = 0;
        newSize = initialBulletSize;
    }

    bullets.push({
        x: spawnX,
        y: spawnY,
        size: newSize,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        popAnimation: 1.5, // Start with a larger size
    });

    if (bullets.length > maxBullets) {
        bullets.shift();
    }

    // Screen shake effect
    shakeScreen();
}

let screenShake = { x: 0, y: 0 };

function shakeScreen() {
    const intensity = 5;
    screenShake = {
        x: (Math.random() - 0.5) * intensity,
        y: (Math.random() - 0.5) * intensity
    };
    setTimeout(() => { screenShake = { x: 0, y: 0 }; }, 100);
}

// Draw player and bullets
function draw() {
    ctx.save();
    ctx.translate(screenShake.x, screenShake.y);
    ctx.clearRect(-screenShake.x, -screenShake.y, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });


    // Draw bullets
    bullets.forEach((bullet, index) => {
        ctx.fillStyle = bullet.color;
        ctx.beginPath();
        const drawSize = bullet.size * bullet.popAnimation;
        ctx.arc(bullet.x, bullet.y, drawSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect to the most recent bullet
        if (index === bullets.length - 1) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = bullet.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Update pop animation
        if (bullet.popAnimation > 1) {
            bullet.popAnimation = Math.max(1, bullet.popAnimation - 0.05);
        }
    });

    if (!isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, 40);

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        const lastBullet = bullets[bullets.length - 1];
        const bulletSize = lastBullet ? lastBullet.size.toFixed(2) : '0.00';

        updateCurrentTime();

        ctx.fillText(`Time: ${currentTime} | Bullet Size: ${bulletSize} 😎😎😎`, 10, 20);
        // Draw player ship (square)
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);

        const currentTimeIntro = Date.now();
        if (currentTimeIntro - gameStartTime < introductionDuration) {
            drawIntroductionElements();
        }
    } else {
        // Draw GAME OVER message
        ctx.fillStyle = 'red';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    }

    ctx.restore();
}

function drawIntroductionElements() {
    // Draw red circle around the player
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size * 1.5, 0, Math.PI * 2);
    ctx.stroke();

    // Draw arrow pointing to the player
    const arrowSize = player.size * 0.8;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.size * 2);
    ctx.lineTo(player.x - arrowSize / 2, player.y - player.size * 2 - arrowSize);
    ctx.lineTo(player.x + arrowSize / 2, player.y - player.size * 2 - arrowSize);
    ctx.closePath();
    ctx.fill();

    // Draw "You" text
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('You', player.x, player.y - player.size * 2 - 30);
}

let isGameOver = false;
let gameOverTime = 0;
let finalBulletSize = 0;

// Modify the checkCollision function
function checkCollision() {
    if (isGameOver) return;

    for (let bullet of bullets) {
        const dx = player.x - bullet.x;
        const dy = player.y - bullet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (player.size / 2 + bullet.size / 2)) {
            gameOver();
            break;
        }
    }
}

function gameOver() {
    isGameOver = true;
    gameOverTime = (audioContext.currentTime - loopStartTime) / 60; // Convert to minutes
    finalBulletSize = bullets[bullets.length - 1].size;
    canvas.removeEventListener('mousemove', handleMouseMove);
    
    // Fade out music
    const fadeOutDuration = 2; // 2 seconds
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + fadeOutDuration);

    // Show modal
    showGameOverModal();
}

// Game loop
let lastTime = 0;
function gameLoop(time) {
    const currentAudioTime = audioContext.currentTime;
    const loopTime = (currentAudioTime - loopStartTime) % (bgmLoopDuration / 1000);

    // Check if we've looped
    if (loopTime < lastLoopTime) {
        nextBulletIndex = 0;
        bulletPopTimeOffset = 0; // Reset offset if you're using it
    }
    lastLoopTime = loopTime;

    // Sync with audio periodically
    if (currentAudioTime - lastSyncTime > syncInterval / 1000) {
        syncWithAudio(currentAudioTime);
        lastSyncTime = currentAudioTime;
    }

    // Spawn bullets based on audio time
    while (nextBulletIndex < bulletPopTimes.length && 
           (loopTime * 1000 >= bulletPopTimes[nextBulletIndex] + bulletPopTimeOffset)) {
        spawnBullet();
        nextBulletIndex++;
    }

    stars.forEach(star => {
        star.x += star.speed;
        if (star.x > canvas.width) {
            star.x = 0;
            star.y = Math.random() * canvas.height;
        }
    });

    checkCollision();
    draw();

    requestAnimationFrame(gameLoop);
}

function syncWithAudio(currentTime) {
    const expectedLoopPosition = (currentTime - loopStartTime) % (bgmLoopDuration / 1000);
    const actualLoopPosition = audioElement.currentTime % (bgmLoopDuration / 1000);
    const drift = Math.abs(expectedLoopPosition - actualLoopPosition);

    if (drift > 0.05) { // If drift is more than 50ms
        // Adjust playback rate slightly
        const adjustment = 1 + (expectedLoopPosition - actualLoopPosition) / 5;
        audioElement.playbackRate = Math.max(0.9, Math.min(1.1, adjustment));

        // Reset nextBulletIndex based on actual audio position
        nextBulletIndex = bulletPopTimes.findIndex(time => time > actualLoopPosition * 1000);
        if (nextBulletIndex === -1) nextBulletIndex = 0;

        console.log(`Syncing... Drift: ${drift.toFixed(3)}s, Playback Rate: ${audioElement.playbackRate.toFixed(2)}`);
    } else {
        audioElement.playbackRate = 1;
    }
}

function showGameOverModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'rgba(0, 0, 0, 0.8)';
    modal.style.padding = '20px';
    modal.style.borderRadius = '10px';
    modal.style.color = 'white';
    modal.style.textAlign = 'center';
    modal.style.zIndex = '1000';

    const timeEndured = gameOverTime.toFixed(2);
    const tweetText = encodeURIComponent(`#絶対領域の音GAME で ${timeEndured} 分間生き延びました! [Your Game URL]`);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    modal.innerHTML = `
        <h2>GAME OVER</h2>
        <p>Time Endured: ${timeEndured} minutes</p>
        <p>Final Bullet Size: ${finalBulletSize.toFixed(2)}</p>
        <a href="${twitterShareUrl}" target="_blank" style="color: #1DA1F2; text-decoration: none;">Share on Twitter</a>
    `;

    document.body.appendChild(modal);
}

// Initialize lastLoopTime
let lastLoopTime = 0;

// Start the game after the user clicks
canvas.addEventListener('click', startGame);

// Key press event listener for recording
document.addEventListener('keydown', (event) => {

    const offsetStep = 5; // Adjust offset by 5ms each time

    if (event.key === '+' || event.key === '=') {
        bulletPopTimeOffset += offsetStep;
        console.log(`Bullet pop time offset: ${bulletPopTimeOffset}ms`);
    } else if (event.key === '-' || event.key === '_') {
        bulletPopTimeOffset -= offsetStep;
        console.log(`Bullet pop time offset: ${bulletPopTimeOffset}ms`);
    }

    if (event.key === 'r' || event.key === 'R') {
        // Toggle recording mode
        isRecording = !isRecording;
        if (isRecording) {
            recordedTimes = [];  // Clear previous recorded times
            console.log("Recording started... Press C/V to record timings.");
        } else {
            console.log("Recording stopped.");
            console.log("Recorded bullet pop times:", recordedTimes);
        }
    }

    // Record the current audio time when C or V is pressed in recording mode
    if (isRecording && (event.key === 'c' || event.key === 'v')) {
        const currentTime = audioContext.currentTime * 1000; // Get current time in milliseconds
        recordedTimes.push(currentTime % bgmLoopDuration); // Record within the loop
        console.log(`Recorded time: ${currentTime % bgmLoopDuration} ms`);
    }
});
