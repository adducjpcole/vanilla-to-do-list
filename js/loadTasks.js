import createLiTask from './createLiTask.js';
import saveTasks from './saveTasks.js';

/**
 * @param {HTMLUListElement | HTMLOListElement} taskContainer
 */
export default function loadTasks(taskContainer) {
  let tasks = localStorage.getItem('tasks');
  if (!tasks) tasks = '[]';

  for (const task of JSON.parse(tasks)) {
    taskContainer.appendChild(
      createLiTask(
        task.label,
        task.checked,
        () => saveTasks(taskContainer),
        () => saveTasks(taskContainer),
      ),
    );
  }
}
