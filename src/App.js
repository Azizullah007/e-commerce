import React from 'react';

import './App.css';

import {Switch, Route} from 'react-router-dom'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header-component'
import SignInAndSignUpPage from './pages/signIn-and-signUp/signIn-and-signUp.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      currentUser: null
    }
  }

  unsebscribeFromAuth = null

  componentDidMount(){
    this.unsebscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await  createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot =>{
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          })

          console.log(this.state)
        })
      }

      this.setState({currentUser: userAuth})
    })
  }

  componentWillUnmount(){
    this.unsebscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
