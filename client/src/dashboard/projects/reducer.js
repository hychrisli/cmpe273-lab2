import {PROJECT_SET, PROJECT_UNSET} from './constants'

const reducer = (state={}, action) => {

  switch(action.type) {
    case PROJECT_SET:
      return action.record;

    case PROJECT_UNSET:
      return {};

    default:
      return state;
  }
};

export default reducer;