export const initialState = {
  clientId: '0',
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'init_stored': {
      return action.value;
    }
    case 'assign_client_id': {
      return {
        ...state,
        clientId: action.value,
      };
    }
    default:
      // do nothing
      return null;
  }
};
