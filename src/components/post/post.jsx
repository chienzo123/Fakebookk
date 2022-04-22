import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlinedIcon from '@material-ui/icons/ChatBubbleOutlined';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton } from '@material-ui/core';
import './post.scss'
import firebase from 'firebase/app';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


function Post({ authorPic, authorName, timestamp, message, optionalImg, like, id, userID }) {
    const [check, setCheck] = useState(true);
    const [pub, setPub] = useState(true);
    const currentUser = {
        id: firebase.auth().currentUser.uid
    }
    return (

        <div className="post">
            <div className="post__top">
                <div className="post__top--user">
                    <Avatar src={authorPic} className="post__avatar" />
                    <div className="post__info">
                        <Link to={`/profile/${userID}`}><h3>{authorName}</h3></Link>
                        <p>{timestamp}</p>
                    </div>
                </div>
                <div className="post__select" >
                    <IconButton onClick={() => {
                        setPub(!pub);
                        if (pub)
                            document.getElementById("s" + id).setAttribute("style", "display: block !important;")
                        if (!pub)
                            document.getElementById("s" + id).removeAttribute("style", "display: block !impotant; ")
                    }}>
                        <MoreHorizIcon />
                    </IconButton>
                </div>
                <div className="post__select--option" id={`s${id}`}>
                    <button className="post1">
                        <p>
                            Sửa
                        </p>
                    </button>
                    <hr />
                    <button className="post2" onClick={async () => {
                        if (userID !== currentUser.id) {
                            console.log('cant delete');
                        } else {
                            const connecteData = firebase.database().ref(`post/${id}`);
                            let res = await connecteData.remove();
                        }

                    }}>
                        <p>
                            Xóa
                        </p>
                    </button>
                </div>

            </div>
            <div className="post__bottom">
                <p>{message}</p>
            </div>
            <div className="post__media">
                <img src={optionalImg} className="post__media--img" alt="" />

            </div>
            <p className="like" id={`1${id}`}>{like} người khác</p>
            <div className="post__options">
                <div className="post__options--option " id={`${id}`} onClick={() => {

                    setCheck(!check)
                    if (check)
                        document.getElementById(id).setAttribute("style", "color:blue")
                    document.getElementById("1" + id).innerHTML = "Bạn và " + like + " người khác";
                    if (!check) {
                        document.getElementById(id).removeAttribute("style")
                        document.getElementById("1" + id).innerHTML = "" + like + " người khác";
                    }
                    console.log(check);
                }

                }>
                    <ThumbUpIcon />
                    <p>Like</p>
                </div>



                <div className="post__options--option">
                    <ChatBubbleOutlinedIcon />
                    <p>Comment</p>
                </div>
                <div className="post__options--option">
                    <NearMeIcon />
                    <p>Share</p>
                </div>
                <div className="post__options--option nomob">
                    <AccountCircleIcon />
                    <ExpandMoreIcon />
                </div>
            </div>
        </div>


    )
}

export default Post