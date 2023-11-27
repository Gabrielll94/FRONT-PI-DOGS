import axios from 'axios';

//  Este codigo, define acciones y creadores de acciones para manejar diferentes aspectos de una aplicación relacionada
//  con perros, como buscar perros, ordenarlos, filtrar por nombre o temperamento, publicar un perro nuevo y obtener
//   detalles sobre un perro específico.


// Las constantes se definen para representar diferentes tipos de acciones.
const ORDER_BY_NAME = 'ORDER_BY_NAME';
const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
const GET_DOGS = 'GET_DOGS';
const GET_DOGS_ERROR = 'GET_DOGS_ERROR';
const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME';
const GET_DOGS_BY_NAME_ERROR = 'GET_DOGS_BY_NAME_ERROR';
const GET_TEMPERAMENTS_LIST = 'GET_TEMPERAMENTS_LIST';
const POST_DOG = 'POST_DOG';
const GET_DOGS_BY_BREED = 'GET_DOGS_BY_BREED';
const GET_BREEDS = 'GET_BREEDS';
const GET_BREEDS_ERROR = 'GET_BREEDS_ERROR';
const GET_DOGS_BY_TEMP = 'GET_DOGS_BY_TEMP';
const FILTER_CREATED = 'FILTER_CREATED';
const GET_DETAILS = 'GET_DETAILS';
const DELETE_DETAILS = 'DELETE_DETAILS';

const backUrl = import.meta.env.VITE_BACKEND_URL;

// Las funciones getDogs, getDogsByName, getTemperamentsList, postDog, getDogsByBreed, getBreeds y getDetails realizan
//  llamadas API al servidor backend utilizando Axios.

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload,
    };
}

export const orderByWeight = (order) => {
    return {
    type: ORDER_BY_WEIGHT,
    payload: order,
    };
};

export function getDogs() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${backUrl}/dogs`);

            if (data.length === 0) {
                dispatch({
                    type: GET_DOGS_ERROR,
                    payload: { error: 'No dogs found' },
                });
            } else {
                dispatch({
                    type: GET_DOGS,
                    payload: data,
                });
            }
        } catch (error) {
            console.error('Error fetching dogs:', error);
            dispatch({
                type: GET_DOGS_ERROR,
                payload: { error: 'Failed to fetch dogs', details: error.message },
            });
        }
    };
}

export function getDogsByName(name) {
    return async function (dispatch) {
        

try {
            const { data } = await axios.get(`${backUrl}/dogs?name=${name}`);
            dispatch({
                type: GET_DOGS_BY_NAME,
                payload: data,
            });
        } catch (error) {
            console.error('Error fetching dogs by name:', error);
            dispatch({
                type: GET_DOGS_BY_NAME_ERROR,
                

payload: { error: 'Failed to fetch dogs by name', details: error.message },
            });
        }
    };
}

export function getTemperamentsList() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${backUrl}/temperaments`);
            console.log("Temperaments data:", data);
            const listOfTemperaments = data.map((el) => el.name);
            dispatch({
                type: GET_TEMPERAMENTS_LIST,
                payload: listOfTemperaments,
            });
        } catch (error) {
            console.error('Error fetching temperaments:', error);
        }
    };
}

export function postDog(payload) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${backUrl}/dogs`, payload); console.log(response);
            console.log(backUrl);
            dispatch({
                type: POST_DOG,
                payload: response.data,
            });
        } catch (error) {
            console.error('Error posting dog:', error);
        }
    };
}

export function getDogsByBreed(payload) {
    return async function (dispatch) {
    try {
        const { data } = await axios.get(`${backUrl}/breedGroup?breedGroup=${payload}`);
        dispatch({
        type: GET_DOGS_BY_BREED,
            payload: data, //  Assuming data is an array of dogs
        });
    } catch (error) {
        console.error('Error fetching dogs by breed:', error);
    }
    };
}

export function getBreeds() {
return async function (dispatch) {
try {
const { data } = await axios.get(`${backUrl}/breeds`);
dispatch({
type: GET_BREEDS,
payload: data,
});
} catch (error) {
console.log('Error fetching breeds:', error);
dispatch({
type: GET_BREEDS_ERROR,
payload: { error: 'Failed to fetch breeds', details: error.message },
});
}
};
}


export const filterDogsByTemperament = (temperaments) => {
    return {
    type: GET_DOGS_BY_TEMP,
    payload: temperaments,
    };
};

export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload,
    };
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${backUrl}/dogs/${id}`);
            dispatch({
                type: GET_DETAILS,
                payload: data,
            });
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };
}
            



export function deleteDetails() {
    return async function (dispatch) {
        try {
            dispatch({
                type: DELETE_DETAILS,
            });
        } catch (error) {
            console.error('Error deleting details:', error);
        }
    };
}
