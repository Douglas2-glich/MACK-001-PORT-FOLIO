// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
  
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navList.classList.toggle('active');
    });
  
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
      });
    });
  
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.portfolio-filter button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  
    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
      skillBars.forEach(bar => {
        const skillName = bar.parentElement.previousElementSibling.querySelector('span:first-child').textContent;
        const width = bar.parentElement.previousElementSibling.querySelector('span:last-child').textContent;
        
        // Set specific colors for different skills
        if (skillName.includes('HTML')) bar.style.background = '#e34f26';
        else if (skillName.includes('CSS')) bar.style.background = '#264de4';
        else if (skillName.includes('JavaScript')) bar.style.background = '#f7df1e';
        else if (skillName.includes('React')) bar.style.background = '#61dafb';
        
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
    }
  
    // Animate skills when section is in view
    const skillsSection = document.querySelector('.skills');
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
  
    skillsObserver.observe(skillsSection);
  
    // Testimonial slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;
    const testimonialItems = document.querySelectorAll('.testimonial-item');
  
    // Touch events
    testimonialsSlider.addEventListener('touchstart', touchStart);
    testimonialsSlider.addEventListener('touchend', touchEnd);
    testimonialsSlider.addEventListener('touchmove', touchMove);
  
    // Mouse events
    testimonialsSlider.addEventListener('mousedown', touchStart);
    testimonialsSlider.addEventListener('mouseup', touchEnd);
    testimonialsSlider.addEventListener('mouseleave', touchEnd);
    testimonialsSlider.addEventListener('mousemove', touchMove);
  
    // Disable context menu
    testimonialsSlider.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  
    function touchStart(e) {
      if (e.type === 'touchstart') {
        startPos = e.touches[0].clientX;
      } else {
        startPos = e.clientX;
        isDragging = true;
      }
      animationID = requestAnimationFrame(animation);
      testimonialsSlider.style.cursor = 'grabbing';
    }
  
    function touchEnd() {
      isDragging = false;
      cancelAnimationFrame(animationID);
      
      const movedBy = currentTranslate - prevTranslate;
      
      if (movedBy < -100 && currentIndex < testimonialItems.length - 1) {
        currentIndex += 1;
      }
      
      if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
      }
      
      setPositionByIndex();
      testimonialsSlider.style.cursor = 'grab';
    }
  
    function touchMove(e) {
      if (isDragging) {
        const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }
  
    function animation() {
      setSliderPosition();
      if (isDragging) requestAnimationFrame(animation);
    }
  
    function setSliderPosition() {
      testimonialsSlider.style.transform = `translateX(${currentTranslate}px)`;
    }
  
    function setPositionByIndex() {
      currentTranslate = currentIndex * -window.innerWidth;
      prevTranslate = currentTranslate;
      setSliderPosition();
    }
  
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#4BB543';
        
        // Reset form after 3 seconds
        setTimeout(() => {
          this.reset();
          submitButton.textContent = 'Send Message';
          submitButton.style.backgroundColor = '';
        }, 3000);
      });
    }
  
    // Blog search functionality (example)
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Search blog posts...');
    searchInput.style.marginBottom = '20px';
    searchInput.style.padding = '10px';
    searchInput.style.width = '100%';
    searchInput.style.borderRadius = 'var(--border-radius)';
    searchInput.style.border = '1px solid #eee';
    
    const blogSection = document.querySelector('.main-content');
    if (blogSection) {
      blogSection.insertBefore(searchInput, blogSection.firstChild);
      
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const blogPosts = document.querySelectorAll('.blog-post');
        
        blogPosts.forEach(post => {
          const title = post.querySelector('.post-title').textContent.toLowerCase();
          const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
          
          if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });
      });
    }
  
    // Dark mode toggle (optional)
    const darkModeToggle = document.createElement('div');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.backgroundColor = 'var(--primary-color)';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.display = 'flex';
    darkModeToggle.style.alignItems = 'center';
    darkModeToggle.style.justifyContent = 'center';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.zIndex = '100';
    darkModeToggle.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        this.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        this.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
      }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  
    // Add dark mode styles
    const style = document.createElement('style');
    style.textContent = `
      .dark-mode {
        --dark-color: #f8fafc;
        --light-color: #1a202c;
        --text-color: #e2e8f0;
        --text-light: #a0aec0;
        --white: #2d3748;
        --black: #f8fafc;
      }
      
      .dark-mode .header {
        background-color: rgba(45, 55, 72, 0.98) !important;
      }
      
      .dark-mode .portfolio-item,
      .dark-mode .skill-category,
      .dark-mode .timeline-content,
      .dark-mode .testimonial-content,
      .dark-mode .blog-post,
      .dark-mode .sidebar-widget,
      .dark-mode .contact-info,
      .dark-mode .contact-form {
        background-color: #2d3748 !important;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) !important;
      }
    `;
    document.head.appendChild(style);
  });