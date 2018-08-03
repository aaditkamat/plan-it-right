/* eslint-disable no-unused-vars */
var startApp = () => {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '11077402213-a6h8u1m348tfocov4mqtpfqsspeihks4.apps.googleusercontent.com',
        });
        attachSignin(document.getElementById('g-signin'));
    });
};

var onSuccess = (user) => {
    console.log(`${user.getBasicProfile().getName()} signed in through Google Account`);
    setInterval(() => window.open('form.html', '_self'), 1000);
};

var onError = (errorJSON) => {
    console.log(errorJSON.error);
};

var attachSignin = (element) => {
    auth2.attachClickHandler(element, {}, onSuccess, onError);
};