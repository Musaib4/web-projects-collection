let input = document.querySelector('.input')
let button = document.querySelector('.search-btn')
let result = document.querySelector('.res')
let container = document.querySelector('.container')

button.addEventListener('click',()=>{
    let meals = input.value.trim();
    apiKey(meals)
})

async function apiKey(meals) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`)
    response = await api.json()
    result.innerHTML = ""
    for(let meal of response.meals){
        let main = document.createElement('div')
        main.classList.add('showResult')

        let imageElement = document.createElement('img');
        // result.appendChild(imageElement);
        imageElement.src = meal.strMealThumb
        imageElement.classList.add('small')

        

        let name = document.createElement('p')
        name.innerText = meal.strMeal
        name.classList.add('name')

        let category = document.createElement('p')
        category.innerText = 'Category: ' + meal.strCategory
        category.classList.add('area')

        let area = document.createElement('p')
        area.innerText = 'Area: ' + meal.strArea
        area.classList.add('area')

        let btn = document.createElement('button')
        btn.innerText = 'view Recipe'
        btn.classList.add('showBtn')
        btn.addEventListener('click',()=>{
             window.location.href = `details.html?id=${meal.idMeal}`;
        })

        main.append(imageElement)
        main.append(name)
        main.append(category)
        main.append(area)
        main.append(btn)

        result.append(main)
        
    }
    console.log(response)
}

