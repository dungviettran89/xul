export const delay = (func: () => void, wait: number): ((immediate: boolean) => void) => {
  let timeout: any;
  return (immediate: boolean) => {
    // Invoke now if needed
    if (immediate) {
      clearTimeout(timeout);
      timeout = undefined;
      return func();
    }
    // Ignore subsequence call
    if (timeout) {
      return;
    }
    timeout = setTimeout(() => {
      timeout = undefined;
      func();
    }, wait);
  };
};
