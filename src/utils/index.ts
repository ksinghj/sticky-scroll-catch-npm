export const isElmScrolledBottom = (elm: HTMLElement): boolean => {
  let bottomScroll: number = window.scrollY + window.innerHeight
  let elmHeight: number = elm.offsetHeight
  let elmDistanceToTop: number = window.pageYOffset + elm.getBoundingClientRect().top

  const isScrolledToEnd: boolean = elmHeight + elmDistanceToTop < bottomScroll
  return isScrolledToEnd
}

export const resetStyle = (elm: HTMLElement, classPrefix = 'sticky-scroll-catch'): void => {
  elm.style.bottom = null
  for (let i = elm.classList.length - 1; i >= 0; i--) {
    const className = elm.classList[i]
    if (className.startsWith(classPrefix)) {
      elm.classList.remove(className)
    }
  }
}

// when one state is active all others are not
interface StatesConfig {
  INITAL: {
    className: string,
    position: string
  }
  SCROLL_DOWN_CATCH: {
    className: string,
    position: string
  }
  SCROLL_BREAK: {
    className: string,
    position: string
  }
  UPSCROLL: {
    className: string,
    position: string
  }
  DOWNSCROLL: {
    className: string,
    position: string
  }
  SCROLL_TOP: {
    className: string,
    position: string
  }
  SCROLL_TOP_BREAK: {
    className: string,
    position: string
  }
}

export const STATES: StatesConfig = {
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
  },
}

export const setActiveState = (state: object, elm: HTMLElement): void => {
  let targetLeftPos = calcLeftPos(elm)
  resetStyle(elm)
  if(state.position == 'fixed') {
    elm.style.left = `${targetLeftPos.fixed}px`
  } else if (state.position == 'absolute') {
    elm.style.left = `${targetLeftPos.absolute}px`
  } else {
    elm.style.left = ''
  }

  elm.style.position = state.position
  elm.classList.add(state.className)
}

const calcLeftPos = (elm: HTMLElement) => {
  let left = elm.getBoundingClientRect().left
  let parentLeft = elm.parentElement.getBoundingClientRect().left

  let res = left - parentLeft
  return {
    fixed: left,
    absolute: res
  }
}
