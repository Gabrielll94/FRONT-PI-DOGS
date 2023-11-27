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
            case "GET_DOGS_BY_TEMP":
        let copy = state.allDogs.filter((dog) =>
        dog.temperament.includes(action.payload)
      );
      console.log(copy);

      return {
        ...state,
        allDogs: copy,
      }
            
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
                case "FILTER_CREATED":
    const createdFilter = action.payload === "created"
        ? state.allDogs.filter((el) => {
            return el.id.length === 36;
            })
        : state.allDogs.filter((el) => {
            return Number(el.id);
            });
            console.log(createdFilter);
    return {
        ...state,
        allDogs: createdFilter,
    }
      case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
            return {
                ...state,
                allDogs: sortedArr
            }
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

