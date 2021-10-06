import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  // useState would be the same as creating an object at the top of the component
  // and filling it w/ balues for state
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      githubContext.searchUsers(text);
      setText('');
    }
  };

  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <div className="btn-style">
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block btn-w'
          />
          <button
            className='btn btn-primary btn-block btn-w btn-look'
            onClick={githubContext.clearUsers}
            disabled={!githubContext.users.length}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
