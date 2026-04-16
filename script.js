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
  initNeuralBackground();
});

/* ======================================================
   AI NEURAL SYSTEM GLOBAL STATE (NEW)
====================================================== */
const AI_NEURAL = {
  mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  scrollY: 0,
  recruiterMode: 0, // 0 → normal, 1 → detected, 2 → high attention
  pulse: 0
};

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

  /* =========================
     Init Contact Form
  ========================= */

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = form?.querySelector("button[type='submit']");

  if (!form || !status || !submitBtn) return;

  const inputs = form.querySelectorAll("input, textarea");

  function setStatus(msg, type = "") {
    status.textContent = msg;
    status.className = type; // success | error | loading (optional styling)
  }

  function validateField(field) {
    const wrapper = field.closest(".form-field");

    let error = wrapper.querySelector(".error-msg");

    if (!error) {
      error = document.createElement("div");
      error.className = "error-msg";
      wrapper.appendChild(error);
    }

    if (!field.value.trim()) {
      error.textContent = "This field is required";
      field.classList.add("input-error");
      return false;
    }

    if (field.type === "email" && !field.value.includes("@")) {
      error.textContent = "Enter a valid email";
      field.classList.add("input-error");
      return false;
    }

    error.remove();
    field.classList.remove("input-error");
    return true;
  }

  function validateForm() {
    let ok = true;
    inputs.forEach(i => {
      if (!validateField(i)) ok = false;
    });
    return ok;
  }

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      validateField(input);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Fix errors before sending.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    setStatus("Encrypting message...", "loading");

    const formData = Object.fromEntries(new FormData(form).entries());

    try {
      if (typeof emailjs !== "undefined") {

        setStatus("Sending secure transmission...", "loading");

        await emailjs.send(
          "SERVICE_ID",
          "TEMPLATE_ID",
          formData
        );

        setStatus("✔ Message delivered successfully", "success");
        form.reset();

      } else {
        setStatus("Email service not configured", "error");
      }

    } catch (err) {
      setStatus("Transmission failed. Try again.", "error");
    }

    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");

    setTimeout(() => {
      status.textContent = "";
      status.className = "";
    }, 4000);
  });
}

/* =========================
     NEURAL BACKGROUND
========================= */
/* ======================================================
   NEURAL BACKGROUND (UPGRADED AI SYSTEM)
   - Mouse attraction
   - Pulse waves
   - Dual-layer rendering
   - Recruiter detection mode
====================================================== */
function initNeuralBackground() {
  const canvas = document.getElementById("neural-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const NODES = 90;

  // =========================
  // LAYER 1: DEEP NETWORK (slow + subtle)
  // =========================
  const deepNodes = Array.from({ length: NODES }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25
  }));

  // =========================
  // LAYER 2: ACTIVE NETWORK (fast + reactive)
  // =========================
  const activeNodes = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.9,
    vy: (Math.random() - 0.5) * 0.9
  }));

  /* =========================
     MOUSE TRACKING
  ========================= */
  window.addEventListener("mousemove", (e) => {
    AI_NEURAL.mouse.x = e.clientX;
    AI_NEURAL.mouse.y = e.clientY;
  });

  window.addEventListener("scroll", () => {
    AI_NEURAL.scrollY = window.scrollY;

    // Recruiter detection trigger zone (hero section)
    if (window.scrollY < window.innerHeight * 0.8) {
      AI_NEURAL.recruiterMode = 2;
    } else if (window.scrollY < window.innerHeight * 1.5) {
      AI_NEURAL.recruiterMode = 1;
    } else {
      AI_NEURAL.recruiterMode = 0;
    }
  });

  /* =========================
     PULSE SYSTEM
  ========================= */
  function updatePulse() {
    AI_NEURAL.pulse += 0.03;
    requestAnimationFrame(updatePulse);
  }
  updatePulse();

  /* =========================
     DRAW CONNECTION
  ========================= */
  function drawLine(a, b, dist, intensity, color) {
    const opacity = (1 - dist / 160) * intensity;

    ctx.strokeStyle = color.replace("ALPHA", opacity);
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  /* =========================
     NODE UPDATE (with mouse attraction)
  ========================= */
  function updateNode(n, strength = 1, attraction = true) {
    n.x += n.vx;
    n.y += n.vy;

    // wall bounce
    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;

    /*// =========================
    // UPGRADE 1: Mouse attraction
    // =========================
    if (attraction) {
      const dx = AI_NEURAL.mouse.x - n.x;
      const dy = AI_NEURAL.mouse.y - n.y;

      n.x += dx * 0.0008 * strength;
      n.y += dy * 0.0008 * strength;
    }*/
  }

  /* =========================
     RENDER LOOP
  ========================= */
  function animate() {
    ctx.clearRect(0, 0, width, height);

    const pulseBoost = 1 + Math.sin(AI_NEURAL.pulse) * 0.15;
    const recruiterBoost = AI_NEURAL.recruiterMode;

    // =========================
    // LAYER 1 — DEEP NETWORK
    // =========================
    deepNodes.forEach((n, i) => {
      updateNode(n, 0.6, false);

      ctx.fillStyle = `rgba(120, 255, 200, 0.25)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < deepNodes.length; j++) {
        const m = deepNodes[j];
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          drawLine(
            n,
            m,
            dist,
            0.25 * pulseBoost,
            "rgba(0,255,180,ALPHA)"
          );
        }
      }
    });

    // =========================
    // LAYER 2 — ACTIVE NETWORK (reactive)
    // =========================
    activeNodes.forEach((n, i) => {
      updateNode(n, 1.5, true);

      // recruiter mode glow boost
      const glow = recruiterBoost ? 0.9 : 0.5;

      ctx.fillStyle = `rgba(0, 255, 120, ${glow})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2.2 + recruiterBoost * 0.8, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < activeNodes.length; j++) {
        const m = activeNodes[j];

        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160) {
          drawLine(
            n,
            m,
            dist,
            0.6 + recruiterBoost * 0.4,
            "rgba(0,255,120,ALPHA)"
          );
        }
      }

      // mouse connection beam (UPGRADE 1 highlight)
      const mx = AI_NEURAL.mouse.x;
      const my = AI_NEURAL.mouse.y;

      const mdx = n.x - mx;
      const mdy = n.y - my;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mdist < 180) {
        drawLine(
          n,
          { x: mx, y: my },
          mdist,
          1.2,
          "rgba(0,200,255,ALPHA)"
        );
      }
    });

    requestAnimationFrame(animate);
  }

  animate();

  /* =========================
     RESIZE HANDLING
  ========================= */
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}