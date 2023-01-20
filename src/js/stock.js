
// Get the add button and the table body
const addButton = document.getElementById("add-button");
const tableBody = document.getElementById("table-body");

async function deleteItem(kode_item) {
  try {
      const response = await fetch(`/api/deleteItems/${kode_item}`, {
          method: 'DELETE'
      });
      const result = await response.json();
      // Do something with the result here, e.g. show a success message
      window.alert("Data Successfully Deleted");
  } catch (error) {
      console.error(error);
      // Do something with the error here, e.g. show an error message
  }
}

fetch('/api/readAllItems/')
  .then(response => response.json())
  .then(data => {
    data.forEach(function (item) {
      let row = document.createElement("tr");
      let name = document.createElement("td");
      let kode = document.createElement("td");
      let desc = document.createElement("td");
      let stok = document.createElement("td");
      let harga = document.createElement("td");
      let hargaDasar = document.createElement("td");
      let kategori = document.createElement("td");
      let button = document.createElement("td");

      name.innerHTML = item.nama_item;
      kode.innerHTML = item.kode_item;
      desc.innerHTML = item.deskripsi;
      stok.innerHTML = item.stok;
      harga.innerHTML = item.harga;
      hargaDasar.innerHTML = item.harga_dasar;
      kategori.innerHTML = item.kategori;
      button.innerHTML = `<td><button class="remove-button">Hapus</button></td>`;

      name.setAttribute("class", "name-class");
      kode.setAttribute("class", "kode-class");
      desc.setAttribute("class", "desc-class");
      stok.setAttribute("class", "stok-class");
      harga.setAttribute("class", "harga-class");
      hargaDasar.setAttribute("class", "dasar-class");
      kategori.setAttribute("class", "kategori-class");

      row.appendChild(name);
      row.appendChild(kode);
      row.appendChild(desc);
      row.appendChild(stok);
      row.appendChild(harga);
      row.appendChild(hargaDasar);
      row.appendChild(kategori);
      row.appendChild(button);

      tableBody.appendChild(row);
    });
  })
  .catch(error => console.log(error));

// When the add button is clicked, add a new row to the table
addButton.addEventListener("click", () => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" placeholder="Nama Barang" class='inNama'></td>
    <td><input type="text" placeholder="Kode" class='inKode'></td>
    <td><input type="text" placeholder="Deskripsi" class='inDesc'></td>
    <td><input type="number" placeholder="Stok" class='inStok'></td>
    <td><input type="number" placeholder="Harga" class='inHarga'></td>
    <td><input type="number" placeholder="Harga Dasar" class='inDasar'></td>
    <td><input type="text" placeholder="Kategori" class='inKategori'></td>
    <td><button class="add-button">Tambah</button> <button class="remove-button">Hapus</button></td>
  `;
  // Add the new row to the table body
  tableBody.appendChild(newRow);
});

// Add an event listener to the table body that will catch clicks on the remove button
tableBody.addEventListener("click", (event) => {
  // If the clicked element is a remove button, remove its parent row
  if (event.target.classList.contains("remove-button")) {
    try {
      let kode_item = (event.target.parentElement.parentElement.querySelector('.kode-class').textContent);
      deleteItem(kode_item);
      event.target.parentElement.parentElement.remove();
    } catch {
      event.target.parentElement.parentElement.remove();
    }
  } else if (event.target.classList.contains("add-button")) {
    const nama_item = event.target.parentElement.parentElement.querySelector('.inNama').value;
    const kode_item = event.target.parentElement.parentElement.querySelector('.inKode').value;
    const deskripsi = event.target.parentElement.parentElement.querySelector('.inDesc').value;
    const stok = event.target.parentElement.parentElement.querySelector('.inStok').value;
    const harga = event.target.parentElement.parentElement.querySelector('.inHarga').value;
    const harga_dasar = event.target.parentElement.parentElement.querySelector('.inDasar').value;
    const kategori = event.target.parentElement.parentElement.querySelector('.inKategori').value;
    if (!kode_item) {
      window.alert("Please enter a code for the item.");
      return;
    }
    if (!stok) {
      window.alert("Please enter a stock for the item.");
      return;
    }
    if (!harga) {
      window.alert("Please enter a price for the item.");
      return;
    }
    if (!harga_dasar) {
      window.alert("Please enter a basic price for the item.");
      return;
    }
    const body = {
      nama_item: nama_item,
      kode_item: kode_item,
      deskripsi: deskripsi,
      stok: stok,
      harga: harga,
      harga_dasar: harga_dasar,
      kategori: kategori,
      image: '',
      storeId: ''
    };
    window.alert("Menambahkan Data . . . ");
    fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      location.reload();
    })
    .catch(error => console.log(error));

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