import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ heading, para, url, link }) => {
    return (
        <div className="border-2 border-white px-4 py-2 flex flex-col  rounded-lg">
            <div className=''>
                <img src={url} alt="img" className="w-full  h-60 object-cover " />
            </div>
            <div className="py-4 px-2 text-center">
                <div className="text-2xl font-bold">
                    <h1>{heading}</h1>
                </div>
                <div>
                    <p>{para}</p>
                </div>
                <div>
                    
                      <button className='bg-blue-200/40 p-3 mt-6 rounded-lg font-bold hover:bg-blue-300'>
                    <Link color='#1234' to={link}>Click here   </Link>
                        </button>  
                
                    
                </div>

            </div>
        </div>
    )
}

export default Card
