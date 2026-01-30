const PARSER = new DOMParser();

/**
 * @param {string} label
 * @param {boolean} checked
 * @param {Function?} onRemoveTask
 * @param {Function?} onCheckTask
 */
export default function createLiTask(
  label,
  checked,
  onRemoveTask,
  onCheckTask,
) {
  /** @type {HTMLLIElement} */
  const li = PARSER.parseFromString(
    `
    <li class="flex items-center justify-between overflow-hidden scroll-m-0 mb-0 max-h-0 transition-all rounded">
      <span class="group flex flex-1 px-2 py-1 mr-2 items-center gap-2 hover:bg-neutral-200/50">
        <input type="checkbox"
          class="peer appearance-none size-6 border-2 border-purple-600 rounded-full checked:bg-purple-600 transition-all relative checked:group-hover:bg-purple-600/50 group-hover:bg-purple-600/50 hover:bg-purple-600/50

          after:content-[''] after:absolute after:inset-0 after:flex after:items-center after:justify-center
        after:text-white after:text-sm after:font-bold after:opacity-0
          checked:after:opacity-100 checked:after:content-['✓']"
          ${checked ? 'checked' : ''}
        />
        <p
          class="peer-checked:line-through decoration-2 peer-checked:text-neutral-400"
        >
            ${label}
        </p>
      </span>
      <button class="peer size-6 text-neutral-600 hover:text-neutral-800 hover:scale-150 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="fill-none stroke-current stroke-2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </li>
    `,
    'text/html',
  ).body.firstChild;

  const checkbox = li.getElementsByTagName('input').item(0);
  checkbox.addEventListener('change', () => onCheckTask?.());

  {
    /** @type {HTMLSpanElement} */
    const span = checkbox.parentElement;
    span.addEventListener('click', (ev) => {
      if (ev.target === checkbox) return;

      checkbox.checked = !checkbox.checked;
      onCheckTask?.();
    });
  }

  requestAnimationFrame(() => {
    li.classList.remove('mb-0');
    li.classList.remove('max-h-0');
    li.classList.add('mb-2');
    li.classList.add('max-h-24');
  });

  const button = li.getElementsByTagName('button').item(0);
  button.addEventListener('click', () => {
    li.classList.remove('mb-2');
    li.classList.remove('max-h-24');
    li.classList.add('mb-0');
    li.classList.add('max-h-0');

    // Default duration is 150ms
    setTimeout(() => {
      li.parentElement.removeChild(li);
      onRemoveTask?.();
    }, 150 * 0.8);
  });

  return li;
}
