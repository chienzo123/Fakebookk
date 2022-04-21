import React, {Component} from 'react';
import Post from '../post/post'
import {Consumer} from '../context'
export default class Contacts extends Component{
    render(){
        return(
            <Consumer>
                {
                    value => {
                        const{contacts} = value;
                        return(
                            <React.Fragment>
                                {
                                     contacts.length > 0 && 
                                    contacts.map(contact => // để hiển thị lên bài viết (return về mảng mảng, trả về giá trị gì nó sẽ trả về giá trị đó)
                                        <Post
                                        key={contact.id}
                                        id={contact.userID}
                                        authorPic={contact.authorPic}
                                        authorName={contact.authorName}
                                        timestamp = {contact.timestamp}
                                        message={contact.message}
                                        optionalImg={contact.optionalImg}
                                        like={contact.like}
                                        />
                                        )
                                        
                                }
                            </React.Fragment>
                        )
                    }
                }
            </Consumer>
        )
    }
}
