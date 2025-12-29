const fingerprintBtn = document.getElementById('fingerprintBtn');
const statusText = document.getElementById('statusText');
const lockScreen = document.getElementById('lockScreen');
const proposalScreen = document.getElementById('proposalScreen');
const music = document.getElementById('bgMusic');

let scanTimer;
let slideIndex = 0;

// 1. START SCANNING
function startScan() {
    fingerprintBtn.classList.add('scanning');
    statusText.innerText = "Scanning...";
    statusText.style.color = "#00ffcc";
    
    // Play music immediately when she touches the screen
    // (This bypasses browser autoplay blocking)
    music.play().catch(error => {
        console.log("Music play failed (usually due to browser policy):", error);
    });

    scanTimer = setTimeout(() => {
        unlockWebsite();
    }, 2000); // 2 seconds hold
}

// 2. STOP SCANNING (If finger lifted too early)
function stopScan() {
    fingerprintBtn.classList.remove('scanning');
    statusText.innerText = "Hold finger down";
    statusText.style.color = "#ff4d4d";
    clearTimeout(scanTimer);
}

// 3. UNLOCK & START SLIDESHOW
function unlockWebsite() {
    lockScreen.style.opacity = '0';
    
    setTimeout(() => {
        lockScreen.style.display = 'none';
        proposalScreen.classList.remove('hidden');
        proposalScreen.style.opacity = '1';
        
        // Start showing photos
        showSlides();
        
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]); 
        }
    }, 1000);
}

// 4. SLIDESHOW LOGIC
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Event Listeners
fingerprintBtn.addEventListener('mousedown', startScan);
fingerprintBtn.addEventListener('mouseup', stopScan);
fingerprintBtn.addEventListener('mouseleave', stopScan);
fingerprintBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    startScan();
});
fingerprintBtn.addEventListener('touchend', stopScan);

function acceptProposal() {
    alert("I love you, Deepa! ❤️");
}
