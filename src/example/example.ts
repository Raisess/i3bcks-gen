import I3BlocksGenerator from "../main";

import { currency } from "./commands/currency";

I3BlocksGenerator.createConfig([
  {
    name: "weather",
    label: "⛅️  ",
    interval: 3600,
    evalType: "shell",
    command: "curl -Ss 'https://wttr.in/barro-ceara?0&T&Q' | cut -c 16- | head -3 | xargs echo",
  },
  {
    name: "currency",
    label: "💸  ",
    interval: 3600,
    evalType: "node",
    command: currency,
  },
]);

I3BlocksGenerator.setConfig();

