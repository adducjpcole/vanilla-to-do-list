/**
 * @param {HTMLUListElement | HTMLOListElement} taskContainer
 */
export default function saveTasks(taskContainer) {
  let tasks = [];
  for (let i = 0; i < taskContainer.children.length; i++) {
    const label = taskContainer.children
      .item(i)
      .getElementsByTagName('p')
      .item(0).innerText;
    const checked = taskContainer.children
      .item(i)
      .getElementsByTagName('input')
      .item(0).checked;
    tasks.push({ label, checked });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
