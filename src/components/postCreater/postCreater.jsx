import React, { useState, useContext } from 'react'
import './postCreater.scss'
import { Avatar } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import firebase from 'firebase/app';
import { datab } from '../../firebase';
import 'firebase/auth';
import 'firebase/database';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function PostCreator() {
    const classes = useStyles();
    const [input, setInput] = useState('');
    const [viewImage, setViewImage] = useState('')
    const [loading, setLoading] = useState(false)
    var arr;
    datab.once('value').then(snapshot => {
        arr = Object.values(snapshot.val()).length;
    })
    const user = {
        img: firebase.auth().currentUser.photoURL,
        name: firebase.auth().currentUser.displayName,
        userID: firebase.auth().currentUser.uid
    }
    const storage = firebase.storage();

    const handleChangeFile = async (e) => {
        setLoading(true)
        const uploadImage = storage.ref(e.target.files[0].name).put(e.target.files[0]);
        uploadImage.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                storage.ref(e.target.files[0].name)
                    .getDownloadURL()
                    .then(url => {
                        setViewImage(url)
                        document.getElementById("Anh").setAttribute("style", "display:block !important;")
                    });
                setLoading(false)
            }
        )
    }

    return (
        <div className="postcreator">
            <div className="postcreator__top">
                <Avatar src={user.img} />
                <form>
                    <input value={input} id="push" onChange={(e) => setInput(e.target.value)} className="postcreator__input" type="text" placeholder={`What do your mind, ${user.name}`} />
                </form>
            </div>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <img src={viewImage} alt="Anh" id="Anh" className="img" />
            <div className="postcreator__bottom">
                <div className="postcreator__bottom--option">
                    <VideocamIcon style={{ color: "red" }} />
                    <h3>Live Video</h3>
                </div>
                <div className="postcreator__bottom--option" >
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <label for="ufile"><h3>Photo/Video</h3></label>
                    <input type="file" id="ufile" onChange={handleChangeFile} />
                </div>
                <div className="postcreator__bottom--option">
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
            <div className="postcreator__bottom1">
                <button id="posh" onClick={() => {
                    setLoading(true)
                    var date = new Date();
                    var connecteData = firebase.database().ref('post');
                    let userNew = {
                        userID: user.userID,
                        authorName: user.name,
                        authorPic: user.img,
                        message: input,
                        timestamp: date.toDateString(),
                        optionalImg: viewImage,
                        like: 0
                    }
                    connecteData.push(userNew)
                    setInput("");
                    document.getElementById("push").value = "";
                    setViewImage("");
                    document.getElementById("Anh").removeAttribute("style", "");
                    setTimeout(() => {
                        setLoading(false)
                    }, 2000)
                }}
                    className="btn">Post</button>
            </div>
        </div>
    )
}
export default PostCreator