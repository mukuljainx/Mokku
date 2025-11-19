# 🚀 Mokku: Mock API Calls Seamlessly

> **Mokku** helps you by mocking API calls and changing their response, response time, and status. Easily test all your use cases like long loading times, error states, or missing/incorrect data.

![Mokku Small Promo Banner](https://raw.githubusercontent.com/mukuljainx/mokku/master/docs/store/small-promo.png)

---

## 🔗 Get the Extension

| Store                | Link                                                                                                                                 |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Chrome Web Store** | [Install Now](https://chrome.google.com/webstore/detail/mokku-mock-api-calls-seam/llflfcikklhgamfmnjkgpdadpmdplmji?hl=en&authuser=1) |

---

## ✨ Features

Mokku adds itself as a tab in your **Dev Tools panel**. From there, you can see network logs, manage mocks, and much more.

### 1. Mock API Calls

- **Specify** JSON body, HTTP status, time delay, and headers.
- **GraphQL Support:** Supports mocking GraphQL queries and mutations.
- **Dynamic Response Mocking:** Write **JavaScript functions** to return complex, conditional responses.
- **Dynamic URL Support:** Use patterns like `goals/:goalId`. The URL parameters are available for your dynamic response function.
- **VSCode Editor** Added Monaco editor, the VSCode editor for editing response and functions

We Uses [path-to-regexp v8.2.0](https://www.npmjs.com/package/path-to-regexp/v/8.2.0) for dynamic url matching.

### 2. Modify Headers

- Easily modify request headers—globally for all requests or specifically for individual URLs.

### 3. Projects

- Group and organize your mocks and headers by **Project** for simplified management.

### 4. Import / Export

- Keep your mocks & headers by exporting by project basis and import them back as well.

---

## ⚙️ How it Works & Privacy

- Mokku operates within the Dev Tools panel, showing network logs and enabling mocking.
- Any network call from the logs can be mocked with a simple click, or you can create a mock from scratch.
- **Access/Injection:** All URLs are accessible, but Mokku _does not_ inject scripts into any page _apart from_ those served locally (`http://localhost*`) until manually enabled from the Panel.

### 🔒 Privacy Policy

Mokku is committed to user privacy:

- It **does not collect or ask for any personal information**.
- Mocks are stored securely in the **Chrome local store**.

---

## 🙏 Support Us

Developing and maintaining Mokku is a significant effort! Please consider supporting the extension if it helps your workflow.

<a href="https://paypal.me/mukuljainx" title="Support Mokku using Paypal" target="_blank"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-150px.png" border="0" alt="PayPal Logo"></a>

<a href="https://www.buymeacoffee.com/mukuljainx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

**Alternatively, use UPI:** `811721108` (This is a UPI number, not a mobile number).

---

## Bugs / Request a Features 🐞

Please use https://github.com/mukuljainx/Mokku/issues to report any bug or feature request.

---

## 💻 Developer Guide

### Prerequisites

- [node + npm](https://nodejs.org/) (Current Version)

### Project Structure

| Directory | Description                           |
| :-------- | :------------------------------------ |
| `dist`    | The final Chrome Extension directory. |
| `dist/js` | Generated JavaScript files.           |

### Setup

```bash
npm install
```
