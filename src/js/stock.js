// Get the add button and the table body
const addButton = document.getElementById("add-button");
const tableBody = document.getElementById("table-body");

fetch('/api/readAllItems/')
  .then(response => response.json())
  .then(data => {
    data.forEach(function (item) {
      let row = document.createElement("tr");
      let name = document.createElement("td");
      let kode = document.createElement("td");
      let stok = document.createElement("td");
      let harga = document.createElement("td");
      let tambah = document.createElement("td");
      let hapus = document.createElement("td");

      name.innerHTML = item.nama_item;
      kode.innerHTML = item.kode_item;
      stok.innerHTML = item.stok;
      harga.innerHTML = item.harga;
      tambah.innerHTML = '<td><button class="remove-button">Tambah</button></td>';
      hapus.innerHTML = '<td><button class="remove-button">Hapus</button></td>';

      row.appendChild(name);
      row.appendChild(kode);
      row.appendChild(stok);
      row.appendChild(harga);
      row.appendChild(tambah);
      row.appendChild(hapus);

      tableBody.appendChild(row);
    });
  })
  .catch(error => console.log(error));

// When the add button is clicked, add a new row to the table
addButton.addEventListener("click", () => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" placeholder="Nama Barang"></td>
    <td><input type="text" placeholder="Kode"></td>
    <td><input type="number" placeholder="Stok"></td>
    <td><input type="number" placeholder="Harga"></td>
    <td><button class="add-button">Tambah</button> <button class="remove-button">Hapus</button></td>
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


toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close")
})

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close")
})

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark")

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode"
  } else {
    modeText.innerText = "Dark mode"

  }
})