let name = document.querySelector('.name')
let amount = document.querySelector('.amount')
let category = document.querySelector('#category')
let date = document.querySelector('#date')
let btn = document.querySelector('.btn')
let show = document.querySelector('.show')


let array = JSON.parse(localStorage.getItem('expenses')) || [];

function formatDate(dateStr) {
  let parts = dateStr.split("-");
  return `${parts[2]}-${parts[1]}-${parts[0]}`; // DD-MM-YYYY
}

let today = new Date();
let day = String(today.getDate()).padStart(2, '0');
let month = String(today.getMonth() + 1).padStart(2, '0');
let year = today.getFullYear();
date.value = `${year}-${month}-${day}`;

function updateTotal() {
  let total = array.reduce((sum, expense) => sum + Number(expense.amount), 0);
  document.getElementById('total').textContent = total;
}


let tab = ()=>{
  let table = document.createElement("table");
  table.classList.add('table')

  let header = table.insertRow();
  let headers = ["Name", "Category", "Amount","Date","Action"];
  headers.forEach(text => {
    let th = document.createElement("th");
    th.textContent = text;
    th.classList.add('th')
    header.appendChild(th);
  });


  return table;
}
let tables = tab()
show.append(tables)

array.forEach(item => addRow(item));


function addRow(item) {
  let row = tables.insertRow();

  Object.entries(item).forEach(([key, value]) => {
    let cell = row.insertCell();
    if (key === "date") {
      cell.textContent = formatDate(value);
    } else {
      cell.textContent = value;
    }
    cell.classList.add('th');
  });

  let actionCell = row.insertCell();
  del(actionCell, row, item);
  addEditButton(actionCell, row, item);
}


btn.addEventListener('click',()=>{

  if((amount.value) == "" || (name.value) == ""){
    return alert('fill the details')
  }
  if( category.value == 0){
    return alert('select an category')
  }
    result = {
      description: name.value,
      category:category.options[category.selectedIndex].text,
      amount: amount.value,
      date: date.value,
    }
    // show.innerHTML += `<p>${result.description} - ${result.amount} - ${result.category} - ${result.date}</p>`;
      array.push(result)
      addRow(result);
      updateTotal()
      console.log(array)
      localStorage.setItem('expenses',JSON.stringify(array))
      // localStorage.removeItem('expenses');

})


// array.forEach(expense => {
//   show.innerHTML += `<p>${expense.description} - ${expense.amount} - ${expense.category} - ${expense.date}</p>`;
// });

function del(cell,row, item) {
  let delBtn = document.createElement("button");
  delBtn.textContent = "🗑️";
  delBtn.classList.add("delete"); // for CSS styling
  delBtn.onclick = () => {
    row.remove(); // remove row from table
    array = array.filter(exp => exp !== item); // remove from array
    localStorage.setItem("expenses", JSON.stringify(array)); // update storage
    updateTotal(); 
  };
  cell.appendChild(delBtn);
  cell.style.padding = "8px";
}

function addEditButton(cell,row, item) {
  let editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit");
  editBtn.onclick = () => {
    name.value = item.description;
    amount.value = item.amount;
    category.value = item.category;
    date.value = item.date;

    array = array.filter(exp => exp !== item);
    localStorage.setItem("expenses", JSON.stringify(array));

    row.remove()
  };
  cell.appendChild(editBtn);
}
updateTotal();
