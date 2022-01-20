import React from 'react'
import styled from 'styled-components'
import { HomeIcon } from '@heroicons/react/solid'
import { SearchIcon, LibraryIcon} from '@heroicons/react/outline'
import Link from 'next/link'
import { mainPageState } from '../atoms/pagesAtom'
import { useRecoilState } from 'recoil'
function MobileNavBar() {
    const [pages, setPages]=useRecoilState(mainPageState)
    return (
        <Container>
            <Content>
                
                    <Wrap onClick={()=>setPages("home")} >
                        <HomeIcon className='icon'/>
                        <span>Home</span>
                    </Wrap>
                <Wrap>
                    <SearchIcon className='icon'/>
                    <span>Search</span>
                </Wrap>

                    <Wrap onClick={()=>setPages("library")}>
                        <LibraryIcon className='icon'/>
                        <span>Library</span>
                    </Wrap>
            </Content>
        </Container>
    )
}
const Container=styled.div`
bottom: 0;
height: 50px;
z-index: 1;
background-color: rgb(24,24,24) ;
color: white;
display: none;
@media (max-width:768px) {
    display: inherit;
}
`

const Content=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding:5px 60px ;
cursor: pointer;
`

const Wrap=styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 80px;
.icon{
    width: 20px;

}
span{
    font-size: 0.8em;
}
&:hover{
    background-color: black;
    border: 1px solid white;
    transition: 500ms ease-out 0s;
}
`
export default MobileNavBar
