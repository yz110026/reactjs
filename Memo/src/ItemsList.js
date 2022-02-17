import React from 'react'
import { FaTrashAlt} from 'react-icons/fa' 
import LineItems from './LineItems'
const ItemsList = ({items, handleClick4, handleDelet}) => {
  return (
    <ul>
        {items.map((item)=> (
            <LineItems
                key={item.id}
                item={item}
                handleClick4={handleClick4}
                handleDelet={handleDelet}
            />
        ))}
    </ul>
  )
}

export default ItemsList
