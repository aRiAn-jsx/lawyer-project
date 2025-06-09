document.addEventListener('DOMContentLoaded', function() {
    // متغیرهای عمومی
    let lastScrollTop = 0;
    let ticking = false;
    
    // ایجاد دکمه اسکرول به بالا
    createScrollTopButton();
    
    // اضافه کردن کلاس‌های انیمیشن به عناصر
    setupAnimationClasses();
    
    // اجرای اولیه بررسی عناصر در دید
    checkVisibility();
    
    // رویداد اسکرول با بهینه‌سازی عملکرد
    window.addEventListener('scroll', function() {
      lastScrollTop = window.pageYOffset;
      
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkVisibility();
          ticking = false;
        });
        
        ticking = true;
      }
    });
    
    // رویداد تغییر اندازه صفحه
    window.addEventListener('resize', debounce(function() {
      checkVisibility();
    }, 250));
    
    /**
     * ایجاد دکمه اسکرول به بالا
     */
    function createScrollTopButton() {
      const scrollTopButton = document.createElement('div');
      scrollTopButton.className = 'scroll-top-btn';
      scrollTopButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
      document.body.appendChild(scrollTopButton);
      
      scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    /**
     * اضافه کردن کلاس‌های انیمیشن به عناصر
     */
    function setupAnimationClasses() {
      // اضافه کردن کلاس به عناصر بنر
      const bannerImage = document.querySelector('.banner .imageBanner');
      const bannerText = document.querySelector('.banner .container-text');
      
      if (bannerImage) bannerImage.classList.add('fade-in');
      if (bannerText) bannerText.classList.add('fade-in');
      
      // اضافه کردن کلاس به آیکون‌ها
      const iconItems = document.querySelectorAll('.icon-bar ul li');
      iconItems.forEach(item => {
        item.classList.add('fade-in');
      });
      
      // اضافه کردن کلاس به کارت‌های خدمات
      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach(card => {
        card.classList.add('fade-in');
      });
      
      // اضافه کردن کلاس به ستون‌های فوتر
      const footerColumns = document.querySelectorAll('.footer-column');
      footerColumns.forEach(column => {
        column.classList.add('fade-in');
      });
    }
    
    /**
     * بررسی عناصر در دید
     */
    function checkVisibility() {
      // آرایه‌ای از تمام کلاس‌هایی که باید بررسی شوند
      const animatedElements = [
        { selector: '.fade-in', className: 'visible' },
        { selector: '.slide-in-right', className: 'visible' },
        { selector: '.slide-in-left', className: 'visible' },
        { selector: '.scale-in', className: 'visible' },
        { selector: '.banner', className: 'visible' },
        { selector: '.icon-bar', className: 'visible' },
        { selector: 'header .Menu', className: 'visible' },
        { selector: '.content-section', className: 'visible' },
        { selector: '.services-description', className: 'visible' },
        { selector: '.service-card', className: 'visible' },
        { selector: '.footer-column', className: 'visible' }
      ];
      
      // بررسی هر گروه از عناصر
      animatedElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        
        elements.forEach(element => {
          if (isElementInViewport(element)) {
            element.classList.add(item.className);
          }
        });
      });
      
      // تنظیم تأخیر برای آیکون‌ها
      const iconBarItems = document.querySelectorAll('.icon-bar.visible ul li');
      iconBarItems.forEach((item, index) => {
        item.style.transitionDelay = (index * 0.1) + 's';
      });
      
      // تنظیم تأخیر برای کارت‌های خدمات
      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
          card.style.transitionDelay = (index * 0.1) + 's';
          card.classList.add('visible');
        }
      });
      
      // تنظیم تأخیر برای ستون‌های فوتر
      const footerColumns = document.querySelectorAll('.footer-column');
      footerColumns.forEach((column, index) => {
        if (isElementInViewport(column)) {
          column.style.transitionDelay = (index * 0.1) + 's';
          column.classList.add('visible');
        }
      });
      
      // نمایش یا مخفی کردن دکمه اسکرول به بالا
      const scrollTopButton = document.querySelector('.scroll-top-btn');
      if (scrollTopButton) {
        if (window.pageYOffset > 300) {
          scrollTopButton.classList.add('visible');
        } else {
          scrollTopButton.classList.remove('visible');
        }
      }
      
      // مخفی کردن منوی پایین هنگام اسکرول به پایین
      const navBottom = document.getElementById('nav-bottom');
      if (navBottom) {
        if (window.pageYOffset > lastScrollTop && window.pageYOffset > 200) {
          navBottom.classList.add('hidden');
        } else {
          navBottom.classList.remove('hidden');
        }
      }
    }
    
    /**
     * بررسی اینکه آیا عنصر در دید است
     * @param {Element} element - عنصر مورد بررسی
     * @param {number} offset - فاصله از لبه صفحه
     * @returns {boolean} - آیا عنصر در دید است
     */
    function isElementInViewport(element, offset = 100) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top < window.innerHeight - offset &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
      );
    }
    
    /**
     * تابع debounce برای بهینه‌سازی رویدادهای مکرر
     * @param {Function} func - تابع اصلی
     * @param {number} wait - زمان انتظار به میلی‌ثانیه
     * @returns {Function} - تابع بهینه‌سازی شده
     */
    function debounce(func, wait) {
      let timeout;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          func.apply(context, args);
        }, wait);
      };
    }
  });
  
    document.addEventListener('DOMContentLoaded', function() {
        // بررسی وجود فوتر
        const footer = document.querySelector('.site-footer');
        if (!footer) return;
        
        // بررسی وجود عناصر فوتر
        const footerElements = document.querySelectorAll('.footer-grid > div');
        if (footerElements.length === 0) return;
        
        // اضافه کردن کلاس‌های اولیه
        footerElements.forEach(element => {
          element.classList.add('footer-animate');
        });
        
        // تابع بررسی نمایش فوتر با بهینه‌سازی عملکرد
        let isAnimated = false;
        let ticking = false;
        
        function checkFooterVisibility() {
          // اگر قبلاً انیمیشن اجرا شده، دیگر بررسی نکن
          if (isAnimated) return;
          
          // بهینه‌سازی عملکرد با requestAnimationFrame
          if (!ticking) {
            window.requestAnimationFrame(function() {
              const footerTop = footer.getBoundingClientRect().top;
              const windowHeight = window.innerHeight;
              
              if (footerTop < windowHeight - 50) {
                // فوتر در دید قرار گرفته است
                footerElements.forEach((element, index) => {
                  setTimeout(() => {
                    element.classList.add('fade-in');
                  }, index * 150);
                });
                
                // علامت‌گذاری انیمیشن به عنوان اجرا شده
                isAnimated = true;
                
                // حذف رویداد اسکرول پس از نمایش فوتر
                window.removeEventListener('scroll', checkFooterVisibility);
              }
              
              ticking = false;
            });
            
            ticking = true;
          }
        }
        
        // اضافه کردن رویداد اسکرول با محدودیت فراخوانی
        window.addEventListener('scroll', checkFooterVisibility, { passive: true });
        
        // بررسی اولیه در صورتی که فوتر از ابتدا در دید باشد
        checkFooterVisibility();
        
        // اضافه کردن رویداد تغییر اندازه صفحه
        let resizeTimeout;
        window.addEventListener('resize', function() {
          // پاک کردن تایمر قبلی
          clearTimeout(resizeTimeout);
          
          // تنظیم تایمر جدید
          resizeTimeout = setTimeout(function() {
            // بررسی مجدد نمایش فوتر در صورت تغییر اندازه صفحه
            if (!isAnimated) {
              checkFooterVisibility();
            }
          }, 250);
        }, { passive: true });
        document.addEventListener('DOMContentLoaded', function() {
            // انتخاب همه لینک‌های ناو
            const navLinks = document.querySelectorAll('#nav-bottom .nav-link');
            
            // اضافه کردن رویداد کلیک به هر لینک
            navLinks.forEach(link => {
              link.addEventListener('click', function(e) {
                // حذف کلاس active از همه لینک‌ها
                navLinks.forEach(item => item.classList.remove('active'));
                
                // اضافه کردن کلاس active به لینک کلیک شده
                this.classList.add('active');
              });
            });
            
            // فعال کردن لینک خانه به صورت پیش‌فرض
            if (navLinks.length > 0) {
              navLinks[0].classList.add('active');
            }
            
          });
          
      });
      
      
  