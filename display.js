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
    
    //backspace pobrišemo zadnji znake
    if (vrednost === "backspace"){
        if (izraz.length > 0){
            izraz = izraz.slice(0, -1)
        }
    }
    
    //klicemo funkcijo izracunaj
    else if (vrednost === "=") {
        //da napise enter values ce nismo nic napisali in dali direkt enter
        if (izraz.length === 0){
            console.log("napaka")
            display.innerHTML = "Error";
            return
        }
        izracunaj(izraz)
        return
    }
    //lepimo na izraz
    else {
        izraz = izraz.concat(vrednost)
    }

    display.innerHTML = izraz
    console.log("IZRAZ JE TOLE: " + izraz)
    //resetiramo te vrednosti za novo sejo potem
    vrednost = ""
    value = ""
    value_backspace = ""
    
}

function izracunaj(izraz){
    let racun = izraz;
    
    if ((racun.includes(',')) && (racun.includes('x'))){
        console.log("Pretvorba vejice in x")
        let koncni = pretvorba_x_v_zvezdico(pretvorba_vejica_v_piko(racun))
        let izracunano = eval(koncni);
        display.innerHTML = izracunano;
    }

    else if (racun.includes('x')){
        console.log("Pretvorba samo x")
        let pretvorjenRacun = pretvorba_x_v_zvezdico(racun)
        let izracunano = eval(pretvorjenRacun)
        display.innerHTML = izracunano 
        
    }
    else if (racun.includes(',')){
        console.log("Pretvorba samo vejice")
        let pretvorjenRacun = pretvorba_vejica_v_piko(racun)
        let izracunano = eval(pretvorjenRacun)
        display.innerHTML = izracunano 
    }
   

    //ce racun ne vsebuje niti x niti *
    else{
        console.log("To je else")
        console.log("TO JE RACUN, KI BO SEL V EVAL:", racun)
        let izracunano = eval(racun)
        console.log("izracunano je " , izracunano)
        display.innerHTML = izracunano 
    }


}

//pretvorbe
function pretvorba_vejica_v_piko(racun){
    let pretvorjenRacun = racun.replace(/,/g , ".");
    return pretvorjenRacun;
}

function pretvorba_x_v_zvezdico(racun){
    let pretvorjenRacun = racun.replace(/x/g, "*");
    return pretvorjenRacun;
}




//KAJ DELA:
// - SESTEVANJE: INT FLOAT 
// - ODSTEVANJE: INT FLOAT 
// - MNOZENJE: DELA VSE
// - DELJENJE: INT DELA





// ŠE NAREST:
// ČE SO VEČ KOT 2 DECIMALKE DA TI ZAOKROZI NA DVE
// MINUS PREDZNAK JE ZDEJ KR OBIČEN MINUS -> KAJ NAREST
// DODAT ŠE TIST ZGORNJI DISPLAY KJER
// PROCENT TI SAMO DELI Z 100






