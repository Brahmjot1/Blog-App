import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import './BlogList.css'
const BlogList = () => 
    {
        const [blogs,setBlogs] = useState([]);
        const [editBlogs,seteditBlogs] = useState(null);

        const fetchBlogs = async()  =>
            {
                try 
                {
                   const response = await axios.get("http://localhost:1618/api/blogs/all");
                    setBlogs(response.data); 

                } 
                catch (error) 
                {
                   console.log("Can not display blogs error : ",error);    
                }
        }

        const handleEdit = async (blog) =>
            {
               try 
               {
                seteditBlogs(blog)
               }
                catch (error) 
               {
                
               }
            }

        const handleDelete = async(id) =>
            {
            try 
            {
                await axios.delete(`http://localhost:1618/api/blogs/delete/${id}`);
                alert("Successfully deleted !!");
                fetchBlogs();
                
            } catch (error) 
            {
               console.log("Error in deleting : ",error);    
            }
            
        }

        const handleUpdate = async(id) =>
        {
             try 
             {
               await axios.put(`http://localhost:1618/api/blogs/update/${editBlogs.id}`,editBlogs)   
               alert("BLog updated successfully");
               fetchBlogs();
             } catch (error) {
                console.log("Update error : ")
             }
        }

        const handleInputChange = (e) =>{
            const {name,value} = e.target
            seteditBlogs({...editBlogs,[name]:value});
        }

        useEffect(()=>{
            fetchBlogs();
        },[]);

      return(
       <div>
        <h2>ALL BLOGS</h2>
        <ul>
           {
              blogs.map(
                (blog) => 
                    (
                <li key={blog.id}>
                   <h3>{blog.title}</h3>
                   <p>{blog.content}</p>
                   <p><strong>Author:</strong>{blog.author}</p> 
                   <button onClick={() =>{handleEdit(blog)}}>Edit</button>
                   <button onClick={() =>{handleDelete(blog.id)}}>Delete</button>
                </li>
                
              )
              )
           }
        </ul>
{
    editBlogs
    &&
        <div>
            <h2>Edit Form</h2>
            <input name='title' type='text' value={editBlogs.title} onChange={handleInputChange} placeholder='title'/>
            <textarea name='content' value={editBlogs.content} onChange={handleInputChange} placeholder='Content'/>
            <input type='text' name='author' value={editBlogs.author}  onChange={handleInputChange} placeholder='Author' />
            <button type='submit' onClick={()=>{handleUpdate()}}>Edit Blog</button>
        </div>
    }

       </div>
      );
};

export default BlogList