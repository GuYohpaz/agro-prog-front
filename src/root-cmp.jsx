import { Route, Routes } from 'react-router-dom'

import '../src/assets/styles.scss'

import { Home } from './pages/home'
import { ShapesM } from '../src/cmps/shapes/shapes-m'
import { SeedlingsM } from '../src/cmps/seedlings/seedling-m'
import { BagsM } from '../src/cmps/bags/bags-m'


function RootCmp() {


    return (
        <section >
               <Routes>

                    <Route path='/' element={<Home />} /> 
                    <Route path='/shape' element={<ShapesM />} /> 
                    <Route path='/seedling' element={<SeedlingsM />} /> 
                    <Route path='/bag' element={<BagsM />} /> 

                </Routes>  

        </section >
    )
}

export default RootCmp