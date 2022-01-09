import React from 'react';
import { useSelector } from 'react-redux';

export default function ErrorHandler({ children }) {
  const { error500 } = useSelector((state) => state.global);

  if (error500) {
    return (
      <div>
        Something went wrong! Please try reloading the page :)
      </div>
    );
  }
  return children;
}
