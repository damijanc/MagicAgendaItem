const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {
        case "FETCH_DETAILS": {
            console.log("payload:", action.payload);
            return { ...state, ...action.payload };
        }
    }

    return state;
}
