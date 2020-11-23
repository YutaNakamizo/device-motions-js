import React from 'react';
import DeviceMotions from '~/device-motions';
import { DebugPanel as DebugPanelBase } from '~/components/DebugPanel';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import * as motionsAC from '~/modules/motions';

export const DebugPanel = ({
  ...props
}) => {
  const {
    supported,
    orientationGranted,
    motionGranted,
    motions,
  } = useSelector(state => ({
    ...state.motions,
  }));

  const dispatch = useDispatch();
  const handleOrientationGrantedChanged = orientationGranted => dispatch(motionsAC.handleOrientationGrantedChanged(orientationGranted));
  const handleMotionGrantedChanged = motionGranted => dispatch(motionsAC.handleMotionGrantedChanged(motionGranted));

  const requestPermission = () => {
    DeviceMotions.requestPermission().then(({
      orientationGranted,
      motionGranted,
    }) => {
      console.log(orientationGranted, motionGranted);
      handleOrientationGrantedChanged(orientationGranted);
      handleMotionGrantedChanged(motionGranted);
    });
  };
  
  return (
    <DebugPanelBase
      {...props}
    >
      <div>
        {(
          supported === undefined
          || orientationGranted === undefined
          || motionGranted === undefined
        ) ? (
          'Loading...'
        ) : (
          <>
            <div>
              Supported: {supported}
            </div>
            <div>
              {(!orientationGranted || !motionGranted) && (
                <button
                  onClick={requestPermission}
                >
                  Request Permission
                </button>
              )}
            </div>
          </>
        )}
      </div>
      {JSON.stringify(motions, null, 2).slice(1, -1).trim().split('\n').map((row, index) => (
        <div
          key={index}
        >
          {row}
        </div>
      ))}
    </DebugPanelBase>
  );
};

