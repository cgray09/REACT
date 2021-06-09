import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

// works by adding the alerts to the state by calling the reducer and
// theres an alerts component that displays alerts whenever the state
// has an alert in it

// Were able to do this bc of the thunk middleware.
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    console.log(id);
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }, timeout), 5000);
};
