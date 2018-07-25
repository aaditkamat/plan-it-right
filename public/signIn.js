var startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '11077402213-a6h8u1m348tfocov4mqtpfqsspeihks4.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('g-signin'));
    });
};

function attachSignin(element) {
    console.log(auth2.isSignedIn.get());
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            console.log(googleUser.getBasicProfile().getEmail());
            setInterval(function () {
                window.open('./form.html', '_self');
            }, 6000);
        },
        function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}

startApp();