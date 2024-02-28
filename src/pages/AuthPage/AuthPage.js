import { useState } from 'react'

import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import styles from './AuthPage.module.scss'

export default function AuthPage(
    props
){
    const[showLogin, setShowLogin]= useState(true)

    return(
        <>
        <button className={styles.button} onClick={(e)=> setShowLogin(!showLogin)}>
            {showLogin? 'Do not have an account? Please click here to create an account': 'Already have an account.Please click here to login'}
        </button>
        {
            showLogin? 
             <LoginForm login={props.login}/>
             :<SignUpForm signUp={props.signUp}/>
        }
        
        </>
    )
}