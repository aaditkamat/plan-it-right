var checkIllegalAccess = () => {
    /* if (firebase.auth().currentUser === null) {
        alert('Cannot access this page without signing in');
        window.open('index.html', '_self');
    } */
    if (document.referrer === '') {
        alert('Cannot access this page without going through login page');
        window.open('index.html', '_self');
    }
};

var createProfile = () => {
    let profile = document.querySelector('div.nav-link');
    let image = document.createElement('img');
    let options = document.querySelector('.dropdown-content');
    let savedTripsSection = document.createElement('div');
    savedTripsSection.innerText = 'Saved Trips';
    savedTripsSection.className = "dropdown-options";
    savedTripsSection.id = "saved-trips";
    let signOutSection = document.createElement('div');
    signOutSection.className = "dropdown-options";
    signOutSection.id = "sign-out";
    signOutSection.innerText = 'Sign Out';
    if (options !== null) {
        options.append(savedTripsSection);
        options.append(signOutSection);
    }
    let signOut = () => {
        firebase.auth().signOut().then(function () {
            console.log("Sign-out successful");

        }).catch(function (error) {
            console.log(error);
        });
    };
    let openOptions = () => {
        if (options.style.display === "block")
            options.style.display = "none";
        else
            options.style.display = "block";
    };
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            image.style = "border-radius: 50%; height:30px;";
            image.src = user.photoURL;
            let name = document.createElement('span');
            if (user.displayName !== null)
                name.innerText = user.displayName;
            else
                name.innerText = user.email;
            name.style = "float: right; margin-left: 10px;";
            if (image.src !== 'http://localhost:3000/null')
                profile.append(image);
            profile.append(name);
            profile.onclick = openOptions;
            $('#sign-out').on('click', signOut);
        } else {
            setTimeout(() => {
                window.open('index.html', '_self');
            }, 2000);
        }
    });
};

checkIllegalAccess();
createProfile();