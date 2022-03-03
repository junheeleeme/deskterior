import Link from "next/link"
import { IoIosDesktop } from 'react-icons/io'
import { BsHeadphones } from 'react-icons/bs'
import { MdComputer } from 'react-icons/md'
import { FiMonitor } from 'react-icons/fi'
import { BsAspectRatio } from 'react-icons/bs'
import { BiMouse } from 'react-icons/bi'
import { FaRegKeyboard } from 'react-icons/fa'


const Shortcut = () => {


    return(
    <>
        <ul className='relative w-full my-8 flex flex-wrap justify-around sm:justify-between items-center text-0'>

            <li className='relative mx-0 my-2 w-[45%] h-[170px] sm:w-[30%] xl:w-[15%] py-2 text-white hover:bg-white hover:text-black transition rounded-lg'>
                <Link href="/category/desktop" passHref>
                <a className='inline-block w-full h-full text-0 text-center flex flex-col flex-row justify-around'>
                    <IoIosDesktop className='text-[6rem]'/>
                    <h2 className='text-xl dohyun my-3'>데스크탑</h2>
                </a>
                </Link>
            </li>

            <li className='relative mx-0 my-2 w-[45%] h-[170px] sm:w-[30%] xl:w-[15%] py-2 text-white hover:bg-white hover:text-black transition rounded-lg'>
                <Link href="/category/monitor" passHref>
                <a className='inline-block w-full h-full text-0 text-center flex flex-col flex-row justify-around'>
                    <FiMonitor className='text-[6rem]'/>
                    <h2 className='text-xl dohyun my-3'>모니터</h2>
                </a>
                </Link>
            </li>

            <li className='relative mx-0 my-2 w-[45%] h-[170px] sm:w-[30%] xl:w-[15%] py-2 text-white hover:bg-white hover:text-black transition rounded-lg'>
                <Link href="/category/notebook" passHref>
                <a className='inline-block w-full h-full text-0 text-center flex flex-col flex-row justify-around'>
                    <MdComputer className='text-[6rem]'/>
                    <h2 className='text-xl dohyun my-3'>노트북</h2>
                </a>
                </Link>
            </li>

            <li className='relative mx-0 my-2 w-[45%] h-[170px] sm:w-[30%] xl:w-[15%]  py-2 text-white hover:bg-white hover:text-black transition rounded-lg monitorArm'>
                <Link href="/category/monitorarm" passHref>
                <a className='inline-block w-full h-full text-0 text-center flex flex-col flex-row justify-around'>
                    <BsAspectRatio className='text-[6rem]'/>
                    <span className='absolute top-[49%] left-[60%] w-2 h-7 bg-white rotate-[120deg] rounded-t-lg rounded-bl-xl transition monitorArm-bar'/>
                    <h2 className='text-xl dohyun my-3'>모니터암</h2>
                </a>
                </Link>
            </li>

            <li className='relative mx-0 my-2 w-[45%] h-[170px] sm:w-[30%] xl:w-[15%] py-2 text-white hover:bg-white hover:text-black transition rounded-lg'>
                <Link href="/category/keyboardmouse" passHref>
                    <a className='inline-block w-full h-full text-0 text-center flex flex-col flex-row justify-around'>
                    <div>
                        <FaRegKeyboard className='inline-block text-[5.5rem] align-middle'/>
                        <BiMouse className='inline-block text-[3.2rem] align-middle'/>
                    </div>
                    <h2 className='text-xl dohyun my-3'>키보드/마우스</h2>
                    </a>
                </Link>
            </li>

            <li className='relative mx-0 my-2 w-[45%] h-[170px] sm:w-[30%] xl:w-[15%] py-2 text-white hover:bg-white hover:text-black transition rounded-lg'>
                <Link href="/category/peripheral" passHref>
                <a className='inline-block w-full h-full text-0 text-center flex flex-col flex-row justify-around'>
                    <BsHeadphones className='inline-block text-[6rem] align-middle'/>
                    <h2 className='text-xl dohyun my-3'>주변기기</h2>
                </a>
                </Link>
            </li>

        </ul>
    </>
    )
}

export default Shortcut