const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            console.log("payload:", action.payload);

            return [...state, action.payload.item ];
        }
        case "DELETE_ITEM": {
            console.log("payload:", action.payload);
            return state.filter(item => item.key !== action.payload.key);
        }
        case "FETCH_ITEMS": {
            console.log("payload:", action.payload);
            return state;
        }
        case "ATTACH_DOCUMENT": {
            console.log("payload:", action.payload);
            let item = state[action.payload.key];
            item.documents.push(action.payload.document);
            let new_state = [...state];
            new_state[action.payload.key]=item;
            return new_state;
        }
    }

    return state;
}