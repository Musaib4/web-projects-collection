let input = document.querySelector('#inp')
let button = document.querySelector('.btn')
let show = document.querySelector('.tasks')
let result = document.querySelector('.res')

// fun = function(){
//     result.innerText = input.value
// }
// fun()
// button.addEventListener('click',fun)
let arr = JSON.parse(localStorage.getItem("tasks")) || []

renderTask = (task)=>{
    let list = document.createElement('li')
        list.classList.add('li')
        let controls = document.createElement('div');
        controls.classList.add('controls');
        let b = document.createElement('button')
        b.classList.add('del-btn')
        let chkbox = document.createElement('input')
        chkbox.type = 'checkbox'
        chkbox.classList.add('chkbox')
        let data = document.createElement('span')
        data.classList.add('span')
        data.innerText = task.text

        if (task.completed) {
        data.classList.add('completed')
        chkbox.checked = true
    }

        localStorage.setItem("tasks", JSON.stringify(arr))

        // let d = arr[arr.length-1].text


        
        b.innerText = 'Delete'
        b.addEventListener('click',()=>{
        result.removeChild(list)
        arr = arr.filter(t => t.text !== task.text)
        localStorage.setItem("tasks", JSON.stringify(arr))

        })
        controls.appendChild(chkbox);
        controls.appendChild(b);

        chkbox.addEventListener('change', () => {
        data.classList.toggle('completed', chkbox.checked)
        task.completed = chkbox.checked    
        localStorage.setItem("tasks", JSON.stringify(arr))
        });

        list.appendChild(data)
        list.appendChild(controls)
        result.appendChild(list)
}
store = ()=>{
    if(input.value.trim() === ''){
        alert(' Type Something')
    }
    else{
        let newTask = { text: input.value,}
        arr.push(newTask)
        localStorage.setItem("tasks", JSON.stringify(arr))
        renderTask(newTask)
    }

    input.value = ''
    
}

arr.forEach(task => renderTask(task))
button.addEventListener('click',store)
// console.log(arr)

