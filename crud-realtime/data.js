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
const sdf = () => {
    firebase.database().ref('users/').push({
        name: 'yuli',
        role: 'student',
        city: 'lima'
    });
}
sdf();

//Para ejecutar operaciones de escritura básicas, puedes usar set() para guardar datos en una referencia que especifiques y reemplazar los datos existentes en esa ruta de acceso.Por ejemplo, una aplicación social de blogs puede agregar un usuario con set() de la siguiente manera:

// const writeUserData = (userId, name, email, imageUrl) => {
//     firebase.database().ref('users/' + userId).set({
//         username: name,
//         email: email,
//         profile_picture: imageUrl
//     });
// }

const verificar = () => {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
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
        .then(()=>{
            verificar();
        })
        .catch(function (error) {
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
    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });

};
const observer =()=>{
    firebase.auth().onAuthStateChanged( (user)=> {
        if (user) {
            aparece();
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
        } else {
            console.log('no existente usuario activo');
            // User is signed out.
            // ...
        }
    });
};
observer();
const cerrar = () => {
firebase.auth().signOut()
.then(()=>{
    console.log('saliendo');
    contenido.innerHTML ='';
})
.catch((error)=>{
    console.log(error);
});
};

const aparece= ()=>{
  
   
        const contenido = document.getElementById('contenido');
        contenido.innerHTML = `<p>Bienvenida!</p><br><button onclick = "cerrar()" id="btn-cerrar-sesion">Cerrar sesion</button>`;

    
   
};
 
