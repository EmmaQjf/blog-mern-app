import styles from './UpdateForm.module.scss'

export default function UpdateForm(props){

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await props.updateBlog(props.blog, props.token, props.id)
            props.setShowUpdate(false)
           // await props.createBlog(formData, localStorage.token)
           //take the user to the showpage
        } catch(error){
            console.error(error)
        }
    }

    const handleChange=(e) => {
        props.setBlog({...props.blog, [e.target.name]: e.target.value})

    }
    return (
        <>
        <h1>Update info</h1>
        <form  className={styles.form}
        onSubmit={handleSubmit}>
            <input className={styles.input} type='text' placeholder='title' name='title' value={props.blog.title} onChange={handleChange}/>
            <input className={styles.input} type='text' placeholder='body' name='body' value={props.blog.body} onChange={handleChange}/>
            <input className={styles.button} type='submit'  value='Submit Update Data'/>
        </form>
        </>
    )
}