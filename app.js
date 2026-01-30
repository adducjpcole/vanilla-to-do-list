import createTaskLi from './js/createTaskLi.js';
import loadTasks from './js/loadTasks.js';
import saveTasks from './js/saveTasks.js';
const FORM_TASK_ADDER = document.getElementById('task-adder');
const UL_TASKS = document.getElementById('tasks');
UL_TASKS.appendChild(loadTasks());

FORM_TASK_ADDER.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const formData = new FormData(ev.currentTarget);
  UL_TASKS.appendChild(
    createTaskLi(
      formData.get('task-label'),
      false,
      () => saveTasks(UL_TASKS),
      () => saveTasks(UL_TASKS),
    ),
  );

  saveTasks(UL_TASKS);
});
