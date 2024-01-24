/* モバイルファーストのスタイリング */
html {
  font-size: 16px;
}

body, html {
  width: 100%;
  margin: 1rem auto;
  font-family: serif;
}

/* タスク入力フォームと追加ボタンのスタイル */
.task_value, .deadline_value, .priority_value, .task_submit {
  width: 15%; /* 幅を50%に設定し、マージンを調整 */
  height: 1.5rem;
  letter-spacing: 0cap;
  margin-bottom: 0.5rem;
  box-sizing: border-box; /* 幅にpaddingやborderが含まれるように設定 */
}

.task_submit {
  margin-left: 1rem; /* 追加ボタンに左マージンを追加 */
  width: 50px;
}

/* カテゴリー選択用のラジオボタン */
form label {
  display: block;
  margin-bottom: 0.5rem;
}

/* タスクリスト表示エリアのスタイル */
#table {
  background-color: #F2F2F2;
  width: 70%;
  margin: 2rem auto;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

h1 {
  text-align: center;
  color: #1F497D;
}

h2 {
  font-size: 1.5rem;
  font: optional;
  text-align: center;
  margin-bottom: 1rem;
  color: #2E75B6;
}

/* タスクリストアイテムのスタイル */
li {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #D9D9D9;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
}

.task_list {
  list-style-type: none;
  padding: 0;
}

/* タスク削除ボタンのスタイル */
li button {
  background-color: #E81123;
  color: #FFFFFF;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.2rem;
  flex-shrink: 0;
}

/* ボタンホバーエフェクト */
li button:hover {
  background-color: #FF5050;
}

.task_header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 0.5rem;
  text-align: center;
}

.task_header span:last-child  {
  flex: 0 0 50px; /* 完了ボタンの幅を調整 */
}

.task_list {
  list-style-type: none;
  text-align: center;
}

form {
  text-align: center;
}

strong, span {
  border: solid 1px;
  border-collapse: collapse;
  width: 100%;
  background-color: rgb(236, 233, 231);
  padding: 10px 0;
  text-align: center;
}

