(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("H264Profile", function moduleClosure(global, WebModule, VERIFY /*, VERBOSE */) {
"use strict";

// --- technical terms / data structure --------------------
// --- dependency modules ----------------------------------
// --- import / local extract functions --------------------
// --- define / local variables ----------------------------
var PROFILES = {
         66: "Base", //  66 (0x42) Baseline profile
         77: "Main", //  77 (0x4D) Main profile
        100: "High", // 100 (0x64) High profile
    };

var LEVELS = {
        0x0C: "1.2",
        0x0D: "1.3",
        0x14: "2.0",
        0x15: "2.1",
        0x16: "2.2",
        0x1E: "3.0",
        0x1F: "3.1",
        0x20: "3.2",
        0x28: "4.0",
        0x29: "4.1",
        0x2A: "4.2",
        0x32: "5.0",
        0x33: "5.1",
    };

// --- class / interfaces ----------------------------------
var H264Profile = {
    "getProfile":   H264Profile_getProfile, // H264Profile.getProfile(string:CodecString):ProfileString
    "getLevel":     H264Profile_getLevel,   // H264Profile.getLevel(string:CodecString):LevelString
    "repository":   "https://github.com/uupaa/H264Profile.js",
};

// --- implements ------------------------------------------
function H264Profile_getProfile(string) { // @arg CodecString - Decimal("avc1.66.30") or Hex("avc1.42c01e")
                                          // @ret ProfileString - "Base" or "Main" or "High" or ""
//{@dev
    if (VERIFY) {
        $valid($type(string, "CodecString"), H264Profile_getProfile, "string");
    }
//}@dev

    if (/^avc1\./.test(string)) {
        string = string.slice(5); // "avc1.66.30" -> "66.30"
    }
    var profile = /\./.test(string)   ? parseInt(string, 10)
                : string.length === 6 ? (parseInt("0x" + string, 16) >> 16)
                                   : 0;
    return PROFILES[profile] || "";
}

function H264Profile_getLevel(string) { // @arg CodecString - Hex("avc1.42c01e") or Decimal("avc1.66.30")
                                        // @ret LevelString - eg: "3.0"
//{@dev
    if (VERIFY) {
        $valid($type(string, "CodecString"), H264Profile_getProfile, "string");
    }
//}@dev

    if (/^avc1\./.test(string)) {
        string = string.slice(5); // "avc1.66.30" -> "66.30"
    }
    var level = /\./.test(string)   ? parseInt(string.split(".")[1], 10)
              : string.length === 6 ? (parseInt("0x" + string, 16) & 0xFF)
                                 : 0;

    return LEVELS[level] || "";
}

return H264Profile; // return entity

});

