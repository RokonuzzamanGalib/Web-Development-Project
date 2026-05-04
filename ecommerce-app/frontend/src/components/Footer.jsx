import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
        <div>
            <img src={assets.logo} className=' mb-5 w-32' alt="" />
            <p className=' w-full md:w-2/3 text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis odit aut consequatur blanditiis sit totam culpa debitis, quo repudiandae nam, nihil expedita ea a? Soluta expedita exercitationem assumenda tenetur aperiam.
            </p>
        </div>
        <div>
            <p className=' text-xl font-medium mb-5' >
                COMPANY
            </p>
            <ul className='flex flex-col gap-1 text-gray-600'>
               <li><Link to='/'>Home</Link></li>
               <li><Link to='/about'>About us</Link></li>
               <li><Link to='/collection'>Delivery</Link></li>
               <li><Link to='/contact'>Privacy policy</Link></li> 
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+8801781-560362</li>
                <li>rokonuzzamangalib@mail.com</li>
            </ul>
        </div>

        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center '>
                Copyright 2026@ forever.com - All Right Reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer