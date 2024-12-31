const imgEl = document.querySelector(".dashboard__card-image img")
const [pOneEl, pTwoEl, pThreeEl] = document.querySelectorAll(".dashboard__card-info p")
const logOutBtn = document.querySelector(".logOutBtn")

logOutBtn.addEventListener("click", () => {
    window.location.replace("../index.html")
    localStorage.removeItem("accessToken")
})

const BASE_URL = 'https://dummyjson.com'

window.onload = () => {
    checkToken()
}

function checkToken(){
    function isTokenExpired(token){
        try{
            const payload = JSON.parse(atob(token.split('.')[1]));
            const exp = payload.exp
            const currenTime = Math.floor(new Date() / 1000)
            return exp < currenTime
        }catch(e){
            return true
        }
    }
    const token = localStorage.getItem("accessToken")

    if(!token || isTokenExpired(token)){
        window.location.replace("../index.html")
        localStorage.removeItem("accessToken")
    }else{
        fetch(`${BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((res)=>  {
            if(!res.ok){
                throw new Error (`Invalid token or server error ${res.status}`)
            }
            return  res.json()
        })
        .then(res => {
            imgEl.src = res.image
            pOneEl.textContent = `${res.firstName} ${res.lastName}`
            pTwoEl.textContent = `${res.gender}`
            pThreeEl.textContent = `${res.university}`
            pThreeEl.title = `${res.university}`
        })
        .catch((e) =>  {
            alert(e.message)
            localStorage.removeItem("accessToken")
            window.location.replace("../index.html")
        })
    }
}