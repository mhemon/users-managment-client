import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState([])

  useEffect( () => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUser(data))
  }, [])

  const handleSubmitBtn = (event) => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const age = parseInt(form.age.value)
    const occupation = form.occupation.value

    const users = {name, age, occupation}
    console.log(users);

    fetch('http://localhost:5000/users',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(users)
    })
    .then(res => res.json())
    .then(data => {
      const newUser = [...user, data]
      setUser(newUser)
      form.reset()
    })

  }

  return (
    <>
      <h3>Total number of users:- {user.length}</h3>


      <form onSubmit={handleSubmitBtn}>
          <input type="text" name="name" id="name" placeholder='name'/>
          <br />
          <input type="number" name="age" id="age" placeholder='age'/>
          <br />
          <input type="text" name="occupation" id="occupation" placeholder='occupation'/>
          <br />
          <input type="submit" value="Send" />
      </form>

      {
        user.map(u => <p style={{border:'2px solid gray', padding: '5px'}}>{u.name} <br /> Age: {u.age} <br /> Occupation: {u.occupation}</p>)
      }
    </>
  )
}

export default App
