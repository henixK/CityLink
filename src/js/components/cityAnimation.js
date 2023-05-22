const cityList = ["Rome", "London", "New York", "Amsterdam", "Paris", "Tokyo"];
const el = document.getElementById("cityAnimation");

let cityIndex = 0;
let charIndex = 0;

function type() {
    if (cityIndex === cityList.length) {
        cityIndex = 0;
    }

    const currentCity = cityList[cityIndex];
    const currentText = currentCity.substring(0, charIndex);

    el.textContent = `${currentText}`;

    charIndex++;

    if (charIndex > currentCity.length) {
        cityIndex++;
        charIndex = 0;
    }

    setTimeout(type, 700);
}

type();