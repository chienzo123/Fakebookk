import React, {  useEffect, useState } from 'react';
import './App.sass';
import Header from './components/header/hader';
import LeftSidebar from './components/leftSlidebar/leftSlidebar';
import Feed from './components/feed/feed';
import RightSidebar from './components/rightSlidebar/rightSlidebar';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { uiConfig } from './firebase';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Watch from "./components/watch/watch";
import Chat from './components/Chat/chat';
import Profile from './components/Profile/profile';
import _ from 'lodash';
export const UserContext = React.createContext(null);
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  const [listUser, setListUser] = useState([]);
  let fireStore = firebase.database().ref('/User');
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      if (!!user) {
        fireStore.on('value', (res) => {
          const data = res.val();
          let listUsers = [];
          for (let id in data) {
            listUsers.push({
              id,
              friend: data[id].friend,
              UserId: data[id].UserId,
              img: data[id].image,
              name: data[id].name,
              email: data[id].email,
              comfirm: data[id].comfirm
            })
          }
          setListUser(listUsers)
          let userCurrent = _.find(listUsers, { email: firebase.auth().currentUser.email })
          if (!userCurrent) {
            fireStore.push({
              image: firebase.auth().currentUser.photoURL,
              UserId: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
              name: firebase.auth().currentUser.displayName,
              friend: "",
              comfirm: "",
            })
          }
        })
      }
    });
    return () => unregisterAuthObserver();
  }, []);
  if (!isSignedIn) {
    return (
      <div>
        <div className="login">
          <div className="login__logo">
            <img src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512" alt="" />
            <img src="https://i.postimg.cc/BQ0LGKgT/Fakebook-Logo.png" alt="" />
          </div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="mainwrp app">
          <UserContext.Provider value={{ data: listUser, updateListUser: setListUser }}>
          <Router basename={process.env.PUBLIC_URL}>
            <Header />
            <Switch>
              <Route exact path="/profile/:id" component={Profile} />
              {<div className="app__body">
                <LeftSidebar />
                <Switch>
                  <Route exact path="/" component={Feed} />
                  <Route exact path="/watch" component={Watch} />
                </Switch>
                <RightSidebar />
                <Chat />
                </div>}
            </Switch>
            </Router>
            </UserContext.Provider>
       
      </div>
    );
  }
}

export default App;
