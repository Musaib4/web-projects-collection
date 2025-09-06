let from = document.querySelector('#fr')
let to = document.querySelector('#too')
let amount = document.querySelector('.amt2')
let converted = document.querySelector('#converted')
let button = document.querySelector('.button')

let key = 'cur_live_0SRufdkEQfkg1unrWSC8KOuzKRyWz7llZABD4Z7I'


//     let api = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${key}&base_currency=USD&currencies=INR,EUR,GBP`)

async function getKey(){
    try{
        let api = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${key}
    `)
        let response = await api.json()
        console.log(response)
    
    
        for (let curr in response.data) {
            let option1 = document.createElement('option')
            let fromValue = response.data[curr].code
            option1.innerText = fromValue
            option1.value = fromValue;
            from.appendChild(option1)
        }

        for (let curr in response.data) {
            let option2 = document.createElement('option')
            let fromValue = response.data[curr].code
            option2.innerText = fromValue
            option2.value = fromValue;
            to.appendChild(option2)
        }
    }
    catch (e){
        console.log(e)
    }
}
getKey()

async function result() {
    try{
        let api = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${key}&base_currency=${from.value}&currencies=${to.value}
    `)
        let response = await api.json()
        return response.data[to.value].value 
    }
    catch(e){
        console.log(e)
        return null
    }
    
}

button.addEventListener('click', async () => {
    let rate = await result()
    if (rate !== null) {
        let answer = rate * Number(amount.value)
        converted.innerText = answer
    } else {
        converted.innerText = "Error fetching rate"
    }
})
amount.addEventListener('change',async()=>{
     let rate = await result()
    if (rate !== null) {
        let answer = rate * Number(amount.value)
        converted.innerText = answer
    } else {
        converted.innerText = "Error fetching rate"
    }
})
