import createLiTask from './createLiTask.js';
import saveTasks from './saveTasks.js';

export default function loadTasks() {
  const tasks = localStorage.getItem('tasks');
  if (!tasks) tasks = '[]';

  const container = document.createDocumentFragment();
  for (const task of JSON.parse(tasks)) {
    container.appendChild(
      createLiTask(
        task.label,
        task.checked,
        () => saveTasks(container),
        () => saveTasks(container),
      ),
    );
  }

  return container;
}
