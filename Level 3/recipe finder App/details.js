let container = document.querySelector('.container')
let head = document.querySelector('.heading')
let img = document.querySelector('.img')
let ing = document.querySelector('.ing')
let inst = document.querySelector('.inst')
let meas = document.querySelector('.meas')
let show = document.querySelector('.link')

const params = new URLSearchParams(window.location.search);
const mealId = params.get('id');

async function fetchMealDetails() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await res.json();
    console.log(data.meals[0]); // full meal details
    head.innerHTML = "";
    img.innerHTML = "";  
    meas.innerHTML = '';
    ing.innerHTML = "";
    inst.innerHTML = "";
    show.innerHTML = "";
            if (!data.meals) {
            head.innerHTML = "<h2>Meal not found 😢</h2>";
            return;
        }

    let name = document.createElement('h2')
    name.innerText = data.meals[0].strMeal
    head.append(name)

    let image = document.createElement('img');
        // result.appendChild(imageElement);
        image.src = data.meals[0].strMealThumb
         image.classList.add('detimg')
        img.append(image)

    for(let i = 1; i<=20; i++){
            const ingredient = data.meals[0][`strIngredient${i}`];
            const measure = data.meals[0][`strMeasure${i}`];
            if (ingredient && measure) {
                const ingredients = document.createElement('p');
                const measures = document.createElement('p')
                ingredients.innerText = `${ingredient}:`;
                measures.innerText = measure;
                meas.append(measures);
                ing.append(ingredients);
            }

    }

    let instructions = document.createElement('p')
    instructions.innerText = data.meals[0].strInstructions
    inst.append(instructions)

    // for(let i = 1; i<=20; i++){
    //     const measure = data.meals[0][`strMeasure${i}`];
    //     if (measure) {
    //         const measures = document.createElement('p')
    //         measures.innerText = measure;
    //         meas.append(measures);
    //     }
    // }

    let link = document.createElement('a')
    link.href = data.meals[0].strYoutube
    link.innerText = 'click to watch video'
    link.target = '_blank'
    show.append(link)
}

fetchMealDetails();
