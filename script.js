const roles = ["Senior Software Engineer, Senior AI Engineer"];
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
    setTimeout(type,200);
  }
}
type();

const reveals=document.querySelectorAll(".reveal");
window.addEventListener("scroll",()=>{
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-100){
      el.classList.add("show");
    }
  });
  document.getElementById("scroll-progress").style.width=
    (window.scrollY/(document.body.scrollHeight-window.innerHeight))*100+"%";
});
``