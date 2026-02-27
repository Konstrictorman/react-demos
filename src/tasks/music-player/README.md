# Music Player Task

A React music player component implementation challenge with context management, loop modes, and song navigation.

## Files

- **`INSTRUCTIONS.md`** - Complete specifications and requirements from the original task
- **`MusicPlayer.tsx`** - Main component implementation with PlayerProvider, Songs, and ControlBar
- **`constants.js`** - Song list data
- **`styles.js`** - Styled components for the UI

## Features

### Songs Component
- Display list of songs with titles and authors
- Click to select/play a song
- Active song highlighted in green

### ControlBar Component
- Display currently playing song (format: `Author - Title`)
- Navigation buttons (Previous/Next)
- Loop mode button with three states:
  1. **Not replaying** - Stop at end of playlist
  2. **Replaying all** - Loop entire playlist
  3. **Replaying one** - Repeat current song

## Usage

```tsx
import { PlayerProvider, Songs, ControlBar } from './tasks/music-player/MusicPlayer';

function App() {
  return (
    <PlayerProvider>
      <main data-testid="mainPart">
        <Songs />
        <ControlBar />
      </main>
    </PlayerProvider>
  );
}
```

## Dependencies

- React 18
- styled-components 5.3.5

## Loop Mode Behavior

### Not Replaying
- Previous at start → stays on current song
- Next at end → clears selection

### Replaying All
- Previous at start → jumps to last song
- Next at end → jumps to first song

### Replaying One
- Previous/Next → stays on current song

## Context Management

All data synchronization between Songs and ControlBar is handled through the PlayerProvider context. The `usePlayerContext` hook throws an error if used outside the provider.
