import styled from "styled-components";
import { PlayIcon, HeartIcon } from "@heroicons/react/solid";
import {
  albumIdState,
  albumSelectedState,
  playlistIdState,
  playlistState,
} from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { shuffle } from "lodash";
import Link from "next/link";
import { mainPageState, PreviousPageState } from "../atoms/pagesAtom";

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Listen({ order, track }) {
  const [nr, setNr] = useState(null);


  const spotifyApi = useSpotify();
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [albuns, setAlbuns] = useState([]);
  const [albumId, setAlbumId] = useRecoilState(albumIdState);
  const [albumSelected, setAlbumSelected] = useRecoilState(albumSelectedState);
  const [pages, setPages]=useRecoilState(mainPageState)
  const [previousPage, setPreviousPage]=useRecoilState(PreviousPageState)
  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    setNr(shuffle(list).pop());
  }, []);

  useEffect(() => {
    spotifyApi
      .getMySavedAlbums()
      .then((albData) => {
        setAlbuns(albData.body);
      })
      .catch((err) => console.log("something went wrong!", err));
  }, [spotifyApi]);
  console.log("listen", albuns);
  return (
    <Container>
      <h1>Listen Again </h1>
      <Content>
        {albuns.items?.slice(nr, nr + 5).map((album) => (

            <Wrap
              onClick={() => {
                setAlbumId(album.album.id);
                setAlbumSelected(true);
                setPreviousPage(pages)
                setPages("music")
              }}
              key={album.album.id}
            >
              <img src={album.album.images?.[0]?.url}></img>
              <PlayIcon className="icon" />
              <h2>{album.album?.name}</h2>
              <p>{album.album.artists[0].name}</p>
            </Wrap>

        ))}
      </Content>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 10px 20px;

  justify-content: center;

  h1 {
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const Content = styled.div`
  display: grid;
  padding: 10px;
  width: 100%;
  grid-gap: 230px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  justify-content: start;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    overflow-x: scroll;
    grid-gap: 220px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  @media (min-width: 1080px) {
      grid-gap: 0px;
  }
`;
const Wrap = styled.div`
  padding: 15px;
  background-color: rgb(259, 259, 259, 0.06);
  position: relative;
  height: 330px;
  width: 210px;
  img {
    height: 220px;
    width: 210px;
    margin-bottom: 10px;
    box-shadow: 3px 4px 41px 9px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 3px 4px 41px 9px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 3px 4px 41px 9px rgba(0, 0, 0, 0.5);
  }
  p {
    padding-bottom: 20px;
    font-size: small;
  }
  &:hover {
    background-color: rgb(259, 259, 259, 0.1);
    .icon {
      opacity: 1;
      transition: 500ms ease-out;
    }
  }
  h2 {
    font-weight: bold;
  }
  .icon {
    width: 50px;
    position: absolute;
    color: rgb(30, 215, 96);
    right: 20px;
    bottom: 120px;
    opacity: 0;
  }
  @media (max-width: 768px) {
    width: 210px;

    img {
      width: 50vw;
    }
    .icon {
      display: none;
    }
  }
`;

export default Listen;
