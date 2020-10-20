## To do app

### Features

- Eu como usuário desejo criar uma conta;
- Eu como usuário desejo efetuar o login;
- Eu como usuário desejo criar uma tarefa com texto em um estado se está pronto ou não;
- Eu como usuário desejo alterar o estado da tarefa;
- Eu como usuário desejo excluir uma tarefa;


### Backend

Response 400 pattern = {
    "message": "string"
}

- POST /account
Request = {
    "nick": "string",
    "password": "string"
}
Response = 200


- POST /login
Request = {
    "nick": "string",
    "password": "string"
}
Response = 200 {
    "token": "string"
}

- POST /task
Request = {
    "name": "string"
}
Response = 200 {
    "name": "string",
    "isDone": boolean,
    "id": number
}

- PUT /task 
Request = {
    "id": number,
    "isDone": boolean
}
Response = {
    "id": number,
    "isDone": boolean
}

- DELETE /task 
Request = {
    "id": number
}
Response = 200