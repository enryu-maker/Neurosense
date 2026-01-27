const initialState = {
    access: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACCESS':
            return { ...state, access: action.payload };
        default:
            return state;
    }
};