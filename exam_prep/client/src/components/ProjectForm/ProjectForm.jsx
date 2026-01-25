import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProject } from '../../stores/actions/project-actions'

// selectors
const userIdSelector = state => state.user.data.id

const ProjectForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector(userIdSelector)

  const handleCreate = async () => {
    const action = await createProject(userId, { name, description })
    dispatch(action)
    navigate('/projects')
  }

  return (
    <div>
      <h1>Project Form</h1>
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={e => setName(e.target.value)}
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

export default ProjectForm
