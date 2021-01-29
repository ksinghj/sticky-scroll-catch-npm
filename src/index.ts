import { STATES, setActiveState, isElmScrolledBottom } from './utils'

// TODO: debounce

const target: HTMLElement = document.querySelector('.js-sticky-scroll-catch')
const parent: HTMLElement = target.parentElement

let targetHeight: number = target.offsetHeight
let parentHeight: number = parent.offsetHeight

let scrollDirection: boolean
let isCatchPos: boolean = false

window.addEventListener('scroll', () => {
  if (isElmScrolledBottom(target)) {
    setActiveState(STATES.SCROLL_DOWN_CATCH, target)

    if (scrollDirection) isCatchPos = true
  }

  if (isElmScrolledBottom(parent)) {
    setActiveState(STATES.SCROLL_BREAK, target)
  }

  // handle scroll up and 'catch' so scrolls with window
  if (!isElmScrolledBottom(target) && scrollDirection && !isCatchPos) {
    let YAxisSpace = parentHeight - targetHeight
    let topDistanceFromParent: number = target.getBoundingClientRect().top - parent.getBoundingClientRect().top
    let bottomYAxisSpace: number = YAxisSpace - topDistanceFromParent

    setActiveState(STATES.UPSCROLL, target)
    target.style.bottom = `${bottomYAxisSpace}px`
    isCatchPos = true
  }

  // handle scroll up and 'catch' so scrolls with window DOWNSCROLL catch

  if (!scrollDirection) isCatchPos = false

  // fix to top
  if (target.getBoundingClientRect().top > 0 && scrollDirection) {
    setActiveState(STATES.SCROLL_TOP, target)
  }

  if (parent.getBoundingClientRect().top == target.getBoundingClientRect().top) {
    setActiveState(STATES.INITAL, target)
  }

  console.log(parent.getBoundingClientRect().top == target.getBoundingClientRect().top)

  if (!scrollDirection && target.classList.contains('sticky-scroll-catch--scrolled-top')) {
    setActiveState(STATES.SCROLL_DOWN_CATCH, target)
  }

  window.onscroll = function () {
    // print "false" if direction is down and "true" if up
    scrollDirection = this.oldScroll > this.scrollY
    this.oldScroll = this.scrollY
  }
})
