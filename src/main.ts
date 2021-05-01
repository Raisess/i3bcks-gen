import { exec } from "child_process";
import { resolve } from "path";

import Parser, { Block } from "./Parser";
import FileGenarator from "./FileGenerator";

export default class I3BlocksGenerator {
  public static createConfig(blocks: Array<Block>): void {
    const config: string = new Parser(blocks).parse();

    FileGenarator.generate(config);
  }

  public static setConfig(): void {
    const path: string = resolve(__dirname, "../config");

    exec(`cp ${path} ~/.config/i3blocks/config`);
    exec("i3-msg restart");
  }
}

