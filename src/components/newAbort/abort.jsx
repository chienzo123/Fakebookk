import React, {useState, useEffect} from 'react'
import './abort.scss'
import firebase from 'firebase';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
function AbortNew () {
    const [userCurent, setUser] = useState({});
    const [comfirm, setComfirm] = useState([]);
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
           let user = _.find(listUser, {UserId: firebase.auth().currentUser.uid} )
           setUser(user)
           let listSplit = user.comfirm ? user.comfirm.split(',') : [];
           listSplit.pop();
           let listCf =  listSplit.map(item => _.find(listUser, {UserId: item}))
           setComfirm(listCf)
        })
    }, [])
    const comfirmCf = (id) => {
        const updates = {};
        const updates2 = {};
        const user = _.find(comfirm, {UserId: id});
        let newComfirm = comfirm.filter(item => item.UserId !== id)
        let newCf = "";
        newComfirm.forEach(ele => {
            newCf = newCf + ele.UserId +",";
        })
        const newUser = {
            UserId: user.UserId,
            email: user.email,
            image: user.img,
            name: user.name,
            friend: user.friend + firebase.auth().currentUser.uid + ",",
            comfirm: user.comfirm,
        }
        const newUser2 = {
            UserId: userCurent.UserId,
            email: userCurent.email,
            image: userCurent.img,
            name: userCurent.name,
            friend: userCurent.friend + id + ",",
            comfirm: newCf,
        }
        
        updates['/User/'+ user.id] = newUser;
        updates2['/User/'+ userCurent.id] = newUser2;
        firebase.database().ref().update(updates);
        firebase.database().ref().update(updates2);
    }   
    const deteleCf = (id) => {
        const updates = {};
        let newComfirm = comfirm.filter(item => item.UserId !== id)
        let newCf = "";
        newComfirm.forEach(ele => {
            newCf = newCf + ele.UserId +",";
        })
        const newUser = {
            UserId: userCurent.UserId,
            email: userCurent.email,
            image: userCurent.img,
            name: userCurent.name,
            friend: userCurent.friend,
            comfirm: newCf,
        }
        updates['/User/'+ userCurent.id] = newUser;
        firebase.database().ref().update(updates);
    }
    return(
        <div>
            {
                comfirm.length > 0 ? comfirm.map(item => {
                    return  <button className="info__user">
                    <div className="inix">
                        <Avatar alt="Cindy Baker" src={item.img} />
                    </div>
                    <div className="text-user">
                        <div>
                            <strong>{item.name}</strong>
                            <button onClick={() => {comfirmCf(item.UserId)}}>Xác nhận</button>
                            <button onClick={() => {deteleCf(item.UserId)}}>Xóa</button>
                        </div>
                    </div>
                </button>
                }) : <div>Bạn không có lời mời kết bạn nào</div>
            }
        </div>
    )
}
export default AbortNew;