import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import agroCover from '../assets/imgs/agro-cover.png'



export function MainHeader() {


    // -- Todo -->
    // const { shapesCart, totalShapesCapacityResult, shapes } = useSelector(state => state.shapeModule)
    // const { seedlingsCart, totalSeedlingsCapacity } = useSelector(state => state.seedlingModule)
    // const dispatch = useDispatch()


    return (

        <section className='main-header flex column align-center' >
            <nav> <h1>Agro Calculator</h1> </nav>

            <div className=''>

                <img className='img-cover' src={agroCover} alt="" />

            </div>

        </section>
    )
}
