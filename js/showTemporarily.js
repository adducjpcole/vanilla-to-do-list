const timeoutMap = new WeakMap();

/**
 * @param {HTMLElement} elem
 * @param {number?} duration
 */
export default function showTemporarily(elem, duration = 1000) {
  if (timeoutMap.has(elem)) clearTimeout(timeoutMap.get(elem));

  elem.classList.remove('opacity-0');
  elem.classList.add('opacity-100');

  timeoutMap.set(
    elem,
    setTimeout(() => {
      elem.classList.add('opacity-0');
      elem.classList.remove('opacity-100');
      timeoutMap.delete(elem);
    }, duration),
  );
}
