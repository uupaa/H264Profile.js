# H264Profile.js [![Build Status](https://travis-ci.org/uupaa/H264Profile.js.svg)](https://travis-ci.org/uupaa/H264Profile.js)

[![npm](https://nodei.co/npm/uupaa.h264profile.js.svg?downloads=true&stars=true)](https://nodei.co/npm/uupaa.h264profile.js/)

H264(AVC) Profile and Level detection.

This module made of [WebModule](https://github.com/uupaa/WebModule).

## Documentation
- [Spec](https://github.com/uupaa/H264Profile.js/wiki/)
- [API Spec](https://github.com/uupaa/H264Profile.js/wiki/H264Profile)

## Browser, NW.js and Electron

```js
<script src="<module-dir>/lib/WebModule.js"></script>
<script src="<module-dir>/lib/H264Profile.js"></script>
<script>

var codecs     = "mp4a.40.2, avc1.4d4015";
var codecArray = codecs.split(","); // -> ["mp4a.40.2", " avc1.42c01e"]

for (var i = 0, iz = codecArray.length; i < iz; ++i) {
    var codec = codecArray[i].trim();

    if (/avc1/.test(codec)) {
        var detail = codec.slice(5); // "avc1.42c01e" -> "42c01e"

        console.info( H264Profile.getProfile(detail) ); // -> "Base";
        console.info( H264Profile.getLevel(detail)   ); // -> "3.0";
    }
}

</script>
```

## WebWorkers

```js
importScripts("<module-dir>/lib/WebModule.js");
importScripts("<module-dir>/lib/H264Profile.js");

```

## Node.js

```js
require("<module-dir>/lib/WebModule.js");
require("<module-dir>/lib/H264Profile.js");

```

