import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { MainHeader } from '../cmps/main-header'
import { MainFooter } from '../cmps/main-footer'

import { ShapesM } from '../cmps/shapes/shapes-m'
import { BagsM } from '../cmps/bags/bags-m'
import { SeedlingsM } from '../cmps/seedlings/seedling-m'
import { CompressPlantingBag } from '../cmps/compress-planting-bag'

import { restartShapesStates } from '../store/shape-action'
import { restartSeedlingsStates } from '../store/seedling-action'

import { bagService } from '../services/bag-service'

import switchSound from '../assets/sounds/switch-handle.mp3'


export const Home = () => {


    const [switchHandle, setSwitchHandle] = useState(false)

    const dispatch = useDispatch()



    const onConvertOnlyShapeCapacity = async () => {

        onPlaySwitchHandleSound()

        const compressionDiv = document.querySelector('.compression-div')
        compressionDiv.style.visibility = 'visible'

        const shapesCompressionBtn = document.querySelector('.shapes-compression-btn')
        shapesCompressionBtn.style.visibility = 'visible'

        // no / yes
        const convertOnlyShapesBtn = document.querySelector('.only-shapes-btn')
        convertOnlyShapesBtn.style.fontFamily = 'Fb Tubic bold'
        convertOnlyShapesBtn.style.color = '#8EC170'

        const convertIncludeSeedlingsBtn = document.querySelector('.include-seedlings-btn')
        convertIncludeSeedlingsBtn.style.color = 'rgba(6, 98, 236, 0.422)'




    }


    const onPlaySwitchHandleSound = () => {

        const switchAudio = new Audio(switchSound)
        switchAudio.play()

    }


    const handleRestart = () => {
        
        // restart css keys -->
        
        setTimeout(() => {
            
            const restartBtn = document.querySelector('.restart-btn')
            restartBtn.style.opacity = 0
            restartBtn.style.transition = 'transform 0.4s ease, opacity 0.4s ease'
            restartBtn.style.display = 'none'
            
        }, 0)
        
        
        setTimeout(() => {
            
            const bagsMainDiv = document.querySelector('.bags-main-div')
            bagsMainDiv.style.opacity = 0
            bagsMainDiv.style.transition = 'transform 0.4s ease, opacity 0.4s ease'
            
        }, 500)

        
        setTimeout(() => {
            
            const compressionBtn = document.querySelector('.include-compression-btn')
            compressionBtn.style.fontFamily = 'Fb Tubic light'
            const compressionDiv = document.querySelector('.compression-div')
            compressionDiv.style.visibility = 'hidden'
            
        }, 1000)
        
        
        
        setTimeout(() => {
            
            
            const seedlingsNavTag = document.querySelector('.seedlings-nav')
            seedlingsNavTag.style.transition = 'transform 0.4s ease, opacity 0.4s ease'
            seedlingsNavTag.style.opacity = 0
            
        }, 1500)

        setTimeout(() => {

        const shpaesMiddleContainer = document.querySelector('.shapes-middle-container')
        shpaesMiddleContainer.style.display = 'block'
        shpaesMiddleContainer.style.opacity = 100
        
    }, 2000)


        const dotsLoadingDiv = document.querySelector('.dots-loading-box')
        dotsLoadingDiv.style.visibility = 'visible'
        
        
        setSwitchHandle(false)
        dispatch(restartShapesStates())
        dispatch(restartSeedlingsStates())
        bagService.restartBagsStates()
    }
    
    return (
        
        <section className='home main-layout flex column align-center'>


            <div> <MainHeader /> </div>

            <div className='questionnaire-box flex column'>
                <div className='shapes-main'> <ShapesM onPlaySwitchHandleSound={onPlaySwitchHandleSound} /> </div>

                <div style={{ opacity: 0 }} className='seedlings-nav'>
                    <nav><h2>Include Seedling Capacity</h2>

                        <section className='space-between'>
                            <button style={{ color: switchHandle === true ? '#8EC170' : null, fontFamily: switchHandle === true ? 'Fb Tubic bold' : null }} className='include-seedlings-btn' onClick={() => { setSwitchHandle(true), onPlaySwitchHandleSound() }} name='yes'> Yes </button>/
                            <button className='only-shapes-btn' onClick={() => { setSwitchHandle(false), onPlaySwitchHandleSound(), onConvertOnlyShapeCapacity() }} name='no'> No </button>
                        </section>

                    </nav>
                    {switchHandle === true && <div> <SeedlingsM /></div>}

                </div>

                <div style={{ visibility: 'hidden' }} className='compression-div'> <CompressPlantingBag /> </div>

                <div style={{opacity:0}} className='bags-main-div'> <BagsM /> </div>

                <button className='restart-btn' onClick={handleRestart}>

                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="85" height="85" viewBox="0 0 100 100">
                        <g>
                            <path fill="#fdfcee" d="M50 26.042A23.958 23.958 0 1 0 50 73.958A23.958 23.958 0 1 0 50 26.042Z"></path>
                            <path fill="#472b29" d="M50,26.4c13.013,0,23.6,10.587,23.6,23.6S63.013,73.6,50,73.6S26.4,63.013,26.4,50 S36.987,26.4,50,26.4 M50,25c-13.807,0-25,11.193-25,25s11.193,25,25,25s25-11.193,25-25S63.807,25,50,25L50,25z"></path>
                            <path fill="#93bc39" d="M49.999 30.374999999999996A19.626 19.626 0 1 0 49.999 69.627A19.626 19.626 0 1 0 49.999 30.374999999999996Z"></path>
                            <path fill="#b7cc6b" d="M49.999,33.375c10.333,0,18.781,7.99,19.55,18.126 c0.038-0.497,0.076-0.994,0.076-1.5c0-10.839-8.787-19.626-19.626-19.626c-10.839,0-19.626,8.787-19.626,19.626 c0,0.506,0.038,1.003,0.076,1.5C31.218,41.365,39.667,33.375,49.999,33.375z"></path>
                            <path fill="#472b29" d="M49.999,30.75c10.615,0,19.251,8.635,19.251,19.249c0,10.615-8.636,19.251-19.251,19.251 c-10.614,0-19.249-8.636-19.249-19.251C30.75,39.385,39.385,30.75,49.999,30.75 M49.999,30C38.972,30,30,38.972,30,49.999 C30,61.027,38.972,70,49.999,70C61.027,70,70,61.027,70,49.999S61.027,30,49.999,30L49.999,30z"></path></g><g><path fill="#fdfcee" d="M52.8,38h-6.3c-3.038,0-5.5,2.462-5.5,5.5v10.379l-0.82-0.82C40.141,53.02,40.089,53,40.038,53 c-0.051,0-0.103,0.02-0.141,0.059l-1.838,1.838C38.02,54.936,38,54.987,38,55.038c0,0.051,0.02,0.102,0.059,0.141l4.3,4.3 c0.078,0.078,0.205,0.078,0.283,0l4.3-4.3c0.078-0.078,0.078-0.205,0-0.283l-1.838-1.838c-0.078-0.078-0.205-0.078-0.283,0 L44,53.879V43.5c0-1.381,1.119-2.5,2.5-2.5h6.3c0.11,0,0.2-0.09,0.2-0.2v-2.6C53,38.09,52.91,38,52.8,38z"></path><path fill="#472b29" d="M52.5,38.5v2h-6c-1.654,0-3,1.346-3,3v10.379v1.207l0.854-0.854l0.608-0.608l1.414,1.414 L42.5,58.914l-3.876-3.876l1.414-1.414l0.608,0.608l0.854,0.854v-1.207V43.5c0-2.757,2.243-5,5-5H52.5 M52.8,38h-6.3 c-3.038,0-5.5,2.462-5.5,5.5v10.379l-0.82-0.82C40.141,53.02,40.089,53,40.038,53c-0.051,0-0.103,0.02-0.141,0.059l-1.838,1.838 C38.02,54.936,38,54.987,38,55.038c0,0.051,0.02,0.102,0.059,0.141l4.3,4.3c0.039,0.039,0.09,0.059,0.141,0.059 s0.102-0.02,0.141-0.059l4.3-4.3c0.078-0.078,0.078-0.205,0-0.283l-1.838-1.838C45.064,53.02,45.013,53,44.962,53 s-0.102,0.02-0.141,0.059L44,53.879V43.5c0-1.381,1.119-2.5,2.5-2.5h6.3c0.11,0,0.2-0.09,0.2-0.2v-2.6C53,38.09,52.91,38,52.8,38 L52.8,38z"></path><g><path fill="#fdfcee" d="M47.2,62h6.3c3.038,0,5.5-2.462,5.5-5.5V46.121l0.82,0.82C59.859,46.98,59.911,47,59.962,47 c0.051,0,0.103-0.02,0.141-0.059l1.838-1.838C61.98,45.064,62,45.013,62,44.962c0-0.051-0.02-0.102-0.059-0.141l-4.3-4.3 c-0.078-0.078-0.205-0.078-0.283,0l-4.3,4.3c-0.078,0.078-0.078,0.205,0,0.283l1.838,1.838c0.078,0.078,0.205,0.078,0.283,0 l0.82-0.82V56.5c0,1.381-1.119,2.5-2.5,2.5h-6.3c-0.11,0-0.2,0.09-0.2,0.2v2.6C47,61.91,47.09,62,47.2,62z"></path><path fill="#472b29" d="M57.5,41.086l3.876,3.876l-1.414,1.414l-0.608-0.608L58.5,44.914v1.207V56.5c0,2.757-2.243,5-5,5 h-6v-2h6c1.654,0,3-1.346,3-3V46.121v-1.207l-0.854,0.854l-0.608,0.608l-1.414-1.414L57.5,41.086 M57.5,40.462 c-0.051,0-0.102,0.02-0.141,0.059l-4.3,4.3c-0.078,0.078-0.078,0.205,0,0.283l1.838,1.838C54.936,46.98,54.987,47,55.038,47 s0.102-0.02,0.141-0.059l0.82-0.82V56.5c0,1.381-1.119,2.5-2.5,2.5h-6.3c-0.11,0-0.2,0.09-0.2,0.2v2.6c0,0.11,0.09,0.2,0.2,0.2 h6.3c3.038,0,5.5-2.462,5.5-5.5V46.121l0.82,0.82C59.859,46.98,59.911,47,59.962,47c0.051,0,0.103-0.02,0.141-0.059l1.838-1.838 C61.98,45.064,62,45.013,62,44.962c0-0.051-0.02-0.102-0.059-0.141l-4.3-4.3C57.602,40.481,57.551,40.462,57.5,40.462L57.5,40.462 z"></path></g></g>
                    </svg>
                </button>
            </div>

        </section>
    )
}