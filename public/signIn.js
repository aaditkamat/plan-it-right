var googleProvider = new firebase.auth.GoogleAuthProvider(),
    facebookProvider = new firebase.auth.FacebookAuthProvider();

/**
 * Handles the Google/Facebook sign-in workflow.
 * @param event provides information about the type of provider used for authentication
 */
var signInProcess = (event) => firebase.auth().signInWithPopup(event.data.provider).then(function (result) {
    setTimeout(() => {
        window.open('form.html', '_self');
    }, 2000);
    console.log(result);
    var user = result.user;
    console.log(user.displayName + " logged into Plan It Right via " + event.data.accountType);
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorCode);
    console.log(errorMessage);
    console.log(email);
    console.log(credential);
});

/**
 * Handle the event of signing in to Facebook/Google accounts when the respective UI elements are clicked.
 * @param accountType either Google or Facebook
 * @param provider the Google/Facebook auth provider
 * @param customParams the custom parameters set for the provider
 * @param selector the CSS selector for the button clicked
 */
var handleSignIn = (accountType, provider, customParams, selector) => {
    provider.setCustomParameters(customParams);
    $(selector).on('click', {
        accountType: accountType,
        provider: provider
    }, signInProcess);
};

var handleRegularSignIn = (selector) => {
    let callback = () => {
        console.log('Sign In button clicked');
        let inputs = document.querySelectorAll('input.input100'),
            labels = document.querySelectorAll('div.p-t-13.p-b-9');
        let email = inputs[0].value, password = inputs[1].value;
        let passwordLabel = labels[0];
        removeRedundantWarning(passwordLabel);
        firebase.auth().signInWithEmailAndPassword(email, password).then((value) => {
            window.open('form.html', '_self');
        }).catch(function (error) {
            addWarning(passwordLabel, error.message);
        });
    };
    $(selector).on('click', callback);
    let removeRedundantWarning = (label) => {
        if (label.childNodes[4] !== undefined)
            label.removeChild(label.childNodes[4]);
    };

    let addWarning = (label, message) => {
        label.innerHTML += `<span class="warning">${message}</span>`;
    };
};

// handle sign in event when Google sign in button is clicked
handleSignIn('Google', googleProvider, {'login_hint': 'user@gmail.com'}, 'a.btn-google.m-b-20');
// handle sign in event when Facebook sign in button is clicked
handleSignIn('Facebook', facebookProvider, {'display': 'popup'}, 'a.btn-face.m-b-20');
handleRegularSignIn('div.container-login100-form-btn.m-t-17');