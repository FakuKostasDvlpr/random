import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import confetti from 'canvas-confetti'; // Importa la función confetti

const App: React.FC = () => {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [option1, setOption1] = useState<string>('Option 1');
  const [option2, setOption2] = useState<string>('Option 2');

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * 2); // Solo dos opciones
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleButtonClick = (option: string) => {
    // Llama a la función confetti cuando se selecciona una opción
    confetti({
      particleCount: 100, // Número de confeti
      spread: 360, // Extensión del área de dispersión
      origin: { x: 0.5, y: 0.5 } // Origen del confeti en la pantalla
    });
    console.log(`Seleccionaste: ${option}`);
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
        <div className='flex mt-3 flex-row items-center justify-center gap-10'>
          <div>
            <p className='mt-10'><button onClick={() => handleButtonClick(option1)}>WID MOMENT?</button></p>
          </div>
          <div>
            <p className='mt-10'><button onClick={() => handleButtonClick(option2)}>Sleep moment?</button></p>
          </div>
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
