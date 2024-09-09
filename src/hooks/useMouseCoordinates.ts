import React from 'react';

export const useMouseCoordinates = () => {
  const selectMouseCoordinates = (event: React.MouseEvent) => {
    console.log({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return {
    selectMouseCoordinates,
  };
};
