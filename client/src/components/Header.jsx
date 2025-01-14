import React from 'react'
import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
const Header = () => {

    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme)
    const { currentUser } = useSelector((state) => state.user);
    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-centre whitespace-nowrap text-sm  sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                    BlogNow
                </span>
                It
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline '
                />
            </form>
            <Button className='w-12 h-10  lg:hidden ' color='gray' pill>
                <AiOutlineSearch className='text-lg' />
            </Button>
            <div className='flex gap-2  md:order-2'>
                <Button className='w-12 h-10   hidden sm:inline ' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>

                {currentUser ? (
                    <Dropdown arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>{currentUser.username}</span>
                            <span className='block text-sm font-md truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=profile">
                            <Dropdown.Item>Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Sign Out</Dropdown.Item>

                        </Link>
                    </Dropdown>
                ) : (
                    <Link to="/signIn">
                        <Button gradientDuoTone='purpleToBlue' outline >
                            Sign In
                        </Button>
                    </Link>

                )
                }

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={"div"} className='rounded'>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"} className='rounded'>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"} className='rounded'>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header