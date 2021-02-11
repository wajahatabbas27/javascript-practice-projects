//getting Element from dom
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//eventlistener
form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }

    if (email.value === '') {
        showError(email, 'Email is Required')
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Email is Invalid')
    } else {
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password, 'Password is Required')
    } else {
        showSuccess(password);
    }

    if (password2.value === '') {
        showError(password2, 'Confirm Password is required')
    } else {
        showSuccess(password2);
    }

})

function showError(input, message) {
    const formControl = input.parentElement;               //input ke parent ko access krrhe hain take class name change krlein override krke
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');      //querySelector se access krskte hain hm id,class,element
    small.innerText = message;

}

function showSuccess(input){
    const formControl = input.parentElement;               //input ke parent ko access krrhe hain take class name change krlein override krke
    formControl.className= 'form-control success';
}


function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  //regular expression se check hogi pori email
    return re.test(String(email).toLowerCase());    //phr return hojaegi email
}