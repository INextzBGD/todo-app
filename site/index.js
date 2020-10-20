

function fakeRequest(success, response) {

    return new Promise((res, rej) => {

        setTimeout(() => success ? res(response) : rej(response), 2000);
    });
}

function disabledInputs(containerElmenent, disabled) {

    if (disabled === undefined)
        disabled = true;

    $(containerElmenent).find('button,a,.btn,input').attr('disabled', disabled ? 'disabled' : null);
}

function toast(msg) {

    const $toast = $(`<div class="toast">${msg}</div>`);

    $('.toast').fadeOut();

    $toast.appendTo('.main').css('display', 'none').fadeIn();

    setTimeout(() => $toast.fadeOut(() => $toast.remove()), 3000);
}

function createTaskHtml(task) {

    const $container = $('.task-list');

    const $taskItem = $(`
        <li class="task-item">
            <div class="task" data-task-id="${task.id}">
                <div class="area-1">
                    <input name="done" type="checkbox" ${task.isDone ? 'checked' : ''} />
                    <label name="name">${task.name}</label>
                </div>
                <div class="area-2">
                    <i class="fa fa-trash btn" name="btnRemove"></i>
                </div>
            </div>
        </li>
    `);

    $taskItem.find('.fa-trash').click(handleRemoveTask);
    $taskItem.find('[name="done"]').change(handleTaskDoneChanged);

    $container.append($taskItem);
}

function removeTaskOfDom(taskId)  {

    $(`[data-task-id=${taskId}]`).remove();
}

function checkIsLogged() {

    const token = localStorage.getItem('todo.app.token');

    if (! token) {
        
        window.location.assign('./login.html');
    }
}

function loadTasks() {

    const promise = getTasks();

    promise.then((response)=> {

        if (response.status === 200) {

            for (let i = 0; i < response.content.length; i++) {
                
                createTaskHtml(response.content[i]);
            }
        }
        else {
            toast('Falha ao obter tarefas');
        }
    })

    promise.catch(() => {

        toast('Falha ao obter tarefas');
    })
}

// === handles ====

function handleAddTask(e) {

    e.preventDefault();

    const form = e.currentTarget;
    const task = {
        name: form.name.value,
        isDone: false
    };


    // [CODE HERE]

    const promise = createTask(task.name);

    disabledInputs(form, true);

    promise.then((response) => {

        if (response.status === 200) {

            createTaskHtml(response.content);
        }
        else {
            toast('Tente mais tarde');
        }

        disabledInputs(form, false);
    });

    promise.catch(() => {

        toast('Falha ao criar tarefa');
        disabledInputs(form, false);
    });

    // TEST ONLY

    // disabledInputs(form, true);
    // const sucess = task.name != 'task';
    // fakeRequest(sucess, (task.id = new Date().getTime()) && task)
    //     .then(taskServer => createTask(taskServer))
    //     .catch(error => toast('Já existe uma tarefa com esse nome'))
    //     .then(() => disabledInputs(form, false));
}

function handleRemoveTask(e) {

    const $taskItem =  $(e.currentTarget).closest('[data-task-id]');
    const taskId = $taskItem.attr('data-task-id');

    const promise = deleteTask(taskId);

    promise.then((response) => {

        if (response.status === 200) {

            removeTaskOfDom(taskId);
        }
        else {
            toast('Falha ao remover tarefa');
        }
    }); 

    promise.catch(() => {

        toast('Falha ao remover tarefa');
    });

    // disabledInputs($taskItem[0], true);
    // fakeRequest(true)
    //     .then(() => removeTaskOfDom(taskId))
    //     .catch(error => toast('Falha ao remover task'))
    //     .then(() => disabledInputs($taskItem[0], false));
}

function handleTaskDoneChanged(e) {

    const $taskItem =  $(e.currentTarget).closest('[data-task-id]');
    const taskId = $taskItem.attr('data-task-id');
    const task = {
        id: taskId,
        isDone: $taskItem.find('[name="done"]').is(':checked')
    };

    const promise = updateTask(task);

    promise.then((response) => {

        if (response.status !== 200) {

            toast('Falha ao atualizar tarefa');
        }
    });

    promise.catch(() => {

        toast('Falha ao atualizar tarefa');
    });

    // fakeRequest(true)
    //     .then(() => { })
    //     .catch(error => {});
}

function handleLogout() {

    localStorage.removeItem('todo.app.token');
    window.location.assign('./login.html');
}

// === init ======

$(document).ready(() => {

    checkIsLogged();

    $('form.task-new').submit(handleAddTask);
    $('[name="btnLogout"]').click(handleLogout);

    loadTasks();
});