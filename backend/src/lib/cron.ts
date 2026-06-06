import { CronJob } from "cron";
import { getEnv } from "./env";

const env = getEnv();

const serverJob = new CronJob("*/14 * * * *", function () {
  const base = env.FRONTEND_URL;

  if (!base) return;

  const url = new URL("/health", base).href;
  const frontend = url.startsWith("https:") ? https : http;

  frontend
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default serverJob;
