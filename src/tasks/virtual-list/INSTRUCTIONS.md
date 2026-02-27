# Virtual List - Lazily Loaded Image Gallery

## Task

Your task is to implement a component displaying a lazily loaded image gallery.

## Requirements

1. **`images` property**: The component should accept an `images` property, which is an array of image URLs for the gallery.

2. **`<img>` element usage**: Use the `<img>` element to display the images.
   - For images that are not yet loaded (e.g., placeholders), ensure that you also use an `<img>` element but with an empty `src` attribute.

3. **Grid layout**: Arrange the images in a three-column grid.
   - Each cell (image container) in the grid should have dimensions of `200px` by `200px`.

4. **Lazy loading implementation**: Implement lazy loading such that an image in the gallery should be loaded once it is `100px` or less below the visible viewport (i.e., "below the fold").

## Assumptions

- The `images` property will always contain an array of working image URLs.
- All images provided in the `images` property will have fixed dimensions of `200px` width and `200px` height.

## Hints

- `IntersectionObserver` might be a useful API to consider for implementing the lazy loading.
- **Do NOT use `React.lazy`**: This task specifically focuses on lazy loading images, not on code splitting React components.
- **Component structure**: You can create multiple components within a single file if desired, but ensure that the main gallery component is the one that is exported.
- **Evaluation criteria**: The solution will be evaluated based on its correctness. Performance and coding style will not be assessed.
- **Export modification**: Do not edit the default export.

## Available Tools/Packages

- React 17.0.1
- JavaScript ES2020

## Visual Example

```
┌─────────────────────────────────────────┐
│           VIEWPORT                      │
│  ┌────┐  ┌────┐  ┌────┐               │
│  │img │  │img │  │img │               │
│  └────┘  └────┘  └────┘               │
│  ┌────┐  ┌────┐  ┌────┐               │
│  │img │  │img │  │img │               │
│  └────┘  └────┘  └────┘               │
└─────────────────────────────────────────┘
  ← 100px threshold for lazy loading →
  ┌────┐  ┌────┐  ┌────┐
  │img │  │img │  │img │  ← These load when
  └────┘  └────┘  └────┘     within 100px of viewport
```

The lazy loading threshold is 100px below the visible viewport. Images should start loading when their top edge is within this threshold.

---

*Copyright 2009-2026 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.*
