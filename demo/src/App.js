import React, {
  useEffect,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import * as motionsAC from '~/modules/motions';
import createDeviceMotions from '~/device-motions.js';
import { DebugPanel } from '~/containers/DebugPanel';
import './App.css';

function App() {
  const {
    deviceMotions,
    orientationGranted,
    motionGranted,
  } = useSelector(state => ({
    ...state.motions,
  }));

  const dispatch = useDispatch();
  const handleInstanceInitialized = deviceMotions => dispatch(motionsAC.handleInstanceInitialized(deviceMotions));
  const handleGrantedChanged = granted => dispatch(motionsAC.handleGrantedChanged(granted));
  const handleMotionChanged = motions => dispatch(motionsAC.handleMotionChanged(motions));

  useEffect(() => {
    createDeviceMotions().then(handleInstanceInitialized);
  }, []);

  useEffect(() => {
    handleInstanceInitialized(deviceMotions);
    if(!deviceMotions) return;
    
    const motionHandler = motions => {
      handleMotionChanged(motions);
    };

    deviceMotions.register(motionHandler);
    return () => deviceMotions.unregister();

  }, [
    deviceMotions,
  ]);

  return (
    <div className="App">
      App
      <DebugPanel
      />
    </div>
  );
}

export default App;
