const buttons = document.getElementsByTagName("button")
console.log(buttons)
const display = document.getElementById("display");

for (let button of buttons) {
    button.addEventListener("click", onclick);
}

let izraz = ""

function onclick(event){
    
    let value = event.target.value;
    
    console.log("vrednost kliknjena je " , value)
    if (value === "C"){
        display.innerHTML = ""
        izraz = ""
    }
    
    else if (value === "=") {
        izracunaj(izraz)
        return
    }
    else {
        izraz = izraz.concat(value)
    }
    display.innerHTML = izraz
    console.log("IZRAZ JE TOLE: " + izraz)
}




function izracunaj(izraz){
    console.log("to je izraz", izraz)
    let izracunano = eval(izraz)
    display.innerHTML = ""
    display.innerHTML = izracunano
    
}




