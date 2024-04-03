import { shapesService } from '../services/shape-service'


// TestMode

export function getActionRemoveShape(shapeId) {
  return {
      type: 'REMOVE_SHAPE',
      shapeId
  }
}



export function loadShapes() {
  return async (dispatch) => {

    shapesService.query().then(shapes => {

      dispatch({ type: 'SET_SHAPES', shapes })
      dispatch({ type: 'SHOW_SHAPES_CART', shapesCart: shapes })

    })

      .catch(err => { console.log('err:', err) })

  }
}


export function loadShape(shapeId) {
  return async (dispatch) => {

    try {

      const shape = await shapesService.getById(shapeId)
      dispatch({ type: 'SET_SHAPE', shape })

    } catch (err) {

      console.log('err:', err)

    }
  }
}


export function addShape(eqVars, shape) {
  return async (dispatch) => {

    try {

      const addedShape = await shapesService.add(eqVars, shape)
      // dispatch({ type: 'ADD_SHAPE', shape: addedShape })

    } catch (err) {

      console.log('err:', err)

    }
  }
}


export function calculateShapesCart() {
  return async (dispatch) => {

    try {

      const totalShapesCapacity = await shapesService.sumShapeCart()
      dispatch({ type: 'SHOW__TOTAL_SHAPES_CAPACITY', totalShapesCapacityResult: totalShapesCapacity })

    } catch (err) {

      console.log('Cannot show total shapes capacity !', err)

    }
  }
}


export function restartShapesStates() {
  return async (dispatch) => {

    try {

      const restartedShapesArr = await shapesService.restartShapesDataBase()
      dispatch({ type: 'RESTART_SHAPES_STATES' })

    } catch (err) {

      console.log('Cannot restart shapes states !', err)

    }
  }
}

export function removeShape(shapeId) {
  return async dispatch => {

    try {

      await shapesService.remove(shapeId)
      dispatch({ type: 'REMOVE_SHAPE', shapeId })

    } catch (err) {

      console.log('shapeActions: err in removeShape', err)

    }
  }
}


