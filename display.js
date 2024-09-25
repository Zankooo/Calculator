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
        //tukaj sedaj pa moramo odstranit prejsno stevilko, torej ali pozitivno ali negativno.
        //ker ce mi zamenjamo v bistvu, staro za novo
        // ce je stevilka_krat_minus_ena negativna moramo odstranit pozitivno od prej in dodat novo negativno
        let izrazz;
        if (stevilka_krat_minus_ena[stevilka_krat_minus_ena.length - 1] === ")"){
            console.log("prej smo meli pozitivno in pozitivno moramo odstranit")
            let dolzina = ((stevilka_krat_minus_ena.length) - 3) * -1;
            console.log("dolzina brez z minusom " + dolzina)
            console.log(izraz)
            izrazz = izraz.slice(0, dolzina);
            console.log("izrazz je " + izrazz)
        }
        // ce je pa stevilka_krat_minus_ena pozitivna, moramo pa odstranit negativno od prej in dodat pozitivno
        // 9x(-3,14)
        else {
            let dolzina = ((stevilka_krat_minus_ena.length) + 3) * -1;
            izrazz = izraz.slice(0,dolzina);
            console.log("izrazz je " + izrazz)
        }

        
        
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
    //zadnja je zaklepaj
    if (izraz[izraz.length - 1] == ")"){
        console.log("opazili smo da je zadnji character zaklepaj, izraz je " + izraz)
        //jst bi naredil for loop nazaj, in sel dokler ne vidis (
        // in ko vidis odrezes izraz, ga das v spremenljivko in odstranis zadnji character ki je )
        // odstranis prvega in drugega
        // in nato nalepis na izraz in returnas
        let odrezano;
        for (let i = izraz.length - 1; i >= 0; i--){
            if (izraz[i] == "("){
                odrezano = izraz.slice(i, izraz.length);
                console.log("ali smo odrezali (-3,14) ? " + odrezano)
                break
            }
        }
        
        let pozitiven = odrezano.slice(2, odrezano.length - 1);  // From index 1 to length - 1
        console.log("Brez oklepaje in minusov" + pozitiven);
        return pozitiven;
    }

    let zadnjaStevka = parseInt(izraz[izraz.length - 1]);
    console.log("zadnja stevka je " + zadnjaStevka)
    //zadnja stevvka je number
    if ((zadnjaStevka === 1) || (zadnjaStevka === 2) || (zadnjaStevka === 3) || (zadnjaStevka === 4) || (zadnjaStevka === 5) || (zadnjaStevka === 6) || (zadnjaStevka === 7) || (zadnjaStevka === 8) || (zadnjaStevka === 9) || (zadnjaStevka === 0)){
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
    
    else {
        console.log("nerabimo nic naredit, ker zadnji character ni niti zaklepaj niti cifra")
        
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






