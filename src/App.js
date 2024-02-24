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
            body: JSON.stringify(credentials) // change javascript object to json string
        })
        const data = await response.json() //change raw json data string to javascript object
        // need to know what data is returned back by backend API
        //in this case it is {user, token}
        setUser(data.user)
        setToken(data.token)
        //token is still empty until the function is callded and finished 
        //localstorage only takes in the string. 
        localStorage.setItem('token',data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      } catch(error){
         console.error(error)
      }
       
    }

    const login = async (credentials) => {

        try {
        // https://i.imgur.com/3quZxs4.png
        // Step 1 is complete here once someone fills out the loginForm
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await response.json()
        // Step 3
        const tokenData = data.token 
        localStorage.setItem('token', tokenData)
        setToken(tokenData)
        // the below code is additional to the core features of authentication
        // You need to decide what additional things you would like to accomplish when you
        // set up your stuff
        const userData = data.user
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(userData)
        } catch (error) {
            console.error(error)
        }
        
    }

    const createBlog = async (blogData, token) => {
        // https://i.imgur.com/3quZxs4.png
        // Step 4
        if(!token){
            return
        }
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(blogData)
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error)
        }
    }

// read all blogs
const getAllBlogs = async () => {
    try {
        const response = await fetch('/api/blogs')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

// show a blog 
const getIndividualBlog = async(id) => {
    try {
        const response = await fetch(`/api/blogs/${id}}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

//update blog
const updateBlog = async (NewBlogData, token,id) => {
    // https://i.imgur.com/3quZxs4.png
    // Step 4
    if(!token){
        return
    }
    try {
        const response = await fetch(`/api/blogs/${id}}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(NewBlogData)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

//delete blog
const deleteBlog = async (id, token) => {
    // https://i.imgur.com/3quZxs4.png
    // Step 4
    if(!token){
        return
    }
    try {
        const response = await fetch(`/api/blogs/${id}}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

    return(
        <div className={styles.App}>
            {/*get all the blogs when the home page mounts  */
            /*create a new blog   */}  
         <Routes>
            <Route path = '/' element={<HomePage
             user={user} 
             token={token} 
             setToken={setToken} 
             setUser={setUser} 
             getAllBlogs={getAllBlogs}
            /*get all the blogs when the home page mounts  */
            /*create a new blog   */
            createBlog={createBlog}
            />}/>
            <Route path='/register' element= {<AuthPage 
            setToken={setToken}  
            setUser={setUser} 
            signUp={signUp}
            login={login}/>}/>
            <Route path='/blog' element={<ShowPage 
            user={user} 
            token={token} 
            setToken={setToken}
            getIndividualBlog={getIndividualBlog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}/>}
            />
         </Routes>
        </div>
    )
}