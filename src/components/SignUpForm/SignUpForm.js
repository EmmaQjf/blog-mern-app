import {useState} from 'react'
import styles from'./SignUpForm.module.scss'

export default function SignUpForm (props) {
    const [credentials, setCredentials] = useState({
        name: '',
        email:'',
        password: ''
    })
    const handleCredentails =(e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <>
        <h2 className = {styles.heading}>This is a signup form Below</h2>
        <form className = {styles.form}
        onSubmit={(e)=> {
            e.preventDefault()
            props.signUp(credentials)
        }}
        >
            <input placeholder='name' type='text' name='name' value={credentials.name}
            onChange={handleCredentails}/>
            <input placeholder='email' type='text' name='email' value={credentials.email}
            onChange={handleCredentails}/>
            <input placeholder='password' type='password' name='password' value={credentials.password}
            onChange={handleCredentails}/>
            <input type='submit' value='submit'/>
        </form>
        </>
    )
}