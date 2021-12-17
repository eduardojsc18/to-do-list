const Main = {

    tasks: [],

    init: function (){
        this.cacheSelector()
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
        this.emptyList()
    },

    cacheSelector: function (){
        this.$emptyList = document.querySelector('#emptyList')
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButton = document.querySelectorAll('.remove')
    },

    emptyList: function (){

        console.log()

        if(localStorage.getItem("tasks").length <= 2){
            setTimeout(function (){
                Main.$emptyList.classList.remove('hidden')
                Main.$emptyList.classList.add('block')
            }, 300)
        }

        else {
            Main.$emptyList.classList.remove('block')
            Main.$emptyList.classList.add('hidden')
        }

    },

    bindEvents: function (){

        const self = this

        this.$checkButtons.forEach(function (button){
            button.onclick = self.Events.checkButton_click.bind(self)
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButton.forEach(function (button){
            button.onclick = self.Events.removeButton_click.bind(self)
        })

    },

    getStoraged: function (){
        const tasks = localStorage.getItem('tasks')

        if(tasks){
            this.tasks = JSON.parse(tasks)
        } else {
            localStorage.setItem('tasks', JSON.stringify([]))
        }

    },

    getTaskHtml: function (task, isDone){
        return `
            <li class="z-0 px-5 relative flex items-center justify-between text-gray-400 hover:text-gray-800 transform animate-ease-in-out animate-showToDo"
                 x-data="{removeItem: false}"
                 @mouseenter="removeItem = true" @mouseleave="removeItem = false"
                 data-task="${task}"
                >

                <div class="-z-1 flex items-center gap-x-5 py-5 group transition">

                    <!-- CHECK -->
                    <button class="check cursor-pointer p-1.5 rounded-full bg-gray-300 shadow-inner group-hover:bg-green-400 animate-ease-in-out"> </button>

                    <!-- TO DO -->
                    <p class="pr-3 pr-10 cursor-default break-all">
                        ${task}
                    </p>

                </div>
                
                <button class="remove z-50 absolute right-5 cursor-pointer text-gray-500 bg-red-100 hover:bg-red-400 rounded-full overflow-hidden px-3 py-2 hover:text-white hover:shadow-md animate-ease-in-out"
                     x-show="removeItem"
                     x-cloak="hidden"
                     x-transition:enter="transition-all ease-in-out duration-300"
                     x-transition:enter-start="opacity-0 transform translate-x-1/2"
                     x-transition:enter-end="opacity-100 transform translate-x-0"
                     x-transition:leave="transition ease-in duration-200"
                     x-transition:leave-start="opacity-100 transform scale-125"
                     x-transition:leave-end="opacity-0 transform scale-50"
                    >
                    X
                </button>

            </li>
        `
    },

    insertHTML: function(element, htmlString) {
        element.innerHTML += htmlString

        this.cacheSelector()
        this.bindEvents()
    },

    buildTasks: function (){
        let html = ''

        this.tasks.forEach(item => {
            html += this.getTaskHtml(item.task, item.done)
        })

        this.insertHTML(this.$list, html)
    },

    Events:{

        checkButton_click: function(e) {
            const toDo = e.target.parentElement
            const value = toDo.dataset['task']
            const isDone = toDo.classList.contains('done')

            if(!isDone){
                e.target.classList.add('bg-green-500')
                e.target.classList.remove('group-hover:bg-green-400')
                e.target.parentElement.classList.add('done', 'line-through', 'text-gray-300')

                return
            }

            const newTasksState = this.tasks.map(item => {
                if (item.task === value) {
                    item.done = !isDone
                }

                return item
            })

            localStorage.setItem('tasks', JSON.stringify(newTasksState))

            e.target.classList.remove('bg-green-500')
            e.target.classList.add('group-hover:bg-green-400')
            e.target.parentElement.classList.remove('done', 'line-through', 'text-gray-300')

        },

        inputTask_keypress: function (e) {
            const key = e.key
            const value = e.target.value
            const isDone = false

            if (key === 'Enter'){

                if (!value){
                    document.querySelector("#input").classList.remove('border-green-400')
                    document.querySelector("#input").classList.add('border-red-500')
                    return
                }

                document.querySelector("#input").classList.add('border-green-400')
                document.querySelector("#input").classList.remove('border-red-500')

                const taskHtml = this.getTaskHtml(value, isDone)

                this.insertHTML(this.$list, taskHtml)

                e.target.value = ''

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksArr = JSON.parse(savedTasks)

                const arrTasks = [
                    { task: value, done: isDone },
                    ...savedTasksArr,
                ]

                const jsonTasks = JSON.stringify(arrTasks)

                this.tasks = arrTasks
                localStorage.setItem('tasks', jsonTasks)

                Main.emptyList()
            }


        },

        removeButton_click: function (e) {

            const toDo = e.target.parentElement
            const value = toDo.dataset['task']

            const newTasksState = this.tasks.filter(item => {
                return  item.task !== value
            })

            localStorage.setItem('tasks', JSON.stringify(newTasksState))
            this.tasks = newTasksState

            toDo.classList.add('translate-x-full', 'opacity-0', 'removed')

            setTimeout(function (){
                toDo.classList.add('hidden')
            }, 300)

            Main.emptyList()

        },

    }

}

Main.init()