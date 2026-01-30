import createLiTask from './js/createLiTask.js';
import loadTasks from './js/loadTasks.js';
import saveTasks from './js/saveTasks.js';
import showTemporarily from './js/showTemporarily.js';
/** @type {HTMLFormElement} */
const FORM_TASK_ADDER = document.getElementById('task-adder');
/** @type {HTMLUListElement} */
const UL_TASKS = document.getElementById('tasks');
loadTasks(UL_TASKS);
/** @type {HTMLParagraphElement} */
const P_ERROR_DISPLAY = document.getElementById('error-display');

FORM_TASK_ADDER.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const formData = new FormData(FORM_TASK_ADDER);

  const errorMessage = validateFormData(formData);
  if (errorMessage !== '') {
    P_ERROR_DISPLAY.innerText = errorMessage;
    showTemporarily(P_ERROR_DISPLAY);
    return;
  }

  UL_TASKS.appendChild(
    createLiTask(
      formData.get('task-label'),
      false,
      () => saveTasks(UL_TASKS),
      () => saveTasks(UL_TASKS),
    ),
  );
  saveTasks(UL_TASKS);

  FORM_TASK_ADDER.reset();
});

/**
 * @param {FormData} formData
 */
function validateFormData(formData) {
  /** @type {string} */
  let taskLabel = formData.get('task-label').trim();
  if (taskLabel.length === 0) return 'Task label cannot be empty';

  formData.set('task-label', taskLabel);

  return '';
}
