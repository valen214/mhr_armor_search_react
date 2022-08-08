
import React, { useEffect, useState } from 'react';
import strings, { notifyLoaded } from '../../lang';

import { Button } from '../../lib/my_components';
import DataCaculatorScreen from './DataCalculator/DataCaculatorScreen';

import "./Home.scss";
import ManualSearchScreen from './ManualSearchScreen';

export default function Home() {
  const [ selectedTab, _setSelectedTab ] = useState(() => {
    if(location.hash.slice(1) === "/smart-search"){
      return 1;
    }
    
    return 0;
  });
  const setSelectedTab = (newTab: number) => {
    // https://url.spec.whatwg.org/#dom-url-hash
    let url = new URL(location.toString());
    switch(newTab){
    case 0:
      url.hash = "/"
      break;
    case 1:
      url.hash = "/smart-search";
    }
    history.pushState({}, "", url);
    _setSelectedTab(newTab);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          style={{
            float: "right",
            maringLeft: "auto",
          }}
          onClick={() => {
            strings.setLanguage(
              strings.getLanguage() === "en" ? 
              "zh" : "en");
            notifyLoaded();
          }}
        >
          <span className="material-icons">language</span>
        </Button>
      </header>
      <div className="tab-bar">
        <Button
          onClick={() => setSelectedTab(selectedTab ? 0 : 1)}
          className={`tab ${ selectedTab === 0 && "selected" }`}
        >
          Manual Search
        </Button>
        <Button
          onClick={() => setSelectedTab(selectedTab ? 0 : 1)}
          className={`tab ${ selectedTab === 1 && "selected" }`}
        >
          Data Calculator
        </Button>
      </div>
      <div className="tab-content" style={{
        "display": selectedTab === 0 ? "block" : "none"
      }}>
        <ManualSearchScreen />
      </div>
      <div className="tab-content" style={{
        "display": selectedTab === 1 ? "block" : "none",
      }}>
        <DataCaculatorScreen />
      </div>
        
    </div>
  );
}
