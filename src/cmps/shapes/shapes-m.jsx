import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addShape, loadShapes, loadShape, removeShape, calculateShapesCart } from '../../store/shape-action'

import { ReactComponent as Remove } from '../../assets/imgs/remove.svg'
import arrow from '../../assets/imgs/arrow.png'


export const ShapesM = ({ onPlaySwitchHandleSound }) => {

    const { shapes, shape, shapesCart, totalShapesCapacityResult } = useSelector(state => state.shapeModule) // globalState (from shape-reducer file)
    const dispatch = useDispatch()

    const [eqVars, setVars] = useState({ depth: '', len: '', width: '', radius: '' })
    const [switchHandle, setSwitchHandle] = useState(false)


    useEffect(() => {

        dispatch(loadShapes())

    }, [shapesCart])


    // Bring shape by Id after 'option' tag clicked 
    const onLoadShape = async (shapeId) => {

        dispatch(loadShape(shapeId))

        // Close option tags
        setSwitchHandle(false)

        const dotsLoadingDiv = document.querySelector('.dots-loading-box')
        dotsLoadingDiv.style.visibility = 'hidden'

    }


    const handleChange = (ev) => {
        const { name, value, type } = ev.target
        type === 'number' ? +value : value
        setVars({ ...eqVars, [name]: value })

    }


    const onCalculateShapesCart = async (ev) => {

        ev.preventDefault()
        dispatch(calculateShapesCart())


        const shpaesMiddleContainer = document.querySelector('.shapes-middle-container')
        shpaesMiddleContainer.style.display = 'none'
        shpaesMiddleContainer.style.transition = 'transform 0.4s ease, opacity 0.4s ease'
        shpaesMiddleContainer.style.opacity = 0

      
        // reveal seedlings nav ---> influance over  seedlings-m cmp
        setTimeout(() => {
            
            const seedlingsNavTag = document.querySelector('.seedlings-nav')
            seedlingsNavTag.style.transition = 'transform 0.4s ease, opacity 0.4s ease'
            seedlingsNavTag.style.opacity = 100

        }, 500)

    }


    const onRemoveShape = (shapeId) => {

        dispatch(removeShape(shapeId))
    }


    const onAddNewShape = async (ev) => {

        ev.preventDefault()
        if (!eqVars.depth && !eqVars.len && !eqVars.width) return alert('All fields are required')
        dispatch(addShape(eqVars, shape))
        setVars({ depth: '', len: '', width: '', radius: '' })

    }


    // Anecdotes:

    // two triggers for options list ->
    // 1. Todo ---> 'input' manipulate over the options list by filter action. 
    // 2.  'img'  onclick reveal options list. 
    // ---------------------------------------- 

    if (shapes) return (

        <section className='shapes-container flex column'>

            {/* searchNav */}
            <article className='flex row align-center space-between'>
                <input type='text' name='name' placeholder={shape === undefined || shape?.length === 0 ? 'Search Shape' : shape.name} />

                <div className='dots-loading-box'>

                    <span>.</span>
                    <span>.</span>
                    <span>.</span>

                </div>

                {/* // options list link (imgTag) */}
                <img style={{ zIndex: 100, padding: switchHandle === false ? '0px' : '6px 0px 0px 0px', rotate: switchHandle === false ? '-90deg' : '0deg' }} onClick={() => { setSwitchHandle(prevSwitchHandle => !prevSwitchHandle), onPlaySwitchHandleSound() }} src={arrow} alt="" />

            </article>


            {switchHandle === true &&
                <nav>

                    <div className='names-list-box'> {shapes.map(shape => shape.capacity === 0 &&
                        <div key={shape._id} className='names-list-item flex row space-between'>

                            <option onClick={() => onLoadShape(shape._id)} >{shape.name}</option>
                            <img src={shape.imgUrl} alt="Image" />
                            <hr style={{}} />
                        </div>)}
                    </div>
                </nav>
            }

             <section style={{opacity: 100, display:'block'}} className='shapes-middle-container' >

                <form className='shapes-inputs-box flex column' onSubmit={onAddNewShape}>


                    {/* shapes Eq inputs */}
                    {shape?.name === 'Cylinder' && <div className='flex row space-between '>

                        <div className='flex row'>
                            <input type='number' name='radius' id='radius' placeholder='Radius' value={eqVars.radius} onChange={handleChange} />
                            <input type='number' name='depth' id='depth' placeholder='Depth' value={eqVars.depth} onChange={handleChange} />

                        </div>

                        <button className='btn-calculate-shape' onClick={() => { onAddNewShape }}>Add</button>

                    </div>}

                    {shape?.name === 'Cube' && <div className='flex row space-between '>

                        <div className='flex row'>
                            <input type='number' name='len' id='len' placeholder='Length' value={eqVars.len} onChange={handleChange} />
                        </div>

                        <button className='btn-calculate-shape' onClick={() => { onAddNewShape }}>Add</button>

                    </div>}

                    {shape?.name === 'Rectangular' && <div className='flex row space-between '>

                        <div className='flex row'>
                            <input type='number' name='depth' id='depth' placeholder='Depth' value={eqVars.depth} onChange={handleChange} />
                            <input type='number' name='len' id='len' placeholder='Length' value={eqVars.len} onChange={handleChange} />
                            <input type="number" name='width' id='width' placeholder='Width' value={eqVars.width} onChange={handleChange} />

                        </div>

                        <button className='btn-calculate-shape' onClick={() => { onAddNewShape }}>Add</button>

                    </div>}

                </form>


                {shapesCart.length > 0 && <div className='cart-box'>

                    <hr style={{ borderColor: '#513C3C', borderWidth: '0.01px', margin: '10px 15px', opacity: '10%' }} />
                    <ul className='flex row align-center'>

                        <div><h6>Shapes Cart:</h6></div>

                        {shapes.map(shape => shape.capacity > 0 &&
                            <li className='flex column space-between'
                                key={shape._id}>
                                <Remove onClick={() => { onRemoveShape(shape._id) }} style={{ height: 35, width: 35 }} />
                                <pre>{shape.name}</pre>
                                <pre>{shape.capacity} Liter</pre>

                            </li>

                        )}

                    </ul>

                    <button onClick={onCalculateShapesCart}>Calculate Total Capacity</button>

                </div>}

            </section>

            {totalShapesCapacityResult !== null && <h3>Total shapes capacity: {totalShapesCapacityResult.toLocaleString()} Liter</h3>}

        </section>

    )

}



