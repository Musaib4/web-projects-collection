let ar = document.querySelector('.area')
let li = document.querySelector('.live')
let rc = document.querySelector('.rem')

ar.addEventListener("input", () => {
    let length = ar.value.length;  // ✅ counts characters
    if(length>100){
        li.innerText = 'you have crossed the limit of 100'
        ar.value = ar.value.substring(0, 100);
        length = 100
    }
    else{
        li.innerText = length
    }
    rc.innerText = `( ${100-length} char left / 100 )`
});