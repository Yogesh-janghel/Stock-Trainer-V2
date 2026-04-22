import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-off-white text-deep-black overflow-hidden relative">
      <HeroSection />
      <SlantedMarquee />
      <BentoGrid />
      <BrutalistFAQ />
      <GiantCTA />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-acid-green pt-32 pb-20 px-8 flex flex-col md:flex-row items-center border-b-4 border-black overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-electric-purple/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-hot-pink/30 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>

      {/* Floating Stickers */}
      <div className="absolute top-32 left-10 text-5xl bg-white border-2 border-black rounded-full p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-float" style={{ animationDelay: '0s' }}>💸</div>
      <div className="absolute top-1/4 right-1/4 text-6xl bg-white border-2 border-black rounded-full p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-float" style={{ animationDelay: '1s' }}>🚀</div>
      <div className="absolute bottom-32 left-1/4 text-5xl bg-white border-2 border-black rounded-full p-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-float" style={{ animationDelay: '2s' }}>💎</div>

      <div className="w-full md:w-1/2 z-10 space-y-8 pl-0 md:pl-12">
        <h1 className="text-7xl md:text-9xl font-display font-black leading-[0.85] tracking-tight">
          trade like a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-hot-pink inline-block transform -rotate-2 bg-white px-4 brutal-border my-2">pro.</span><br />
          risk zero.
        </h1>
        <p className="font-body text-2xl font-bold max-w-xl">
          the most expressive, gamified stock market simulator for gen-z. practice trading with real-time data, earn achievements, and top the global leaderboard.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <Link to="/register" className="px-12 py-5 bg-black text-white text-xl font-bold rounded-full border-2 border-black shadow-[6px_6px_0px_#ff0099] hover:shadow-none hover:translate-y-1 transition-all hover-wobble inline-block whitespace-nowrap text-center">
            start trading
          </Link>
          <Link to="/login" className="px-12 py-5 bg-white text-black text-xl font-bold rounded-full border-2 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-y-1 transition-all inline-block whitespace-nowrap text-center">
            log in
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-16 md:mt-0 flex justify-center z-10 relative">
        {/* Phone Mockup */}
        <div className="w-[320px] h-[640px] bg-black rounded-[3rem] border-8 border-black p-4 shadow-[12px_12px_0px_rgba(0,0,0,1)] transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-bouncy relative overflow-hidden flex flex-col">
          <div className="w-full h-full bg-off-white rounded-[2rem] overflow-hidden flex flex-col relative border-4 border-black">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

            <div className="bg-electric-purple text-white p-4 pt-8 border-b-4 border-black flex justify-between items-end">
              <h3 className="font-display font-black text-xl tracking-tighter">dashboard-</h3>
              <div className="font-bold">₹500,000</div>
            </div>

            <div className="flex-1 p-4 space-y-4 bg-[#f0f0f0]">
              <div className="bg-acid-green p-3 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] transform -rotate-1">
                <div className="flex justify-between font-bold"><span>AAPL</span><span className="text-electric-purple">+2.4%</span></div>
                <div className="text-2xl font-black mt-1">$173.50</div>
              </div>
              <div className="bg-hot-pink text-white p-3 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] transform rotate-1">
                <div className="flex justify-between font-bold"><span>NVDA</span><span className="text-acid-green">+5.1%</span></div>
                <div className="text-2xl font-black mt-1">$450.20</div>
              </div>
              <div className="bg-white p-3 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000]">
                <div className="flex justify-between font-bold"><span>TSLA</span><span className="text-hot-pink">-1.2%</span></div>
                <div className="text-2xl font-black mt-1">$210.80</div>
              </div>
            </div>

            <div className="h-16 bg-white border-t-4 border-black flex justify-around items-center px-2">
              <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-200"></div>
              <div className="w-12 h-12 rounded-full border-4 border-black bg-acid-green shadow-[2px_2px_0px_#000] -mt-6 flex items-center justify-center text-xl">⚡</div>
              <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SlantedMarquee = () => {
  return (
    <div className="w-[110%] -ml-[5%] bg-black text-white py-4 border-y-4 border-white transform -rotate-2 relative z-20 flex overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        <span className="text-4xl font-black tracking-tighter uppercase">real-time data</span>
        <span className="text-acid-green text-4xl">✦</span>
        <span className="text-4xl font-black tracking-tighter uppercase">no real risk</span>
        <span className="text-hot-pink text-4xl">✦</span>
        <span className="text-4xl font-black tracking-tighter uppercase">global leaderboard</span>
        <span className="text-electric-purple text-4xl">✦</span>
        <span className="text-4xl font-black tracking-tighter uppercase">earn badges</span>
        <span className="text-acid-green text-4xl">✦</span>
        {/* Repeat for seamless scroll */}
        <span className="text-4xl font-black tracking-tighter uppercase">real-time data</span>
        <span className="text-acid-green text-4xl">✦</span>
        <span className="text-4xl font-black tracking-tighter uppercase">no real risk</span>
        <span className="text-hot-pink text-4xl">✦</span>
        <span className="text-4xl font-black tracking-tighter uppercase">global leaderboard</span>
        <span className="text-electric-purple text-4xl">✦</span>
        <span className="text-4xl font-black tracking-tighter uppercase">earn badges</span>
        <span className="text-acid-green text-4xl">✦</span>
      </div>
    </div>
  );
};

const BentoGrid = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-8 pt-32 pb-16">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black inline-block bg-acid-green border-4 border-black px-6 py-2 transform rotate-1 shadow-[8px_8px_0px_#000]">
          everything you need.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card A: 7 columns */}
        <div className="md:col-span-7 bg-[#e0e0e0] border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#000] transform -rotate-1 relative overflow-hidden group">
          <h3 className="text-4xl font-black mb-4">live market data</h3>
          <p className="text-xl font-bold max-w-md">experience the thrill of the market with real-time simulated prices that move just like the real thing.</p>
          <div className="absolute -bottom-10 -right-10 text-[12rem] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-bouncy">
            📈
          </div>
        </div>

        {/* Card B: 5 columns */}
        <div className="md:col-span-5 bg-black text-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#7000ff] transform rotate-1 flex flex-col justify-center relative overflow-hidden">
          <h3 className="text-4xl font-black mb-4 text-acid-green">zero risk.</h3>
          <p className="text-xl font-bold">start with ₹5,00,000 in virtual cash. make mistakes, learn strategies, and never lose a dime.</p>
        </div>

        {/* Card C: 12 columns */}
        <div className="md:col-span-12 bg-hot-pink border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#000] transform -rotate-1 mt-4">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-12">
            <div className="w-full md:w-1/2 text-white mb-8 md:mb-0">
              <h3 className="text-5xl font-black mb-4">climb the ranks.</h3>
              <p className="text-2xl font-bold mb-6">compete against thousands of traders globally. build your net worth, unlock exclusive badges, and prove you're the best.</p>
              <ul className="space-y-4 font-bold text-xl">
                <li className="flex items-center gap-4"><span className="w-8 h-8 bg-acid-green text-black rounded-full flex items-center justify-center border-2 border-black">1</span> global leaderboard</li>
                <li className="flex items-center gap-4"><span className="w-8 h-8 bg-acid-green text-black rounded-full flex items-center justify-center border-2 border-black">2</span> dynamic achievements</li>
                <li className="flex items-center gap-4"><span className="w-8 h-8 bg-acid-green text-black rounded-full flex items-center justify-center border-2 border-black">3</span> portfolio tracking</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <div className="bg-white text-black border-4 border-black rounded-2xl shadow-[8px_8px_0px_#000] p-4 transform rotate-2">
                <div className="flex justify-between items-center border-b-4 border-black pb-2 mb-4">
                  <div className="font-black text-xl">leaderboard</div>
                  <div className="px-2 py-1 bg-acid-green border-2 border-black font-bold text-sm">top 3</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-electric-purple text-white border-2 border-black font-bold">
                    <span>1. wallstreet_bets</span>
                    <span>$1.2M</span>
                  </div>
                  <div className="flex justify-between p-2 border-2 border-black font-bold">
                    <span>2. diamond_hands</span>
                    <span>$980k</span>
                  </div>
                  <div className="flex justify-between p-2 border-2 border-black font-bold">
                    <span>3. paper_trader</span>
                    <span>$850k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BrutalistFAQ = () => {
  const faqs = [
    { q: "is it actually free?", a: "100%. you get half a million in fake money. knock yourself out." },
    { q: "can i lose real money?", a: "nope. the only thing you can lose is your pride on the leaderboard." },
    { q: "are the stock prices real?", a: "they're highly realistic simulated prices that mimic the volatility of real markets without the API rate limits." }
  ];

  return (
    <section id="faq" className="max-w-3xl mx-auto px-8 pt-16 pb-32">
      <h2 className="text-5xl font-black text-center mb-12">F.A.Q</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-white border-4 border-black shadow-[6px_6px_0px_#000] [&_summary::-webkit-details-marker]:hidden">
            <summary className="font-black text-2xl p-6 cursor-pointer flex justify-between items-center group-open:bg-gray-100 transition-colors">
              {faq.q}
              <span className="transform group-open:rotate-45 transition-transform text-3xl">+</span>
            </summary>
            <div className="p-6 pt-0 font-bold text-xl text-gray-800 border-t-4 border-transparent group-open:border-black group-open:bg-gray-100 mt-2">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

const GiantCTA = () => {
  return (
    <footer className="w-full bg-hot-pink border-t-8 border-black pt-32 pb-16 relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-20 left-20 text-[10rem] opacity-20 transform -rotate-12 pointer-events-none">💣</div>
      <div className="absolute bottom-40 right-20 text-[12rem] opacity-20 transform rotate-12 pointer-events-none">🦄</div>

      <h2 className="text-7xl md:text-[8rem] font-black text-white text-center leading-none tracking-tighter mb-12 relative z-10">
        ARE YOU<br />
        <span className="text-black bg-acid-green px-4 border-8 border-black shadow-[12px_12px_0px_#000] inline-block transform -rotate-3 my-4 hover:rotate-0 transition-transform duration-500 ease-bouncy">READY?</span>
      </h2>

      <Link to="/register" className="relative z-10 px-12 py-6 bg-black text-white text-3xl font-black rounded-full border-4 border-black shadow-[8px_8px_0px_#ccff00] hover:shadow-none hover:translate-y-2 transition-all hover-wobble">
        Register Now!
      </Link>

      <div className="w-full bg-white text-black border-t-8 border-black mt-32 relative py-12 px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[15vw] font-black tracking-tighter whitespace-nowrap">STOCK.TRAINER</span>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10 font-bold">
          <div className="text-xl mb-4 md:mb-0">© 2026 stock trainer. all rights reserved.</div>
          <div className="flex gap-6">
            {/* <a href="#" className="hover:text-electric-purple hover:underline">twitter</a>
            <a href="#" className="hover:text-electric-purple hover:underline">instagram</a> */}
            <a href="#" className="hover:text-electric-purple hover:underline">github</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
