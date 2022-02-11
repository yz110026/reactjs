import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import EditPost from './EditPost';
import { Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';
//import { DataProvider } from './context/DataContext';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  //use costom hook to fetch data
  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);
  return (
    <div className="App">
      <Header title="React JS Blog" />
      
        <Nav/>
        <Switch>
          <Route exact path="/" >
            <Home 
              isLoading = {isLoading}
              fetchError = {fetchError}
            />
          </Route>
          <Route exact path="/post" component={NewPost}/>
          <Route exact path="/edit/:id" component={EditPost} />
          <Route path="/post/:id" component={PostPage}/>
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
      
      <Footer />
    </div>
  );
}

export default App;
