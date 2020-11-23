import Action from './Action';

// Actions
const SUPPORTED_CHANGED = new Action('motions/supported-changed');
const ORIENTATION_GRANTED_CHANGED = new Action('motions/orientation-granted-changed');
const MOTION_GRANTED_CHANGED = new Action('motions/motion-granted-changed');
const MOTIONS_CHANGED = new Action('motions/motions-changed');

// Reducer
const initialState ={
  supported: undefined,
  orientationGranted: undefined,
  motionGranted: undefined,
  motions: {
    orientation: {},
    acceleration: {},
    accelerationIncludingGravity: {},
    rotationRate: {},
    interval: {},
  },
};
const reducer = (state = initialState, action) => {
  const { type, value } = action;
  switch(type) {
    case SUPPORTED_CHANGED: {
      const { supported } = value;
      return {
        ...state,
        supported,
      };
    }
    case ORIENTATION_GRANTED_CHANGED: {
      const { orientationGranted } = value;
      return {
        ...state,
        orientationGranted,
      };
    }
    case MOTION_GRANTED_CHANGED: {
      const { motionGranted } = value;
      return {
        ...state,
        motionGranted,
      };
    }
    case MOTIONS_CHANGED: {
      const { motions } = value;
      return {
        ...state,
        motions,
        orientationGranted: true,
        motionGranted: true,
      };
    }
    default:
      return state;
  }
};
export default reducer;

// Action Creators
export const handleSupoortedChanged = supported => {
  return {
    type: SUPPORTED_CHANGED,
    value: {
      supported,
    },
  };
};

export const handleOrientationGrantedChanged = orientationGranted => {
  return {
    type: ORIENTATION_GRANTED_CHANGED,
    value: {
      orientationGranted,
    },
  };
};

export const handleMotionGrantedChanged = motionGranted => {
  return {
    type: MOTION_GRANTED_CHANGED,
    value: {
      motionGranted,
    },
  };
};

export const handleMotionChanged = motions => {
  return {
    type: MOTIONS_CHANGED,
    value: {
      motions,
    },
  };
};

