//******************************************************************************
//
//
//
//  #GLOBAL
//  -> Global variables
//
//
//
//******************************************************************************

/* jshint ignore:start */
var global = new function() {
    this.$body = document.getElementsByTagName('body');
    this.$html = document.getElementsByTagName('html');
    this.animationEnd = animationEnd();
    this.transitionEnd = transitionEnd();
};

var site = new function() {
    this.url = '';
};

var paths = new function() {
    this.assets = site.url + '';
    this.images = this.assets + '/images/compressed';
    this.scripts = this.assets + '/scripts';
    this.styles = this.assets + '/styles';
    this.svgs = this.assets + '/svgs/compressed';
    this.videos = this.assets + '/videos';
};
/* jshint ignore:end */
