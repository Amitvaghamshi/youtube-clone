
//import navbar;
import navbar from "../component/navbar.js";
//console.log(navbar)
document.getElementById("navbar").innerHTML=navbar();

//for sorting
let order="relevance";
document.getElementById("views").addEventListener("click",function() {
     order="viewCount";
    
})
document.getElementById("Alphabet").addEventListener("click",() =>{
  order="title"
  
})
document.getElementById("Popularity").addEventListener("click",() =>{
  order="rating"
})
console.log(order)

//calling serch function
document.getElementById("search").addEventListener("input", () =>{
  debounce()
});
document.querySelector("body").onload=function(){
  debounce()
}
//loader
let loader=document.getElementById("loader");


let id;
let debounce= () =>{
  
        if(id){
          clearTimeout(id);
        }
        id= setTimeout(searchVideos,1000)

}



const   searchVideos= async () =>{
       
   try{
    loader.style.display="block"
   
  let serch_term=  document.getElementById("search").value;
   console.log(serch_term);
   //let API_KEY="AIzaSyDwFpJf8SkXk_xpM0QV4aw1fNIN6mc70Pw";
  let API_KEY= "AIzaSyDo1Rl1okUINs9prQE4G5TeGqsMdumDmaY"
    let responce= await fetch(`https://youtube.googleapis.com/youtube/v3/search?&part=snippet&q=${serch_term}&key=${API_KEY} &maxResults=25&order=${order}`);
    let data=await responce.json();
    let actual_data=data.items;
    loader.style.display="none"
    append(actual_data)
    console.log(actual_data)

   }catch{
    console.log("404 not found")
   }
}


//arr.length=50;
//appending function
const append=(data)=>{
    
  var arr=  []

    document.getElementById("append").innerHTML=null
    data.forEach(({ snippet,id:{videoId} }) => {
        
      let div=  document.createElement("div")

      let title=document.createElement("p");
      title.innerText=snippet.title

      let name=document.createElement("p");
      name.innerText=snippet.channelTitle

      let thumb=document.createElement("img");
      thumb.src=snippet.thumbnails.high.url

      div.append(thumb,name,title)

      document.getElementById("append").append(div);

      //add event handler
      div.onclick=()=>{
        data={
          snippet,
          videoId,
        };
      
        localStorage.setItem("clicked_video",JSON.stringify(data));
        window.location.href="video.html"
        console.log(snippet,videoId)

      }

       //recomondatation data store;
       
       let recomondatation={
        videoId:videoId,
        name:snippet.channelTitle,
        title:snippet.title,
      }
       arr.push(recomondatation);
       console.log(arr);
       localStorage.setItem("my_recomondation",JSON.stringify(arr));

    });
        
}

//sign in page
document.getElementById("signin").addEventListener("click",()=>{
        window.location.href="auth.html"
});

// sign in name
let actul_name=localStorage.getItem("my_name") || "signin";
document.getElementById("signin").innerText=actul_name;
