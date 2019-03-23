import React from 'react';
import {Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';


export default () => {
    return (
        <>
            <Route exact path='/' component={Welcome} />
            <Route path='/signup' component={Signup} />
            <Route path='/signout' component={Signout} />
            <Route path='/feature' component={Feature} />
            <Route path='/signin' component={Signin} />
        </>
    )
}