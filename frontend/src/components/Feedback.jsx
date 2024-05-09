import React from 'react'
import ProfileIcon from '../assets/Feedback/me.jpg'
import "../styles/Feedback.css"
import Star from "../assets/star.svg"

const Feedback = () => {
    return (
        <div className='feedback-container'>
            <div className='feedback-content'>
                <div className="feedback-heading">
                    <h1>Үйлчлүүлэгчдийн сэтгэгдэл:</h1>
                </div>

                <div className="feedback-text">
                    <p>"Дэлгүүрт бүх шилдэг брэндүүдийн гайхалтай сонголттой пүүзнүүд, мөн миний хайж байсан өвөрмөц, олоход хэцүү байсан загварууд бэлэн байсан. Дэлгүүрийн зохион байгуулалт нь цэвэрхэн, эмх цэгцтэй байсан тул хайсан зүйлээ олоход хялбар байсан."</p>
                </div>

                <div className="feedback-profile flex items-center">
                    <img src={ProfileIcon} className="profile-image" alt="Profile" />
                    <div className='profile-info'>
                        <h2 className="profile-name">Tengis Gantulga</h2>
                        <p className="profile-location">Ulaanbaatar, Mongolia</p>
                    </div>
                </div>
                <div className="feedback-star">
                    <div className='star-icon'/>
                    <div className='star-icon'/>
                    <div className='star-icon'/>
                    <div className='star-icon'/>
                    <div className='star-icon'/>
                </div>
            </div>
        </div>
    )
}


export default Feedback
