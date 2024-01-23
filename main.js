const taskValue = document.getElementsByClassName('task_value')[0];
const priorityValue = document.getElementsByClassName('priority_value')[0];
const deadlineValue = document.getElementsByClassName('deadline_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];

const tasks = [];
const categories = {
  work: [],
  personal: [], // corrected the typo
  shopping: [],
  // 他のカテゴリーを追加する場合はここに追加
};

const addTasks = (task, priority, deadline, category) => {
  const listItem = document.createElement('li');
  listItem.setAttribute('data-priority', priority);
  listItem.setAttribute('data-deadline', deadline);
  listItem.setAttribute('data-category', category);

  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const today = new Date();
  const taskDeadline = new Date(deadline);

  if (taskDeadline - today < oneDayInMillis) {
    listItem.classList.add('urgent-task');
  }

  listItem.innerHTML = `
    <strong>${task}</strong>
    <span>${formatDeadline(deadline)}</span>
    <span>${priority}</span>
    <span>${category}</span>
  `;

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '完了';
  listItem.appendChild(deleteButton);

  deleteButton.addEventListener('click', evt => {
    evt.preventDefault();
    deleteTasks(deleteButton);
  });

  tasks.push({
    element: listItem,
    priority: parseInt(priority),
    deadline: new Date(deadline),
    category: category,
  });

  categories[category].push({
    element: listItem,
    priority: parseInt(priority),
    deadline: new Date(deadline),
    category: category,
  });

  sortTasks();
  taskList.appendChild(listItem);
};

const showTasksByCategory = (category) => {
  taskList.innerHTML = '';
  categories[category].forEach(task => {
    taskList.appendChild(task.element);
  });
};

document.getElementById('work-category').addEventListener('click', () => showTasksByCategory('work'));
document.getElementById('personal-category').addEventListener('click', () => showTasksByCategory('personal'));
document.getElementById('shopping-category').addEventListener('click', () => showTasksByCategory('shopping'));

const handleEnterKey = (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    const task = taskValue.value;
    const priority = priorityValue.value;
    const deadline = deadlineValue.value;
    const category = document.querySelector('input[name="category"]:checked').value;
    addTasks(task, priority, deadline, category);
    clearInputFields(); // New function to clear input fields
  }
};

taskValue.addEventListener('keyup', handleEnterKey);
priorityValue.addEventListener('keyup', handleEnterKey);
deadlineValue.addEventListener('keyup', handleEnterKey);

taskSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const task = taskValue.value;
  const priority = priorityValue.value;
  const deadline = deadlineValue.value;
  const category = document.querySelector('input[name="category"]:checked').value;
  addTasks(task, priority, deadline, category);
  clearInputFields();
});

const formatDeadline = (deadline) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', options);
  return formattedDeadline;
};

const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest('li');
  taskList.removeChild(chosenTask);

  const indexInTasks = tasks.findIndex(task => task.element === chosenTask);
  if (indexInTasks !== -1) {
    tasks.splice(indexInTasks, 1);
  }

  for (const category in categories) {
    const indexInCategory = categories[category].findIndex(task => task.element === chosenTask);
    if (indexInCategory !== -1) {
      categories[category].splice(indexInCategory, 1);
      break;
    }
  }
};

const sortTasks = () => {
  tasks.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    } else {
      return a.deadline - b.deadline;
    }
  });

  taskList.innerHTML = '';
  tasks.forEach(task => {
    taskList.appendChild(task.element);
  });
};

const clearInputFields = () => {
  taskValue.value = '';
  priorityValue.value = '';
  deadlineValue.value = '';
};
