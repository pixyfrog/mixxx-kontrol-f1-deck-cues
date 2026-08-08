//
// Native Instruments Traktor Kontrol F1 - Deck Cues HID mapping
// Based on the built-in Traktor-Kontrol-F1-scripts.js
//
// Layout:
//   Pads 1-8  -> deck N hotcues 1-8
//   Pads 9-16 -> deck N+1 hotcues 1-8
//   Browse    -> toggle deck pairs (1&2 <-> 3&4)
//   Tap empty pad -> set hotcue
//   Hold set pad -> play from cue, stop and return on release
//   Shift while holding a playing pad -> capture: keeps playing on release
//   Shift+pad (shift first) -> delete hotcue
//
// Preserves the built-in HIDController constructor pattern so Mixxx binds
// the JS instance to the actual USB device and LED output works.

function KontrolF1Controller() {
    this.controller = new HIDController();

    this.version_major = undefined;
    this.version_minor = undefined;
    this.controller.activeDeck = 1;

    this.registerInputPackets = function() {
        var packet = new HIDPacket("control", 0x1);
        packet.addControl("hid", "grid_8", 1,"I", 0x1);
        packet.addControl("hid", "grid_7", 1,"I", 0x2);
        packet.addControl("hid", "grid_6", 1,"I", 0x4);
        packet.addControl("hid", "grid_5", 1,"I", 0x8);
        packet.addControl("hid", "grid_4", 1,"I", 0x10);
        packet.addControl("hid", "grid_3", 1,"I", 0x20);
        packet.addControl("hid", "grid_2", 1,"I", 0x40);
        packet.addControl("hid", "grid_1", 1,"I", 0x80);
        packet.addControl("hid", "grid_16", 1,"I", 0x100);
        packet.addControl("hid", "grid_15", 1,"I", 0x200);
        packet.addControl("hid", "grid_14", 1,"I", 0x400);
        packet.addControl("hid", "grid_13", 1,"I", 0x800);
        packet.addControl("hid", "grid_12", 1,"I", 0x1000);
        packet.addControl("hid", "grid_11", 1,"I", 0x2000);
        packet.addControl("hid", "grid_10", 1,"I", 0x4000);
        packet.addControl("hid", "grid_9", 1,"I", 0x8000);
        packet.addControl("hid", "shift", 1,"I", 0x800000);
        packet.addControl("hid", "reverse", 1,"I", 0x400000);
        packet.addControl("hid", "size", 1,"I", 0x100000);
        packet.addControl("hid", "type", 1,"I", 0x200000);
        packet.addControl("hid", "select_push", 1,"I", 0x40000);
        packet.addControl("hid", "browse", 1,"I", 0x80000);
        packet.addControl("hid", "play_1", 1,"I", 0x80000000);
        packet.addControl("hid", "play_2", 1,"I", 0x40000000);
        packet.addControl("hid", "play_3", 1,"I", 0x20000000);
        packet.addControl("hid", "play_4", 1,"I", 0x10000000);
        packet.addControl("hid", "sync", 1,"I", 0x8000000);
        packet.addControl("hid", "quant", 1,"I", 0x4000000);
        packet.addControl("hid", "capture", 1,"I", 0x2000000);
        packet.addControl("hid", "select_encoder", 5,"B", undefined,true);

        packet.addControl("hid", "knob_1", 6,"H");
        packet.addControl("hid", "knob_2", 8,"H");
        packet.addControl("hid", "knob_3", 10,"H");
        packet.addControl("hid", "knob_4", 12,"H");
        packet.addControl("hid", "fader_1", 14,"H");
        packet.addControl("hid", "fader_2", 16,"H");
        packet.addControl("hid", "fader_3", 18,"H");
        packet.addControl("hid", "fader_4", 20,"H");
        this.controller.registerInputPacket(packet);
    };

    this.registerOutputPackets = function() {
        var packet = new HIDPacket("lights", 0x80);
        packet.addOutput("hid", "right_segment_dp", 1, "B");
        packet.addOutput("hid", "right_segment_1", 2, "B");
        packet.addOutput("hid", "right_segment_2", 3, "B");
        packet.addOutput("hid", "right_segment_3", 4, "B");
        packet.addOutput("hid", "right_segment_4", 5, "B");
        packet.addOutput("hid", "right_segment_5", 6, "B");
        packet.addOutput("hid", "right_segment_6", 7, "B");
        packet.addOutput("hid", "right_segment_7", 8, "B");

        packet.addOutput("hid", "left_segment_dp", 9, "B");
        packet.addOutput("hid", "left_segment_1", 10, "B");
        packet.addOutput("hid", "left_segment_2", 11, "B");
        packet.addOutput("hid", "left_segment_3", 12, "B");
        packet.addOutput("hid", "left_segment_4", 13, "B");
        packet.addOutput("hid", "left_segment_5", 14, "B");
        packet.addOutput("hid", "left_segment_6", 15, "B");
        packet.addOutput("hid", "left_segment_7", 16, "B");

        packet.addOutput("hid", "browse_brightness", 17, "B");
        packet.addOutput("hid", "size_brightness", 18, "B");
        packet.addOutput("hid", "type_brightness", 19, "B");
        packet.addOutput("hid", "reverse_brightness", 20, "B");
        packet.addOutput("hid", "shift_brightness", 21, "B");
        packet.addOutput("hid", "capture_brightness", 22, "B");
        packet.addOutput("hid", "quant_brightness", 23, "B");
        packet.addOutput("hid", "sync_brightness", 24, "B");

        packet.addOutput("hid", "grid_1_blue", 25, "B");
        packet.addOutput("hid", "grid_1_red", 26, "B");
        packet.addOutput("hid", "grid_1_green", 27, "B");
        packet.addOutput("hid", "grid_2_blue", 28, "B");
        packet.addOutput("hid", "grid_2_red", 29, "B");
        packet.addOutput("hid", "grid_2_green", 30, "B");
        packet.addOutput("hid", "grid_3_blue", 31, "B");
        packet.addOutput("hid", "grid_3_red", 32, "B");
        packet.addOutput("hid", "grid_3_green", 33, "B");
        packet.addOutput("hid", "grid_4_blue", 34, "B");
        packet.addOutput("hid", "grid_4_red", 35, "B");
        packet.addOutput("hid", "grid_4_green", 36, "B");
        packet.addOutput("hid", "grid_5_blue", 37, "B");
        packet.addOutput("hid", "grid_5_red", 38, "B");
        packet.addOutput("hid", "grid_5_green", 39, "B");
        packet.addOutput("hid", "grid_6_blue", 40, "B");
        packet.addOutput("hid", "grid_6_red", 41, "B");
        packet.addOutput("hid", "grid_6_green", 42, "B");
        packet.addOutput("hid", "grid_7_blue", 43, "B");
        packet.addOutput("hid", "grid_7_red", 44, "B");
        packet.addOutput("hid", "grid_7_green", 45, "B");
        packet.addOutput("hid", "grid_8_blue", 46, "B");
        packet.addOutput("hid", "grid_8_red", 47, "B");
        packet.addOutput("hid", "grid_8_green", 48, "B");
        packet.addOutput("hid", "grid_9_blue", 49, "B");
        packet.addOutput("hid", "grid_9_red", 50, "B");
        packet.addOutput("hid", "grid_9_green", 51, "B");
        packet.addOutput("hid", "grid_10_blue", 52, "B");
        packet.addOutput("hid", "grid_10_red", 53, "B");
        packet.addOutput("hid", "grid_10_green", 54, "B");
        packet.addOutput("hid", "grid_11_blue", 55, "B");
        packet.addOutput("hid", "grid_11_red", 56, "B");
        packet.addOutput("hid", "grid_11_green", 57, "B");
        packet.addOutput("hid", "grid_12_blue", 58, "B");
        packet.addOutput("hid", "grid_12_red", 59, "B");
        packet.addOutput("hid", "grid_12_green", 60, "B");
        packet.addOutput("hid", "grid_13_blue", 61, "B");
        packet.addOutput("hid", "grid_13_red", 62, "B");
        packet.addOutput("hid", "grid_13_green", 63, "B");
        packet.addOutput("hid", "grid_14_blue", 64, "B");
        packet.addOutput("hid", "grid_14_red", 65, "B");
        packet.addOutput("hid", "grid_14_green", 66, "B");
        packet.addOutput("hid", "grid_15_blue", 67, "B");
        packet.addOutput("hid", "grid_15_red", 68, "B");
        packet.addOutput("hid", "grid_15_green", 69, "B");
        packet.addOutput("hid", "grid_16_blue", 70, "B");
        packet.addOutput("hid", "grid_16_red", 71, "B");
        packet.addOutput("hid", "grid_16_green", 72, "B");

        packet.addOutput("hid", "play_4_1_brightness", 73, "B");
        packet.addOutput("hid", "play_4_2_brightness", 74, "B");
        packet.addOutput("hid", "play_3_1_brightness", 75, "B");
        packet.addOutput("hid", "play_3_2_brightness", 76, "B");
        packet.addOutput("hid", "play_2_1_brightness", 77, "B");
        packet.addOutput("hid", "play_2_2_brightness", 78, "B");
        packet.addOutput("hid", "play_1_1_brightness", 79, "B");
        packet.addOutput("hid", "play_1_2_brightness", 80, "B");

        this.controller.registerOutputPacket(packet);
    };

    this.initializeHIDController = function() {
        this.registerInputPackets();
        this.registerOutputPackets();
    };

    this.setButtonBrightness = function(name, value) {
        var controller = this.controller;
        var packet = controller.getOutputPacket("lights");
        if (name.match(/grid_/)) {
            HIDDebug("ERROR: set PAD colors with setPADColor");
            return;
        }
        if (!name.match(/.*_brightness$/))
            name = name + "_brightness";
        var field = packet.getField("hid", name);
        if (field == undefined) {
            HIDDebug("button field not found: " + name);
            return;
        }
        if (value < 0)
            value = 0;
        if (value > 0x7f)
            value = 0x7f;
        field.value = value;
    };

    this.setPADColor = function(index, red, green, blue) {
        var controller = this.controller;
        var packet = controller.getOutputPacket("lights");
        var field = undefined;
        if (index <= 0 || index > 16) {
            HIDDebug("Invalid grid index" + index);
            return;
        }
        if (red == undefined)
            red = 0;
        if (red > 0x7f)
            red = 0x7f;
        field = packet.getField("hid", "grid_" + index + "_red");
        field.value = red;
        if (green == undefined)
            green = 0;
        if (green > 0x7f)
            green = 0x7f;
        field = packet.getField("hid", "grid_" + index + "_green");
        field.value = green;
        if (blue == undefined)
            blue = 0;
        if (blue > 0x7f)
            blue = 0x7f;
        field = packet.getField("hid", "grid_" + index + "_blue");
        field.value = blue;
    };

    this.resetLEDs = function() {
        var controller = this.controller;
        var packet = controller.getOutputPacket("lights");
        for (var group_name in packet.groups) {
            var group = packet.groups[group_name];
            for (var field_name in group) {
                var field = group[field_name];
                field.value = 0;
            }
        }
        packet.send();
    };

    this.updateLEDs = function() {
        var packet = this.controller.getOutputPacket("lights");
        packet.send();
    };
}

KontrolF1 = new KontrolF1Controller();

KontrolF1.deckOffset = 0;
KontrolF1.padHeld = new Array(16);
KontrolF1.padTriggeredPlay = new Array(16);
KontrolF1.padCaptured = new Array(16);
KontrolF1.prevByte1 = 0;
KontrolF1.prevByte2 = 0;
KontrolF1.prevByte3 = 0;
KontrolF1.ledConnections = [];

for (var i = 0; i < 16; i++) {
    KontrolF1.padHeld[i] = false;
    KontrolF1.padTriggeredPlay[i] = false;
    KontrolF1.padCaptured[i] = false;
}

// Pad index 0..15, matching F1 grid order (byte 1 bit 7 -> index 0, etc.)
KontrolF1.padMap = [
    { deck: 1, hotcue: 1 },  // pad 1
    { deck: 1, hotcue: 2 },  // pad 2
    { deck: 1, hotcue: 3 },  // pad 3
    { deck: 1, hotcue: 4 },  // pad 4
    { deck: 1, hotcue: 5 },  // pad 5
    { deck: 1, hotcue: 6 },  // pad 6
    { deck: 1, hotcue: 7 },  // pad 7
    { deck: 1, hotcue: 8 },  // pad 8
    { deck: 2, hotcue: 1 },  // pad 9
    { deck: 2, hotcue: 2 },  // pad 10
    { deck: 2, hotcue: 3 },  // pad 11
    { deck: 2, hotcue: 4 },  // pad 12
    { deck: 2, hotcue: 5 },  // pad 13
    { deck: 2, hotcue: 6 },  // pad 14
    { deck: 2, hotcue: 7 },  // pad 15
    { deck: 2, hotcue: 8 }   // pad 16
];

KontrolF1.padColors = [
    [0x7f, 0x7f, 0x00],  // 1 yellow
    [0x7f, 0x00, 0x7f],  // 2 magenta
    [0x00, 0x7f, 0x7f],  // 3 cyan
    [0x00, 0x7f, 0x00],  // 4 green
    [0x7f, 0x00, 0x00],  // 5 red
    [0x00, 0x00, 0x7f],  // 6 blue
    [0x7f, 0x40, 0x00],  // 7 orange
    [0x7f, 0x7f, 0x7f]   // 8 white
];

KontrolF1.groupForPad = function(pad) {
    return "[Channel" + (pad.deck + KontrolF1.deckOffset) + "]";
};

// Convert Mixxx hotcue color (AARRGGBB 32-bit int) to F1 RGB range 0-0x7f.
KontrolF1.colorToRGB = function(color) {
    if (color == undefined || color === 0) return null;
    var r = (color >> 16) & 0xFF;
    var g = (color >> 8) & 0xFF;
    var b = color & 0xFF;
    var scale = 0x7f / 0xFF;
    return [Math.round(r * scale), Math.round(g * scale), Math.round(b * scale)];
};

KontrolF1.setPadLED = function(index) {
    var pad = KontrolF1.padMap[index];
    var group = KontrolF1.groupForPad(pad);
    var enabled = engine.getValue(group, "hotcue_" + pad.hotcue + "_enabled");
    if (enabled) {
        var color = engine.getValue(group, "hotcue_" + pad.hotcue + "_color");
        var rgb = KontrolF1.colorToRGB(color);
        if (rgb == null) {
            rgb = KontrolF1.padColors[index % 8];
        }
        KontrolF1.setPADColor(index + 1, rgb[0], rgb[1], rgb[2]);
    } else {
        KontrolF1.setPADColor(index + 1, 0, 0, 0);
    }
};

KontrolF1.updateAllPadLEDs = function() {
    for (var i = 0; i < 16; i++) {
        KontrolF1.setPadLED(i);
    }
    KontrolF1.updateLEDs();
};

KontrolF1.connectLEDs = function() {
    KontrolF1.disconnectLEDs();
    for (var i = 0; i < 16; i++) {
        var pad = KontrolF1.padMap[i];
        var group = KontrolF1.groupForPad(pad);
        var hotcue = "hotcue_" + pad.hotcue;
        KontrolF1.ledConnections.push(engine.connectControl(group, hotcue + "_enabled", KontrolF1.setLED));
        KontrolF1.ledConnections.push(engine.connectControl(group, hotcue + "_color", KontrolF1.setLED));
    }
};

KontrolF1.disconnectLEDs = function() {
    for (var i = 0; i < KontrolF1.ledConnections.length; i++) {
        KontrolF1.ledConnections[i].disconnect();
    }
    KontrolF1.ledConnections = [];
};

KontrolF1.setLED = function(value, group, key) {
    for (var i = 0; i < 16; i++) {
        var pad = KontrolF1.padMap[i];
        var padGroup = KontrolF1.groupForPad(pad);
        if (padGroup != group) continue;
        var hotcue = "hotcue_" + pad.hotcue;
        if (key == hotcue + "_enabled" || key == hotcue + "_color") {
            KontrolF1.setPadLED(i);
            KontrolF1.updateLEDs();
            return;
        }
    }
};

KontrolF1.init = function(id, debugging) {
    KontrolF1.id = id;
    KontrolF1.initializeHIDController();

    KontrolF1.deckOffset = 0;
    for (var i = 0; i < 16; i++) {
        KontrolF1.padHeld[i] = false;
        KontrolF1.padTriggeredPlay[i] = false;
        KontrolF1.padCaptured[i] = false;
    }
    KontrolF1.prevByte1 = 0;
    KontrolF1.prevByte2 = 0;
    KontrolF1.prevByte3 = 0;

    KontrolF1.resetLEDs();
    KontrolF1.connectLEDs();
    KontrolF1.updateAllPadLEDs();
    KontrolF1.setButtonBrightness("browse", 0x7f);
    KontrolF1.updateLEDs();
    HIDDebug("=== Kontrol F1 Deck Cues Initialized ===");
};

KontrolF1.shutdown = function() {
    KontrolF1.disconnectLEDs();
    KontrolF1.resetLEDs();
    HIDDebug("=== Kontrol F1 Deck Cues Shutdown ===");
};

KontrolF1.incomingData = function(data, length) {
    if (length < 4) return;
    var b1 = data[1];
    var b2 = data[2];
    var b3 = data[3];
    var shiftNow = (b3 & 0x80) !== 0;
    var browseNow = (b3 & 0x08) !== 0;
    var browsePrev = (KontrolF1.prevByte3 & 0x08) !== 0;

    var ledNeedsUpdate = false;

    if (browseNow && !browsePrev) {
        KontrolF1.deckOffset = (KontrolF1.deckOffset === 0) ? 2 : 0;
        HIDDebug("F1 Deck Cues: decks " + (1 + KontrolF1.deckOffset) + " & " + (2 + KontrolF1.deckOffset));
        KontrolF1.disconnectLEDs();
        KontrolF1.connectLEDs();
        KontrolF1.updateAllPadLEDs();
        ledNeedsUpdate = true;
    }

    for (var i = 0; i < 16; i++) {
        var pad = KontrolF1.padMap[i];
        var byteVal = (i < 8) ? b1 : b2;
        var prevByteVal = (i < 8) ? KontrolF1.prevByte1 : KontrolF1.prevByte2;
        var mask = (i < 8) ? (0x80 >> i) : (0x80 >> (i - 8));
        var pressedNow = (byteVal & mask) !== 0;
        var pressedPrev = (prevByteVal & mask) !== 0;
        var group = KontrolF1.groupForPad(pad);
        var hotcuePrefix = "hotcue_" + pad.hotcue;

        if (pressedNow && !pressedPrev) {
            ledNeedsUpdate = true;
            if (shiftNow) {
                HIDDebug("DELETE D" + (pad.deck + KontrolF1.deckOffset) + " HC" + pad.hotcue);
                engine.setValue(group, hotcuePrefix + "_clear", 1);
                KontrolF1.padHeld[i] = false;
                KontrolF1.padTriggeredPlay[i] = false;
            } else {
                var status = engine.getValue(group, hotcuePrefix + "_status");
                if (status === 0) {
                    HIDDebug("SET D" + (pad.deck + KontrolF1.deckOffset) + " HC" + pad.hotcue);
                    engine.setValue(group, hotcuePrefix + "_set", 1);
                    KontrolF1.padHeld[i] = false;
                    KontrolF1.padTriggeredPlay[i] = false;
                } else {
                    HIDDebug("GOTO D" + (pad.deck + KontrolF1.deckOffset) + " HC" + pad.hotcue);
                    engine.setValue(group, hotcuePrefix + "_goto", 1);
                    KontrolF1.padHeld[i] = true;
                    KontrolF1.padTriggeredPlay[i] = false;
                }
            }
        }

        if (pressedNow && KontrolF1.padHeld[i] && !shiftNow) {
            var isPlaying = engine.getValue(group, "play");
            if (!isPlaying && !KontrolF1.padTriggeredPlay[i]) {
                HIDDebug("PLAY D" + (pad.deck + KontrolF1.deckOffset));
                engine.setValue(group, "play", 1);
                KontrolF1.padTriggeredPlay[i] = true;
            }
        }

        // Capture: press Shift while holding a set pad to keep playing on release.
        if (KontrolF1.padHeld[i] && shiftNow) {
            if (!KontrolF1.padCaptured[i]) {
                HIDDebug("CAPTURE D" + (pad.deck + KontrolF1.deckOffset) + " HC" + pad.hotcue);
                KontrolF1.padCaptured[i] = true;
            }
        }

        if (!pressedNow && pressedPrev && KontrolF1.padHeld[i]) {
            ledNeedsUpdate = true;
            KontrolF1.padHeld[i] = false;
            if (KontrolF1.padTriggeredPlay[i] && !KontrolF1.padCaptured[i]) {
                HIDDebug("STOP & CUE D" + (pad.deck + KontrolF1.deckOffset));
                engine.setValue(group, "play", 0);
                engine.setValue(group, hotcuePrefix + "_goto", 1);
            } else if (KontrolF1.padCaptured[i]) {
                HIDDebug("CAPTURED D" + (pad.deck + KontrolF1.deckOffset) + " HC" + pad.hotcue);
            }
            KontrolF1.padTriggeredPlay[i] = false;
            KontrolF1.padCaptured[i] = false;
        }

        if (pressedNow != pressedPrev)
            ledNeedsUpdate = true;
    }

    KontrolF1.prevByte1 = b1;
    KontrolF1.prevByte2 = b2;
    KontrolF1.prevByte3 = b3;

    if (ledNeedsUpdate)
        KontrolF1.updateLEDs();
};

KontrolF1.activeLEDUpdateWrapper = function() {
    // Hotcue LEDs are updated reactively via engine.connectControl.
};
