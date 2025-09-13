let button = document.querySelector('.add-btn')
let input = document.querySelector('.input')
let written = document.querySelector('.written')
let clear = document.querySelector('.clear')
let all = document.querySelector('.all')
let active = document.querySelector('.active')
let completed = document.querySelector('.completed')

let count = 0
let arr = []
let currentFilter = "all";


button.addEventListener('click',()=>{
    if (input.value.trim() !== "") {
        arr.push({id:++count,text:input.value,completed: false})
        input.value = "";
        saveAndRender();
        }
        console.log(arr);
});



let renderNotes = ()=>{
        written.innerHTML = "";
        let filtered = arr.filter(item => {
            if (currentFilter === "active") return !item.completed;
            if (currentFilter === "completed") return item.completed;
            return true; // "all"
        });
        filtered.forEach(item => {
            let p = document.createElement("p");
            p.classList.add('para')
            let span = document.createElement("span");
            span.classList.add("text");
            let chk = chkbox(span,item)

            if (item.completed) {
            span.classList.add('chkb');
            chk.checked = true;
        }

            span.textContent = item.text;
            
            let delet = del(item.id); // create delete button with functionality
            p.appendChild(chk)
            p.appendChild(span)
            p.appendChild(delet);       
            written.appendChild(p);
        });
}

if (localStorage.getItem("todos")) {
    arr = JSON.parse(localStorage.getItem("todos"));
    count = arr.length ? arr[arr.length - 1].id : 0; // keep ids unique
    renderNotes();
}

function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(arr)); // ✅ save
    renderNotes();
}



function del(id){
    let delet = document.createElement('button')
    delet.innerHTML = '🗑️'
    delet.classList.add('delete')
    delet.addEventListener('click',()=>{
       arr =  arr.filter(item=>item.id !== id);
        saveAndRender();
    })
    return delet;
}

function chkbox(span, item) {
    let chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.classList.add('check');
    chk.checked = item.completed;

     chk.addEventListener('change', () => {
        item.completed = chk.checked;
        saveAndRender();
    });

    return chk;
}

 clear.addEventListener('click',()=>{
    arr = []
    saveAndRender();
 })

all.addEventListener('click', () => {
    currentFilter = "all";
    all.classList.add('change')
    completed.classList.remove('change')
    active.classList.remove('change')
    renderNotes();
});

active.addEventListener('click', () => {
    all.classList.remove('change')
    completed.classList.remove('change')
    active.classList.add('change')
    currentFilter = "active";
    renderNotes();
});

completed.addEventListener('click', () => {
    currentFilter = "completed";
    all.classList.remove('change')
    active.classList.remove('change')
    completed.classList.add('change')
    renderNotes();
});