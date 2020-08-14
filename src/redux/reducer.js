const initialState = {
    username: null,
    profile_pic: null
}

const STORE_USER_INFO = 'STORE_USER_INFO';
const REMOVE_USER_INFO = 'REMOVE_USER_INFO';

export const storeUserInfo = (username, profile_pic) => {
    return {
        type: STORE_USER_INFO,
        payload: {
            username,
            profile_pic
        }
    }
}

export const removeUserInfo = () => {
    return {
        type: REMOVE_USER_INFO,
        payload: {
            username: null,
            profile_pic: null
        }
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case STORE_USER_INFO:
            // console.log(action.payload);
            const {username, profile_pic} = action.payload;
            return {username, profile_pic};
        case REMOVE_USER_INFO:
            console.log(action.payload);
            return {username, profile_pic} = action.payload;
        default:
            return state;
    }
}