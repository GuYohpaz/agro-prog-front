import { storageService } from './async-storage.service.js'
import { seedlingService } from './seedling-service.js'
import { shapesService } from './shape-service.js'
import { httpService } from './http-service'



const STORAGE_KEY = 'bag'

export const bagService = {
    query,
    calculateCompressionResultIncludeSeedlingsCapacity,
    calculateCompressionResultWithShapesCapacity,
    getBagsAmount,
    restartBagsStates

}




async function query() {

    return httpService.get('bag')

}


// ConvertOnlyShapeTotalCapacity
async function calculateCompressionResultWithShapesCapacity(percentage) {

    var shapesTotalCapacityAfterCompression
    const shapesTotalCapacity = await shapesService.sumShapeCart()

    if (percentage === 0) {

        getBagsAmount(shapesTotalCapacity)

    } else {

        shapesTotalCapacityAfterCompression = shapesTotalCapacity - ((percentage / 100) * shapesTotalCapacity)
        getBagsAmount(shapesTotalCapacityAfterCompression)

    }

}


// ConvertBothShapeTotalAndTotalSeedling
async function calculateCompressionResultIncludeSeedlingsCapacity(percentage) {

    var totalCapacity = 0
    var totalCapacityAfterCompression

    const shapesTotalCapacity = await shapesService.sumShapeCart()
    const seedlingsTotalCapacity = await seedlingService.calculateSeedlingsCapacity()
    if (seedlingsTotalCapacity > 0) {

        totalCapacity = shapesTotalCapacity - seedlingsTotalCapacity

        if (percentage === 0) {
            console.log(totalCapacity);
            getBagsAmount(totalCapacity)

        } else {
            totalCapacityAfterCompression = totalCapacity - ((percentage / 100) * totalCapacity)
            getBagsAmount(totalCapacityAfterCompression)

        }
    }
}


async function getBagsAmount(totalCapacity) {

    const bags = await query()

    bags.map(bag => {

        if (bag.capacity <= totalCapacity) {
            bag.amount = totalCapacity / bag.capacity
            return httpService.put(`bag/${bag._id}`, bag)

        } else {

            bag.amount === 0
        }
    })

    // output ---> BagsM
    return totalCapacity
}


async function restartBagsStates() {
    const bags = await query()
    const initialAmount = 0

    bags.map(bag => {
        if (bag.amount > 0) {
            bag.amount = initialAmount
            console.log(bag);
            return httpService.put(`bag/${bag._id}`, bag)
        }
    })
}