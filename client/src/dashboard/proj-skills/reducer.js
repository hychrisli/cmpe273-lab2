import {SKILLS_CHOICES_SET, SKILLS_CHOICES_UNSET} from './constants'

const reducer = (state={}, action) => {

  switch(action.type) {
    case SKILLS_CHOICES_SET:
      return action.choices;

    case SKILLS_CHOICES_UNSET:
      return {};

    default:
      return state;
  }
};

export default reducer;