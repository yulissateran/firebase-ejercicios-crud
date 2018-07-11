
const button = document.getElementById('btn-enviar');
const btnLogin = document.getElementById('btn-enviar-login');
const registerFb = document.getElementById('register-facebook');
const registerGgl = document.getElementById('register-google');
let provider ='';
// const btnSalir = document.getElementById('btn-cerrar-sesion');
// console.log(btnSalir);
button.addEventListener('click',()=>{
register();   
 
});
btnLogin.addEventListener('click',(e)=>{
    e.preventDefault();  
ingreso();
});
// btnSalir.addEventListener('click', cerrar());
registerFb.addEventListener('click', (e)=>{
    e.preventDefault();
    
   provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result)=>{
        console.log('Exito');
        console.log(result);
    }).catch((error)=>{
        console.log('error');
        console.log(error);
    })
});

registerGgl.addEventListener('click', ()=>{

    provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log('Exito');
        console.log(result);
    }).catch((error) => {
        console.log('error');
        console.log(error);
    })
});