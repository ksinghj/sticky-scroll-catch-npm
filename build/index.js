require("./index.css");var t,c=function(t){var c=window.scrollY+window.innerHeight;return t.offsetHeight+(window.pageYOffset+t.getBoundingClientRect().top)<c},o="sticky-scroll-catch--initial",l="sticky-scroll-catch--scrolled",s="sticky-scroll-catch--break",i="sticky-scroll-catch--upscroll",e="sticky-scroll-catch--downscroll",n="sticky-scroll-catch--scrolled-top",r=function(t,c){!function(t){var c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"sticky-scroll-catch";t.style.bottom=null;for(var o=t.classList.length-1;o>=0;o--){var l=t.classList[o];l.startsWith(c)&&t.classList.remove(l)}}(c),c.classList.add(t)},a=document.querySelector(".js-sticky-scroll-catch"),d=a.parentElement,g=a.offsetHeight,h=d.offsetHeight,u=!1;exports.default=function(){if(c(a)&&(r(l,a),t&&(u=!0)),c(d)&&r(s,a),!c(a)&&t&&!u){var f=h-g-(a.getBoundingClientRect().top-d.getBoundingClientRect().top);r(i,a),a.style.bottom="".concat(f,"px"),u=!0}if(!t&&a.classList.contains("sticky-scroll-catch--scrolled-top")&&!u){var p=h-g-(a.getBoundingClientRect().top-d.getBoundingClientRect().top);r(e,a),a.style.bottom="".concat(p,"px"),u=!0}t||(u=!1),a.getBoundingClientRect().top>0&&t&&r(n,a),d.getBoundingClientRect().top>0&&r(o,a),window.onscroll=function(){t=this.oldScroll>this.scrollY,this.oldScroll=this.scrollY}};
//# sourceMappingURL=index.js.map