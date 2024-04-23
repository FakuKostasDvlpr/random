import React, { useState, useRef } from 'react';

const Roulette = () => {
  const [options, setOptions] = useState(["Weed", "Dormir"]);
  const [result, setResult] = useState("");
  const canvasRef = useRef(null);

  const byte2Hex = (n) => {
    const nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  };

  const RGB2Color = (r, g, b) => {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  };

  const getColor = (item, maxitem) => {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = Math.PI*2/maxitem;
    
    const red   = Math.sin(frequency*item+2+phase) * width + center;
    const green = Math.sin(frequency*item+0+phase) * width + center;
    const blue  = Math.sin(frequency*item+4+phase) * width + center;
    
    return RGB2Color(red,green,blue);
  };

  const drawRouletteWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const outsideRadius = 200;
    const textRadius = 160;
    const insideRadius = 125;

    ctx.clearRect(0,0,500,500);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.font = 'bold 12px Helvetica, Arial';

    options.forEach((option, i) => {
      const angle = (Math.PI / (options.length / 2)) * i;

      ctx.fillStyle = getColor(i, options.length);
      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + (Math.PI / (options.length / 2)), false);
      ctx.arc(250, 250, insideRadius, angle + (Math.PI / (options.length / 2)), angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(250 + Math.cos(angle + (Math.PI / (options.length))) * textRadius, 
                    250 + Math.sin(angle + (Math.PI / (options.length))) * textRadius);
      ctx.rotate(angle + (Math.PI / (options.length)) + Math.PI / 2);
      ctx.fillText(option, -ctx.measureText(option).width / 2, 0);
      ctx.restore();
    }); 

    //Arrow
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  };

  const spin = () => {
    const spinAngleStart = Math.random() * 10 + 10;
    const spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel(spinAngleStart, 0, spinTimeTotal);
  };

  const rotateWheel = (spinAngleStart, spinTime, spinTimeTotal) => {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    drawRouletteWheel();
    setTimeout(() => rotateWheel(spinAngleStart, spinTime, spinTimeTotal), 30);
  };

  const stopRotateWheel = () => {
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    setResult(options[index]);
  };

  const easeOut = (t, b, c, d) => {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  };

  return (
    <div>
      <input type="button" value="GIRA LA RULETA COKI Y GANA!" style={{float: 'left'}} onClick={spin} />
      <canvas ref={canvasRef} id="canvas" width="500" height="500"></canvas>
    </div>
  );
};

export default Roulette;
