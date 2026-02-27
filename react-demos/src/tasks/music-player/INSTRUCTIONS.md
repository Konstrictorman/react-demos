# Music Player Component - Implementation Instructions

## Overview

Implement the logic for a music player using React components `ControlBar` and `Songs`, with data synchronization handled via a React Context named `PlayerProvider`.

## Requirements

### Available Packages/Libraries
- React version 18
- styled-components version 5.3.5

### Song List Structure

The `songList` array imported from the `constants.js` file has the following structure:

```javascript
[
  {
    title: 'My heart will go on',
    author: 'Celine Dion',
    id: 'a5ff8896'
  },
  {
    title: 'Court of the Crimson King',
    author: 'King Crimson',
    id: 'a5ff8cb0'
  },
  // ... more songs
]
```

## Component Structure

Components should be structured within a `PlayerProvider` context:

```jsx
<PlayerProvider>
  <main data-testid="mainPart">
    <Songs />
    <ControlBar />
  </main>
</PlayerProvider>
```

## Component Specifications

### 1. Songs Component

**Responsibilities:**
- Display song titles and authors
- Handle choosing (selecting) the currently played song
- Highlight the currently active song

**Requirements:**
- The current song should be chosen by clicking on an individual `Song` component
- The active (currently chosen) song should have an `active` property set to `true` in its `<SongTitle>` element
- Active song title should be displayed in **green** color
- Non-active song titles should be displayed in white
- Author names should be displayed in grey text below the title

**Visual Example:**
```
┌─────────────────────────┐
│ The Wizard             │ (green text - active)
│ Black Sabbath          │ (grey text)
└─────────────────────────┘
```

### 2. ControlBar Component

**Responsibilities:**
- Render a bar at the bottom of the page
- Display currently played song information
- Provide navigation and playback mode controls

**Requirements:**

#### Song Display (Section 2)
- The currently played song should be displayed in the format: `${author} - ${songTitle}`
- If no song is currently selected or playing, display an empty string (`""`)

**Example:** `"Yes - Owner of a lonely heart"`

#### Loop Mode Button (Sections 3 & 4)

The `currentMode` button should:
- Display the current label for one of three loop modes:
  - "Not replaying"
  - "Replaying all"
  - "Replaying one"

**Initial State:** "Not replaying"

**Mode Cycling:** Clicking the `currentMode` button changes the mode in this cyclical order:
```
"Not replaying" → "Replaying all" → "Replaying one" → "Not replaying" (repeat)
```

#### Loop Mode Logic (Section 5)

**Not replaying mode:**
- Previous button pressed when there is no previous song → current song remains the same
- Next button pressed when there is no next song → no song should be played (clears selection)

**Replaying all mode:**
- Previous button pressed when there is no previous song → the **last** song in the list should be played
- Next button pressed when there is no next song → the **first** song in the list should be played

**Replaying one mode:**
- Previous or Next button pressed → the **current song** stays the same (replays current song)

#### Navigation Buttons (Sections 6 & 7)

**Previous Button:**
- Clicking the previous button changes the current song to the previous song in the list
- If there is no previous song, behavior depends on the currently enabled loop mode (see Loop Mode Logic)

**Next Button:**
- Clicking the next button changes the current song to the next song in the list
- If there is no next song, behavior depends on the currently enabled loop mode (see Loop Mode Logic)

### 3. PlayerProvider & usePlayerContext

**usePlayerContext Error Handling (Section 8):**
- Implement error handling in `usePlayerContext`
- Throw an error if `usePlayerContext` is used within a component that is NOT wrapped by the `PlayerProvider`
- Error message MUST be: `"usePlayerContext must be used within a PlayerProvider"`
- The context should throw this error instead of returning `null` or `undefined`

## Data Synchronization

- All necessary data exchange between components MUST be handled via React Context
- Data should NOT be passed to `ControlBar` or `Songs` components via props
- Code should NOT be pasted between components to avoid using Context

## Example Scenarios

### Scenario 1: Basic Song Selection and Navigation

1. Click on the first song
   - ✓ The first song title is green
2. Press the "next" button
   - ✓ The second song title is green
3. Keep pressing "next" repeatedly until the last song is active
4. Press "next" button when last song is active
   - ✓ No song is active (empty selection)

### Scenario 2: Replaying All Mode

1. Click on the first song
2. Press the current mode button
   - ✓ Current mode button label says "Replaying all"
3. Keep pressing "next" button until last song is reached
4. Click "next" button when last song is active
   - ✓ The first song is active (loops back to beginning)
5. Press the "previous" button
   - ✓ The last song is active (cyclical navigation)

### Scenario 3: Replaying One Mode

1. Click on the first song
2. Press the current mode button twice
   - ✓ Current mode button label says "Replaying one"
3. Press the "next" button
   - ✓ The first song is still active (doesn't advance)
4. Press the "previous" button
   - ✓ The first song is still active (doesn't go back)

### Scenario 4: Mode Cycling

1. Click on the first song
2. Press the current mode button
   - ✓ Label says "Replaying one"
3. Press the "next" button
   - ✓ First song is still active
4. Press the current mode button
   - ✓ Label says "Not replaying"
5. Press the "next" button
   - ✓ The second song is now active

## Control Bar Visual Example

```
┌─────────────────────────────────────────┐
│   Yes - Owner of a lonely heart         │
├─────────────────────────────────────────┤
│  [Previous]  [Next]  [Not replaying]    │
└─────────────────────────────────────────┘
```

## Assumptions

- Focus on implementing the player's logic
- Components and styles are prepared beforehand
- Existing components or tests should NOT be altered

## Testing Hints

- Use the Preview tab to visually check the correctness of your code
- Use the browser's developer tools in the Preview tab to debug your code (`console.log`)

## Test IDs

The following `data-testid` attributes should be used:

- Main container: `"mainPart"`
- Bar title (current song display): `"barTitle"`
- Previous button: `"previousButton"`
- Next button: `"nextButton"`
- Current mode button: `"currentModeButton"`
- Each song title: Use the song's `id` as the testid
