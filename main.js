// Menu toggle
function toggleMenu(){
  const menu = document.getElementById("navMenu");
  menu.style.display = menu.style.display==="flex"?"none":"flex";
}
document.querySelectorAll('.nav-menu a').forEach(link=>{
  link.addEventListener('click',()=>{document.getElementById("navMenu").style.display="none";});
});

// Dark/Light mode
function toggleDarkMode(){
  document.body.classList.toggle("light-mode");
}

// Random number generator
function getRandomNumber(country){
  const prefix = {US:"+1", CA:"+1", GB:"+44", DE:"+49", FR:"+33"};
  const number = Math.floor(Math.random()*9000000000)+1000000000;
  return `${prefix[country]} ${number}`;
}

// Random 6-digit code
function getRandomCode(){ return Math.floor(100000 + Math.random()*900000); }

// --- Platform buttons ---
const platforms = ["whatsapp","tiktok","facebook","telegram"];
platforms.forEach(p=>{
  const numBtn = document.getElementById(`${p}-number-btn`);
  const codeBtn = document.getElementById(`${p}-code-btn`);
  const display = document.getElementById(`${p}-display`);
  const countrySelect = document.getElementById(`${p}-country`);
  const contactBtn = document.getElementById(`${p}-contact`);

  let currentNumber = "";

  numBtn.addEventListener("click",()=>{
    const country = countrySelect.value;
    currentNumber = getRandomNumber(country);
    display.innerText = "Number: " + currentNumber;
    codeBtn.disabled = false;
  });

  codeBtn.addEventListener("click",()=>{
    if(!currentNumber) return alert("Request number first!");
    const code = getRandomCode();
    display.innerText += ` | Code: ${code}`;
  });

  contactBtn.addEventListener("click",()=>{
    if(!currentNumber) return alert("Request number and code first!");
    const country = countrySelect.value;
    const yearsSelect = document.getElementById(`${p}-years`);
    const years = yearsSelect ? yearsSelect.value : "";
    window.open(`https://wa.me/2347078312023?text=Hi Emmy, I want a ${p} account from ${country} ${years} number ${currentNumber}`,"_blank");
  });
});

// Scroll reveal
const sections=document.querySelectorAll("section");
window.addEventListener("scroll",()=>{
  sections.forEach(sec=>{
    const rect=sec.getBoundingClientRect();
    if(rect.top<window.innerHeight-100){ sec.classList.add("visible"); }
  });
});

// Particle background
const canvas=document.getElementById("bg-canvas");
const ctx=canvas.getContext("2d");
let w,h;
function resize(){w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight;}
window.addEventListener("resize",resize);
resize();
const particles=[];
for(let i=0;i<120;i++){
  particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*1.2,vy:(Math.random()-0.5)*1.2,size:2+Math.random()*2});
}
function draw(){
  ctx.fillStyle="rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,w,h);
  ctx.strokeStyle="rgba(0,255,204,0.2)";
  for(let i=0;i<particles.length;i++){
    const p=particles[i];
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>w)p.vx*=-1;
    if(p.y<0||p.y>h)p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fillStyle="#0ff"; ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const p2=particles[j];
      const dx=p.x-p2.x, dy=p.y-p2.y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<100){
        ctx.beginPath();
        ctx.moveTo(p.x,p.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();
