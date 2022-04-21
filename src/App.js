import React, { Fragment, useEffect, useState } from 'react';
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

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
  let fireStore = firebase.database().ref('/User');
  console.log(fireStore);
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
      if (!!user) {
        fireStore.on('value', (res) => { //res dl trả về
          const data = res.val();
          let listUser = [];
          for (let id in data) { // lấy các key tự sinh
            listUser.push({
              id,
              UserID: data[id].UserID,
              name: data[id].name,
              email: data[id].email
            })
          }
          let userCurrent = _.find(listUser, { email: firebase.auth().currentUser.email })
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
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
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
        <Fragment>
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
        </Fragment>

      </div>
    );
  }
  // vào đường dẫn là localhost vào thẳng Feed/

}

export default App;
