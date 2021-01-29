export default function debounce(func: Function, wait: number, immediate: boolean = false): Function {
  let timeout: any
  return function (): void {
    let context: any = this,
      args = arguments
    let later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// creds to https://davidwalsh.name/javascript-debounce-function
