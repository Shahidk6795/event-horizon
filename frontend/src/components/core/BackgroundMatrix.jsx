import React from 'react';
import LightPillar from '../LightPillar.jsx';

const BackgroundMatrix = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      
  <LightPillar
    topColor="#5227FF"
    bottomColor="#FF9FFC"
    intensity={1}
    rotationSpeed={0.3}
    glowAmount={0.002}
    pillarWidth={3}
    pillarHeight={0.4}
    noiseIntensity={0.5}
    pillarRotation={25}
    interactive={false}
    mixBlendMode="screen"
    quality="high"
/>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_5%,#000000_80%)]"></div>
      
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-size-[4rem_4rem] transform-[perspective(1000px)_rotateX(20deg)] origin-bottom"></div>
      
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(6,182,212,0.04)_95%)] bg-size-[100%_28px]"></div>
      
    </div>
  );
};

export default BackgroundMatrix;