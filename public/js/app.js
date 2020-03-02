console.log('Client side javascript fyle loaded.')


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = "From Javascript";

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                //console.log(data.error);
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                // console.log(data.forecast);
                // console.log(data.location);
            }
        })
    })

    //console.log(location);
})