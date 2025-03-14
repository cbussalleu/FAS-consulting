document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
    });

    // Registrar ScrollTrigger con Locomotive Scroll
    gsap.registerPlugin(ScrollTrigger);
    
    // Actualizar ScrollTrigger cuando Locomotive Scroll se actualiza
    scroll.on('scroll', ScrollTrigger.update);
    
    // ScrollTrigger usa Locomotive Scroll
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });
    
    // Menú hamburguesa para móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
    
    // Cambio de estilo del header al hacer scroll
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top -80px',
        end: 'bottom top',
        onUpdate: (self) => {
            const header = document.querySelector('.header');
            if (self.direction === 1) {
                header.style.background = 'rgba(7, 7, 7, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.background = 'rgba(7, 7, 7, 0.9)';
                header.style.boxShadow = 'none';
            }
        }
    });
    
    // Alternancia de subtítulos
    const subtitles = document.querySelectorAll('.changing-subtitle .subtitle');
    let currentSubtitle = 0;
    
    function changeSubtitle() {
        // Quitar clase active de todos los subtítulos
        subtitles.forEach(subtitle => subtitle.classList.remove('active'));
        
        // Añadir clase active al subtítulo actual
        subtitles[currentSubtitle].classList.add('active');
        
        // Actualizar índice para el próximo cambio
        currentSubtitle = (currentSubtitle + 1) % subtitles.length;
    }
    
    // Cambiar subtítulo cada 3 segundos
    setInterval(changeSubtitle, 3000);
    
    // Animación para la línea roja
    gsap.fromTo('.hero:after', 
        { width: 0 },
        { 
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: '.hero',
                scroller: '[data-scroll-container]',
                start: 'top top',
                end: 'bottom top',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Animación de texto revelado
    gsap.utils.toArray('.reveal-text').forEach(text => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: text,
                scroller: '[data-scroll-container]',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
        
        tl.fromTo(text, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        });
        
        tl.fromTo(text.querySelector('::after') || text, {
            scaleX: 1,
            transformOrigin: 'left'
        }, {
            scaleX: 0,
            transformOrigin: 'right',
            duration: 1.2,
            ease: 'power4.inOut'
        }, '-=0.2');
    });
    
    // Animación de elementos al hacer scroll
    gsap.utils.toArray('.reveal-item').forEach(item => {
        gsap.fromTo(item, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                scroller: '[data-scroll-container]',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animación de tarjetas de capacidades
    gsap.utils.toArray('.capability-group').forEach((card, index) => {
        gsap.fromTo(card, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.capabilities-map',
                scroller: '[data-scroll-container]',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animación de tarjetas de casos
    gsap.utils.toArray('.case-card').forEach((card, index) => {
        gsap.fromTo(card, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.cases-container',
                scroller: '[data-scroll-container]',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Efecto parallax para fondos
    document.querySelectorAll('[data-scroll-speed]').forEach(el => {
        gsap.to(el, {
            y: (i, target) => parseFloat(target.getAttribute('data-scroll-speed')) * -100,
            ease: 'none',
            scrollTrigger: {
                trigger: el.parentElement,
                scroller: '[data-scroll-container]',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Efecto para la sección Hero
    gsap.timeline()
        .fromTo('.pre-title', {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        })
        .fromTo('.title', {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.4')
        .fromTo('.working-in', {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .fromTo('.changing-subtitle', {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            onComplete: () => {
                // Activar el primer subtítulo después de la animación
                document.querySelector('.changing-subtitle .subtitle').classList.add('active');
            }
        }, '-=0.4');
    
    // Actualizar Locomotive Scroll
    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();
    
    // Manejar la navegación con Locomotive Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scroll.scrollTo(document.querySelector(targetId));
            
            // Cerrar menú móvil si está abierto
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });
});
