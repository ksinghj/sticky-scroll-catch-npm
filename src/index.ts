import { isElmScrolledBottom, resetStyle, STATES, setActiveState } from './utils'

// TODO: debounce

const target: HTMLElement = document.querySelector('.js-sticky-scroll-catch')
const parent: HTMLElement = target.parentElement

let targetHeight: number = target.offsetHeight
let parentHeight: number = parent.offsetHeight

let scrollDirection: boolean

window.addEventListener('scroll', () => {
  if (isElmScrolledBottom(target)) {
    setActiveState(STATES.SCROLL_DOWN_CATCH, target)
  }

  if (isElmScrolledBottom(parent)) {
    setActiveState(STATES.SCROLL_BREAK, target)
  }

  // handle scroll up and 'catch' so scrolls with window
  if (!isElmScrolledBottom(target) && scrollDirection) {
    let YAxisSpace = parentHeight - targetHeight
    let topDistanceFromParent: number = target.getBoundingClientRect().top - parent.getBoundingClientRect().top
    let bottomYAxisSpace: number = YAxisSpace - topDistanceFromParent

    setActiveState(STATES.UPSCROLL, target)
    target.style.bottom = `${bottomYAxisSpace}px`

    // fix to top
    if (target.getBoundingClientRect().top > 0) {
      setActiveState(STATES.SCROLL_TOP, target)
    }
  }

  if (parent.getBoundingClientRect().top >= target.getBoundingClientRect().top) {
    setActiveState(STATES.INITAL, target)
  }

  window.onscroll = function () {
    // print "false" if direction is down and "true" if up
    scrollDirection = this.oldScroll > this.scrollY
    this.oldScroll = this.scrollY
  }
})

// for (let i = target.classList.length - 1; i >= 0; i--) {
//     const className = target.classList[i]
//     if (className.startsWith('sticky-scroll-catch-')) {
//       // setActiveState(STATES.INITAL, target)
//       console.log(className)
//     }
//   }
