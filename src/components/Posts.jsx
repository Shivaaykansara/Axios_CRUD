import { useEffect, useState } from "react";
import { deletePost, getPost } from "../API/PostAPI";
import '../App.css'
import Form from "./Form";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [updatePost,setUpdatePost] = useState({});

    const getPostData = async () => {
      const res = await getPost();
      setPosts(res.data);
    };
  
    const handleDelete = async(id) =>{
      try {
        const res = await deletePost(id);
        if(res.status===200){
        const updatedData = posts.filter((curPost)=>{
          return curPost.id !== id
        })
        setPosts(updatedData)
      }
        
      } catch (error) {
        console.log(error)
      }
      
    }

    const handleEdit = (curElem)=>setUpdatePost(curElem)
  
    useEffect(() => {
      getPostData();
    }, []);
  
    return(
        <>
        <Form posts={posts} setPosts={setPosts} updatePost={updatePost} setUpdatePost={setUpdatePost}/>
      <div className="cards">
        {posts.map((curElem)=>{
          const {id,title,body} = curElem
          return(
          <div className="card" key={id}>
            <h1>{title}</h1>
            <p>{body}</p>
            <button onClick={()=>handleDelete(id)}>Delete</button>
            <button onClick={()=>handleEdit(curElem)}>Edit</button>
          </div>)
        })}
      </div>
      </>
    )
  
    ;
}

export default Posts
