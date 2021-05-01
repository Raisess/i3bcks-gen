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
    evalType: "node",
    command: (): void => {
      const { execSync } = require("child_process");

      const currency = execSync("curl -sS http://brl.rate.sx/1USD")
        .toString();

      console.log(parseFloat(currency).toFixed(2));
    },
  },
]);
