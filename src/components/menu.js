import React, { useState } from "react";
import { ul, li } from 'react-bootstrap'
import { Link, navigate } from "gatsby";
import { ButtonGroup, ToggleButton, Card, Button } from 'react-bootstrap'
export default (props) => {
  const { title } = props;
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    {name: 'Active', userName: 'Info', value: '1',link:'/' },
    {name: 'Radio', userName: 'Edit', value: '2' ,link:'/blog'},
    {name: 'Radio', userName: 'Hello', value: '3' ,link:'/page-2'},
  ];
  const handleValue=(e)=>{
    setRadioValue(e.currentTarget.value)
    
  }
  return (
    <header>

      <div className="menu" >



 
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
               variant="secondary"
              // name="radio"
               value={radio.value}
              
            
              // onChange={(e)=> setRadioValue(e.currentTarget.value,navigate(radio.link))}
              // checked={radioValue === radio.value}
              onClick={event => {
                event.preventDefault()
                // TODO: do something with form values
                navigate(radio.link)
              }}
            >
              {radio.userName}
            </ToggleButton>
          ))}
        </ButtonGroup>
      <Link className="button-link"></Link>
        </div>
     


    </header>
  )
}

