const inputs = document.querySelectorAll('input')
const sumbitBtn = document.querySelector('button[type = "submit"]');
sumbitBtn.classList = ['cantSubmit'];

for(input of inputs){
   input.addEventListener('input', onInput);
   input.classList = ['greyBorder'];
}

function onInput(e){
    let valids = 0;
    for (input of inputs) {
       if (input.checkValidity()){
          valids++;
       } else if(input.value !== ""){
          input.classList = [];
       } else if (input.value === "") {
           input.classList = ['greyBorder'];
       }
    } 
    if (valids === inputs.length) {
        sumbitBtn.classList = ['readyToSubmit'];
    }  
}

function convertDate(date){
    let converted = "";
    converted += date.slice(8, 10) + '.';
    converted += date.slice(5,7) + '.';    
    converted += date.slice(0, 4);
    return converted;
}

function submitForm(e){
    e.preventDefault();

    let form = e.target,
        data = {}
    
    for(input of form.elements) {
        if(input.name){
            let key = input.name,
                value = input.value;
            if (key === 'datum_rojstva'){
                value = convertDate(value);
            }
            data[key] = value;
        }
    } 

    sendForm(data);
}

function sendForm(formData){
    //ker se server odziva s CORS errorjem, sem najprej nastavil mode na 'no-cors', 
    //a sem tedaj prejemal le 422 errorje glede validacije podatkov, ki so bili zagotovo pravilni
    //zato sem uporabil proxy cors-anywhere, prek katerega lahko uspešno izvajam requeste 
    url = 'https://cors-anywhere.herokuapp.com/http://obrazec.st.agencija101.si/post';
    //url = 'http://obrazec.st.agencija101.si/post';

    let request = new Request(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',          
        },
        body:  JSON.stringify(formData)
    })

    fetch(request)
        .then(response => response.json())
        .then(msg => {
            console.log(msg)
            document.querySelector('#status-text').textContent = msg.message;
 1       })

        .catch(error => console.error(error));
}