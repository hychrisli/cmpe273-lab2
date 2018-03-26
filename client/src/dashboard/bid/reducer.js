import {BIDDING, BID_ERROR, BID_SUCCESS} from './constants'

const initialState = {
  bidding: false,
  successful: false,
  messages: [],
  errors: [],
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case BIDDING:
      return {
        bidding: true,
        successful: false,
        messages: [{body: "Bidding for project...", time: new Date()}],
        errors: [],
      };

    case BID_SUCCESS:
      return {
        bidding: false,
        successful: true,
        messages: [{body: "Project Bid Successful", time: new Date()}],
        errors: []
      };

    case BID_ERROR:
      return {
        bidding: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date()
        }])
      };

    default:
      return state
  }
};

export default reducer;