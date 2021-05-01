import Parser, { Block } from "./Parser";
import FileGenarator from "./FileGenerator";

export default class I3BlocksGenerator {
  public static generate(blocks: Array<Block>): void {
    const config: string = new Parser(blocks)
      .parse();

    FileGenarator.generate(config)
  }
}

