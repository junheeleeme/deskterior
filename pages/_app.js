import '../styles/globals.css'
import getMenu from '../apollo/menu'
import Layout from '../layout/Layout'
import { MenuContext } from '../context/MenuContext'
import { ThumbContext } from '../context/ThumbContext'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps, menu }) {

  const [thumb, setThumb] = useState();
  const _menu = menu.sort((a,b)=> a.categoryId-b.categoryId);

  useEffect(()=> {
    if (localStorage.theme === 'dark' || localStorage.theme === undefined ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);

  return (
    <>  
      <MenuContext.Provider value={_menu}>
        <ThumbContext.Provider value={{thumb, setThumb}}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThumbContext.Provider>
      </MenuContext.Provider>
    </>
  )
}


MyApp.getInitialProps = async () => {
  const menu = await getMenu();
  return { menu }
}

export default MyApp
