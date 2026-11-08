"use client";

import { Fragment, useEffect, useRef } from "react";

export interface PhotoCard {
  id: string;
  radioId: string;
  prevRadioId: string;
  nextRadioId: string;
  num: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  angle: string;
}

interface PortfolioCarouselProps {
  photos: PhotoCard[];
}

export default function PortfolioCarousel({ photos }: PortfolioCarouselProps) {
  const touchStartX = useRef<number | null>(null);

  const goToNext = () => {
    const checked = document.querySelector<HTMLInputElement>(
      'input[name="radio-card"]:checked'
    );
    if (!checked) return;
    const nextId = checked.getAttribute("data-next-id");
    if (nextId) {
      const nextInput = document.getElementById(nextId) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.checked = true;
        nextInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  const goToPrev = () => {
    const checked = document.querySelector<HTMLInputElement>(
      'input[name="radio-card"]:checked'
    );
    if (!checked) return;
    const prevId = checked.getAttribute("data-prev-id");
    if (prevId) {
      const prevInput = document.getElementById(prevId) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.checked = true;
        prevInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <div
      className="cards"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {photos.map((photo, index) => (
        <Fragment key={photo.id}>
          <input
            type="radio"
            id={photo.radioId}
            name="radio-card"
            data-prev-id={photo.prevRadioId}
            data-next-id={photo.nextRadioId}
            defaultChecked={index === 0}
          />
          <article
            className="card"
            style={{ "--angle": photo.angle } as React.CSSProperties}
          >
            <label
              htmlFor={photo.nextRadioId}
              className="card-photo-box"
              title="Click photo to advance"
            >
              <img
                className="card-img"
                src={photo.src}
                alt={photo.alt}
                loading={index < 2 ? "eager" : "lazy"}
              />
            </label>
            <div className="card-data">
              <span className="card-num">{photo.num}</span>
              <h2>{photo.title}</h2>
              <p>{photo.description}</p>
              <footer>
                <label htmlFor={photo.prevRadioId} aria-label="Previous">
                  &#10094;
                </label>
                <label htmlFor={photo.nextRadioId} aria-label="Next">
                  &#10095;
                </label>
              </footer>
            </div>
          </article>
        </Fragment>
      ))}
    </div>
  );
}
