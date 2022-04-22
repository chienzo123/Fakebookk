import React, { Component, useEffect, useState, useContext } from "react";
import './feed.scss'
import StoryReel from '../storyRell/storyRell'
import PostCreator from '../postCreater/postCreater'
import Post from '../post/post'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
export const postListContext = React.createContext();
function Feed() {
    const [listPost, setListPost] = useState([]);
    useEffect(() => {
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
            setListPost(postList.reverse());
        })
    }, [])
    return (
        <div className="feed">
            <StoryReel />
            <postListContext.Provider value={{ data: listPost, updateListPost: setListPost }}>
                <PostCreator />
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
            </postListContext.Provider>
        </div>
    )
}
export default Feed