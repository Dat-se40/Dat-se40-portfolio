const cases = {
  dictionary: {
    eyebrow: "Desktop Application · 2026",
    title: "Royal Blueberry Dictionary",
    lead: "An English dictionary built as a client–server application, transitioning from a NoSQL structure to a robust SQL relational model.",
    body: "Royal Blueberry started as a WPF dictionary and evolved into a structured client–server application. I completely refactored the architecture, migrating from a NoSQL JSON structure to an SQL relational database model leveraging Dependency Injection. The backend relies on Spring Boot, handling JWT authentication, Google OAuth2, external dictionary APIs, and a semantic search pipeline. This project shifted my perspective from treating the UI as the entire system to connecting a desktop app securely to a structured backend.",
    meta: [
      "Client", "C# · WPF · .NET",
      "Backend", "Java · Spring Boot",
      "Architecture", "SQL Relational Model · Dependency Injection",
      "AI", "Embedding · Semantic Search",
      "Deployment", "Docker"
    ],
    // THÊM ARRAY LINKS
    links: [
      { label: "Backend Repo", url: "https://github.com/Dat-se40/Royal-Blueberry-Dictionary-BE" },
      { label: "Frontend Repo", url: "https://github.com/Dat-se40/Royal-Blueberry-Dictionary-FE" }
    ],
    img: "assets/royalblue_login.png"
  },

  bommy: {
    eyebrow: "Multiplayer Game · 2026",
    title: "Bommy",
    lead: "A networked, multiplayer Bomberman-style game built around a P2P lobby architecture.",
    body: "Bommy is a Unity multiplayer project where I led a 4-person team over a two-month timeline to build networked gameplay. Instead of standard dedicated server infrastructure, we engineered a P2P lobby architecture to handle matchmaking, game state, and destructible environments. Working on Bommy pushed me to solve concurrency issues and think about game state as something synchronized across peers rather than existing inside a single Unity instance.",
    meta: [
      "Engine", "Unity 6 · C#",
      "Architecture", "P2P Lobby Architecture",
      "Role", "Team Lead · Networking",
      "Features", "Matchmaking · State Synchronization"
    ],
    // THÊM ARRAY LINKS
    links: [
      { label: "GitHub Repo", url: "https://github.com/Dat-se40/Bommy" }
    ],
    img: "assets/bommy_classic.png"
  },

  mosquizto: {
    eyebrow: "Android + Backend · 2026",
    title: "Mosquizto",
    lead: "A collaborative learning platform combining an Android client with a service-oriented backend.",
    body: "Mosquizto is a flashcard-based learning platform supporting multiple learning modes, streaks, and real-time social features. On the backend, the system utilizes Spring Boot, PostgreSQL, and Redis. A key architectural decision was integrating Meilisearch instead of Elasticsearch specifically to optimize server memory usage while retaining powerful indexing. Working across the client and backend gave me a broader view of how authentication, persistence, targeted caching, and real-time WebSocket communication fit together.",
    meta: [
      "Client", "Android · Java",
      "Backend", "Java · Spring Boot",
      "Database", "PostgreSQL · Redis",
      "Search", "Meilisearch (Optimized Memory)",
      "Infrastructure", "Docker · WebSocket"
    ],
    // THÊM ARRAY LINKS
    links: [
      { label: "Android Repo", url: "https://github.com/Dat-se40/Mosquizto" },
      { label: "Backend Repo", url: "https://github.com/hcyk268/mosquizto-backend-service" }
    ],
    img: "assets/mos_learn.png"
  },

  genesis: {
    eyebrow: "Game · 2026",
    title: "Genesis",
    lead: "A 2D pixel RPG combining visual novel elements and educational puzzles for UIT's 20th anniversary.",
    body: "Pitched as 'UIT Freshman Survival', Genesis puts the player in the role of a new student exploring a futuristic pixel-art version of the campus. The player interacts with NPCs, collects clues, and solves IT-related logic puzzles to restore the university's central server. The project seamlessly integrates visual novel dialogue systems with exploration mechanics. It was developed as part of the Double2T team and secured Second Place in the game category.",
    meta: [
      "Engine", "Unity",
      "Genre", "2D Pixel RPG · Visual Novel · Puzzle",
      "Platform", "Windows",
      "Team", "Double2T",
      "Result", "Second Place · Game Category"
    ],
    // THÊM ARRAY LINKS
    links: [
      { label: "GitHub Repo", url: "https://github.com/thichcodedao2006/Genesis" }
    ],
    img: "assets/poster.jpg"
  }
};
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalLead = document.getElementById("modalLead");
const modalBody = document.getElementById("modalBody");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalMeta = document.getElementById("modalMeta");
const modalLinks = document.getElementById("modalLinks"); // Thêm dòng khai báo DOM này
function openCase(key) {
  const c = cases[key];
  if (!c) return;
  modalImg.src = c.img;
  modalTitle.textContent = c.title;
  modalLead.textContent = c.lead;
  modalBody.textContent = c.body;
  modalEyebrow.textContent = c.eyebrow;
  
  // Render tags
  modalMeta.innerHTML = "";
  for (let i = 0; i < c.meta.length; i += 2) {
    const li = document.createElement("li");
    li.innerHTML = `<b>${c.meta[i]}</b>${c.meta[i + 1]}`;
    modalMeta.appendChild(li);
  }

  // Khúc này render các nút Links
  modalLinks.innerHTML = "";
  if (c.links && c.links.length > 0) {
    c.links.forEach(link => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.className = "chip ghost"; // Dùng class ghost có sẵn cho đẹp
      a.style.padding = "6px 12px"; 
      a.style.display = "inline-flex";
      a.style.alignItems = "center";
      a.style.gap = "6px";
      a.style.transition = "background .25s, color .25s";
      a.innerHTML = `<span style="font-size: 14px;">↗</span> ${link.label}`;
      
      // Thêm hiệu ứng hover nhẹ nhàng
      a.onmouseover = () => { a.style.background = "var(--burly)"; a.style.color = "var(--ink)"; };
      a.onmouseout = () => { a.style.background = "transparent"; a.style.color = "var(--burly)"; };

      modalLinks.appendChild(a);
    });
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => openCase(card.dataset.case));
  card.setAttribute("tabindex", "0");
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter") openCase(card.dataset.case);
  });
});
modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.toggle("is-on", t === tab);
      t.setAttribute("aria-selected", t === tab ? "true" : "false");
    });
    document.querySelectorAll(".pills").forEach((p) => {
      p.classList.toggle("is-hidden", p.dataset.panel !== tab.dataset.tab);
    });
  });
});

let counted = false;
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || counted) return;
    counted = true;
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      const start = performance.now();
      const dur = 1100;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-US");
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  });
}, { threshold: 0.25 });
document.querySelectorAll(".stats, .gh-kpis").forEach((el) => io.observe(el));

const toast = document.getElementById("toast");
document.getElementById("shareBtn").addEventListener("click", async () => {
  const url = location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: "Dat — Dat-se40", url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.textContent = "Link copied";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    }
  } catch {
    toast.textContent = "Link copied";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  }
});

const cursor = document.querySelector(".cursor");
if (cursor && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.querySelectorAll("a, button, .card").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("grow"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
  });
}
async function buildGraphAndUpdateStats() {
  const root = document.getElementById("ghGraph");
  const monthsEl = document.getElementById("ghMonths");
  const yearCountEl = document.getElementById("ghYearCount");
  
  const username = "Dat-se40";
  const graphApiUrl = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;
  const userApiUrl = `https://api.github.com/users/${username}`;

  try {
    // Kéo data song song để tiết kiệm thời gian
    const [graphRes, userRes] = await Promise.all([
      fetch(graphApiUrl),
      fetch(userApiUrl)
    ]);

    // Xử lý Graph & Total Contributions
    if (graphRes.ok) {
      const data = await graphRes.json();
      const days = data.contributions || [];
      const total = data.total?.lastYear ?? 0;

      if (yearCountEl) yearCountEl.textContent = total.toLocaleString("en-US");

      // Cập nhật DOM data-count cho contributions
      document.getElementById("stat-contrib")?.setAttribute("data-count", total);
      document.getElementById("stat-contrib-top")?.setAttribute("data-count", total);

      if (days.length && root && monthsEl) {
        const first = new Date(days[0].date + "T00:00:00");
        const firstDay = first.getDay();
        const cells = Array.from({ length: firstDay }, () => null).concat(days);
        while (cells.length % 7 !== 0) cells.push(null);

        const weeks = cells.length / 7;
        const monthMarks = new Array(weeks).fill("");
        let lastMonth = -1;

        for (let week = 0; week < weeks; week++) {
          const entry = cells[week * 7];
          if (!entry) continue;
          const date = new Date(entry.date + "T00:00:00");
          const month = date.getMonth();
          if (month !== lastMonth) {
            monthMarks[week] = date.toLocaleString("en", { month: "short" });
            lastMonth = month;
          }
        }

        monthsEl.innerHTML = monthMarks.map((m) => `<span>${m}</span>`).join("");
        monthsEl.style.gridTemplateColumns = `repeat(${weeks}, 11px)`;

        root.innerHTML = "";
        const fragment = document.createDocumentFragment();
        for (let week = 0; week < weeks; week++) {
          for (let day = 0; day < 7; day++) {
            const entry = cells[week * 7 + day];
            const cell = document.createElement("i");
            if (entry) {
              const level = Number(entry.level) || 0;
              cell.className = `l${level}`;
              cell.title = `${entry.date} · ${entry.count} contribution${entry.count === 1 ? "" : "s"}`;
            } else {
              cell.style.opacity = "0";
            }
            fragment.appendChild(cell);
          }
        }
        root.appendChild(fragment);
      }
    }

    // Xử lý thông số User Stats hiện tại
    if (userRes.ok) {
      const userData = await userRes.json();
      document.getElementById("stat-repos")?.setAttribute("data-count", userData.public_repos);
      document.getElementById("stat-repos-top")?.setAttribute("data-count", userData.public_repos);
      document.getElementById("stat-followers")?.setAttribute("data-count", userData.followers);
      document.getElementById("stat-following")?.setAttribute("data-count", userData.following);
    }

  } catch (error) {
    console.error("Failed to load GitHub data:", error);
  } finally {
    // 3. TRIGGER ANIMATION ĐẾM SỐ SAU KHI ĐÃ CẬP NHẬT DATA
    initCounterAnimation();
  }
}

function initCounterAnimation() {
  let counted = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || counted) return;
      counted = true;
      document.querySelectorAll("[data-count]").forEach((el) => {
        const target = Number(el.getAttribute("data-count"));
        const start = performance.now();
        const dur = 1100;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased).toLocaleString("en-US");
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(".stats, .gh-kpis").forEach((el) => io.observe(el));
}

// Khởi chạy
buildGraphAndUpdateStats();
const startYear = 2024;
const currentYear = new Date().getFullYear();
const yearsAtUIT = Math.max(1, currentYear - startYear);
document.getElementById("stat-years-top")?.setAttribute("data-count", yearsAtUIT);

function initPureGoldDust() {
  const canvas = document.getElementById("gold-dust-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 80; // Số lượng hạt bụi
  const particles = [];
  const goldColors = ["rgba(214, 187, 128, ", "rgba(240, 204, 117, ", "rgba(184, 149, 77, "];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      color: goldColors[Math.floor(Math.random() * goldColors.length)],
      alpha: Math.random(),
      speedAlpha: (Math.random() * 0.01 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: Math.random() * 0.3 - 0.15
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.alpha += p.speedAlpha;

      // Đảo chiều mờ/sáng để tạo hiệu ứng lấp lánh (sparkle)
      if (p.alpha <= 0.1 || p.alpha >= 0.85) {
        p.speedAlpha = -p.speedAlpha;
      }

      // Reset vị trí khi hạt bay ra khỏi viền màn hình
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Vẽ hạt bụi
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.alpha))})`;
      ctx.shadowBlur = p.size * 3;
      ctx.shadowColor = "#f0cc75";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Kích hoạt khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", initPureGoldDust);