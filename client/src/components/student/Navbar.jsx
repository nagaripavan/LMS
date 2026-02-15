import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { SignIn, useClerk , UserButton, useUser} from '@clerk/clerk-react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const Navbar = () => {

  const isCourseListPage = location.pathname.includes('/course-list')

  const{navigate} = useContext(AppContext)

  const {openSignIn} = useClerk()
  const {user} = useUser()

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4  bg-cyan-100/70 ${isCourseListPage? 'bg-white' : 'bg-cyan-100/70'}`}>
        <img className='w-28 lg:w-32 cursor-pointer ' onClick={()=>navigate('/')} src={assets.logo1} alt="Logo" />
        <div className='hidden md:flex items-center gap-5 text-gray-500'>
          <div className='flex items-center gap-5'> 
            {user &&
              <>
                 <button>Become Educator</button>
                 | <Link to='/my-enrollments'>My Enrollments</Link>
          
              </>
            }
          </div>
          {user?<UserButton/>:
            <button onClick={()=>openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer'>Create Account</button>
          }
        </div>

        {/* Mobile View */}
        <div className='md:hidden flex items-center sm:gap-5 gap-2 text-gray-500'>
          <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
            {user &&
              <>
                 <button>Become Educator</button>
                 | <Link to='/my-enrollments'>My Enrollments</Link>
          
              </>
            }
          </div>
          {user?<UserButton/>:
            <button onClick={()=>openSignIn()}><img src={assets.user_icon} alt="" /></button>
          }
        </div>
    </div>
  )
}

export default Navbar