# Traktor Kontrol F1 — Mixxx Mappings

HID controller mappings for the Native Instruments Traktor Kontrol F1,
for Mixxx (Flatpak on Fedora). This folder is the master copy — keep only
the latest build here (K3-fixed version, verified identical to the files
Mixxx actually runs).

## What's here

| File | Role |
|---|---|
| `Traktor Kontrol F1 - Deck Cues.hid.xml` + `Traktor-Kontrol-F1-DeckCues-scripts.js` | **Custom "Deck Cues" mapping** (the one in use) |
| `Traktor Kontrol F1.hid.xml` + `Traktor-Kontrol-F1-scripts.js` | Stock Mixxx mapping (Ilkka Tuohela, 2012) — reference/fallback |
| `common-hid-packet-parser.js` | Mixxx HID library, required by both mappings |
| `session-archive/` | Saved chat dump of the original mapping session (history only) |

## Deck Cues layout

- Pads 1–8 → deck N hotcues 1–8
- Pads 9–16 → deck N+1 hotcues 1–8
- **Browse** → toggle deck pairs (1&2 ↔ 3&4)
- Tap an empty pad → **set** hotcue
- Hold a set pad → play from that cue; release → **stop and return** to cue
  (cue-preview style)
- **While holding a playing pad, press Shift** → "capture": on release the
  track **keeps playing** instead of stopping/returning
- **Shift + pad** (Shift held before the pad) → **delete** hotcue

## Install / reinstall

Mixxx is the Flatpak, so the user controller directory is:

```
~/.var/app/org.mixxx.Mixxx/.mixxx/controllers/
```

Copy the three Deck Cues files + `common-hid-packet-parser.js` there
(they are already present and identical as of 2026-08-08), then in Mixxx:
Preferences → Controllers → Traktor Kontrol F1 → select the
"Deck Cues" preset. Only one F1 preset should be enabled at a time.

## Roadmap / ideas for the next session

- The F1's **4 knobs + 4 faders** are currently unmapped — candidates:
  filter/FX per deck, gain, or library browse/zoom.
- Rethink the 16-pad grid: **8 hotcues + 8 sampler slots for one deck**
  (instead of 16 cues across two decks). Open questions when resuming:
  how Browse/deck-toggle interacts with a single-deck layout, and whether
  sample pads should mirror Mixxx's sampler banks.
- Other unmapped buttons (Sync, Quant, Capture, Reverse, Type, Size) are
  available for modifier or direct duties.

## Notes

- F1 USB IDs: vendor `0x17cc`, product `0x1120` (HID protocol).
- The `F1-Context-Handoff.pdf` from the K2.7 session was lost in the
  2026-08 archive cleanup; the session HTML in `session-archive/` is the
  surviving record.
