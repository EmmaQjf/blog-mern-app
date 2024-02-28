
import { useState, useEffect } from 'react'
import Blog from '../../components/Blog/Blog'
import UpdateForm from '../../components/UpdateForm/UpdateForm'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styles from './ShowPage.module.scss'

export default function ShowPage (props){
    // display the individual blog post in all its glory----> Blog Component
    // update the blogPost -----> UpdateForm
    // delete the blog post ----> a wee little button
    const [showUpdate, setShowUpdate] = useState(false) //DISPLAY THE UPDATEFORM
    const [allowChanges, setAllowChanges] = useState(false) //display the buttons 
    const [blog, setBlog] = useState({
        title:'',
        body: '',
        user: ''
    })
    const navigateTo = useNavigate()
    const {id} = useParams()// FE version of req.params
    useEffect(() => {
        const fetchBlog = async () => {
            try {
               const data = await props.getIndividualBlog(id)
               setBlog(data) 
            } catch (error) {
                console.error(error)
            }
        }
        fetchBlog()
    }, [])
    // checking the token & user in localStorage
    useEffect(() => {
        if(localStorage.token && !props.token){
            props.setToken(localStorage.getItem('token'))
        }
        if(localStorage.token && localStorage.user && !props.user){
            props.setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])


    //
    useEffect(() => {
        if(blog && props.user._id === blog.user){
            setAllowChanges(true)
        }
    }, [props.user, blog])



    

    // NEW CODE; READ TWICE ----NAVIGATE
    const handleDelete = async () => {
        try {
            await props.deleteBlog(id, props.token)
            navigateTo('/')
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div>
            <Link to={'/'}>HOME</Link>
            <h1>{blog.title || 'Loading....'}</h1>
            <p>{blog.body || ''}</p>
            { allowChanges?
            <button className={styles.button} onClick={() => setShowUpdate(!showUpdate)}>Reveal Update Form</button>:
            <></>
            }
            {allowChanges && showUpdate ? <UpdateForm id={id} updateBlog={props.updateBlog} setShowUpdate={setShowUpdate} setBlog={setBlog} blog={blog} token={props.token} setToken={props.token}/> : <></>}
            {allowChanges? <button className={styles.button}  onClick={handleDelete}>Delete Blog</button>: <></>}
        </div>
    )
}