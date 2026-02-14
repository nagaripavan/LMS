import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {

  const navigate = useNavigate()
  const [input,setInput] = useState(data?data:'')

  const onSearchHandler = (e) => {
    e.preventDefault()
    navigate('/course-list/'+input)
  }

  return (
    <form onSubmit={onSearchHandler} className='flex items-center border border-gray-300 rounded-md px-1 py-1  w-full md:w-auto space-x-3'>
        <img className='pl-3' src={assets.search_icon} alt="search" />
        <input onChange={e=>setInput(e.target.value)} value={input} type="text" placeholder='Search for courses...' className='w-full md:w-96 px-4 py-2 outline-none'/>
        <button className='bg-blue-600 px-7 py-2 rounded text-white font-light'>Search</button>
    </form>
  )
}

export default SearchBar