const login = {
    isLogin: false,
    id:null
}

const loginReducer = (state = login, action) => {
    switch (action.type) {
        case 'islogin':
            return {
                ...state,
                isLogin: true,
                id: action.id
            };
        case 'islogout':
            return {
                ...state,
                isLogin: false,
                id: null
            };
        default:
            return state;
    }
}
export default loginReducer;