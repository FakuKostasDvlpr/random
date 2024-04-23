import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [option1, setOption1] = useState('Weed 1');
  const [option2, setOption2] = useState('Pucho 2');

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * 2); // Only two options
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
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
        <div className='flex mt-3 flex-row items-center justify-center gap-10'>
         
          
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
          <button onClick={handleSpinClick} className='text-white'>SPIN</button>
        </div>
      </section>
    </>
  );
};

export default App;
