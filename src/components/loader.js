import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const Spinner = () => (
  <div>
    <Segment style={{border:'0px',borderRadius:'0px'}}>
      <Dimmer style={{backgroundColor:'#015edc'}} active>
        <Loader></Loader>
      </Dimmer>

      
    </Segment>

    
  </div>
)

export default Spinner;