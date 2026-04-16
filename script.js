/* Typing */
const roles=[
  "Senior Software Engineer",
  "Senior AI Engineer",
];
let i=0,j=0;
const text=document.getElementById("typing-text");

function type(){
  if(j<roles[i].length){
    text.textContent+=roles[i][j++];
    setTimeout(type,100);
  }else setTimeout(erase,1400);
}
function erase(){
  if(j>0){
    text.textContent=roles[i].slice(0,--j);
    setTimeout(erase,60);
  }else{
    i=(i+1)%roles.length;
    setTimeout(type,300);
  }
}
type();

/* Reveal */
const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("show");
      observer.unobserve(e.target);
    }
  });
},{threshold:.15});
reveals.forEach(el=>observer.observe(el));

/* Scroll Progress */
window.addEventListener("scroll",()=>{
  document.getElementById("scroll-progress").style.width=
    (window.scrollY/(document.body.scrollHeight-window.innerHeight))*100+"%";
});

/* Dark / Light Mode */
const toggle=document.getElementById("theme-toggle");
toggle.onclick=()=>{
  document.body.dataset.theme=
    document.body.dataset.theme==="light"?"":"light";
};

/* Project Modal */
const modal=document.getElementById("project-modal");
const title=document.getElementById("modal-title");
const desc=document.getElementById("modal-description");

const projects={
  rag:["Enterprise RAG Platform","Secure LLM-based enterprise knowledge search with access control."],
  agent:["AI Agent Automation","Autonomous multi-step AI agents for business workflows."],
  backend:["Scalable Backend APIs","High-performance Python microservices optimized for latency."]
};

document.querySelectorAll(".project").forEach(card=>{
  card.onclick=()=>{
    const p=projects[card.dataset.project];
    title.textContent=p[0];
    desc.textContent=p[1];
    modal.style.display="flex";
  }
});

document.getElementById("modal-close").onclick=()=>modal.style.display="none";
window.onclick=e=>{ if(e.target===modal) modal.style.display="none"; };