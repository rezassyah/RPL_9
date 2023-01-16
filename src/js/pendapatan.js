const tableBody = document.getElementById("table-body");
async function fetchData() {
    const salesDatesResponse = await fetch('/api/readSalesDates');
    const salesDates = await salesDatesResponse.json();
    let prevBulan = 'bulan';
    let dateId = 0;
    let tot = 0;
    let dataCount = 0;
    let totals = [];
    let totalsCount = 0;
    let cek = false;

    const allSalesResponse = await fetch('/api/readAllSales/');
    const data = await allSalesResponse.json();

    for (let j = 0; j < data.length; j++) {
        const sale = data[j];
        const itemResponse2 = await fetch(`/api/items/${sale.kode_item}`);
        const item2 = await itemResponse2.json();
        tot += (sale.terjual * item2.harga) - (sale.terjual * item2.harga_dasar);
        if (j != data.length - 1 && sale.bulan != data[j+1].bulan ) {
            totals[totalsCount] = tot;
            totalsCount += 1;
            tot = 0;
        } else if (j == data.length - 1) {
            tot = (sale.terjual * item2.harga) - (sale.terjual * item2.harga_dasar);
            totals[totalsCount] = tot;
            totalsCount += 1;
            tot = 0;
        }
    }
    totalsCount = 0;
    
    for (let i = 0; i < data.length; i++) {
        
        let row = document.createElement("tr");
        let month = document.createElement("td");
        let name = document.createElement("td");
        let kode = document.createElement("td");
        let stok = document.createElement("td");
        let harga = document.createElement("td");
        let total = document.createElement("td");
        let keuntungan = document.createElement("td");
        let totalKeuntungan = document.createElement("td");
        const sale = data[i];
        if (prevBulan != sale.bulan) {
            dataCount += salesDates[dateId].count;
            month.setAttribute("rowspan", salesDates[dateId].count);
            month.innerHTML = sale.bulan;
            row.appendChild(month);
            dateId += 1;
            prevBulan = sale.bulan;
            cek = true;
        }

        const itemResponse = await fetch(`/api/items/${sale.kode_item}`);
        const item = await itemResponse.json();

        name.innerHTML = item.nama_item;
        kode.innerHTML = item.kode_item;
        stok.innerHTML = sale.terjual;
        harga.innerHTML = item.harga;
        total.innerHTML = sale.terjual * item.harga;
        keuntungan.innerHTML = (sale.terjual * item.harga) - (sale.terjual * item.harga_dasar);

        row.appendChild(name);
        row.appendChild(kode);
        row.appendChild(stok);
        row.appendChild(harga);
        row.appendChild(total);
        row.appendChild(keuntungan);
        tot += (sale.terjual * item.harga) - (sale.terjual * item.harga_dasar);
        if (cek == true) {
            totalKeuntungan.setAttribute("rowspan", salesDates[dateId - 1].count);
            row.appendChild(totalKeuntungan);
            cek = false;
            totalKeuntungan.innerHTML = totals[totalsCount];
            totalsCount += 1;
        }
        

        tableBody.appendChild(row);
    }
}
fetchData();



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
