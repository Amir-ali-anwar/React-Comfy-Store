import React, { useState, useEffect } from 'react';
const AuthWrapper = ({ children, Showdata = 500 }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, Showdata);
    return () => clearTimeout(timer);
  }, [Showdata]);

  return isShown ? children : null;
};

export default AuthWrapper;