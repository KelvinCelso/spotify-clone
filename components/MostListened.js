import styled from "styled-components";
import { PlayIcon, HeartIcon } from "@heroicons/react/solid";
import {
  albumIdState,
  playlistIdState,
  playlistState,
} from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { shuffle, wrap } from "lodash";
import axios from "axios";
import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/SongAtom";

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function MostListened({ order, track }) {
  const [nr, setNr] = useState(null);
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [mostListened, setMostListened] = useState([]);
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [isPlayin, setIsPlaying] = useRecoilState(isPlayingState);

  useEffect(() => {
    setNr(shuffle(list).pop());
  }, []);

  useEffect(() => {
    spotifyApi.getMyTopTracks().then((art) => {
      setMostListened(art.body.items);
    });
  }, [session, spotifyApi]);
  console.log("this is recomended ", mostListened);
  return (
    <Container>
      <h1>Your Most Listened </h1>
      <Content>
        {mostListened.slice(nr, nr + 5).map((listened) => (
          <Wrap
            onClick={() => {
              setCurrentIdTrack(listened.id);
              setIsPlaying(true);
              spotifyApi.play({
                uris: [listened?.uri],
              });
            }}
            key={listened.id}
          >
            <img src={listened.album?.images[0].url}></img>
            <PlayIcon className="icon" />
            <h2>{listened.name}</h2>
            <p>{listened.album?.artists[0]?.name}</p>
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

  grid-gap: 250px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: center;
  justify-content: start;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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
  width: 230px;
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
    font-size: 1em;
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

export default MostListened;
