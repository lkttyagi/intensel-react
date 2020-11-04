import React from 'react'

const Suggestions = (props) => {
  const options = props.company.map(r => (
    <li key={r.id}>
      {r.name}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions