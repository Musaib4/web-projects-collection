let b1 = document.querySelector('.box')
let b2 = document.querySelector('.box1')
let b3 = document.querySelector('.box2')
let b4 = document.querySelector('.box3')

let res = function(){
    let hours = new Date().getHours();
    let ampm = "AM";

    if (hours >= 12) {
    ampm = "PM";
        if (hours > 12) {
        hours = hours - 12;
    }
    }
    if (hours === 0) {
        hours = 12;  // midnight case
    }
    b1.innerHTML = hours.toString().padStart(2, "0");
    b4.innerHTML = ampm;
    b2.innerHTML = new Date().getMinutes().toString().padStart(2, "0");
    b3.innerHTML = new Date().getSeconds().toString().padStart(2, "0");
}
res()
setInterval(res,1000)




