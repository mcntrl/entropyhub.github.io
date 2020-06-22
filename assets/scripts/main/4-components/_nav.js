//******************************************************************************
//
//
//
//  #NAV
//
//
//
//******************************************************************************

// TODO: Change to page component

var Nav = (function() {
    var linkClicked = false;

    var _addEventListeners = function() {
        Barba.Dispatcher.on('linkClicked', function(element) {
            console.log('Link clicked');

            linkClicked = element;

            $('body').addClass('is-exiting');

            NavTrigger.close();
        });

        Barba.Dispatcher.on('initStateChange', function() {
            console.log('Init state change');

            if(!linkClicked) {
                console.log('Init state change without click');
                window.location.href = Barba.HistoryManager.history[Barba.HistoryManager.history.length - 1].url;
            }
        });

        Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
            console.log('New page ready');

            var barbaWrapperClasses = $(newPageRawHTML).filter('#barba-wrapper').attr('class');

            $('#barba-wrapper').attr('class', barbaWrapperClasses);
        });

        Barba.Dispatcher.on('transitionCompleted', function() {
            console.log('Transition completed');

            linkClicked = false;

            $('body').stellar({
                hideDistantElements: false,
                horizontalScrolling: false,
                positionProperty: 'transform',
                responsive: true
            });
        });

        $('body').on('click', 'a.no-barba', function(event) {
            event.preventDefault();

            var url = $(this).attr('href');

            setTimeout(function() {
                window.location = url;
            }, 1000);
        });
    };

    var init = function() {
        Barba.Pjax.start();

        var FadeTransition = Barba.BaseTransition.extend({
            start: function() {
                // Destroy plugins
                $.stellar('destroy');

                if($(document).height() > $(window).height()) {
                    var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop();

                    $('html').addClass('is-no-scroll').css('top', -scrollTop);
                }

                this.newContainerLoading.then(this.finish.bind(this));
            },

            finish: function() {
                var $this = this;
                var $newContainer = $(this.newContainer);
                var $oldContainer = $(this.oldContainer);

                $newContainer.addClass('is-entering');
                $oldContainer.addClass('is-exiting');

                setTimeout(function() {
                    // TODO: Consolidate component initialisation into function
                    Jumbotron.init();

                    $.stellar({
                        horizontalScrolling: false,
                        positionProperty: 'transform',
                        responsive: true
                    });

                    inView('.js-in-view')
                        .on('enter', function(element) {
                            $(element).addClass('is-in-view');
                        })
                        .on('exit', function(element) {

                        });
        
                    inView.offset(100);

                    $oldContainer.one(global.transitionEnd, function() {
                        $('html, body').scrollTop(0);

                        $('html').removeClass('is-no-scroll');
                        $newContainer.removeClass('is-entering');
                        $('body').removeClass('is-exiting');

                        $newContainer.addClass('is-enter');

                        $this.done();
                    });
                }, 500);
            }
        });

        Barba.Pjax.getTransition = function() {
            return FadeTransition;
        };

        _addEventListeners();
    };

    return {
        init: init
    };
})();
