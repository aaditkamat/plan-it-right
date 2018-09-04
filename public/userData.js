firebase.auth().onAuthStateChanged((user) => {
    let database = firebase.database(), userId = user.uid, json = JSON.parse(sessionStorage.formOptions);
    database.ref('users').once('value').then((snapshot) => {
        let data = snapshot.val();
        if (data == null || !(user.uid in data)) {
            database.ref('users/' + userId).set([json]);
        }
        else {
            database.ref('users/' + userId).push(json);
        }
    });
});

