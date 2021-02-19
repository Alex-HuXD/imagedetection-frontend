import React from 'react'
import './logo.css'
import Tilt from 'react-tilt'
import Brain from './brain.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br shadow-2" options={{ max : 35 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner pa3"> <img src={Brain} alt='logo' /> </div>
            </Tilt>
            
        </div>
    )
}

export default Logo
