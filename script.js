/* ======================================================
   Dixit Patel Portfolio Website
   script.js (FINAL PRODUCTION VERSION)
====================================================== */

/* ======================================================
   OPTIONAL: EmailJS Initialization
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
  initSkillFilters();
  initTiltCards();
  initCounters();
  initAIBubble();
  initParticles();
  initAITerminal();
});

/* ======================================================
   HERO TYPING ANIMATION
====================================================== */
function initTypingAnimation() {
  const roles = [
    "Senior Software Engineer - AI",
    "Senior AI Engineer",
    "Python Developer"
  ];

  const target = document.getElementById("typing-text");
  if (!target) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function loop() {
    const role = roles[roleIndex];

    target.textContent = role.substring(0, charIndex);

    if (!deleting) charIndex++;
    else charIndex--;

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex > role.length) {
      deleting = true;
      speed = 1200;
    }

    if (deleting && charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(loop, speed);
  }

  loop();
}

/* ======================================================
   COUNTERS
====================================================== */
function initCounters() {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;

        let count = 0;
        const speed = target / 70;

        const update = () => {
          count += speed;

          if (count < target) {
            el.textContent = Math.ceil(count);
            requestAnimationFrame(update);
          } else {
            el.textContent = target + "+";
          }
        };

        update();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.45 });

  counters.forEach(c => observer.observe(c));
}

/* ======================================================
   REVEAL ANIMATION
====================================================== */
function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

/* ======================================================
   SCROLL PROGRESS
====================================================== */
function initScrollProgress() {
  const progress = document.getElementById("scroll-progress");
  if (!progress) return;

  window.addEventListener("scroll", () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (window.scrollY / height) * 100;
    progress.style.width = percent + "%";
  });
}

/* ======================================================
   THEME TOGGLE
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
   MODAL SYSTEM
====================================================== */
function initPortfolioModal() {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");

  if (!modal || !title || !body || !closeBtn) return;

  const projectData = {
    rag: "Designed secure RAG systems using LLMs and vector databases.",
    agent: "Built AI agents using Copilot Studio and workflows.",
    backend: "Developed scalable Python backend APIs and microservices."
  };

  const experienceData = {
    caterpillar: "Led enterprise AI initiatives and LLM integrations.",
    fabricators: "Improved backend performance by ~33%.",
    wright: "Built healthcare systems and secured $1M+ funding.",
    lnt: "Worked on enterprise software and AI PoCs."
  };

  document.querySelectorAll(".project, .experience").forEach(card => {
    card.addEventListener("click", () => {

      const key = card.dataset.project || card.dataset.exp;
      const isProject = card.classList.contains("project");

      title.textContent =
        card.querySelector("h4")?.textContent ||
        card.innerText.split("\n")[0];

      body.textContent =
        isProject ? projectData[key] : experienceData[key];

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
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

    const formData = Object.fromEntries(new FormData(form).entries());

    if (typeof emailjs !== "undefined") {
      emailjs.send("SERVICE_ID", "TEMPLATE_ID", formData)
        .then(() => {
          status.textContent = "✅ Message sent successfully.";
          form.reset();
        })
        .catch(() => {
          status.textContent = "❌ Failed to send.";
        });
    } else {
      status.textContent = "⚠️ Email service not configured.";
    }
  });
}

/* ======================================================
   NAV HIGHLIGHT
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
        current = section.id;
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

/* ======================================================
   TRACKING
====================================================== */
function initTracking() {
  document.querySelectorAll(".track").forEach(item => {
    item.addEventListener("click", () => {
      console.log("Tracked:", item.dataset.event);
    });
  });
}

/* ======================================================
   PARTICLES
====================================================== */
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(125,211,252,0.6)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ======================================================
   CURSOR GLOW
====================================================== */
const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ======================================================
   SKILL FILTERS
====================================================== */
function initSkillFilters() {
  const buttons = document.querySelectorAll(".skill-filter");
  const cards = document.querySelectorAll(".skill-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match =
          filter === "all" ||
          card.dataset.category === filter;

        card.classList.toggle("hide", !match);
      });
    });
  });
}

/* ======================================================
   TILT CARDS
====================================================== */
function initTiltCards() {
  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / 12;
      const rotateY = (x - rect.width / 2) / 12;

      card.style.transform =
        `perspective(1000px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ======================================================
   AI BUBBLE
====================================================== */
function initAIBubble() {
  const toggle = document.getElementById("aiToggle");
  const panel = document.getElementById("aiPanel");

  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

  document.querySelectorAll(".ai-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const link = btn.dataset.link;

      if (link.endsWith(".pdf")) {
        window.open(link, "_blank");
      } else {
        document.querySelector(link)?.scrollIntoView({
          behavior: "smooth"
        });
      }

      panel.classList.remove("open");
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".ai-bubble")) {
      panel.classList.remove("open");
    }
  });
}

/* ======================================================
   AI TERMINAL (FINAL FIXED)
====================================================== */
function initAITerminal() {

  const terminal = document.getElementById("consoleBody");
  const metrics = document.getElementById("terminalMetrics");

  if (!terminal || !metrics) return;

  /* lock terminal scroll so it never expands page */
  terminal.style.overflowY = "auto";
  terminal.style.maxHeight = "320px";

  /* =========================
     LIVE METRICS
  ========================= */
  function updateMetrics() {
    const cpu = Math.floor(28 + Math.random() * 45);
    const ram = Math.floor(42 + Math.random() * 45);
    const ping = Math.floor(8 + Math.random() * 24);

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    metrics.innerHTML = `
      <div class="metric-box">CPU<br><strong>${cpu}%</strong></div>
      <div class="metric-box">RAM<br><strong>${ram}%</strong></div>
      <div class="metric-box">LATENCY<br><strong>${ping}ms</strong></div>
      <div class="metric-box">STATUS<br><strong class="metric-live">● ONLINE</strong></div>
      <div class="metric-box">TIME<br><strong>${time}</strong></div>
      <div class="metric-box">AGENTS<br><strong>${1 + Math.floor(Math.random() * 5)} ACTIVE</strong></div>
    `;
  }

  updateMetrics();
  setInterval(updateMetrics, 1000);

  /* =========================
     COMMAND SEQUENCE
  ========================= */
  const sequences = [
    { cmd: "initialize portfolio", result: "Senior AI Engineer profile loaded" },
    { cmd: "load experience", result: "7+ years engineering modules ready" },
    { cmd: "scan skills", result: "LLMs | RAG | Python | Backend | Cloud" },
    { cmd: "fetch projects", result: "Enterprise systems synchronized" },
    { cmd: "detect visitor", result: "Recruiter traffic identified" },
    { cmd: "opportunity status", result: "READY FOR INTERVIEW" },
    { cmd: "system health", result: "All services operational" }
  ];

  let index = 0;

  /* =========================
     TYPE LINE (NO SOUND)
  ========================= */
  function typeLine(text, done) {

    const line = document.createElement("div");
    line.className = "console-line";
    terminal.appendChild(line);

    let i = 0;

    function type() {

      if (i <= text.length) {

        line.innerHTML =
          `<span class="prompt">DIXIT@AI:~$ </span>` +
          text.slice(0, i) +
          `<span class="console-cursor">_</span>`;

        i++;

        terminal.scrollTop = terminal.scrollHeight;

        setTimeout(type, 35);

      } else {

        line.innerHTML =
          `<span class="prompt">DIXIT@AI:~$ </span>` +
          text;

        done();
      }
    }

    type();
  }

  /* =========================
     RESULT OUTPUT
  ========================= */
  function printResult(text) {

    const result = document.createElement("div");
    result.className = "console-line";
    result.textContent = text;

    terminal.appendChild(result);

    const bar = document.createElement("div");
    bar.className = "loadbar";
    bar.innerHTML = `<span></span>`;

    terminal.appendChild(bar);

    terminal.scrollTop = terminal.scrollHeight;
  }

  /* =========================
     MAIN LOOP
  ========================= */
  function run() {

    if (index >= sequences.length) {
      setTimeout(() => {
        terminal.innerHTML = "";
        index = 0;
        run();
      }, 2000);
      return;
    }

    const item = sequences[index];

    typeLine(item.cmd, () => {
      setTimeout(() => {
        printResult(item.result);
        index++;
        setTimeout(run, 800);
      }, 250);
    });
  }

  run();
}