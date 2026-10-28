import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './index.css';

const Nav = () => {
  const nav = useNavigate();
  return (
    <nav className="bg-[#151515] border-b border-[#252525] px-4 py-2 flex items-center justify-between">
      <button onClick={() => nav('/')} className="font-bold text-xl"><span className="text-white">Gim</span><span className="text-[#6d3bff]">kit</span></button>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm text-gray-300 hover:text-white">Log in</button>
        <button className="px-3 py-1 text-sm bg-[#6d3bff] rounded hover:bg-[#5a2fe6]">Sign up</button>
      </div>
    </nav>
  );
};

const Home = () => {
  const nav = useNavigate();
  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#101010] flex items-center justify-center">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-5xl font-bold mb-4"><span className="text-white">The </span><span className="text-[#6d3bff]">game show</span><br/><span className="text-white">classroom game</span></h1>
        <p className="text-gray-400 mb-6">Gimkit is a game show for the classroom that requires knowledge, collaboration, and strategy to win.</p>
        <button onClick={() => nav('/join')} className="px-6 py-2 bg-[#6d3bff] rounded font-bold hover:bg-[#5a2fe6]">Play Now</button>
      </div>
    </div>
  );
};

const Join = () => {
  const [code, setCode] = useState('');
  const nav = useNavigate();
  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#101010] flex items-center justify-center">
      <div className="bg-[#151515] p-6 rounded border border-[#252525] w-80">
        <h2 className="text-center text-lg font-bold mb-4">Join Game</h2>
        <input value={code} onChange={(e)=>setCode(e.target.value.toUpperCase())} placeholder="CODE" maxLength={6} className="w-full p-2 mb-3 bg-[#101010] border border-[#252525] rounded text-center font-mono text-lg"/>
        <button onClick={()=>code && nav('/play')} disabled={!code} className={`w-full p-2 rounded font-bold ${code ? 'bg-[#6d3bff] hover:bg-[#5a2fe6]' : 'bg-[#252525] text-gray-500'}`}>Join</button>
      </div>
    </div>
  );
};

const Play = () => {
  const [money, setMoney] = useState(0);
  const [q, setQ] = useState(0);
  const questions = [
    {q:"What is 2+2?", a:["3","4","5"], c:1},
    {q:"Capital of France?", a:["London","Paris","Rome"], c:1},
  ];
  const ans = (i) => {
    if(i === questions[q].c) setMoney(m=>m+10);
    setQ((q+1)%questions.length);
  };
  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#101010]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#151515] border-b border-[#252525]">
        <div className="text-sm">Question {q+1}/{questions.length}</div>
        <div className="text-[#ffb800] font-bold">${money}</div>
      </div>
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-[#151515] p-6 rounded border border-[#252525] mb-4">
          <h2 className="text-xl font-bold">{questions[q].q}</h2>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {questions[q].a.map((x,i)=>(
            <button key={i} onClick={()=>ans(i)} className="p-3 text-left bg-[#1f1f1f] hover:bg-[#252525] rounded border border-[#252525]">{String.fromCharCode(65+i)}. {x}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App(){
  return <Router>
    <Nav/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/play" element={<Play/>}/>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  </Router>
}
