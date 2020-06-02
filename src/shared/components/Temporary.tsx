import React, { ReactNode, useEffect, useState } from 'react';

type Props = {
  duration?: number;
  children: ReactNode;
};

const Temporary = ({ duration = 5000, children }: Props) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHidden(true);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };

    // "duration" change will be ignored
    // we don't want to restart the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hidden ? null : <>{children}</>;
};

export default Temporary;
