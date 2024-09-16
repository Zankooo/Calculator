const buttons = document.getElementsByTagName("button")
console.log(buttons)
const display = document.getElementById("display");

for (let button of buttons) {
    button.addEventListener("click", onclick);
}

let izraz = ""

function onclick(event){
    //kle je blo zafrkancije ker img ne more imet value in pol mu das ta getAttribute
    let value = event.target.value;
    let value_backspace = event.target.getAttribute('data-value');
    let vrednost;
    //in pol gledamo v temu ifu pogoje da nastavimo potem to vrednost ki 'gre naprej' potem
    // ce je value undefined pomeni da smo kliknili ikonco, kar je okej, ce je pa value backspaceGumb pa pomeni da smo kliknili button = oboje pa skupaj tvori button
    if ((value === undefined) || (value == "backspaceGumb")){
        vrednost = "backspace"
        console.log("DELA")
    }
    else{
        vrednost = value
    }
    
    if (vrednost === "backspace"){
        if (izraz.length > 0){
            izraz = izraz.slice(0, -1)
        }
    }
    
    else if (vrednost === "=") {
        izracunaj(izraz)
        return
    }
    else {
        izraz = izraz.concat(value)
    }

    display.innerHTML = izraz
    console.log("IZRAZ JE TOLE: " + izraz)
    //resetiramo te vrednosti za novo sejo potem
    vrednost = ""
    value = ""
    value_backspace = ""
    
}




function izracunaj(izraz){
    console.log("to je izraz", izraz)
    let izracunano = eval(izraz)
    display.innerHTML = ""
    display.innerHTML = izracunano
    
}




