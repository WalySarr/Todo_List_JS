import { fetchApi } from "./api.js";
import { TodoList } from "./components/TodoList.js";
import { createElement } from "./dom.js";
try {
    const todos = await fetchApi('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('#contain'))
} catch (error) {
    const container = document.querySelector('#contain')
    const div = createElement('div', {
        class: 'alert alert-danger fs-5',
        role: 'alert'
    })
    div.innerHTML = 'Erreur d\'accéder au serveur'
    container.prepend(div)
    console.error(error)
}