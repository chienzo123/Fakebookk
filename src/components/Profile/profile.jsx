import React, { useState, useEffect, useContext } from 'react'
import './profile.css';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PostCreator from '../postCreater/postCreater';
import 'firebase/auth';
import 'firebase/database';
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';
import Post from '../post/post'
import { UserContext } from '../../App';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

function Profile() {
    const classNamees = useStyles();
    const [user, setUser] = useState({})
    const [isFriend, setisFriend] = useState(false);
    const [isComfirm, setComfirm] = useState(false);
    const [listPost, setListPost] = useState([]);
    let { data, updateListUser } = React.useContext(UserContext)
    let { id } = useParams();
    useEffect(() => {
        let listUser = data
        if (data.length) {
            let user = _.find(listUser, { UserId: id })
            let CurentUser = _.find(listUser, { UserId: firebase.auth().currentUser.uid })
            setUser(user)
            setisFriend(user.friend.includes(firebase.auth().currentUser.uid))
            setComfirm(user.comfirm.includes(firebase.auth().currentUser.uid) || CurentUser.comfirm.includes(user.UserId))
            const fireStore = firebase.database().ref('/post')
            fireStore.on('value', (res) => {
                const data = res.val();
                let postList = [];
                for (let id in data) {
                    postList.push({
                        id,
                        authorPic: data[id].authorPic,
                        authorName: data[id].authorName,
                        timestamp: data[id].timestamp,
                        message: data[id].message,
                        optionalImg: data[id].optionalImg,
                        like: data[id].like,
                        userID: data[id].userID
                    })
                }
                postList = _.filter(postList, { userID: user.UserId })
                setListPost(postList);
            })
        }

    }, [data])
    const addFriend = () => {
        const updates = {};
        const newUser = {
            UserId: user.UserId,
            email: user.email,
            image: user.img,
            name: user.name,
            friend: user.friend,
            comfirm: user.comfirm + firebase.auth().currentUser.uid + ',',
        }
        updates['/User/' + user.id] = newUser;
        firebase.database().ref().update(updates);
    }
    return (
        <div>
            <div className="container_1">
                <div className="container_header">
                    <div className="anhbia">
                        <img src="https://cdn.calltheone.com/public/storage/blog/6/2020/06/02/facebook-should-not-be-a-fakebook-1.jpg" width="100%" height="400px" />
                    </div>
                    <div className="anhdaidien">
                        <img src={user.img} width="168px" height="168px" />
                    </div>
                    <div className="themanhbia">
                        <div className={classNamees.root}>
                            <input
                                accept="image/*"
                                className={classNamees.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="primary" component="span" style={{ backgroundColor: 'white ', color: 'black' }}>
                                    <PhotoCamera /> Th??m ???nh b??a
                                </Button>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="profile">
                    <div className="hoten">
                        <h1>{user.name}</h1>
                    </div>
                    <div className="chinhsua">
                        <a href="#">Ch???nh s???a</a>
                    </div>
                </div>
                <hr className="hr" />
                <div className="container_menu">
                    <div className="menu">
                        <ul>
                            <li><a href="#">B??i vi???t</a></li>
                            <li><a href="#">Gi???i thi???u</a></li>
                            <li><a href="#">B???n b??</a></li>
                            <li><a href="#">???nh</a></li>
                            <li><a href="#">Xem th??m </a></li>
                        </ul>

                    </div>
                    <div className="edit">
                        <div className="edit_p1">
                            <button type="button" className="btn_edit1"><i className="fa fa-pencil" style={{ fontSize: '18px' }}></i>Ch???nh s???a trang c?? nh??n</button>
                        </div>
                        {
                            firebase.auth().currentUser.uid !== id ? isComfirm ? <div className="edit_p2">
                                <button type="button" className="btn_edit2">Ch??? x??c nh???n</button>
                            </div> : !isFriend ? <div className="edit_p2">
                                <button type="button" onClick={() => { addFriend() }} className="btn_edit2">K???t b???n</button>
                            </div> : <div className="edit_p2">
                                <button type="button" className="btn_edit2">B???n b??</button>
                            </div> : ""
                        }

                    </div>
                </div>
            </div>
            <div className="container_2">
                <div className="container_content">
                    <div className="left_content">
                        <div className="profile_content">
                            <div className="profile_title">
                                <h3>Gi???i thi???u</h3>
                                <p>H???c C??ng ngh??? th??ng tin - K13 t???i <a href="#">?????i H???c C??ng Nghi???p H?? N???i</a></p>
                                <p>S???ng t???i <a href="">H?? N???i</a> </p>
                                <p>C?? <a href="#">130 ng?????i</a> theo d??i</p>
                            </div>
                            <div className="edit_profile">
                                <button type="button" className="btn_edit3">Ch???nh s???a chi ti???t</button>
                                <button type="button" className="btn_edit4">Du l???ch</button>
                                <button type="button" className="btn_edit4">B??i l???i</button>
                                <button type="button" className="btn_edit3">Ch???nh s???a s??? th??ch</button>
                                <div className="anhnoibat">
                                    <img src="https://images.geminipremium.com/2021/05/fakebook-censorship-you-can-trust-shirt-Hoodie.jpg" height="140px" width="100%" />
                                    <p>B??? s??u t???p</p>
                                </div>
                                <button type="button" className="btn_edit3">Ch???nh s???a ph???n ????ng ch?? ??</button>
                            </div>
                        </div>
                        <div className="image_content">
                            <div className="image_header">
                                <h3>???nh</h3>
                                <a href="#">Xem t???t c??? ???nh</a>

                            </div>
                            <div className="image_lists">
                                <div className="image_list">
                                    <img src="https://agrace.altervista.org/wp-content/uploads/2018/12/Fakebook.jpg" width="110px" height="110px" />
                                    <img src="https://cdn.boldomatic.com/content/post/S_CmQQ/Fakebook?size=800" width="110px" height="110px" />
                                    <img src="https://cdn.boldomatic.com/content/post/S_CmQQ/Fakebook?size=800" width="110px" height="110px" />
                                </div>
                                <div className="image_list">
                                    <img src="https://cdn.boldomatic.com/content/post/S_CmQQ/Fakebook?size=800" width="110px" height="110px" />
                                    <img src="http://edtimes.in/wp-content/uploads/2014/01/fakebook-pelicula-facebook-1.jpg" width="110px" height="110px" />
                                    <img src="http://edtimes.in/wp-content/uploads/2014/01/fakebook-pelicula-facebook-1.jpg" width="110px" height="110px" />
                                </div>
                                <div className="image_list">
                                    <img src="https://agrace.altervista.org/wp-content/uploads/2018/12/Fakebook.jpg" width="110px" height="110px" />
                                    <img src="https://images.meredpremium.com/2021/05/fakebook-censorship-you-can-trust-shirt-Shirt.jpg" width="110px" height="110px" />
                                    <img src="https://cdn.boldomatic.com/content/post/S_CmQQ/Fakebook?size=800" width="110px" height="110px" />
                                </div>
                            </div>
                        </div>
                        <div className="friend_content">
                            <div className="friend_header">
                                <h3>B???n b??</h3>
                                <a href="#">Xem t???t c??? b???n b??</a>
                            </div>
                            <span>1.1815 ng?????i b???n</span>
                            <div className="friend_lists">
                                <div className="friend_list">
                                    <div className="friend_1">
                                        <img src="https://kenh14cdn.com/203336854389633024/2021/8/19/-16293811480491346790168.jpg" width="105px" height="105px" />
                                        <p>Ros??</p>
                                    </div>
                                    <div className="friend_1">
                                        <img src="https://i.pinimg.com/originals/d8/63/02/d8630214a4890b2bca2b01c549260021.png" width="105px" height="105px" />
                                        <p>Lisa</p>
                                    </div>
                                    <div className="friend_1">
                                        <img src="https://media-cdn.laodong.vn/Storage/NewsPortal/2020/8/19/829150/Jisoo-8.jpg" width="105px" height="105px" />
                                        <p>Jisoo</p>
                                    </div>

                                </div>
                                <div className="friend_list">
                                    <div className="friend_1">
                                        <img src="https://i-ione.vnecdn.net/2020/01/05/567-8782-1578213162.jpg" width="105px" height="105px" />
                                        <p>Chou Tzuyu</p>
                                    </div>
                                    <div className="friend_1">
                                        <img src="https://ruthamcauquan2.info/wp-content/uploads/2021/06/tieu-su-jennie-blackpink-3.jpg" width="105px" height="105px" />
                                        <p>Jennie</p>
                                    </div>
                                    <div className="friend_1">
                                        <img src="https://media-cdn.laodong.vn/Storage/NewsPortal/2020/8/19/829150/Jisoo-8.jpg" width="105px" height="105px" />
                                        <p>Jisoo</p>
                                    </div>

                                </div>
                                <div className="friend_list">
                                    <div className="friend_1">
                                        <img src="https://media-cdn.laodong.vn/Storage/NewsPortal/2020/8/19/829150/Jisoo-8.jpg" width="105px" height="105px" />
                                        <p>Jisoo</p>
                                    </div>
                                    <div className="friend_1">
                                        <img src="https://kenh14cdn.com/203336854389633024/2021/8/19/-16293811480491346790168.jpg" width="105px" height="105px" />
                                        <p>Ros??</p>
                                    </div>
                                    <div className="friend_1">
                                        <img src="https://media.karousell.com/media/photos/products/2021/5/22/wtb_tuzyu_pcs_1621690940_01bb172d_progressive.jpg" width="105px" height="105px" />
                                        <p>Tzuyu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right_content">
                        {
                            firebase.auth().currentUser.uid === user.UserId ?
                                <div className="post_creator">
                                    <PostCreator />
                                </div> : ""
                        }
                        <div className="post_profile">
                            {
                                listPost.length && listPost.map(contact =>
                                    <Post
                                        key={contact.id}
                                        id={contact.id}
                                        userID={contact.userID}
                                        authorPic={contact.authorPic}
                                        authorName={contact.authorName}
                                        timestamp={contact.timestamp}
                                        message={contact.message}
                                        optionalImg={contact.optionalImg}
                                        like={contact.like}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Profile;