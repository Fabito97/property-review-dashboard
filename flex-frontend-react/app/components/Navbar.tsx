import React from 'react'
import { Link } from 'react-router'
import { navItems } from '~/constants'

const Navbar = () => {
  return (
    <nav className="p-5 sticky top-0 bg-white z-10 shadow-md">
        <div className="flex items-center justify-between max-w-[1100px] mx-auto">
          <div className="flex gap-1 items-end">
            <img
              src={"/logo.png"}
              alt="the flex"
              width={40}
              height={40}
              className={"rounded-full"}
            />
            <h1 className="mb-1 text-xl">the flex</h1>
          </div>

          <div className="flex gap-10">
            {navItems.map((item) => (
              <Link
                to={item.href}
                key={item.name}
                className="p-2 md:py-3 md:px-8 hover:bg-gray-200 hover:rounded-md gap-8"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
  )
}

export default Navbar