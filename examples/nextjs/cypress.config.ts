import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, _config) {
      on("before:browser:launch", (browser: any = {}, launchOptions) => {
        if (browser.family === "chrome" || browser.name === "chromium") {
          launchOptions.args.push("--force-device-scale-factor=2");
          launchOptions.args.push("--high-dpi-support=2");
        }
        return launchOptions;
      });
    },
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    //   on("task", {
    //     log(message) {
    //       console.log(message);

    //       return null;
    //     },
    //     table(message) {
    //       console.table(message);

    //       return null;
    //     },
    //   });
    // },
    specPattern: "**/*.test.{js,jsx,ts,tsx}",
  },
});
