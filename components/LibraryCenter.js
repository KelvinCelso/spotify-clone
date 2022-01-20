import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSpotify from "../hooks/useSpotify";
import LibraryPlaylists from "./LibraryPlaylists";
import LibraryAlbums from "./LibraryAlbums";
import { LibraryState, mainPageState, PreviousPageState} from '../atoms/pagesAtom'
import { useRecoilState } from "recoil";
import LibraryArtists from "../components/LibraryArtists"
function LibraryCenter() {
  const router = useRouter();
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [libraryPages, setLibraryPages]=useRecoilState(LibraryState)
  const [previousPage, setPreviousPage]=useRecoilState(PreviousPageState)
  const [pages, setPages]=useRecoilState(mainPageState)
  return (
    <Container>
      <HeaderContainer>
        
        <NavBar>
        <ChevronLeftIcon className="icons" onClick={() =>setPages(previousPage)} />
            <button onClick={()=>setLibraryPages("playlists")}>Playlists</button>
            <button>Podcasts</button>
            <button onClick={()=>setLibraryPages("artists")}>Artists</button>
            <button onClick={()=>setLibraryPages("albums")}>Albums</button>
        </NavBar>
        <ProfileContainer>
          <img src={session?.user.image}></img>
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="icon" />
        </ProfileContainer>
      </HeaderContainer>
      {libraryPages=="playlists" &&
        <LibraryPlaylists/>
      }
      {libraryPages=="artists" &&
        <LibraryArtists/>
      }
        {libraryPages=="albums" &&
        <LibraryAlbums/>
      }
      
    </Container>
  );
}
const Container = styled.div`

  color: white;
  flex-grow: initial;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 90vh;
  background-image: linear-gradient(
    to bottom,
    rgb(18, 18, 18) ,
    black 20%
  );
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  h1 {
    font-size: 1.8em;
  }
  .icons {
    width: 20px;
  }
  @media (max-width:768px) {
     height: 84vh ;
  }
`;
const HeaderContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  top: 1%;
  align-items: center;
  position: sticky;
  z-index: 1;
   .icons {
    height: 30px;
    background-color: black;
    border-radius: 50%;
    margin-right: 5px;
    border: 1px solid gray;
    width: 30px;
    margin-left: 20px;

    &:hover {
      border: 1px solid white;
    }
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  border-radius: 30px;
  padding: 5px;
  margin-right: 20px;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .icon {
    width: 15px;
    height: 15px;
  }
  h2 {
    padding: 0px 10px;
  }
  @media (max-width: 768px) {
    img {
      width: 30px;
      height: 30px;
    }
    h2 {
      display: none;
    }
    .icon {
      display: none;
    }
  }
`;

const NavBar=styled.div`
display: flex;
align-items: center;
button{
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 6px;
    @media (min-width: 1080px) {
        padding: 5px 30px;
    }
    @media (max-width:768px) {
        padding: 5px 5px;
        font-size: 0.8em;
    }
    &:hover{
        background-color: rgb(51,51,51);
    }
}
`

export default LibraryCenter;
