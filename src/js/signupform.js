//form loading animation why not working uuu

const form = [...document.querySelector('.main-content').children]

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1
    }, i * 100)
})

//form vallidation

const nama = document.querySelector('.name')
const merchant = document.querySelector('.merchant')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const rptpassword = document.querySelector('.rptpassword')
const createbtn = document.querySelector('.btncreate')

createbtn.addEventListener('click', () => {
    fetch('/api/createUser', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            name: nama.value,
            merchant: merchant.value,
            email: email.value,
            password: password.value,
            rptpassword: rptpassword.value
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.acknowledged) {
                alert('register successful')
                location.href = '../login.html'
            } else if (!data.acknowledged) {
                alertBox("register unsuccessful, data exist")
                location.href = '../login.html'
            } else {
                alertBox(data)
            }
        })
})


const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box')
    const alertMsg = document.querySelector('.alert')
    alertMsg.innerHTML = data

    alertContainer.style.top = `5%`
    setTimeout(() => {
        alertContainer.style.top = null
    }, 5000)
}