import { resolve } from "path";
import { writeFileSync } from "fs";

export default class FileGenarator {
  public static generate(content: string): void {
    const path: string = resolve(__dirname, "../config");

    writeFileSync(path, content);
  }
}

