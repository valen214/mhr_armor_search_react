import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button,  util } from './lib/my_components';
import Home from './pages/Home';

export default function App() {
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


    let roboto_font = document.createElement("link");
    roboto_font.rel = "stylesheet";
    roboto_font.href="https://fonts.googleapis.com/css?" +
        "family=Roboto:300,400,500,700&display=swap";
    document.head.appendChild(roboto_font);

    let icon_font = document.createElement("link");
    icon_font.rel = "stylesheet";
    icon_font.href="https://fonts.googleapis.com" +
        "/icon?family=Material+Icons";
    document.head.appendChild(icon_font);
    
    console.log("LOADED");
    return () => {
      document.head.removeChild(style);
      document.head.removeChild(roboto_font);
      document.head.removeChild(icon_font);
    }
  }, [])
  return (
    <Home />
  );
}

