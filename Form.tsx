/* import { FC, useState, useEffect } from 'react';

const Form: FC = ({ renewConditions }) => {
  const [genre, setGenre] = useState<number[]>([]);
  const [cashless, setCashless] = useState(false);
  const [area, setArea] = useState(0);
  const [takeOut, setTakeOut] = useState(false);
  const [delivery, setDelivery] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    renewConditions({
      genre,
      cashless,
      area,
      takeOut,
      delivery,
    });
  }, [genre, cashless, area, takeOut, delivery, renewConditions]);

  return (
    <>
      <div>
        <input
          type="checkbox"
          onChange={() => setCashless(!cashless)}
          checked={cashless}
        />
        <input
          type="checkbox"
          onChange={() => setTakeOut(!takeOut)}
          checked={takeOut}
        />
        <input
          type="checkbox"
          onChange={() => setDelivery(!delivery)}
          checked={delivery}
        />
      </div>
    </>
  );
};

export default Form; */
