# device-motion.js

A JavaScript library to get device motion for xR experience on web browser


## Quick Start

```
npm i --save device-motions-js
```

```
import createDeviceMotions from 'device-motions-js';

const deviceMotions = await createDeviceMotions();
```

## Properties

### `DeviceMotions.supported`

```
{
  orientation: Boolean,
  motion: Boolean,
}
```

This property discribes weather your browser supports 'deviceorientation' event and 'devicemotion' event.

Be careful that Chrome on Android returns `false` for both properties in not secure protocol even if the browser supports events.

### `DeviceMotions.granted`

```
{
  orientation: Boolean,
  motion: Boolean,
}
```

This property discribes the permission to access 'deviceorientation' and 'devicemotion' event.

If one or both of these values are `false`, you need to call `DeviceMotions.requestPermission()` method.

iOS later than 13 requires this step. If users are using iOS 12, users have to turn on at Settings > Safari by themselves.


## Methods

### `DeviceMotions.register(callback)`

returns: `DeviceMotions` (same instance)

This method enables you to register callback function of 'deviceorientation' and 'devicemotion' event.

If you need to be granted the permission to access events and you don't call `DeviceMotions.requestPermission()` method yet, the callback function will be called after the permission request succeeded.

Callback function will recieve and argument which including properties below:
(Check details on [Detecting device orientation - MDN web docs](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation))


```
{
  orientation: {
    absolute: Boolean,
    alpha: Number,
    beta: Number,
    gamma: Number,
  },
  motion: {
    acceleration: {
      x: Number,
      y: Number,
      z: Number,
    }.
    accelerationIncludingGravity: {
      x: Number,
      y: Number,
      z: Number,
    },
    rotationRate: {
      alpha: Number,
      beta: Number,
      gamma: Number,
    },
    interval: Number,
  },
}
```


### `DeviceMotions.unregister()`

returns: `DeviceMotions` (same instance)

You can stop getting event datas by calling this method.


### `DeviceMotions.requestPermission()`

returns: `Promise`

iOS 13 or later requires users acception by system dialog by Safari.

This method have to be called by user action. (If not called by non-user action, Promise will be rejected.)

Promise passes on resolve if

- you don't have to: `undefined`

- else:
```
{
  orientation: Boolean,
  motion: Boolean,
}
```


## License

MIT

## Author and Contcts

Yuta NAKAMIZO  
Email: [yuta.nakamizo@ggtk.app](mailto:yuta.nakamizo@ggtk.app)  
Web Site: [https://ggtk.app](https://ggtk.app)

