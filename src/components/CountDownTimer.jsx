import React, { useEffect, useState } from 'react';

function CountdownTimer() {
  const targetDate = new Date('2026-12-28T00:00:00+05:30').getTime();

  const calculateTimeLeft = () => {
    const difference = targetDate - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/60 via-[#10142a] to-pink-950/50 p-8 sm:p-10 text-center">

          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl" />

          <div className="relative z-10">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-purple-400">
              COLORIDO 2K26
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">
              The Celebration Begins In
            </h2>

            <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mt-8">

              <TimeBox
                value={timeLeft.days}
                label="Days"
              />

              <TimeBox
                value={timeLeft.hours}
                label="Hours"
              />

              <TimeBox
                value={timeLeft.minutes}
                label="Minutes"
              />

              <TimeBox
                value={timeLeft.seconds}
                label="Seconds"
              />

            </div>

            <p className="mt-7 text-sm text-gray-400">
              28–29 December 2026 · R.V.R. & J.C. College of Engineering
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-sm p-4 sm:p-6">

      <div className="text-3xl sm:text-5xl font-black text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </div>

      <div className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
        {label}
      </div>

    </div>
  );
}

export default CountdownTimer;