import React, {Component} from 'react';
import {datab} from '../firebase';
const Context = React.createContext();
const reduce = (state, action) => {
    switch (action.type) {
        // case 'DELETE_CONTACT':
        //     return {
        //         ...state,
        //         contacts: state.contacts.filter(
        //             contact => contact.id !== action.payload.id
        //         ),
        //         loading: action.payload.loadingInternal
        //     }
        // case 'ADD_CONTACT':
        //     return{
        //         ...state,
        //         contacts: [action.payload, 
        //         ...state.contacts
        //         ]
        //     }
        // case 'DETAILS_CONTACT':
        //     return{
        //         ...state,
        //         ...state.contacts
        //     }
        // case 'EDIT_CONTACT':
        //     return{
        //         ...state,
        //         contacts: state.contacts.map(contact => 
        //             contact.id === action.payload.id ? (contact = action.payload) : contact
        //             )
        //     }

        default:
                return state; 
    }
}

export class Provider extends Component{
    state = { // để lưu các bài viết
        contacts: [
        ],
        dispatch: action => this.setState(state => reduce(state, action))
}
async componentDidMount(){ // chạy hàm đầu tiên khi trang mở 
    
 datab.once('value').then(snapshot => {
    this.setState({
        contacts: Object.values(snapshot.val())
    })
  })


}
componentDidUpdate(){ // sau khi render đã cập nhật
    datab.once('value').then(snapshot => { 
        this.setState({
            contacts: Object.values(snapshot.val()) 
        })
      })
}
render(){
    return (
        <Context.Provider value = {this.state}>
            {
                this.props.children // prop để dẩy thg con
            }
        </Context.Provider>
    )
        }
    }
export const Consumer = Context.Consumer;