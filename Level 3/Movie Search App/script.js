let input = document.querySelector('.input')
let button = document.querySelector('.btn')
let show = document.querySelector('.movies')

let movies = []

// button.addEventListener('click',()=>{
//     movie =input.value 
//     api()
//     console.log(movie)
// })

let key = 'd8fda246'

async function api(movie) {
    let apiKey = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${movie}`)
    response = await apiKey.json()
    console.log(response)

    if(response.Response === 'True'){
         movies = response.Search
        renderMovie()
    }
    else{
        show.innerHTML = `<p>No results found for "${movie}"</p>`
    }
    
}

let renderMovie = () => {
    show.innerHTML = ''
    movies.forEach(m => {
        let poster = m.Poster !== "N/A" ? m.Poster : "placeholder.png"
        show.innerHTML += `
            <div class="movie-card">
                <img src="${poster}" alt="${m.Title} poster">
                <h3>${m.Title} (${m.Year})</h3>
            </div>
        `
    })
}


button.addEventListener('click', () => {
    let movie = input.value.trim()
    if (movie) {
        api(movie)
        input.value = ""
    }
})
// <img src="${data.Poster}" alt="Poster">