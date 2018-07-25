/* eslint-disable no-unused-vars */
var initClient = () => {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '11077402213-a6h8u1m348tfocov4mqtpfqsspeihks4.apps.googleusercontent.com',
        });
        handleSignOut();
        checkIllegalAccess();
    });
};

var checkIllegalAccess = () => {
    if (document.referrer === '') {
        alert('Cannot access this page without going through login page');
        window.open('index.html', '_self');
    }
};

var handleSignOut = () => {
    $('div.nav-link').on("click", () => {
        auth2.disconnect();
        window.open('index.html', '_self');
    });
};