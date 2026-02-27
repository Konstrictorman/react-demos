# Timer Component - Implementation Instructions

## Overview

Implement a simple timer component that allows users to start, stop, and reset a stopwatch. The component displays elapsed time in HH:MM:SS format and provides intuitive controls for managing the timer.

## Requirements

### Available Packages/Libraries
- React version 18

### Core Functionality

1. **Timer Display:**
   - Display elapsed time in `HH:MM:SS` format (e.g., "00:00:00", "00:01:30", "01:25:45")
   - Render in an `<h2>` element
   - Time should update every second when the timer is running

2. **Start/Stop Button:**
   - A single button that toggles between "Start" and "Stop" states
   - When timer is not running: displays "Start"
   - When timer is running: displays "Stop"
   - Clicking Start begins counting seconds
   - Clicking Stop pauses the timer (time is preserved)

3. **Reset Button:**
   - Displays "Reset" text
   - Stops the timer if running
   - Resets elapsed time to 00:00:00

## Component Structure

```jsx
import { useEffect, useState } from 'react'

function Timer() {
  // State management for seconds and running status
  // useEffect for interval management
  // Helper function to format time display
  // Event handlers for Start/Stop and Reset buttons
  
  return (
    <div>
      <h2>{/* Time display in HH:MM:SS format */}</h2>
      <button onClick={handleStartStop}>{/* Start or Stop */}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Timer
```

## Implementation Details

### State Management
- Track total elapsed seconds (number)
- Track running state (boolean)

### Timer Logic
- Use `useEffect` with `setInterval` to increment seconds every 1000ms when running
- Clean up interval on component unmount or when timer stops
- Ensure only one interval is active at a time

### Time Formatting
- Convert total seconds to hours, minutes, and seconds
- Pad each unit with leading zero if needed (e.g., "01" instead of "1")
- Format: `HH:MM:SS`

### Button Behaviors

**Start/Stop Button:**
- Initial state: "Start" (timer not running)
- Click "Start" → timer begins counting, button shows "Stop"
- Click "Stop" → timer pauses, button shows "Start"
- Timer can be resumed from paused state

**Reset Button:**
- Sets elapsed time back to 0
- Stops the timer if it's running
- After reset, Start/Stop button shows "Start"

## Expected Behavior Examples

### Scenario 1: Basic Start and Stop
1. Timer displays "00:00:00"
2. Click "Start" button
   - ✓ Button text changes to "Stop"
   - ✓ Timer begins counting: "00:00:01", "00:00:02", etc.
3. Click "Stop" button
   - ✓ Button text changes to "Start"
   - ✓ Timer pauses at current time

### Scenario 2: Resume After Stop
1. Start timer and let it run to "00:00:10"
2. Click "Stop"
3. Wait 5 seconds
4. Click "Start" again
   - ✓ Timer resumes from "00:00:10" (not from zero)
   - ✓ Timer continues counting: "00:00:11", "00:00:12", etc.

### Scenario 3: Reset While Running
1. Start timer and let it run to "00:00:15"
2. Click "Reset" button
   - ✓ Timer displays "00:00:00"
   - ✓ Start/Stop button shows "Start"
   - ✓ Timer is not running

### Scenario 4: Reset While Stopped
1. Start timer, let it run to "00:00:20"
2. Click "Stop"
3. Click "Reset"
   - ✓ Timer displays "00:00:00"
   - ✓ Start/Stop button shows "Start"

### Scenario 5: Time Formatting
1. Start timer and let it run for 65 seconds
   - ✓ Timer displays "00:01:05"
2. Continue to 3661 seconds
   - ✓ Timer displays "01:01:01"

## Assumptions

- Focus on implementing the timer logic
- Minimal styling is acceptable
- The timer counts upward (stopwatch), not countdown
- No need for localStorage persistence
- No need for lap/split time functionality

## Testing Hints

- Use React Developer Tools to inspect component state
- Use `console.log` to debug state changes
- Test edge cases like rapid Start/Stop clicks
- Verify interval cleanup (no memory leaks)

## Files

- `Timer.tsx` - Main timer component implementation
- `INSTRUCTIONS.md` - This file

## Usage

Import and use the Timer component in your app:

```jsx
import Timer from './tasks/timer/Timer'

function App() {
  return (
    <div>
      <h1>Stopwatch Demo</h1>
      <Timer />
    </div>
  )
}
```
