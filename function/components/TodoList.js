import { createElement } from "../dom.js"

/**
 * @typedef (object) Todo
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */
export class TodoList {
    /**@type {Todo[]} */
    #todos = []

    /**@type {HTMLUListElement} */
    #listItem = []

    /**@param {Todo[]} todos*/
    constructor(todos) {
        this.#todos = todos
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo(element) {
        element.innerHTML = `<form action="" class="d-flex pb-4">
        <input type="text" required="false" class="form-control" placeholder="Ajouter le menu..." name= "title" >
        <button class="btn btn-primary">Ajouter</button>
    </form>

    <main>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
            <label class="btn btn-outline-primary active" for="btnradio1" data-filter="all" >Toutes</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio2" data-filter="todo" >A Faire</label>


            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
            <label class="btn btn-outline-primary" for="btnradio3" data-filter="done" >Faites</label>
        </div>

        <div class="todo-list my-3 shadow rounded">
            <ul class="list-group ">
            </ul>
        </div>
    </main>`
        this.#listItem = element.querySelector('.list-group')
        for (let todo of this.#todos) {
            const tache = new TodoListItem(todo)
            this.#listItem.append(tache.element)
        }

        const form = element.querySelector('form')
        form.addEventListener('submit', e => this.onSubmit(e))

        element.querySelectorAll('.btn-group label').forEach(label => {
            label.addEventListener('click', e => this.onFilter(e))
        });
    }
    /**@param {SubmitEvent} e */
    onSubmit(e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(form).get('title').toString().trim()
        if (title === '') {
            return
        }

        const todo = {
            id: Date.now(),
            title: title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listItem.prepend(item.element)
        form.reset()

    }

    /**@param {PointerEvent} e */
    onFilter(e) {
        // e.preventDefault()
        const filter = e.currentTarget.getAttribute('data-filter')
        console.log(e.currentTarget.parentElement);
        e.currentTarget.parentElement.querySelector('.active').classList.remove('active')
        e.currentTarget.classList.add('active')
        if(filter === 'todo'){
            this.#listItem.classList.add('hide-completed')
            this.#listItem.classList.remove('hide-todo')
        }else if(filter === 'done'){
            this.#listItem.classList.add('hide-todo')
            this.#listItem.classList.remove('hide-completed')
        }else{
            this.#listItem.classList.remove('hide-todo')
            this.#listItem.classList.remove('hide-completed')
        }
        console.log(filter);
    }
}

class TodoListItem {

    #element
    /**@type {Todo} */
    constructor(todo) {
        const id = `todo-${todo.id}`
        const li = createElement('li', {
            class: 'todo list-group-item d-flex align-items-center mb-1'
        })
        this.#element = li
        const checkbox = createElement('input', {
            type: 'checkbox',
            class: 'form-check-input',
            id,
            checked: todo.completed ? '' : null
        })
        const label = createElement('label', {
            class: 'todo-checkbox w-100 mx-2 ',
            for: id
        })
        label.innerHTML = todo.title
        const button = createElement('button', {
            class: 'btn btn-danger',
            role: 'delete'
        })
        button.innerHTML = '<i class="bi bi-trash" >'

        li.append(checkbox)
        li.append(label)
        li.append(button)
        this.toggle(checkbox)

        button.addEventListener("click", (e) => this.remove(e))
        checkbox.addEventListener("change", (e) => e.toggle(e.currentTarget))
    }
    /** @return {HTMLElement}   */
    get element() {
        return this.#element
    }
    /**
     * 
     * @param {PointerEvent} e 
     */
    remove(e) {
        e.preventDefault()
        this.#element.remove()
    }
    /**
     * change l'état du (à faire/ faites)
     * @param {HTMLInputElement} checkbox 
     */
    toggle(checkbox) {
        if (checkbox.checked) {
            this.#element.classList.add('is-completed')
        }
        else {
            this.#element.classList.remove('is-completed')
        }
    }
}
