/* =====================================================
   Dixit Patel Portfolio — Premium JS
   script.js — Upgraded, fully responsive, bug-fixed
===================================================== */

/* EmailJS init */
if (typeof emailjs !== "undefined") {
  emailjs.init("YOUR_PUBLIC_KEY"); // TODO: replace
}

/* =====================================================
   DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initCursorGlow();
  initTypingAnimation();
  initRevealAnimations();
  initScrollProgress();
  initNavShrink();
  initMobileNav();
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
  initParticles();
  initAITerminal();
  initNeuralBackground();
  initCardEntrance();
});

/* =====================================================
   GLOBAL STATE
===================================================== */
const NEURAL = {
  mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  scrollY: 0,
  pulse: 0
};

/* =====================================================
   CURSOR GLOW
===================================================== */
function initCursorGlow() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  let raf;
  let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
  let cx = tx, cy = ty;

  document.addEventListener("mousemove", e => {
    tx = e.clientX;
    ty = e.clientY;
  });

  function animate() {
    cx += (tx - cx) * 0.15;
    cy += (ty - cy) * 0.15;
    glow.style.left = cx + "px";
    glow.style.top  = cy + "px";
    raf = requestAnimationFrame(animate);
  }
  animate();
}

/* =====================================================
   TYPING ANIMATION
===================================================== */
function initTypingAnimation() {
  const roles = [
    "Senior Software Engineer – AI",
    "Senior AI Engineer",
	"Applied AI Engineer",
	"AI Research Scientist",
	"Generative AI Engineer",
    "Python Expert",
	"AI Platform Engineer",
	"Senior Full-Stack Engineer",
	"AI Solutions Architect"
  ];

  const target = document.getElementById("typing-text");
  if (!target) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.textContent = roles[0];
    return;
  }

  let roleIndex = 0, charIndex = 0, deleting = false;

  function loop() {
    const role = roles[roleIndex];
    target.textContent = role.substring(0, charIndex);

    if (!deleting) charIndex++;
    else charIndex--;

    let speed = deleting ? 42 : 85;

    if (!deleting && charIndex > role.length) {
      deleting = true;
      speed = 1600;
    }

    if (deleting && charIndex <= 0) {
      deleting = false;
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500;
    }

    setTimeout(loop, speed);
  }

  loop();
}

/* =====================================================
   COUNTERS
===================================================== */
function initCounters() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".counter").forEach(el => {
      el.textContent = el.dataset.target + "+";
    });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      let count = 0;
      const speed = Math.max(target / 65, 0.08);
      const tick = () => {
        count += speed;
        if (count < target) {
          el.textContent = Math.ceil(count);
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + "+";
        }
      };
      tick();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".counter").forEach(c => observer.observe(c));
}

/* =====================================================
   REVEAL ANIMATIONS
===================================================== */
function initRevealAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* =====================================================
   CARD ENTRANCE (staggered)
===================================================== */
function initCardEntrance() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent = entry.target;
      const cards = parent.querySelectorAll(".card");
      cards.forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(24px)";
        card.style.transition = "opacity .6s ease, transform .6s ease";
        setTimeout(() => {
          card.style.opacity = "";
          card.style.transform = "";
        }, i * 80);
      });
      observer.unobserve(parent);
    });
  }, { threshold: 0.05 });

  document.querySelectorAll(".cards-grid").forEach(grid => {
    observer.observe(grid);
  });
}

/* =====================================================
   SCROLL PROGRESS
===================================================== */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = Math.min((window.scrollY / h) * 100, 100) + "%";
  }, { passive: true });
}

/* =====================================================
   NAV SHRINK
===================================================== */
function initNavShrink() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("shrink", window.scrollY > 60);
  }, { passive: true });
}

/* =====================================================
   MOBILE NAV — FIXED
===================================================== */
function initMobileNav() {
  const hamburger = document.getElementById("navHamburger");
  const menu = document.getElementById("navMenu");
  if (!hamburger || !menu) return;

  function openMenu() {
    menu.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Close when link clicked
  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("open")) closeMenu();
  });

  // Close on outside click
  document.addEventListener("click", e => {
    if (
      menu.classList.contains("open") &&
      !menu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Ensure hamburger resets on resize to desktop
  const mq = window.matchMedia("(min-width: 901px)");
  mq.addEventListener("change", e => {
    if (e.matches) closeMenu();
  });
}

/* =====================================================
   THEME TOGGLE
===================================================== */
function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const saved = localStorage.getItem("dp-theme");
  if (saved === "light") {
    document.body.dataset.theme = "light";
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    const isLight = document.body.dataset.theme === "light";
    document.body.dataset.theme = isLight ? "" : "light";
    toggle.textContent = isLight ? "🌙" : "☀️";
    localStorage.setItem("dp-theme", isLight ? "" : "light");
  });
}

/* =====================================================
   MODAL
===================================================== */
function initPortfolioModal() {
  const modal    = document.getElementById("modal");
  const titleEl  = document.getElementById("modal-title");
  const bodyEl   = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");
  const backdrop = modal?.querySelector(".modal-backdrop");

  if (!modal || !titleEl || !bodyEl || !closeBtn) return;

  const projectData = {
    rag:        "Designed AI-powered solutions and Retrieval-Augmented Generation (RAG) applications that improved secure access to enterprise data through security-trimmed retrieval, ensuring users only accessed authorized information while speeding up decision-making and reducing the time spent searching for critical data.",
    agent:      "Built intelligent AI automation agents using Copilot Studio and workflows that simplified multi-step business processes, reducing repetitive manual work and improving overall operational efficiency.",
    backend:    "Improved algorithmic and backend performance in a manufacturing software role by leveraging efficient data structures, resulting in approximately 33% higher execution efficiency along with better system responsiveness, reliability, and user productivity.",
    healthcare: "Designed and developed mobile health applications for healthcare professionals that supported real-world clinical workflows. These solutions exceeded client expectations and helped secure over $1 million in research grant funding for subsequent project phases."
  };
	
	const experienceData = {
		caterpillar: {
			title: "Senior Software Engineer - AI",
			details: [
				"AI Solution Engineering: Developed scalable AI software using Python, cloud infrastructure, and modern Generative AI to optimize business workflows.",
				
				"RAG Implementation: Led the design of secure, RAG-based web applications, enabling efficient natural-language querying of enterprise data.",

				"LLM Integration: Architected robust production pipelines for LLMs, ensuring secure backend integration and controlled AI interactions.",

				"AI Automation: Built intelligent agents in Microsoft Copilot Studio to automate complex tasks and streamline operations.",

				"Quality & Validation: Owned end-to-end testing, validation, and performance benchmarking for AI applications prior to rollout.",

				"Cross-Functional Leadership: Partnered with stakeholders and engineering teams to translate business needs into scalable, high-impact technical designs.",

				"Engineering Excellence: Championed continuous improvement, code quality, and best practices across the development lifecycle.",

				"Applied Research: Remained at the forefront of GenAI and LLM advancements, proactively identifying opportunities to introduce new capabilities."
			]
		},

		fabricators: {
			title: "Software Engineer",
			details: [
				"Backend Optimization: Designed and implemented Python-based solutions for manufacturing, significantly enhancing system efficiency, reliability, and maintainability.",
				"Performance Engineering: Engineered algorithmic and data-structure improvements that increased execution performance by ~33%, prioritizing scalable design.",
				"API & Service Integration: Developed robust RESTful services using Python, JSON, and MySQL to ensure reliable data exchange across internal platforms.",
				"Data Workflow Management: Built structured data processing and validation pipelines to support operational analytics and informed decision-making.",
				"Quality Assurance: Conducted rigorous peer code reviews and enforced coding standards to ensure high-quality, production-ready software.",
				"DevOps & Collaboration: Managed source control via Git/GitHub, facilitating efficient team collaboration and continuous integration.",
				"Engineering Fundamentals: Applied advanced OOD, data structures, and algorithms across the full development lifecycle to build robust, extensible solutions."
			]
		},

		wright: {
			title: "Graduate Research Assistant",
			details: [
				"Mobile Applications' Development: Led the development of mobile healthcare applications using Python and C# to optimize clinical workflows and improve patient care delivery.",
				"Research-to-Production: Translated complex research concepts into high-quality software, exceeding client expectations and securing over $1M in grant funding for project expansion.",
				"Quality Assurance: Designed and implemented comprehensive unit test suites, ensuring the robustness, reliability, and long-term maintainability of deployed systems.",
				"Backend & Database Architecture: Built secure backend components and integrated MySQL databases to support efficient data storage, retrieval, and application logic.",
				"Engineering Principles: Applied OOD, modular architecture, and efficient data structures to build scalable, extensible healthcare applications.",
				"Stakeholder Collaboration: Partnered with multidisciplinary teams and external stakeholders to align technical development with overarching project goals.",
				"Mentorship: Provided technical guidance to junior team members, fostering a collaborative and productive research and development environment."
			]
		},

		lnt: {
			title: "Software Engineer",
			details: [
				"Enterprise Software Development: Contributed to end-to-end feature delivery for customized enterprise solutions using a Python-based technology stack.",
				"Feature Engineering: Partnered with senior engineers to implement and enhance application features, ensuring strict adherence to system requirements and performance targets.",
				"AI Proof-of-Concept: Designed and developed an AI model-based POC for automated product quality control, leveraging Python libraries for complex data analysis.",
				"Computer Vision Optimization: Developed and validated computer vision models to significantly improve defect detection accuracy and product quality assessment.",
				"Testing & Documentation: Executed comprehensive software testing, validation, and documentation to ensure high-quality, reliable, and production-ready codebases."
			]
		}
	};
	
	function openModal(card) {
		const key = card.dataset.project || card.dataset.exp;
		const isProject = card.classList.contains("project");
		
		// Retrieve the data object based on the type
		const data = isProject ? projectData[key] : experienceData[key];

		// Set the title
		titleEl.textContent = data?.title || card.querySelector("h3,h4")?.textContent || "Details";

		// Clear existing body content
		bodyEl.innerHTML = ""; 

		// If the data has a 'details' array, create a list
		if (data && Array.isArray(data.details)) {
			const list = document.createElement("ul");
			list.style.listStyleType = "disc"; // Ensure bullets are visible
			list.style.paddingLeft = "20px";
			
			data.details.forEach(point => {
				const li = document.createElement("li");
				li.textContent = point;
				li.style.marginBottom = "0.5rem"; // Add some spacing between bullets
				list.appendChild(li);
			});
			bodyEl.appendChild(list);
		} else {
			// Fallback if it's just a simple string
			bodyEl.textContent = data || "";
		}

		modal.style.display = "flex";
		document.body.style.overflow = "hidden";
		setTimeout(() => closeBtn.focus(), 50);
	}

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".card.experience, .card.project").forEach(card => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(card); }
    });
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

/* =====================================================
   SMOOTH NAV HIGHLIGHT
===================================================== */
function initSmoothNavHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");
  if (!sections.length || !links.length) return;

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }, { passive: true });
}

/* =====================================================
   TRACKING
===================================================== */
function initTracking() {
  document.querySelectorAll(".track").forEach(item => {
    item.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", item.dataset.event, { event_category: "portfolio" });
      }
    });
  });
}

/* =====================================================
   BACK TO TOP
===================================================== */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* =====================================================
   SKILL FILTERS
===================================================== */
function initSkillFilters() {
  const buttons = document.querySelectorAll(".skill-filter");
  const cards   = document.querySelectorAll("#skills .card[data-category]");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

/* =====================================================
   TILT CARDS — 3D
===================================================== */
function initTiltCards() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      const rx = -(y - r.height / 2) / 16;
      const ry =  (x - r.width  / 2) / 16;

      card.style.setProperty("--mx", `${(x / r.width)  * 100}%`);
      card.style.setProperty("--my", `${(y / r.height) * 100}%`);
      card.style.transform =
        `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.015)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.removeProperty("--mx");
      card.style.removeProperty("--my");
    });
  });
}

/* =====================================================
   AI BUBBLE
===================================================== */
function initAIBubble() {
  const toggle = document.getElementById("aiToggle");
  const panel  = document.getElementById("aiPanel");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", e => {
    e.stopPropagation();
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".ai-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const link = btn.dataset.link;
      if (!link) return;
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

/* =====================================================
   AI TERMINAL
===================================================== */
function initAITerminal() {
  const terminal = document.getElementById("consoleBody");
  const metrics  = document.getElementById("terminalMetrics");
  if (!terminal || !metrics) return;

  // Live metrics
  function updateMetrics() {
    const cpu    = Math.floor(28 + Math.random() * 45);
    const ram    = Math.floor(42 + Math.random() * 45);
    const ping   = Math.floor(6  + Math.random() * 22);
    const agents = 1 + Math.floor(Math.random() * 5);
    const time   = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit", second:"2-digit" });

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
  setInterval(updateMetrics, 1200);

  const sequences = [
    { cmd: "initialize portfolio",  result: "Senior AI Engineer profile loaded" },
    { cmd: "load experience",       result: "7+ years engineering modules ready" },
    { cmd: "scan skills",           result: "LLMs | RAG | Python | Backend | Cloud" },
    { cmd: "fetch projects",        result: "Enterprise systems synchronized" },
    { cmd: "detect visitor",        result: "Recruiter traffic identified" },
    { cmd: "run ml_inference --benchmark", result: "Throughput: 2,400 tokens/sec" },
    { cmd: "opportunity status",    result: "READY FOR INTERVIEW" },
    { cmd: "system health --check", result: "All services nominal" }
  ];

  let idx = 0;

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
        setTimeout(type, 32);
      } else {
        line.innerHTML = `<span class="prompt">DIXIT@AI:~$ </span>` + text;
        done();
      }
    }
    type();
  }

  function printResult(text) {
    const r = document.createElement("div");
    r.className = "console-line result-line";
    r.textContent = `  › ${text}`;
    terminal.appendChild(r);

    const bar = document.createElement("div");
    bar.className = "loadbar";
    bar.innerHTML = `<span></span>`;
    terminal.appendChild(bar);

    terminal.scrollTop = terminal.scrollHeight;
  }

  function run() {
    if (idx >= sequences.length) {
      setTimeout(() => {
        terminal.innerHTML = "";
        idx = 0;
        run();
      }, 2400);
      return;
    }
    const item = sequences[idx];
    typeLine(item.cmd, () => {
      setTimeout(() => {
        printResult(item.result);
        idx++;
        setTimeout(run, 900);
      }, 200);
    });
  }

  run();
}

/* =====================================================
   CONTACT FORM
===================================================== */
function initContactForm() {
  const form      = document.getElementById("contact-form");
  const status    = document.getElementById("form-status");
  const submitBtn = form?.querySelector("button[type='submit']");
  if (!form || !status || !submitBtn) return;

  const inputs = form.querySelectorAll("input, textarea");

  function setStatus(msg, type = "") {
    status.textContent = msg;
    status.className = type;
  }

  function validateField(field) {
    const wrapper = field.closest(".form-field");
    let err = wrapper.querySelector(".error-msg");
    if (!err) {
      err = document.createElement("div");
      err.className = "error-msg";
      wrapper.appendChild(err);
    }

    if (!field.value.trim()) {
      err.textContent = "This field is required";
      field.classList.add("input-error");
      return false;
    }

    if (field.type === "email") {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(field.value)) {
        err.textContent = "Enter a valid email address";
        field.classList.add("input-error");
        return false;
      }
    }

    err.textContent = "";
    err.remove?.();
    field.classList.remove("input-error");
    return true;
  }

  inputs.forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("input-error")) validateField(input);
    });
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    let valid = true;
    inputs.forEach(i => { if (!validateField(i)) valid = false; });
    if (!valid) { setStatus("Please fix the errors above.", "error"); return; }

    submitBtn.disabled = true;
    submitBtn.classList.add("loading");
    setStatus("Sending message…", "loading");

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      if (typeof emailjs !== "undefined") {
        await emailjs.send("SERVICE_ID", "TEMPLATE_ID", data);
        setStatus("✔ Message sent successfully!", "success");
        form.reset();
      } else {
        setStatus("Email service not configured.", "error");
      }
    } catch (err) {
      setStatus("Failed to send. Please email directly.", "error");
      console.error("EmailJS:", err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
      setTimeout(() => { status.textContent = ""; status.className = ""; }, 6000);
    }
  });
}

/* =====================================================
   NEURAL BACKGROUND
===================================================== */
function initNeuralBackground() {
  const canvas = document.getElementById("neural-bg");
  if (!canvas) return;
  if (window.innerWidth < 768) return;

  const ctx = canvas.getContext("2d");
  let width, height, deepNodes, activeNodes, animId;

  function setup() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;

    deepNodes = Array.from({ length: 80 }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22
    }));

    activeNodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .85, vy: (Math.random() - .5) * .85
    }));
  }

  setup();

  window.addEventListener("mousemove", e => {
    NEURAL.mouse.x = e.clientX;
    NEURAL.mouse.y = e.clientY;
  }, { passive: true });

  // Pulse
  (function tick() {
    NEURAL.pulse += .025;
    requestAnimationFrame(tick);
  })();

  function drawLine(a, b, dist, intensity, r, g, b_val) {
    const alpha = (1 - dist / 160) * intensity;
    ctx.strokeStyle = `rgba(${r},${g},${b_val},${alpha.toFixed(3)})`;
    ctx.lineWidth = .7;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function updateNode(n) {
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > width)  n.vx *= -1;
    if (n.y < 0 || n.y > height) n.vy *= -1;
  }

  function animate() {
    animId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    const pb = 1 + Math.sin(NEURAL.pulse) * .12;

    deepNodes.forEach((n, i) => {
      updateNode(n);
      ctx.fillStyle = "rgba(120,255,200,0.18)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      for (let j = i + 1; j < deepNodes.length; j++) {
        const m = deepNodes[j];
        const dx = n.x - m.x, dy = n.y - m.y;
        const d = Math.hypot(dx, dy);
        if (d < 140) drawLine(n, m, d, .22 * pb, 0, 255, 180);
      }
    });

    activeNodes.forEach((n, i) => {
      updateNode(n);
      ctx.fillStyle = "rgba(0,255,120,0.55)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2.0, 0, Math.PI * 2);
      ctx.fill();
      for (let j = i + 1; j < activeNodes.length; j++) {
        const m = activeNodes[j];
        const d = Math.hypot(n.x - m.x, n.y - m.y);
        if (d < 150) drawLine(n, m, d, .55 * pb, 0, 255, 120);
      }
      const mx = NEURAL.mouse.x, my = NEURAL.mouse.y;
      const md = Math.hypot(n.x - mx, n.y - my);
      if (md < 170) drawLine(n, { x: mx, y: my }, md, 1.1, 0, 200, 255);
    });
  }

  animate();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animId);
      setup();
      animate();
    }, 200);
  });
}

/* =====================================================
   PARTICLES
===================================================== */
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  if (window.innerWidth < 768) return;

  const ctx = canvas.getContext("2d");
  let width, height, particles;

  function setup() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: .8 + Math.random() * .8
    }));
  }

  setup();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width)  p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(96,200,255,0.45)";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 200);
  });
}
