// Smooth scroll with 10rem (160px) offset for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            const yOffset = -80;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

// Theme toggle
const toggle = document.getElementById('theme-toggle');
if (toggle) {
    // On load, set theme from localStorage if available (no transition)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        toggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    toggle.onclick = () => {
        const html = document.documentElement;
        // Add transition only for this toggle
        document.body.style.transition = 'background 0.3s, color 0.3s';
        const isLight = html.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        // Optionally, remove the transition after animation completes
        setTimeout(() => {
            document.body.style.transition = '';
        }, 350);
    };
}

// Menu open/close
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
if (menuToggle && navMenu) {
    menuToggle.onclick = () => {
        navMenu.classList.toggle('hidden');
    };
}
const menuClose = document.getElementById('menu-close');
if (menuClose && navMenu) {
    menuClose.onclick = () => navMenu.classList.add('hidden');
}

// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    backToTop.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

// Make .project divs clickable and redirect to their contained <a>'s href
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', function(e) {
        // Prevent double navigation if the user clicks directly on the link
        if (e.target.tagName.toLowerCase() === 'a') return;
        const link = this.querySelector('a[href]');
        if (link && link.getAttribute('href')) {
            window.location.href = link.getAttribute('href');
        }
    });
});