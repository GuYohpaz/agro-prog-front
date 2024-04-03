import { storageService } from './async-storage.service.js'
import { httpService } from './http-service'
import { utilService } from '../services/util.service';
import { getActionRemoveShape } from '../store/shape-action.js';
import { store } from '../store/store.js'


const STORAGE_KEY = 'shape'

export const shapesService = {
    query,
    getById,
    add,
    remove,
    sumShapeCart,
    restartShapesDataBase
}


//TestMode
const shapeChannel = new BroadcastChannel('shapeChannel')

;(()=>{
    shapeChannel.addEventListener('message', (ev)=>{
        store.dispatch(ev.data)
    })
})()

async function query() {

    return httpService.get('shape')

}


async function getById(shapeId) {

    return httpService.get(`shape/${shapeId}`)

}


async function sumShapeCart() {

    const shapes = await query()
    const totalShapesCapacity = shapes.reduce((accumulator, shape) => {

        return accumulator + shape.capacity

    }, 0)

    return totalShapesCapacity
}


async function add(eqVars, shape) {

    // From string to digit
    const numericValues = {}
    for (const key in eqVars) {
        numericValues[key] = parseFloat(eqVars[key])
    }

    //  Capacity formulas
    if (shape.name === 'Cylinder') {

        shape.capacity = Math.PI * numericValues.radius ** 2 * numericValues.depth

    }

    if (shape.name === 'Cube') {

        shape.capacity = numericValues.len ** 3

    }


    if (shape.name === 'Rectangular') {

        shape.capacity = numericValues.len * numericValues.width * numericValues.depth

    }

    shape._id = utilService.makeId()

    httpService.post('shape', shape)

}


function remove(shapeId) {

    const deletedShape = httpService.delete(`shape/${shapeId}`)
    shapeChannel.postMessage(getActionRemoveShape(shapeId))
    return deletedShape
}


async function restartShapesDataBase() {

    const shapes = await query()

    shapes.map(shape => {
        if (shape.capacity > 0) {

            return httpService.delete(`shape/${shape._id}`)

        } else {}

    })

}


