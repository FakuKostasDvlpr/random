import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const App: React.FC = () => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [option1, setOption1] = useState<string>('Weed ');
  const [option2, setOption2] = useState<string>('Sleep');

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * 2); // Solo dos opciones
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };


  const updateOption = (index: number, value: string) => {
    if (index === 1) {
      setOption1(value);
    } else {
      setOption2(value);
    }
  };

  const data = [
    { option: option1 },
    { option: option2 },
  ];

  return (
    <>
      <section className='w-full h-full mt-20 text-gray'>
        <div className='flex justify-center text-5xl'>
          <h1 className='text-gray-100 font-extralight'>Tenes que elegir entre</h1>
        </div>
        <div className='flex items-center justify-center flex-col mt-20'>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
          />
          <button onClick={handleSpinClick}>SPIN</button>
        </div>
      </section>
    </>
  );
};

export default App;
