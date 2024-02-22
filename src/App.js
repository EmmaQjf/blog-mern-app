import {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ShowPage from './pages/ShowPage/ShowPage'
import styles from './App.module.scss'

export default function App(){

    const [user, setUser] = useState(null) // user is an object
    const [token, setToken] = useState('') // token is a string 

    const signUp = async(credentials) => {
        // very much like postman 
      try {
        const response = await fetch('/api/users/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //sent json file
            },
            body: json.stringfy(credentials) // change javascript object to json string
        })
        const data = await response.json() //change raw json data string to javascript object
        // need to know what data is returned back by backend API
        //in this case it is {user, token}
        setUser(data.user)
        setToken(data.token)
        //token is still empty until the function is callded and finished 
        localStorage.setItem('token',data.token)
      } catch(error){
         console.error(error)
      }
       
    }
    return(
        <div className={styles.App}>
         <Routes>
            <Route path = '/' element={<HomePage user={user} token={token} setToken={setToken} />}/>
            <Route path='/register' element= {<AuthPage setToken={setToken}  setUser={setUser} signUp={signUp}/>}/>
            <Route path='/blog' element={<ShowPage user={user} token={token} setToken={setToken}/>}/>
         </Routes>
        </div>
    )
}