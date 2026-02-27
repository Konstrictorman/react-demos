import React, { useEffect, useRef, useState } from "react";

interface VirtualListProps {
  images: string[];
}

function VirtualList({ images }: VirtualListProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "-1"
            );
            if (index !== -1) {
              setLoadedImages((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "100px 0px 100px 0px",
      }
    );

    imageRefs.current.forEach((img) => {
      if (img) {
        observer.observe(img);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [images]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 200px)",
        gap: "0px",
      }}
    >
      {images.map((url, index) => (
        <div
          key={index}
          style={{
            width: "200px",
            height: "200px",
          }}
        >
          <img
            ref={(el) => (imageRefs.current[index] = el)}
            data-index={index}
            src={loadedImages.has(index) ? url : ""}
            alt={`Gallery image ${index + 1}`}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default VirtualList;
