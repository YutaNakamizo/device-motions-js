import Action from './Action';

// Actions
const INSTANCE_INITIALIZED = new Action('motions/instance-initialized');
const GRANTED_CHANGED = new Action('motions/granted-changed');
const MOTIONS_CHANGED = new Action('motions/motions-changed');

// Reducer
const initialState ={
  deviceMotions: undefined,
  supported: {
    orientation: undefined,
    motion: undefined,
  },
  granted: {
    orientation: undefined,
    motion: undefined,
  },
  data: {
    orientation: {},
    motion: {
      acceleration: {},
      accelerationIncludingGravity: {},
      rotationRate: {},
      interval: undefined,
    },
  },
};
const reducer = (state = initialState, action) => {
  const { type, value } = action;
  switch(type) {
    case INSTANCE_INITIALIZED: {
      const { deviceMotions } = value;
      const {
        supported,
        granted,
      } = deviceMotions || initialState;
      return {
        ...state,
        deviceMotions,
        supported,
        granted,
      };
    }
    case GRANTED_CHANGED: {
      const { granted } = value;
      return {
        ...state,
        granted,
      };
    }
    case MOTIONS_CHANGED: {
      const { motions } = value;
      return {
        ...state,
        data: motions,
      };
    }
    default:
      return state;
  }
};
export default reducer;

// Action Creators
export const handleInstanceInitialized = deviceMotions => {
  return {
    type: INSTANCE_INITIALIZED,
    value: {
      deviceMotions,
    },
  };
};

export const handleGrantedChanged = granted => {
  return {
    type: GRANTED_CHANGED,
    value: {
      granted,
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

