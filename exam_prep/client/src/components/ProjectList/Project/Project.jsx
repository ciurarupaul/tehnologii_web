import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProject, deleteProject } from '../../../stores/actions/project-actions'

// selectors
const userIdSelector = state => state.user.data.id

const Project = ({ project }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector(userIdSelector)

  const handleSave = async () => {
    const action = await updateProject(userId, project.id, {
      name,
      description
    })
    dispatch(action)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    const action = await deleteProject(userId, project.id)
    dispatch(action)
  }

  return (
    <tr>
      {
        isEditing
          ? (
            <>
              <td>
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type='text'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <button onClick={() => setIsEditing(false)}>Cancel</button>
                <button onClick={handleSave}>
                  Save
                </button>
              </td>
            </>
            )
          : (
            <>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                {
                  project.permission
                    ? (
                      <>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>
                          Delete
                        </button>
                      </>
                      )
                    : null
                }
                <button onClick={() => {
                  navigate(`/projects/${project.id}/tasks`)
                }}
                >
                  Tasks
                </button>
              </td>
            </>
            )
      }
    </tr>
  )
}

export default Project
