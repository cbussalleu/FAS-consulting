document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa para móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
    
    // Cambio de estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 100) {
            header.style.background = 'rgba(7, 7, 7, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(7, 7, 7, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Animación de elementos al hacer scroll
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.capability-group, .case-card');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar animaciones
    document.querySelectorAll('.capability-group, .case-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Ejecutar animaciones al cargar y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });
});
