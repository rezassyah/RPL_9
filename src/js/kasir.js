const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text")


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close")
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close")
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark")
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode"
    }else{
        modeText.innerText = "Dark mode"
        
    }
})  

let stock = {
    'item1': 10,
    'item2': 20,
    'item3': 30
  };
  
  function calculateTotal() {
    let itemName = document.getElementById('item-name').value;
    let quantity = document.getElementById('quantity').value;
  
    if (stock[itemName] >= quantity) {
      let total = quantity * 10; // Assuming the cost of each item is $10
      document.getElementById('total').innerHTML = `Total: $${total}`;
      stock[itemName] -= quantity;
    } else {
      alert(`Not enough stock for ${itemName}`);
    }
  }
  
  function displayStock() {
    let table = document.getElementById('stock');
  
    for (const item in stock) {
      let row = table.insertRow();
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      cell1.innerHTML = item;
      cell2.innerHTML = stock[item];
    }
  }
  
  displayStock();