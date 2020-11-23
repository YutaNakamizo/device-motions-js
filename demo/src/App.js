import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import DeviceMotions from '~/device-motions.js';
import { DebugPanel } from '~/components/DebugPanel';
import './App.css';

function App() {
  const deviceMotionsRef = useRef();

  useEffect(() => {
    console.dir(DeviceMotions);
    deviceMotionsRef.current = new DeviceMotions();

    const motionHandler = (e) => {
      console.dir(e);
    };
    deviceMotionsRef.current.register(motionHandler);

    return () => deviceMotionsRef.current.unregister();
  }, []);

  return (
    <div className="App">
      App
      <DebugPanel
      />
    </div>
  );
}

export default App;
