"use strict";
exports.__esModule = true;
exports.setActiveState = exports.STATES = exports.resetStyle = exports.isElmScrolledBottom = void 0;
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
    INITAL: {
        className: 'sticky-scroll-catch--initial',
        position: ''
    },
    SCROLL_DOWN_CATCH: {
        className: 'sticky-scroll-catch--scrolled',
        position: 'fixed'
    },
    SCROLL_BREAK: {
        className: 'sticky-scroll-catch--break',
        position: 'absolute'
    },
    UPSCROLL: {
        className: 'sticky-scroll-catch--upscroll',
        position: 'absolute'
    },
    DOWNSCROLL: {
        className: 'sticky-scroll-catch--downscroll',
        position: 'absolute'
    },
    SCROLL_TOP: {
        className: 'sticky-scroll-catch--scrolled-top',
        position: 'fixed'
    },
    SCROLL_TOP_BREAK: {
        className: 'sticky-scroll-catch--initial',
        position: ''
    }
};
var setActiveState = function (state, elm) {
    var targetLeftPos = calcLeftPos(elm);
    exports.resetStyle(elm);
    if (state.position == 'fixed') {
        elm.style.left = targetLeftPos.fixed + "px";
    }
    else if (state.position == 'absolute') {
        elm.style.left = targetLeftPos.absolute + "px";
    }
    else {
        elm.style.left = '';
    }
    elm.style.position = state.position;
    elm.classList.add(state.className);
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
