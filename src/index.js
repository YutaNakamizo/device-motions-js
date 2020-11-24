class DeviceMotions {
  constructor() {
    this._orientation = {};
    this._motion = {
      acceleration: {},
      accelerationIncludingGravity: {},
      rotationRate: {},
    };
    this._orientationHandlerWrap = function(e) {
      this._orientationHandler(e);
    }.bind(this);
    this._motionHandlerWrap = function(e) {
      this._motionHandler(e);
    }.bind(this);
    this._callback = function() {};
    this._waitingPermission = false;
    this.supported = {
      orientation: Boolean(window.DeviceOrientationEvent),
      motion: Boolean(window.DeviceMotionEvent),
    };
    this.granted = {
      orientation: this.supported ? (
        !(typeof window.DeviceOrientationEvent.requestPermission === 'function') || undefined
      ) : null,
      motion: this.supported ? (
        !(typeof window.DeviceMotionEvent.requestPermission === 'function') || undefined
      ) : null,
    };
  }

  /* Private */
  _iOSInit() {
    if(
      this.granted.orientation !== undefined 
      && this.granted.motion !== undefined
    ) return this;

    return this.requestPermission().then(granted => {
      this.granted = granted;
      return this;
    }).catch(err => {
      this.granted = {
        orientation: false,
        motion: false,
      };
      return this;
    });
  }

  _orientationHandler(e) {
    for(const prop of [
      'absolute',
      'alpha',
      'beta',
      'gamma',
    ]) this._orientation[prop] = e[prop];
    this._fireCallback();
    return;
  }

  _motionHandler(e) {
    for(const key of [
      'acceleration',
      'accelerationIncludingGravity',
    ]) for(const prop of [
      'x',
      'y',
      'z',
    ]) this._motion[key][prop] = e[key][prop];
    for(const key of [
      'rotationRate',
    ]) for(const prop of [
      'alpha',
      'beta',
      'gamma',
    ]) this._motion[key][prop] = e[key][prop];
    for(const prop of [
      'interval',
    ]) this._motion[prop] = e[prop];
    this._fireCallback();
    return;
  }

  _fireCallback() {
    this._callback({
      orientation: this._orientation,
      motion: this._motion,
    });
  }

  /* Public */
  register(callback) {
    this._callback = callback;
    if(
      this.supported
      && (
        !this.granted.orientation
        || !this.granted.motion
      )
    ) { // Permission not requested yet.
      console.log('Register waiting');
      this._waitingPermission = true;
      return this;
    }
    window.addEventListener('deviceorientation', this._orientationHandlerWrap);
    window.addEventListener('devicemotion', this._motionHandlerWrap);
    console.log('Registered');
    return this;
  }

  unregister() {
    window.removeEventListener('deviceorientation', this._orientationHandlerWrap);
    window.removeEventListener('devicemotion', this._motionHandlerWrap);
    console.log('Unregistered');
    return this;
  }

  async requestPermission() {
    if(
      this.supported
      && (
        this.granted.orientation
        && this.granted.motion
      )
    ) return; // Permission already granted
    const orientationState = await window.DeviceOrientationEvent.requestPermission();
    const motionState = await window.DeviceMotionEvent.requestPermission();
    const granted = {
      orientation: orientationState === 'granted',
      motion: motionState === 'granted',
    };
    this.granted = granted;
    if(this._waitingPermission) this.register(this._callback);
    return granted;
  }
};


export default async function(props) {
  const deviceMotions = new DeviceMotions(props);
  await deviceMotions._iOSInit();
  return deviceMotions;
};

