// const nameUser=document.getElementById("text").innerHTML.toLowerCase();
// console.log(nameUser);
// const arr=[];
// const addPerson=()=>{

// }
// function toAdd= ((add())=> {
//     const nameUser=document.getElementById("text").innerHTML.toLowerCase();
//     console.log(nameUser);
// })
// add();
let a=1;
// let arr = [];
// let editId = null;
// function add() {
//   const inputField = document.querySelector("#text").value;
//   const inputNum = document.querySelector("#number").value;
//   if (editId) {
//     const index = arr.findIndex((items) => items.id === editId);
//     if (editId !== -1) {
//       arr[index] = { inputField, inputNum, id: editId };
//       editId = null;
//     }
//   } else {
//     arr.push({ inputField, inputNum, id: Date.now() });
//   }
//   showInputs(arr);
//   document.querySelector("#text").value = "";
//   document.querySelector("#number").value = "";
//   console.log(arr);
//   editHandler(arr);
// }
// function showInputs(value) {
//   userList.innerHTML = value
//     .map(
//       (Element) =>
//         `
//         <li>Name : ${Element.inputField}</li>
//         <li>  Age : ${Element.inputNum}</li>
//         <button onclick="editHandler(${Element.id})">Edit</button>
//         <button onclick="deleteData()">Delete</button>
//         `
//     )
//     .join("");
// }

// function editHandler(userId) {
//   let user = arr.find((user) => user.id === parseInt(userId));
//   if (user) {
//     document.querySelector("#text").value = user.inputField;
//     document.querySelector("#number").value = user.inputNum;
//     editId = userId;
//   }
// }

// function deleteData(val) {
//   arr.splice(val, 1);
//   console.log("delete");
//   showInputs(arr);
// }

let arr = [];
let editId = null;

// Fetch initial data
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    arr = data.map(user => ({
      inputField: user.name,
      inputNum: user.id, // Using ID as "age" since JSONPlaceholder doesn't have age
      id: user.id
    }));
    showInputs(arr);
  })
  .catch(error => console.error('Error fetching data:', error));

function add() {
  const inputField = document.querySelector("#text").value;
  const inputNum = document.querySelector("#number").value;
  
  if (!inputField || !inputNum) {
    alert('Please fill both fields');
    return;
  }

  const userData = {
    name: inputField,
    // Using ID as "age" since JSONPlaceholder doesn't have age
    id: parseInt(inputNum) 
  };

  if (editId) {
    // Update existing user
    fetch(`https://jsonplaceholder.typicode.com/users/${editId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(updatedUser => {
        const index = arr.findIndex(item => item.id === editId);
        if (index !== -1) {
          arr[index] = {
            inputField: updatedUser.name,
            inputNum: updatedUser.id,
            id: updatedUser.id
          };
        }
        editId = null;
        showInputs(arr);
      })
      .catch(error => console.error('Error updating user:', error));
  } else {
    // Create new user
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(newUser => {
        arr.push({
          inputField: newUser.name,
          inputNum: newUser.id,
          id: newUser.id || Date.now() // Use API ID or fallback to timestamp
        });
        showInputs(arr);
      })
      .catch(error => console.error('Error creating user:', error));
  }

  // Clear inputs
  document.querySelector("#text").value = "";
  document.querySelector("#number").value = "";
}

function showInputs(value) {
  const userList = document.getElementById("userList");
  userList.innerHTML = value
    .map(
      (Element) => `
        <li>Name: ${Element.inputField}</li>
        <li>Age: ${Element.inputNum}</li>
        <button onclick="editHandler(${Element.id})">Edit</button>
        <button onclick="deleteData(${Element.id})">Delete</button>
      `
    )
    .join("");
}

function editHandler(userId) {
  let user = arr.find(user => user.id === userId);
  if (user) {
    document.querySelector("#text").value = user.inputField;
    document.querySelector("#number").value = user.inputNum;
    editId = userId;
  }
}

function deleteData(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: "DELETE"
  })
    .then(() => {
      arr = arr.filter(item => item.id !== userId);
      showInputs(arr);
    })
    .catch(error => console.error('Error deleting user:', error));
}


// //home Task
// const object={carName:'BMW m3',company:'BMW'};
// fetch('https://jsonplaceholder.typicode.com/users',{
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(object),
// })
// .then((response)=>response.json())
// .then(data =>
//     console.log(data)
// );



// // fetch('https://jsonplaceholder.typicode.com/users')
// // .then((response)=>response.json())
// // .then(data=>
// //     console.log('Data : ',data)
// // );

// // fetch('https://jsonplaceholder.typicode.com/users/3')
// // .then(response => response.json())
// // .then(data => console.log('Id 3:', data));

// // const car={carName:'BMW i8',company:'BMW'};
// // fetch('https://jsonplaceholder.typicode.com/users/3',{
// //     method: 'PATCH',
// //     headers: {'Content-Type': 'application/json'},
// //     body: JSON.stringify(car),
// // })
// // .then((response)=>response.json())
// // .then(data =>
// //     console.log(data)
// // );

// fetch('https://jsonplaceholder.typicode.com/users/4',{
//     method: 'DELETE',
// })
// .then(response => response.json())
// .then(data => console.log('DELETED', data));
