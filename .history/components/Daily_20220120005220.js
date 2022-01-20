import { PlayIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { mainPageState, PreviousPageState } from "../atoms/pagesAtom";
import {
  albumIdState,
  albumSelectedState,
  albumState,
  playlistIdState,
} from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function Daily() {
  const date = new Date();
  const hours = date.getHours();
  const spotifyApi = useSpotify();
  const [nr, setNr] = useState(null);
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [albuns, setAlbuns] = useState([]);
  const [greet, setGreet] = useState(null);
  const [albumId, setAlbumId] = useRecoilState(albumIdState);
  const [albumSelected, setAlbumSelected] = useRecoilState(albumSelectedState);
  const [pages, setPages]=useRecoilState(mainPageState)
  const [previousPage, setPreviousPage]=useRecoilState(PreviousPageState)
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  console.log(playlists);
  useEffect(() => {
    if (hours >= 0 && hours < 12) {
      setGreet("Good Morning");
    } else if (hours >= 12 && hours < 18) {
      setGreet("Good Afternoon");
    } else {
      setGreet("Good Evening");
    }
  }, [hours]);
  useEffect(() => {
    setNr(shuffle(list).pop());
  }, []);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedAlbums().then((alb) => {
        setAlbuns(alb.body.items);
      });
    }
  }, [session, spotifyApi]);


  


  return (
    <Container>
      <h1>{greet}</h1>
      <Content>
        {playlists.slice(nr, nr + 2).map((playlist) => (
    
            <Wrap onClick={()=>{
              setAlbumSelected(false)
              setAlbumId(null)
              setPlaylistId(playlist.id)
              setPreviousPage(pages)
              setPages("music")
            }} key={playlist.id}>
              <div>
                <img src={playlist?.images?.[0]?.url}></img>
                <h2>{playlist.name}</h2>
              </div>
              <PlayIcon className="icon" />
            </Wrap>
        ))}
        {albuns.slice(nr, nr + 2).map((albu) => (

            <Wrap key={albu.album.id} onClick={()=>{setAlbumId(albu.album.id)
              setAlbumSelected(true)
              setPreviousPage(pages)
              setPages("music")
            }}>
              <div>
                <img src={albu.album?.images?.[0]?.url}></img>
                <h2>{albu.album.name}</h2>
              </div>
              <PlayIcon className="icon" />

          </Wrap>
        ))}
      </Content>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 10px 20px;
  top: 6%;
  h1 {
    font-size: 26px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const Content = styled.div`
  display: grid;
  cursor: pointer;
  grid-gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gr
  }

`;

const Wrap = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  border-radius: 4px;
  width: 37vw;
  @media (max-width: 768px) {
    width: 45vw;
    height: 15vh;
    border: 1px solid white;
    .icon {
      display: none;
    }
  }
  h2 {
    font-weight: bold;
  }
  div {
    display: flex;
    align-items: center;
  }

  align-items: center;
  background-color: rgb(42, 54, 69, 0.8);
  img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    margin-right: 20px;
    box-shadow: 11px 1px 36px 4px rgba(0, 0, 0, 0.58);
    -webkit-box-shadow: 11px 1px 36px 4px rgba(0, 0, 0, 0.58);
    -moz-box-shadow: 11px 1px 36px 4px rgba(0, 0, 0, 0.58);
  }
  .icon {
    width: 50px;
    margin-right: 10px;
    opacity: 0;
    color: rgb(30, 215, 96);
  }
  &:hover {
    background-color: rgb(259, 259, 259, 0.5);
    .icon {
      opacity: 1;
      transition: 500ms ease-out;
    }
  }
`;

export default Daily;
