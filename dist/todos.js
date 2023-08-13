"use strict";
// 타입단언 활용해보기
const btn = document.getElementById('btn');
const input = document.getElementById('todoinput');
const todoList = document.getElementById('todoList');
const form = document.querySelector('form');
const todos = loadTodos();
// 로컬스토리지에서 가져온 todos목록으로 리스트 생성
todos.forEach((list) => createTodo(list));
// 로컬스토리지에 저장된 투두 로드하기
function loadTodos() {
    const todosJSON = localStorage.getItem('todos');
    return todosJSON ? JSON.parse(todosJSON) : [];
}
// 로컬스토리지에 체크박스 상태 저장하기
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
// 투두 리스트 생성하기
function createTodo(todo) {
    let listLi = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', function () {
        todo.completed = checkbox.checked;
        saveTodos();
    });
    listLi.innerText = todo.text;
    listLi.appendChild(checkbox);
    todoList.appendChild(listLi);
}
// 투두 입력후 제출하기
function handleSubmit(e) {
    e.preventDefault();
    if (input.value) {
        const newTodo = { text: input.value, completed: false };
        createTodo(newTodo);
        todos.push(newTodo);
        saveTodos();
        input.value = '';
    }
    else {
        alert('리스트가 작성되지 않았습니다.');
    }
}
form.addEventListener('submit', handleSubmit);
