// ==================== MENU TOGGLE ====================
function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("navMenu").style.display = "none";
    });
});

// ==================== DARK / LIGHT MODE ====================
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
});

// Optional CSS in index.html or style.css:
// .light-mode { background: #f5f5f5; color: #111; }
// .light-mode header { background: rgba(255,255,255,0.9); border-bottom-color:#0ff; }
// .light-mode section { background: rgba(255,255,255,0.8); color:#111; }
// .light-mode footer { background: #ddd; color:#111; }

// ==================== RANDOM PRICE GENERATOR ====================
function randomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
document.getElementById("whatsapp-price").innerText = randomPrice(3, 15);
document.getElementById("tiktok-price").innerText = randomPrice(5, 12);
document.getElementById("facebook-price").innerText = randomPrice(5, 12);
document.getElementById("telegram-price").innerText = randomPrice(4, 10);

// ==================== SMS SIMULATION ====================
function simulateSMS(platform, country, outputId) {
    const output = document.getElementById(outputId);
    output.innerHTML = `<p>Requesting ${platform} code for ${country}... ⏳</p>`;
    
    setTimeout(() => {
        const code = Math.floor(100000 + Math.random() * 900000);
        output.innerHTML = `<p>✅ Your ${platform} verification code for ${country} is: <strong>${code}</strong></p>`;
    }, 10000); // 10 seconds delay
}

// WhatsApp
document.getElementById("whatsapp-request").addEventListener("click", () => {
    const country = document.getElementById("whatsapp-country").value;
    simulateSMS("WhatsApp", country, "whatsapp-output");
});

// TikTok
document.getElementById("tiktok-request").addEventListener("click", () => {
    const country = document.getElementById("tiktok-country").value;
    simulateSMS("TikTok", country, "tiktok-output");
});

// Facebook
document.getElementById("facebook-request").addEventListener("click", () => {
    const country = document.getElementById("facebook-country").value;
    simulateSMS("Facebook", country, "facebook-output");
});

// Telegram
document.getElementById("telegram-request").addEventListener("click", () => {
    const country = document.getElementById("telegram-country").value;
    simulateSMS("Telegram", country, "telegram-output");
});

// ==================== SCROLL REVEAL ====================
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) sec.classList.add("visible");
    });
});

// ==================== PARTICLE BACKGROUND ====================
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let w, h;
function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
window.addEventListener("resize", resize);
resize();

const particles = [];
for (let i = 0; i < 150; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: 2 + Math.random() * 2
    });
}

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(0,255,204,0.2)";
    
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#0ff";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(draw);
}
draw();
