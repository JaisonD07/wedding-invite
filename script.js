// AUTO TRANSITION
setTimeout(()=>{
  document.getElementById("hero").style.display="none";
  document.getElementById("main").style.display="block";
},2000);

// SCROLL ANIMATION
const cards=document.querySelectorAll('.card');
window.addEventListener('scroll',()=>{
  cards.forEach(card=>{
    const top=card.getBoundingClientRect().top;
    if(top<window.innerHeight-50){
      card.classList.add('show');
    }
  });
});

// MAP
function openMap(loc){
  window.open("https://www.google.com/maps?q="+loc);
}

// MUSIC
function toggleMusic(){
  let m=document.getElementById("music");
  m.paused ? m.play() : m.pause();
}

// PARTICLES
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

function resize(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

let particles=[];
for(let i=0;i<50;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="rgba(212,175,55,0.3)";
  ctx.beginPath();
  particles.forEach(p=>{
    ctx.moveTo(p.x,p.y);
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
  });
  ctx.fill();
  update();
}

function update(){
  particles.forEach(p=>{
    p.y+=0.5;
    if(p.y>canvas.height){
      p.y=0;
      p.x=Math.random()*canvas.width;
    }
  });
}

setInterval(draw,30);
