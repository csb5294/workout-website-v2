import React, {useState, useEffect} from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import axios from 'axios'


const UpdateUser = () => {

    const {id} = useParams()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/' + id)
        .then(result => {console.log(result)
            setUsername(result.data.username)
            setPassword(result.data.password)
        })
        .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault()
        axios.put("http://localhost:3001/updateUser/" + id, {username, password})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Username</label>
                        <input type='text' placeholder='Enter Username' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Password</label>
                        <input type='text' placeholder='Enter Password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <button className='btn btn-success' onClick={Update}>Update</button>
                </form>
            </div>
        </div>
      )
}

export default UpdateUser