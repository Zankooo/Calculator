const buttons = document.getElementsByTagName("button")
console.log(buttons)
const display = document.getElementById("display");

for (let button of buttons) {
    button.addEventListener("click", onclick);
}

let izraz = ""
display.innerHTML = 0


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
            display.innerHTML = 0;
            return
        }
        izracunaj(izraz)
        return
    }
    else if (value == "plusMinus"){
        console.log("plus minus je bil kliknjen")
        // klele moramo odstranit 
        let stevilka_krat_minus_ena = plus_minus(izraz)
        console.log("stevilka je " + stevilka_krat_minus_ena)
        //dobit moramo dolzino stringa brez obeh oklepajev in minusa spredi. da pac odstranimo staro cifro ko dodamo novo pac
        let dolzina = ((stevilka_krat_minus_ena.length) - 3) * -1;
        console.log("dolzina je z minusom " + dolzina)
        let izrazz = izraz.slice(0, dolzina);
        
        izraz = izrazz + stevilka_krat_minus_ena
    }

    //lepimo na izraz
    else {
        izraz = izraz.concat(vrednost)
    }
    display.innerHTML = izraz
    console.log("IZRAZ JE TOLE: " + izraz)
    // ce je izraz dolzine nic, samo prikazemo nulo
    if (izraz.length == 0){
        display.innerHTML = 0
    }
    //resetiramo te vrednosti za novo sejo potem
    vrednost = ""
    value = ""
    value_backspace = ""
}

function plus_minus(izraz){
    //pretvorili smo izraz ki je string v number da bomo lahko lazje operirali
    //pretvorimo zadnjo stevko v int
    let zadnjaStevka = parseInt(izraz[izraz.length - 1]);
    
    if ( (izraz == "") || (typeof(zadnjaStevka) != 'number') ){
        
        console.log("Z klikom plus minus nerabimo nic naredit")
        return izraz
    } 
    else {
        console.log("moramo neki naredit, ker je zadnja stvar stevilka")
        let stevilo = ""
        // ce je zadnja stevka cifra naredimo to, in se gremo sprehodi od zadaj naprej po celem izrazu
        for (let i = izraz.length - 1; i >= 0; i--){
            let stevka = (izraz[i])
            if ("9876543210,".indexOf(izraz[i]) === -1) {
                console.log(stevka)
                break;
            }
            else {
                stevilo = stevilo + stevka;
            }
        }
        console.log("stevilo ki je nastalo je stevilo (moralo bi biti samo v obratnem vrstnem redu) " + stevilo)
        let reversedStevilo = "(-" + stevilo.split('').reverse().join('') + ")";
        return reversedStevilo;
        
    }
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
// MINUS PREDZNAK JE ZDEJ KR OBIČEN MINUS -> KAJ NAREST
// DODAT ŠE TIST ZGORNJI DISPLAY KJER
// PROCENT TI SAMO DELI Z 100 ampak ga daš lahko tudi v racun






