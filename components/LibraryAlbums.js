import { PlayIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { LibraryState, mainPageState, PreviousPageState } from "../atoms/pagesAtom";
import { albumIdState, albumSelectedState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
function LibraryAlbums() {
  const [albuns, setAlbuns] = useState([]);
  const [albumId, setAlbumId] = useRecoilState(albumIdState);
  const [albumSelected, setAlbumSelected] = useRecoilState(albumSelectedState);
  const spotifyApi = useSpotify();
  const [pages, setPages]=useRecoilState(mainPageState)
  const [previousPage, setPreviousPage]=useRecoilState(PreviousPageState)
  const [libraryPages, setLibraryPages]=useRecoilState(LibraryState)
  useEffect(() => {
    spotifyApi
      .getMySavedAlbums()
      .then((albData) => {
        setAlbuns(albData.body);
      })
      .catch((err) => console.log("something went wrong!", err));
  }, [spotifyApi]);
  return (
    <Container>
      <h1>Albums</h1>
      <Content>
        {albuns.items?.map((album) => (
          <Wrap
            onClick={() => {
              setAlbumId(album.album.id);
              setAlbumSelected(true);
              setPreviousPage("library");

              setLibraryPages("albums")
              setPages("music");
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
  h1 {
    font-weight: bold;
    margin: 20px 20px;
    font-size: 1.6em;
  }
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 10px;
  margin-right: 25px;

  @media (min-width: 1080px) {
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  @media (max-width: 768px) {
    grid-gap: 0px;
    margin-right: 0px;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: rgb(259, 259, 259, 0.06);
  margin-left: 20px;
  height: 320px;
  margin-bottom: 20px;
  width: 225px;
  margin-right: 20px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  @media (max-width: 768px) {
    height: 250px;
    margin-left: 15px;
    margin-right: 10px;
  }
  @media (min-width: 1080px) {
    width: 200px;
    height: 280px;
  }
  img {
    width: 200px;
    height: 200px;
    box-shadow: -1px 7px 42px 1px rgba(0, 0, 0, 0.69);
    -webkit-box-shadow: -1px 7px 42px 1px rgba(0, 0, 0, 0.69);
    -moz-box-shadow: -1px 7px 42px 1px rgba(0, 0, 0, 0.69);
    margin-bottom: 20px;

  }
  h2 {
    display: block;
    max-width: 180px;
    font-weight: bold;
    object-fit: contain;
  }
  p {
    font-size: 0.8em;
  }
  @media (max-width: 768px) {
    width: 42vw;
    h2 {
      font-size: 0.7em;
    }
    p {
      font-size: 0.6em;
    }
  }
  &:hover {
    background-color: rgb(259, 259, 259, 0.1);
    .icon {
      opacity: 1;
      transition: 500ms ease-out;
    }
  }
  .icon {
    width: 50px;
    position: absolute;
    color: rgb(30, 215, 96);
    right: 20px;
    bottom: 100px;
    opacity: 0;
  }
`;

export default LibraryAlbums;
