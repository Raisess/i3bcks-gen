import I3BlocksGenerator from "../main";

import { currency } from "./commands/currency";
import { disk } from "./commands/disk";

I3BlocksGenerator.createConfig([
  {
    name: "weather",
    label: "⛅️  ",
    interval: 3600,
    evalType: "shell",
    command: "curl -Ss 'https://wttr.in/barro-ceara?0&T&Q' | cut -c 16- | head -3 | xargs echo",
    color: "#83a598",
  },
  {
    name: "currency",
    label: "💸  ",
    interval: 3600,
    evalType: "node",
    command: currency,
    color: "#8ec07c",
  },
  {
    name: "volume",
    label: "🎧  ",
    instance: "Master",
    color: "#fe8019",
    interval: "once",
    signal: 10,
  },
  {
    name: "memory",
    label: "🐏  ",
    separator: true,
    color: "#d3869b",
    interval: 30,
  },
  {
    name: "disk",
    label: "💾  ",
    evalType: "node",
    command: disk,
    color: "#fb4934",
    interval: 30,
  },
  {
    name: "iface",
    label: "📡  ",
    color: "#8ec07c",
    interval: 10,
    separator: true,
  },
  {
    name: "battery",
    label: "⚡  ",
    color: "#fabd2f",
    interval: 30,
  },
  {
    name: "time",
    label: "📅  ",
    evalType: "shell",
    command: "date '+%Y-%m-%d %H:%M:%S'",
    color: "#83a598",
    interval: 5,
  },
]);

I3BlocksGenerator.setConfig();

