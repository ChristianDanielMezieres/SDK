

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




