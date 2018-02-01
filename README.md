# TidalCycles plugin for Atom

[TidalCycles](https://tidalcycles.org) is a live-coding pattern language

For installation instructions, please visit:
  http://tidalcycles.org/getting_started.html

Then, you can:
  * Open a `.tidal` file

  * `shift+enter` to evaluate the current line or selection

  * `cmd+enter` to evaluate multiple-lines or selection

To send patterns to [SuperDirt](https://github.com/musikinformatik/SuperDirt), use `d1` .. `d9`, e.g.:

````
d1 $ sound "bd cp"
````

To send patterns to [classic dirt](https://github.com/tidalcycles/dirt), use `c1` .. `c9`, e.g.:

````
c1 $ sound "bd cp"
````

# Configurable Boot Options

By default, Atom will use a default Tidal bootup sequence that doesn't really do
anything special other than create the `d1..d9` and `c1..c9` Dirt connections.

If you'd like to provide a path to your own custom boot file on your computer, use
the *Boot Tidal Path* setting to do so.

Further, if you'd like Atom to locate a `BootTidal.hs` file in the current directory,
check the *Use Boot File In Current Directory* option.

Boot file order of precedence:

1. Current directory `BootTidal.hs`
2. Custom Boot Tidal Path
3. Default bootup provided by the package

## Sample Default Boot File

If you create your own boot file, you may start with the default:

```
:set -XOverloadedStrings
:set prompt ""
:module Sound.Tidal.Context

(cps, nudger, getNow) <- cpsUtils'

(d1,t1) <- superDirtSetters getNow
(d2,t2) <- superDirtSetters getNow
(d3,t3) <- superDirtSetters getNow
(d4,t4) <- superDirtSetters getNow
(d5,t5) <- superDirtSetters getNow
(d6,t6) <- superDirtSetters getNow
(d7,t7) <- superDirtSetters getNow
(d8,t8) <- superDirtSetters getNow
(d9,t9) <- superDirtSetters getNow


let bps x = cps (x/2)
let hush = mapM_ ($ silence) [d1,d2,d3,d4,d5,d6,d7,d8,d9]
let solo = (>>) hush

:set prompt "tidal> "
```

# Contributing

If you'd like to contribute to this package, here are some guidelines:

## JavaScript Formatting

A `.jsbeautifyfc` file is used to define JavaScript formatting settings. Please use
a beautifier package (we recommend `atom-beautify`) to format your changes with
these settings.
