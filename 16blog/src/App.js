import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import api from './api/posts';
import EditPost from './EditPost';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
import { DataProvider } from './context/DataContext';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useHistory();
  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  //use costom hook to fetch data
  useEffect(() => {
    setPosts(data);
  }, [data]);


  // useEffect(() => {
  //     const fetchPost = async() => {
  //       try {
  //         const response = await api.get('/posts');
  //         setPosts(response.data);
  //       } catch (err) {
  //         if (err.response) {
  //           // NOt in the 200 response range
  //           //axios auto catch error
  //           console.log(err.response.data);
  //           console.log(err.response.status);
  //           console.log(err.response.headers);
  //         } else {
  //           //this can catch all type error
  //           console.log (`Error: ${err.message}`);
  //         }
  //       }
  //     }
  //     fetchPost();
  // }, []);

  useEffect(() => {
      const filterResults = posts.filter(post => 
        ((post.body).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase())
      )
      setSearchResult(filterResults.reverse());
  }, [posts,search]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody};
    try {
      const response = await api.post('/posts',newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history.push('/');
      
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }
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
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      history.push('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
      
    }
  }
  return (
    <div className="App">
      
      <Header title="React JS Blog" width={width} />
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Switch>
        <Route exact path="/">
          <Home 
            posts={searchResult}
            fetchError = {fetchError}
            isLoading = {isLoading}
          />
        </Route>
        <Route exact path="/post">
          <NewPost 
            handleSubmit={handleSubmit}
            postTitle = {postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route exact path="/edit/:id">
          <EditPost 
            posts={posts}
            handleEdit={handleEdit}
            editTitle = {editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage 
            posts={posts}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    
    </div>
  );
}

export default App;
