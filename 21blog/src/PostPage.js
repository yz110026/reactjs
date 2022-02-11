import React from 'react';
import { useParams, Link,useHistory } from 'react-router-dom';
//import { useContext } from 'react';
//import DataContext from './context/DataContext';
//import api from './api/posts';
import { useStoreState,useStoreActions } from 'easy-peasy';

const PostPage = () => {
  //const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const history = useHistory();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);
  
  const handleDelete = async (id) => {
    deletePost(id);
    history.push('/');
  }
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${id}`}>
              <button className='editButton'>
                Edit Post
              </button>
            </Link>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>
              <Link to='/'>Visit Our Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
