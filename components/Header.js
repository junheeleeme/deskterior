import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import MenuModal from "./MenuModal"
import { MenuContext } from "../context/MenuContext"
import { useContext } from "react"

const Header = () => {

    const [modal, setModal] = useState(null);
    const { events, query } = useRouter();
    const menu = useContext(MenuContext);
    const menuBtnRef = useRef(null);

    useEffect(()=> {
        //페이지 이동 체크
        events.on('routeChangeStart', ()=> {
            closeMenu();
        });
    }, []);

    const toggleMenu = (e) => { 
        const isActive = menuBtnRef.current.classList.contains('active');
        setModal(prev=> !prev);
        if(!isActive){
            menuBtnRef.current.classList.add('active');
        }else{
            menuBtnRef.current.classList.remove('active');
        }
    }
    const closeMenu = () => { 
        setModal(false);
        menuBtnRef.current.classList.remove('active');
    }
    

    return(
        <>
            <header className="header fixed t-0 l-0 w-full z-[999] dark:text-white dark:bg-[#242525]">
                <div className="header-wrap max-w-screen-xl block h-16 px-4 flex justify-between items-center">

                    <h1 className="Logo text-xl font-bold text-green-500 hover:text-white transition duration-300">
                        <Link href="/" scroll={false} passHref>
                            <a>
                                {process.env.NEXT_PUBLIC_TITLE}
                            </a>
                        </Link>
                    </h1>
                    
                    <button ref={menuBtnRef} onClick={toggleMenu} className="modal mobile-menu-btn block relative w-6 h-6 sm:hidden p-1.5 text-3xl transition duration-100">
                        <span className="modal absolute top-0 right-0 w-[100%] h-1 bg-white"/> 
                        <span className="modal absolute top-1/2 right-0  translate-y-[-50%] w-[70%] h-1 bg-white"/> 
                        <span className="modal absolute bottom-0 right-0 w-[100%] h-1 bg-white"/>
                    </button>
                    <nav className="hidden sm:block m-0">
                        <ul className="pl-0">
                            { menu &&
                                menu.map(m =>
                                    <li key={m.slug + m.categoryId} className="inline-block mx-0.5 lg:mx-2 text-sm">
                                            <Link scroll={false} href={`/category/${m.slug}`} passHref>
                                                <a className={`py-2 px-3.5 hover:bg-[rgba(255,255,255,0.1)] hover:text-green-500 rounded transition duration-100 ${query.id===m.slug?'text-green-500 bg-[rgba(255,255,255,0.1)]':''}`}>
                                                    {m.name}
                                                </a>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </nav>

                </div>
            </header>
            <AnimatePresence>   
                {modal && (
                    <motion.ul layoutId='menu-modal' initial={ani.init} animate={ani.ani} exit={ ani.exit } transition={{ ease : "easeInOut", duration: 0.3 }}
                    className='modal-wrap modal bg-[#242525]'>
                        <MenuModal menu={menu} closeMenu={closeMenu} query={query}/>
                    </motion.ul>
                    )
                }
            </AnimatePresence>
        </>
    )
}

const ani = {
    init : {
        position: 'fixed',
        top : '20px', right : '15px',
        transform: 'rotate(0deg)',
        zIndex : 9999,
        opacity: 0,
    },
    ani : {
        position: 'fixed',
        top : '80px', right : '15px',
        transform: 'rotate(0deg)',
        zIndex : 9999,
        opacity: 1,
    },
    exit : {
        position: 'fixed',
        top : '20px', right : '15px',
        transform: 'rotate(0deg)',
        zIndex : 9999,
        opacity: 0,
    }
}

export default Header
