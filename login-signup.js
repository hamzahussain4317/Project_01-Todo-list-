document.addEventListener('DOMContentLoaded', function () {
    let ind;
    const getsaveduser = function () {
        const JSONuser = localStorage.getItem('users');
        if (JSONuser !== null) {
            return JSON.parse(JSONuser);
        } else {
            return [];
        }
    }

    const getsavedid = function () {
        const JSONid = localStorage.getItem('id');
        if (JSONid !== null) {
            return JSON.parse(JSONid)
        }
        else {
            return -1;
        }
    }
    const user = getsaveduser();

    filterobj = {
        filtername: ''
    }
    // signup
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const confirmError = document.querySelector('.confirm-error');
            if (confirmError) {
                confirmError.remove();
            }

            if (e.target.elements.password.value !== e.target.elements.confirm.value) {
                const error = document.createElement('p');
                error.textContent = 'Your password and confirm password do not match';
                error.className = 'confirm-error';
                document.querySelector('.submit').appendChild(error);
            } else {
                const fullname = e.target.elements.first.value + ' ' + e.target.elements.Last.value
                user.push({
                    name: fullname,
                    email: e.target.elements.email.value,
                    password: e.target.elements.password.value,
                    todo: []
                })
                saveuser('users', user)
                e.target.elements.first.value = ''
                e.target.elements.Last.value = ''
                e.target.elements.email.value = ''
                e.target.elements.password.value = ''
                e.target.elements.confirm.value = ''
            }
        });
    }

    const show = function (user, ind) {
        user = getsaveduser()
        document.querySelector('#your-todo').innerHTML = ''
        user[ind].todo.forEach(function (item, index) {
            const newh1 = document.createElement('h1')
            newh1.textContent = `TODO NO:${index + 1}`
            document.querySelector('#your-todo').appendChild(newh1)
            const newparaname = document.createElement('p')
            newparaname.textContent = `Name: ${item.todoname}`
            document.querySelector('#your-todo').appendChild(newparaname)
            const newparades = document.createElement('p')
            newparades.textContent = `Description: ${item.tododetails}`
            document.querySelector('#your-todo').appendChild(newparades)
            const newparaprior = document.createElement('p')
            newparaprior.textContent = `Priority: ${item.priority}`
            document.querySelector('#your-todo').appendChild(newparaprior)
            const newparasts = document.createElement('p')
            newparasts.textContent = `Status: ${item.status}`
            document.querySelector('#your-todo').appendChild(newparasts)
            const newparadate = document.createElement('p')
            newparadate.textContent = `CreatedDate: ${item.createdDate}`
            document.querySelector('#your-todo').appendChild(newparadate)
            const newparatime = document.createElement('p')
            newparatime.textContent = `Createdtime: ${item.createdTime}`
            document.querySelector('#your-todo').appendChild(newparatime)

        })
    }


    const render_todos = function (user, ind, filterobj) {
        let filter_todo_array = user[ind].todo.filter(function (item, index) {
            return item.todoname.toLowerCase().includes(filterobj.filtername.toLowerCase())
        })
        document.querySelector('#your-todo').innerHTML = ''
        filter_todo_array.forEach(function (item, index) {
            const newh1 = document.createElement('h1')
            newh1.textContent = `TODO NO:${index + 1}`
            document.querySelector('#your-todo').appendChild(newh1)
            let another_todo = document.createElement('p')
            another_todo.textContent = `Name:${item.todoname}`
            document.querySelector('#your-todo').appendChild(another_todo)
            const newparades = document.createElement('p')
            newparades.textContent = `Description: ${item.tododetails}`
            document.querySelector('#your-todo').appendChild(newparades)
            const newparaprior = document.createElement('p')
            newparaprior.textContent = `Priority: ${item.priority}`
            document.querySelector('#your-todo').appendChild(newparaprior)
            const newparasts = document.createElement('p')
            newparasts.textContent = `Status: ${item.status}`
            document.querySelector('#your-todo').appendChild(newparasts)
            const newparadate = document.createElement('p')
            newparadate.textContent = `CreatedDate: ${item.createdDate}`
            document.querySelector('#your-todo').appendChild(newparadate)
            const newparatime = document.createElement('p')
            newparatime.textContent = `Createdtime: ${item.createdTime}`
            document.querySelector('#your-todo').appendChild(newparatime)

        })
    }

    const sort_todos = function (array, priorityvalue, user, ind) {

        array.forEach(function (item, index) {
            if (item.priority === 'high') {
                item.priorityvalue = 3
            }
            else if (item.priority === 'medium') {
                item.priorityvalue = 2
            }
            else {
                item.priorityvalue = 1
            }
        })

        if (priorityvalue === 'high') {
            array.sort(function (a, b) {

                if (a.priorityvalue > b.priorityvalue) {

                    return -1;
                }
                else if (a.priorityvalue < b.priorityvalue) {

                    return 1;
                }
                else {

                    return 0
                }
            })
        }
        else if (priorityvalue === 'low') {
            array.sort(function (a, b) {
                if (a.priorityvalue < b.priorityvalue) {
                    return -1;
                }
                else if (a.priorityvalue > b.priorityvalue) {
                    return 1;
                }
                else {
                    return 0
                }
            })
        }
        saveuser('users', user)
        show(user, ind)

    }


    // login
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        const a1 = loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const passwordError = document.querySelector('.password-error');
            if (passwordError) {
                passwordError.remove();
            }

            let flag = 0;

            user.forEach(function (item, index) {
                if (e.target.elements.email.value.toLowerCase() === item.email.toLowerCase()) {
                    flag = 1
                    ind = index
                    saveuser('id', ind)

                }

            })

            if (flag === 1) {

                if (e.target.elements.password.value === user[ind].password) {

                    window.location.href = 'todo_page.html';

                } else {
                    const error = document.createElement('p');
                    error.textContent = 'Incorrect Username Or Password';
                    error.className = 'password-error';
                    document.querySelector('.submit').appendChild(error);
                }
            } else {

                const error = document.createElement('p');
                error.textContent = 'Username Does not exits please sign Up first';
                error.className = 'password-error';
                document.querySelector('.submit').appendChild(error);
            }

            return ind
        })

    }

    const saveuser = function (key, user) {
        localStorage.setItem(key, JSON.stringify(user))
    }

    let id = getsavedid()

    const heading1 = document.createElement('h1')
    heading1.textContent = `Welcome "${user[id].name}" In Your Todos Application`
    document.querySelector('#intro').appendChild(heading1)
    let prior = 'high'
    let sts = 'completed'
    show(user, id)
    document.querySelector('#todostatus').addEventListener('change', function (e) {
        sts = e.target.value
    })
    document.querySelector('#todopriority').addEventListener('change', function (e) {
        prior = e.target.value
    })
    const now = new Date()
    const todoform = document.querySelector('#todo-form');
    if (todoform) {
        todoform.addEventListener('submit', function (e) {
            e.preventDefault()
            user[id].todo.push({
                todoname: e.target.elements.todoname.value,
                tododetails: e.target.elements.tododesc.value,
                priority: prior,
                status: sts,
                createdDate: `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
                createdTime: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                priorityvalue: 0
            })

            saveuser('users', user)
            const idx = user[id].todo.length - 1
            const newh1 = document.createElement('h1')
            newh1.textContent = `TODO NO:${idx + 1}`
            document.querySelector('#your-todo').appendChild(newh1)
            const newparaname = document.createElement('p')
            newparaname.textContent = `Name: ${user[id].todo[idx].todoname}`
            document.querySelector('#your-todo').appendChild(newparaname)
            const newparades = document.createElement('p')
            e.target.elements.todoname.value = ''
            newparades.textContent = `Description: ${user[id].todo[idx].tododetails}`
            document.querySelector('#your-todo').appendChild(newparades)
            const newparaprior = document.createElement('p')
            e.target.elements.tododesc.value = ''
            newparaprior.textContent = `Priority: ${user[id].todo[idx].priority}`
            document.querySelector('#your-todo').appendChild(newparaprior)
            const newparasts = document.createElement('p')
            newparasts.textContent = `Status: ${user[id].todo[idx].status}`
            document.querySelector('#your-todo').appendChild(newparasts)
            const newparadate = document.createElement('p')
            newparadate.textContent = `CreatedDate: ${user[id].todo[idx].createdDate}`
            document.querySelector('#your-todo').appendChild(newparadate)
            const newparatime = document.createElement('p')
            newparatime.textContent = `Createdtime: ${user[id].todo[idx].createdTime}`
            document.querySelector('#your-todo').appendChild(newparatime)

        })
    }
    document.querySelector('#render-todos').addEventListener('input', function (e) {
        filterobj.filtername = e.target.value
        render_todos(user, id, filterobj)
    })


    const sorting = document.querySelector('#todosort')
    if (sorting) {
        sorting.addEventListener('change', function (e) {
            e.preventDefault()
            console.log(e.target.value)
            sort_todos(user[id].todo, e.target.value, user, id)
        })
    }


})













