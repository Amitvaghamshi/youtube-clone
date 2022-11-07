//navbar
import navbar from "../component/navbar.js"
document.getElementById("navbar").innerHTML=navbar()

//LOgin button event
document.getElementById("login").addEventListener("click",()=>{
    Login()
})
//ragister
document.getElementById("ragister").addEventListener("click",()=>{
    Register()
});

class User{
      constructor(){
               
      }
      validusername(username){
         return  username.includes('@') ? false:true;
      }
      validpassword(password){
        return password.length<8 ?false:true;
      }

      async signUp(n,e,u,p,m,d){
                let isvalided=this.validusername(u) && this.validpassword(p);
            
                if(isvalided){
                    this.name=n;
                    this.email=e;
                    this.username=u;
                    this.password=p;
                    this.mobile=m;
                    this.description=d;
                    
                    const register_api=`https://masai-api-mocker.herokuapp.com/auth/register`;

                    const responce=await fetch(register_api,{
                        method:"POST",
                        body:JSON.stringify(this),
                        headers:{
                            "Content-Type":"application/json",
                        },   
                    });
                    const data=await responce.json();
                    alert("Ragistation Success")
                      console.log(data)
                }
      }

      async Login(u,p){      
        try{
            const login_data={
                username:u,
                password:p
             }
            const Login_api=`https://masai-api-mocker.herokuapp.com/auth/login`;
            //in this api request we agin send data because we send data to server and server give responce so we have to pass second parameter to the function
                 const responce=fetch(Login_api,{
                       method:"POST",
                       body:JSON.stringify(login_data),
                       headers:{
                        "Content-Type":"application/json",
                       }
                 });
                 console.log(responce)
                 const data=(await responce).json();
                 console.log("data",data);
                 return data
        }catch(error){
           console.log(error);
           alert("you enter wrong credencials");
        }
          
          
      }
}

let user= new User();// hear we not pass any thing beacuse in constructor also    ther is no parameter
const Register=() =>{
          const reg_form=document.getElementById("reg_form");
          
          const name=reg_form.name.value;
          const email=reg_form.email.value;
          const username=reg_form.username.value;
          const password=reg_form.password.value;
          const mobile=reg_form.mobile.value;
          const description=reg_form.description.value;

          user.signUp(name,email,username,password,mobile,description)
};

//ended class

console.log(user)

const  Login=async()=>{

    const username=document.getElementById("login-username").value;
    const password=document.getElementById("login-password").value;
    let data=await user.Login(username,password)
     
   getetprofile(username,data.token)
}

const  getetprofile= async(username,token)=>{
    try{
        let api_link=`https://masai-api-mocker.herokuapp.com/user/${username}`;

    let responce=await fetch(api_link,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        }
    });
    const data=await responce.json();
    const my_name=data.name;
    localStorage.setItem("my_name",my_name);
    let actul_name=localStorage.getItem("my_name");
    document.getElementById("signin").innerText=actul_name;
    window.location.href="index.html"
    
    console.log(data);

    }catch(error){
        console.log(error);
       
    }

}


//home page
document.getElementById("icon").addEventListener("click",()=>{
    window.location.href="index.html"
})
// sign in name
let actul_name=localStorage.getItem("my_name") || "signin";;
document.getElementById("signin").innerText=actul_name