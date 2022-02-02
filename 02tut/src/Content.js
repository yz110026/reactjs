import React from 'react'
import { useState } from 'react';
import { FaTrashAlt} from 'react-icons/fa'
import ItemsList from './ItemsList';
const Content = ({items, handleClick4, handleDelet}) => {
  const [name, setName] = useState('Yue');
  const [count, setCount] = useState(0);
  
    const handleNameChange =  () => {
        const names = ['Bob', 'Kevin', 'Yue'];
        const int = Math.floor(Math.random()*3);
        setName(names[int]);
      }
    const handleClick = () => {
      setCount(count + 1)
      setCount(count + 1)
      console.log(count)
    }
    const handleClick2 = (name) => {
      console.log(`${name} was clicked`)
    }
    const handleClick3 = (e) => {
      console.log(e.target)
    }
  return (
    <main>
        <p onDoubleClick={handleClick}>
         Hello {name}!
        </p>
        <button onClick={handleNameChange}>Change Name</button>
        <button onClick={handleClick}>Click It</button>
        <button onClick={(e) => handleClick3(e)}>Click It</button>
       
        {items.length ? (
          <ItemsList
            items={items}
            handleClick4={handleClick4}
            handleDelet={handleDelet}
          />
        ) : (
          <p style={{marginTop: '2rem'}}>Your list is empty</p>
        )}
    </main>
  )
}

export default Content
