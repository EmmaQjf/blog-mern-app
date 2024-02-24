import {useState} from 'react'
import styles from './LoginForm.module.scss'

export default function LoginForm (props) {
    const[credentials, setCredentials] = useState({
        email:'',
        password: ''
    })

    const handleCredentails = (e)=> {
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    return (
        <>
        <h2 className={styles.heading}>This is a login form</h2>
        <form  className={styles.form}
        onSubmit= {(e)=> {
            e.preventDefault()
            props.login(credentials)
        }}>
            <input type="text" value={credentials.email} placeholder='email' name='email'
            onChange={handleCredentails}/>
             <input type="text" value={credentials.password} placeholder='password' name='password'
            onChange={handleCredentails}/>
             <input type="submit" value='submit'  />
        </form>
        </>
    )
}


// import { useState } from 'react'
// import styles from './LoginForm.module.scss'

// export default function LoginForm (props){
//     const [credentials, setCredentials] = useState({
//         email: '',
//         password: ''
//     })

//     const handleChange = (e) => {
//         setCredentials({...credentials, [e.target.name]: e.target.value })
//     }
//     return(
//         <>
//             <h2 className={styles.heading}>Log In Below</h2>
//             <form 
//                 className={styles.form} 
//                 onSubmit={(e) => {
//                 e.preventDefault()
//                 props.login(credentials)
//             }}>
//                 <input type='text' name="email" onChange={handleChange} value={credentials.email} />
//                 <input type='password' name="password" onChange={handleChange} value={credentials.password} />
//                 <input type="submit" value="Submit" />
//             </form>

//         </>
//     )
//    } 
