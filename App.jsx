import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css'; // Tailwind imports go here

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="flex justify-between items-center p-4 bg-[#0a0a0c] text-white border-b border-gray-800">
    <div className="text-xl font-bold tracking-tighter">GIMKIT</div>
    <div className="space-x-4">
      <button className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">Log In</button>
      <button className="px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-500 transition shadow-lg shadow-purple-500/30">Sign Up</button>
    </div>
  </nav>
);

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] relative overflow-hidden">
    {/* Mesh Gradient Background */}
    <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-purple-900 via-[#0a0a0c] to-blue-900"></div>
    
    <div className="z-10 text-center max-w-2xl px-6">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
        Next Level Learning
      </h1>
      <p className="text-gray-400 text-lg mb-8 leading-relaxed">
        Hey, I'm Josh! I started Gimkit as a high school project. Games really helped me become engaged in school. That's why I built Gimkit – to be the kind of game I'd want to play in class. Can't wait for you to give it a try!
      </p>
      <button 
        onClick={() => window.location.href = '/join'}
        className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-lg transition transform hover:scale-105 shadow-xl shadow-purple-500/20"
      >
        Start Playing
      </button>
    </div>
  </div>
);

const JoinGame = ({ onStart }) => {
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c]">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md border border-gray-800 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Join a Kit</h2>
        <input 
          type="text" 
          placeholder="Enter Kit Code" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white mb-4 focus:border-purple-500 outline-none"
        />
        <button 
          onClick={() => code && onStart()}
          disabled={!code}
          className={`w-full py-4 rounded-xl font-bold text-lg transition ${code ? 'bg-purple-600 hover:bg-purple-500' : 'bg-gray-700 cursor-not-allowed'}`}
        >
          Start Playing
        </button>
      </div>
    </div>
  );
};

const GameRoom = ({ onExit }) => {
  const [money, setMoney] = useState(0);
  const [timer, setTimer] = useState(60);
  const [questionIndex, setQuestionIndex] = useState(0);
  
  // Mock Data matching their API structure
  const questions = [
    { q: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { q: "Capital of France?", answers: ["London", "Paris", "Berlin", "Madrid"], correct: 1 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (index) => {
    if (index === questions[questionIndex].correct) {
      setMoney(m => m + 10);
      setTimeout(() => setQuestionIndex(q => (q + 1) % questions.length), 1000);
    } else {
      alert("Wrong Answer!");
    }
  };

  return (
    <div className="h-screen grid grid-cols-12 gap-4 p-4 bg-[#0a0a0c]">
      {/* Header */}
      <div className="col-span-12 flex justify-between items-center bg-gray-900 p-4 rounded-xl border border-gray-800">
        <span className="font-bold text-white">Player_123</span>
        <span className="text-yellow-400 font-mono text-xl">${money}</span>
        <span className="text-blue-400 font-mono">{timer}s</span>
      </div>

      {/* Question Area */}
      <div className="col-span-8 bg-gray-900 rounded-xl p-8 flex flex-col items-center justify-center border border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-8">{questions[questionIndex].q}</h2>
        <div className="grid grid-cols-2 gap-4 w-full">
          {questions[questionIndex].answers.map((ans, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswer(i)}
              className="p-6 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white transition transform hover:-translate-y-1"
            >
              {ans}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar (Leaderboard & Shop) */}
      <div className="col-span-4 space-y-4">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 h-1/2 overflow-y-auto">
          <h3 className="text-purple-400 font-bold mb-4">Leaderboard</h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between text-sm text-gray-400 border-b border-gray-800 pb-2">
                <span>{i}. Bot_{i}</span>
                <span>{Math.floor(Math.random() * 500)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 h-1/2">
          <h3 className="text-yellow-400 font-bold mb-4">Power-Ups</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-700">
              <span>Shield</span>
              <span className="text-yellow-400">$100</span>
            </div>
            <div className="flex justify-between items-center bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-700">
              <span>2x Money</span>
              <span className="text-yellow-400">$200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ROUTER ---

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinGame onStart={() => window.location.href = '/game'} />} />
        <Route path="/game" element={<GameRoom />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}
