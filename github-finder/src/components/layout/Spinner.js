import React, { Fragment } from 'react'
import spinner from './spinner.gif'; // can import images bc of webpack

const Spinner = () => <Fragment>
      <img src={spinner} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block' }} />
    </Fragment>
  // display: 'block' lets us do margin: 'auto' which centers the spinner
export default Spinner
