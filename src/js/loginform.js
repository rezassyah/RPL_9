//form loading animation why not working uuu

const form = [...document.querySelector('.main-content').children]

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1
    }, i*100)
})


//form validation

const email = document.querySelector('.email') 
const password = document.querySelector('.password') 
const inbtn = document.querySelector('.btnin')

inbtn.addEventListener('click', () => {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    fetch(`/api/readUser?email=${email}&password=${password}`, {
        method: 'get',
        headers: new Headers({'Content-Type':'application/json'})
    })
    .then(res => res.json())
    .then(data => {
        validateData(data) //kalo udah ada database
        location.href = '../dashboard.html'
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