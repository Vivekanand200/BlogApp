import React from 'react'
import { Footer, FooterTitle } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsTwitter,BsGithub,BsDribbble} from 'react-icons/bs'
const FooterComponent = () => {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid -full justify-between sm:flex md:grid-cols-1 '>
                    <Link to="/" className='self-centre whitespace-nowrap text-sm  sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            BlogNow
                        </span>
                        It
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>

                    <div className=''>
                        <FooterTitle title='About' />
                        <Footer.LinkGroup className='flex flex-col gap-4'>
                            <Footer.Link
                                href='https://github.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                More Projects
                            </Footer.Link>
                            <Footer.Link
                                href='https://github.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                My Blog
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <FooterTitle title='Follow Us' />
                        <Footer.LinkGroup className='flex flex-col gap-4'>
                            <Footer.Link
                                href='https://github.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Github
                            </Footer.Link>
                            <Footer.Link
                                href='https://github.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Discord
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <FooterTitle title='legal' />
                        <Footer.LinkGroup className='flex flex-col gap-4'>
                            <Footer.Link
                                href='https://github.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link
                                href='https://github.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Terms & Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>

                </div>
                <Footer.Divider />
                <div className=' w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='#' by='My Blog' year = {new Date().getFullYear()} />

                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook} />                        
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                        <Footer.Icon href='http://github.com' icon={BsGithub} />
                        <Footer.Icon href='#' icon={BsDribbble} />

                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterComponent