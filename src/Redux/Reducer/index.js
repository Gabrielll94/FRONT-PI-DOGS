const initialState = {
    dogs: [],
    dogs_copy: [],
    allDogs: [],
    temperaments: [],
    breeds: [],
    details: [],
    toFilter: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };
        case 'GET_DOGS_BY_NAME':
            return {
                ...state,
                allDogs: action.payload,
            };
            case 'GET_DOGS_BY_TEMP':
  const payload = action.payload;

  console.log('Payload:', payload);

  const allDogsByTemp = state.toFilter.filter((dog) => {
    console.log('Dog:', dog);

    const hasTemperament =
      (dog.temperament && dog.temperament.toLowerCase().includes(payload.toLowerCase())) ||
      (dog.temperaments &&
        dog.temperaments.some((temp) => temp.name.toLowerCase().includes(payload.toLowerCase())));

    return hasTemperament;
  });

  console.log('Filtered Dogs:', allDogsByTemp);

  return {
    ...state,
    allDogs: allDogsByTemp,
    toFilter: allDogsByTemp,
  };
            
        case 'GET_BREEDS':
            return {
                ...state,
                breeds: action.payload,
            };
        case 'GET_TEMPERAMENTS_LIST':
            return {
                ...state,
                temperaments: action.payload,
            };
            case 'GET_DOGS_BY_BREED':
                const allDogsByBreed = state.dogs;
                if (!action.payload || action.payload.trim() === '') {
                  return { ...state, allDogs: allDogsByBreed };
                }
                return {
                  ...state,
                  allDogs: allDogsByBreed.filter((dog) => dog.breed === action.payload),
                };
                case 'FILTER_CREATED':
  const createdFilter = action.payload === 'created'
    ? state.dogs.filter((el) => {
        console.log('Dog:', el);
        console.log('Filter condition:', el.createdInDB === true);
        return el.createdInDB === true;
      })
    : state.dogs.filter((el) => {
        console.log('Dog:', el);
        console.log('Filter condition:', el.createdInDB !== true);
        return el.createdInDB !== true;
      });

  console.log('Filtered dogs:', createdFilter);

  return {
    ...state,
    allDogs: createdFilter,
  };
        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                [...state.dogs].sort((a, b) => a.name.localeCompare(b.name)) :
                [...state.dogs].sort((a, b) => b.name.localeCompare(a.name));
            return {
                ...state,
                allDogs: sortedArr,
            };
            case 'ORDER_BY_WEIGHT':
  return {
    ...state,
    allDogs: action.payload,
  };
              
              
        case 'POST_DOG':
            // Handle the state update for adding a new dog if needed
            return {
                ...state,
            };
        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload,
            };
        case 'DELETE_DETAILS':
            return {
                ...state,
                details: [],
            };
        default:
            return state;
    }
}


export default rootReducer;

