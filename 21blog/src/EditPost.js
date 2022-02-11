import React from 'react';
import { useEffect } from 'react';
import { useParams, Link,useHistory } from 'react-router-dom';
import { useContext,useState } from 'react';
import DataContext from './context/DataContext';
import api from './api/posts';
import { format } from 'date-fns';


const EditPost = () => {
  const { posts, setPosts } = useContext(DataContext);

  const { id } = useParams();
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const post = posts.find(post => (post.id).toString() === id);
  const history = useHistory();

  useEffect(() => {
      if (post) {
        setEditTitle(post.title);
        setEditBody(post.body);
      }
  }, [post, setEditBody, setEditTitle]);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody};
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(posts.map(post => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
  return (
    <main className='NewPost'>
      {editTitle && 
      <>
        <h2>EditPost</h2>
        <form 
          className='newPostForm'
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor='postTitle'>Title:</label>
          <input 
            id='postTitle'
            type='text'
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label htmlFor='postBody'>Post:</label>
          <textarea 
            id='postBody'
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
        </form>
      </>
    }
    {!editTitle &&
          <>
            <h2>Post Not Found</h2>
            <p>
              <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>
    }   
    </main>
  );
}

export default EditPost;
