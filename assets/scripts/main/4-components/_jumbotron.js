/*******************************************************************************
//
//
//
//  #JUMBOTRON
//
//
//
*******************************************************************************/

var Jumbotron = (function() {
    var Jumbotron = function(element) {
        this.$jumbotron = $(element);
        this.$jumbotronHeading = this.$jumbotron.find('.c-jumbotron__heading');
        this.$jumbotronHeadingText = this.$jumbotronHeading.find('.c-jumbotron__heading-text');
        this.jumbotronHeadingHeight = 0;
        this.jumbotronHeadingWidth = 0;
        this.scale = 0;

        this._setup();
    };

    Jumbotron.prototype = {
        _setup: function() {
            var _self = this;

            console.log('Jumbotron Setup');

            _self._addEventListeners();
        },

        _addEventListeners: function() {
            var _self = this;

            $(window).on('resize', function() {
                console.log('Jumbotron Resize');

                _self.jumbotronHeadingHeight = _self.$jumbotronHeading.outerHeight();
                _self.jumbotronHeadingWidth = _self.$jumbotronHeading.outerWidth();

                _self._resizeText();
            }).resize();
        },

        _resizeText: function() {
            var _self = this;

            if(MediaQuery.value >= 2) {
                _self.scale = Math.min(
                    _self.jumbotronHeadingWidth / 1600,    
                    _self.jumbotronHeadingHeight / 250
                );
            } else {
                _self.scale = Math.min(
                    _self.jumbotronHeadingWidth / 850,    
                    _self.jumbotronHeadingHeight / 425
                );
            }
            

            _self.$jumbotronHeadingText.css({
                transform: 'scale(' + _self.scale + ')',
            });
        },
    };

    var init = function() {
        console.log('Jumbotron Init');
        
        $('.c-jumbotron').each(function() {
            var instance = $.data(this, 'Jumbotron');

            if(!instance) {
                $.data(this, 'Jumbotron', new Jumbotron(this));
            }
        });
    };

    return {
        init: init
    };
})();
