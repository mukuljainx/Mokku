Hi there 👋

# Setup

1. First things first, fork the repo
2. Clone your fork
3. `cd Mokku`
4. `npm i`
5. `npm run watch` 🚀
6. `npm run watch:example` (In another terminal tab, pretty please!)


`npm run watch` -> Watches over the extensions files and builds them.

`npm run watch:example` -> Runs a simple node server with basic API calls to test the extensions at http://localhost:8080

### Load extension to chrome

1. Go to extensions page
2. Load unpacked
3. Load dist directory.

**Important**
> All the files are refreshed without extension reload except content script. Reload the extension to see the changes.

# How to debug Content script and inject script

They loads as JS files on Mokku enabled pages (any localhost by default). You can use consoles and debugger there as do for any app.


# How to debug Panel

We have devtools for devtools in chrome 🤯 and even devtools for it too, it is basically recursion!

You can access the devtools for any devtool tab by following this https://stackoverflow.com/questions/12291138/how-do-you-inspect-the-web-inspector-in-chrome
Now all the `console.log` and `debugger` can be accessed from the devtools.

## Steps for Mokku

1. Open any url (which has API's)
2. Open devtools attached in the window
3. Open Mokku tab (panel)
4. de-attach the devtool
5. `cmd` + `option` + `i`


If you will de-attach before opening the Mokku panel it will not work!

**Why:**
1.https://github.com/mukuljainx/Mokku/issues/24
2.https://github.com/mukuljainx/Mokku/issues/67

Though this will be fixed in V2
