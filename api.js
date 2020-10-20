
const url = 'https://inextzbgd-todo-app-api.herokuapp.com'; //'http://localhost:5655';

function fetchJson(url, request) {

    const promise = fetch(url, request);

    return promise.then( function(response) {

        const contentLength = parseInt(response.headers.get('Content-Length'));

        if (contentLength === 0) {

            return {
                status: response.status
            };
        }

        const promise2 = response.json();

        return promise2.then((contentJson) => {

            return {
                status: response.status, 
                content: contentJson
            }
        });
    });
}

function createAccount(email, password) {

    return fetchJson(url + '/account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nick: email,
            password: password
        })
    });
}

function login(email, password) {

    return fetchJson(url + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nick: email,
            password: password
        })
    });
}

function createTask(taskName) {

    return fetchJson(url + '/task',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('todo.app.token')
        },
        body: JSON.stringify({
            name: taskName
        })
    });
}

function getTasks() {

    return fetchJson(url + '/tasks', {
        headers: {
            Authorization: localStorage.getItem('todo.app.token')
        }
    });
} 

function updateTask(task) {

    return fetchJson(url + '/task', {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('todo.app.token')
        },
        body: JSON.stringify({
            id: task.id,
            isDone: task.isDone
        })
    });
}

function deleteTask(taskId) {

    return fetchJson(url + '/task/' + taskId, {

        method: 'DELETE',
        headers: {
            Authorization: localStorage.getItem('todo.app.token')
        }
    });
}

