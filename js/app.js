const togglePasswordBtn = document.querySelector(".showOrHideBtn")
const userInt = document.querySelector(".userInput")
const passwordInt =  document.querySelector(".passwordInput")
const formEl = document.querySelector(".login__form")

const  BASE_URL = 'https://dummyjson.com'

alert('Username: emilys password: emilyspass')

togglePasswordBtn.addEventListener("click", ()=> {
    const type = passwordInt.type === "text" ? "password" : "text"
    passwordInt.type = type

    togglePasswordBtn.textContent = type === "text" ? "🙈" : "👁️";
})

formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    let user = {
        username: userInt.value,
        password: passwordInt.value
    }
    fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        if(!res.ok){
            throw new Error (`Error: ${res.status} /n Username or Password is incorrect`)
        }
        return res.json()
    })
    .then(data => {
        const accessToken = data.accessToken
        localStorage.setItem("accessToken", JSON.stringify(accessToken))
        open('/pages/dashboard.html', "_self")
    })
    .catch(err => {
        alert(err.message)
    })
})