const DB = {
  posts: [
    {
      id: 1,
      title: "مستقبل الذكاء الاصطناعي في عالم التكنولوجيا",
      slug: "future-of-ai",
      excerpt:
        "استكشاف أحدث التطورات في مجال الذكاء الاصطناعي وتأثيرها على حياتنا اليومية والمستقبل القريب.",
      content: `<p class="lead">يشهد عالم الذكاء الاصطناعي تطورات مذهلة ومتسارعة، حيث تتنوع تطبيقاته من الطب إلى التعليم، ومن النقل إلى الترفيه.</p><h2>التطورات الحديثة في الذكاء الاصطناعي</h2><p>شهدت السنوات الماضية قفزات نوعية في التعلم العميق ومعالجة اللغات الطبيعية.</p><blockquote>الذكاء الاصطناعي ثورة ستغير طريقة تفاعلنا مع العالم.</blockquote><h2>التطبيقات العملية</h2><ul><li><strong>الطب:</strong> تشخيص الأمراض والعلاجات الشخصية</li><li><strong>التعليم:</strong> أنظمة تعلم تكيفية</li><li><strong>النقل:</strong> سيارات ذاتية القيادة</li></ul>`,
      image: "./assets/images/Ai.jpg",
      category: "تقنية",
      tags: ["الذكاء الاصطناعي", "تقنية", "مستقبل"],
      published_at: "2024-12-15",
    },
    {
      id: 2,
      title: "استراتيجيات التسويق الرقمي",
      slug: "digital-marketing-strategies",
      excerpt: "أحدث الطرق للوصول إلى جمهورك المستهدف وتحقيق نتائج ملموسة.",
      content: `<p class="lead">التسويق المبني على البيانات يحقق نتائج قابلة للقياس.</p><h2>القنوات الفعالة</h2><p>محركات البحث، الشبكات الاجتماعية، والبريد الإلكتروني.</p>`,
      image: "./assets/images/digital-marketing.jpeg",
      category: "تسويق",
      tags: ["تسويق", "SEO", "رقمي"],
      published_at: "2024-12-01",
    },
    {
      id: 3,
      title: "أساسيات تصميم واجهات المستخدم",
      slug: "ui-design-basics",
      excerpt:
        "كيفية إنشاء تصاميم جذابة وسهلة الاستخدام مع أحدث اتجاهات التصميم.",
      content: `<p class="lead">تعرف على مبادئ التباين والتدرج البصري والمسافات.</p><h2>الطباعة والألوان</h2><p>اختيار الخطوط والألوان يؤثر مباشرة على تجربة المستخدم.</p>`,
      image: "./assets/images/ui-design.webp",
      category: "تصميم",
      tags: ["UI", "UX", "تصميم"],
      published_at: "2024-12-03",
    },
    {
      id: 4,
      title: "أمن المعلومات في العصر الرقمي",
      slug: "cybersecurity-digital-age",
      excerpt:
        "كيفية حماية بياناتك الشخصية والمؤسسية من التهديدات السيبرانية المتزايدة.",
      content: `<p class="lead">الأمن السيبراني أصبح ضرورة حتمية في عالمنا الرقمي المتصل.</p><h2>أنواع التهديدات</h2><p>من الفيروسات إلى الهجمات المتقدمة المستمرة.</p>`,
      image: "./assets/images/cybersecurity.jpeg",
      category: "أمان",
      tags: ["أمن المعلومات", "حماية", "خصوصية"],
      published_at: "2024-11-25",
    },
    {
      id: 5,
      title: "تطوير تطبيقات الهاتف المحمول",
      slug: "mobile-app-development",
      excerpt:
        "دليل شامل لتطوير تطبيقات الهاتف المحمول باستخدام أحدث التقنيات والأدوات.",
      content: `<p class="lead">تعلم كيفية بناء تطبيقات محمولة احترافية تلبي احتياجات المستخدمين.</p><h2>اختيار المنصة المناسبة</h2><p>مقارنة بين التطوير الأصلي والهجين والويب.</p>`,
      image: "./assets/images/mobile-app-development.jpg",
      category: "تطوير",
      tags: ["تطبيقات", "موبايل", "تطوير"],
      published_at: "2024-11-28",
    },
    {
      id: 6,
      title: "تعلم JavaScript من الصفر",
      slug: "learn-javascript-from-scratch",
      excerpt:
        "دليل شامل لتعلم لغة البرمجة الأكثر شعبية مع أمثلة عملية وتطبيقات حقيقية.",
      content: `<p class="lead">ابدأ رحلتك مع JavaScript بأساسيات قوية وأمثلة عملية.</p><h2>المتغيرات والدوال</h2><p>فهم الأساسيات أولاً يبني قاعدة قوية.</p><h2>التعامل مع DOM</h2><p>كيف تتفاعل مع عناصر الصفحة ديناميكياً.</p>`,
      image: "./assets/images/javascript-learning.jpeg",
      category: "برمجة",
      tags: ["JavaScript", "ويب", "برمجة"],
      published_at: "2024-12-05",
    },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCarousel();
  initPage();
  initScrollTop();
});

function initNav() {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector(".header");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", String(open));
      const icon = menuBtn.querySelector("i");
      icon.classList.toggle("fa-times");
    });
  }

  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        header.classList.toggle("scrolled", window.scrollY > 80);
      },
      { passive: true }
    );
  }
}

function initCarousel() {
  // Initialize Swiper: build slides from DB.posts and mount Swiper
  const container = document.getElementById("featuredSwiper");
  if (!container || typeof Swiper === "undefined") return;

  const wrapper = container.querySelector(".swiper-wrapper");
  if (!wrapper) return;

  // Use first 4 posts as featured (or fewer if not available)
  // sort by numeric id (ascending) without mutating the original DB.posts
  const featured = DB.posts
    .slice()
    .sort((a, b) => a.id - b.id)
    .slice(0, 4);
  wrapper.innerHTML = featured
    .map(
      (p) => `
      <div class="swiper-slide">
        <div class="slide-image"><img src="${p.image}" alt="${p.title}"></div>
        <div class="slide-overlay">
          <span class="slide-category">${p.category}</span>
          <h2 class="slide-title">${p.title}</h2>
          <p class="slide-excerpt">${p.excerpt}</p>
          <a href="article.html?slug=${p.slug}" class="slide-cta">اقرأ المزيد <i class="fas fa-arrow-left"></i></a>
        </div>
      </div>
    `
    )
    .join("");

  // add pagination/navigation elements
  if (!container.querySelector(".swiper-pagination")) {
    const pag = document.createElement("div");
    pag.className = "swiper-pagination";
    container.appendChild(pag);
  }
  if (!container.querySelector(".swiper-button-next")) {
    const next = document.createElement("div");
    next.className = "swiper-button-next carousel-btn";
    next.innerHTML = '<i class="fas fa-chevron-left"></i>';
    container.appendChild(next);
  }
  if (!container.querySelector(".swiper-button-prev")) {
    const prev = document.createElement("div");
    prev.className = "swiper-button-prev carousel-btn";
    prev.innerHTML = '<i class="fas fa-chevron-right"></i>';
    container.appendChild(prev);
  }

  // init swiper
  try {
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper(container, {
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "slide",
    });
  } catch (e) {
    // silent
  }
}

function initPage() {
  const path = location.pathname;
  if (path.includes("article.html")) renderArticle();
  else if (path.includes("index.html") || path.endsWith("/")) renderHome();
  else if (path.includes("posts.html")) renderHome();
  if (path.includes("signin.html")) initForm("signin");
  if (path.includes("signup.html")) initForm("signup");
  if (path.includes("contact.html")) initForm("contact");
}

function initScrollTop() {
  const btn = document.createElement("button");
  btn.className = "scroll-top";
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.appendChild(btn);

  window.addEventListener(
    "scroll",
    () => {
      const show = window.scrollY > 500;
      btn.style.opacity = show ? "1" : "0";
      btn.style.visibility = show ? "visible" : "hidden";
    },
    { passive: true }
  );
}

function renderHome() {
  const grid = document.getElementById("postsGrid");
  const sidebar = document.getElementById("homeSidebar");
  if (!grid) return;

  // do not mutate DB.posts; sort a shallow copy by numeric id (ascending)
  const posts = DB.posts.slice().sort((a, b) => a.id - b.id);

  grid.innerHTML = posts
    .map(
      (p) => `
    <article class="post-card" onclick="location.href='article.html?slug=${
      p.slug
    }'">
      <div class="post-image">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="post-category">${p.category}</span>
      </div>
      <div class="post-content">
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class="post-footer">
          <span><i class="fas fa-user"></i> فضاء التقنية..</span>
          <span><i class="fas fa-calendar"></i> ${formatDate(
            p.published_at
          )}</span>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  if (sidebar) {
    const categories = [...new Set(posts.map((p) => p.category))];
    const tags = [...new Set(posts.flatMap((p) => p.tags))];

    sidebar.innerHTML = `
      <div class="sidebar-widget">
        <h3><i class="fas fa-folder"></i> التصنيفات</h3>
        <div class="tags">
          ${categories.map((c) => `<span class="tag">${c}</span>`).join("")}
        </div>
      </div>
      <div class="sidebar-widget">
        <h3><i class="fas fa-tags"></i> الكلمات المفتاحية</h3>
        <div class="tags">
          ${tags.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="sidebar-widget">
        <h3><i class="fas fa-clock"></i> أحدث المقالات</h3>
        <div class="related-posts">
          ${posts
            .slice(0, 5)
            .map(
              (p) => `
            <article class="related-post" onclick="location.href='article.html?slug=${
              p.slug
            }'">
              <img src="${p.image}" alt="${p.title}" loading="lazy">
              <div class="related-content">
                <h4>${p.title}</h4>
                <span class="related-date">${formatDate(p.published_at)}</span>
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  const form = document.getElementById("newsletterForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button");
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> تم الاشتراك!';
      btn.style.background = "#10b981";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "";
        form.reset();
      }, 3000);
    });
  }
}

function renderArticle() {
  const slug = new URLSearchParams(location.search).get("slug");
  const post = DB.posts.find((p) => p.slug === slug) || DB.posts[0];

  document.title = `${post.title} - فضاء التقنية..`;

  const els = {
    ".article-category": post.category,
    ".article-date": formatDate(post.published_at),
    ".article-title": post.title,
    ".article-subtitle": post.excerpt,
  };

  Object.entries(els).forEach(([sel, val]) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = val;
  });

  const textEl = document.querySelector(".article-text");
  if (textEl) textEl.innerHTML = post.content;

  const img = document.querySelector(".article-image img");
  if (img) img.src = post.image;

  const tags = document.querySelector(".article-tags .tags");
  if (tags) {
    tags.innerHTML = post.tags
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
  }

  const sidebar = document.querySelector(".article-sidebar");
  if (sidebar) {
    // show latest by id order (ascending) from a shallow copy
    const latest = DB.posts
      .slice()
      .sort((a, b) => a.id - b.id)
      .slice(0, 5);
    sidebar.innerHTML = `
      <div class="sidebar-widget">
        <h3><i class="fas fa-clock"></i> أحدث المقالات</h3>
        <div class="related-posts">
          ${latest
            .map(
              (p) => `
            <article class="related-post" onclick="location.href='article.html?slug=${
              p.slug
            }'">
              <img src="${p.image}" alt="${p.title}" loading="lazy">
              <div class="related-content">
                <h4>${p.title}</h4>
                <span class="related-date">${formatDate(p.published_at)}</span>
              </div>
            </article>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          post.title
        )}&url=${encodeURIComponent(location.href)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          location.href
        )}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          location.href
        )}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(
          post.title + " " + location.href
        )}`,
      };
      const platform = btn.classList[1];
      if (urls[platform])
        window.open(urls[platform], "_blank", "width=600,height=400");
    });
  });
}

function initForm(type) {
  const form = document.getElementById(type + "Form");
  if (!form) return;

  form.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.closest(".input-wrapper").querySelector("input");
      const icon = btn.querySelector("i");
      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });

  // attach simple password strength updater for signup
  if (type === "signup") {
    const pwd = form.querySelector("#signup-password");
    const strengthEl = document.getElementById("password-strength");
    if (pwd && strengthEl) {
      const updater = () => updatePasswordStrength(pwd.value, strengthEl);
      pwd.addEventListener("input", updater);
      // run once to reflect initial state (if any)
      updater();
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // run simple validation depending on form type
    let valid = true;
    if (type === "signup") valid = validateSignupForm(form);
    else if (type === "signin") valid = validateSigninForm(form);

    if (!valid) return; // block submission if invalid

    const msg = document.getElementById(type + "-success");
    if (msg) {
      msg.innerHTML = '<i class="fas fa-check-circle"></i> تم بنجاح!';
      msg.classList.add("show");
      setTimeout(() => (location.href = "index.html"), 2000);
    }
  });
}

// --- Simple validators (small, few lines) ---
function showError(el, message) {
  const id = el.id + "-error";
  const span = document.getElementById(id);
  if (span) {
    span.textContent = message;
    span.classList.add("show");
  } else {
    // fallback when no inline span exists
    alert(message);
  }
  if (el) el.classList.add("invalid");
}

function clearError(el) {
  const id = el.id + "-error";
  const span = document.getElementById(id);
  if (span) {
    span.textContent = "";
    span.classList.remove("show");
  }
  if (el) el.classList.remove("invalid");
}

function isEmail(value) {
  return /^[^\s@]+@[^^\s@]+\.[^\s@]+$/.test(value);
}

function validateSignupForm(form) {
  const name = form.querySelector("#signup-name");
  const email = form.querySelector("#signup-email");
  const pass = form.querySelector("#signup-password");
  const pass2 = form.querySelector("#signup-confirm-password");
  const terms = form.querySelector("#agree-terms");

  let ok = true;
  [name, email, pass, pass2].forEach(clearError);

  if (!name || name.value.trim().length < 3) {
    showError(name, "الاسم يجب أن يكون 3 أحرف على الأقل");
    ok = false;
  }

  if (!email || !isEmail(email.value.trim())) {
    showError(email, "أدخل بريد إلكتروني صالح");
    ok = false;
  }

  if (!pass || pass.value.length < 8) {
    showError(pass, "كلمة المرور يجب أن تكون 8 أحرف على الأقل");
    ok = false;
  }

  if (!pass2 || pass2.value !== pass.value) {
    showError(pass2, "كلمتا المرور غير متطابقتين");
    ok = false;
  }

  if (terms && !terms.checked) {
    const el = terms.closest(".form-options") || terms;
    // show a small message next to checkbox
    const span = document.getElementById("signup-name-error");
    if (span) span.textContent = "يجب قبول الشروط";
    ok = false;
  }

  return ok;
}

function validateSigninForm(form) {
  const email = form.querySelector("#signin-email");
  const pass = form.querySelector("#signin-password");
  let ok = true;
  [email, pass].forEach(clearError);

  if (!email || !isEmail(email.value.trim())) {
    showError(email, "أدخل بريد إلكتروني صالح");
    ok = false;
  }

  if (!pass || pass.value.trim().length === 0) {
    showError(pass, "أدخل كلمة المرور");
    ok = false;
  }

  return ok;
}

// Minimal password strength updater: small code, few lines
function updatePasswordStrength(value, el) {
  const score =
    (value.length >= 8) +
    /[A-Z]/.test(value) +
    /[0-9]/.test(value) +
    /[^A-Za-z0-9]/.test(value);
  el.classList.remove("weak", "medium", "strong");
  if (!value) return; // leave empty bar
  if (score <= 1) el.classList.add("weak");
  else if (score === 2) el.classList.add("medium");
  else el.classList.add("strong");
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return iso;
  }
}
