

firebase.initializeApp({
    apiKey: "AIzaSyB3mcXZVY4sVajXYjxwXZ2E3W78UaAE8EA",
    authDomain: "comenzando-con-crud.firebaseapp.com",
    projectId: "comenzando-con-crud"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
//Agregar documentos


const guardar =() => {
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('last-name').value;
    const date = document.getElementById('date').value;
    db.collection("users").add({
        first: name,
        last: lastName,
        born: date
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
           document.getElementById('name').value = '';
            document.getElementById('last-name').value = '';
            document.getElementById('date').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
};
//leer documentos
let table =document.getElementById('table');
db.collection("users").onSnapshot((querySnapshot) => {
    table.innerHTML='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        table.innerHTML +=`
        <tr>
          <th scope ="row"> ${doc.id}</th>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().born}</td>
          <td><button onclick="eliminar('${doc.id}')">Eliminar</button></td>
          <td><button onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}')">Editar</button></td>

        </tr>` ;
    });
});
const eliminar=(id)=>{
    //borrar
    db.collection("users").doc(id).delete().then(()=> {
        console.log("Document successfully deleted!");
    }).catch((error) =>{
        console.error("Error removing document: ", error);
    });
};


//Editar
const editar = (id, name, lastName, date)=>{

    document.getElementById('name').value = name;
    document.getElementById('last-name').value = lastName;
    document.getElementById('date').value = date;
  let btnEdit = document.getElementById('guardar');
  btnEdit.innerHTML = 'Editar';
  btnEdit.onclick = ()=>{
    let washingtonRef = db.collection("users").doc(id);
      // Set the "capital" field of the city 'DC'
    //   let name = document.getElementById('name').value;
    //   let lastName = document.getElementById('last-name').value;
    //   let date = document.getElementById('date').value;

      return washingtonRef.update({
          first: document.getElementById('name').value,
          last: document.getElementById('last-name').value,
          born: document.getElementById('date').value
      }).then(() => {
          btnEdit.innerHTML = 'Guardar';
          document.getElementById('name').value = '';
          document.getElementById('last-name').value = '';
          document.getElementById('date').value = '';

              console.log("Document successfully updated!");
          })
          .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
  };

};


