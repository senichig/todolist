const taskValue = document.getElementsByClassName('task_value')[0];
const priorityValue = document.getElementsByClassName('priority_value')[0];
const deadlineValue = document.getElementsByClassName('deadline_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];

// タスクの配列
const tasks = [];

// カテゴリーごとのタスクを管理するオブジェクト
const categories = {
  work: [],
  personel: [],
  shopping: [],
  // 他のカテゴリーを追加する場合はここに追加
};

// タスクを追加する関数
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

  // 各項目の値をspan要素に追加
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

  // タスクを配列とカテゴリーごとのオブジェクトに追加
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

  // タスクを優先順位と時間でソート
  sortTasks();

  // 既存の項目の下に新しいタスクの項目を追加
  taskList.appendChild(listItem);
};



// カテゴリーごとのタスクを表示する関数
const showTasksByCategory = (category) => {
  taskList.innerHTML = '';
  categories[category].forEach(task => {
    taskList.appendChild(task.element);
  });
};

// カテゴリー選択用のイベントリスナー
document.getElementById('work-category').addEventListener('click', () => showTasksByCategory('work'));
document.getElementById('personal-category').addEventListener('click', () => showTasksByCategory('personal'));
document.getElementById('shopping-category').addEventListener('click', () => showTasksByCategory('shopping'));
// 他のカテゴリーがあればここに追加

// Enterキーが押されたときにaddTasksを呼び出す
const handleEnterKey = (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    const task = taskValue.value;
    const priority = priorityValue.value;
    const deadline = deadlineValue.value;
    const category = document.querySelector('input[name="category"]:checked').value; // ラジオボタンからカテゴリーを取得
    addTasks(task, priority, deadline, category);
    taskValue.value = '';
    priorityValue.value = '';
    deadlineValue.value = '';
  }
};

// Enterキーが押されたときにhandleEnterKeyを呼び出す
taskValue.addEventListener('keyup', handleEnterKey);
priorityValue.addEventListener('keyup', handleEnterKey);
deadlineValue.addEventListener('keyup', handleEnterKey);

// 追加ボタンがクリックされたときのイベントリスナー
taskSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const task = taskValue.value;
  const priority = priorityValue.value;
  const deadline = deadlineValue.value;
  const category = document.querySelector('input[name="category"]:checked').value; // ラジオボタンからカテゴリーを取得
  addTasks(task, priority, deadline, category);
  taskValue.value = '';
  priorityValue.value = '';
  deadlineValue.value = '';
});

// 締切り日時を整形する関数
const formatDeadline = (deadline) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', options);
  return formattedDeadline;
};

// タスクを削除する関数
const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest('li');
  taskList.removeChild(chosenTask);

  // 配列とカテゴリーごとのオブジェクトからも削除
  const indexInTasks = tasks.findIndex(task => task.element === chosenTask);
  if (indexInTasks !== -1) {
    tasks.splice(indexInTasks, 1);
  }

  for (const category in categories) {
    const indexInCategory = categories[category].findIndex(task => task.element === chosenTask);
    if (indexInCategory !== -1) {
      categories[category].splice(indexInCategory, 1);
      break; // タスクは1つのカテゴリーにしか属さないと仮定
    }
  }
};

// タスクを優先順位と時間でソートする関数
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
