/* ======================================================
   Dixit Patel Portfolio Website
   script.js
   Clean / Refactored / Professional Version
====================================================== */

/* ======================================================
   OPTIONAL: EmailJS Initialization
   Replace with your actual public key
====================================================== */
if (typeof emailjs !== "undefined") {
  emailjs.init("YOUR_PUBLIC_KEY");
}

/* ======================================================
   DOM READY
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initTypingAnimation();
  initRevealAnimations();
  initScrollProgress();
  initThemeToggle();
  initPortfolioModal();
  initContactForm();
  initSmoothNavHighlight();
  initTracking();
});

/* ======================================================
   HERO TYPING ANIMATION
====================================================== */
function initTypingAnimation() {
  const roles = [
    "Senior Software Engineer",
    "Senior AI Engineer",
    "LLM / RAG Solutions Engineer",
    "Scalable Backend Architect"
  ];

  const target = document.getElementById("typing-text");
  if (!target) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      target.textContent = currentRole.slice(0, charIndex++);
    } else {
      target.textContent = currentRole.slice(0, charIndex--);
    }

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex > currentRole.length) {
      deleting = true;
      speed = 1400;
    }

    if (deleting && charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeLoop, speed);
  }

  typeLoop();
}

/* ======================================================
   REVEAL ON SCROLL ANIMATION
====================================================== */
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ======================================================
   TOP SCROLL PROGRESS BAR
====================================================== */
function initScrollProgress() {
  const progress = document.getElementById("scroll-progress");
  if (!progress) return;

  window.addEventListener("scroll", () => {
    const height =
      document.documentElement.scrollHeight - window.innerHeight;

    const percent = (window.scrollY / height) * 100;

    progress.style.width = percent + "%";
  });
}

/* ======================================================
   DARK / LIGHT THEME TOGGLE
====================================================== */
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const body = document.body;

    body.dataset.theme =
      body.dataset.theme === "light" ? "" : "light";

    toggle.textContent =
      body.dataset.theme === "light" ? "☀️" : "🌙";
  });
}

/* ======================================================
   PROJECT + EXPERIENCE MODAL
====================================================== */
function initPortfolioModal() {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");

  if (!modal || !title || !body || !closeBtn) return;

  /* ----------------------------------
     Modal Data
  ---------------------------------- */
  const projectData = {
    rag:
      "Designed secure Retrieval-Augmented Generation (RAG) platforms using LLMs, vector databases, enterprise search, and scalable backend APIs.",

    agent:
      "Built intelligent AI agents and automated workflows using Microsoft Copilot Studio and modern orchestration patterns.",

    backend:
      "Developed scalable Python backend systems, REST APIs, integrations, and optimized microservices for enterprise performance."
  };

  const experienceData = {
    caterpillar:
      "Leading enterprise AI initiatives including RAG platforms, LLM integrations, AI agents, model evaluation, secure enterprise search, and business workflow automation.",

    fabricators:
      "Developed backend systems for manufacturing operations, improved execution performance by ~33%, and delivered robust Python / database solutions.",

    wright:
      "Built applied healthcare software systems, contributed to research success securing $1M+ funding, and developed tested production-quality applications.",

    lnt:
      "Worked on enterprise software delivery and AI/computer vision proof-of-concepts using Python and engineering best practices."
  };

  /* ----------------------------------
     Click Handlers
  ---------------------------------- */
  document.querySelectorAll(".project, .experience").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.project || card.dataset.exp;

      const isProject = card.classList.contains("project");

      title.textContent =
        card.querySelector("h4")?.textContent ||
        card.innerText.split("\n")[0];

      body.textContent = isProject
        ? projectData[key]
        : experienceData[key];

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  /* ----------------------------------
     Close Modal
  ---------------------------------- */
  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

/* ======================================================
   CONTACT FORM
====================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form || !status) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    status.textContent = "Sending message...";

    const formData = Object.fromEntries(
      new FormData(form).entries()
    );

    /* If EmailJS configured */
    if (typeof emailjs !== "undefined") {
      emailjs
        .send("SERVICE_ID", "TEMPLATE_ID", formData)
        .then(() => {
          status.textContent =
            "✅ Message sent successfully.";
          form.reset();
        })
        .catch(() => {
          status.textContent =
            "❌ Unable to send. Please email directly.";
        });
    } else {
      status.textContent =
        "⚠️ Email service not configured.";
    }
  });
}

/* ======================================================
   ACTIVE NAV LINK ON SCROLL
====================================================== */
function initSmoothNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-menu a");

  if (!sections.length || !links.length) return;

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop - 140;
      const height = section.offsetHeight;

      if (window.scrollY >= top &&
          window.scrollY < top + height) {
        current = section.getAttribute("id");
      }
    });

    links.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (window.scrollY > 80) nav.classList.add("shrink");
  else nav.classList.remove("shrink");
});

/* ======================================================
   SIMPLE CLICK TRACKING
====================================================== */
function initTracking() {
  document.querySelectorAll(".track").forEach(item => {
    item.addEventListener("click", () => {
      console.log("Tracked event:", item.dataset.event);
    });
  });
}

/* ======================================================
   PARTICLE SYSTEM
====================================================== */
function initParticles(){
  const canvas = document.getElementById("particle-canvas");
  if(!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = Array.from({length: 60}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  }));

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2);
      ctx.fillStyle = "rgba(125,211,252,0.6)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

initParticles();

/* =====================================================
   CURSOR GLOW TRAIL (VERY PREMIUM FEEL)
===================================================== */
const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* =====================================================
   SKILL FILTER LOGIC
===================================================== */
function initSkillFilters(){
  const buttons = document.querySelectorAll(".skill-filter");
  const cards = document.querySelectorAll(".skill-card");

  buttons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      
      // active button UI
      buttons.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card=>{
        const match = filter === "all" || card.dataset.category === filter;

        if(match){
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });

    });
  });
}

// call it in DOMContentLoaded
initSkillFilters();