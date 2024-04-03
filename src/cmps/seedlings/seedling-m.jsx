import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { seedlingService } from '../../services/seedling-service'
import { calculateSeedlingsCart, removeSeedling } from '../../store/seedling-action'

import { ReactComponent as Remove } from '../../assets/imgs/remove.svg'


export const SeedlingsM = () => {

    const { totalSeedlingsCapacity } = useSelector(state => state.seedlingModule) // globalState (from seedling-reducer file)
    const dispatch = useDispatch()

    const [seedlings, setSeedlings] = useState([])
    const [seedlingValueToAdd, setSeedling] = useState({ capacity: '', amount: '', _id: '' })


    useEffect(() => {

        loadSeedlings()

    }, [seedlings])


    const loadSeedlings = async () => {

        const seedlings = await seedlingService.query()
        setSeedlings(seedlings)

    }


    const onAddSeedling = async (ev) => {

        ev.preventDefault()
        seedlingService.save(seedlingValueToAdd)
        setSeedling({ capacity: '', amount: '' })

    }


    const handleChange = (ev) => {

        const { name, value, type } = ev.target
        type === 'number' || 'range' ? +value : value
        setSeedling({ ...seedlingValueToAdd, [name]: value })

    }


    const onRemoveSeedling = (seedlingId) => {

        dispatch(removeSeedling(seedlingId))

    }


    const onCalculateAddedSeedling = async (ev) => {

        ev.preventDefault()
        dispatch(calculateSeedlingsCart())


        const seedlingsMainContainer = document.querySelector('.seedlings-container')
        seedlingsMainContainer.style.display = 'none'
        seedlingsMainContainer.style.transition = 'transform 0.4s ease, opacity 0.4s ease'
        seedlingsMainContainer.style.opacity = 0

        // manipulate over sibling component
        const compressionDiv = document.querySelector('.compression-div')
        compressionDiv.style.visibility = 'visible'

    }


    return (

        <section>

            <form style={{ opacity: 100, display: 'block' }} className='seedlings-container flex column' action="">

                <div className='flex row choose-seedling-capacity-box align-center space-between'>
                    <h4>Seedling Capacity:</h4>
                    <input type='number' name='capacity' placeholder='Enter literes amount' value={seedlingValueToAdd.capacity} onChange={handleChange} />

                </div>
                <hr style={{ borderColor: '#513C3C', borderWidth: '0.01px', margin: '10px 0px', opacity: '10%' }} />


                <div className='flex column choose-seedling-amount-box'>
                    <h5>Choose Seedling Amount:</h5>
                    <input className='range-slider' type="range" name='amount' value={seedlingValueToAdd.amount} min='0' max='250' onChange={handleChange} />
                    <section className='flex row space-between'>
                        <input name='amount' placeholder='Units' value={seedlingValueToAdd.amount} type="number" onChange={handleChange} />
                        <button onClick={(ev) => onAddSeedling(ev)} >Add</button>
                    </section>
                </div>


                {seedlings.length > 0 && <div className='seedlings-cart'>

                    <hr style={{ borderColor: '#513C3C', borderWidth: '0.01px', margin: '10px 0px', opacity: '10%' }} />

                    <ul className='flex row'>

                        <div><h6>Seedlings Cart:</h6></div>

                        {seedlings.map(seedling =>
                            seedling &&

                            <li className='flex column space-between'
                                key={seedling._id}>
                                <Remove onClick={() => { onRemoveSeedling(seedling._id) }} style={{ height: 35, width: 35 }} />
                                <pre>{seedling.capacity} Liter</pre>
                                <pre>{seedling.amount} Units</pre>
                            </li>
                        )}

                    </ul>

                    <button className='cal-seedling-cart' onClick={onCalculateAddedSeedling}>Calculate Total Capacity</button>

                </div>}


            </form>

            {totalSeedlingsCapacity !== null && <h3>Total seedlings capacity: {totalSeedlingsCapacity.toLocaleString()} Liter</h3>}

        </section>

    )
}