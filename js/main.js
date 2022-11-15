const data = "http://localhost:5001/useres";

// renderUser
const RenderUser = (user) => {
  let userFragment = document.createDocumentFragment();

  user.length > 0
    ? user.forEach((e) => {
        let newUser = createElement(
          "tr",
          "table-success",
          `
        <td>${e.id}</td>
      	<td>${e.title}</td>
      	<td>${e.user_name}</td>
      	<td>
      	<button class="btn btn-primary" id="edid-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-edit=${e.id}>Edit</button>
      	</td>
      	<td>
      	<button class="btn btn-danger del-btn" data-delet="${e.id}">Delet</button>
      	</td>
        <td>Reting:${e.score}</td>
      `
        );
        userFragment.appendChild(newUser);
      })
    : ($("tbody").innerHTML = `
     <h3 class="text-danger text-center w-100">Qo'shilgan foydalanuvchilar yuq</h3>
     `);

  $("tbody").appendChild(userFragment);
};

const getUser = async () => {
  try {
    const respons = await fetch(data);
    const result = await respons.json();

    RenderUser(result);
  } catch (err) {
    console.log(err, "salom");
  }
};

getUser();

$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  addUser();
});

// renderUser end

// addUser
const addUser = () => {
  const userValue = $("#form1").value.trim();
  const userNameValue = $("#username").value.trim();
  const retingValue = $("#form2").value.trim();

  const person = {
    title: userValue,
    user_name: userNameValue,
    score: retingValue
  };

  if (userValue.length === 0 || userNameValue.length===0 || retingValue.length === 0) {
    $(".tostify").style.backgroundColor="red";
    $(".tostify").style.transform="translateX(0)";
    $(".tostify").innerHTML=`<strong>malumot to'ldiring</strong>`

    setTimeout(()=>{
      $(".tostify").style.transform="translateX(200%)"
    },2000)
  } else {
    $(".tostify").style.backgroundColor="chartreuse";
    $(".tostify").style.transform="translateX(0)";
    $(".tostify").innerHTML=`<strong>malumot qo'shildi</strong>`
   
    setTimeout(()=>{
       fetch(data, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })
      .then(respons => respons.json())
      .then(result => getUser(result))
    },2000)
  }
};

// addUser end

// deletUse

$("tbody").addEventListener("click", (e) => {
  if (e.target.classList.contains("del-btn")) {
    let deletId = e.target.getAttribute("data-delet");
    delUser(deletId);
  }
});

const delUser = (userId) => {
  fetch(`http://localhost:5001/useres/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
};

// delet user end 

$("tbody").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-primary")) {
    let id = e.target.getAttribute("data-edit");
    localStorage.setItem("editUser", id);

    fetch(`http://localhost:5001/useres/${id}`)
      .then((res) => res.json())
      .then((result) => setValue(result))
      .catch((err) => console.log(err));
  }
});

function  ubdateUser() {

  let editId = localStorage.getItem("editUser");

  let changeName = $("#typeText").value.trim();
  let changUserName = $("#userName").value.trim();
  let changReting = $("#typeNumber").value.trim();

  const changeUser = {
    title: changeName,
    user_name:changUserName,
    score: changReting
  };

  console.log(changeUser);

  fetch(`http://localhost:5001/useres/${editId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changeUser),
  });
  
};

$("#formChange").addEventListener("submit", (e) => {
  e.preventDefault();
    ubdateUser();
});

function setValue(userData) {
  console.log(userData);
  $("#typeText").value = userData.title;
  $("#userName").value = userData.user_name
  $("#typeNumber").value = userData.score;
  console.log($("#typeText").value,  $("#userName").value,  $("#typeNumber").value);
}


$("#logOut").addEventListener("click", ()=>{
  window.location.replace("../auriz.html")
})