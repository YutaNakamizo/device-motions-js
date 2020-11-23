export default class DeviceMotions {
  constructor() {
    this._orientation = {};
    this._motion = {};
    this._callback = function() {};
  }

  static supported() {
    return (
      Boolean(window.DeviceOrientationEvent)
      && Boolean(window.DeviceMotionEvent)
    );
  }

  static permissionRequired() {
    console.dir(window.DeviceOrientationEvent)
    return (
      DeviceMotions.supported()
      && (
        typeof window.DeviceOrientationEvent.requestPermission === 'function'
        && typeof window.DeviceMotionEvent.requestPermission === 'function'
      )
    );
  }

  static async requestPermission() {
    if(!DeviceMotions.permissionRequired()) return;
    const orientationState = await window.DeviceOrientationEvent.requestPermission();
    const motionState = await window.DeviceMotionEvent.requestPermission();
    return {
      orientationGranted: orientationState === 'granted',
      motionGranted: motionState === 'granted',
    };
  }

  /* Private */
  _orientationHandler(e) {
    for(const key of [
      'absolute',
      'alpha',
      'beta',
      'gamma',
    ]) this._orientation[key] = e[key];
    this._fireCallback();
    return;
  }

  _motionHandler(e) {
    for(const key of [
      'acceleration',
      'accelerationIncludingGravity',
      'rotationRate',
      'interval',
    ]) this._motion[key] = e[key];
    this._fireCallback();
    return;
  }

  _fireCallback() {
    this._callback({
      orientation: this._orientation,
      ...this._motion,
    });
  }

  /* Public */
  register(callback) {
    if(!DeviceMotions.supported()) return this;
    this._callback = callback;
    window.addEventListener('deviceorientation', function(e) {
      this._orientationHandler(e)
    }.bind(this));
    window.addEventListener('devicemotion', function(e) {
      this._motionHandler(e);
    }.bind(this));
    console.log('Registered');
    return this;
  }

  unregister() {
    window.removeEventListener('deviceorientation', this._orientationHandler);
    window.removeEventListener('devicemotion', this._motionHandler);
    console.log('Unregistered');
    return this;
  }
};

