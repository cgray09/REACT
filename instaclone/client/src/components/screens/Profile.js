import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

const Profile  = () => {
    
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [data,setData] = useState([])
    const [mypics,setPics] = useState([])

    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    },[data])
    
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","cgray009")
        fetch("https://api.cloudinary.com/v1_1/cgray009/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type": "application/json",
                   "Authorization": "Bearer " + localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic}))
               dispatch({type: "UPDATEPIC", payload: result.pic})
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
        
    },[image])
    
    const updatePhoto = (file)=>{
        setImage(file)
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
        
        
    }

   return (
       <div className="one">
           <div className="two">
            <div className="three">
               <div>
                   <img className="four" 
                   src={state?state.pic:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div className="five" >
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field six" >
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
               {
                   mypics.map(item=>{
                       return(
                           <div>
                               <img key={item._id} className="item" src={item.photo} alt={item.title}/> 
                               <i className="material-icons hard" 
                                    onClick={()=>deletePost(item._id)}>delete</i> 
                            </div>
                       )
                   })
               }

           
           </div>
       </div>
   )
}


export default Profile
