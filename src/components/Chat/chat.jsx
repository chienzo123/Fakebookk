import React, { useState, useEffect } from 'react'
import './chat.scss'
import firebase from 'firebase/app';
import { datab } from '../../firebase';
import 'firebase/auth';
import 'firebase/database';
import { Avatar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
function Chat() {

    const user = { // lấy ra id ,img ,name hiện tại của người dùng
        id: firebase.auth().currentUser.uid,
        img: firebase.auth().currentUser.photoURL,
        name: firebase.auth().currentUser.displayName
    }
    const [UserID, setUserID] = useState(""); // hàm tạo ra để lưu trữ 
    const [value, setValue] = useState("");
    const [listChat, setListChat] = useState([]);
    const [Check, setCheck] = useState(true);
    const showchat = () => {
        setCheck(!Check); // bật tắt nhiều lần trang 
        if (Check) {
            document.getElementById("chatbutton").setAttribute("style", "max-height: 500px ");
        }
        if (!Check) {
            document.getElementById("chatbutton").removeAttribute("style", "max-height: 500px ");
        }
        let today = new Date(); // lấy thời gian hiện tại
        let hours = today.getHours();
        let minutes = today.getMinutes();
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        let time = hours + ":" + minutes;
        document.getElementById("chat-timestamp").innerHTML = time.toString();
    }

    const sendmsg = () => {
        let fireStore = firebase.database().ref('/Chat');// đường dẫn đến cái dữ liệu của mk , ref lấy cái dl class đó
        let data = {
            UserID: user.id,
            value,
            img: user.img,
            name: user.name
        };
        fireStore.push(data);
        setValue("");
    }
    useEffect(() => {
        // lấy dữ liệu tại đây
        const fireStore = firebase.database().ref('/Chat')
        document.getElementById("textsend").addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("send").click();
            }
        });
        fireStore.on('value', (res) => { //res dl trả về
            const data = res.val();
            let chatList = []; // tạo ra array ảo
            for (let id in data) { // lấy các key tự sinh
                chatList.push({
                    id,
                    value: data[id].value,
                    userID: data[id].UserID,
                    img: data[id].img,
                    name: data[id].name.slice(0, data[id].name.indexOf(" "))

                })
            }
            setListChat(chatList); // set lại giá trị của listchat
        })

    }, [])
    return (

        <div>

            <div className="chat-bar-collapsible">
                <button id="chat-button" type="button" onClick={showchat} className="collapsible active">
                    <Avatar src={user.img} />
                    <p>{user.name}</p>

                </button>

                <div className="content" id="chatbutton" >
                    <div className="full-chat-block">

                        <div className="outer-container">
                            <div className="chat-container">

                                <div id="chatbox" class="chatboxx">
                                    <h5 id="chat-timestamp"></h5>

                                    {
                                        listChat && listChat.map(el => {

                                            if (el.userID == user.id) {
                                                return <p class="userText"><span>{el.value}</span></p>
                                            }
                                            if (el.userID != user.id) {
                                                return <div id="botStarterMessage" className="botText">
                                                    <img src={el.img} className="botText__info" /><p className="botText__name">{el.name}</p><span>{el.value}</span>
                                                </div>
                                            }
                                        })
                                    }
                                </div>
                                <div class="chat-bar-input-block">
                                    <div id="userInput">
                                        <input id="textsend" value={value} onChange={(e) => { setValue(e.target.value) }} className="input-box" type="text" placeholder="Tap 'Enter' to send a message" />
                                        <p></p>
                                    </div>

                                    <div className="chat-bar-icons">
                                        {/* <i id="chat-icon" style={{color: crimson}} className="fa fa-fw fa-heart"
                                    onclick="heartButton()"></i> */}
                                        <button onClick={sendmsg} id="send" ><SendIcon /></button>
                                    </div>
                                </div>

                                <div id="chat-bar-bottom">
                                    <p></p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default Chat