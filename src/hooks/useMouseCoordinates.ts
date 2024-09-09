import React from 'react';

type Coordinates = {
  x: number;
  y: number;
} | null;

export const useMouseCoordinates = () => {
  const [mouseCoordinates, setMouseCoordinates] = React.useState<Coordinates>(null);

  const selectMouseCoordinates = (event: React.MouseEvent) => {
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return {
    mouseCoordinates,
    setMouseCoordinates,
    selectMouseCoordinates,
  };
};
