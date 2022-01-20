import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentTrackIdState, isPlayingState } from "../atoms/SongAtom";
import useSongInfo from ""
import useSpotify from "../hooks/useSpotify";
import spotifyApi from "../lib/spotify";
import {
  SwitchHorizontalIcon,
  VolumeUpIcon,
  VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  ReplyIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import MobileNavBar from "./MobileNavBar";

function Player() {
  const spotify = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const { data: session } = useSession();
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);
  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 300),
    []
  );

  return (
    <Container>
      <LeftContent>
        <img src={songInfo?.album?.images?.[0].url}></img>
        <div key={songInfo?.id}>
          <p className="songName">{songInfo?.name}</p>
          <p className="artista">{songInfo?.artists[0]?.name}</p>
        </div>
      </LeftContent>
      <MiddleContent>
        <SwitchHorizontalIcon className="icon" />
        <RewindIcon
          onClick={() => spotifyApi.skipToPrevious()}
          className="icon"
        />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="icon2" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="icon2" />
        )}
        <FastForwardIcon
          onClick={() => spotifyApi.skipToNext()}
          className="icon"
        />
        <ReplyIcon className="icon" />
      </MiddleContent>
      <RightContent>
        <VolumeUpIcon className="icon" />
        <input
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        ></input>
      </RightContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(24, 24, 24);
  padding: 0px 20px;
  color: white;
  cursor: pointer;
  max-height: 100px;
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const LeftContent = styled.div`
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 80px 220px;
  img {
    width: 60px;
  }
  p {
    font-size: 13px;
  }
  .songName {
    font-weight: bold;
  }
  .artista {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    padding-left: 0px;
    grid-template-columns: 50px;
    p {
      display: none;
    }
  }
`;
const MiddleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    margin-left: 20px;
    width: 22px;
    cursor: pointer;
    color: white;
    &:hover {
      width: 26px;
      transition: 100ms ease-out;
    }
  }
  .icon2 {
    margin-left: 20px;
    width: 50px;
    cursor: pointer;

    &:hover {
      width: 53px;
      transition: 100ms ease-out;
    }
  }
`;
const RightContent = styled.div`
display: flex;
align-items: center;
justify-content: center;
@media (max-width:768px) {
    .icon{
        display: none;
    }
}
.icon{
    width: 20px;
    margin-right: 10px;
}
input[type=range] {
  height: 7px;
  -webkit-appearance: none;
  width: 100%;
  @media (max-width:768px) {
    width: 60%;
      
  }
  
  &:hover{
    input[type=range]::-webkit-slider-thumb {
        background: #1DB954;
    }
      
  }
}
input[type=range]:focus {
  outline: none;
  
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 7px;
  cursor: pointer;

  box-shadow: 0px 0px 0px #000000;
  background: #535353;
  border-radius: 0px;
  border: 0px solid #000000;
}



`

export default Player;
