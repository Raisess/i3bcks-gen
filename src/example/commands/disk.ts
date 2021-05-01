export function disk(): void {
  const { execSync } = require("child_process");

  const df = execSync("df -h /");
  const data = df.toString()
    .split(/\n/)[1]
    .split(" ")
    .slice(2, 8)
    .filter((item: string): boolean => item !== "");

  console.log(`${data[2].trim()} / ${data[0].trim()}`);
}

