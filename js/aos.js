(function(window, document) {
    'use strict';
    
    var AOS = function() {
        this.init = function() {
            var self = this;
            
            // Default settings
            this.options = {
                offset: 120,
                delay: 0,
                duration: 400,
                easing: 'ease-in-out',
                once: false,
                mirror: false,
                anchorPlacement: 'top-bottom'
            };
            
            // Merge custom options
            if (arguments[0] && typeof arguments[0] === 'object') {
                for (var key in arguments[0]) {
                    this.options[key] = arguments[0][key];
                }
            }
            
            // Store all elements that have data-aos attribute
            this.elements = document.querySelectorAll('[data-aos]');
            
            // Initial check
            this.checkPosition();
            
            // Throttle scroll event
            var scrollTimeout;
            window.addEventListener('scroll', function() {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    self.checkPosition();
                }, 100);
            });
        };
        
        this.checkPosition = function() {
            var windowHeight = window.innerHeight;
            var windowTop = window.pageYOffset;
            var windowBottom = windowTop + windowHeight;
            
            for (var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i];
                var elementHeight = element.offsetHeight;
                var elementTop = this.getOffsetTop(element);
                var elementBottom = elementTop + elementHeight;
                
                // Check if element is in viewport
                if (elementBottom >= windowTop && elementTop <= windowBottom) {
                    if (!element.classList.contains('aos-animate')) {
                        var delay = element.getAttribute('data-aos-delay') || this.options.delay;
                        
                        setTimeout(function(el) {
                            el.classList.add('aos-animate');
                        }, delay, element);
                    }
                } else if (!this.options.once) {
                    element.classList.remove('aos-animate');
                }
            }
        };
        
        this.getOffsetTop = function(element) {
            var offsetTop = 0;
            
            do {
                if (!isNaN(element.offsetTop)) {
                    offsetTop += element.offsetTop;
                }
            } while (element = element.offsetParent);
            
            return offsetTop;
        };
    };
    
    // Initialize AOS
    window.AOS = new AOS();
})(window, document);