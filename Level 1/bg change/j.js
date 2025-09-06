let button = document.querySelector('button')

let bg = ()=>{
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let color = `rgb(${r},${g},${b})`
    document.body.style.backgroundColor =  color;
}
button.addEventListener('click',()=>{
    bg()
})
