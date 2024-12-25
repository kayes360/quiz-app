import { actions } from "../actions";

const initialState = {
  quizSet: [],
  loading: false,
  error: null,
};

const quizSetReducer = (state, action) => {
  switch (action.type) {
    case actions.quiz_set.QUIZ_SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
      case actions.quiz_set.QUIZ_SET_FETCHED:
      return {
        ...state,
        loading: false,
        quizSet: action.data
      };
      case actions.quiz_set.QUIZ_SET_UPDATED:
  return {
    ...state,
    loading: false,
    quizSet: {
      ...state.quizSet,
      ...action.payload, 
    },
  };
      case actions.quiz_set.QUIZ_SET_DELETED:
        return {
            ...state,
            loading: false,
            quizSet: state.quizSet.filter((set) => set.id !== action.id),  
          };

          

      default:
        return state;
  }
};

export {quizSetReducer, initialState}
