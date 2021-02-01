"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
require("./index.css");
var target = document.querySelector('.js-sticky-scroll-catch');
var parent = target.parentElement;
var scrollDirection;
var isCatchPos = false;
var stickyScrollCatch = function () {
    var targetHeight = target.offsetHeight;
    // let targetWidth: number = target.offsetWidth
    var parentHeight = parent.offsetHeight;
    // let parentWidth: number = parent.offsetWidth
    if (utils_1.isElmScrolledBottom(target)) {
        utils_1.setActiveState(utils_1.STATES.SCROLL_DOWN_CATCH, target);
        if (scrollDirection)
            isCatchPos = true;
    }
    if (utils_1.isElmScrolledBottom(parent)) {
        utils_1.setActiveState(utils_1.STATES.SCROLL_BREAK, target);
    }
    // handle scroll up and 'catch' so scrolls with window
    if (!utils_1.isElmScrolledBottom(target) && scrollDirection && !isCatchPos) {
        var YAxisSpace = parentHeight - targetHeight;
        var topDistanceFromParent = target.getBoundingClientRect().top - parent.getBoundingClientRect().top;
        var bottomYAxisSpace = YAxisSpace - topDistanceFromParent;
        utils_1.setActiveState(utils_1.STATES.UPSCROLL, target);
        target.style.bottom = bottomYAxisSpace + "px";
        isCatchPos = true;
    }
    // handle scroll up and 'catch' so scrolls with window DOWNSCROLL catch
    if (!scrollDirection && target.classList.contains('sticky-scroll-catch--scrolled-top') && !isCatchPos) {
        var YAxisSpace = parentHeight - targetHeight;
        var topDistanceFromParent = target.getBoundingClientRect().top - parent.getBoundingClientRect().top;
        var bottomYAxisSpace = YAxisSpace - topDistanceFromParent;
        utils_1.setActiveState(utils_1.STATES.DOWNSCROLL, target);
        target.style.bottom = bottomYAxisSpace + "px";
        isCatchPos = true;
    }
    if (!scrollDirection)
        isCatchPos = false;
    // fix to top
    if (target.getBoundingClientRect().top > 0 && scrollDirection) {
        utils_1.setActiveState(utils_1.STATES.SCROLL_TOP, target);
    }
    if (parent.getBoundingClientRect().top > 0) {
        utils_1.setActiveState(utils_1.STATES.INITAL, target);
        target.style.left = ''; // in case existing styles are present (outside the module)
    }
};
window.onscroll = function () {
    // print "false" if direction is down and "true" if up // creds IT VLOG https://stackoverflow.com/questions/31223341/detecting-scroll-direction
    scrollDirection = this.oldScroll > this.scrollY;
    this.oldScroll = this.scrollY;
};
exports["default"] = stickyScrollCatch;
