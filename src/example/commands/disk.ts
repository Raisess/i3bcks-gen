export function disk(): string {
  const { execSync } = require("child_process");

  const df: Buffer = execSync("df -h /");
  const data: Array<string> = df
    .toString()
    .split(/\n/)[1]
    .split(" ")
    .slice(2, 8)
    .filter((item: string): boolean => item !== "");

  return `${data[2].trim()} / ${data[0].trim()}`;
}
