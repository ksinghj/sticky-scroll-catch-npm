import { isElmScrolledBottom, resetStyle } from './utils'

// TODO: debounce

const target: HTMLElement = document.querySelector('.js-sticky-scroll-catch')
const parent: HTMLElement = target.parentElement

let targetHeight: number = target.offsetHeight
let parentHeight: number = parent.offsetHeight

let scrollDirection: boolean

window.addEventListener('scroll', () => {
  if (isElmScrolledBottom(target)) {
    target.classList.add('sticky-scroll-catch--scrolled')
  }
  if (isElmScrolledBottom(parent)) {
    target.classList.add('sticky-scroll-catch--break')
  }

  // handle scroll up and 'catch' so scrolls with window
  if (!isElmScrolledBottom(target) && scrollDirection) {
    let YAxisSpace = parentHeight - targetHeight
    let topDistanceFromParent: number = target.getBoundingClientRect().top - parent.getBoundingClientRect().top
    let bottomYAxisSpace: number = YAxisSpace - topDistanceFromParent

    target.classList.remove('sticky-scroll-catch--scrolled')
    target.classList.remove('sticky-scroll-catch--break')

    target.style.bottom = `${bottomYAxisSpace}px`
    target.classList.add('sticky-scroll-catch--upscroll')

    // fix to top
    if (target.getBoundingClientRect().top > 0) {
      target.classList.remove('sticky-scroll-catch--scrolled')
      target.classList.remove('sticky-scroll-catch--break')
      target.classList.remove('sticky-scroll-catch--upscroll')
      target.classList.add('sticky-scroll-catch--scrolled-top')

      //   resetStyle(target, 'sticky-scroll-catch')
    }
  }

  if (!scrollDirection) {
    target.classList.remove('sticky-scroll-catch--upscroll')
  }

  window.onscroll = function () {
    // print "false" if direction is down and "true" if up
    scrollDirection = this.oldScroll > this.scrollY
    this.oldScroll = this.scrollY
  }
})
