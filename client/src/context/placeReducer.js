export default (state, { type, payload }) => {
    switch (type) {
        case "GET_PLACES":
            return {
                ...state,
                places: {
                    ...payload,
                    docs: payload.docs,
                },
                place: null,
                loading: false,
            };
            break;

        case "GET_SINGLE_PLACE":
            return {
                ...state,
                place: {
                    ...payload,
                },
                loading: false,
            };
            break;

        default:
            return state;
            break;
    }
};
