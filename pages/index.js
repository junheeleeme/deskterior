import Shortcut from "../components/Shortcut"
import Recommend from "../components/Recommend"
import HeadInfo from "../components/HeadInfo"

export default function Home() {
    

  return (
  <>
      <HeadInfo og_title={'Home'} og_image={`https://www.deskterior.shop/primary/main.webp`}  />
      <Shortcut/>
      <Recommend/>
  </>
  )
}
