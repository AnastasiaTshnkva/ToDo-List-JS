//
// import { toDoConstructor } from "./scripts/constructor.js";

const root = document.getElementById('root');

const header = document.createElement('header');
root.append(header);
header.classList.add('header');

const headerTitle = document.createElement('h1');
const headerTitleNote = document.createTextNode('The best ToDo list ever');
headerTitle.append(headerTitleNote);
header.append(headerTitle);
headerTitle.classList.add('header__title');

//Box Create
const headerBoxCreate = document.createElement('div');
header.append(headerBoxCreate);
headerBoxCreate.classList.add('header__box-create');

const headerDeleteAllBut = document.createElement('button');
const headerDeleteAllButContent = document.createTextNode('Delete All');
headerDeleteAllBut.append(headerDeleteAllButContent);
headerBoxCreate.append(headerDeleteAllBut);
headerDeleteAllBut.classList.add('button');

const headerDeleteLastBut = document.createElement('button');
const headerDeleteLastButContent = document.createTextNode('Delete Last');
headerDeleteLastBut.append(headerDeleteLastButContent);
headerBoxCreate.append(headerDeleteLastBut);
headerDeleteLastBut.classList.add('button');

const headerToDoCreator = document.createElement('input');
headerBoxCreate.append(headerToDoCreator);
headerToDoCreator.classList.add('header__todo-creator');
headerToDoCreator.setAttribute('placeholder', 'Enter ToDo...')

const headerAddBut = document.createElement('button');
const headerAddButContent = document.createTextNode('Add');
headerAddBut.append(headerAddButContent);
headerBoxCreate.append(headerAddBut);
headerAddBut.classList.add('button');

//Box Search
const headerBoxSearch = document.createElement('div');
header.append(headerBoxSearch);
headerBoxSearch.classList.add('header__box-search');

const headerCounterAll = document.createElement('p');
headerBoxSearch.append(headerCounterAll);
headerCounterAll.classList.add('header__counter');

const headerCounterCompleted = document.createElement('p');
let completedToDo = 0;
headerBoxSearch.append(headerCounterCompleted);
headerCounterCompleted.classList.add('header__counter');

const headerShowAllBut = document.createElement('button');
const headerShowAllButContent = document.createTextNode('Show All');
headerShowAllBut.append(headerShowAllButContent);
headerBoxSearch.append(headerShowAllBut);
headerShowAllBut.classList.add('button');

const headerShowCompletedBut = document.createElement('button');
const headerShowCompletedButContent = document.createTextNode('Show Completed');
headerShowCompletedBut.append(headerShowCompletedButContent);
headerBoxSearch.append(headerShowCompletedBut);
headerShowCompletedBut.classList.add('button');

const headerToDoSearch = document.createElement('input');
headerBoxSearch.append(headerToDoSearch);
headerToDoSearch.classList.add('header__todo-search');
headerToDoSearch.setAttribute('placeholder', 'Search...');

const headerToDoSearchBut = document.createElement('button');
const headerToDoSearchButContent = document.createTextNode('Search');
headerToDoSearchBut.append(headerToDoSearchButContent);
headerBoxSearch.append(headerToDoSearchBut);
headerToDoSearchBut.classList.add('button');

//To Do Block
const section = document.createElement('section');
root.append(section);
section.classList.add('todo__section');

const todos = [];

const toDoConstructor = function (title, toDoId, isChecked) {
    this.toDoTitle = title;
    this.toDoId = toDoId;
    this.isChecked = isChecked;
}

const createToDo = (title, toDoId, isChecked = false) => {
        const toDoDiv = document.createElement('div');
        section.append(toDoDiv);
        toDoDiv.classList.add('todo__box');

        toDoDiv.dataset.toDoId = toDoId;
        toDoDiv.className = isChecked ? 'todo__box completed' : 'todo__box';

        const toDoCheckBut = document.createElement('button');
        const toDoCheckButContent = document.createTextNode('✓');
        toDoCheckBut.append(toDoCheckButContent);
        toDoDiv.append(toDoCheckBut);
        toDoCheckBut.classList.add('button');

        const toDoNote = document.createElement('h2');
        const toDoNoteContent = document.createTextNode(title);
        toDoNote.append(toDoNoteContent);
        toDoDiv.append(toDoNote);
        toDoNote.classList.add('todo__note');

        const toDoInnerDiv = document.createElement('div');
        toDoDiv.append(toDoInnerDiv);
        toDoInnerDiv.classList.add('todo__inner-box');

        const toDoCrossBut = document.createElement('button');
        const toDoCrossButContent = document.createTextNode('✖');
        toDoCrossBut.append(toDoCrossButContent);
        toDoInnerDiv.append(toDoCrossBut);
        toDoCrossBut.classList.add('button');

        const now = new Date().toLocaleDateString();

        const toDoData = document.createElement('p');
        const toDoDataContent = document.createTextNode(now);
        toDoData.append(toDoDataContent);
        toDoInnerDiv.append(toDoData);
        toDoData.classList.add('todo__data');

        //listeners
        toDoCheckBut.addEventListener('click', () => {
            toDoNote.classList.toggle('line-through');
        });

        toDoCrossBut.addEventListener('click', () => {
            toDoDiv.remove();
            const elementToRemove = todos.find((elem) => {
                if (String(elem.toDoId) === toDoDiv.getAttribute('data-to-do-id')) {
                    todos.splice(todos.indexOf(elem),1);
                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            });
        });

        return '';
};

headerAddBut.addEventListener('click', () => {
    if (!headerToDoCreator.value) {
        return
    }

    const toDoId = Date.now();
    const todo = new toDoConstructor(headerToDoCreator.value, toDoId, false);

    section.append(createToDo(headerToDoCreator.value, Date.now()));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    headerToDoCreator.value = '';
});

section.addEventListener('click', (event) => {
    if (event.target === event.currentTarget || event.target.className === 'button') {
        return;
    }

    const selectedToDo = todos.find((todo) => String(todo.toDoId) === event.target.getAttribute('data-to-do-id'));
    selectedToDo.isChecked = !selectedToDo.isChecked;
    event.target.classList.toggle('completed');
    localStorage.setItem('todos', JSON.stringify(todos));
});

const toDoFromStorage = JSON.parse(localStorage.getItem('todos'));

if (toDoFromStorage) {
    toDoFromStorage.forEach((todo) => {
        section.append(createToDo(todo.toDoTitle, todo.toDoId, todo.isChecked));
        todos.push(todo);
    });
}

headerDeleteAllBut.addEventListener('click', () => {
        section.innerHTML = '';
        localStorage.clear();
        todos.length = 0;
});

headerDeleteLastBut.addEventListener('click', () => {
    section.lastChild.remove();
    section.lastChild.remove();
    todos.splice(todos.length - 1, 1)
    localStorage.setItem('todos', JSON.stringify(todos));
});

//counters
const headerCounterAllContent = document.createTextNode(`All: ${todos.length}`);
headerCounterAll.append(headerCounterAllContent);

const completedToDoArr = todos.filter((elem) => elem.isChecked);
const headerCounterCompletedContent = document.createTextNode(`Completed: ${completedToDoArr.length}`);
headerCounterCompleted.append(headerCounterCompletedContent);

//show buttons
headerShowCompletedBut.addEventListener('click', () => {
     section.innerHTML = '';
     toDoFromStorage.filter((todo) => {
         if (todo.isChecked) {
             section.append(createToDo(todo.toDoTitle, todo.toDoId, todo.isChecked));
         }
    });
 });

headerShowAllBut.addEventListener('click', () => {
    section.innerHTML = '';
    toDoFromStorage.filter((todo) => {
        section.append(createToDo(todo.toDoTitle, todo.toDoId, todo.isChecked));
    });
});

//search
// const titleArr = toDoFromStorage.map((todo) => todo.toDoTitle);
// headerToDoSearchBut.addEventListener('click', () => {
//     if (headerToDoSearch.value) {
//         section.innerHTML = '';
//         const searchResult = titleArr.map((elem) => elem.includes(headerToDoSearch.value));
//         for (let i = 0; i < toDoFromStorage.length; i++) {
//             if (searchResult[i] === true) {
//                 section.append(createToDo(toDoFromStorage[i].toDoTitle, toDoFromStorage[i].toDoId, toDoFromStorage[i].isChecked));
//             }
//         };
//     } else {
//         headerToDoSearch.placeholder = 'enter smth to search';
//     };
// });