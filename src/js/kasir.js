
var inputValue = document.getElementsByName("Ckdproduk")[0].value;
async function getInputValue(value) {
    console.log(value);
    // do something with the input value
    let data = await findItem(value);
    document.getElementById("nama_produk").value = data.nama_item;
    document.getElementById("harga_jual").value = data.harga;
}

async function getTotalValue(value) {
    document.getElementById("Isubtotal").value = value * document.getElementById("harga_jual").value;
    document.querySelector("h3").textContent = `Rp. ${document.getElementById("Isubtotal").value}`;
}

async function findItem(kode_item) {
    try {
        const response = await fetch(`/api/items/${kode_item}`);
        if (!response.ok) {
            throw new Error(`Error fetching item: ${response.status}`);
        }
        const item = await response.json();
        return item;
    } catch (error) {
        window.alert("Error / Item tidak ada di Toko ini");
    }
}

async function procesBayar(value) {
    document.getElementById("kembalian").value = value - document.getElementById("Isubtotal").value;
}

async function updateSales() {
    const kode_item = document.querySelector(".form-control-sm").value;
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear().toString();
    const qty = parseInt(document.getElementById("Iqty").value);

    const response = await fetch(`/api/items/${kode_item}`);
    if (!response.ok) {
        throw new Error(`Error fetching item: ${response.status}`);
    }
    const item = await response.json();
    if (document.getElementById("kembalian").value < 0) {
        throw new Error("Pembayaran Kurang");
    }
    if (item.stok > qty) {
        const body = item;
        body.stok = body.stok - qty;
        const res1 = await fetch(`/api/items/${kode_item}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res1.json();

        try {

            const res3 = await fetch(`/api/salesg/${kode_item}`)
    
            const data = await res3.json();
        } catch {
            window.alert("WTF")
            data = '';
        } finally {

            if (data == '') {
                const bod1 = {
                    bulan: currentMonth,
                    tahun: currentYear,
                    storeId: 0,
                    kode_item: kode_item,
                    terjual: qty
                }
                const res4 = await fetch('/api/sales', {
                    method: 'POST',
                    body: JSON.stringify(bod1),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data4 = await res4.json();
            } else {
                window.alert(data.terjual)
                const bod1 = {
                    bulan: currentMonth,
                    tahun: currentYear,
                    storeId: 0,
                    kode_item: kode_item,
                    terjual: data.terjual + qty
                }
                const res2 = await fetch(`/api/sales/${kode_item}`, {
                    method: 'PUT',
                    body: JSON.stringify(bod1),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data2 = await res2.json();
            }
    
        }

    } else {
        return window.alert("STOK KURANG");
    }
}

const resetButton = document.querySelector('.btn-danger');
resetButton.addEventListener('click', () => {
    document.querySelector(".form-control-sm").value = '';
    document.getElementById("nama_produk").value = '';
    document.getElementById("harga_jual").value = '';
    document.getElementById("Iqty").value = '';
    document.getElementById("Isubtotal").value = '';
})

const resetButton1 = document.querySelector('.btn-danger1');
resetButton1.addEventListener('click', () => {
    document.querySelector(".form-control-sm").value = '';
    document.getElementById("nama_produk").value = '';
    document.getElementById("harga_jual").value = '';
    document.getElementById("Iqty").value = '';
    document.getElementById("Isubtotal").value = '';
    document.querySelector("h3").textContent = `Rp. ${0}`;
})

const submit = document.querySelector('.btn-primary1');
submit.addEventListener('click', () => {
    updateSales();
})


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