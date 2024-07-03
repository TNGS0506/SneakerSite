import React from 'react';
import axios from 'axios'
import { accountIcon,Mail, second_mail, Phone } from '../assets'
import { useState, useEffect } from 'react';
import "../styles/EmailStyle.css"
import { server } from '../constants';

const Email = () => {
    const [sender, setName] =useState("")
    const [text, setMessage] = useState("")
    const [phone_number, setNumber] = useState("")

    const HandleSubmit = (event) => {
        event.preventDefault();

        axios.post(server + 'submit-feedback/', { sender, phone_number,text })
            .then(response => {
                console.log(response.data);
                alert('Feedback submitted successfully!');
                setName("");
                setMessage("");
                setNumber("");
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error submitting feedback. Please try again.');
            });
    }



    return (
        <div className='container h-[435px] max-w-full'> 
            <div className='pink-container'>
                <div className='third'>
                    <div className='fourth'>
                        <div className='fifth'>
                            <h1>Санал сэтгэгдлээ үлдээх</h1>
                        </div>
                        <div className='sixth'>
                            <div className='flex items-center'>
                                <img src={Phone} alt="Phone Icon" /> <span className="ml-2">88585816</span>
                            </div>
                            <div className='flex items-center'>
                                <img src={Mail} alt="Mail Icon" /> <span className="ml-2">saba.ms1206@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='input-div'>
                    <form className="input-form" action="/submit-feedback" method="post" onSubmit={HandleSubmit}>
                        <div className="flex items-center gap-2">
                            <img src={accountIcon} className='w-6 h-6'/>
                            <input className='w-64 border-b-[1px] border-white outline-none' placeholder="Овог Нэг"
                                value = {sender} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={accountIcon} className='w-6 h-6'/>
                            <input className='w-64 border-b-[1px] border-white outline-none' placeholder="Утасны дугаар"
                                value = {phone_number} onChange={(e) => setNumber(e.target.value)}/>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src={second_mail} className='w-6 h-6'/>
                            <textarea className='w-64 border-b-[1px] border-white  outline-none' placeholder="Сэтгэгдэл" rows="2"
                            value = {text} onChange = {(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <div className='button-class'>
                            <button type='submit' className='text-black mt-1 ml-24'>Илгээх</button>
                        </div>
                    </form>
                    </div>
            </div>
        </div>
    );
};
export default Email
