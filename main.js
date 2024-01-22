const taskValue = document.getElementsByClassName('task_value')[0];
const priorityValue = document.getElementsByClassName('priority_value')[0];
const deadlineValue = document.getElementsByClassName('deadline_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];

//　タスクの配列
const tasks = [];

//タスクを追加する関数
const addTasks = (task, priority, deadline) => {
  const listItem = document.createElement('li');
  listItem.setAttribute('data-priority', priority);
  listItem.setAttribute('data-deadline', deadline);
  const showItem = taskList.appendChild(listItem);
  showItem.innerHTML = `<strong>${task}</strong> - 優先順位: ${priority} - 締切: ${formatDeadline(deadline)}`;

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '完了';
  listItem.appendChild(deleteButton);

  deleteButton.addEventListener('click', evt => {
    evt.preventDefault();
    deleteTasks(deleteButton);
  });

  // 追加: タスクを配列に追加
  tasks.push({
    element: listItem,
    priority: parseInt(priority),
    deadline: new Date(deadline)
  });

  // 追加: タスクを優先順位と時間でソート
  sortTasks();
};

taskSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const task = taskValue.value;
  const priority = priorityValue.value;
  const deadline = deadlineValue.value;
  addTasks(task, priority, deadline);
  taskValue.value = '';
  priorityValue.value = '';
  deadlineValue.value = '';
});


const formatDeadline = (deadline) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', options);
  return formattedDeadline;
};

const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest('li');
  taskList.removeChild(chosenTask);

  // 追加: 配列からも削除
  tasks.splice(tasks.findIndex(task => task.element === chosenTask), 1);
};

// 追加: タスクを優先順位と時間でソートする関数
const sortTasks = () => {
  tasks.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    } else {
      return a.deadline - b.deadline;
    }
  });

  // タスクを再描画
  taskList.innerHTML = '';
  tasks.forEach(task => {
    taskList.appendChild(task.element);
  });
};
