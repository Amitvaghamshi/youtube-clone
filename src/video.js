
 //   import navbar;
 import navbar from "../component/navbar.js"
 document.getElementById("navbar").innerHTML=navbar()
 
 //eventlistner
 let body=document.querySelector("body");
  body.onload=function(){
      showclickedvideo()
  }


const showclickedvideo=()=>{
      let data=JSON.parse(localStorage.getItem("clicked_video"))
      let {videoId}=data;
      let iframe=document.createElement("iframe");
      iframe.src=`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
      iframe.width="100%";
      iframe.height="100%";
      iframe.setAttribute("allowfullscreen",true)
      document.getElementById("video_details").append(iframe);
      
}

//  recomdation part
let arr=JSON.parse(localStorage.getItem("my_recomondation"));
console.log(arr);

append(arr)

      function append(data){
       
   //   document.getElementById("recommendations").innerHTML=null;

      data.forEach(({videoId ,name,title}) =>{
             let div= document.createElement("div");
             
             let iframe=document.createElement("iframe");
             iframe.src=`https://www.youtube.com/embed/${videoId}`;
             iframe.width="100%";
            //?autoplay=1&mute=1      for auto play put into link
            let videoname= document.createElement("p");
            videoname.innerText=name;

            let titlte=document.createElement("p");
            titlte.innerText=title
           
            div.append(iframe,videoname,titlte);
            document.getElementById("recommendations").append(div)
      })
}


//home page
document.getElementById("icon").addEventListener("click",()=>{
        window.location.href="index.html"
})

// sign in name
let actul_name=localStorage.getItem("my_name") || "signin";;
document.getElementById("signin").innerText=actul_name;