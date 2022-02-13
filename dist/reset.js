var callback = () => {
    let removeRedundantWarning = (type) => {
        let warning = document.getElementById(`${type}-warning`);
        if (warning.style.display === 'block')
            warning.style.display = 'none';
    };
    let addWarning = (type, message) => {
        let warning = document.getElementById(`${type}-warning`);
        console.log(warning);
        warning.innerText = message;
        warning.style.display = 'block';
    };
    console.log('Reset button clicked');
    var auth = firebase.auth();
    var emailAddress = document.querySelector('div.wrap-input100.validate-input > label > input').value;
    removeRedundantWarning('email');
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        alert(`Email sent to ${emailAddress}`);
        window.open('index.html', '_self');
    }).catch(function (error) {
        switch (error.message) {
            case 'The email address is badly formatted.':
                addWarning('email', error.message);
                break;
            case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                addWarning('email', 'Email address not in the database');
                break;
            default:
                console.log(error.message);
        }
    });
};
$('div.container-login100-form-btn.m-t-17').on('click', callback);