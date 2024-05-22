function createBanner() {
  const banner = document.createElement("div");

  banner.innerHTML = `
  <div style="align-items: center;width: 350px;height: fit-content;padding: 10px;background-color: #fff;border: 1px solid #ccc; border-radius: 7px;box-shadow: 1px 1px 5px #e1e1e1;transform: scale(1.15);">
    <a
      id="chatplayground-banner"
      style="display: flex; color: #222;"
      href="https://www.chatplayground.ai/mokku"
      target="_blank"
    >
      <div>
        <img src="https://app.chatplayground.ai/icon.png" style="width: 40px;height: 40px;margin-right: 10px;" />
      </div>

      <div>
        <p style="margin: 0; font-size: 0.8rem;font-weight: 800;">ChatPlayground.ai</p>
        <p style="margin: 0;color: #555;">
        Achieve Better AI Answers 73% of the Time with Multiple AI Chatbots
          <span style="color: rgb(50, 104, 206);margin-left: 5px;text-decoration: underline;">Get Started</span>
        </p>
      </div>
      </a>
      <div>
      <p style="margin-bottom:0">Ad powered by <a href="https://chromewebstore.google.com/detail/mokku/llflfcikklhgamfmnjkgpdadpmdplmji?hl=en" target="_blank">Mokku</a>, Learn more about the ad <a href="https://github.com/mukuljainx/Mokku/discussions/127#discussion-6709120" target="_blank">here</a></p>
      </div>
      </div>
  `;

  // Append the banner to the body
  if (document.querySelector(".kp-wholepage.kp-wholepage-osrp.HSryR.EyBRub")) {
    banner.style.marginBottom = "1.5rem";
    return document
      .querySelector(".kp-wholepage.kp-wholepage-osrp.HSryR.EyBRub")
      .prepend(banner);
  }

  if (document.querySelector(".TzHB6b.Hwkikb.WY0eLb.LMRCfc.EqrSYc")) {
    banner.style.marginBottom = "1.5rem";
    return document
      .querySelector(".TzHB6b.Hwkikb.WY0eLb.LMRCfc.EqrSYc")
      .prepend(banner);
  }

  if (document.querySelector(".osrp-blk")) {
    banner.style.marginBottom = "1.5rem";
    banner.style.display = "flex";
    banner.style.justifyContent = "center";

    return document.querySelector(".osrp-blk").prepend(banner);
  }

  if (document.querySelector(".TQc1id.k5T88b"))
    return document.querySelector(".TQc1id.k5T88b").appendChild(banner);

  if (document.querySelector(".GyAeWb")) {
    banner.style.marginTop = "1rem";
    return document.querySelector(".GyAeWb").appendChild(banner);
  }
}

createBanner();
