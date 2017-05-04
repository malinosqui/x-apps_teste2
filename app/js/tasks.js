var tasks = [];

var API_URL = 'http://localhost:3000/task';

get();

function add() {
    if (!document.getElementById('task').value) {
        return;
    }
    
    var task = {
        description: document.getElementById('task').value,
        status: 'Pendente',
    };

    axios.post(API_URL, task).then(function (response) {
        tasks.push(response.data);
        generateList();
    });
}

function get() {
    axios.get(API_URL).then(function (response) {
        tasks = response.data;
        generateList();
    });
}

function finish(id, tasks) {
    var task = tasks.find(function (el) {
        return el._id === id;
    });

    var tasks = tasks.filter(function (el) {
        return el._id !== id;
    });

    task.status = 'Concluído';

    axios.post(API_URL, task).then(function (response) {
        tasks.push(task);
        generateList();
    });
}

function remove(id) {
    axios.delete(API_URL + '/' + id).then(function (response) {
        get();
    });
}

function generateList() {
    clearList();

    tasks = orderList(tasks);

    var tasksLength = tasks.length;
    var ul = document.getElementsByClassName('todo-list');

    for (let x = 0; x < tasksLength; x++) {

        var li = document.createElement('li');
        li.innerHTML = tasks[x].description + ' - ' + tasks[x].status + ' - ' + moment(tasks[x].createDate).format('DD/MM/YYYY');
        li.className = 'todo-item';

        if (tasks[x].status === 'Concluído') {
            li.className = 'todo-item finished';
        }

        var div = document.createElement('div');
        div.className = 'todo-buttons';

        if (tasks[x].status === 'Pendente') {
            var btFinish = document.createElement('a');
            btFinish.className = "action";
            btFinish.innerHTML = "Concluir";
            var string = 'finish("' + tasks[x]._id + '", tasks)';
            btFinish.setAttribute("onclick", string);
            div.appendChild(btFinish);
        }

        var btRemove = document.createElement('a');
        btRemove.className = "action";
        btRemove.textContent = "Excluir";
        var string = 'remove("' + tasks[x]._id + '", tasks)';
        btRemove.setAttribute("onclick", string);
        div.appendChild(btRemove);

        li.appendChild(div);

        ul[0].appendChild(li);
    }
}

function orderList(tasks) {

    var orderedList = [];

    var orderedList = tasks.filter(function (el) {
        return el.status !== 'Concluído';
    });

    var finishList = tasks.filter(function (el) {
        return el.status !== 'Pendente';
    });

    return orderedList.concat(finishList);
}

function clearList() {
    document.getElementById('task').value = '';
    document.getElementsByClassName('todo-list')[0].innerHTML = "";
}

var btnAdd = document.getElementById('addTask');

btnAdd.addEventListener("click", add, false);