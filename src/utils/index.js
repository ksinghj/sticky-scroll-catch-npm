"use strict";
exports.__esModule = true;
exports.calcLeftPos = exports.setActiveState = exports.STATES = exports.resetStyle = exports.isElmScrolledBottom = void 0;
var isElmScrolledBottom = function (elm) {
    var bottomScroll = window.scrollY + window.innerHeight;
    var elmHeight = elm.offsetHeight;
    var elmDistanceToTop = window.pageYOffset + elm.getBoundingClientRect().top;
    var isScrolledToEnd = elmHeight + elmDistanceToTop < bottomScroll;
    return isScrolledToEnd;
};
exports.isElmScrolledBottom = isElmScrolledBottom;
var resetStyle = function (elm, classPrefix) {
    if (classPrefix === void 0) { classPrefix = 'sticky-scroll-catch'; }
    elm.style.bottom = null;
    for (var i = elm.classList.length - 1; i >= 0; i--) {
        var className = elm.classList[i];
        if (className.startsWith(classPrefix)) {
            elm.classList.remove(className);
        }
    }
};
exports.resetStyle = resetStyle;
exports.STATES = {
    INITAL: 'sticky-scroll-catch--initial',
    SCROLL_DOWN_CATCH: 'sticky-scroll-catch--scrolled',
    SCROLL_BREAK: 'sticky-scroll-catch--break',
    UPSCROLL: 'sticky-scroll-catch--upscroll',
    DOWNSCROLL: 'sticky-scroll-catch--downscroll',
    SCROLL_TOP: 'sticky-scroll-catch--scrolled-top',
    SCROLL_TOP_BREAK: 'sticky-scroll-catch--initial'
};
var setActiveState = function (classToAdd, elm) {
    exports.resetStyle(elm);
    elm.classList.add(classToAdd);
};
exports.setActiveState = setActiveState;
var calcLeftPos = function (elm) {
    var left = elm.getBoundingClientRect().left;
    var parentLeft = elm.parentElement.getBoundingClientRect().left;
    var res = left - parentLeft;
    return {
        fixed: left,
        absolute: res
    };
};
exports.calcLeftPos = calcLeftPos;
