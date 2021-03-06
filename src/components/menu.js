import React, { useState } from "react";
import { ul, li } from 'react-bootstrap'
import { Link, navigate } from "gatsby";
import { ButtonGroup, ToggleButton, Card, Button } from 'react-bootstrap'
export default (props) => {


  const radios = [
    { name: 'Active', userName: 'Blog', value: '1', link: '/' },
    { name: 'Radio', userName: 'Edit Blog', value: '2', link: '/blog' },
    // { name: 'Radio', userName: 'profile', value: '4', link: '/admin' },
    // { name: 'Radio', userName: 'Hello', value: '3', link: '/page-2' },

  ];
  return (
    <header>
      <div className="menu" >
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              value={radio.value}
              onClick={event => {
                event.preventDefault()
                navigate(radio.link)
              }}
            >
              {radio.userName}
            </ToggleButton>
          ))}
        </ButtonGroup>
    
      </div>



    </header>
  )
}

