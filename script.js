emailjs.init("YOUR_PUBLIC_KEY");

/* Typing */
const roles=["Senior Software Engineer","Senior AI Engineer"];
let i=0,j=0;
const text=document.getElementById("typing-text");
function type(){ if(j<roles[i].length){ text.textContent+=roles[i][j++]; setTimeout(type,100);} else setTimeout(erase,1400);}
function erase(){ if(j>0){ text.textContent=roles[i].slice(0,--j); setTimeout(erase,60);} else { i=(i+1)%roles.length; setTimeout(type,300);} }
type();

/* Reveal */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add("show"); });
});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* Progress */
window.addEventListener("scroll",()=>{
  document.getElementById("scroll-progress").style.width=
  (window.scrollY/(document.body.scrollHeight-window.innerHeight))*100+"%";
});

/* Modals */
const modal=document.getElementById("modal");
const modalTitle=document.getElementById("modal-title");
const modalBody=document.getElementById("modal-body");
document.getElementById("modal-close").onclick=()=>modal.style.display="none";

const projectData={
  rag:"Designed secure enterprise Retrieval‑Augmented Generation platforms using LLMs.",
  agent:"Built autonomous AI agents automating complex workflows.",
  backend:"High‑performance Python microservices optimized for latency."
};
const experienceData={
  caterpillar:"Led production AI systems, enterprise RAG apps, AI agents, and model validation.",
  fabricators:"Optimized backend systems improving execution performance by ~33%.",
  wright:"Developed applied healthcare AI systems supporting $1M+ research funding.",
  lnt:"Built enterprise Python solutions and AI‑based computer vision POCs."
};

document.querySelectorAll(".project,.experience").forEach(el=>{
  el.onclick=()=>{
    modalTitle.textContent=el.innerText;
    modalBody.textContent=(el.classList.contains("project")?projectData:experienceData)[el.dataset.project||el.dataset.exp];
    modal.style.display="flex";
  };
});

/* Contact */
document.getElementById("contact-form").onsubmit=e=>{
  e.preventDefault();
  const status=document.getElementById("form-status");
  status.textContent="Sending...";
  emailjs.send("SERVICE_ID","TEMPLATE_ID",Object.fromEntries(new FormData(e.target)))
    .then(()=>status.textContent="✅ Message sent successfully.",
          ()=>status.textContent="❌ Failed to send. Please email directly.");
};

/* Theme */
document.getElementById("theme-toggle").onclick=()=>{
  document.body.dataset.theme=document.body.dataset.theme==="light"?"":"light";
};

/* Tracking */
document.querySelectorAll(".track").forEach(el=>{
  el.onclick=()=>console.log("event:",el.dataset.event);
});
