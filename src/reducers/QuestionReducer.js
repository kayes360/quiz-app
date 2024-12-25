import { actions } from "../actions";

const initialState = {
  questions: [],
  loading: false,
  error: null,
};
const questionReducer = (state, action) => {
  switch (action.type) {
    case actions.question.QUESTION_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.question.QUESTION_FETCHED:
      return {
        ...state,
        loading: false,
        questions: action.data, 
      };

    case actions.question.QUESTION_CREATED:
      return {
        ...state,
        loading: false,
        questions: [...state.questions, action.payload],
        error: null,
      };
      case actions.question.QUESTION_UPDATED:
  return {
    ...state,
    questions: state.questions.map((q) =>
      q.id === action.payload.id ? action.payload : q
    ),
    loading: false,
  };


      case actions.question.QUESTION_DELETED:
        return {
          ...state,
          loading: false,
          questions: state.questions.filter(
            (question) => question.id !== action.id 
          ),
        };


    default:
      return state;
  }
};

export { questionReducer, initialState };
