export function currency(): void {
  const { execSync } = require("child_process");

  const currency = execSync("curl -sS http://brl.rate.sx/1USD")
    .toString();

  console.log(parseFloat(currency).toFixed(2));
}
