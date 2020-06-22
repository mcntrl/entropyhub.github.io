/*******************************************************************************
//
//
//
//  #NAV TRIGGER
//
//
//
*******************************************************************************/

// TODO: Refactor to use jQuery

var NavTrigger = (function() {
    var $nav;
    var $navTrigger;
    var $navTriggerIcon;
    var state;

    var _addEventListeners = function() {
        $navTrigger.addEventListener('click', function() {
            toggle();
        });

        window.addEventListener('resize', function() {
            close();

            isAnimating = false;
        });
    
        window.addEventListener('scroll', function() {
            $navTriggerIcon.style.transform = 'rotate(' + (window.pageYOffset / 6) + 'deg)';
            $navTriggerLabel.style.transform = 'rotate(' + (window.pageYOffset / -6) + 'deg)';
        });
    };

    var close = function() {
        isAnimating = true;

        $navTrigger.setAttribute('aria-expanded', false);
        $nav.hidden = true;

        global.$body[0].classList.remove('is-nav-open');

        $('.c-nav').one(global.transitionEnd, function() {
            isAnimating = false;
        });
    };

    var open = function() {
        isAnimating = true;

        $navTrigger.setAttribute('aria-expanded', true);
        $nav.hidden = false;

        global.$body[0].classList.add('is-nav-open');

        $('.c-nav').one(global.transitionEnd, function() {
            isAnimating = false;
        });
    };

    var toggle = function() {
        isAnimating = true;

        state = JSON.parse($navTrigger.getAttribute('aria-expanded'));

        $navTrigger.setAttribute('aria-expanded', !state);
        $nav.hidden = !$nav.hidden;
        
        if(!state) {
            global.$body[0].classList.add('is-nav-open');
        } else {
            global.$body[0].classList.remove('is-nav-open');
        }

        $('.c-nav').one(global.transitionEnd, function() {
            isAnimating = false;
        });
    };

    var init = function() {
        $nav = document.querySelector('.c-nav');
        $navTrigger = document.querySelector('.js-nav-trigger');
        $navTriggerIcon = document.querySelector('.svg-icon-menu__icon');
        $navTriggerLabel = document.querySelector('.svg-icon-menu__label');

        _addEventListeners();
    };

    return {
        init: init,
        close: close,
        open: open
    };
})();
