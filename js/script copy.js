
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeCarousel();
    initializeNavigation();
    initializeScrollEffects();
    initializeHomePage();
    initializeAnimations();
});


// Floating Particles System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Reduce particle frequency for better performance
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and styling
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random colors from our palette
        const colors = ['#6366f1', '#ec4899', '#06b6d4'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }

    // Create particles less frequently for better performance
    setInterval(createParticle, 3000);
    
    // Create fewer initial particles
    for (let i = 0; i < 3; i++) {
        setTimeout(createParticle, i * 1000);
    }
}

// Enhanced Carousel System
function initializeCarousel() {
    const track = document.getElementById('carouselTrack');
    const slides = track?.children;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || !slides.length) return;

    let currentSlide = 0;
    let isTransitioning = false;
    let autoPlayTimer;

    function updateCarousel() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Add slide animation class
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('fade-in-up');
        }
        
        setTimeout(() => {
            isTransitioning = false;
            if (slides[currentSlide]) {
                slides[currentSlide].classList.remove('fade-in-up');
            }
        }, 800);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    // Event listeners
    nextBtn?.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn?.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
    });

    // Auto-play functionality
    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pause on hover
    const carousel = document.querySelector('.featured-carousel');
    carousel?.addEventListener('mouseenter', stopAutoPlay);
    carousel?.addEventListener('mouseleave', startAutoPlay);

    // Initialize
    updateCarousel();
    startAutoPlay();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        }
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
}

// Enhanced Navigation
function initializeNavigation() {
    const header = document.getElementById('header');
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const searchBtn = document.getElementById('searchBtn');

    // Scroll effect for header
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Improved smooth hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // Mobile menu toggle
    menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Search functionality
    searchBtn?.addEventListener('click', showSearchModal);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
}

// Search Modal
function showSearchModal() {
    // Remove existing modal if any
    const existingModal = document.querySelector('.search-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(20px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        ">
            <div class="search-container" style="
                background: var(--bg-card);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                position: relative;
            ">
                <button class="search-close" style="
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: var(--transition);
                ">
                    <i class="fas fa-times"></i>
                </button>
                <h3 style="
                    color: var(--text-primary);
                    margin-bottom: 1.5rem;
                    text-align: center;
                    font-size: 1.5rem;
                ">🔍 البحث في المدونة</h3>
                <div class="search-input-container" style="
                    position: relative;
                    margin-bottom: 1rem;
                ">
                    <input type="text" class="search-input" placeholder="ابحث عن مقال..." style="
                        width: 100%;
                        padding: 1rem 1.5rem;
                        background: var(--bg-glass);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 15px;
                        color: var(--text-primary);
                        font-size: 1.1rem;
                        outline: none;
                        transition: var(--transition);
                    ">
                    <i class="fas fa-search" style="
                        position: absolute;
                        left: 1rem;
                        top: 50%;
                        transform: translateY(-50%);
                        color: var(--text-muted);
                    "></i>
                </div>
                <div class="search-results" style="
                    max-height: 300px;
                    overflow-y: auto;
                "></div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const searchInput = modal.querySelector('.search-input');
    const searchResults = modal.querySelector('.search-results');
    const closeBtn = modal.querySelector('.search-close');

    // Focus on input
    setTimeout(() => searchInput.focus(), 100);

    // Close modal
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.search-overlay')) {
            modal.remove();
        }
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length > 2) {
            performSearch(query, searchResults);
        } else {
            searchResults.innerHTML = '';
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Search functionality
function performSearch(query, resultsContainer) {
    const posts = DB.posts.filter(post => 
        post.title.includes(query) || 
        post.excerpt.includes(query) ||
        post.content.includes(query) ||
        post.tags.some(tag => tag.includes(query))
    );

    if (posts.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: 2rem;">
                <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>لم يتم العثور على نتائج</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = posts.map(post => `
        <div class="search-result" style="
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: var(--transition);
            border-radius: 10px;
            margin-bottom: 0.5rem;
        " onclick="window.location.href='article.html?slug=${post.slug}'">
            <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">${post.title}</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${post.excerpt}</p>
            <div style="display: flex; gap: 0.5rem;">
                <span style="background: var(--primary); color: white; padding: 0.2rem 0.8rem; border-radius: 15px; font-size: 0.8rem;">${post.category}</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;">${formatDate(post.published_at)}</span>
            </div>
        </div>
    `).join('');

    // Add hover effects
    resultsContainer.querySelectorAll('.search-result').forEach(result => {
        result.addEventListener('mouseenter', function() {
            this.style.background = 'var(--bg-glass)';
            this.style.transform = 'translateX(-5px)';
        });
        result.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Scroll to top button
    const scrollTopBtn = createScrollTopButton();
    
    let scrollTicking = false;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Show/hide scroll to top button with smooth transition
        if (scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.transform = 'translateY(20px)';
        }
        
        scrollTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(handleScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    // Optimized Intersection Observer for animations
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.post-card, .feature-card, .sidebar-widget, .carousel-slide').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

function createScrollTopButton() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.opacity = '0';
    btn.style.visibility = 'hidden';
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(btn);
    return btn;
}

// Database and Content Management
const DB = {
    posts: [
        {
            id: 1,
            title: "مستقبل الذكاء الاصطناعي في عالم التكنولوجيا",
            slug: "future-of-ai",
            excerpt: "استكشاف أحدث التطورات في مجال الذكاء الاصطناعي وتأثيرها على حياتنا اليومية والمستقبل القريب.",
            content: `
                <p class="lead">يشهد عالم الذكاء الاصطناعي تطورات مذهلة ومتسارعة، حيث تتنوع تطبيقاته من الطب إلى التعليم، ومن النقل إلى الترفيه.</p>
                <h2>التطورات الحديثة في الذكاء الاصطناعي</h2>
                <p>شهدت السنوات الماضية قفزات نوعية في التعلم العميق ومعالجة اللغات الطبيعية.</p>
                <blockquote>الذكاء الاصطناعي ثورة ستغير طريقة تفاعلنا مع العالم.</blockquote>
                <h2>التطبيقات العملية</h2>
                <ul>
                    <li><strong>الطب:</strong> تشخيص الأمراض والعلاجات الشخصية</li>
                    <li><strong>التعليم:</strong> أنظمة تعلم تكيفية</li>
                    <li><strong>النقل:</strong> سيارات ذاتية القيادة</li>
                </ul>
                <h2>التحديات والفرص</h2>
                <p>قضايا الخصوصية والشفافية من أهم التحديات الحالية.</p>
            `,
            image: "./assets/images/000.webp",
            category: "تقنية",
            tags: ["الذكاء الاصطناعي", "تقنية", "مستقبل", "تطوير", "ابتكار"],
            published_at: "2024-12-15",
        },
        {
            id: 2,
            title: "تعلم JavaScript من الصفر",
            slug: "learn-javascript-from-scratch",
            excerpt: "دليل شامل لتعلم لغة البرمجة الأكثر شعبية مع أمثلة عملية وتطبيقات حقيقية.",
            content: `
                <p class="lead">ابدأ رحلتك مع JavaScript بأساسيات قوية وأمثلة عملية.</p>
                <h2>المتغيرات والدوال</h2>
                <p>فهم الأساسيات أولاً يبني قاعدة قوية.</p>
                <h2>التعامل مع DOM</h2>
                <p>كيف تتفاعل مع عناصر الصفحة ديناميكياً.</p>
            `,
            image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1200",
            category: "برمجة",
            tags: ["JavaScript", "ويب", "تعلم", "برمجة", "تطوير"],
            published_at: "2024-12-05",
        },
        {
            id: 3,
            title: "أساسيات تصميم واجهات المستخدم",
            slug: "ui-design-basics",
            excerpt: "كيفية إنشاء تصاميم جذابة وسهلة الاستخدام مع أحدث اتجاهات التصميم.",
            content: `
                <p class="lead">تعرف على مبادئ التباين والتدرج البصري والمسافات.</p>
                <h2>الطباعة والألوان</h2>
                <p>اختيار الخطوط والألوان يؤثر مباشرة على تجربة المستخدم.</p>
            `,
            image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200",
            category: "تصميم",
            tags: ["UI", "UX", "تصميم", "واجهات", "تجربة المستخدم"],
            published_at: "2024-12-03",
        },
        {
            id: 4,
            title: "استراتيجيات التسويق الرقمي",
            slug: "digital-marketing-strategies",
            excerpt: "أحدث الطرق للوصول إلى جمهورك المستهدف وتحقيق نتائج ملموسة.",
            content: `
                <p class="lead">التسويق المبني على البيانات يحقق نتائج قابلة للقياس.</p>
                <h2>القنوات الفعالة</h2>
                <p>محركات البحث، الشبكات الاجتماعية، والبريد الإلكتروني.</p>
            `,
            image: "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=1200",
            category: "تسويق",
            tags: ["تسويق", "SEO", "تحليل", "رقمي", "استراتيجية"],
            published_at: "2024-12-01",
        },
        {
            id: 5,
            title: "تطوير تطبيقات الهاتف المحمول",
            slug: "mobile-app-development",
            excerpt: "دليل شامل لتطوير تطبيقات الهاتف المحمول باستخدام أحدث التقنيات والأدوات.",
            content: `
                <p class="lead">تعلم كيفية بناء تطبيقات محمولة احترافية تلبي احتياجات المستخدمين.</p>
                <h2>اختيار المنصة المناسبة</h2>
                <p>مقارنة بين التطوير الأصلي والهجين والويب.</p>
            `,
            image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200",
            category: "تطوير",
            tags: ["تطبيقات", "موبايل", "React Native", "Flutter", "تطوير"],
            published_at: "2024-11-28",
        },
        {
            id: 6,
            title: "أمن المعلومات في العصر الرقمي",
            slug: "cybersecurity-digital-age",
            excerpt: "كيفية حماية بياناتك الشخصية والمؤسسية من التهديدات السيبرانية المتزايدة.",
            content: `
                <p class="lead">الأمن السيبراني أصبح ضرورة حتمية في عالمنا الرقمي المتصل.</p>
                <h2>أنواع التهديدات</h2>
                <p>من الفيروسات إلى الهجمات المتقدمة المستمرة.</p>
            `,
            image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1200",
            category: "أمان",
            tags: ["أمن المعلومات", "حماية", "سيبراني", "خصوصية", "تشفير"],
            published_at: "2024-11-25",
        },
    ]
};

// Utility Functions
function formatDate(iso) {
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return iso;
    }
}

function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Home Page Initialization
function initializeHomePage() {
    if (!document.querySelector('.posts-grid')) return;
    
    renderHomePosts();
    buildHomeSidebar();
    initializeInteractiveElements();
}

function renderHomePosts(filter = {}) {
    const grid = document.getElementById('postsGrid');
    if (!grid) return;

    const posts = DB.posts
        .filter(p => !filter.category || p.category === filter.category)
        .filter(p => !filter.tag || p.tags.includes(filter.tag))
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    grid.innerHTML = posts.map(post => `
        <article class="post-card interactive-hover" data-slug="${post.slug}">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="post-category">${post.category}</span>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-footer">
                    <span class="post-author">
                        <i class="fas fa-user"></i> مدونة عصرية
                    </span>
                    <span class="post-date">
                        <i class="fas fa-calendar"></i> ${formatDate(post.published_at)}
                    </span>
                </div>
            </div>
        </article>
    `).join('');

    // Add click handlers
    grid.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const slug = card.getAttribute('data-slug');
            window.location.href = `article.html?slug=${encodeURIComponent(slug)}`;
        });
    });

    // Add stagger animation
    grid.querySelectorAll('.post-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
}

function buildHomeSidebar() {
    const sidebar = document.getElementById('homeSidebar');
    if (!sidebar) return;

    const categories = Array.from(new Set(DB.posts.map(p => p.category)));
    const tags = Array.from(new Set(DB.posts.flatMap(p => p.tags)));
    const latest = DB.posts
        .slice()
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .slice(0, 5);

    sidebar.innerHTML = `
        <div class="sidebar-widget">
            <h3><i class="fas fa-search"></i> البحث</h3>
            <form class="sidebar-search">
                <input type="text" placeholder="ابحث عن مقال..." id="sidebarSearchInput">
            </form>
        </div>
        
        <div class="sidebar-widget">
            <h3><i class="fas fa-folder"></i> التصنيفات</h3>
            <div class="tags">
                ${categories.map(c => `
                    <button class="tag tag-filter" data-category="${c}">
                        ${c}
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="sidebar-widget">
            <h3><i class="fas fa-tags"></i> الكلمات المفتاحية</h3>
            <div class="tags">
                ${tags.map(t => `
                    <button class="tag tag-filter" data-tag="${t}">
                        ${t}
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="sidebar-widget">
            <h3><i class="fas fa-clock"></i> أحدث المقالات</h3>
            <div class="related-posts">
                ${latest.map(p => `
                    <article class="related-post interactive-hover" data-slug="${p.slug}">
                        <img src="${p.image}" alt="${p.title}" loading="lazy">
                        <div class="related-content">
                            <h4>${p.title}</h4>
                            <span class="related-date">${formatDate(p.published_at)}</span>
                        </div>
                    </article>
                `).join('')}
            </div>
        </div>
    `;

    // Add event listeners
    sidebar.querySelectorAll('.tag-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category') || null;
            const tag = btn.getAttribute('data-tag') || null;
            renderHomePosts({ category, tag });
            
            // Visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = 'scale(1)', 150);
        });
    });

    sidebar.querySelectorAll('.related-post').forEach(el => {
        el.addEventListener('click', () => {
            const slug = el.getAttribute('data-slug');
            window.location.href = `article.html?slug=${encodeURIComponent(slug)}`;
        });
    });

    // Sidebar search
    const searchInput = document.getElementById('sidebarSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                const filteredPosts = DB.posts.filter(p => 
                    p.title.includes(query) || p.excerpt.includes(query)
                );
                renderFilteredPosts(filteredPosts);
            } else if (query.length === 0) {
                renderHomePosts();
            }
        });
    }
}

function renderFilteredPosts(posts) {
    const grid = document.getElementById('postsGrid');
    if (!grid) return;

    if (posts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>لم يتم العثور على نتائج</h3>
                <p>جرب البحث بكلمات مختلفة</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = posts.map(post => `
        <article class="post-card interactive-hover" data-slug="${post.slug}">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <span class="post-category">${post.category}</span>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-footer">
                    <span class="post-author">
                        <i class="fas fa-user"></i> مدونة عصرية
                    </span>
                    <span class="post-date">
                        <i class="fas fa-calendar"></i> ${formatDate(post.published_at)}
                    </span>
                </div>
            </div>
        </article>
    `).join('');

    // Add click handlers
    grid.querySelectorAll('.post-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const slug = card.getAttribute('data-slug');
            window.location.href = `article.html?slug=${encodeURIComponent(slug)}`;
        });
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success animation
                const button = newsletterForm.querySelector('button');
                const originalText = button.innerHTML;
                
                button.innerHTML = '<i class="fas fa-check"></i> تم الاشتراك!';
                button.style.background = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    newsletterForm.reset();
                }, 3000);
            }
        });
    }

    // Trending items click handlers
    document.querySelectorAll('.trending-item').forEach(item => {
        item.addEventListener('click', () => {
            const slug = item.getAttribute('data-slug');
            if (slug) {
                window.location.href = `article.html?slug=${encodeURIComponent(slug)}`;
            }
        });
    });
}

// Animation System
function initializeAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .interactive-hover {
            transition: var(--transition);
        }
        
        .interactive-hover:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
}

// Article Page Functions (for article.html)
function renderArticlePage() {
    const slug = getQueryParam('slug');
    const post = DB.posts.find(p => p.slug === slug) || DB.posts[0];
    if (!post) return;

    // Update page content
    updateArticleContent(post);
    buildArticleSidebar();
    addShareFunctionality();
}

function updateArticleContent(post) {
    // Update meta tags
    document.title = `${post.title} - مدونة عصرية`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

    // Update breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = `
            <a href="index.html">الرئيسية</a>
            <span>/</span>
            <a href="#">${post.category}</a>
            <span>/</span>
            <span>${post.title}</span>
        `;
    }

    // Update article content
    const elements = {
        '.article-category': post.category,
        '.article-date': formatDate(post.published_at),
        '.article-title': post.title,
        '.article-subtitle': post.excerpt,
        '.article-text': post.content
    };

    Object.entries(elements).forEach(([selector, content]) => {
        const element = document.querySelector(selector);
        if (element) {
            if (selector === '.article-text') {
                element.innerHTML = content;
            } else {
                element.textContent = content;
            }
        }
    });

    // Update article image
    const imgEl = document.querySelector('.article-image img');
    if (imgEl) imgEl.setAttribute('src', post.image);

    // Update tags
    const tagsWrap = document.querySelector('.article-tags .tags');
    if (tagsWrap) {
        tagsWrap.innerHTML = post.tags.map(t => 
            `<a class="tag" href="index.html#tag=${encodeURIComponent(t)}">${t}</a>`
        ).join('');
    }
}

function buildArticleSidebar() {
    const sidebar = document.querySelector('.article-sidebar');
    if (!sidebar) return;

    const categories = Array.from(new Set(DB.posts.map(p => p.category)));
    const latest = DB.posts
        .slice()
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .slice(0, 5);

    sidebar.innerHTML = `
        <div class="sidebar-widget">
            <h3><i class="fas fa-list"></i> التصنيفات</h3>
            <div class="tags">
                ${categories.map(c => `
                    <a class="tag" href="posts.html#category=${encodeURIComponent(c)}">
                        ${c}
                    </a>
                `).join('')}
            </div>
        </div>
        
        <div class="sidebar-widget">
            <h3><i class="fas fa-clock"></i> أحدث المقالات</h3>
            <div class="related-posts">
                ${latest.map(p => `
                    <article class="related-post interactive-hover" onclick="window.location.href='article.html?slug=${p.slug}'">
                        <img src="${p.image}" alt="${p.title}" loading="lazy">
                        <div class="related-content">
                            <h4>${p.title}</h4>
                            <span class="related-date">${formatDate(p.published_at)}</span>
                        </div>
                    </article>
                `).join('')}
            </div>
        </div>
    `;
}

function addShareFunctionality() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const currentUrl = window.location.href;
    const title = document.querySelector('.article-title')?.textContent || 'مقال مميز';
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.classList[1]; // twitter, facebook, etc.
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + currentUrl)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Initialize based on current page
if (window.location.pathname.includes('article.html')) {
    document.addEventListener('DOMContentLoaded', renderArticlePage);
}

if (window.location.pathname.includes('signin.html')) {
    document.addEventListener('DOMContentLoaded', initializeSignin);
}

if (window.location.pathname.includes('signup.html')) {
    document.addEventListener('DOMContentLoaded', initializeSignup);
}

if (window.location.pathname.includes('contact.html')) {
    document.addEventListener('DOMContentLoaded', initializeContactForm);
}

function initializeSignin() {
    const form = document.getElementById('signinForm');
    if (!form) return;

    const toggleButtons = form.querySelectorAll('.toggle-password');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.input-wrapper').querySelector('input');
            const icon = btn.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('signin-email');
        const password = document.getElementById('signin-password');

        let isValid = true;

        if (!validateEmail(email.value)) {
            showError('signin-email-error', 'الرجاء إدخال بريد إلكتروني صحيح');
            email.classList.add('error');
            isValid = false;
        } else {
            hideError('signin-email-error');
            email.classList.remove('error');
            email.classList.add('success');
        }

        if (password.value.trim().length < 8) {
            showError('signin-password-error', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
            password.classList.add('error');
            isValid = false;
        } else {
            hideError('signin-password-error');
            password.classList.remove('error');
            password.classList.add('success');
        }

        if (isValid) {
            const successMsg = document.getElementById('signin-success');
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> تم تسجيل الدخول بنجاح! جاري التحويل...';
            successMsg.classList.add('show');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

function initializeSignup() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    const passwordInput = document.getElementById('signup-password');
    const strengthIndicator = document.getElementById('password-strength');

    passwordInput.addEventListener('input', () => {
        const strength = calculatePasswordStrength(passwordInput.value);
        strengthIndicator.className = 'password-strength';

        if (strength >= 80) {
            strengthIndicator.classList.add('strong');
        } else if (strength >= 50) {
            strengthIndicator.classList.add('medium');
        } else if (strength > 0) {
            strengthIndicator.classList.add('weak');
        }
    });

    const toggleButtons = form.querySelectorAll('.toggle-password');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.input-wrapper').querySelector('input');
            const icon = btn.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name');
        const email = document.getElementById('signup-email');
        const password = document.getElementById('signup-password');
        const confirmPassword = document.getElementById('signup-confirm-password');
        const agreeTerms = document.getElementById('agree-terms');

        let isValid = true;

        if (name.value.trim().length < 3) {
            showError('signup-name-error', 'الاسم يجب أن يكون 3 أحرف على الأقل');
            name.classList.add('error');
            isValid = false;
        } else {
            hideError('signup-name-error');
            name.classList.remove('error');
            name.classList.add('success');
        }

        if (!validateEmail(email.value)) {
            showError('signup-email-error', 'الرجاء إدخال بريد إلكتروني صحيح');
            email.classList.add('error');
            isValid = false;
        } else {
            hideError('signup-email-error');
            email.classList.remove('error');
            email.classList.add('success');
        }

        if (password.value.trim().length < 8) {
            showError('signup-password-error', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
            password.classList.add('error');
            isValid = false;
        } else {
            hideError('signup-password-error');
            password.classList.remove('error');
            password.classList.add('success');
        }

        if (password.value !== confirmPassword.value) {
            showError('signup-confirm-password-error', 'كلمتا المرور غير متطابقتين');
            confirmPassword.classList.add('error');
            isValid = false;
        } else if (confirmPassword.value.trim().length === 0) {
            showError('signup-confirm-password-error', 'الرجاء تأكيد كلمة المرور');
            confirmPassword.classList.add('error');
            isValid = false;
        } else {
            hideError('signup-confirm-password-error');
            confirmPassword.classList.remove('error');
            confirmPassword.classList.add('success');
        }

        if (!agreeTerms.checked) {
            alert('يجب الموافقة على الشروط والأحكام');
            isValid = false;
        }

        if (isValid) {
            const successMsg = document.getElementById('signup-success');
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> تم إنشاء الحساب بنجاح! مرحباً بك...';
            successMsg.classList.add('show');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const subject = document.getElementById('contact-subject');
        const message = document.getElementById('contact-message');

        let isValid = true;

        if (name.value.trim().length < 3) {
            showError('name-error', 'الاسم يجب أن يكون 3 أحرف على الأقل');
            name.classList.add('error');
            isValid = false;
        } else {
            hideError('name-error');
            name.classList.remove('error');
            name.classList.add('success');
        }

        if (!validateEmail(email.value)) {
            showError('email-error', 'الرجاء إدخال بريد إلكتروني صحيح');
            email.classList.add('error');
            isValid = false;
        } else {
            hideError('email-error');
            email.classList.remove('error');
            email.classList.add('success');
        }

        if (subject.value.trim().length < 5) {
            showError('subject-error', 'الموضوع يجب أن يكون 5 أحرف على الأقل');
            subject.classList.add('error');
            isValid = false;
        } else {
            hideError('subject-error');
            subject.classList.remove('error');
            subject.classList.add('success');
        }

        if (message.value.trim().length < 10) {
            showError('message-error', 'الرسالة يجب أن تكون 10 أحرف على الأقل');
            message.classList.add('error');
            isValid = false;
        } else {
            hideError('message-error');
            message.classList.remove('error');
            message.classList.add('success');
        }

        if (isValid) {
            const successMsg = document.getElementById('contact-success');
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
            successMsg.classList.add('show');

            setTimeout(() => {
                form.reset();
                successMsg.classList.remove('show');
                name.classList.remove('success');
                email.classList.remove('success');
                subject.classList.remove('success');
                message.classList.remove('success');
            }, 5000);
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function calculatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;

    return strength;
}