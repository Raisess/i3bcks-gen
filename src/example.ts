import I3BlocksGenerator from "./main";

I3BlocksGenerator.generate([
  {
    name: "weather",
    label: "⛅️  ",
    command: "curl -Ss 'https://wttr.in/barro-ceara?0&T&Q' | cut -c 16- | head -3 | xargs echo",
    interval: 3600,
    evalType: "shell",
  },
  {
    name: "currency",
    label: "💸  ",
    interval: 3600,
  },
]);
