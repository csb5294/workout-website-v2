import {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateUser from './CreateUser'
import Login from './Login'

function App() {

  const [users, setUsers] = useState([])
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
    .then((users) => {
      setUsers(users.data)
    }).catch(err => console.log(err))
  }, [])

  const Submit = () => {
    axios.post('http://localhost:3001/createUser', {username, password})
    .then((users) => {
      console.log(users)
    }).catch(err => console.log(err))
  }

  // return (
  //   <div className='center'>
  //     <h2>First MERN(Mongo, Express, React, Node) App</h2>
  //     {
  //       users.map(user => {
  //         return <div>
  //           <h3>{user.username}</h3>
  //           <h3>{user.password}</h3>
  //         </div>
  //       })
  //     }
  //     <br />
  //     <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
  //     <input type="text" onChange={(e) => setPassword(e.target.value)}></input>
  //     <button onClick={Submit}>Create User</button>
  //   </div>
  // );

  // return (
  //   <div>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path='/' element={<Users />}></Route>
  //         <Route path='/create' element={<CreateUser />}></Route>
  //         <Route path='/update/:id' element={<UpdateUser />}></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/createUser', {username, email, password})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/createUser' element={<CreateUser/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App;
