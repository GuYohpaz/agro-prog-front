import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


import { bagService } from './../services/bag-service';

export const CompressPlantingBag = () => {

    const [compressAmount, setAmount] = useState('')
    const { totalSeedlingsCapacity } = useSelector(state => state.seedlingModule) // globalState (from seedling-reducer file)


    const handleChange = (ev) => {
        const { name, value, type } = ev.target
        type === 'number' || 'range' ? +value : value
        setAmount(value)

    }


    const addCompressionPercentage = (ev) => {
        ev.preventDefault()

        if (totalSeedlingsCapacity !== null) {
            bagService.calculateCompressionResultIncludeSeedlingsCapacity(compressAmount)

        } else {

            bagService.calculateCompressionResultWithShapesCapacity(compressAmount)

        }

        setAmount(0)


        const bagsMainDiv = document.querySelector('.bags-main-div')
        bagsMainDiv.style.opacity = 100
        bagsMainDiv.style.transition = 'transform 0.4s ease, opacity 0.4s ease'

        const compressionBtn = document.querySelector('.include-compression-btn')
        compressionBtn.style.fontFamily = 'Fb Tubic regular'

        setTimeout(() => {

            const restartBtn = document.querySelector('.restart-btn')
            restartBtn.style.opacity = 100
            restartBtn.style.transition = 'transform 0.4s ease, opacity 0.4s ease'
            restartBtn.style.display = 'block'

        }, 1500)

    }


    return (

        <section style={{ gap: '10px', height: '70px' }} className='compression-section flex column align-center '>
            <nav style={{ width: '100%', height: '45px', boxShadow: '0 0.1px 6px 0 rgba(0, 0, 0, 0.1), 0 1.5px 2px 0 rgba(0, 0, 0, 0.1)' }} className='flex row align-center space-between'>
                <h4 style={{ margin: 0, paddingLeft: 15 }}>Include Compression Percentage ?</h4>
                <input style={{ textAlign: 'center', borderWidth: ' 0px 0px 2px 0px', width: '25px' }} name='amount' placeholder='%' type="number" value={compressAmount} onChange={handleChange} />

                <div className='flex column align-center' style={{ width: '40px', paddingRight: '15px' }}>
                    <button style={{ color: '#8EC170', backgroundColor: 'white', border: 'none' }} className='include-compression-btn' onClick={addCompressionPercentage}>Add</button>
                </div>

            </nav>

        </section>
    )


}