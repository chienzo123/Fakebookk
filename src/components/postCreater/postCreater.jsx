import React, {useState, useEffect} from 'react'
import './postCreater.scss'
import { Avatar } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import  firebase from 'firebase/app';
import {datab} from '../../firebase';
import 'firebase/auth';
import 'firebase/database';



function PostCreator(){
    const [input, setInput] = useState('');
    const [img, setImg] = useState(null);
    const [viewImage, setViewImage] = useState('')
    var arr;
    
   
    datab.once('value').then(snapshot => {
       arr = Object.values(snapshot.val()).length;
      })
      
    const user = {
        img : firebase.auth().currentUser.photoURL,
        name : firebase.auth().currentUser.displayName,
        userID : firebase.auth().currentUser.uid
    }
    const storage = firebase.storage();
    
    const handleChangeFile = async (e) => {
        // if(e.target.files[0]){
        //     setImg(e.target.files[0])
        //   }
        //   console.log(img) 
          
         console.log(e.target.files[0].name);
         
            //storage.ref(img.name).put(img);
  
            
             const uploadImage = storage.ref(e.target.files[0].name).put(e.target.files[0]);
         uploadImage.on(
             "state_changed",
             snapshot => {},
             error => {
                 console.log(error);
                
            },
             () => {
                storage.ref(e.target.files[0].name)
                .getDownloadURL()
                .then(url => {
                console.log('$url', url);
                setViewImage(url)
                document.getElementById("Anh").setAttribute("style","display:block !important;")
                });
            }
           )
    }
    
    return(
        <div className="postcreator">
            <div className="postcreator__top">
                <Avatar src={user.img} />
                <form>
                    <input value={input} id="push" onChange={(e)=> setInput(e.target.value)} className="postcreator__input" type="text" placeholder = {`What do your mind, ${user.name}`} />
                </form>
                
            </div>
           
            
            <img src={viewImage} alt="Anh" id="Anh" className="img"/>
            <div className="postcreator__bottom">
            <div className="postcreator__bottom--option">
                <VideocamIcon style={{color: "red"}}/>
                <h3>Live Video</h3>
            </div>
            <div className="postcreator__bottom--option" >
                <PhotoLibraryIcon style={{color: "green"}} />
                <label for="ufile"><h3>Photo/Video</h3></label>
                <input type="file" id="ufile" onChange={handleChangeFile}/>
            </div>
            <div className="postcreator__bottom--option">
                <InsertEmoticonIcon style={{color: "orange"}} />
                <h3>Feeling/Activity</h3>
            </div>
            </div>
            <div className="postcreator__bottom1">
           <button id="posh"  onClick = {() => {
        var date = new Date();
        var connecteData = firebase.database().ref('post');
      
        connecteData.push({
           id: Math.random(),
           userID: user.userID,
            authorName: user.name,
            authorPic: user.img,
            message: input,
            timestamp: date.toDateString(),
            optionalImg:viewImage,
            like: 0
        })
        setInput("");
        document.getElementById("push").value="";
        setViewImage("");
        document.getElementById("Anh").removeAttribute("style","");
        
    } 
    
    }
    
        
        
         className="btn">Post</button>
            </div>
        
             
        </div>
    )
}
export default PostCreator