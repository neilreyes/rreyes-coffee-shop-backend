import { createContext, useReducer } from "react";
import placeReducer from "./placeReducer";

import axios from "axios";

const initialState = {
    places: {
        docs: [],
        hasNextPage: false,
        hasPrevPage: false,
        limit: 10,
        nextPage: null,
        page: 1,
        pagingCounter: null,
        prevPage: null,
        totalDocs: null,
        totalPages: null,
    },
    place: null,
    loading: true,
    error: null,
};

export const PlaceContext = createContext(initialState);

export const PlaceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(placeReducer, initialState);

    // GET places
    const get_places = async () => {
        try {
            const response = await axios.get(
                `/api/v1/place?page=${state.places.page}&limit=${state.places.limit}`
            );

            dispatch({
                type: "GET_PLACES",
                payload: response.data.payload,
            });
        } catch (error) {
            dispatch({
                type: "PLACE_ERROR",
                payload: error,
            });
        }
    };

    // GET single place
    const get_single_place = async (_id) => {
        try {
            const response = await axios.get(`/api/v1/place/${_id}`);

            dispatch({
                type: "GET_SINGLE_PLACE",
                payload: response.data.payload[0],
            });
        } catch (error) {
            dispatch({
                type: "PLACE_ERROR",
                payload: error,
            });
        }
    };

    const load_more_places = async () => {
        try {
            const response = await axios.get(
                `/api/v1/place?page=${state.places.page++}&limit=${
                    state.places.limit
                }`
            );

            dispatch({
                type: "GET_PLACES",
                payload: response.data.payload,
            });
        } catch (error) {
            dispatch({
                type: "PLACE_ERROR",
                payload: error,
            });
        }
    };

    return (
        <PlaceContext.Provider
            value={{
                places: state.places,
                place: state.place,
                loading: state.loading,
                get_places,
                get_single_place,
                load_more_places,
            }}>
            {children}
        </PlaceContext.Provider>
    );
};
