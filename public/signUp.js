var removeRedundantWarning = (label) => {
    if (label.childNodes[1] !== undefined)
        label.removeChild(label.childNodes[1]);
};

var addWarning = (label, message) => {
    label.innerHTML += `<span class="warning">${message}</span>`;
};

var isValid = () => true;

var callback = () => {
    console.log('Sign Up button clicked');
    let inputs = document.querySelectorAll('input.input100'), labels = document.querySelectorAll('span.txt1');
    let email = inputs[0].value, password = inputs[1].value, retypePassword = inputs[2].value;
    let emailLabel = labels[0], passwordLabel = labels[1], retypePasswordLabel = labels[2];
    removeRedundantWarning(emailLabel);
    removeRedundantWarning(retypePasswordLabel);
    if (isValid(email) && isValid(password)) {
        if (password === retypePassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((value) => {
                window.open('index.html', '_self');
            }).catch((error) => {
                addWarning(emailLabel, error.message);
            });
        }
        else {
            console.log('The entered passwords do not match');
            addWarning(retypePasswordLabel, 'The entered passwords do not match');
        }
    }
    else {
        addWarning(passwordLabel, 'Either the entered email or password is incorrect');
    }
};

$('div.container-login100-form-btn.m-t-17').on('click', callback);