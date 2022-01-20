import useSpotify from "../hooks/useSpotify";
import styled from "styled-components";
import { millisToMinutesAndSeconds } from "../lib/time";
import { PlayIcon } from "@heroicons/react/outline";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/SongAtom";
import {
  ArrowCircleDownIcon,
  DotsHorizontalIcon,
  SearchIcon,
  ChevronDownIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import { albumSelectedState } from "../atoms/playlistAtom";
import useAlbumInfo from "../hooks/useAlbumInfo";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const albumInfo = useAlbumInfo();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlayin, setIsPlaying] = useRecoilState(isPlayingState);
  const albumSelected = useRecoilValue(albumSelectedState);
  const playSong = () => {
    setCurrentTrackId(track?.track?.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track?.track?.uri],
    });
  };
  const playSong2 = () => {
    setCurrentTrackId(track?.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [track?.uri],
    });
  };
  return (
    <Container>
      {albumSelected ? (
        <>
        
              <Content onClick={playSong2}>
                <PlayIcon className="icon" />
                <p className="orderTag">{order + 1}</p>
                <img src={albumInfo?.images?.[0].url}></img>
              </Content>
              <MusicInfo onClick={playSong2}>
                <p>{track?.name}</p>

                <p className="artista">{albumInfo?.artists[0].name}</p>
              </MusicInfo>
              <MusicInfo2 onClick={playSong2}>
                <p>{albumInfo?.name}</p>
              </MusicInfo2>
              <TimeContainer onClick={playSong2}>
                <p>{millisToMinutesAndSeconds(track?.duration_ms)}</p>
              </TimeContainer>
            
 
        </>
      ) : (
        <>
          <Content onClick={playSong}>
            <PlayIcon className="icon" />
            <p className="orderTag">{order + 1}</p>
            <img src={track.track?.album?.images[0].url}></img>
          </Content>
          <MusicInfo onClick={playSong}>
            <p>{track?.track?.name}</p>

            <p className="artista">{track?.track?.artists[0].name}</p>
          </MusicInfo>
          <MusicInfo2 onClick={playSong}>
            <p>{track?.track?.album?.name}</p>
          </MusicInfo2>
          <TimeContainer onClick={playSong}>
            <p>{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
          </TimeContainer>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 75px 25vw 35vw 6vw;
  padding-top: 20px;
  padding-left: 20px;
  cursor: pointer;

  .icon {
    display: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    .icon {
      display: block;
    }
    .orderTag {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 75px 50vw 30vw;
  }
  @media (min-width: 1080px) {
    grid-template-columns: 75px 30vw 35vw 20vw;
  }
`;
const Content = styled.div`
  display: flex;

  padding-right: 8px;
  align-items: center;

  width: 100%;
  height: 30px;

  img {
    width: 40px;
    margin-left: 5px;
  }
`;
const MusicInfo = styled.div`
  font-size: 12px;
  margin-bottom: 20px;

  margin-right: 20px;
  .artista {
    padding-top: 10px;
    color: gray;
    text-decoration: underline;
  }
`;
const MusicInfo2 = styled.div`
  display: flex;
  font-size: 12px;
  margin-bottom: 20px;
  margin-right: 20px;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: none;
  }
`;
const TimeContainer = styled.div`
  padding-left: 0.8vw;
  @media (max-width: 768px) {
    padding-left: 15vw;
  }
  @media (min-width: 1080px) {
    padding-right: 0.2vw;
  }
`;

export default Song;
