/* ======================================================
   Dixit Patel Portfolio Website
   script.js — Fixed & Upgraded Production Version
====================================================== */

/* ======================================================
   EMAILJS INITIALIZATION
   ⚠️ Replace "YOUR_PUBLIC_KEY" with your actual EmailJS public key
====================================================== */
if (typeof emailjs !== "undefined") {
  emailjs.init("YOUR_PUBLIC_KEY"); // TODO: Replace with real key
}

/* ======================================================
   DOM READY — all inits run here
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initCursorGlow();         // FIX: moved inside DOMContentLoaded
  initTypingAnimation();
  initRevealAnimations();
  initScrollProgress();
  initNavShrink();
  initThemeToggle();
  initPortfolioModal();
  initContactForm();
  initSmoothNavHighlight();
  initTracking();
  initSkillFilters();
  initTiltCards();
  initCounters();
  initAIBubble();
  initBackToTop();
  initMobileNav();
  initParticles();
  initAITerminal();
  initNeuralBackground();
});

/* ======================================================
   AI NEURAL SYSTEM GLOBAL STATE
====================================================== */
const AI_NEURAL = {
  mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  scrollY: 0,
  recruiterMode: 0,
  pulse: 0
};

/* ======================================================
   CURSOR GLOW — FIX: now inside DOMContentLoaded
====================================================== */
function initCursorGlow() {
  // Skip on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

/* ======================================================
   HERO TYPING ANIMATION — FIX: charIndex underrun fixed
====================================================== */
function initTypingAnimation() {
  const roles = [
    "Senior Software Engineer - AI",
    "Senior AI Engineer",
    "Python Developer",
    "LLM Systems Architect",
    "Backend Engineer"
  ];

  const target = document.getElementById("typing-text");
  if (!target) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  // Respect reduced-motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = roles[0];
    return;
  }

  function loop() {
    const role = roles[roleIndex];
    target.textContent = role.substring(0, charIndex);

    if (!deleting) {
      charIndex++;
    } else {
      charIndex--;
    }

    let speed = deleting ? 45 : 90;

    if (!deleting && charIndex > role.length) {
      deleting = true;
      speed = 1400;
    }

    // FIX: was `charIndex < 0`, now `charIndex <= 0`
    if (deleting && charIndex <= 0) {
      deleting = false;
      charIndex = 0; // explicit reset
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
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".counter").forEach(el => {
      el.textContent = el.dataset.target + "+";
    });
    return;
  }

  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        let count = 0;
        const speed = Math.max(target / 70, 0.1);

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
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("show"));
    return;
  }

  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // unobserve once shown
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ======================================================
   SCROLL PROGRESS
====================================================== */
function initScrollProgress() {
  const progress = document.getElementById("scroll-progress");
  if (!progress) return;

  const update = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (window.scrollY / height) * 100;
    progress.style.width = Math.min(percent, 100) + "%";
  };

  window.addEventListener("scroll", update, { passive: true });
}

/* ======================================================
   NAV SHRINK ON SCROLL — FIX: was defined in CSS but never toggled
====================================================== */
function initNavShrink() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    nav.classList.toggle("shrink", window.scrollY > 60);
  }, { passive: true });
}

/* ======================================================
   MOBILE NAV HAMBURGER
====================================================== */
function initMobileNav() {
  const hamburger = document.getElementById("navHamburger");
  const menu = document.getElementById("navMenu");
  if (!hamburger || !menu) return;

  hamburger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.classList.toggle("active", isOpen);
  });

  // Close menu when a link is clicked
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.classList.remove("active");
    });
  });
}

/* ======================================================
   THEME TOGGLE — FIX: persists to localStorage
====================================================== */
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  // Restore saved theme
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) {
    document.body.dataset.theme = saved;
    toggle.textContent = saved === "light" ? "☀️" : "🌙";
  }

  toggle.addEventListener("click", () => {
    const body = document.body;
    const isLight = body.dataset.theme === "light";

    body.dataset.theme = isLight ? "" : "light";
    toggle.textContent = isLight ? "🌙" : "☀️";

    // FIX: persist preference
    localStorage.setItem("portfolio-theme", body.dataset.theme);
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
    rag: "Designed AI-powered solutions and Retrieval-Augmented Generation (RAG) applications that improved secure access to enterprise data through security-trimmed retrieval, ensuring users only accessed authorized information while speeding up decision-making and reducing the time spent searching for critical data.",
    agent: "Built intelligent AI automation agents using Copilot Studio and workflows that simplified multi-step business processes, reducing repetitive manual work and improving overall operational efficiency.",
    backend: "Improved algorithmic and backend performance in a manufacturing software role by leveraging efficient data structures, resulting in approximately 33% higher execution efficiency along with better system responsiveness, reliability, and user productivity.",
    healthcare: "Designed and developed mobile health applications for healthcare professionals that supported real-world clinical workflows. These solutions exceeded client expectations and helped secure over $1 million in research grant funding for subsequent project phases."
  };

  const experienceData = {
    caterpillar: "Led enterprise AI initiatives at Caterpillar Inc. through L&T Technology Services, building and deploying LLM-powered systems, RAG pipelines, and AI automation tools that streamlined decision-making across engineering teams.",
    fabricators: "Improved backend performance by approximately 33% through efficient data structures and algorithmic improvements. Delivered production-ready software features and maintained high system reliability.",
    wright: "Conducted funded Ph.D. research in AI and mobile health systems, building clinical applications that helped secure $1M+ in research grants. Co-authored peer-reviewed publications and received the Outstanding Paper Award at IADIS 2022.",
    lnt: "Worked on enterprise software engineering projects, contributed to Digital Transformation research as a Technical Paper Finalist, and developed scalable software components in a fast-paced consulting environment."
  };

  document.querySelectorAll(".project, .experience").forEach(card => {
    card.style.cursor = "pointer";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    const openModal = () => {
      const key = card.dataset.project || card.dataset.exp;
      const isProject = card.classList.contains("project");

      title.textContent = card.querySelector("h3,h4")?.textContent || "Details";
      body.textContent = isProject ? projectData[key] : experienceData[key];

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };

    card.addEventListener("click", openModal);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    });
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

/* ======================================================
   NAV HIGHLIGHT
====================================================== */
function initSmoothNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-menu a");

  if (!sections.length || !links.length) return;

  const update = () => {
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 160;
      if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) {
        current = section.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  };

  window.addEventListener("scroll", update, { passive: true });
}

/* ======================================================
   TRACKING — connected to gtag if available
====================================================== */
function initTracking() {
  document.querySelectorAll(".track").forEach(item => {
    item.addEventListener("click", () => {
      const event = item.dataset.event;
      // Google Analytics event (if configured)
      if (typeof gtag === "function") {
        gtag("event", event, { event_category: "portfolio_interaction" });
      }
      // Dev log (remove in production)
      // console.log("Tracked:", event);
    });
  });
}

/* ======================================================
   BACK TO TOP BUTTON
====================================================== */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ======================================================
   PARTICLES — FIX: resize reinitializes positions
====================================================== */
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  // Disable on mobile for performance
  if (window.innerWidth < 768) return;

  const ctx = canvas.getContext("2d");

  let width, height, particles;

  function setup() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    // FIX: particles re-created on resize so positions fit new dimensions
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3
    }));
  }

  setup();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(125,211,252,0.5)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();

  // FIX: debounced resize re-initializes particle positions
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 150);
  });
}

/* ======================================================
   SKILL FILTERS
====================================================== */
function initSkillFilters() {
  const buttons = document.querySelectorAll(".skill-filter");
  const cards = document.querySelectorAll("#skills .value-card[data-category]");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hide", !match);
      });
    });
  });
}

/* ======================================================
   TILT CARDS (3D effect)
====================================================== */
function initTiltCards() {
  if (window.matchMedia("(pointer: coarse)").matches) return; // Skip on touch

  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / 14;
      const rotateY = (x - rect.width / 2) / 14;

      // Update spotlight position CSS var
      card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--y", `${(y / rect.height) * 100}%`);

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.removeProperty("--x");
      card.style.removeProperty("--y");
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
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".ai-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const link = btn.dataset.link;

      if (link.endsWith(".pdf")) {
        window.open(link, "_blank");
      } else {
        document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
      }

      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".ai-bubble")) {
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ======================================================
   AI TERMINAL
====================================================== */
function initAITerminal() {
  const terminal = document.getElementById("consoleBody");
  const metrics = document.getElementById("terminalMetrics");

  if (!terminal || !metrics) return;

  terminal.style.overflowY = "auto";
  terminal.style.maxHeight = "320px";

  /* Live Metrics */
  function updateMetrics() {
    const cpu = Math.floor(28 + Math.random() * 45);
    const ram = Math.floor(42 + Math.random() * 45);
    const ping = Math.floor(8 + Math.random() * 24);
    const agents = 1 + Math.floor(Math.random() * 5);

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });

    metrics.innerHTML = `
      <div class="metric-box">CPU<br><strong>${cpu}%</strong></div>
      <div class="metric-box">RAM<br><strong>${ram}%</strong></div>
      <div class="metric-box">LATENCY<br><strong>${ping}ms</strong></div>
      <div class="metric-box">STATUS<br><strong class="metric-live">● ONLINE</strong></div>
      <div class="metric-box">TIME<br><strong>${time}</strong></div>
      <div class="metric-box">AGENTS<br><strong>${agents} ACTIVE</strong></div>
    `;
  }

  updateMetrics();
  setInterval(updateMetrics, 1000);

  /* Command Sequences */
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
        line.innerHTML = `<span class="prompt">DIXIT@AI:~$ </span>` + text;
        done();
      }
    }

    type();
  }

  function printResult(text) {
    const result = document.createElement("div");
    result.className = "console-line result-line";
    result.textContent = `  › ${text}`;
    terminal.appendChild(result);

    const bar = document.createElement("div");
    bar.className = "loadbar";
    bar.innerHTML = `<span></span>`;
    terminal.appendChild(bar);

    terminal.scrollTop = terminal.scrollHeight;
  }

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

/* ======================================================
   CONTACT FORM — FIX: proper email regex + finally block
====================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = form?.querySelector("button[type='submit']");

  if (!form || !status || !submitBtn) return;

  const inputs = form.querySelectorAll("input, textarea");

  function setStatus(msg, type = "") {
    status.textContent = msg;
    status.className = type;
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

    // FIX: proper email regex instead of just checking for "@"
    if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        error.textContent = "Enter a valid email address";
        field.classList.add("input-error");
        return false;
      }
    }

    error.textContent = "";
    error.remove();
    field.classList.remove("input-error");
    return true;
  }

  function validateForm() {
    let ok = true;
    inputs.forEach(i => { if (!validateField(i)) ok = false; });
    return ok;
  }

  inputs.forEach(input => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fix the errors above before sending.", "error");
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
          "SERVICE_ID",   // TODO: Replace with your EmailJS service ID
          "TEMPLATE_ID",  // TODO: Replace with your EmailJS template ID
          formData
        );

        setStatus("✔ Message delivered successfully!", "success");
        form.reset();

      } else {
        setStatus("Email service is not configured.", "error");
      }

    } catch (err) {
      setStatus("Transmission failed. Please try again or email directly.", "error");
      console.error("EmailJS error:", err);

    } finally {
      // FIX: use finally so button always re-enables
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");

      setTimeout(() => {
        status.textContent = "";
        status.className = "";
      }, 5000);
    }
  });
}

/* ======================================================
   NEURAL BACKGROUND — FIX: resize reinitializes node positions
====================================================== */
function initNeuralBackground() {
  const canvas = document.getElementById("neural-bg");
  if (!canvas) return;

  // Skip on mobile
  if (window.innerWidth < 768) return;

  const ctx = canvas.getContext("2d");

  let width, height, deepNodes, activeNodes;
  let animFrameId;

  function setup() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    // FIX: nodes re-initialized on resize
    deepNodes = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    }));

    activeNodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9
    }));
  }

  setup();

  window.addEventListener("mousemove", (e) => {
    AI_NEURAL.mouse.x = e.clientX;
    AI_NEURAL.mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener("scroll", () => {
    AI_NEURAL.scrollY = window.scrollY;
    if (window.scrollY < window.innerHeight * 0.8) AI_NEURAL.recruiterMode = 2;
    else if (window.scrollY < window.innerHeight * 1.5) AI_NEURAL.recruiterMode = 1;
    else AI_NEURAL.recruiterMode = 0;
  }, { passive: true });

  /* Pulse */
  function updatePulse() {
    AI_NEURAL.pulse += 0.03;
    requestAnimationFrame(updatePulse);
  }
  updatePulse();

  function drawLine(a, b, dist, intensity, color) {
    const opacity = (1 - dist / 160) * intensity;
    ctx.strokeStyle = color.replace("ALPHA", opacity.toFixed(3));
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function updateNode(n) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > width) n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;
  }

  function animate() {
    animFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    const pulseBoost = 1 + Math.sin(AI_NEURAL.pulse) * 0.15;
    const recruiterBoost = AI_NEURAL.recruiterMode;

    // Layer 1 — deep
    deepNodes.forEach((n, i) => {
      updateNode(n);
      ctx.fillStyle = "rgba(120,255,200,0.22)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < deepNodes.length; j++) {
        const m = deepNodes[j];
        const dx = n.x - m.x, dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) drawLine(n, m, dist, 0.25 * pulseBoost, "rgba(0,255,180,ALPHA)");
      }
    });

    // Layer 2 — active
    activeNodes.forEach((n, i) => {
      updateNode(n);
      const glow = recruiterBoost ? 0.9 : 0.5;
      ctx.fillStyle = `rgba(0,255,120,${glow})`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2.2 + recruiterBoost * 0.8, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < activeNodes.length; j++) {
        const m = activeNodes[j];
        const dx = n.x - m.x, dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) drawLine(n, m, dist, 0.6 + recruiterBoost * 0.4, "rgba(0,255,120,ALPHA)");
      }

      // Mouse beam
      const mx = AI_NEURAL.mouse.x, my = AI_NEURAL.mouse.y;
      const mdist = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
      if (mdist < 180) drawLine(n, { x: mx, y: my }, mdist, 1.2, "rgba(0,200,255,ALPHA)");
    });
  }

  animate();

  // FIX: resize re-initializes node positions
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animFrameId);
      setup();
      animate();
    }, 150);
  });
}