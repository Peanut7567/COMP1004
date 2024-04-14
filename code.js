/*

Declares some variables and calls the fetchInfo function to begin the code.

*/

var jsonData = [];
var loginEmailJSON;
var user = {};
fetchInfo();

function signUp() {

    /*
    
    Runs when Sign Up button is clicked. Hides the login button and shows the sign up form. Hides the login error
    if it is showing after an unsuccessful login attempt.

    COMPLETE
    
    */

    var loginError = document.getElementById("loginError");
    loginError.style.display = "none";

    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "none";

    var signupForm = document.getElementById("signUpForm");
    signupForm.style.display = "block";

    var signUpButton = document.getElementById("signUpButton");
    signUpButton.style.display = "none";

    var initialLogin = document.getElementById("initialLogin");
    initialLogin.style.display = "none";

    var passwordReqirements = document.getElementById("passwordRequirements");
    passwordReqirements.style.display = "block"

}


function logIn() {

    /* 
    
    Runs when the second login button is clicked. Compares the data in the form with the data in the JSON file. 
    If it is left blank, or if the data does not match, an error is displayed and the user is prompted to create 
    an account by displaying the sign up button. If the data matches, the login form is hidden and the change
    details, delete entry and submit new entry buttons are shown. The displayData function is run. Hides
    the error message if it is displayed after an unsuccessful first login attempt.

    COMPLETE
    
    */


    loginEmailJSON = document.getElementById("login").value;
    var loginPasswordJSON = document.getElementById("passwordLI").value;
    var errorDisplay = true
    
    for(var i = 0; i < jsonData.users.length; i++) {
        if(loginEmailJSON == "" || loginPasswordJSON == "") {

            var loginError = document.getElementById("loginError");
            loginError.style.display = "block";

            var signUpButton = document.getElementById("signUpButton");
            signUpButton.style.display = "block";

            break;

        }
        
        else {

            if(loginEmailJSON == jsonData.users[i].username) {

                if(loginPasswordJSON == jsonData.users[i].password) {
                    
                    event.preventDefault();

                    var loginForm = document.getElementById("loginForm");
                    loginForm.style.display = "none";
                    
                    var signUpButtonHidden = document.getElementById("signUpButton");
                    signUpButtonHidden.style.display = "none";

                    var websiteTable = document.getElementById("websiteTable");
                    websiteTable.style.display = "block";

                    var exportData = document.getElementById("exportData");
                    exportData.style.display = "block";

                    var changeDetailsButton = document.getElementById("changeDetails");
                    changeDetailsButton.style.display = "block";

                    var deleteAccountButton = document.getElementById("deleteEntry");
                    deleteAccountButton.style.display = "block";

                    var submitEntry = document.getElementById("submitEntry");
                    submitEntry.style.display = "block";

                    var hideLoginError = document.getElementById("loginError")
                    hideLoginError.style.display = "none"

                    var passwordReqirements = document.getElementById("passwordRequirements");
                    passwordReqirements.style.display = "none"

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

            }

        }
    }

    if(errorDisplay == true) {

        var loginError = document.getElementById("loginError");
        loginError.style.display = "block";

        var loginEmailClear = document.getElementById("login");
        var loginPasswordClear = document.getElementById("passwordLI");

        var signUpButton = document.getElementById("signUpButton");
        signUpButton.style.display = "block";

        loginEmailClear.value = "";
        loginPasswordClear.value = "";

    }

    else {
        user = jsonData.users.find(user => user.username === loginEmailJSON)
        displayData();
    }

}


function signUpInfo() {

    /* 
    
    Runs when the submit button for the sign up form is pressed. Checks the inputted data against each entry in
    the JSON file. If the input box is left empty, an error message is shown. If the data matches, another error
    message is shown to prevent multiple accounts with the same email address being created, as well as setting
    the input boxes to empty. If the data does not match, the data in both input boxes is written to the local 
    storage as a new user. If an error message is displaying, it is removed once the error is resolved. 

    COMPLETE

    */
    
    var signUpEmailJSON = document.getElementById("username").value;
    var signUpPasswordJSON = document.getElementById("passwordSignUp").value;
    var error = false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/;


    for(var i = 0; i < jsonData.users.length; i++) {
        if(signUpEmailJSON == "" || signUpPasswordJSON == "") {

            event.preventDefault();

            var signUpBlankError = document.getElementById("signUpBlankError");
            signUpBlankError.style.display = "block";

            var signUpErrorHidden = document.getElementById("signUpError");
            signUpErrorHidden.style.display = "none";

            error = true;
            break;

        }

        else if(signUpEmailJSON == jsonData.users[i].username) {

            event.preventDefault();

            var signUpError = document.getElementById("signUpError");
            signUpError.style.display = "block";

            var signUpBlankErrorHidden = document.getElementById("signUpBlankError");
            signUpBlankErrorHidden.style.display = "none";

            error = true;
            break;

        }
    }


    if(error == false) {
        
        var testedPassword = passwordRegex.test(signUpPasswordJSON);
        if(testedPassword == true){
        
            let newUser = {
            username: signUpEmailJSON,
            password: signUpPasswordJSON,
            websiteInfo: {
                websiteName:[],
                websiteUsername: [],
                websitePassword: [],
                }
            } 
                    
            jsonData.users.push(newUser);
            localStorage.setItem("users", JSON.stringify(jsonData));


            var signupForm = document.getElementById("signUpForm");
            signupForm.style.display = "none";

            var loginForm = document.getElementById("loginForm");
            loginForm.style.display = "block";

            var signUpBlankErrorHidden = document.getElementById("signUpBlankError");
            signUpBlankErrorHidden.style.display = "none";

            var signUpErrorHidden = document.getElementById("signUpError");
            signUpErrorHidden.style.display = "none";

            var signUpEmail = document.getElementById("username");
            var signUpPassword = document.getElementById("passwordSignUp");

            var passwordErrorHidden = document.getElementById("passwordError");
            passwordErrorHidden.style.display = "none"

            var passwordRequirementsHidden = document.getElementById("passwordRequirements");
            passwordRequirementsHidden.style.display = "none";
            
            signUpEmail.value = "";
            signUpPassword.value = "";
        }

        else {

            event.preventDefault();

            var passwordError = document.getElementById("passwordError");
            passwordError.style.display = "block"

        }
    } 

    else {

        event.preventDefault();

        var signUpEmail = document.getElementById("username");
        var signUpPassword = document.getElementById("passwordSignUp");
        
        signUpEmail.value = "";
        signUpPassword.value = "";

        
    }
}


function submitWebsiteInfo() {

    /* 
    
    Runs when the submit button is clicked in the website info form. Stores the data within the input boxes into
    local storage within that specific user's account then clears the input boxes. Runs the displayData function.

    COMPLETE

    */

    event.preventDefault();

    var websiteNameJSON = document.getElementById("websiteName").value;
    var websiteUsernameJSON = document.getElementById("websiteUsername").value;
    var websitePasswordJSON = document.getElementById("websitePassword").value;
    
    user = jsonData.users.find(user => user.username === loginEmailJSON)
    
    user.websiteInfo.websiteName.push(websiteNameJSON);
    user.websiteInfo.websiteUsername.push(websiteUsernameJSON);
    user.websiteInfo.websitePassword.push(websitePasswordJSON);

    localStorage.setItem("users", JSON.stringify(jsonData));


    var websiteNameClear = document.getElementById("websiteName");
    var websiteUsernameClear = document.getElementById("websiteUsername");
    var websitePasswordClear = document.getElementById("websitePassword");

    websiteNameClear.value = "";
    websiteUsernameClear.value = "";
    websitePasswordClear.value = "";

    displayData();

}


async function displayData() {

    /* 
    
    Runs whenever it is called by another function. Clears the data currently on the screen then creates a new
    table element. Stores the values of each element in the websiteInfo JSON object and creates a new line for
    each array element. The data is outputted to the screen in a table format.
    
    COMPLETE
    
    */


    const Name = document.getElementById("Name");
    const Username = document.getElementById("Username");
    const Password = document.getElementById("Password");

    Name.innerHTML = "";
    Username.innerHTML = "";
    Password.innerHTML = "";

    for (var i = 0; i < user.websiteInfo.websiteName.length; i++) {

        const websiteName = document.createElement("tr");
        websiteName.textContent = user.websiteInfo.websiteName[i];
        Name.appendChild(websiteName);

    }

    for (var i = 0; i < user.websiteInfo.websiteUsername.length; i++) {

        const websiteName = document.createElement("tr");
        websiteName.textContent = user.websiteInfo.websiteUsername[i];
        Username.appendChild(websiteName);

    }

    for (var i = 0; i < user.websiteInfo.websitePassword.length; i++) {

        const websiteName = document.createElement("tr");
        websiteName.textContent = user.websiteInfo.websitePassword[i];
        Password.appendChild(websiteName);

    }

}


function changeDetails() {

    /* 
    
    Runs when the submit button for the change details form is clicked. Compares the data within the website name
    input box with the website names in that user's storage. If the data does not match, an error message is
    displayed, prompting the user to try again. If the data matches, the data within the username and password
    input boxes overrides the data stored in those array elements for the user and the input boxes are cleared.
    The displayData function is then run.

    COMPLETE
    
    */


    var websiteName = document.getElementById("websiteNameChange").value;
    var error = true;

    for(var i = 0; i < user.websiteInfo.websiteName.length; i++) {
        if(websiteName == user.websiteInfo.websiteName[i]) {

            event.preventDefault();

            var changeDetailsErrorHidden = document.getElementById("changeDetailsError");
            changeDetailsErrorHidden.style.display = "none";

            var websiteNameJSON = document.getElementById("websiteNameChange").value;
            var websiteUsernameJSON = document.getElementById("websiteUsernameChange").value;
            var websitePasswordJSON = document.getElementById("websitePasswordChange").value;
            
            user = jsonData.users.find(user => user.username === loginEmailJSON);
            
            user.websiteInfo.websiteName[i] = websiteNameJSON;
            user.websiteInfo.websiteUsername[i] = websiteUsernameJSON;
            user.websiteInfo.websitePassword[i] = websitePasswordJSON;
        
            localStorage.setItem("users", JSON.stringify(jsonData));
            
            error = false;

        }
    }

    if(error == true) {

            event.preventDefault();

            var changeDetailsError = document.getElementById("changeDetailsError");
            changeDetailsError.style.display = "block";

    }


    var websiteNameChangeClear = document.getElementById("websiteNameChange");
    var websiteUsernameChangeClear = document.getElementById("websiteUsernameChange");
    var websitePasswordChangeClear = document.getElementById("websitePasswordChange");

    websiteNameChangeClear.value = "";
    websiteUsernameChangeClear.value = "";
    websitePasswordChangeClear.value = "";

    displayData();

}


function deleteAccount() {

    /* 
    
    Runs when the submit button in the delete entry form is clicked. Compares value in input box with data in local
    storage. If data matches, the entries with that array position are removed from the storage, then the input box
    is cleared. If the data does not match, an error message appears prompting the user to try again, then clearing
    the input box. The displayData function is then run.

    COMPLETE
    
    */



    var websiteName = document.getElementById("websiteDelete").value;
    var error = true;

    for(var i = 0; i < user.websiteInfo.websiteName.length; i++) {
        if(websiteName == user.websiteInfo.websiteName[i]) {

            event.preventDefault()

            var deleteErrorHidden = document.getElementById("deleteError");
            deleteErrorHidden.style.display = "none";

            user = jsonData.users.find(user => user.username === loginEmailJSON);

            user.websiteInfo.websiteName.splice(i, 1);
            user.websiteInfo.websiteUsername.splice(i, 1);
            user.websiteInfo.websitePassword.splice(i, 1);
            
            localStorage.setItem("users", JSON.stringify(jsonData));

            error = false;

        }
    }

    if(error == true) {

        event.preventDefault();

        var deleteError = document.getElementById("deleteError");
        deleteError.style.display = "block";

    }

    var websiteDeleteClear = document.getElementById("websiteDelete")
    websiteDeleteClear.value = "";

    displayData();

}


function submitEntry() {

    /* 
    
    Runs when submit entry button is pressed. Shows the submit entry form and hides the delete entry form and 
    change details form if either are showing.

    COMPLETE
    
    */

    var submitEntry = document.getElementById("submitEntryForm");
    submitEntry.style.display = "block";

    var deleteWebsiteForm = document.getElementById("deleteWebsiteForm");
    deleteWebsiteForm.style.display = "none";

    var changeDetailsForm = document.getElementById("changeDetailsForm");
    changeDetailsForm.style.display = "none";
}


function changeDetailsForm() {

    /* 
    
    Runs when change details button is pressed. Shows the change details form and hides the delete entry form
    and submit entry form if either are showing.

    COMPLETE
    
    */

    var changeDetailsForm = document.getElementById("changeDetailsForm");
    changeDetailsForm.style.display = "block";

    var deleteWebsiteForm = document.getElementById("deleteWebsiteForm");
    deleteWebsiteForm.style.display = "none";

    var submitEntry = document.getElementById("submitEntryForm");
    submitEntry.style.display = "none";

}


function deleteWebsiteForm() {

    /*
    
    Runs when delete entry button is clicked. Shows the delete entry form and hides the submit entry form and
    change details form if either are showing.

    COMPLETE
    
    */

    var deleteWebsiteForm = document.getElementById("deleteWebsiteForm");
    deleteWebsiteForm.style.display = "block";

    var changeDetailsForm = document.getElementById("changeDetailsForm");
    changeDetailsForm.style.display = "none";

    var submitEntry = document.getElementById("submitEntryForm");
    submitEntry.style.display = "none";

}


async function fetchInfo() {

    /* 
    
    Runs at the beginning of the code. Checks to see if the local storage is empty or full. If it is empty, the
    data from the JSON file is fetched and stored in an empty array. If it is full, the data is parsed into an
    empty array to allow it to be called back on.

    COMPLETE
    
    */

    let storedData = localStorage.getItem("users");
    if(storedData != null) {

        jsonData = JSON.parse(storedData);

    }

    else 
    {
        fetch('./database.json')
            .then(response => response.json())
            .then(data => {
                jsonData = data;
            })
            .catch(error => console.error('JSON file not found', error));
    }
}


function exportData() {

    /* 
    
    Runs when the export button is clicked. Downloads the data of the logged in user onto the device from the 
    local storage to be opened.

    COMPLETE
    
    */

    event.preventDefault();

    user = jsonData.users.find(user => user.username === loginEmailJSON);

    var jsonObject = JSON.stringify(user.websiteInfo);
    const blob = new Blob([jsonObject], {type: 'application/json'});
    var anchor = document.createElement("a");
    
    anchor.download = "data.json";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.innerHTML = "download";
    anchor.click();
    
    console.log(anchor); 
    
}


function initialLogin() {

    /* 
    
    Runs when the first login button is clicked. Hides the first login button and the first sign up button. Shows 
    the login form.
    
    COMPLETE

    */

    var loginForm = document.getElementById("loginForm");
    loginForm.style.display = "block";

    var loginButton = document.getElementById("initialLogin");
    loginButton.style.display = "none";

    var signUpButton = document.getElementById("signUpButton");
    signUpButton.style.display = "none";

}