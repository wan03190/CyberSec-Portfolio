// 1. Dynamic Typing Loop
const roles = [
    "Cybersecurity and IT",
    "Full-Stack Engineering",
    "Automation and Scripting",
    "Bug Bounty Hunting",
    "Penetration Testing",
    "Secure System Designer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenRoles = 2000;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Erase character
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Type character
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Determine speeds and transition states
    let currentSpeed = isDeleting ? erasingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing role, pause before deleting
        currentSpeed = delayBetweenRoles;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting role, move to next
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        currentSpeed = 500; // brief pause before starting typing new role
    }

    setTimeout(typeEffect, currentSpeed);
}


// 2. Digital Matrix Background Animation
const canvas = document.getElementById("cyber-canvas");
const ctx = canvas.getContext("2d");

let columns = 0;
let fontSize = 14;
let drops = [];

// Binary and hexadecimal characters for a high-tech matrix theme
const matrixChars = "0101101011010101010100111100101001010110101010010101111001010101010100101010101010101010010101010101010101010101010101010101010101010101010010110101010101010101010101";

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // staggered starts for organic falling effect
    }
}

function drawMatrix() {
    // Semi-transparent black block to create fade/trail effect
    ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Choose neon cyber colors: alternate between bright green and subtle cyan
    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Randomize brightness
        const isBright = Math.random() > 0.98;
        if (isBright) {
            ctx.fillStyle = "#ffffff"; // Rare white highlights
            ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
        } else if (Math.random() > 0.5) {
            ctx.fillStyle = "rgba(0, 255, 136, 0.35)"; // Cyber Green
            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        } else {
            ctx.fillStyle = "rgba(0, 191, 255, 0.25)"; // Cyber Cyan
            ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        }
        
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Move drops down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += 0.75; // speed modifier
    }
}


// 3. Robust Error Handling for Missing profile.jpg
// In case profile.jpg is missing, this draws an ultra-sleek tech avatar inside an SVG
function handleImageError(img) {
    const fallbackSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="w-full h-full p-2 bg-[#0d1527] text-[#00ff88]">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#00ff88" stroke-width="1.5" stroke-dasharray="4, 4"/>
            <!-- Cyber Shield / Security Node Icon -->
            <path d="M50 20 L75 30 V55 C75 70 60 82 50 86 C40 82 25 70 25 55 V30 Z" fill="none" stroke="#00ff88" stroke-width="2.5" stroke-linejoin="round"/>
            <path d="M50 35 V71" fill="none" stroke="#00bfff" stroke-width="2"/>
            <path d="M38 48 H62" fill="none" stroke="#00bfff" stroke-width="2"/>
            <!-- Tech dots -->
            <circle cx="50" cy="35" r="3" fill="#00ff88"/>
            <circle cx="38" cy="48" r="3" fill="#00ff88"/>
            <circle cx="62" cy="48" r="3" fill="#00ff88"/>
            <circle cx="50" cy="71" r="3" fill="#00ff88"/>
        </svg>
    `;
    
    // Create container for fallback SVG and swap it
    const parent = img.parentElement;
    if (parent) {
        parent.innerHTML = fallbackSVG;
    }
}

// Set up image error global handler to point to this function
window.handleImageError = handleImageError;


// 4. Event Listeners & Bootstrapping
window.addEventListener("resize", () => {
    initCanvas();
});

// Boot operations
document.addEventListener("DOMContentLoaded", () => {
    // Start typing cycle
    setTimeout(typeEffect, 1000);
    
    // Setup canvas
    initCanvas();
    
    // Run matrix loop
    setInterval(drawMatrix, 33); // approx 30 fps for smooth low-CPU execution
});