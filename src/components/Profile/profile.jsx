import React, {useState, useEffect} from 'react'
 import './profile.css';
import _ from 'lodash';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PostCreator from '../postCreater/postCreater';
import Contactss from './Contactss';
import {Provider} from '../context.jsx'
import { useParams } from "react-router-dom";
import firebase from 'firebase/app';


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
    let { id } = useParams();
    useEffect(() => {
        // lấy dữ liệu tại đây
        const fireStore = firebase.database().ref('/User')
        fireStore.on('value', (res) => { //res dl trả về
            let listUser = [];
            const data = res.val();
            for (let id in data) { // lấy các key tự sinh
                listUser.push({
                    id,
                    friend: data[id].friend,
                    UserId: data[id].UserId,
                    img: data[id].image,
                    name: data[id].name,
                    email: data[id].email,
                    comfirm: data[id].comfirm
                })
            }
           let user = _.find(listUser, {UserId: id} )
           let CurentUser = _.find(listUser, {UserId: firebase.auth().currentUser.uid} )
           setUser(user)
           setisFriend(user.friend.includes(firebase.auth().currentUser.uid))
           setComfirm(user.comfirm.includes(firebase.auth().currentUser.uid) || CurentUser.comfirm.includes(user.UserId))
        })
    }, [])
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
        updates['/User/'+ user.id] = newUser;
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
                                    <PhotoCamera /> Thêm ảnh bìa
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
                        <a href="#">Chỉnh sửa</a>
                    </div>
                </div>
                <hr className="hr" />
                <div className="container_menu">
                    <div className="menu">
                        <ul>
                            <li><a href="#">Bài viết</a></li>
                            <li><a href="#">Giới thiệu</a></li>
                            <li><a href="#">Bạn bè</a></li>
                            <li><a href="#">Ảnh</a></li>
                            <li><a href="#">Xem thêm </a></li>
                        </ul>

                    </div>
                    <div className="edit">
                        <div className="edit_p1">
                            <button type="button" className="btn_edit1"><i className="fa fa-pencil" style={{ fontSize: '18px' }}></i>Chỉnh sửa trang cá nhân</button>
                        </div>
                        {
                           firebase.auth().currentUser.uid !== id ? isComfirm ? <div className="edit_p2">
                           <button type="button"  className="btn_edit2">Chờ xác nhận</button>
                           </div> :  !isFriend ? <div className="edit_p2">
                            <button type="button" onClick={() =>{ addFriend() } } className="btn_edit2">Kết bạn</button>
                            </div> : <div className="edit_p2">
                            <button type="button"  className="btn_edit2">Bạn bè</button>
                            </div>  : ""
                        }
                        
                    </div>
                </div>
            </div>
            <div className="container_2">
                <div className="container_content">
                    <div className="left_content">
                        <div className="profile_content">
                            <div className="profile_title">
                                <h3>Giới thiệu</h3>
                                <p>Học Công nghệ thông tin - K13 tại <a href="#">Đại Học Công Nghiệp Hà Nội</a></p>
                                <p>Sống tại <a href="">Hà Nội</a> </p>
                                <p>Có <a href="#">130 người</a> theo dõi</p>
                            </div>
                            <div className="edit_profile">
                                <button type="button" className="btn_edit3">Chỉnh sửa chi tiết</button>
                                <button type="button" className="btn_edit4">Du lịch</button>
                                <button type="button" className="btn_edit4">Bơi lội</button>
                                <button type="button" className="btn_edit3">Chỉnh sửa sở thích</button>
                                <div className="anhnoibat">
                                    <img src="https://images.geminipremium.com/2021/05/fakebook-censorship-you-can-trust-shirt-Hoodie.jpg" height="140px" width="100%" />
                                    <p>Bộ sưu tập</p>
                                </div>
                                <button type="button" className="btn_edit3">Chỉnh sửa phần đáng chú ý</button>
                            </div>
                        </div>
                        <div className="image_content">
                            <div className="image_header">
                                <h3>Ảnh</h3>
                                <a href="#">Xem tất cả ảnh</a>

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
                                <h3>Bạn bè</h3>
                                <a href="#">Xem tất cả bạn bè</a>
                            </div>
                            <span>1.1815 người bạn</span>
                            <div className="friend_lists">
                                <div className="friend_list">
                                    <div className="friend_1">
                                        <img src="https://kenh14cdn.com/203336854389633024/2021/8/19/-16293811480491346790168.jpg" width="105px" height="105px" />
                                        <p>Rosé</p>
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
                                        <p>Rosé</p>
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
                            <Provider>
                                <Contactss id = {id}/>
                            </Provider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Profile;