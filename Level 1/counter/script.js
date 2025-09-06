input = document.querySelector('#inp')
btn1 = document.querySelector('.inc')
btn2 = document.querySelector('.dec')
btn3 = document.querySelector('.res')
let count = 0
input.innerText = count

btn1.addEventListener('click',()=>{
    count+=1
    input.innerText = count

})
btn2.addEventListener('click',()=>{
    count-=1
    input.innerText = count
})
btn3.addEventListener('click',()=>{
    count=0
    input.innerText = count
})

