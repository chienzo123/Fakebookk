import React from 'react'
import Story from '../story/story'
import './storyRell.scss';
import AddStory from '../addStories/addStories';
import firebase from 'firebase';



function StoryReel(){
    const user = {
        img : firebase.auth().currentUser.photoURL,
        name : firebase.auth().currentUser.displayName
    }
    return (
        <div className="stories">
            <AddStory userAvatar={user.img} />
           
            <Story image="https://images.pexels.com/photos/4873818/pexels-photo-4873818.jpeg" authorPic="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.18169-1/cp0/p40x40/20476593_478499732512867_6769935892556117318_n.jpg?_nc_cat=110&ccb=1-4&_nc_sid=7206a8&_nc_ohc=_deBJnuzfLsAX-UODcb&_nc_ht=scontent.fhan4-1.fna&oh=c2787c92500d9967b4ec0ac5f09b3383&oe=613788CE" authorName="Đăng Quý" />
            <Story image="https://images.pexels.com/photos/620334/pexels-photo-620334.jpeg" authorPic="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-1/cp0/c0.13.40.40a/p40x40/149384912_2828252397443927_4994769497959471938_n.jpg?_nc_cat=107&ccb=1-4&_nc_sid=7206a8&_nc_ohc=a4j_ezkEV3IAX8eD8K9&_nc_ht=scontent.fhan3-2.fna&oh=9028e6ee955872d87c341d25038d26b0&oe=61394B1F" authorName="Marry Nguyễn" />
            <Story image="https://images.pexels.com/photos/5198758/pexels-photo-5198758.jpeg" authorPic="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/211279972_937962226772378_8184381366584475872_n.jpg?_nc_cat=106&ccb=1-4&_nc_sid=7206a8&_nc_ohc=av1fLzZPUwIAX-DYh9o&_nc_ht=scontent.fhan3-1.fna&oh=8d30760354cc2b18b3e03d3d8b4f67e7&oe=613B05B8" authorName="Lê Tùng" />
            <Story image="https://images.pexels.com/photos/2923156/pexels-photo-2923156.jpeg" authorPic="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/85195722_1607299562757253_7504790536067219456_n.jpg?_nc_cat=104&ccb=1-4&_nc_sid=7206a8&_nc_ohc=AfNVi9bOx50AX_8sjMO&_nc_ht=scontent.fhan4-1.fna&oh=130da9a63775941b6754f49b4e3e855a&oe=61383A29" authorName="Ngọc Ánh" />
            <Story image="https://images.pexels.com/photos/620334/pexels-photo-620334.jpeg" authorPic="https://scontent.fhan4-1.fna.fbcdn.net/v/t1.6435-1/cp0/p40x40/186482641_1332682270465732_4275151759233155273_n.jpg?_nc_cat=105&ccb=1-4&_nc_sid=7206a8&_nc_ohc=D8b5b4YbcLUAX-sr1uJ&_nc_ht=scontent.fhan4-1.fna&oh=aed8743a118dba1b0731d6d0f4f0e886&oe=61383EEA" authorName="Hữu Đạt" />
        </div>
    )
}
export default StoryReel