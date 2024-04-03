import { seedlingService } from '../services/seedling-service'






export function loadSeedlings() {
  return async (dispatch) => {

    seedlingService.query().then(seedlings => {

      dispatch({ type: 'SET_SEEDLINGS', seedlings })

    })

      .catch(err => { console.log('err:', err) })
  }
}


export function loadSeedling() {
  return async (dispatch) => {

    seedlingService.getById().then(seedling => {
      dispatch({ type: 'SET_SEEDLING', seedling })

    })

      .catch(err => { console.log('err:', err) })
  }
}


export function addSeedling(seedling) {
  return async (dispatch) => {

    try {

      const addedSeedling = await seedlingService.save(seedling)
      dispatch({ type: 'ADD_SEEDLING', seedling: addedSeedling })

    } catch (err) {

      console.log('err:', err)

    }
  }
}


export function calculateSeedlingsCart() {
  return async (dispatch) => {

    try {

      const totalSeedlingsCapacity = await seedlingService.calculateSeedlingsCapacity()
      dispatch({ type: 'SHOW__TOTAL_SEEDLINGS_CAPACITY', totalSeedlingsCapacity: totalSeedlingsCapacity })

    } catch (err) {

      console.log('Cannot show total seedlings capacity !', err)

    }
  }
}


export function restartSeedlingsStates() {
  return async (dispatch) => {

    try {

      const restartedSeedlingsArr = await seedlingService.restartSeedlingsDataBase()
      dispatch({ type: 'RESTART_SEEDLINGS_STATES' })

    } catch (err) {

      console.log('Cannot restart seedlings states !', err)

    }
  }
}


export function removeSeedling(seedlingId) {
  return async dispatch => {

    try {

      await seedlingService.remove(seedlingId)
      dispatch({ type: 'REMOVE_SEEDLING', seedlingId })

    } catch (err) {

      console.log('seedlingActions: err in remove seedling', err)

    }
  }
}

