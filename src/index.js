export default class DeviceMotions {
  constructor() {
    this._orientation = {};
    this._motion = {};
    this._callback = function() {};
  }

  static _test() {
    console.log('test');
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
    this._callback = callback;
    window.addEventListener('deviceorientation', this._orientationHandler);
    window.addEventListener('devicemotion', this._motionHandler);
    return this;
  }

  unregister() {
    window.removeEventListener('deviceorientation', this._orientationHandler);
    window.removeEventListener('devicemotion', this._motionHandler);
    return this;
  }
};

