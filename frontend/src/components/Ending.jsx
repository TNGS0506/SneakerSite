import react from 'react'
import Paradise from '../assets/Paradise.jpg'
import '../styles/Ending.css'
import {Facebook, Instagram}  from '../constants/index'

const Ending = () => {

    return (
        <div className='container1'>
            <div className='TheMap'>
                <div className='child'>
                    <div className='child-content'>
                        Хаяг Байршил: <br></br>
                        <p className='pelement'>Улаанбаатар хот, Хүннү гудамж "Paradise Plaza", 4 давхар, 408 тоот</p>
                    </div>
                    
                </div>    

                <div className='Paradise'>
                    <img className='zurag' src={Paradise}/>
                </div>
            </div>



            <div className='container3'>
                <a href="https://www.facebook.com/MSmongolianstore" target="_blank">
                    <img className='first-image w-12' src={Facebook} alt="Facebook"/>
                </a>
                <a href="https://www.instagram.com/msmongolianstore/" target="_blank">
                    <img className='first-image w-12' src={Instagram} alt="Instagram"/>
                </a>
            </div>

        </div>
    )
}

export default Ending;