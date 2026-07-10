// ---------- Data ----------
const courses = [
  {
    subject: "mathematics",
    label: "Mathematics",
    time: "2 hours ago",
    title: "Quadratic Equations",
    desc: "Solving quadratic equations using factoring, completing the square & the quadratic formula.",
    tags: ["Algebra", "Algebra"],
    progress: 81,
    cta: "Continue learning",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 19 9 6l4 9 3-6 4 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    subject: "physics",
    label: "Physics",
    time: "2 days ago",
    title: "Quadratic Equations",
    desc: "Solving quadratic equations using factoring, completing the square & the quadratic formula.",
    tags: ["Newton", "Newton"],
    progress: 81,
    cta: "Continue learning",
    icon: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2" fill="currentColor"/><ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" stroke-width="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" stroke-width="1.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" stroke-width="1.6" transform="rotate(120 12 12)"/></svg>`
  },
  {
    subject: "chemistry",
    label: "Chemistry",
    time: "Never",
    title: "Quadratic Equations",
    desc: "Solving quadratic equations using factoring, completing the square & the quadratic formula.",
    tags: ["Newton", "Basics"],
    progress: 0,
    cta: "Start learning",
    icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 3v6.2L5.5 18a1.6 1.6 0 0 0 1.4 2.4h10.2a1.6 1.6 0 0 0 1.4-2.4L14 9.2V3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.5 15h9" stroke="currentColor" stroke-width="1.6"/></svg>`
  }
];

// ---------- Render course cards ----------
function renderCourses(){
  const grid = document.getElementById("courseGrid");
  grid.innerHTML = courses.map(course => `
    <article class="course-card" data-subject="${course.subject}">
      <div class="card-top">
        <div class="card-icon-wrap">${course.icon}</div>
        <div class="card-meta">
          <span class="card-subject">${course.label}</span>
          <span class="card-time">${course.time}</span>
        </div>
      </div>

      <h3 class="card-title">${course.title}</h3>
      <p class="card-desc">${course.desc}</p>

      <div class="card-tags">
        ${course.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
      </div>

      <div class="card-progress-row">
        <span class="card-progress-label">Progress</span>
        <div class="card-progress-track">
          <div class="card-progress-fill" style="--target-width:${course.progress}%"></div>
        </div>
        <span class="card-progress-pct">${course.progress}%</span>
      </div>

      <button class="btn card-btn" data-course="${course.subject}">
        ${course.cta}
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </article>
  `).join("");
}

// ---------- Animate progress bars once visible ----------
function animateProgressBars(){
  const bars = document.querySelectorAll(".progress-fill, .card-progress-fill");
  bars.forEach(bar => {
    // trigger reflow then add class so the CSS transition runs
    requestAnimationFrame(() => {
      requestAnimationFrame(() => bar.classList.add("animate"));
    });
  });
}

// ---------- Sidebar nav interaction ----------
function setupNav(){
  const items = document.querySelectorAll(".nav-item[data-nav]");
  items.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      if (item.dataset.nav === "signout") {
        if (confirm("Sign out of Lumina?")) {
          alert("You have been signed out.");
        }
        return;
      }
      items.forEach(i => i.classList.remove("is-active"));
      item.classList.add("is-active");
    });
  });
}

// ---------- Button feedback ----------
function setupButtons(){
  document.getElementById("createCourseBtn").addEventListener("click", () => {
    alert("Opening course creator…");
  });
  document.getElementById("activeCoursesBtn").addEventListener("click", () => {
    alert("You currently have 3 active courses.");
  });

  document.getElementById("courseGrid").addEventListener("click", (e) => {
    const btn = e.target.closest(".card-btn");
    if (!btn) return;
    const subject = btn.dataset.course;
    const course = courses.find(c => c.subject === subject);
    alert(`${course.cta}: ${course.label} — ${course.title}`);
  });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  setupNav();
  setupButtons();
  animateProgressBars();
});