
const initialState = {
    
    shapes: [],
    shape: [],
    shapesCart: [],
    totalShapesCapacityResult: null

}


export function shapeReducer(state = initialState, action) {


    switch (action.type) {


        case 'SET_SHAPES':
            return { ...state, shapes: action.shapes }


        case 'SET_SHAPE':
            return { ...state, shape: action.shape }


        case 'ADD_SHAPE':
            return { ...state, shape: action.shape }


        case 'REMOVE_SHAPE':
            return { ...state, shapes: state.shapes.filter(shape => shape._id !== action.shapeId) }


        case 'SHOW_SHAPES_CART':
            return { ...state, shapesCart: state.shapes.filter(shape => shape.capacity > 0) }


        case 'SHOW__TOTAL_SHAPES_CAPACITY':
            return { ...state, totalShapesCapacityResult: action.totalShapesCapacityResult }


        case 'RESTART_SHAPES_STATES':
            return initialState

        default:

            return state
    }

}

