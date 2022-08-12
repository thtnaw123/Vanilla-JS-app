const addBtn = document.querySelector(".addButton");
let todos = document.querySelector(".todos");
let todoInpText = document.querySelector(".todoText");
let filterTodos = document.querySelector(".filter-todos");

const search = document.querySelector(".search");

document.addEventListener("DOMContentLoaded", getfromLocal)
addBtn.addEventListener("click", Addtodo)
todos.addEventListener("click", deleteCheck)
filterTodos.addEventListener("click", filter)
var todo, todoDelete, todoCheck;

function Addtodo(event) {
    event.preventDefault();
    todo = document.createElement("div");
    todo.classList.add("unit-todo");
    let todoInp = document.createElement("li");
    todoInp.classList.add("todo-item-content")
    todoCheck = document.createElement("div")
    todoDelete = document.createElement("div")


    todoDelete.innerHTML = `<button class="todo-delete">Delete</button>`
    todoCheck.innerHTML = `<button class="todo-checked">Complete</button>`

    todoInp.innerText = todoInpText.value;
    savetoLocal(todoInpText.value);

    todo.appendChild(todoInp);
    todo.appendChild(todoCheck);
    todo.appendChild(todoDelete);
    todos.appendChild(todo);
    todoInpText.value = "";
    // console.log(todos.childNodes)
}



function deleteCheck(e) {
    // console.log(e.currentTarget)
    var target = e.target;
    // console.log(target)
    if (target.classList.contains("todo-delete")) {
        var parent = target.parentNode.parentNode;
        // console.log(parent)
        var confi = confirm("Are you sure you want to delete?");
        if (confi) {
            parent.classList.add("fall");
            deleteLocal(parent);
            parent.addEventListener("transitionend", () => {
                parent.remove();
            })
        }
    } else if (target.classList.contains("todo-checked")) {
        var parent = target.parentNode.parentNode;
        parent.classList.toggle("checked")
            // parent.childNodes[0].classList.toggle("checked")

    }
}



function filter(ev) {

    var todoItem = todos.childNodes;
    // console.log(todoItem);
    // console.log(ev.target.value)
    todoItem.forEach(element => {
        switch (ev.target.value) {
            case "All":
                element.style.display = "flex";
                break;
            case "Completed":
                if (element.classList.contains("checked")) {
                    element.style.display = "flex";
                } else {
                    element.style.display = "none";
                }
                break;
            case "Uncompleted":
                if (element.classList.contains("checked")) {
                    element.style.display = "none"
                } else {
                    element.style.display = "flex";
                }
                break;
        }

    });
}


function savetoLocal(addTodo) {

    let todoList;
    if (localStorage.getItem("todoLists") === null) {
        todoList = [];
        // console.log(todoList)
    } else {
        todoList = JSON.parse(localStorage.getItem("todoLists"));
        todoList.push(addTodo);
    }
    localStorage.setItem("todoLists", JSON.stringify(todoList));
}

function getfromLocal() {
    let todoList;
    if (localStorage.getItem("todoLists") === null) {
        todoList = [];
    } else {
        todoList = JSON.parse(localStorage.getItem("todoLists"));
    }
    todoList.forEach((todoL) => {
        todo = document.createElement("div");
        todo.classList.add("unit-todo");
        let todoInp = document.createElement("li");
        todoInp.classList.add("todo-item-content")
        todoCheck = document.createElement("div")
        todoDelete = document.createElement("div")

        // let check = document.createElement("button");
        // check.classList.add("todo-checked")
        // check.innerHTML = "'Complete";
        // todoDelete.appendChild(check);

        // let del = document.createElement("button");
        // del.classList.add("todo-delete")
        // del.innerHTML = "Delete";
        // todoDelete.appendChild(del);



        todoDelete.innerHTML = `<button class="todo-delete"> Delete</button>`
        todoCheck.innerHTML = `<button class="todo-checked"> Complete</button>`

        todoInp.innerText = todoL;

        todo.appendChild(todoInp);
        todo.appendChild(todoCheck);
        todo.appendChild(todoDelete);
        todos.appendChild(todo);
    })
}

function deleteLocal(element) {

    let todoList;
    if (localStorage.getItem("todoLists") === null) {
        todoList = [];
    } else {
        todoList = JSON.parse(localStorage.getItem("todoLists"));
    }

    // let innerContents = element.innerText.toString();
    // let cIdx = innerContents.search("'Complete");
    // var targetContent = innerContents.slice(0, cIdx);
    // console.log(targetContent)
    // console.log(element.innerHTML);
    // console.log(innerContents.search("Completed"));
    // let contentIdx = todoList.indexOf(targetContent);

    let innerContent = element.childNodes[0].innerText;
    let contentIdx = todoList.indexOf(innerContent)
    console.log(todoList)
    todoList.splice(contentIdx, 1);
    console.log(todoList)
    localStorage.setItem('todoLists', JSON.stringify(todoList));

}

search.addEventListener('keyup', () => {
    let searchItem = search.value.trim();
    // console.log(searchItem)
    let eachTodo = todos.childNodes;
    eachTodo.forEach(element => {
        // let searchScope = element.childNodes[0].textContent;
        if (!element.childNodes[0].textContent.includes(searchItem)) {
            console.log(element.childNodes[0].textContent)
            element.classList.add("filterOut")
        }
        if (element.childNodes[0].textContent.includes(searchItem)) {
            element.classList.remove("filterOut")
        }
    })



    // let foundItem = todoList.filter((target) => {
    //     return target === searchItem
    // })
    // console.log(foundItem)

})













// function filterCompleted(ev) {
//     var unitTodo = todos.childNodes;
//     if (unitTodo.length > 0) {
//         for (let i = 0; i < unitTodo.length; i++) {
//             if (unitTodo[i] != undefined) {
//                 if (ev.target.value === "Completed") {
//                     if (unitTodo[i].classList.contains("checked")) {
//                         console.log(unitTodo[i])
//                             // unitTodo[i].classList.add("show")
//                         unitTodo[i].style.display = "flex";

//                     } else {
//                         unitTodo[i].style.display = "none"
//                     }
//                 } else if (ev.target.value === "Uncompleted") {
//                     if (unitTodo[i].classList.contains("checked")) {
//                         unitTodo[i].style.display = "none";

//                     } else {
//                         unitTodo[i].style.display = "flex"
//                     }
//                 } else {
//                     unitTodo[i].style.display = "flex"
//                 }
//             }
//         }
//     }
// }