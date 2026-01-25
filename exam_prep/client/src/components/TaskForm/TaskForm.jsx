import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createTask } from '../../stores/actions/task-actions'

// selectors
const userIdSelector = state => state.user.data.id

const TaskForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const userId = useSelector(userIdSelector)

  const handleCreate = async () => {
    const action = await createTask(userId, params.pid, { title, description })
    dispatch(action)
    navigate(`/projects/${params.pid}/tasks`)
  }

  return (
    <div>
      <h1>Task Form</h1>
      <input
        type='text'
        placeholder='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='description'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={handleCreate}>
        Create
      </button>
    </div>
  )
}

export default TaskForm
