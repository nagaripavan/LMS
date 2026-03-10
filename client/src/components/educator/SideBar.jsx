import React from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { NavLink } from 'react-router-dom'


const SideBar = () => {

  const {isEducator} = useContext(AppContext)

  const menuItems = [
    {name:'Dashboard',link:'/educator',icon:assets.home_icon},
    {name:'Add Course',link:'/educator/add-course',icon:assets.add_icon},
    {name:'My Courses',link:'/educator/my-courses',icon:assets.my_course_icon},
    {name:'Students Enrolled',link:'/educator/students-enrolled',icon:assets.person_tick_icon},
  ]

  return isEducator &&(
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500
    py-2 flex flex-col'>
        {menuItems.map((item,index)=>(
          <NavLink 
          to={item.link}
          key={item.name}
          end={item.link === '/educator'}
          className={({isActive})=>`flex items-center md:flex-row flex-col
            md:justify-start justify-center gap-3 md:px-10 py-3.5
             ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90 ' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'}`}
          >
            <img src={item.icon} alt="" className='w-6 h-6' />
            <p className='md:block hidden text-center '>{item.name}</p>
          </NavLink>
        ))}
    </div>
  )
}

export default SideBar