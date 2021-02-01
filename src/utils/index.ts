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
  INITAL: string
  SCROLL_DOWN_CATCH: string
  SCROLL_BREAK: string
  UPSCROLL: string
  DOWNSCROLL: string
  SCROLL_TOP: string
  SCROLL_TOP_BREAK: string
}

export const STATES: StatesConfig = {
  INITAL: 'sticky-scroll-catch--initial',
  SCROLL_DOWN_CATCH: 'sticky-scroll-catch--scrolled',
  SCROLL_BREAK: 'sticky-scroll-catch--break',
  UPSCROLL: 'sticky-scroll-catch--upscroll',
  DOWNSCROLL: 'sticky-scroll-catch--downscroll',
  SCROLL_TOP: 'sticky-scroll-catch--scrolled-top',
  SCROLL_TOP_BREAK: 'sticky-scroll-catch--initial',
}

export const setActiveState = (classToAdd: string, elm: HTMLElement): void => {
  resetStyle(elm)
  elm.classList.add(classToAdd)
}

function getPreviousSiblings(elem: HTMLElement) {
  var siblings = [];
  while (elem = elem.previousSibling) {
      if (elem.nodeType === 3) continue; // text node
      siblings.push(elem);
  }
  return siblings;
}

const reducer = (accumulator: number, currentValue: number): number => accumulator + currentValue;

export const calcLeftPos = (elm: HTMLElement) => {
  let targetPrevSiblings = getPreviousSiblings(elm)
  let siblingWidths = targetPrevSiblings.map(sibling => sibling.getBoundingClientRect().width)
  let totalSiblingWidths = siblingWidths.reduce(reducer)
  let containerOffsetLeft = elm.parentElement.getBoundingClientRect().left
  return {
    fixed: totalSiblingWidths + containerOffsetLeft,
    absolute: totalSiblingWidths
  }
}
