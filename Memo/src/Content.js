import React from 'react'
import { useState } from 'react';
import { FaTrashAlt} from 'react-icons/fa'
import ItemsList from './ItemsList';
const Content = ({items, handleClick4, handleDelet}) => {
  return (
    < >
        
        {items.length ? (
          <ItemsList
            items={items}
            handleClick4={handleClick4}
            handleDelet={handleDelet}
          />
        ) : (
          <p style={{marginTop: '2rem'}}>Your list is empty</p>
        )}
    </>
  )
}

export default Content
