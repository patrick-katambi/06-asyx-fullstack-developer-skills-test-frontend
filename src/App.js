import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import View_ticket from './features/view_ticket/View_ticket'
import './App.css';

function App() {
  return (
    <div className="w-screen h-screen bg-[#F3F4F6]">
      <header className="w-full">
        {/* <Counter /> */}
        {/* <br /> */}
        <View_ticket />
      </header>
    </div>
  );
}

export default App;
