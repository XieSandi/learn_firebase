var firebaseConfig = {
    apiKey: "AIzaSyAxGjF-RVsjZc77P4u_HaW-XlDlKa5gTP4",
    authDomain: "test-login-dacfb.firebaseapp.com",
    databaseURL: "https://test-login-dacfb.firebaseio.com",
    projectId: "test-login-dacfb",
    storageBucket: "test-login-dacfb.appspot.com",
    messagingSenderId: "956610046968",
    appId: "1:956610046968:web:0ec187b189cfe7ea8d040d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();
const usersRef = dbRef.child('users');

const userListUI = document.getElementById("userList");

usersRef.on("child_added", snap => {
    let user = snap.val();
    let $li = document.createElement("li");
    $li.innerHTML = user.name;
    $li.setAttribute("child-key", snap.key);
    $li.addEventListener("click", userClicked) userListUI.append($li);
});

function userClicked(e) {
    var userID = e.target.getAttribute("child-key");
    const userRef = dbRef.child('users/' + userID);
    const userDetailUI = document.getElementById("userDetail");
    userDetailUI.innerHTML = ""
    userRef.on("child_added", snap => {
        var $p = document.createElement("p");
        $p.innerHTML = snap.key + " - " + snap.val() userDetailUI.append($p);
    });
}