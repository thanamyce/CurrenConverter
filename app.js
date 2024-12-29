const Base_URL = 'https://api.frankfurter.dev/v1/latest?';

const sel = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button")
for (select of sel) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector("form input");
    let amtVal = amt.value;
    if (amtVal == 0 || amtVal < 0) {
        amtVal = 1;
        amt.value = amtVal;
    }
    let fro = document.querySelector(".from select")
    let from = fro.value;
    let too = document.querySelector(".to select")
    let to = too.value;
    console.log(from);
    console.log(to);
    let URL = `${Base_URL}base=${from}&symbols=${to}`;
    let response = await fetch(URL);
    console.log(response);
    let res = await response.json();
    console.log(res);
    let rate = res.rates[to];
    let str = `${amt.value}${from} = ${amt.value * rate}${to}`;
    let msg = document.querySelector(".msg p");
    console.log(str);
    msg.innerText = str;



})