import { utilService } from '../services/util.service';


export const storageService = {
    query,
    get,
    postMany,
    post,
    _save,
    put,
    remove,

}


function query(entityType, delay = 0) {
// jason.prase(reviver), convert json to js? 
    var entities = JSON.parse(localStorage.getItem(entityType))
  
    return new Promise((resolve, reject) => {
        //todo:  setTimeOut(callBack, delay ), execute the resolved callBack once the timer expires..(delay = asyncReactionTime?)  
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}



function get(entityType, entityId) {
    return query(entityType)
        .then(entities =>
            // find and return entity arr
            entities.find(entity =>
                entity._id === entityId))
}




// new obj in arr
function post(entityType, newEntity) {
    // console.log(newEntity);
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
            // splice(idx, removeAmount, )
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity // entities ?
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
    // return ---> query functions 
}


function _save(entityType, entities) {

    // setItme(keyName, keyValue), toJson 
    // console.log(entities);
    localStorage.setItem(entityType, JSON.stringify(entities))
}



