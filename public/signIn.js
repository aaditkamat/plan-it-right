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

// handle sign in event when Google sign in button is clicked
handleSignIn('Google', googleProvider, {'login_hint': 'user@gmail.com'}, 'a.btn-google.m-b-20');
// handle sign in event when Facebook sign in button is clicked
handleSignIn('Facebook', facebookProvider, {'display': 'popup'}, 'a.btn-face.m-b-20');
