document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".project-image");

    containers.forEach(container => {
        container.addEventListener("click", function () {
            document.querySelector(".project-image.active").classList.remove("active");
            this.classList.add("active");
        });
    });
});

document.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    const scrollY = window.scrollY;
    const speed = 0.05;

    parallax.style.transform = `translateY(${scrollY * speed}px)`;
});

document.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax-reverse');
    const scrollY = window.scrollY;
    const speed = 0.1;

    parallax.style.transform = `translateY(${-scrollY * speed}px)`;
});

function animateValue(element, start, end, duration) {
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        element.textContent = Math.min(Math.round(start + (end - start) * (progress / duration)), end);
        if (progress < duration) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

function startAnimation(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let element = entry.target.querySelector("h3");
            let endValue = parseInt(element.getAttribute("data-value"));
            animateValue(element, 0, endValue, 800);
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}

let observer = new IntersectionObserver(startAnimation, { threshold: 0.5 });

document.querySelectorAll(".animated-value").forEach(block => {
    observer.observe(block);
});

const burgerMenu = document.getElementById('burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.parallax-card').forEach(card => {
    const edgeThreshold = 0.1;
    card.addEventListener('mousemove', (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        let CardWidth = card.clientWidth;
        let CardHeight = card.clientHeight;

        const inEdgeX = x < CardWidth * edgeThreshold || x > CardWidth * (1 - edgeThreshold);
        const inEdgeY = y < CardHeight * edgeThreshold || y > CardHeight * (1 - edgeThreshold * 3);

        if (inEdgeX || inEdgeY) {
            card.style.transform = '';
        } else {
            let transX = (x - CardWidth/2) * 0.2;
            let transY = (y - CardHeight/2) * 0.2;
            card.style.transform = `translateX(${transX}px) translateY(${transY}px)`;
        }
    });
    card.addEventListener("mouseout", () => {
        card.style.transform = '';
    })
});