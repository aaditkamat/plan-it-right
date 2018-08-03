var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('user_birthday');
provider.setCustomParameters({
    'display': 'popup'
});

/* var callback = (response) => {
    if (response.status === 'connected') {
        setTimeout(() => {
            window.open('form.html');
        }, 2000);
        console.log('Logged into Facebook and the web app');
    }
}; */

$('a.btn-face.m-b-20').on('click', () => firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(token);
    console.log(user);
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
}));
