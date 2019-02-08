/*
* first name, last name, email, and password (all strings,
* but passwords should not be displayed in plain text inputs
* This application should store its data using localStorage only
* The dashboard should list (in chronological order), all of the "To-Do Lists"
* when page opens enter "delete" to clear all data of all users
*/




let getValueUser;
let getValueUserPass;
//object elements in the array for all users having personal detail in each object element
let mainArray = [];
//object elements in the array for all user having lists detail in attray in object as each element
let listArray = [];
let listArray1 = [];
let listArrayInTwinPair = [];
let listD = 0;
let listCountId = 0;
let checkCountId = 0;
//lists of individual user in array
let listArrayObject = [];
//with twin member in object
let listArrayObject1 = [];
let myUser;

let createListNum = 0;
let isListSelected = false;

let selectedList;
let tempArrForUserDleteComand = [];
let isListFirstTime = true;

let listCheck = 0;
let firstName;
let lastName;
//Use of template literals to create html layout

function jk() {
    let idHead = "b0";
    let idforList = "mb0";
    let idlist1 = "m102";
    let idlist2 = "m101";
    let idLastDiv = "b1";
    let classBox = "box";
    let classList_m1 = "m1";let classUl_m0 = "m0";let classDivbox001 = "box001";
    let kl = `
            <div class=${classBox} id=${idHead}>
                <h1>To Do List</h1>
        </div>
        <div class=${classDivbox001} id=${idforList}>
        <ul class=${classUl_m0}>
            <li class=${classList_m1} id=${idlist1}>Account Settings</li>
            <li class=${classList_m1} id=${idlist2}>Main</li>
        </ul>
        </div>
            <div class=${classBox} id=${idLastDiv}></div>
`;
    let by = document.getElementById("wrp");

    by.innerHTML = kl;
}
//Create Main Page For To Do List
function createRegistrationPage() {
    jk();

    var cc = document.getElementById("b1");
    var para = document.createElement("P");
    para.setAttribute("id","instruction");
    para.innerText = "This Application is to create various To Do lists" +
        " and you can make as many task list as reminder. But Before that" +
        " you have to register your email and password in the following link" +
        " If you already registered than press log in button! ";

    cc.appendChild(para);

    var logIn = document.createElement("BUTTON");
    logIn.setAttribute("id","btn");
    var t = document.createTextNode("Log In");
    logIn.appendChild(t);
    cc.appendChild(logIn);

    var registar = document.createElement("BUTTON");
    registar.setAttribute("id","btnReg");
    var tt = document.createTextNode("Registar");
    registar.appendChild(tt);
    cc.appendChild(registar);

    var createRegForm = document.getElementById("btnReg");
    createRegForm.addEventListener("click",createFrm);

   var dash = document.getElementById("btn");
   dash.addEventListener("click",createLogInUserAnsPassForDashBoard);

    /*var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        char : "Q",
        key : "q",
        shiftKey : true,
        keyCode : 81
    });*/

   window.document.addEventListener("keypress",deletAll,true);

   let userAccount = document.getElementById("m102");
   userAccount.addEventListener("click",getUserAccounAccess);

    let main = document.getElementById("m101");
    main.addEventListener("click",goToMainPage);
}

function getUserAccounAccess( ){
    //alert();
    window.document.removeEventListener("keypress", deletAll,true);
    let b1 = document.getElementById("b1");
    removeElement("b1");

    let parentClassEle = document.getElementsByClassName("wrapper");
    let creatb1 = document.createElement("div");
    creatb1.setAttribute("id","b1");
    parentClassEle[0].appendChild(creatb1);
    //addElement("b1","div","div001","box");
    let forUserName = document.getElementById("b1");
    let label1 = "User Name ::";
    let label2 = "Password ::";
    //addElementAndItsChildEle("b1","div","divuser01","u01","inputbox1",label1,"lblUser1");
    addElementAndItsChildEle("b1","div","userInputDiv","box01","userName001",label1,"fstName");
    addElementAndItsChildEle("b1","div","userInputPsssDiv","box01","pass001",label2,"pasrd");
    let ttt = document.getElementById("pass001");
    ttt.setAttribute("type","password");

    addElement("b1","button","btn001","btn","");
    let tempbtn001 = document.getElementById("btn001");
    tempbtn001.innerText = "Press";
    tempbtn001.addEventListener("click",getInUserAccount);


}
function getInUserAccount() {
    let username = document.getElementById("userName001").value;
    let userpassword = document.getElementById("pass001").value;
    if("FirstName" in localStorage) {
        // alert('yes we have data');
        var storedData = localStorage.getItem('FirstName');
        mainArray = JSON.parse(storedData);
        console.log(mainArray);
        for (let i=0;i<mainArray.length;i++){
            if (mainArray[i].userName === username && mainArray[i].password === userpassword){
                myUser = mainArray[i].userName;
                // alert("got username and password");
                removeElement("userInputDiv");
                removeElement("userInputPsssDiv");
                removeElement("btn001");
                addElementAndItsChildEle("b1","div","userInputDiv","box01","userName001","User Name","fstName");
                let userTempInput = document.getElementById("userName001");
                userTempInput.value = mainArray[i].userName;
                userTempInput.disabled = true;

                addElementAndItsChildEle("b1","div","userInputPsssDiv","box01","pass001","User Password","pasrd");
                let userTempPassIn = document.getElementById("pass001");
                userTempPassIn.value = mainArray[i].password;

                addElementAndItsChildEle("b1","div","userInputFirstNameDiv","box01","firstName","First Name","firstname");
                let userFirstName = document.getElementById("firstName");
                userFirstName.value = mainArray[i].firstName;

                addElementAndItsChildEle("b1","div","userInputLastNameDiv","box01","lastName","Last Name","lastname");
                let userLastName = document.getElementById("lastName");
                userLastName.value = mainArray[i].lastName;

                addElement("b1","button","updateUser","box01","");
                let tttt = document.getElementById("updateUser");
                tttt.innerText = "Update";

               // addElement("b1","div","divForClear","divClear","");
                addElement("b1","button","btn002","btn","");
                let tempbtn002 = document.getElementById("btn002");
                tempbtn002.innerText = "Delete User";
                tempbtn002.addEventListener("click",deleteUserAccount);

                tttt.addEventListener("click",updateUserDetail);
                return;

            }else{

            }
        }
             alert("user not found");
        
    }else {
        alert('user data not found ');
    }

    //////////////////////
/*    removeElement("userInputDiv");
    removeElement("userInputPsssDiv");
    removeElement("btn001");*/
}
function updateUserDetail (){
    //check input here //////

    ///////////////////////////
    let userTempInput = document.getElementById("userName001");
    let user = userTempInput.value;
    let validEmail = validateEmail(user);
    if (validEmail === false) {
        let vv = document.getElementById('fstName');
        vv.style.color = "red";
        alert("require valid email");
        console.log("Invalid email  " + validEmail);
        return;
    }
    makeTextLabelColorChanged("fstName","#5a6ba5");

    let userTempPassIn = document.getElementById("pass001");
    let pass = userTempPassIn.value;
    if(pass === ""  || pass === undefined ){
        alert("field is blank");
        //formSp2Label
        makeTextLabelColorChanged("pasrd","red");
        return;
    }
    if ( pass.length <=6){
        alert("password is Short");
        makeTextLabelColorChanged("pasrd","red");
        return;
    }
    makeTextLabelColorChanged("pasrd","#5a6ba5");



    let userFirstName = document.getElementById("firstName");
    let firstNa = userFirstName.value;
    //firstname
    if (firstNa === "" ){
        alert("Give first name");
        makeTextLabelColorChanged("firstname","red");
        return;
    }
    makeTextLabelColorChanged("firstname","#5a6ba5");



    let userLastName = document.getElementById("lastName");
    let lastNa =  userLastName.value;
    //
    if (lastNa === "" ){
        alert("Give last name");
        makeTextLabelColorChanged("lastname","red");
        return;
    }
    makeTextLabelColorChanged("lastname","#5a6ba5");

    var tt = new   SavingObject(firstNa,lastNa,user,pass);
    console.log("updateTT new update " + tt.userName);

    //var storedData = localStorage.getItem('FirstName');
    if("FirstName" in localStorage){
        //alert('yes data exist having key "FirstName" ');
        var storedData = localStorage.getItem('FirstName');
        mainArray = JSON.parse(storedData);
        for (var i = 0;i<mainArray.length;i++){
            if(mainArray.length === 0){
                alert("no data found!!");
                return ;
            }
            if(mainArray[i].userName===myUser){
                //alert(myUser + " Duplicate user, user exist found");
                mainArray.splice(i,1);
                //return;
            }
        }
        //alert("oooooookk");
        mainArray.push(tt);
        console.log(mainArray);
        localStorage.setItem("FirstName",  JSON.stringify(mainArray));
        defaultSetting();
        goToMainPage();

    } else {
        //alert('no data available with key "FirstName" ');
        goToMainPage();
        return;
        /*mainArray.push(tt);
        localStorage.setItem("FirstName",  JSON.stringify(mainArray));
        //create new local storage
        createStorageDataTemplate(myUser,listArrayObject1);
        goToMainPage();*/
    }

}
function deleteUserAccount(){
    alert("Will Delete user account and related data permanently!!!");
    let username = document.getElementById("userName001").value;
    let userpassword = document.getElementById("pass001").value;
    for (let i=0;i<mainArray.length;i++) {
        if (mainArray[i].userName === username && mainArray[i].password === userpassword) {
                mainArray.splice(i,1);
                console.log(" user deleted " ,mainArray  );
                localStorage.setItem("FirstName",  JSON.stringify(mainArray));
                localStorage.removeItem(username);
                defaultSetting();
                goToMainPage();
                return;
        }
    }
}
function deletAll(e){

        console.log(e.key + " " + tempArrForUserDleteComand);
        function getSum(total, num) {
            return total + num;
        }
    tempArrForUserDleteComand.push(e.key);
    tempArrForUserDleteComand.reduce(getSum);
        console.log(tempArrForUserDleteComand);
        if (tempArrForUserDleteComand.reduce(getSum) === "delete"){
            alert("all users data deleted !!");
            deleteAllUsersData();
            console.log("all users data deleted");
            tempArrForUserDleteComand = [];
            window.document.removeEventListener("keypress", deletAll,true);
            isListFirstTime = true;
        }else if (tempArrForUserDleteComand.length>5){
            tempArrForUserDleteComand = [];
            console.log("reset ");
            window.document.removeEventListener("keypress", deletAll,true);
        }


}
//create form for registration
function createFrm() {
     window.document.removeEventListener("keypress", deletAll,true);
     removeElement("instruction");
     removeElement("btn");
     removeElement("btnReg");
     var string = "Plese Fill in the blank field and all field must be filled." +
         " Please add password with minimum 7 digit";
     var str = "Enter Your Email";
    addElement("b1","P","regDetail","frm",string);
    //addElement("b1","form","formDetail","frm","");
    //addElement("formDetail","input","input","frm");
    let label1 = "First Name ::";
    let label2 = "Last Name ::";
    addElementAndItsChildEle("b1","div","userInputDiv","box01","firstName",label1,"fn");
    addElementAndItsChildEle("b1","div","userInputDiv1","box01","lastName",label2,"ln");
    createForm("b1");
}
//remove element function
function removeElement(elementId){
     var elemnt = document.getElementById(elementId);
     elemnt.parentNode.removeChild(elemnt);
}
//create element function
function addElement(parentElement,newElementTagName,newId,newClass,string){
    var temp = document.getElementById(parentElement);
    var newElement = document.createElement(newElementTagName);
    newElement.setAttribute("id",newId);
    newElement.setAttribute("class",newClass);
    newElement.innerText = string;
    temp.appendChild(newElement);

}
//create div and it`s child inside parentElement
function addElementAndItsChildEle(parentElement,newElementTagName,newId,newClass,newIdOFChild,label,spanId){
    var temp = document.getElementById(parentElement);
    var newDiv = document.createElement("DIV");

    var newSpan = document.createElement("span");
    newSpan.setAttribute("id",spanId);
    newDiv.appendChild(newSpan);
    newSpan.innerText = label ;
    newDiv.setAttribute("class",newClass);
    newDiv.setAttribute("id",newId);
    temp.appendChild(newDiv);

    var firstName = document.createElement("input");
    firstName.setAttribute("type","text");
    firstName.setAttribute("value","");
    firstName.setAttribute("id",newIdOFChild);//"firstName"
    newDiv.appendChild(firstName);

}
//////////////////////
//create form element for user name and password
function createForm(parentElement){
    var temp = document.getElementById(parentElement);
    var f = document.createElement("form");
    f.setAttribute("id","frm");

    var newd1 = document.createElement("div");
    newd1.setAttribute("id","div1");
    newd1.innerHTML = "<span id='formSp1Label'>" + "User Name (valid email) ::" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;"  + "</span>";
    var i = document.createElement("input");
    i.setAttribute("type","text");
    i.setAttribute("name","username");
    i.setAttribute("id","userSname");
    i.setAttribute("value","");

    newd1.appendChild(i);

    var newd2 = document.createElement("div");
    newd2.setAttribute("id","div2");
    newd2.innerHTML = "<span id='formSp2Label'>" + "Password ::   "+"&nbsp;" + "&nbsp;"  + "</span>";
    var pass = document.createElement("input");
    pass.setAttribute("type","password");
    pass.setAttribute("password","password");
    pass.setAttribute("id","pass");
    pass.setAttribute("name","Name");

    newd2.appendChild(pass);

    //////////check box for agreement of terms and conditions ////////////
    let newdCheck = document.createElement("div");
    newdCheck.setAttribute("id","divCheck");
    /*newdCheck.innerHTML = "<span id style=' formCheckLabel'>" + "I agree with Terms & condition"+
        "</span>";*/
    let chkAgre = document.createElement("input");
    chkAgre.setAttribute("type","checkbox");
    chkAgre.setAttribute("id","checkForAgreement");
    //chkAgre.setAttribute("name","hjhjhjh");
    //chkAgre.setAttribute("value","hjhjhjh");
    newdCheck.appendChild(chkAgre);
    let lblSpanChk = document.createElement("span");
    lblSpanChk.setAttribute("id","lblSpanChk");
    lblSpanChk.innerText = "I agree with Terms & condition";
    newdCheck.appendChild(lblSpanChk);
    /////////////////////////////////////////////////////////////////////

    var newd3 = document.createElement("div");
    newd3.setAttribute("id","div3");

    var s = document.createElement("BUTTON");
    s.setAttribute("type","BUTTON");
    s.setAttribute("value","Submit");
    s.setAttribute("id","userPassword");

    newd3.appendChild(s);

    var exit = document.createElement("BUTTON");
    exit.setAttribute("type","BUTTON");
    exit.setAttribute("value","Submit");
    exit.setAttribute("id","exitToMain");
    newd3.appendChild(exit);
    exit.innerText = "Exit";
    f.appendChild(newd1);f.appendChild(newd2);f.appendChild(newd3);
    f.appendChild(newdCheck);
    //f.appendChild(pass);
    //temp.appendChild(s);
    temp.appendChild(f);
    var btnLabel = document.getElementById("userPassword");
    btnLabel.innerText = "Submit";



    let gv = document.getElementById("userPassword");

    gv.addEventListener("click",getValueS);
    exit.addEventListener("click",goToMainPage);

}
//check for input value as valid email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
//get all value fill in the form to save
function getValueS(){
    var user = document.getElementById("userSname").value;

    let validEmail = validateEmail(user);

    getValueUser = user;


    var userPass = document.getElementById("pass").value;
    getValueUserPass = userPass;

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var checkAgrmt = document.getElementById("checkForAgreement").checked;
    //alert(checkAgrmt);
    //to reset data
    //////////////////////////
    if (firstName === "clear_key"){
        localStorage.removeItem('FirstName');
        alert("clear key");
        return;
    }
    if (firstName === "clear_data"){
        mainArray = [];
        localStorage.setItem("FirstName",  JSON.stringify(mainArray));
        alert("clear data");
        return;
    }
    ///////////////////////////
    if (firstName === "" ){
        alert("Give first name");
        makeTextLabelColorChanged("fn","red");
        return;
    }
    makeTextLabelColorChanged("fn","#5a6ba5");
    if (lastName === ""){
        alert("Give last name");
        makeTextLabelColorChanged("ln","red");
        return;
    }
    makeTextLabelColorChanged("ln","#5a6ba5");
    /////
    alert("find "+validEmail);
    if (validEmail === false) {
        let vv = document.getElementById('formSp1Label');
        vv.style.color = "red";
        console.log("Invalid email  " + validEmail);
        return;
    }
    makeTextLabelColorChanged("formSp1Label","#5a6ba5");
    /////


    if(user === "" || getValueUserPass === "" || user === undefined || getValueUserPass === undefined){
        alert("field is blank");
        //formSp2Label
        makeTextLabelColorChanged("formSp2Label","red");
        return;
    }
    if (user.length<=3 || getValueUserPass.length <=6){
        alert("user name Short");
        makeTextLabelColorChanged("formSp2Label","red");
        return;
    }
    makeTextLabelColorChanged("formSp2Label","#5a6ba5");


    if (checkAgrmt === false){
        alert("Please Check Terms and Conditions!!!");
        makeTextLabelColorChanged("lblSpanChk","red");
        return;
    }
    makeTextLabelColorChanged("lblSpanChk","#ffb64e");

    //alert(getValueUser + " " + getValueUserPass + " "+firstName +" "+lastName);

    var tt = new   SavingObject(firstName,lastName,user,userPass);

    //var storedData = localStorage.getItem('FirstName');
    if("FirstName" in localStorage){
        //alert('yes data exist having key "FirstName" ');
        var storedData = localStorage.getItem('FirstName');
        mainArray = JSON.parse(storedData);
        if (checkDuplicateUserName(mainArray,user) === false){
            return;
        }
        mainArray.push(tt);
        localStorage.setItem("FirstName",  JSON.stringify(mainArray));
    } else {
        //alert('no data available with key "FirstName" ');
        mainArray.push(tt);
        localStorage.setItem("FirstName",  JSON.stringify(mainArray));
        //create new local storage
        createStorageDataTemplate(myUser,listArrayObject1);
    }
   /* if (storedData) {
        mainArray = JSON.parse(storedData);
       if (checkDuplicateUserName(mainArray,user) === false){
           return;
       }
        mainArray.push(tt);
        localStorage.setItem("FirstName",  JSON.stringify(mainArray));
    }else{
        localStorage.setItem("FirstName",  JSON.stringify(mainArray));
    }*/
    //localStorage.setItem('FirstName', JSON.stringify(mainArray));

    //var getFirstName = localStorage.getItem('FirstName');
    var storedNames = JSON.parse(localStorage.getItem("FirstName"));
    // alert ('retrievedObject: ' + storedNames[0].userName +""+storedNames[0].lastName);
    console.log(storedNames);
    var ff = document.getElementById("regDetail");
    ff.innerText = "";
    removeElement("userInputDiv");
    removeElement("userInputDiv1");
    removeElement("frm");
    //recreate main page after new registration
    createRegistrationPage();

}
// create main  object for saving all users
function SavingObject(firstName,lastName,userName,password){
    this.firstName = firstName,
    this.lastName = lastName,
    this.userName = userName,
    this.password = password,
        this.fn = function () {
            return this.firstName;
        },
        this.ln = function () {
            return this.lastName;
        }
}
//check function for stopping duplicate user name
function checkDuplicateUserName(arr,name){
    for (var i = 0;i<arr.length;i++){
        if(arr.length == 0){
            alert("no data");
            return ;
        }
        if(arr[i].userName===name){
            alert(name + "Duplicate user, user exist found");
            return false;
        }
    }
}

function createLogInUserAnsPassForDashBoard(){
    //alert();
    //delete key bord press event for protect key board enter
    window.document.removeEventListener("keypress", deletAll,true);
    removeElement("btn");
    removeElement("btnReg");
    var ff = document.getElementById("instruction");
    ff.innerText = "";
    ff.style.border = "none";

    addElement("b1","div","d1","box02","");

    var lbl = document.getElementById("d1");
    lbl.innerHTML = "<span id='logInUserName'>"+"User Name"+"</span>";
    var user = document.createElement("input");
    user.setAttribute("id","userLn");
    user.setAttribute("value","");
    lbl.appendChild(user);

    addElement("b1","div","d11","box02","");

    var lbl1 = document.getElementById("d11");
    lbl1.innerHTML = "<span id='logInUserNameLbl'>"+"User Password"+"</span>";
    var userPass = document.createElement("input");
    userPass.setAttribute("id","userLnPass");
    userPass.setAttribute("value","");
    userPass.setAttribute("type","password");
    lbl1.appendChild(userPass);

    addElement("b1","div","d111","box02","");

    var temp = document.getElementById("d111");
    var btnToCheckUserPass = document.createElement("BUTTON");
    btnToCheckUserPass.setAttribute("id","btnToCheckUser");
    btnToCheckUserPass.innerText = "Enter";
    temp.appendChild(btnToCheckUserPass);


    var btnToExit = document.createElement("BUTTON");
    btnToExit.setAttribute("id","btnToExit");
    btnToExit.innerText = "Back";
    temp.appendChild(btnToExit);

    btnToExit.addEventListener("click",goToMainPage);


    btnToCheckUserPass.addEventListener("click",createDashBoardCheck);

}
// check user name and password for log in
function createDashBoardCheck(){
    //alert();
    let username = document.getElementById("userLn").value;
    let userpassword = document.getElementById("userLnPass").value;
    if("FirstName" in localStorage){
        //alert('yes');
        var storedData = localStorage.getItem('FirstName');
        mainArray = JSON.parse(storedData);

        for(let i = 0;i<mainArray.length;i++){
            if (mainArray[i].userName === username && mainArray[i].password === userpassword){
                //alert("found user " + mainArray[i].userName + " "+username);
                myUser = username;
                firstName = mainArray[i].firstName;
                lastName = mainArray[i].lastName;
                removeElement("userLn");removeElement("userLnPass");
                removeElement("btnToCheckUser");removeElement("logInUserName");
                removeElement("logInUserNameLbl");
                removeElement("d111");
                createDashBoard(username,mainArray[i].firstName,mainArray[i].lastName);
                break;
            }else  {
                 if(i===mainArray.length-1){
                     alert("User Name or password is wrong");
                 }
            }

        }

        //mainArray.push(tt);
        //localStorage.setItem("FirstName",  JSON.stringify(mainArray));
    } else {
        alert('no failed ');
        // mainArray.push(tt);
        //localStorage.setItem("FirstName",  JSON.stringify(mainArray));
    }

}
//dash board dialog box that checks user have any stored list
function createDashBoard(userN,fName,lName) {
    //createStorageDataTemplate(userN,listArrayObject1);
    var storedDataOfMyUser = JSON.parse(localStorage.getItem(userN));
        listArrayObject1 = storedDataOfMyUser;

    addElement("b1","div","dashboard","box03","");
    let dash = document.getElementById("dashboard");
    dash.innerHTML = "<span id='welcome'>"+"Welcome "+ fName +" "+ lName +"</span>";
    console.log("listArrayObject1 " + listArrayObject1);
    if ( storedDataOfMyUser === null ||  listArrayObject1.length === 0 ){
        //alert( "isListFirstTime  1"  +  isListFirstTime  + " local listArrayObject1 " + listArrayObject1.length);
        //alert("no list");
        //if no list then listArrayObject1 array should be initialized
        listArrayObject1 = [];
        addElement("b1","div","dashboardNoList","box03","");
        let dashnolist = document.getElementById("dashboardNoList");
        dashnolist.innerHTML = "<span id='noList'>"+"You Don`t have list, "+ fName +" "+ lName +"</span>";
    }else{
        //alert("u have list");
        // alert( "isListFirstTime  2"  +  isListFirstTime  + " local listArrayObject1 " + listArrayObject1.length);
        addElement("b1","div","dashboardNoList","box03","");
        let dashnolist = document.getElementById("dashboardNoList");
        dashnolist.innerHTML = "<span id='noList'>"+"You have following list and Options, "+ fName +" "+ lName +"</span>";
        //console.log("list name "+storedDataOfMyUser[0].name+"List "+storedDataOfMyUser[0].listArr);
        // create list from storedDataOfMyUser
        setTimeout(createListFromStoredDataList, 1000,storedDataOfMyUser);
        //createListFromStoredDataList(storedDataOfMyUser);
        isListFirstTime = false;
    }
    addElement("b1","div","createList","box04","");
    let bb1 = document.getElementById("createList");
    let createBtnForList =  document.createElement("button");
    createBtnForList.setAttribute("id","createlistbtn");
    createBtnForList.style.cursor = "pointer";
    createBtnForList.innerText ="Create List";
    bb1.appendChild(createBtnForList);

    let createBtnForExit =  document.createElement("button");
    createBtnForExit.setAttribute("id","createlistbtnForExit");
    createBtnForExit.innerText ="Sign Out";
    bb1.appendChild(createBtnForExit);

    let createBtnForDeleteListByName =  document.createElement("button");
    createBtnForDeleteListByName.setAttribute("id","createlistbtnForExit1");
    createBtnForDeleteListByName.innerText ="Delete List";
    bb1.appendChild(createBtnForDeleteListByName);
    
    let tempBtnCreateList = document.getElementById("createlistbtn");
    tempBtnCreateList.addEventListener("click",listView);

    createBtnForExit.addEventListener("click",goToMainPage);
    createBtnForDeleteListByName.addEventListener("click",deleteListByName);
}
function deleteListByName() {
    let listNme = prompt("List Name to delete ");
    removeListByName(listArrayObject1,listNme);
    if (listD === 1){

        removeElement("newList");
        removeElement("saveList");
        listD = 0;
    }

}
function goToMainPage() {
    defaultSetting();
    location.reload();
}
function listView() {
    //alert();
    if (listD===1){
        alert("you want to refresh, Save list data! Data may loss if not saved?");
        removeElement("newList");
        removeElement("saveList");
        listCheck = 0;
        //return;
    }
    addElement("b1","div","newList","box04","");
    let tt = document.getElementById("newList");
    tt.style.backgroundColor = "black";

    let add  = document.createElement("button");
    add.setAttribute("id","addTaskBtn");
    tt.appendChild(add);

    let remove  = document.createElement("button");
    remove.setAttribute("id","removeTaskBtn");
    tt.appendChild(remove);


    let ul = document.createElement("ul");
    ul.setAttribute("id","ul");
    tt.appendChild(ul);
    //createList("ul");

    let addListBtn = document.getElementById("addTaskBtn");
    addListBtn.innerText = "Add Item";
    let removeListBtn = document.getElementById("removeTaskBtn");
    removeListBtn.innerText = "Remove Item";

    addElement("b1","div","saveList","box04","");
    let tt1 = document.getElementById("saveList");
    // save list button
    let save  = document.createElement("button");
    save.setAttribute("id","saveTaskBtn");
    tt1.appendChild(save);
    save.innerText = "Save List";

    addListBtn.addEventListener("click",makeList);

    removeListBtn.addEventListener("click",removeItemFromList);



    let saveBtn = document.getElementById("saveTaskBtn");
    saveBtn.addEventListener("click",saveListInObject);

    listD = 1;
    listCountId = 0;
    checkCountId = 0;

    listArrayObject1 = getDataFromStorage(myUser);

    console.log(listArrayObject1);

}
function removeItemFromList() {
    let removeTemp = document.getElementById("ul");
    console.log(removeTemp);
    let tt =  removeTemp.getElementsByClassName("lis");

    let total = tt.length-1;
    if (total <0){
        return;
    }
    tt[total].remove();
    console.log(tt);
    listArray1.pop();
    //for list id
    listCountId--;
    //for check bod id
    checkCountId--;

    //let bothArray  = [lli.innerText,xx];
    listArrayInTwinPair.pop();

}
function makeList(){

    createList("ul");
}
//creating list on page
function createList(parentElement){
    let tt = document.getElementById(parentElement);
    let lli = document.createElement("li");
    lli.setAttribute("class","lis");
    let idTmp = "list"+(listCountId++);
    lli.setAttribute("id",idTmp);

    let addthing = prompt("Enter Item :" );
    if (addthing === null){
        return;
    }
    ///// for check box ////////////////////
    let checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("class","allCheck");
    //checkBox.setAttribute("id","check");
    let idchk = "chk"+(checkCountId++);
    checkBox.setAttribute("id",idchk);

    /////
    lli.innerText = addthing;
    listArray.push(lli.innerText);
    //lli.style.fontSize = "28px";
    tt.appendChild(lli);
    lli.appendChild(checkBox);

    let xx = document.getElementById(idchk).checked;
    console.log("xx checked  " + xx);

    //listArray1 = [];
    listArray1.push(lli.innerText);
    console.log(listArray1);

    let bothArray  = [lli.innerText,xx];
    listArrayInTwinPair.push(bothArray);



}
//save list button call function
function saveListInObject(){
        if (typeof listArrayObject1 === "undefined") {
                    //alert("listArrayObject1 type undefined");
            isListFirstTime = true;

        }
        console.log("single list"+listArray1  + " true or false " + isListFirstTime);

        checkBoxGetStatus();
        refreshAfterSaveList();
     listD = 0;
        removeElement("newList");
        removeElement("saveList");
         //alert("listArrayObject1 !== null "+ listArrayObject1 !== null);
         //alert("isListFirstTime === false "+isListFirstTime === false);
         //alert("listArrayObject1.length "+ listArrayObject1.length);

         console.log(" listArrayObject1 "+listArrayObject1);
         console.log(" lsListFirstTime "+isListFirstTime);

        if (listArrayObject1 !== null && isListFirstTime === false && listArrayObject1.length>0  ){

            //alert("ccc listArrayObject1 type undefined  "+listArrayObject1);

            removeElement("userStoredList");

            setTimeout(createListFromStoredDataList, 500,listArrayObject1);

            return;

        }else if (isListFirstTime === true &&  listArrayObject1.length>0) {

            isListFirstTime = false;

            //alert("ccc 111111    listArrayObject1 type undefined");

            setTimeout(createListFromStoredDataList, 500, listArrayObject1);
            //alert("ccc   222222  listArrayObject1 type undefined");
            return;
        }
           return;
}
//object created for user having lists
function ListObject(user,name,listArr) {
    this.user = user,
    this.name = name,
    this.listArr = listArr

}
//get True or false from existing list check box
function checkBoxGetStatus() {
    //let removeTemp = document.getElementById(classNameOfList);
    //let arr = [];
    //listArrayObject1 = [];

    listArrayInTwinPair = [];
    let tt =  document.getElementsByClassName("lis");

    //console.log("rrrrr ",  document.getElementById("chk1" ).checked);
    let lcId = 0;
    //let allList = document.getElementsByClassName(classNameOfList);
    for (let ii = 0;ii<tt.length;ii++){
        let chkId  = "chk" + (ii);
        let xx = document.getElementById(chkId).checked;
        console.log("xx  "+ xx +"chkId  "+ chkId);

        let idForList = "list"+[ii];
        let listId = document.getElementById(idForList);

        console.log(listId.innerText);

        let bothArray  = [listId.innerText,xx];
        listArrayInTwinPair.push(bothArray);

    }

      let  newName = prompt("Name of the New List :");
      if (typeof listArrayObject1 === "undefined"){
          listArrayObject1 = [];
      }
      if (checkNameOfListExistInSavedRecord(listArrayObject1,newName) === true || newName === ""){
          var result = confirm("You want to override list or not!!!");
          if(result){
              alert("confirm over ride");
              //here comes override code
              overRightListData(listArrayObject1,newName);
              //return;
          }else{

              alert("no");
              return;
          }


      }


    let lst = new ListObject(myUser,newName,listArray1);
    listArrayObject.push(lst);
    console.log(lst.user +" " + lst.name);
    console.log(lst.listArr);
    // checkBoxGetStatus("ul");

    //let bothArray  = [lli.innerText,lst];
    console.log("myuser "+myUser+ " newName " + newName);
    console.log("listArrayInTwinPair "+listArrayInTwinPair);
    let lst1 = new ListObject(myUser,newName,listArrayInTwinPair);
    listArrayObject1.push(lst1);
    console.log("listArrayObject1.length " +listArrayObject1.length);
    updateLocalStorageData(myUser,listArrayObject1);

    console.log("list Array pair "+listArrayInTwinPair );

}

function createStorageDataTemplate(user,arrS) {
    //arr = [];

    localStorage.setItem(user, JSON.stringify(arrS));
   // return JSON.parse(localStorage.getItem(user));
}
function getDataFromStorage(user) {
    if(user in localStorage){
        return JSON.parse(localStorage.getItem(user));
    }else {
        console.log("Data of user not exist");
        return ;
    }

}
function updateLocalStorageData(user,arrUpdate) {
    //arrUpdate.push(input.value);

    localStorage.setItem(user, JSON.stringify(arrUpdate));
}
function deleteAllUsersData(){
    localStorage.clear();
}
//create list view from stored list data by clicking on lists
function createListFromStoredDataList(myStoredData){
    addElement("b1","div","userStoredList","box03","");

    console.log("data length " + myStoredData.length);
    let dashDiv  = document.getElementById("userStoredList");
    let newUl = document.createElement("ul");
    dashDiv.appendChild(newUl);
    if (myStoredData.length>0){
        let dashnolist = document.getElementById("dashboardNoList");
        dashnolist.innerHTML = "<span id='noList'>" + "You have following list and Options, " + firstName +" "+ lastName + "</span>";
    }else {
        let dashnolist = document.getElementById("dashboardNoList");
        dashnolist.innerHTML = "<span id='noList'>" + "You have No list But Options, " + firstName +" "+ lastName + "</span>";
    }
    for (let i=0;i<myStoredData.length;i++){
        let newList = document.createElement("li");
        newList.setAttribute("class","storedList");
        newList.innerText = myStoredData[i].name;
        newUl.appendChild(newList);
        newList.addEventListener("click",function () {
            isListSelected = true;
            console.log(i);
            listView();
            console.log("data selected ",myStoredData[i].listArr);
            let pp = myStoredData[i].listArr;
            let tmpObject = myStoredData[i];
            populatedStoredListData("ul",pp,i,tmpObject);
        })
        /*let dashnolist = document.getElementById("dashboardNoList");
        dashnolist.innerText = "<span id='noList'>"+"You have following list and Options, "+ firstName +" "+ lastName +"</span>";*/
    }
}
//create function for populate stored data list selected
function populatedStoredListData(parantNodeId,arr,index,arrObj){
    if (listCheck===1){
        console.log("list already selected");
        return;
    }
    listCheck = 1;
    let nodeUl1 = document.getElementById("ul");
    listCountId = 0;checkCountId = 0;selectedList = arrObj.name;
    console.log(arrObj.name);
    for (let ii =0;ii<arr.length;ii++){
        let newLiId = document.createElement("li");
        //let liId = "lis"+ii;
        let idTmp = "list"+(listCountId++);
        newLiId.setAttribute("id",idTmp);
        newLiId.setAttribute("class","lis");
        console.log("arr ",arr[ii][0]);
        nodeUl1.appendChild(newLiId);
        let trmppp = document.getElementById(idTmp);
        trmppp.innerText = arr[ii][0];

        ///// for check box ////////////////////
        let checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type","checkbox");
        checkBox.setAttribute("class","allCheck");
        //checkBox.setAttribute("id","check");
        let idchk = "chk"+(checkCountId++);
        checkBox.setAttribute("id",idchk);
        trmppp.appendChild(checkBox);
        let check = document.getElementById(idchk);
        check.checked = arr[ii][1];


        /////
    }
}
function refreshAfterSaveList(){
    //alert("alert1");
    removeElement("ul");
    //alert("alert2");
    listCheck = 0;
}
function checkNameOfListExistInSavedRecord(dataList,givenName) {
    //alert("arrrrrrrrrrrrrrrrr");
    //console.log("check name of list "+dataList[0].name);
    for (let k=0;k<dataList.length;k++){
        if (givenName === dataList[k].name) {
            console.log(" name is in list "+givenName);
            //alert(" name is in list "+givenName);
            return true
        }
    }
    return false ;
}
function removeListByName(dataList,givenNameOfList){
    // console.log("check name of list "+dataList[3].name);

    for (let k=0;k<dataList.length;k++){
        if (givenNameOfList === dataList[k].name) {
            console.log(" name is in list "+givenNameOfList);
            //alert(" name is in list "+givenNameOfList);
            //dataList.remove(k);
            dataList.splice(k, 1);
            updateLocalStorageData(myUser,dataList);
            //alert("stored");
            removeElement("userStoredList");
            setTimeout(createListFromStoredDataList, 500,dataList);

            return;
        }
        if (dataList[k].name === null){
            alert("blank name is in list "+givenNameOfList);
            //dataList.remove(k);
            dataList.splice(k, 1);
            updateLocalStorageData(myUser,dataList);
            alert("stored");
            removeElement("userStoredList");
            setTimeout(createListFromStoredDataList, 500,dataList);
            return;
        }
    }
    //updateLocalStorageData(myUser,dataList);
    //alert("stored");
    //removeElement("userStoredList");
    //setTimeout(createListFromStoredDataList, 500,dataList);
}
//over right data of list named
function overRightListData(datalist,givenNameOfList){

    for (let k=0; k < datalist.length;k++) {
        if (givenNameOfList === datalist[k].name) {
            console.log(" name is in list " + givenNameOfList);
            //alert(" name is in list " + givenNameOfList);
            //dataList.remove(k);
            datalist.splice(k,1);
            //dataList.splice(k, 1);

            listArrayObject1   = datalist;
            //alert("stored");
            return;
            /*updateLocalStorageData(myUser,dataList);
            alert("stored");
            removeElement("userStoredList");
            setTimeout(createListFromStoredDataList, 500,dataList);
            return;*/
        }
    }

}

function makeTextLabelColorChanged(elementId,color) {
    let vv = document.getElementById(elementId);
    vv.style.color = color;
}
function defaultSetting(){
    mainArray = [];
//object elements in the array for all user having lists detail in attray in object as each element
    listArray = [];
    listArray1 = [];
    listArrayInTwinPair = [];
    listD = 0;
    listCountId = 0;
    checkCountId = 0;
//lists of individual user in array
    listArrayObject = [];
//with twin member in object
    listArrayObject1 = [];
    myUser = null;

    createListNum = 0;
    isListSelected = false;

    selectedList = null;
    tempArrForUserDleteComand = [];
    isListFirstTime = true;

    listCheck = 0;
    //let firstName;
    //let lastName;
}

//final function run
createRegistrationPage();
