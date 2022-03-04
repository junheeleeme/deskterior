import '../styles/globals.css'
import getMenu from '../apollo/menu'
import Layout from '../layout/Layout'
import { MenuContext } from '../context/MenuContext'
import { ThumbContext } from '../context/ThumbContext'
import { useEffect, useState } from 'react'

const menu = [
  { 'name' : '데스크탑', 'slug': 'desktop', 'categoryId': 65, 'description': '데스크탑 - DESKTOP', '__typename': 'Category'},
  { 'name': '모니터', 'slug': 'monitor', 'categoryId': 66, 'description': '모니터 - MONITOR', '__typename': 'Category'},
  { 'name' : '노트북', 'slug': 'notebook', 'categoryId': 67, 'description': '노트북 - NoteBook', '__typename': 'Category'},
  {'name': '모니터암', 'slug': 'monitorarm', 'categoryId': 68, 'description': '모니터암 - MONITOR ARM', '__typename': 'Category'},
  {'name': '키보드/마우스', 'slug': 'keyboardmouse', 'categoryId': 69, 'description': '키보드/마우스 - Keyboard/Mouse', '__typename': 'Category'},
  {'name': '주변기기', 'slug': 'peripheral', 'categoryId': 70, 'description': '주변기기 - peripherals', '__typename': 'Category'},
  {'name': 'PC부품', 'slug': 'pcparts', 'categoryId': 191, 'description': 'PC부품 - PC Parts', '__typename': 'Category'}
]

function MyApp({ Component, pageProps }) {


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


export default MyApp
