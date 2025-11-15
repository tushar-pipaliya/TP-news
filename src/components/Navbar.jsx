import { Menu, Search, X } from 'lucide-react'
import logo from '../assets/logo.png'
import React, { useContext, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { ThemeContext } from '../context/ThemeContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

const links = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"]

const Navbar = ({ setArticles }) => {
    const { theme, setTheme } = useContext(ThemeContext)
    const [open, setOpen] = useState(false)

    const handleSearch = async (e) => {
        const search = e.target.value
        try {
            const res = await axios.get(`https://newsapi.org/v2/top-headlines?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`)

            setArticles(res.data.articles)

        } catch (error) {
            console.log(error);

        }

    }
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <div className="fixed w-full bg-white dark:bg-black dark:text-white z-10 shadow-md">
            <div className="px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to={'/'}>
                    <div className="cursor-pointer mr-2 dark:brightness-[50]">
                        <img src={logo} alt="Logo" className="h-6 lg:h-8" />
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className='hidden lg:flex space-x-6'>
                    {
                        links.map((link) => {
                            return <Link to={`/${link.toLowerCase()}`} key={link} className='text-gray-700 dark:text-gray-200 dark:hover:text-white hover:text-blue-600 transition'>
                                {link}
                            </Link>
                        })
                    }
                </div>
                <div className='flex items-center justify-center gap-4'>
                    <div className='relative bg-gray-200 p-2 rounded-lg'>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2  dark:text-black h-5 w-5" />
                        <input onChange={handleSearch} type="text" placeholder='Search news...' className='md:pl-10 pl-7 w-30 md:w-64 outline-none focus:outline-none text-black' />
                    </div>
                    <button onClick={toggleTheme} className='bg-gray-200 dark:bg-white dark:text-black px-3 py-2 rounded-lg cursor-pointer'>
                        {
                            theme === 'light' ? <FaMoon /> : <FaSun />
                        }
                    </button>

                    {/* Mobile menu button */}
                    <button onClick={() => setOpen(!open)} className='lg:hidden dark:text-gray-200'>
                        {
                            open ? <X size={25} /> : <Menu size={25} />
                        }
                    </button>
                </div>
            </div>
            {/* mobile menu */}
            {
                open && (
                    <div className='lg:hidden px-4 pb-4 text-center '>
                        {
                            links.map((link) => {
                                return <Link key={link}
                                    to={`/${link.toLowerCase()}`}
                                    onClick={() => setOpen(false)}
                                    className='block py-2 text-gray-700 dark:text-gray-200 dark:hover:text-white hover:text-blue-600 transition'
                                >
                                    {link}
                                </Link>
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Navbar




