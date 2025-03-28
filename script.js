document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links and elements
    const navLinks = document.querySelectorAll('.main-nav a, .side-nav a');
    const hamburger = document.querySelector('.hamburger');
    const sideNav = document.querySelector('.side-nav');
    const sections = document.querySelectorAll('section');
    let isMenuOpen = false;
    
    // Handle mobile menu toggle
    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        hamburger.classList.toggle('active');
        sideNav.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !hamburger.contains(e.target) && !sideNav.contains(e.target)) {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            sideNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    const sideNavLinks = sideNav.querySelectorAll('a');
    sideNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            hamburger.classList.remove('active');
            sideNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get the target section id from href
            const targetId = link.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
                // Get the target section
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (sideNav.classList.contains('active')) {
                        isMenuOpen = false;
                        sideNav.classList.remove('active');
                        hamburger.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth scroll to target section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Active link highlighting
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Set active link on page load
    setActiveLink();

    // Initialize Plyr
    const player = new Plyr('#player', {
        controls: [],  // Hide all controls
        clickToPlay: false,
        keyboard: false,
        loop: { active: true },
        muted: true,
        autopause: false,
        autoplay: true,
        hideControls: true
    });

    // When the video is ready
    player.on('ready', () => {
        player.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });
    });

    // Ensure video always fills the container
    function updateVideoSize() {
        const videoWrapper = document.querySelector('.plyr__video-wrapper');
        const video = document.querySelector('video');
        
        if (video) {
            const containerAspect = window.innerWidth / window.innerHeight;
            const videoAspect = video.videoWidth / video.videoHeight || 16/9;

            if (containerAspect > videoAspect) {
                video.style.width = '100vw';
                video.style.height = 'auto';
                video.style.top = '50%';
                video.style.left = '0';
                video.style.transform = 'translateY(-50%)';
            } else {
                video.style.width = 'auto';
                video.style.height = '100vh';
                video.style.top = '0';
                video.style.left = '50%';
                video.style.transform = 'translateX(-50%)';
            }
        }
    }

    // Update video size on window resize and when video metadata is loaded
    window.addEventListener('resize', updateVideoSize);
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('loadedmetadata', updateVideoSize);
    }
    updateVideoSize();

    // Handle job banner button click
    const jobBtn = document.querySelector('.job-btn');
    if (jobBtn) {
        jobBtn.addEventListener('click', () => {
            window.location.href = '#jobs';
        });
    }

    // Header scroll effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}); 