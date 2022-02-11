import React from 'react'
import Feed from './Feed';
import { useStoreState } from 'easy-peasy';

//import { useContext } from 'react';
//import DataContext from './context/DataContext';
const Home = ({ isLoading, fetchError }) => {
  const { searchResult } = useStoreState((state) => state.searchResult);

  return (
    <main className='Home'>
      {/* {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{marginTop: "2rem"}}>
          No posts to display.
        </p>
      )} */}

      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
      {!isLoading && !fetchError && (searchResult.length ? <Feed posts={searchResult}/> : <p className='statusMsg'>No posts to display.</p>)}
    </main>
  )
}

export default Home
