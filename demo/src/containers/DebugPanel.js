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
    deviceMotions,
    supported,
    granted,
    data: {
      orientation,
      motion,
    },
  } = useSelector(state => ({
    ...state.motions,
  }));

  const dispatch = useDispatch();
  const handleGrantedChanged = granted => dispatch(motionsAC.handleGrantedChanged(granted));

  const requestPermission = () => {
    deviceMotions.requestPermission().then(granted => {
      handleGrantedChanged(granted);
    });
  };
  
  return (
    <DebugPanelBase
      {...props}
    >
      <div>
        {(
          supported.orientation === undefined
          || supported.motion === undefined
          || granted.orientation === undefined
          || granted.motion === undefined
        ) ? (
          'Loading...'
        ) : (
          <>
            <div>
              Supported: {String(supported.orientation && supported.motion)}
            </div>
            <div>
              {(!granted.orientation || !granted.motion) && (
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
      {JSON.stringify({
        orientation,
        ...motion,
      }, null, 2).slice(1, -1).trim().split('\n').map((row, index) => (
        <div
          key={index}
        >
          {row.trim()}
        </div>
      ))}
    </DebugPanelBase>
  );
};

