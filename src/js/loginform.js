//form loading animation why not working uuu

const form = [...document.querySelector('.main-content').children]

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1
    }, i * 100)
})


//form validation

const email = document.querySelector('.email')
const password = document.querySelector('.password')
const inbtn = document.querySelector('.btnin')

inbtn.addEventListener('click', () => {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    fetch('/api/login', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            validateData(data);
        });
});


const validateData = (data) => {
    if (!data.email) {
        alertBox(data)
    } else {
        location.href = '../kasir'
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