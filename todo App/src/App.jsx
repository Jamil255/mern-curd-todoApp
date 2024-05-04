import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { BASE_URL } from './config'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [post, setPost] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')

  const addTodoHandler = async () => {
    try {
      const obj = {
        value: inputValue,
        userID: '102',
      }

      const createTodo = await axios.post(`${BASE_URL}/createpost`, obj)
      console.log(createTodo)
      setInputValue('')
      fetchData()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEditClick = (index, value) => {
    setEditIndex(index)
    setEditValue(value)
  }

  const handleInputChange = (e) => {
    setEditValue(e.target.value)
    //   console.log(editValue)
  }

  const handleSaveClick = async (index, postId) => {
    console.log(index)
    console.log(postId)
    try {
      const obj = {
        value: editValue,
      }
      const url = `${BASE_URL}/updatepost/${postId}`
      const editPost = await axios.put(url, obj)
      console.log(editPost)
      setEditIndex(null)
      fetchData()
    } catch (error) {
      console.log(error.message)
    }
  }
  const deletePost = async (id) => {
    try {
      const post = await axios.delete(`${BASE_URL}/deletepost/${id}`)
      fetchData()
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getusers`)
      setPost(response.data.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter A Task"
        value={inputValue}
        className="inp"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn" onClick={addTodoHandler}>
        Add
      </button>
      {post?.map((item, index) => {
        return (
          <div
            key={item._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '5px',
              borderRadius: '5px',
            }}
          >
            {editIndex === index ? (
              <input
                type="text"
                className="editinp"
                value={editValue}
                onChange={handleInputChange}
                style={{ marginBottom: '5px', fontSize: 'larger' }}
              />
            ) : (
              <p style={{ marginBottom: '5px', fontSize: 'larger' }}>
                {item.value}
              </p>
            )}
            <button
              onClick={() => {
                editIndex === index
                  ? handleSaveClick(index, item._id)
                  : handleEditClick(index, item.value)
              }}
              style={{
                marginRight: '5px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '15px',
                cursor: 'pointer',
              }}
            >
              {editIndex === index ? 'Save' : 'Edit'}
            </button>
            <button
              onClick={() => deletePost(item._id)}
              style={{
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '15px 10px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        )
      })}
    </>
  )
}

export default App
