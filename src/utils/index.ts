export const isElmScrolledBottom = (elm: HTMLElement): boolean => {
  let bottomScroll: number = window.scrollY + window.innerHeight
  let elmHeight: number = elm.offsetHeight
  let elmDistanceToTop: number = window.pageYOffset + elm.getBoundingClientRect().top

  const isScrolledToEnd: boolean = elmHeight + elmDistanceToTop < bottomScroll
  return isScrolledToEnd
}

export const resetStyle = (elm: HTMLElement, classPrefix: string): void => {
  elm.style.bottom = null
  for (let i = elm.classList.length - 1; i >= 0; i--) {
    const className = elm.classList[i]
    if (className.startsWith(classPrefix)) {
      elm.classList.remove(className)
    }
  }
}
