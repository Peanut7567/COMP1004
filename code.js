function signUp() {

    document.getElementById("test").innerHTML = "Google";

}


function logIn() {

    document.getElementById("test").innerHTML = "A";

}


function passwordChecker() {


}


function passwordManager() {


}


// Exports data stored in json_data.users for the user to download
var json_object = JSON.stringify(json_data.users); //Store usernames and passwords which enter into table
const blob = new Blob([json_object], {type: 'application/json'});
var anchor = document.createElement("a");
anchor.download = "data.json";
anchor.href = window.URL.createObjectURL(blob);
anchor.innerHTML = "download";
anchor.click();
console,log(anchor);