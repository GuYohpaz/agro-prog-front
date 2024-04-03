const initialState = {

    seedlings: [],
    seedling: [],
    totalSeedlingsCapacity: null

}


export function seedlingReducer(state = initialState, action) {


    switch (action.type) {

        case 'SET_SEEDLINGS':
            return { ...state, seedlings: action.seedlings }

        case 'REMOVE_SEEDLING':
            return { ...state, seedlings: state.seedlings.filter(seedling => seedling._id !== action.seedlingId) }

        case 'SHOW__TOTAL_SEEDLINGS_CAPACITY':
            return { ...state, totalSeedlingsCapacity: action.totalSeedlingsCapacity }

        case 'RESTART_SEEDLINGS_STATES':
            return initialState

        default:

            return state
    }
}