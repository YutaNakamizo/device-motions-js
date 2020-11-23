import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import * as motionsAC from '~/modules/motions';
import DeviceMotions from '~/device-motions.js';
import { DebugPanel } from '~/containers/DebugPanel';
import './App.css';

function App() {
  const {
    orientationGranted,
    motionGranted,
  } = useSelector(state => ({
    ...state.motions,
  }));

  const dispatch = useDispatch();
  const handleSupoortedChanged = supported => dispatch(motionsAC.handleSupoortedChanged(supported));
  const handleOrientationGrantedChanged = orientationGranted => dispatch(motionsAC.handleOrientationGrantedChanged(orientationGranted));
  const handleMotionGrantedChanged = motionGranted => dispatch(motionsAC.handleMotionGrantedChanged(motionGranted));
  const handleMotionChanged = motions => dispatch(motionsAC.handleMotionChanged(motions));

  const deviceMotionsRef = useRef(new DeviceMotions());
  useEffect(() => {
    handleSupoortedChanged(DeviceMotions.supported());
    if(!DeviceMotions.permissionRequired()) {
      handleOrientationGrantedChanged(true);
      handleMotionGrantedChanged(true);
    }
  }, []);

  useEffect(() => {
    const motionHandler = motions => {
      console.log(motions);
      handleMotionChanged(motions);
    };

    deviceMotionsRef.current.register(motionHandler);
    return () => deviceMotionsRef.current.unregister();
  }, [
    orientationGranted,
    motionGranted,
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
