import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [editBlog, setEditBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:1618/api/blogs/all');
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const handleEdit = (blog) => {
    setEditBlog(blog);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1618/api/blogs/delete/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBlog({ ...editBlog, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:1618/api/blogs/update/${editBlog.id}`, editBlog);
      setEditBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bloglist-container">
      <h2>All Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id} className="bloglist-item">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p><strong>Author:</strong> {blog.author}</p>
            <button onClick={() => handleEdit(blog)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(blog.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editBlog && (
        <div className="editblog-backdrop" onClick={() => setEditBlog(null)}>
          <div className="editblog-modal" onClick={(e) => e.stopPropagation()}>
            <span className="editblog-close" onClick={() => setEditBlog(null)}>&times;</span>
            <h2>Edit Blog</h2>
            <input name="title" value={editBlog.title} onChange={handleInputChange} placeholder="Title" />
            <textarea name="content" value={editBlog.content} onChange={handleInputChange} placeholder="Content" />
            <input name="author" value={editBlog.author} onChange={handleInputChange} placeholder="Author" />
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
