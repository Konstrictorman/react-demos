# TimeBomb Component - Instructions

## Overview
Create a React countdown timer component called `TimeBomb.tsx` with input fields for minutes and seconds, control buttons, and a digital time display.

## Requirements

### Core Functionality
1. **Input Fields:**
   - Two `<input type="number">` fields for minutes and seconds
   - Input fields must be wrapped in `<label>` elements
   - Label text: "Minutes" and "Seconds" (respectively)
   - **Important:** Input fields should NOT be cleared when START is clicked

2. **Control Buttons:**
   - **START** button: Begins the countdown timer
   - **PAUSE / RESUME** button: A single button that toggles between pausing and resuming the countdown
   - **RESET** button: Stops the timer and clears all values

3. **Timer Display:**
   - Display countdown time in an `<h1>` element
   - Format: `MM:SS` (e.g., "00:00", "01:30", "02:45")
   - Must include `data-testid="running-clock"` attribute for testing

### Restrictions
- **ONLY** imports from the `react` module are allowed
- Do NOT change the following for testing purposes:
  - `<label>` text associated with `<input>` elements
  - Text displayed on `<button>` elements
  - `data-testid` attribute value of the `<h1>` element

### Implementation Hints
- Use React hooks (`useState`, `useEffect`) for state management
- The solution will be evaluated based on correctness and functionality, not design/styling
- You can use `console.log` and `console.error` for debugging in browser developer tools
- A "Preview" tab will be available to test the component

## Component Structure

```jsx
import React, { Fragment } from 'react';

function Solution() {
  return (
    <Fragment>
      <label>
        <input type="number" />
        Minutes
      </label>
      <label>
        <input type="number" />
        Seconds
      </label>

      <button>START</button>
      <button>PAUSE / RESUME</button>
      <button>RESET</button>

      <h1 data-testid="running-clock">00:00</h1>
    </Fragment>
  );
}

export default Solution;
```

## Expected Behavior

1. User enters desired minutes and seconds in the input fields
2. Click START to begin countdown from the specified time
3. Input fields remain populated after START is clicked
4. Click PAUSE / RESUME to pause or resume the countdown
5. Click RESET to stop the timer and reset all values to 0
6. When countdown reaches 00:00, the timer should stop automatically

## Available Packages
- React version: 18.2.0

## Example UI
See the screenshots in this folder for visual reference of the expected interface layout and behavior.
