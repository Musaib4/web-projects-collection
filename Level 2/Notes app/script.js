let button = document.querySelector('.add-btn')
let input = document.querySelector('.input')
let written = document.querySelector('.written')
let clear = document.querySelector('.clear')
let count = 0
let arr = []

button.addEventListener('click',()=>{
    if (input.value.trim() !== "") {
        arr.push({id:count+=1,text:input.value})
        renderNotes();
        input.value = "";
        }
        console.log(arr);
});



let renderNotes = ()=>{
        written.innerHTML = "";
        arr.forEach(item => {
            let p = document.createElement("p");
            p.classList.add('para')
            let chk = chkbox()
            let span = document.createElement("span");
            span.classList.add("text");
            span.textContent = item.text;
            
            let delet = del(item.id); // create delete button with functionality
            p.appendChild(chk)
            p.appendChild(span)
            p.appendChild(delet);       
            written.appendChild(p);
        });
}
renderNotes()
function del(id){
    let delet = document.createElement('button')
    delet.innerHTML = '🗑️'
    delet.classList.add('delete')
    delet.addEventListener('click',()=>{
       arr =  arr.filter(item=>item.id !== id);
        renderNotes();
    })
    return delet;
}

function chkbox(){
    let chk = document.createElement('input')
    chk.type = 'checkbox';
    chk.classList.add('check')
    chk.checked= false;
    if(chk.checked == true){
        span.classList.add('chkb')
    }
    return chk;
}

 clear.addEventListener('click',()=>{
    arr = []
    renderNotes();
 })