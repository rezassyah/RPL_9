//form loading animation why not working uuu

const form = [...document.querySelector('.main-content').children]

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1
    }, i*100)
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}

//form validation

const email = document.querySelector('.email') 
const password = document.querySelector('.password') 
const inbtn = document.querySelector('.btnin')

inbtn.addEventListener('click', () => {
    fetch('/login-user', {
        method: 'post',
        headers: new Headers({'Content-Type':'application/json'}),
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(data => {
//        if(data.name) {
//            alert('login successful')
//        } else {
//            alert(data)
//        }
        validateData(data) //kalo udah ada database
    })
})
const validateData = (data) => {
    if(!data.email) {
        alertBox(data)
    } else {
        sessionStorage.email = data.email
        location.href = '../dashboard.html'
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box')
    const alertMsg = document.querySelector('.alert')
    alertMsg.innerHTML = data

    alertContainer.style.top = `5%`
    setTimeout(() => {
        alertContainer.style.top = null
    }, 5000)
}