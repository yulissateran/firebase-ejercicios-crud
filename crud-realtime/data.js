const login = document.getElementById('login');
const registersection = document.getElementById('register-section');
let post = document.getElementById('post');
let list = document.getElementById('list');
let profile = document.getElementById('profile');
// Initialize firebase
const config = {
    apiKey: "AIzaSyB2TBht5RZKbIA59SlebTnMG9qeZ9xfRe0",
    authDomain: "social-network-70d1e.firebaseapp.com",
    databaseURL: "https://social-network-70d1e.firebaseio.com",
    projectId: "social-network-70d1e",
    messagingSenderId: "21417065042",
    storageBucket: "social-network-70d1e.appspot.com"
}
firebase.initializeApp(config);
// Initialize Realtime Database through Firebase
const database = firebase.database();
const escribirconpush = () => {
    firebase.database().ref('users/').push().set({
        name: 'yuli',
        role: 'student',
        city: 'lima'
    });
}
// escribirconpush();
const dbRefObject = database.ref().child('users');
dbRefObject.on('value',snap =>{ 
   post.innerText = JSON.stringify(snap.val(),null,3)
});
const dbRefList = dbRefObject.child('-LHGBOa-mv4QSL1KlVWY');
dbRefList.on('child_added',(snap)=>{
    list.innerHTML +=`<li id='${snap.key}'>${snap.val()}</li>`
   console.log(snap.val());
})
dbRefList.on('child_changed',(snap) =>{
    const listChanged = document.getElementById(snap.key); 
    listChanged.innerText = snap.val();
});

dbRefList.on('child_removed',(snap) =>{
    const liRemove = document.getElementById(snap.key);
    liRemove.remove();
});

//Para ejecutar operaciones de escritura básicas, puedes usar set() 
// para guardar datos en una referencia que especifiques y 
// reemplazar los datos existentes en esa ruta de acceso.
// Por ejemplo, una aplicación social de blogs puede agregar un usuario con set() de la siguiente manera:

// const writeUserData = (userId, name, email, imageUrl) => {
//     firebase.database().ref('users/' + userId).set({
//         username: name,
//         email: email,
//         profile_picture: imageUrl
//     });
// }

/************************************************************++ */


const verificar = () => {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then((res) => {
        console.log(res);
        console.log('enviando correo');
        // Email sent.
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
};

const register = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            console.log(response);
            verificar();
        })
        .catch((error)=> {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

const ingreso = () => {
    const emailLogin = document.getElementById('email-login').value;
    const passwordLogin = document.getElementById('password-login').value;
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .then((response)=>{console.log(response);})
    .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
};
const observer = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {          
            
            console.log('usuario existente');
            console.log('********************');
            console.log(user.emailVerified);
            // User is signed in.
            var displayName = user.displayName;
            console.log(user.displayName);
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(user.providerData);
            return user
        } else {
           return  console.log('no existente usuario activo');
            // User is signed out.
            // ...
        }
    });
};
observer();

const cerrar = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('saliendo');
            contenido.innerHTML = '';
        })
        .catch((error) => {
            console.log(error);
        });
};

const aparece = (userCurrent)=> {
    if(userCurrent.emailVerified != false){
        const contenido = document.getElementById('contenido');
        contenido.innerHTML = `<p>Bienvenida!</p><br><button onclick = "cerrar()" id="btn-cerrar-sesion">Cerrar sesion</button>`;
    }
 
};
aparece(observer());
