const inputs = document.querySelectorAll('input')
const sumbitBtn = document.querySelector('button[type = "submit"]');
sumbitBtn.classList = ['cantSubmit'];

for(input of inputs){
   input.addEventListener('input', onInput);
   input.classList = ['greyBorder']
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

    let form = e.target;
    let data = {} // new FormData(form);
    
    for(input of form.elements) {
        if(input.name){
            let key = input.name,
                value = input.value;
            if (key === 'datum_rojstva'){
                value = convertDate(value);
            }
            data[key] = value;
           // data.append(key, value);
        }
    } 
   
/*
    data = new FormData(form);
    console.log(data)
    
    for (var key of data.keys()) {
        console.log(key);
    }*/

    let placeholder = {
        "ime": "Janez",
        "datum_rojstva": "16. 09. 1999",
        "email": "janez@gmail.com"
    };




    sendForm(placeholder);
}
/*
axios.post('http://obrazec.st.agencija101.si/post', {
    ime: "Janez",
    datum_rojstva: "16. 09. 1999",
    email: "janez@gmail.com"
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    */
function sendForm(formData){
    
    let xhr = new XMLHttpRequest()
    //url = 'https://cors-anywhere.herokuapp.com/http://obrazec.st.agencija101.si/post';
    url = 'http://obrazec.st.agencija101.si/post';

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://obrazec.st.agencija101.si');
    xhr.setRequestHeader('Vary', 'Origin');
    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
    };
    //xhr.send(data);
    let fetchBody = JSON.stringify(formData);
    //fetchBody = JSON.parse(fetchBody);
    fetchBody = '{ "ime":"Janez","datum_rojstva":"16. 09. 1999","email":"janez@gmail.com" }'


    postData(url, formData)
        .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
        .catch(error => console.error(error));

    function postData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: fetchBody // JSON.stringify(fetchBody) //JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => console.log(response))// response.json()); // parses JSON response into native Javascript objects 
    }

/*
    axios.post(url, {
        ime: "Janez",
        datum_rojstva: "16. 09. 1999",
        email: "janez@gmail.com"
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });*/
/*
    function postData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: fetchBody // fetchBody//JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => console.log(response))// response.json()); // parses JSON response into native Javascript objects 
    }*/


}