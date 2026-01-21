import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex flex-1 flex-row">
    <img src="https://thumbs.dreamstime.com/b/handshake-emoji-featuring-diverse-skin-tones-white-background-image-handshake-emoji-featuring-diverse-skin-tones-symbolizing-376082597.jpg" alt="Error" className="h-10 rounded-3xl" />
    <a className="btn btn-ghost text-xl"> GitTogether</a>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar