// HTML要素からタスク、優先度、締め切り、サブミットボタン、タスクリストの各要素を取得
const taskValue = document.getElementsByClassName('task_value')[0];
const priorityValue = document.getElementsByClassName('priority_value')[0];
const deadlineValue = document.getElementsByClassName('deadline_value')[0];
const taskSubmit = document.getElementsByClassName('task_submit')[0];
const taskList = document.getElementsByClassName('task_list')[0];

// タスクとカテゴリーの配列を初期化
const tasks = [];
const categories = {
  work: [],
  private: [], 
  shopping: [],
  // 他のカテゴリーを追加する場合はここに追加
};

// タスクを追加する関数
const addTasks = (task, priority, deadline, category) => {
  const listItem = document.createElement('li');
  listItem.setAttribute('data-priority', priority);
  listItem.setAttribute('data-deadline', deadline);
  listItem.setAttribute('data-category', category);

  // 期限が当日よりも前なら、急務のスタイルを適用
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const today = new Date();
  const taskDeadline = new Date(deadline);

  if (taskDeadline - today < oneDayInMillis) {
    listItem.classList.add('urgent-task');
    listItem.style.color = '#E81123';
  }

  // タスクリストアイテムのHTMLを構築
  listItem.innerHTML = `
    <strong>${task}</strong>
    <span>${formatDeadline(deadline)}</span>
    <span>${priority}</span>
    <span>${category}</span>
  `;

  // 完了ボタンを追加
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '完了';
  listItem.appendChild(deleteButton);

  // 完了ボタンのクリックイベントを設定
  deleteButton.addEventListener('click', evt => {
    evt.preventDefault();
    deleteTasks(deleteButton);
  });

  // タスクとカテゴリーに情報を追加
  const newTask = {
    element: listItem,
    priority: parseInt(priority),
    deadline: new Date(deadline),
    category: category,
  };

  // タスクを優先度と期限に基づいて挿入
  insertSorted(newTask, tasks);
  insertSorted(newTask, categories[category]);

  // タスクリストを再描画
  taskList.appendChild(listItem);
  
  sortTasks();
};

// 優先度と期限に基づいてソートされた配列に新しい要素を挿入する関数
const insertSorted = (newTask, array) => {
  const index = array.findIndex(task => task.priority > newTask.priority || (task.priority === newTask.priority && task.deadline > newTask.deadline));
  if (index !== -1) {
    array.splice(index, 0, newTask);
  } else {
    array.push(newTask);
  }
};


// カテゴリーごとにタスクを表示
const showTasksByCategory = (category) => {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    if (!category || task.category === category) {
      taskList.appendChild(task.element.cloneNode(true));
    }
  });

  Object.values(categories).forEach(categoryTasks => {
    categoryTasks.forEach(task => {
      taskList.appendChild(task.element.cloneNode(true));
    });
  });
};




// カテゴリークリック時のイベントリスナーを設定
document.getElementById('work-category').addEventListener('click', () => showTasksByCategory('仕事'));
document.getElementById('private-category').addEventListener('click', () => showTasksByCategory('個人'));
document.getElementById('shopping-category').addEventListener('click', () => showTasksByCategory('買い物'));

// Enterキーが押されたときのイベントハンドラを設定
const handleEnterKey = (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    const task = taskValue.value;
    const priority = priorityValue.value;
    const deadline = deadlineValue.value;
    const category = document.querySelector('input[name="category"]:checked').value;
    addTasks(task, priority, deadline, category);
    clearInputFields(); // 新しい関数：入力フィールドをクリア
  }
};

// 入力フィールドにEnterキーイベントを追加
taskValue.addEventListener('keyup', handleEnterKey);
priorityValue.addEventListener('keyup', handleEnterKey);
deadlineValue.addEventListener('keyup', handleEnterKey);

// サブミットボタンクリック時のイベントハンドラを設定
taskSubmit.addEventListener('click', evt => {
  evt.preventDefault();
  const task = taskValue.value;
  const priority = priorityValue.value;
  const deadline = deadlineValue.value;
  const category = document.querySelector('input[name="category"]:checked').value;
  addTasks(task, priority, deadline, category);
  clearInputFields();
});

// 期限のフォーマットを行う関数
const formatDeadline = (deadline) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const formattedDeadline = new Date(deadline).toLocaleDateString('en-US', options);
  return formattedDeadline;
};

// タスクを削除する関数
const deleteTasks = (deleteButton) => {
  const chosenTask = deleteButton.closest('li');
  taskList.removeChild(chosenTask);

  // タスク配列から削除
  const indexInTasks = tasks.findIndex(task => task.element === chosenTask);
  if (indexInTasks !== -1) {
    tasks.splice(indexInTasks, 1);
  }

  // カテゴリーごとのタスク配列から削除
  for (const category in categories) {
    const indexInCategory = categories[category].findIndex(task => task.element === chosenTask);
    if (indexInCategory !== -1) {
      categories[category].splice(indexInCategory, 1);
      break;
    }
  }
};

// タスクを優先度と期限に基づいてソートする関数
const sortTasks = () => {
  tasks.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    } else {
      return a.deadline - b.deadline;
    }
  });

 // タスクリストを再描画
 taskList.innerHTML = '';
 tasks.forEach(task => {
   taskList.appendChild(task.element);
 });
};

// 入力フィールドをクリアする関数
const clearInputFields = () => {
  taskValue.value = '';
  priorityValue.value = '';
  deadlineValue.value = '';
};
