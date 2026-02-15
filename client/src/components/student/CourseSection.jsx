import React from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const CourseSection = () => {

    const {allCourses} = useContext(AppContext)

  return (
    <div className='pt-16 md:px-32 px-5'>
        <h2 className='text-3xl font-semibold text-gray-800'>Learn from the best</h2>
        <p className='pt-3 text-gray-500 text-sm'>Discover our top-rated courses across various categories. From coding and design to <br /> business and wellness, our courses are crafted to deliver results.</p>
        
        <div className='grid grid-cols-auto px-4 md:px-0 md:mt-16 my-10 gap-4'>
          {allCourses.slice(0,4).map((course,index)=><CourseCard key={index} course={course} />)}
        </div>

        <Link to='/course-list' onClick={()=>scrollTo(0,0)} className=' px-7 py-2 border border-gray-300 text-gray-500 rounded font-light text-sm'>Explore Courses</Link>
    </div>
  )
}

export default CourseSection