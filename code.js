var json_Data = [];
var loginEmailJSON;
var user = {};
fetchInfo();
localStorage.clear();

function signUp() {

    /*
    
    Runs when Sign Up button is clicked. Needs to hide the login screen and loads up the sign up form.

    COMPLETED
    
    */

    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "none";

    var signupForm = document.getElementById("signUpForm");
    signupForm.style.display = "block";

    var signUpButton = document.getElementById("signUpButton");
    signUpButton.style.display = "none";
}


function logIn() {

    /* 
    
    Runs when the login button is clicked. Needs to compare the data submitted in the form with data in the JSON
    file to determine whether the user has an account or needs to create one. If the data matches, the login
    form needs to be hidden and the data from the user's account needs to be shown, along with the form to
    submit new website information. The user's account details they have previously submitted also needs to be
    displayed in the table.

    COMPLETE
    
    */


    loginEmailJSON = document.getElementById("login").value;
    var loginPasswordJSON = document.getElementById("passwordLI").value;
    var errorDisplay = true
    
    for(var i = 0; i < json_Data.users.length; i++) {
        if(loginEmailJSON == "" || loginPasswordJSON == "") {

            var loginError = document.getElementById("loginError");
            loginError.style.display = "block";

            break;

        }
        
        else {

            if(loginEmailJSON == json_Data.users[i].emailAddress) {

                if(loginPasswordJSON == json_Data.users[i].password) {
                    
                    event.preventDefault();
                    var loginForm = document.getElementById("loginForm");
                    loginForm.style.display = "none";
                
                    var mainPage = document.getElementById("mainPage");
                    mainPage.style.display = "block";
                    
                    var signUpButton = document.getElementById("signUpButton");
                    signUpButton.style.display = "none";

                    var websiteTable = document.getElementById("websiteTable");
                    websiteTable.style.display = "block";

                    errorDisplay = false

                    break;
                } 

                else {

                    event.preventDefault();
                    break;

                }

            } 

            else {

                event.preventDefault();
                break;

            }

        }
    }

    if(errorDisplay == true) {

        var loginError = document.getElementById("loginError");
        loginError.style.display = "block";

    }

    else {
        user = json_Data.users.find(user => user.emailAddress === loginEmailJSON)
        displayData();
    }

}


function signUpInfo() {

    /* 
    
    Runs when the submit button for the sign up form is pressed. Needs to write the inputted data to a JSON file.
    Needs to hide the sign up form and make the login form visible.
    
    COMPLETE

    */

    var signUpEmailJSON = document.getElementById("emailAddress").value;
    var signUpPasswordJSON = document.getElementById("passwordSignUp").value;

    let newUser = {
    emailAddress: signUpEmailJSON,
    password: signUpPasswordJSON,
    websiteInfo: {
        websiteName:[],
        websiteUsername: [],
        websitePassword: [],
    }
    } 
    
    json_Data.users.push(newUser);
    localStorage.setItem("users", JSON.stringify(json_Data));


    var signupForm = document.getElementById("signUpForm");
    signupForm.style.display = "none";

    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "block";
}


function submitWebsiteInfo() {

    /* 
    
    Runs when the submit button is clicked in the website info form. Needs to read the data in the input boxes
    and write it into the table for the user to see in the correct areas. Additionally, needs to write the
    inputted data to the local storage to allow it to be read from every time the user accesses the account.
    
    COMPLETE - NEEDS DEBUGGING

    */

    event.preventDefault();

    var websiteNameJSON = document.getElementById("websiteName").value;
    var websiteUsernameJSON = document.getElementById("websiteUsername").value;
    var websitePasswordJSON = document.getElementById("websitePassword").value;
    
    user = json_Data.users.find(user => user.emailAddress === loginEmailJSON)

    user.websiteInfo.websiteName.push(websiteNameJSON);
    user.websiteInfo.websiteUsername.push(websiteUsernameJSON);
    user.websiteInfo.websitePassword.push(websitePasswordJSON);

    localStorage.setItem("users", JSON.stringify(json_Data));

    displayData();

}


async function displayData() {

    const Name = document.getElementById("Name");
    const Username = document.getElementById("Username");
    const Password = document.getElementById("Password");

    Name.innerHTML = "";
    Username.innerHTML = "";
    Password.innerHTML = "";

    for (var i = 0; i < user.websiteInfo.websiteName.length; i++) {

        const websiteName = document.createElement("td");
        websiteName.textContent = user.websiteInfo.websiteName[i];
        Name.appendChild(websiteName);

    }

    for (var i = 0; i < user.websiteInfo.websiteUsername.length; i++) {

        const websiteName = document.createElement("td");
        websiteName.textContent = user.websiteInfo.websiteUsername[i];
        Username.appendChild(websiteName);

    }

    for (var i = 0; i < user.websiteInfo.websitePassword.length; i++) {

        const websiteName = document.createElement("td");
        websiteName.textContent = user.websiteInfo.websitePassword[i];
        Password.appendChild(websiteName);

    }

}



/*

//Exports data stored in json_data.users for the user to download
var json_object = JSON.stringify(json_data.users); //Store usernames and passwords which enter into table
const blob = new Blob([json_object], {type: 'application/json'});
var anchor = document.createElement("a");
anchor.download = "data.json";
anchor.href = window.URL.createObjectURL(blob);
anchor.innerHTML = "download";
anchor.click();
console,log(anchor); 


*/



async function fetchInfo() {

    let storedData = localStorage.getItem("users");
    if(storedData != null) {

        json_Data = JSON.parse(storedData);

    }

    else 
    {
        fetch('./database.json')
            .then(response => response.json())
            .then(data => {
                json_Data = data;
            })
            .catch(error => console.error('JSON file not found', error));
    }
}
