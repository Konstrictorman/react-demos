import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  BarSongTitle,
  BottomBar,
  Button,
  PlayList,
  Song,
  SongTitle,
} from './styles.js';
import { songList } from './constants.js';

const buttonLabels = ['Not replaying', 'Replaying all', 'Replaying one'];

type LoopMode = 0 | 1 | 2; // 0: Not replaying, 1: Replaying all, 2: Replaying one

interface PlayerContextType {
  currentSongId: string | null;
  loopMode: LoopMode;
  setCurrentSongId: (id: string | null) => void;
  goToNextSong: () => void;
  goToPreviousSong: () => void;
  cycleLoopMode: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const [loopMode, setLoopMode] = useState<LoopMode>(0); // 0: Not replaying

  const getCurrentSongIndex = () => {
    if (!currentSongId) return -1;
    return songList.findIndex((song) => song.id === currentSongId);
  };

  const goToNextSong = () => {
    const currentIndex = getCurrentSongIndex();
    
    if (loopMode === 2) {
      // Replaying one: stay on current song
      return;
    }
    
    if (currentIndex === -1) {
      // No current song, do nothing
      return;
    }
    
    if (currentIndex === songList.length - 1) {
      // Last song
      if (loopMode === 1) {
        // Replaying all: go to first song
        setCurrentSongId(songList[0].id);
      } else {
        // Not replaying: no song
        setCurrentSongId(null);
      }
    } else {
      // Go to next song
      setCurrentSongId(songList[currentIndex + 1].id);
    }
  };

  const goToPreviousSong = () => {
    const currentIndex = getCurrentSongIndex();
    
    if (loopMode === 2) {
      // Replaying one: stay on current song
      return;
    }
    
    if (currentIndex === -1) {
      // No current song, do nothing
      return;
    }
    
    if (currentIndex === 0) {
      // First song
      if (loopMode === 1) {
        // Replaying all: go to last song
        setCurrentSongId(songList[songList.length - 1].id);
      } else {
        // Not replaying: stay on current song
        return;
      }
    } else {
      // Go to previous song
      setCurrentSongId(songList[currentIndex - 1].id);
    }
  };

  const cycleLoopMode = () => {
    setLoopMode(((loopMode + 1) % 3) as LoopMode);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSongId,
        loopMode,
        setCurrentSongId,
        goToNextSong,
        goToPreviousSong,
        cycleLoopMode,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};

const ControlBar = () => {
  const { currentSongId, loopMode, goToNextSong, goToPreviousSong, cycleLoopMode } =
    usePlayerContext();

  const currentSong = songList.find((song) => song.id === currentSongId);
  const title = currentSong ? `${currentSong.author} - ${currentSong.title}` : '';

  return (
    <BottomBar>
      <BarSongTitle data-testid="barTitle">{title}</BarSongTitle>
      <div>
        <Button data-testid="previousButton" onClick={goToPreviousSong}>
          Previous
        </Button>
        <Button data-testid="nextButton" onClick={goToNextSong}>
          Next
        </Button>
        <Button data-testid="currentModeButton" onClick={cycleLoopMode}>
          {buttonLabels[loopMode]}
        </Button>
      </div>
    </BottomBar>
  );
};

const Songs = () => {
  const { currentSongId, setCurrentSongId } = usePlayerContext();

  return (
    <PlayList>
      {songList.map(({ title, author, id }) => (
        <Song key={id} onClick={() => setCurrentSongId(id)}>
          <SongTitle data-testid={id} active={currentSongId === id}>
            {title}
          </SongTitle>
          <p style={{ color: '#999999', margin: '5px 0 0 0' }}>{author}</p>
        </Song>
      ))}
    </PlayList>
  );
};

export { PlayerProvider, Songs, ControlBar };
