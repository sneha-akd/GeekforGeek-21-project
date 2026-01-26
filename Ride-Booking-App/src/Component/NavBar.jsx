import { Car, GalleryVerticalEnd, House, UserPen } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ to, Icon, name }) => {
  return <NavLink to={to} className="hover:bg-green-100 p-2 rounded-xl">
    <div className='flex flex-col items-center'>
      <Icon />
      {name}
    </div>
  </NavLink>
}

const NavBar = () => {
  return (<>
    <div className="h-20 w-full"></div>
    <div className="h-20 w-full bg-stone-50 fixed bottom-0 left-0 z-20">
      <div className="max-w-md mx-auto flex justify-evenly h-full items-center" >
        <NavItem to="home" name="Home" Icon={House} />
        <NavItem to="book" name="Book" Icon={Car} />
        <NavItem to="history" name="History" Icon={GalleryVerticalEnd} />
        <NavItem to="profile" name="Profile" Icon={UserPen} />
      </div>
    </div>
  </>
  )
}

export default NavBar