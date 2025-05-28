const RainbowMessages = () => {
  const arcs = [
  {
    id: 'arc1',
    from: 'left',
    d: 'M 30 500 C 400 250, 700 300, 970 500',
    delay: 0,
    duration: 3,
  },
  {
    id: 'arc2',
    from: 'right',
    d: 'M 950 400 C 700 100, 100 400, 20 380',
    delay: 1.2,
    duration: 4,
  },
  {
    id: 'arc3',
    from: 'left',
    d: 'M 160 500 C 350 180, 650 180, 950 200',
    delay: 2.5,
    duration: 2,
  },
  {
    id: 'arc4',
    from: 'right',
    d: 'M 750 470 C 650 130, 350 130, 10 200',
    delay: 3,
    duration: 3.5,
  },
  {
    id: 'arc5',
    from: 'left',
    d: 'M 10 350 C 400 90, 600 90, 900 100',
    delay: 1,
    duration: 2.8,
  },
];


  return (
    <svg
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="rainbowGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="25%" stopColor="#facc15" />
          <stop offset="50%" stopColor="#4ade80" />
          <stop offset="75%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>

      {/* Arcs */}
      {arcs.map((arc, index) => (
        <path
          key={`arc-${index}`}
          id={arc.id}
          d={arc.d}
          stroke="url(#rainbowGradient)"
          strokeWidth="0.1"
          strokeOpacity="1"
          fill="none"
        />
      ))}

      {/* Points lumineux animés */}
      {arcs.map((arc, index) => (
        // <circle
        //   key={`dot-${index}`}
        //   r="2"
        //   fill="rgb(30, 41, 57)"
        //   opacity="1"
        // >
        //   <animateMotion
        //     dur={`${arc.duration}s`}
        //     begin={`${arc.delay}s`}
        //     repeatCount="indefinite"
        //   >
        //     <mpath href={`#${arc.id}`} />
        //   </animateMotion>
        // </circle>
        <rect
  key={`dot-${index}`}
  width="2"
  height="2"
  fill="rgb(30, 41, 57)"
  opacity="1"
  rx="1" ry="1"
>
  <animateMotion
    dur={`${arc.duration}s`}
    begin={`${arc.delay}s`}
    repeatCount="indefinite"
  >
    <mpath href={`#${arc.id}`} />
  </animateMotion>

  {/* Effet étirement */}
  <animateTransform
    attributeName="transform"
    type="scale"
    from="1,1"
    to="3,1"
    dur={`${arc.duration / 2}s`}
    begin={`${arc.delay}s`}
    repeatCount="indefinite"
    additive="sum"
    fill="freeze"
  />
  <animateTransform
    attributeName="transform"
    type="scale"
    from="3,1"
    to="1,1"
    dur={`${arc.duration / 2}s`}
    begin={`${arc.delay + arc.duration / 2}s`}
    repeatCount="indefinite"
    additive="sum"
    fill="freeze"
  />
</rect>

      ))}
    </svg>
  );
};

export default RainbowMessages;