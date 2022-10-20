//******************************************************************************
//
//
//
//  #MAIN
//  -> Initiate scripts
//
//
//
//******************************************************************************

(function(Main, window, document, undefined) {
    // Go to top of page
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };


    // Prevent FOUC
    global.$html[0].classList.remove('is-dom-loading');


    // Prevent animations and transitions on window resize
    var timerWindowResize;

    window.addEventListener('resize', function() {
        global.$html[0].classList.add('is-disable-animations');
        
        clearTimeout(timerWindowResize);
        
        timerWindowResize = setTimeout(function() {
            global.$html[0].classList.remove('is-disable-animations');
        }, 400);
    });

    $(window).load(function() {
        Nav.init();
        NavTrigger.init();
        Jumbotron.init();

        inView('.js-in-view')
            .on('enter', function(element) {
                $(element).addClass('is-in-view');
            })
            .on('exit', function(element) {

            });
        
        inView.offset(100);

        $('.c-header__logo').addClass('hidden');
        
        $.stellar({
            horizontalScrolling: false,
            positionProperty: 'transform',
            responsive: true
        });

        $('.barba-container').addClass('is-enter');
    });
}(window.Main = window.Main || {}, window, document));
