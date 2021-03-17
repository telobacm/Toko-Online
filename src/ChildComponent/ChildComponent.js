import React from 'react'

const ChildComponent = props => {
  console.log(props)
  return (
    <div>
      <input
        type="text"
        placeholder="Ganti Nama Bapak"
        onChange={event => props.onChange(event.target.value)}
      />
    </div>
  )
}

export default ChildComponent