import React, {Component} from 'react';
import Post from '../post/post'
import {Consumer} from '../context'
import 'firebase/auth';
import 'firebase/database';




export default class Contactss extends Component{
    
    render(){
        return(
            <Consumer>
                {
                    value => {
                        const{contacts} = value;
                        return(
                            <React.Fragment>
                                {
                                    
                                    contacts.length > 0 && contacts.filter(contact => 
                                    contact.userID === this.props.id
                                        ).map(contacts => <Post
                                            key={contacts.id}
                                            id={contacts.id}
                                            userID={contacts.userID}
                                            authorPic={contacts.authorPic}
                                            authorName={contacts.authorName}
                                            timestamp = {contacts.timestamp}
                                            message={contacts.message}
                                            optionalImg={contacts.optionalImg}
                                            like={contacts.like}
                                            /> )
                                }
                            </React.Fragment>
                        )
                    }
                }
            </Consumer>
        )
    }
}
