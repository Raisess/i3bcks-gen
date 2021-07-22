export function currency(): string {
  const { execSync } = require("child_process");

  const currency: string = execSync(
    "curl -sS http://brl.rate.sx/1USD"
  ).toString();

  return parseFloat(currency).toFixed(2);
}
