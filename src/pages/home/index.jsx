import React, { useState, useEffect } from 'react';
import './styles.css'
import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState(''); //String vazia
  const [students, setStudens] = useState([]); //Array vazio
  const [user, setUser] = useState({name: '', avatar:''}); //objeto

  function handleAddStudent() {
    if (studentName) {
      const newStudent = {
        name: studentName,
        time: new Date().toLocaleTimeString("pt-br", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      }
      setStudens(prevState => [...prevState, newStudent]);
      document.getElementById('inputName').value = '';
      setStudentName('');
    }
  }

  useEffect(() =>{
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/leonamjop");
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();

  },[]);

  return (
    <div className='container'>

      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='Foto usuário'/>
        </div>
      </header>

      <input
        id='inputName'
        type="text"
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        ))
      }

    </div>
  )
}
