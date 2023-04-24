# Current Status

It's broken to some error in build process. I was not in my checklist to check build as it was just compressed JS files, but after updating everything to latest version something went wrong. I regret the problem you faced, it might take upto 7 days to publish fixed version. It will be 1.8.2

Meanwhile you can load this [unpacked version](https://github.com/mukuljainx/Mokku/blob/master/mokku-1.8.2.zip)

# Mokku

> Mock API calls seamlessly

![small-promo](./docs/store/small-promo.png)

[Chrome Web Store](https://chrome.google.com/webstore/detail/mokku-mock-api-calls-seam/llflfcikklhgamfmnjkgpdadpmdplmji?hl=en&authuser=1) | [MS Edge Add on](https://microsoftedge.microsoft.com/addons/detail/mokku-mock-api-calls-sea/ekcbmjnnnphonejedibidifflhljbobc)

<a href="https://www.buymeacoffee.com/mukuljainx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

### About

Mokku helps user by mocking API and changing their response, response time and status, user can try all test case scenario like long loading time, error states, or any missing or incorrect data.

Mokku adds itself as a tab in dev tools as a panel. In the tab user can see network logs and mocks. Any network call from the logs can be mocked by simply clicking mock button then response can be edited. User can also search logs. Mock can also be created from scratch from create mock button.

All URL's are accessible but Mokku doesn't inject scripts into any pages apart from which are served locally and accessed using 'http://localhost\*' until enabled from the Panel.

Collections & Dynamic mock generators coming soon!

You can submit issues, bugs or feature request at https://github.com/mukuljainx/mokku/issues

This extension is development phase, might not work in some kind of response like md files.

[Promotional Images](https://github.com/mukuljainx/Mokku/tree/master/docs/store)

### Features

1. Mock API call, specify JSON body, status, time delay and even headers 🙌.
2. **Wild Card:** add `(.*)` as wild card in url which will match anything, for example: `some-domain/user/(.*)/messages`. This will match `some-domain/user/u1/messages` and `some-domain/user/u2/messages` too.

### GraphQL

Mokku doesn't support GraphQL as of now.

### Privacy policy

Mokku does not collect or ask for any personal information, though it will store the mocks the chrome local store & all the hosts name where it has been enabled once to provide better experience to user.

## Dev Guide

### Prerequisites

- [node + npm](https://nodejs.org/) (Current Version)

### Project Structure

- dist: Chrome Extension directory
- dist/js: Generated JavaScript files

### Setup

`npm install`

### Dev

`npm run watch`

### Build

`npm run build`

### Load extension to chrome

Load `dist` directory. All the files are refreshed without extension reload except content script. Reload the extension to see the changes.

### Built on

[Chitbat Chrome extension starter kit](https://github.com/chibat/chrome-extension-typescript-starter)

<a style="margin-left: 16px" href="https://www.buymeacoffee.com/mukuljainx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 52px !important;" ></a>
