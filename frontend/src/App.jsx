import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // 백엔드에서 데이터 가져오기
  const fetchTodos = async () => {
    const res = await axios.get('/api/todos')
    setTodos(res.data)
  }

  useEffect(() => { fetchTodos() }, [])

  // 할 일 추가하기
  const addTodo = async () => {
    if (!input) return
    await axios.post('http://localhost:5000/api/todos', { title: input })
    setInput('')
    fetchTodos()
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>My Todo List</h1>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>
      
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ margin: '10px 0', borderBottom: '1px solid #eee' }}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App