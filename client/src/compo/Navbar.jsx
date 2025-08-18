import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        navigate('/');
    };

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className='w-full'>
            {/* Top Navbar */}
            <div className='flex w-full h-[60px] justify-between items-center mt-3 py-2 px-4 md:px-10'>
                <NavLink to={'/'}>
                    <h1 className='font-bold text-green-500 text-2xl cursor-pointer'>Multi-Mart</h1>
                </NavLink>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-start gap-5 font-medium text-white">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'text-green-500' : '')}>
                        <li className='py-1'>Home</li>
                    </NavLink>
                    <NavLink to="/vendors" className={({ isActive }) => (isActive ? 'text-green-500' : '')}>
                        <li className='py-1'>All Vendors</li>
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-green-500' : '')}>
                        <li className='py-1'>About</li>
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? 'text-green-500' : '')}>
                        <li className='py-1'>Contact</li>
                    </NavLink>
                </ul>

                {/* Profile or Login Button + Mobile Menu Toggle */}
                <div className='flex items-center gap-4'>
                    {token && userData ? (
                        <div className='hidden md:flex items-center gap-2 relative group cursor-pointer'>
                            <img src={userData.image} alt="profile" className='w-8 h-8 object-cover rounded-full' />
                            <FaAngleDown className='w-2.5 text-white' />

                            {/* Dropdown */}
                            <div className='absolute top-10 right-0 text-sm font-medium text-white pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 transition-all duration-500'>
                                <div className='min-w-48 bg-stone-500 rounded flex flex-col gap-4 p-4 z-10'>
                                    <p onClick={() => navigate('/my-profile')} className='cursor-pointer hover:text-white/60'>My Profile</p>
                                    <p onClick={() => navigate('/my-bookings')} className='cursor-pointer hover:text-white/60'>My Bookings</p>
                                    <p onClick={logout} className='cursor-pointer hover:text-white/60'>Logout</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => navigate("/login")} className='hidden md:block text-white border bg-green-500 px-3 py-1 rounded-2xl'>
                            Create Account
                        </button>
                    )}

                    {/* Mobile Menu Toggle Icon */}
                    {isMobileMenuOpen
                        ? <IoMdClose className='text-white text-3xl md:hidden' onClick={toggleMenu} />
                        : <RiMenu4Fill className='text-white text-3xl md:hidden' onClick={toggleMenu} />}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden px-4 text-black rounded-lg font-medium bg-green-400 flex justify-center flex-col overflow-hidden transition-all duration-500 ease-in-out transform origin-top ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 scale-100 py-4' : 'max-h-0 opacity-0 scale-95'}`}>
                <NavLink to="/" onClick={toggleMenu} className='block py-2 hover:text-green-400'>Home</NavLink>
                <NavLink to="/vendors" onClick={toggleMenu} className='block py-2 hover:text-green-400'>All Vendors</NavLink>
                <NavLink to="/about" onClick={toggleMenu} className='block py-2 hover:text-green-400'>About</NavLink>
                <NavLink to="/contact" onClick={toggleMenu} className='block py-2 hover:text-green-400'>Contact</NavLink>

                {token ? (
                    <>
                        <p onClick={() => { navigate('/my-profile'); toggleMenu(); }} className='py-2 cursor-pointer hover:text-white/60'>My Profile</p>
                        <p onClick={() => { navigate('/my-bookings'); toggleMenu(); }} className='py-2 cursor-pointer hover:text-white/60'>My Bookings</p>
                        <p onClick={() => { logout(); toggleMenu(); }} className='py-2 cursor-pointer hover:text-white/60'>Logout</p>
                    </>
                ) : (
                    <button 
                        onClick={() => { navigate("/login"); toggleMenu(); }}
                        className='mt-2 text-white border bg-green-500 px-3 py-1 rounded-2xl'
                    >
                        Create Account
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
