import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { mainPageState } from '../atoms/pagesAtom'
import Center from '../components/Center'
import CenterHome from '../components/CenterHome'
import LibraryCenter from '../components/LibraryCenter'
import MobileNavBar from '../components/MobileNavBar'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'


export default function Home() {
  const [pages, setPages]=useRecoilState(mainPageState)
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className='flex'>
        <Sidebar/>
      {pages=="home" &&
        <CenterHome/>
      }
      {pages=="music" &&
        <Center/>

      }
      {pages=="library" &&
        <LibraryCenter/>

      }
      </main>
      <div className='sticky bottom-0'>
        <Player/>
        <MobileNavBar/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return{
    props:{
      session,
    }
  }
}