import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './BlogForm.css';
const BlogForm = () => 
{
    const [blog, setBlog] = useState({
        title:"",
        content:"",
        author:""
    });

    const handleChange = (e)=>{
         const{name,value} = e.target;
         setBlog({...blog,[name]:value});

    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try 
        {
        await axios.post("http://localhost:1618/api/blogs/add",blog);
        alert("Blog Added Successfully");
        
        setBlog({title:"",
            content:"",
            author:""})
        } catch (error) {
            console.error("Error in adding blog : ",error);
        }
    }


  return (
    <div>
        <h2>Add Blog</h2>
        <form onSubmit={handleSubmit} >
            <input type='text' name='title' value={blog.title} onChange={handleChange} placeholder='Title'/>
            <textarea name='content' value={blog.content} onChange={handleChange} placeholder='Content'/>
            <input type='text' name='author' value={blog.author}  onChange={handleChange} placeholder='Author' />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}


export default BlogForm