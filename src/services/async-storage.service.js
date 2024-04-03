import { utilService } from '../services/util.service';


export const storageService = {
    query,
    get,
    getByName,
    postMany,
    post,
    _save,
    put,
    remove,

}


function query(entityType, delay = 0) {
    // jason.prase(reviver), convert json to js
    var entities = JSON.parse(localStorage.getItem(entityType))

    return new Promise((resolve, reject) => {
        // execute the resolved callBack once the timer expires..(delay = asyncReactionTime?)  
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities =>
            entities.find(entity =>
                entity._id === entityId))
}


function getByName(entityType, entityName) {
    return query(entityType)
        .then(entities =>
            entities.find(entity =>
                entity.name === entityName))
}


// new obj in arr
function post(entityType, newEntity) {
    newEntity._id = utilService.makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}


function put(entityType, updatedEntity) {

    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            // splice(idx, removeAmount, ... )
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}



function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            // splice(idx, removeAmount)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}



function postMany(entityType, entities) {
    _save(entityType, entities)
    return Promise.resolve(entities)
}


function _save(entityType, entities) {

    // setItem(keyName, keyValue), toJson 
    localStorage.setItem(entityType, JSON.stringify(entities))
}



