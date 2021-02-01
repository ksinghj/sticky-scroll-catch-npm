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
function getPreviousSiblings(elem) {
    var siblings = [];
    while (elem = elem.previousSibling) {
        if (elem.nodeType === 3)
            continue; // text node
        siblings.push(elem);
    }
    return siblings;
}
var reducer = function (accumulator, currentValue) { return accumulator + currentValue; };
var calcLeftPos = function (elm) {
    var targetPrevSiblings = getPreviousSiblings(elm);
    var siblingWidths = targetPrevSiblings.map(function (sibling) { return sibling.getBoundingClientRect().width; });
    var totalSiblingWidths = siblingWidths.reduce(reducer);
    var containerOffsetLeft = elm.parentElement.getBoundingClientRect().left;
    return {
        fixed: totalSiblingWidths + containerOffsetLeft,
        absolute: totalSiblingWidths
    };
};
exports.calcLeftPos = calcLeftPos;
