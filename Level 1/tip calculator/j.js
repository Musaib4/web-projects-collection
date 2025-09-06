let con = document.querySelector('.box')
let button = document.querySelector('.btn')
let aut = document.querySelector('.box2')
const quotes = [
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Happiness depends upon ourselves.",
    author: "Aristotle"
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein"
  },
  {
    text: "Don’t let yesterday take up too much of today.",
    author: "Will Rogers"
  },
  {
    text: "Your time is limited, so don’t waste it living someone else’s life.",
    author: "Steve Jobs"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Everything you’ve ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "Dream big and dare to fail.",
    author: "Norman Vaughan"
  }
];
rix = Math.floor(Math.random()*quotes.length)
    con.innerText = quotes[rix].text
    aut.innerText = quotes[rix].author

button.addEventListener('click',()=>{
    ri = Math.floor(Math.random()*quotes.length)
    con.innerText = quotes[ri].text
    aut.innerText = quotes[ri].author
})
