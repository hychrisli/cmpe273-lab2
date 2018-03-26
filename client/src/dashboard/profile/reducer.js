import {
  PROFILE_UPDATING,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR,

} from './constants'

const initialState = {
  updating: false,
  successful: false,
  messages: [],
  errors: [],
};

const reducer = (state=initialState, action) => {

  switch(action.type){
    case PROFILE_UPDATING:
      return {
        updating: true,
        successful: false,
        messages: [{body: 'Updating profile...', time: new Date()}],
        errors: [],
      };

    case PROFILE_UPDATE_SUCCESS:
      return {
        updating: false,
        successful: true,
        messages: [{body: 'Profile update successful', time: new Date()}],
        errors: []
      };

    case PROFILE_UPDATE_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date()
        }]),
        messages: [],
        updating: false,
        successful: false
      };
    default:
      return state
  }
};

export default reducer;