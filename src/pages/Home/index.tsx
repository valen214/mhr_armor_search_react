
import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import strings, { addLoadedListener } from '../../lang';

import { Button,  util } from '../../lib/my_components';
import Dropdown from '../../lib/my_components/src/Dropdown';
import DataCaculatorScreen from './DataCalculator/DataCaculatorScreen';

import "./Home.scss";
import ManualSearchScreen from './ManualSearchScreen';

export default function Home() {
  const [ selectedTab, _setSelectedTab ] = useState(() => {
    if(location.pathname.slice(1) === "smart-search"){
      return 1;
    }
    
    return 0;
  });
  const setSelectedTab = (newTab: number) => {
    let url = new URL(location.toString());
    switch(newTab){
    case 0:
      url.pathname = "/"
      break;
    case 1:
      url.pathname = "/smart-search";
    }
    history.pushState({}, "", url);
    _setSelectedTab(newTab);
  };

  return (
    <div className="App">
      <header className="App-header">
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
      <SwipeableViews
        containerStyle={{ height: "calc(100% - 131px)"}}
        style={{ overflow: "visible", height: "100%" }}
        index={selectedTab}
        onChangeIndex={setSelectedTab}
        springConfig={{
          duration: '0.5s',
          easeFunction: 'ease-in-out',
          delay: '0s'
        }}
      >
        <div className="tab-content">
          <ManualSearchScreen />
        </div>
        <div className="tab-content">
          <DataCaculatorScreen />
        </div>
        
      </SwipeableViews>
    </div>
  );
}
