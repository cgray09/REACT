import React, { Fragment } from 'react';
import spinner from './spinner.jpeg';

export default () => (
    <Fragment>
        <img scr={spinner} style={{ width: '200px', margin: 'auto', display: 'block' }} alt='Loading...' />
    </Fragment>
);