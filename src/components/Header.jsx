import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import { useSearchStore } from '@/store/state';
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
    const router = useRouter();
    const [navbar, setNavbar] = useState(false);
    const [searchClick, setSearchClick] = useState(false);
    const sendSearch = useSearchStore((state) => state.sendSearch);
    const [menu, setMenu] = useState(false);
    const [movie, setMovie] = useState();

    const handleChange = (e) => {
        setMovie(e.target.value);
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }
    const handleSubmit = (e) => {
        e?.preventDefault();
        if (movie !== undefined && (movie !== '' || movie !== ' ')) {
            // sendSearch({ search: movie });
            router.push(`/search/${movie}`);
        }
        else {
            sendSearch({ search: '' });
        }
    }

    const changeNavbar = () => {
        if (window.scrollY >= 45) {
            setNavbar(true);
        }
        else {
            setNavbar(false);
        }
    }
    if (typeof window !== "undefined") {
        window.addEventListener('scroll', changeNavbar);
    }

    return (
        <>
            <header>
                <nav className={navbar ? 'active' : 'no-active'}>
                    <div className='logo'>
                        <Link href={'/'}><img src={'/img/logo.webp'} alt='HBO Max Logo' width={135} height={'auto'} /></Link>
                        
                        {/* Menu Mobile */}
                        <>
                            <div onClick={() => {
                                setMenu(trueM => !trueM); setTimeout(() => {
                                    document.getElementById('navbar')?.classList.add('zoom-in');
                                }, 10)
                            }} className='menu'>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    width="30px" height="30px" viewBox="0 0 512.000000 512.000000"
                                    preserveAspectRatio="xMidYMid meet">
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="white" stroke="none">
                                        <path d="M765 4033 c-164 -86 -166 -300 -3 -384 36 -18 85 -19 1795 -19 1690
                                        0 1760 1 1798 19 164 76 166 298 3 382 -36 18 -85 19 -1800 19 -1586 -1 -1766
                                        -2 -1793 -17z"/>
                                        <path d="M765 2753 c-164 -86 -166 -300 -3 -384 36 -18 74 -19 1155 -19 1067
                                        0 1120 1 1158 19 164 76 166 298 3 382 -36 18 -74 19 -1160 19 -1003 -1 -1126
                                        -2 -1153 -17z"/>
                                        <path d="M765 1474 c-164 -88 -166 -301 -2 -385 36 -19 61 -19 635 -17 l598 3
                                        37 25 c21 14 50 43 65 64 24 35 27 49 27 116 0 67 -3 81 -27 116 -15 21 -44
                                        50 -65 64 l-37 25 -600 2 c-533 2 -604 1 -631 -13z"/>
                                    </g>
                                </svg>
                            </div>
                            {
                                menu === true &&
                                <nav id="navbar">
                                    <svg className="close-btn-nav" onClick={() => {
                                        document.getElementById('navbar').classList.add('zoom-out');
                                        setTimeout(() => {
                                            setMenu(false);
                                        }, 500)
                                    }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'>
                                        <path d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z' />
                                    </svg>

                                    <ul className="nav">
                                        <li>
                                            <Link className={router.asPath === '/' ? 'a-active' : ' '} href='/'>Home</Link>
                                        </li>
                                        <li>
                                            <Link className={router.asPath === '/category/movies' ? 'a-active' : ' '} href='/category/movies'>Movies</Link>
                                        </li>
                                        <li>
                                            <Link className={router.asPath === '/category/series' ? 'a-active' : ' '} href='/category/series'>Series</Link>
                                        </li>
                                        <li>
                                            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                                                <input className={searchClick === true ? 'input-active' : ''} placeholder='Search...' onChange={handleChange} type="search" />
                                            </form>
                                            <svg onClick={() => handleSubmit()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg>
                                        </li>
                                        <li className='info-mobile'>
                                            <svg onClick={() => toast('🔔  No notifications', { id: 'notificationsMobile', duration: 1000, position: 'bottom-center', })} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                            </svg>
                                            <img onClick={() => toast.error(' Not currently available', { id: 'profileMobile', duration: 1000, position: 'bottom-center', })} className='ms-5' style={{ filter: 'invert(1)' }} src={'/img/user.png'} alt='user' width={20} height={'auto'} />
                                        </li>
                                    </ul>
                                </nav>

                            }
                        </>
                    </div>

                    <div className='list'>
                        <ul className='d-flex'>
                            <li>
                                <Link className={router.asPath === '/' ? 'a-active' : ' '} href='/'>Home</Link>
                            </li>
                            <li>
                                <Link className={router.asPath === '/category/movies' ? 'a-active' : ' '} href='/category/movies'>Movies</Link>
                            </li>
                            <li>
                                <Link className={router.asPath === '/category/series' ? 'a-active' : ' '} href='/category/series'>Series</Link>
                            </li>
                            <li>
                                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                                    <input className={searchClick === true ? 'input-active' : ''} placeholder='Search...' onChange={handleChange} type="search" />
                                </form>
                                <svg onClick={() => setSearchClick(trueV => !trueV)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </li>
                            <li>
                                <svg onClick={() => toast('🔔  No notifications', { id: 'notifications', duration: 1000 })} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                </svg>
                            </li>
                            <li>
                                <img style={{ filter: 'invert(1)' }} src={'/img/user.png'} alt='user' width={20} height={'auto'} />
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#62626299',
                        color: 'white',
                        textShadow: '0 0 10px #000000b8'
                    },
                }}
                containerStyle={{
                    top: 100,
                    right: 60,
                }}
            />
        </>
    )
}

export default Header;