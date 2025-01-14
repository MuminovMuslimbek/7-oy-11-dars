import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateArticle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.access_token;
  const username = userData?.username;

  const navigate = useNavigate()

  function validate() {
    if (!title) {
      alert('Title ni kiriting!')
      return false
    }
    if (!description) {
      alert('Description ni kiriting!')
      return false
    }
    if (!fullDescription) {
      alert('FullDescription ni kiriting!')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate()
    if (!isValid) {
      return
    }

    if (!token || !username) {
      navigate("/login");
      return null;
    }

    const NewArticle = {
      title,
      description,
      fullDescription,
      time: new Date().toISOString().split(".")[0] + "Z",
      username,
    }

    axios.post('https://json-api.uz/api/project/blog-api/articles', NewArticle, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        alert(err)
      })
  };

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="mx-auto p-5 max-w-3xl">
      <h1 className="mb-5 font-medium text-2xl">Create Article</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-medium text-lg"> Title </label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-gray-300 p-3 border rounded-lg w-full" placeholder="Enter the title" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-medium text-lg"> Description </label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border-gray-300 p-3 border rounded-lg w-full" placeholder="Enter the description" />
      </div>
      <div className="mb-4">
        <label htmlFor="fullDescription" className="block mb-2 font-medium text-lg"> Full Description </label>
        <textarea id="fullDescription" value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} className="border-gray-300 p-3 border rounded-lg w-full" rows="5" placeholder="Enter the full description" />
      </div>
      <button type="submit" className="bg-blue-500 py-3 rounded-lg w-full font-medium text-white" > Submit </button>
    </form>
  );
}

export default CreateArticle;