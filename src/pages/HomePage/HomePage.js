import {useState, useEffect} from 'react'
import Blogs from '../../components/Blogs/Blogs'
import CreateForm from '../../components/createForm/createForm'


export default function HomePage (props){
    const [blogs, setBlogs] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    // blogs

    //BEWARE OF THE FOLLWOING CODE. getAllBlogs return a promise.
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
               const data = await props.getAllBlogs()
               setBlogs(data) 
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlogs()
    }, [])
    // checking the token & user in localStorage

    //READ THE CODE BELOW AGAIN TO FULLY UNDERSTAND IT AND CAN USE IT 
    useEffect(() => {
        // props.token check see if the user refresh the page everytime, send the token back to the user
        //!props.token means the token is valid and there is a token instead of token being empty string.
        if(localStorage.token && !props.token){
            props.setToken(localStorage.getItem('token'))
            setShowCreate(true)
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])



    //NEW GOT TO SHOW THE CREATE FORM
    useEffect(() => {
       setShowCreate(true)
    },[props.user])

    return(
        <div>
            <h1>Welcome to the Liberty Blog</h1>
            { showCreate? <CreateForm user={props.user} 
            token={props.token}
            createBlog={props.createBlog}/> : <></> }
            { blogs.length? <Blogs blogs={blogs}/> : 'No blogs yet' }
        </div>
    )
}