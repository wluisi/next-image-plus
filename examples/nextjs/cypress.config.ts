import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, _config) {
      require("cypress-terminal-report/src/installLogsPrinter")(on, {
        printLogsToConsole: "always",
      });

      // @todo im not sure if this actually does anything ?
      on("before:browser:launch", (browser: any = {}, launchOptions) => {
        if (browser.family === "chrome" || browser.name === "chromium") {
          launchOptions.args.push("--force-device-scale-factor=2");
          launchOptions.args.push("--high-dpi-support=2");
        }
        return launchOptions;
      });
    },
    specPattern: "**/*.test.{js,jsx,ts,tsx}",
  },
});
