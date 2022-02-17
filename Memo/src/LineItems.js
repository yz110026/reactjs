import React from 'react'
import { FaTrashAlt} from 'react-icons/fa' 

const LineItems = ({item, handleClick4, handleDelet}) => {
  return (
    <li className='item' key={item.id}>
            <input type = "checkbox"
            onChange={() => handleClick4(item.id)}
            checked = {item.checked}/>
            <label
                style={(item.checked) ? { textDecoration: 'line-through'} : null}
                onDoubleClick={() => handleClick4(item.id)}
            >{item.item}</label>
            <FaTrashAlt 
                className='trashbutton'
                role="button" 
                tabIndex="0" 
                onClick={() => handleDelet(item.id)}
                aria-label={`Delete ${item.item}`}
            />
            </li>
  )
}

export default LineItems
