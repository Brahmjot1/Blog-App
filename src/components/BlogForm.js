import React, { useState } from 'react';
import axios from 'axios';
import './BlogForm.css';

const BlogForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [blog, setBlog] = useState({ title: '', content: '', author: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1618/api/blogs/add', blog);
      alert('Blog Added Successfully');
      setBlog({ title: '', content: '', author: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <>
      <button className="addblog-btn" onClick={() => setShowForm(true)}>Add Blog</button>

      {showForm && (
        <div className="addblog-backdrop" onClick={() => setShowForm(false)}>
          <div className="addblog-form" onClick={(e) => e.stopPropagation()}>
            <span className="addblog-close" onClick={() => setShowForm(false)}>&times;</span>
            <h2>Add Blog</h2>
            <form onSubmit={handleSubmit}>
              <input name="title" value={blog.title} onChange={handleChange} placeholder="Title" required />
              <textarea name="content" value={blog.content} onChange={handleChange} placeholder="Content" required />
              <input name="author" value={blog.author} onChange={handleChange} placeholder="Author" required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogForm;
