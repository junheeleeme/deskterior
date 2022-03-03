import Header from "../components/Header"
import PrimaryBg from "../components/PrimaryBg"
import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"
import Footer from "../components/Footer"

const Layout = ({ children }) => {

    const router = useRouter();
    const { query } = useRouter();

    return(
    <>
        <div className="DeskTerior dark:bg-[#242525]"> 
            <Header />
            <PrimaryBg/>
            
            <AnimatePresence exitBeforeEnter>  
                <motion.main key={router.route} transition={{ ease : "easeInOut", duration: 0.15 }}
                initial={animate.initial} animate={animate.animate} exit={animate.exit}
                className='main z-[10] mt-[-4rem] translate-y-[0]'>
                
                {/* <main className='main z-[10] mt-[-4rem] translate-y-[0]'> */}
                    <div className="main-wrap max-w-screen-xl sm:max-w-none md:max-w-screen-xl sm:w-[calc(100vw-2rem)] mx-auto px-4 py-10 sm:px-8 sm:py-14 lg:p-16
                        min-h-[700px] bg-white sm:rounded-lg dark:text-white dark:bg-[#242525]">

                        {children}

                    </div>
                {/* </main> */}
                    <Footer/>
                </motion.main>
            </AnimatePresence>
            
            
        </div>
    </>
    )
}

const animate = {
    initial :{ //none use
        // transform : `translateY(30px)`,
        opacity : 0,
    },
    animate : {
        // transform : `translateY(0px)`,
        opacity: 1,
    },
    exit : {
        // transform : `translateY(30px)`,
        opacity: 0,
    }
}

export default Layout