// Get the add button and the table body
const addButton = document.getElementById("add-button");
const tableBody = document.getElementById("table-body");

// When the add button is clicked, add a new row to the table
addButton.addEventListener("click", () => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" placeholder="Nama Barang"></td>
    <td><input type="text" placeholder="Kode"></td>
    <td><input type="number" placeholder="Stok"></td>
    <td><input type="number" placeholder="Harga"></td>
    <td><button class="remove-button">Hapus</button></td>
  `;

  // Add the new row to the table body
  tableBody.appendChild(newRow);
});

// Add an event listener to the table body that will catch clicks on the remove button
tableBody.addEventListener("click", (event) => {
  // If the clicked element is a remove button, remove its parent row
  if (event.target.classList.contains("remove-button")) {
    event.target.parentElement.parentElement.remove();
  }
});





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
    

