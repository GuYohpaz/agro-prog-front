import React, { useEffect, useState } from 'react'

import { bagService } from '../../services/bag-service';


export const BagsM = () => {

    const [bags, setBags] = useState([])


    useEffect(() => {

        loadBags()

    }, [bags])


    const loadBags = async () => {

        const bags = await bagService.query()
        setBags(bags)
    }


    if (bags.length > 0) return (
        <section className='flex column'>


            <form className='bags-container flex column align-center'>
                <h2>Bags Amount</h2>

                <ul>
                    {bags.map(bag =>
                        bag.amount > 0 &&
                        <li className='flex column space-between' key={bag._id}>

                            <pre>{bag.name}</pre>
                            <span>{bag.amount}</span>

                        </li>)
                    }
                </ul>

            </form>

        </section>
    )


}