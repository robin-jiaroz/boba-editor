import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const DropdownExamplePointing = () => (
  <React.Fragment>
    <Dropdown text='File' pointing className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>Download</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown text='Edit' pointing className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>Cut Block</Dropdown.Item>
        <Dropdown.Item>Copy Block</Dropdown.Item>
        <Dropdown.Item>Delete Block</Dropdown.Item>
        <Dropdown.Item></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown text='Insert' pointing className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item>Insert Block Above</Dropdown.Item>
        <Dropdown.Item>Insert Block Below</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown text='Help' pointing className='link item'>
      <Dropdown.Menu>
        <Dropdown.Item></Dropdown.Item>
        <Dropdown.Item></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </React.Fragment>
)

export default DropdownExamplePointing;