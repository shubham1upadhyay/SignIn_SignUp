const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPass = document.getElementById("confirm-password");

let signupBtn = document.getElementById("signup");
let userDetails = document.getElementById("user-details");

let userData ={};

//this is the access token
const generatedToken = generateToken();

// function to check that if the access token is present or not
function isAuthenticated(){
  return localStorage.getItem("accessToken") !== null;
}

//function for validating and storing the data
function signUpProcessing(){
// signupBtn.addEventListener('click', ()=>{
  const msg = document.getElementById("message");
  let name = fullName.value;
  let e = email.value;
  let pass = password.value;
  let cp = confirmPass.value;


  // validating the fields
  if(name === '' || e === '' || pass === '' || cp === '')
  {
      msg.innerHTML = `
        <p class="e-msg">Error : All the fields are mandatory !</p>
      `;

      return;
  }
  else if(pass !== cp)
  {
      msg.innerHTML = `
        <p class="e-msg">Error: Password Not Matching, Please check !</p>
      `;
      return;
  }
  else if(pass.length < 6 || cp.length < 6)
  {
      msg.innerHTML = `
        <p class="e-msg">Error: Password must be 6 or more character long !</p>
      `;
  }
  else{
    msg.innerHTML = `
      <p class="s-msg">Successfully signed up !</p>
    `;

      fullName.value='';
      email.value='';
      password.value='';
      confirmPass.value = '';

       // storing the data
    userData = {
      name: name,
      email: e,
      password: pass,
      accessToken: generatedToken,
    }
    localStorage.setItem('userData', JSON.stringify(userData));

    let timer = document.getElementById("timer");
    timer.innerHTML = `
     <p class="time">You will be redirecting in 2 seconds ...</p>
   `;
   
   setTimeout(() => {
       window.location.href = 'profile.html';
     }, 2000);

    }
  // });

}

//functions at profile page
function atProfile(){

  if (isAuthenticated()){
    window.location.href = 'profile.html';
  }

  const userData = JSON.parse(localStorage.getItem('userData'));
  let name = document.getElementById("user-name");
  let em = document.getElementById("user-email");
  let p = document.getElementById("user-pass");


   name.innerHTML =`${userData.name}`;
   em.innerHTML =`${userData.email}`;
   p.innerHTML =`${userData.password}`;

   let lb = document.getElementById("lb");
    lb.innerHTML =`
       <button onclick="logout()" class="logout border-0 bg-black text-white fs-5 mx-3">Logout</button>
    `;
  
}  

function logout(){
  localStorage.removeItem('userData');
  window.location.href = 'index.html';
}

// function to generate access token
function generateToken(){
  let tokens = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm'];
  let token = "";
  for(let i=0; i<=16; i++)
  {
    let random = Math.floor(Math.random() * tokens.length);
    token += tokens[random];
  }
  return token;
}
