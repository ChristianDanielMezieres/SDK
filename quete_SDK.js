

// Initialize Firebase
let config = {
    apiKey: "AIzaSyCXbvvyiNxYcgc0rNEnfvz_AD9sx-z2Ec8",
    authDomain: "deadwalking-724ea.firebaseapp.com",
    databaseURL: "https://deadwalking-724ea.firebaseio.com",
    projectId: "deadwalking-724ea",
    storageBucket: "deadwalking-724ea.appspot.com",
    messagingSenderId: "102240670158"
};

firebase.initializeApp(config);

let database = firebase.database();
let characters = database.ref('names');
console.log(characters);


characters.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childData);
        document.getElementById('listcharacters').innerHTML += '<li>' + childData.name + '</li>';
        if (myId == childData.uid || childData.uid == null) {
            document.getElementById('listcharacters').innerHTML += '<li>' + childData.name + '</li>';
    };
    });
});

function writeUserData(Name) {
    database.ref('names/' + name).push({
        name: Name,
    });
}

function addOnFirebase() {
    let name = document.getElementById("namekiller").value;
    writeUserData(name);
    window.location.reload();
}

const uiConfig = {
    signInSuccessUrl: 'index.html',
    signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,

    ],
    // Terms of service url.
    tosUrl: 'http://localhost:8080/cgu' // conditions générales d'utilisation
};

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            // All datas
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const emailVerified = user.emailVerified;
            const photoURL = user.photoURL;
            const uid = user.uid;
            const phoneNumber = user.phoneNumber;
            const providerData = user.providerData;


            // retour de l'utilisateur après authentification
            user.getIdToken().then((accessToken) => {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });

        } else {

            // Gestion de la deconnexion
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, (error) => { // gestion de erreur de connexion
        console.error(error);
    });
}
initApp();








