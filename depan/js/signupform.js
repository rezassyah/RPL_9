//form loading animation why not working uuu

const form = [...document.querySelector('.main-content').children]

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1
    }, i*100)
})

//form vallidation

const name = document.querySelector('.input-1') 
const merchant = document.querySelector('.input-2')
const email = document.querySelector('.input-3') 
const password = document.querySelector('.input-4')
const rptpassword = document.querySelector('.input-5')
const createbtn = document.querySelector('.btncreate')

createbtn.addEventListener('click', () => {
    fetch('/register-user', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            name: name.value,
            merchant: merchant.value,
            email: email.value,
            password: password.value,
            rptpassword: rptpassword.value
        })
    })
    .then(res => res.json())
    .then(data => {
        if(data.name) {
            alert('register successful')
        } else {
            alert(data)
        }
    })
})