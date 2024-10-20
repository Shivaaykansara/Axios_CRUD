import { useEffect, useState } from 'react';
import { changePost, postPost } from '../API/PostAPI';


const Form = ({posts,setPosts, updatePost,setUpdatePost}) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });

  useEffect(()=>{
    updatePost && setFormData({
        title:updatePost.title || '',
        body: updatePost.body || ""
    })
  },[updatePost])

  let isEmpty = Object.keys(updatePost).length === 0

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addPosts = async()=>{
    const res = await postPost(formData)
    if(res.status === 201){
        setPosts([...posts,res.data])
        setFormData({title:"",body:""})
    }
  }

  const editPost = async()=>{
    try {
        const res = await changePost(updatePost.id,formData)
        console.log(res)
        if (res.status === 200) {
            setPosts((prev) => {
              return prev.map((curElem) => {
                return curElem.id === res.data.id ? res.data : curElem;
              });
            });
    
            setFormData({ title: "", body: "" });
            setUpdatePost({});
          }
    } catch (error) {
        console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if(action === 'Add'){

        addPosts()
    }
    else if(action==='Edit'){
        editPost()
    }
  };

  return (
    <form onSubmit={handleSubmit} className="small-form">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="input-field"
      />
      <input
        type="text"
        name="body"
        value={formData.body}
        onChange={handleChange}
        placeholder="Body"
        className="input-field"
      />
       <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
