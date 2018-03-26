import {SIGNUP_REQUESTING} from './constants';

export const signupRequest = ({email, username, password}) => ({
  type: SIGNUP_REQUESTING,
  email,
  username,
  password,
});
