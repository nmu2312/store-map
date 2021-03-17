/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';
import useTimer from 'hooks/use-timer';
import Timer from 'components/Timer';

const EnhancedTimer: FC<{ limit: number }> = ({ limit }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const [timeLeft, isPrime, reset] = useTimer(limit);

  return <Timer timeLeft={timeLeft} isPrime={isPrime} reset={reset} />;
};

export default EnhancedTimer;
