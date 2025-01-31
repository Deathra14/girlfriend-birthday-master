import { TypeAnimation } from 'react-type-animation';

export default function LoveLetter() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto mt-12">
      <TypeAnimation
        sequence={[
          'To my dearest love...',
          1000,
          'Every moment with you feels like a dream.',
          1000,
          'You’re my sunshine, my joy, my everything.',
          1000,
          'Happy Birthday, my forever person. 🥰',
          5000,
        ]}
        wrapper="p"
        speed={50}
        className="text-2xl text-pink-700 font-serif"
        repeat={Infinity}
      />
    </div>
  );
}