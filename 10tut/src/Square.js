import React from 'react'
import colorNames from 'colornames'

const Square = ({colorValue, hexValue, isDarkText,setIsDarkText}) => {
    colorNames(colorValue) === "#000000" ? setIsDarkText(false) : setIsDarkText(true)
  return (
    <section 
        className='square'
        style={{ 
            backgroundColor: colorValue,
            color: isDarkText ? "#000" : "#FFF"
        }}
    >
      <p>{ colorValue ? colorValue : "Empty Value"}</p>
      <p>{ hexValue ? hexValue : null }</p>
      
    </section>
  )
}

Square.defaultProps = {
    colorValue: "Empty Color Value"
    
}
export default Square
