import { combineReducers, createStore } from "redux"

const initialState = {
    TODO_DATA: getData() || []
}

function getData() {
    return JSON.parse(localStorage.getItem("TODO"));
}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                TODO_DATA: [...state.TODO_DATA, action.payload]
            }
        case "EDIT_TODO":
            return {
                ...state,
                id: action.payload
            }
        case "DELETE_TODO":
            return {
                ...state,
                TODO_DATA: state.TODO_DATA.filter((ele) => ele.id !== action.payload),
            }
        case "ADD_SUBTASK":
            let index = state.TODO_DATA.findIndex((ele) => ele.id === action.payload.id);
            let newArr = state.TODO_DATA;
            newArr[index] = { ...newArr[index], subTask: [...newArr[index].subTask, { data: action.payload.data, subTask: [] }] }
            return {
                ...state,
                TODO_DATA: [...newArr] //reference is used to render the page here we are giving new reference to render the required data
            }
        default:
            return state
    }
}



const rootReducer = combineReducers({ reducer });
const store = createStore(rootReducer);

store.subscribe(() => {
    // console.log(store.getState());
    localStorage.setItem("TODO", JSON.stringify(store.getState().reducer.TODO_DATA));
})

export default store;