let result = document.querySelector('.span')
let button = document.querySelector('.btn')
let input = document.querySelector('#inp')
let apiKey = '053744c6ed8d1705b73d560e1c436c0c'


let city = ''

async function weather(){
    document.querySelector('.loader').style.display = 'block'
    result.innerHTML = '';

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    let api = await fetch(url)
    let response = await api.json()
    console.log(response)
    show(response)
    document.querySelector('.loader').style.display = 'none'
}

let show = (response)=>{
    if(response.cod === '404'){
        result.innerHTML = 'CITY NOT FOUND'
        return;
    }
    else{
    result.innerHTML = `
     <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt="${response.weather[0].description}">
      Weather : ${response.weather[0].main}  <br>
      city : ${response.name} ${response.sys.country}  <br>
      Temperature : ${response.main.temp}°C  <br>
      Humidity: ${response.main.humidity}%  <br>
      Wind: ${response.wind.speed} m/s 
    `;
    }
}

button.addEventListener('click',()=>{

    city  = input.value
    result.classList.add('style')
    weather()
})
