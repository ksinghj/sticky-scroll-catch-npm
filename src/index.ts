import { STATES, setActiveState, isElmScrolledBottom } from './utils'
// import debounce from './utils/debounce'

const target: HTMLElement = document.querySelector('.js-sticky-scroll-catch')
const parent: HTMLElement = target.parentElement

let targetHeight: number = target.offsetHeight
// let targetWidth: number = target.offsetWidth
let parentHeight: number = parent.offsetHeight
// let parentWidth: number = parent.offsetWidth
// TODO: calc width of parent - width of target
// use that val as left: property for fixed and absolute pos
// let leftSpace = parentWidth - targetWidth - target.getBoundingClientRect().left
// target.style.left = `${leftSpace}px`

let scrollDirection: boolean
let isCatchPos: boolean = false

const stickyScrollCatch = () => {
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
  if (!scrollDirection && target.classList.contains('sticky-scroll-catch--scrolled-top') && !isCatchPos) {
    let YAxisSpace = parentHeight - targetHeight
    let topDistanceFromParent: number = target.getBoundingClientRect().top - parent.getBoundingClientRect().top
    let bottomYAxisSpace: number = YAxisSpace - topDistanceFromParent

    setActiveState(STATES.DOWNSCROLL, target)
    target.style.bottom = `${bottomYAxisSpace}px`
    isCatchPos = true
  }

  if (!scrollDirection) isCatchPos = false

  // fix to top
  if (target.getBoundingClientRect().top > 0 && scrollDirection) {
    setActiveState(STATES.SCROLL_TOP, target)
  }

  if (parent.getBoundingClientRect().top > 0) {
    setActiveState(STATES.INITAL, target)
  }

  window.onscroll = function () {
    // print "false" if direction is down and "true" if up
    scrollDirection = this.oldScroll > this.scrollY
    this.oldScroll = this.scrollY
  }
}

window.addEventListener('scroll', stickyScrollCatch)
