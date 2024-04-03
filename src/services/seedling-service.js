import { storageService } from './async-storage.service.js'
import { httpService } from './http-service'
import { utilService } from '../services/util.service';


const STORAGE_KEY = 'seedling'

export const seedlingService = {
    query,
    getById,
    save,
    remove,
    calculateSeedlingsCapacity,
    restartSeedlingsDataBase

}


// initial db state = []
async function query() {

    return httpService.get('seedling')

}


async function getById(seedlingId) {

    return httpService.get(`seedling/${seedlingId}`)

}


async function save(seedling) {

    seedling._id = utilService.makeId()
    return httpService.post('seedling', seedling)

}


async function remove(seedlingId) {

    return httpService.delete(`seedling/${seedlingId}`)

}


async function calculateSeedlingsCapacity() {

    var capacitySumResult = 0
    var amountSumResult = 0
    var seedlingsCapacity = 0
    var seedlings = await query()

    if (seedlings.length > 0) {
        seedlings.map(seedling => {

            if (seedling.capacity) {
                capacitySumResult += +seedling.capacity
            }


            if (seedling.amount) {
                amountSumResult += +seedling.amount
            }

            return seedlingsCapacity = amountSumResult * capacitySumResult
        })

    }

    return seedlingsCapacity

}


async function restartSeedlingsDataBase() {
    const seedlings = await query()

    seedlings.map(seedling => {

        if (seedling.capacity > 0) {

            return httpService.delete(`seedling/${seedling._id}`)

        }
    })

}