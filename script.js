const fingerprintBtn = document.getElementById('fingerprintBtn');
const statusText = document.getElementById('statusText');
const lockScreen = document.getElementById('lockScreen');
const proposalScreen = document.getElementById('proposalScreen');
const music = document.getElementById('bgMusic');

let scanTimer;
let slideIndex = 0;

// 1. SCANNING LOGIC
function startScan() {
    fingerprintBtn.classList.add('scanning');
    statusText.innerText = "Verifying Identity...";
    statusText.style.color = "#00ffcc";
    
    // Attempt to play music
    music.play().catch(e => console.log("Audio waiting for interaction"));

    scanTimer = setTimeout(() => {
        unlockWebsite();
    }, 2000); 
}

function stopScan() {
    fingerprintBtn.classList.remove('scanning');
    statusText.innerText = "Hold to Unlock";
    statusText.style.color = "#333";
    clearTimeout(scanTimer);
}

// 2. UNLOCK LOGIC
function unlockWebsite() {
    lockScreen.style.opacity = '0';
    
    setTimeout(() => {
        lockScreen.style.display = 'none';
        proposalScreen.classList.remove('hidden');
        proposalScreen.style.opacity = '1';
        showSlides();
        
        if (navigator.vibrate) {
            navigator.vibrate([100]); 
        }
    }, 1000);
}

// 3. SLIDESHOW
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); 
}

// 4. CELEBRATION EFFECT (Explosion)
function startCelebration() {
    // Hide buttons so she can see the effects
    document.querySelector('.buttons').style.display = 'none';
    
    // Change the question text to a confirmation
    document.querySelector('.big-question').innerText = "I Love You! ❤️";
    
    // Launch emojis for 5 seconds
    const duration = 5000; 
    const end = Date.now() + duration;

    // Create an interval to spawn emojis rapidly
    const interval = setInterval(function() {
        if (Date.now() > end) {
            clearInterval(interval);
        }
        createEmoji();
        createEmoji();
        createEmoji(); // Spawn 3 at a time for "Burst" effect
    }, 200);
}

function createEmoji() {
    const emojis = ['❤️', '💋', '🫀', '🥰', '💍'];
    const element = document.createElement('div');
    element.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    element.classList.add('emoji');
    
    // Random position horizontal
    element.style.left = Math.random() * 100 + "vw";
    
    // Random size
    element.style.fontSize = (Math.random() * 2 + 1) + "rem";
    
    // Random drift direction for animation
    element.style.setProperty('--random-x', (Math.random() * 200 - 100) + "px");
    
    // Random speed
    element.style.animationDuration = (Math.random() * 2 + 2) + "s";
    
    document.body.appendChild(element);
    
    // Remove element after animation finishes to keep browser fast
    setTimeout(() => {
        element.remove();
    }, 4000);
}

// EVENT LISTENERS
fingerprintBtn.addEventListener('mousedown', startScan);
fingerprintBtn.addEventListener('mouseup', stopScan);
fingerprintBtn.addEventListener('mouseleave', stopScan);
fingerprintBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startScan(); });
fingerprintBtn.addEventListener('touchend', stopScan);

