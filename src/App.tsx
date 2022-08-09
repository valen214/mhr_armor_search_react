import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import MonacoPage from './pages/tests/MonacoPage';

export default function App() {
  useMyStyle();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="mhr_armor_search_react/">
            <Route path="" element={<Home />} />
            <Route path="monaco_test" element={<MonacoPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


function useMyStyle(){
  useEffect(() => {
    // global style
    let style: HTMLStyleElement = document.createElement("style");
    style.innerHTML = `
    * {
      /* App.tsx: global styles */
      box-sizing: border-box;

    }
    html, body,
    #root, .App {
      margin: 0;
      padding: 0;
      height: 100vh;
      width: 100vw;

      overflow: hidden;
    }

    `;
    document.head.appendChild(style);


    
    return () => {
      document.head.removeChild(style);
    }
  }, [])
}
