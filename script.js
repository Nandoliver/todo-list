const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addTaskBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  const task = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = '';
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);
    li.textContent = task.text;

    li.addEventListener('click', () => toggleTask(task.id));
    li.addEventListener('dblclick', () => removeTask(task.id));

    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();
