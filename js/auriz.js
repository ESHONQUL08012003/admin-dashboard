const URL = "https://n36-todolist.herokuapp.com";

const registor = () => {
  let user = $("#registerUsername").value.trim();
  let password = $("#registerPassword").value.trim();

  const regster = {
    userName: user,
    userPassword: password,
  };

  fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(regster),
  })
    .then((respons) => respons.json())
    .then((result) => {
      if (result.messag) {
        console.log(result);
        $(".modal-alert").classList.add("alert-hover");
        $(".modal-alert").innerHTML = "bad request";

        setTimeout(() => {
          $(".alert-hover").classList.remove("alert-hover");
        }, 2000);
      }
      if (result.token) {
        console.log(result);
        $(".modal-alert").classList.remove("alert-danger");
        $(".modal-alert").classList.add("alert-success");
        $(".modal-alert").classList.remove("alert-hover");
        $(".modal-alert").innerHTML = "regster";

        setTimeout(() => {
          $(".modal-alert").classList.add("alert-hover");
        }, 2000);
      }
    });
};

$(".regsterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  registor();
});

const login = () => {
  let user = $("#loginName").value.trim();
  let password = $("#loginPassword").value.trim();

  const login = {
    login: user,
    password: password,
  };

  fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  })
    .then((respons) => respons.json())
    .then((result) => {
      if (result.messag) {
        console.log(result);
        $(".modal-alert").classList.add("alert-hover");
        $(".modal-alert").innerHTML = "not regster";

        setTimeout(() => {
          $(".alert-hover").classList.remove("alert-hover");
        }, 2000);
      }
      if (result.token) {
        $(".modal-alert").classList.remove("alert-danger");
        $(".modal-alert").classList.add("alert-success");
        $(".modal-alert").classList.remove("alert-hover");
        $(".modal-alert").innerHTML = "login";
        console.log(result);
        setTimeout(() => {
          $(".modal-alert").classList.add("alert-hover");
           window.location.replace("../index.html");
        }, 2000);
      }
    });
};

$(".signubForm").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});
