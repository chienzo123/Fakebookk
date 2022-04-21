import React  from 'react'
import '../feed/feed.scss'
import WatchItem from "../watchItem/watchItem"



function Watch(){
    return(
        <div className="feed">
        <WatchItem
        key="01"
        id="v01"
        authorPic= "https://scontent.fhan4-1.fna.fbcdn.net/v/t1.18169-1/cp0/p40x40/20476593_478499732512867_6769935892556117318_n.jpg?_nc_cat=110&ccb=1-4&_nc_sid=7206a8&_nc_ohc=_deBJnuzfLsAX-UODcb&_nc_ht=scontent.fhan4-1.fna&oh=c2787c92500d9967b4ec0ac5f09b3383&oe=613788CE"
        authorName="Hoàng Quyết Chiến"
        timestamp = "Sad day"
        message="Video first"
        optionalvid="https://firebasestorage.googleapis.com/v0/b/fakebook-584d9.appspot.com/o/mov_bbb.mp4?alt=media&token=379db06f-2d51-40a7-bdf1-ab9df09fdbc0"
        like= "0"
        />
        </div>
    )
}
export default Watch