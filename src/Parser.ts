export type Block = {
  name: string;
  label?: string;
  align?: string;
  color?: string;
  command?: string;
  fullText?: string;
  shortText?: string;
  instance?: string;
  interval?: number | "once" | "persist" | "repeat";
  minWidth?: string;
  separator?: boolean;
  separatorBlockWidth?: number;
  signal?: number;
  urgent?: string;
};

export default class Parser {
  constructor(private blocks: Array<Block>) {}

  public parse(): string {
    let parsedBlocks: string =
      "command=/usr/share/i3blocks/$BLOCK_NAME\nseparator_block_width=15\nmarkup=none\n\n";

    for (const block of this.blocks) {
      let parsedBlock: string = `[${block.name}]`;

      const blockEntries: Array<[string, unknown]> = Object.entries(block);

      for (const [key, value] of blockEntries) {
        if (key !== "name") {
          parsedBlock += `\n${key.replace(
            /[A-Z]/g,
            (letter: string): string => "_" + letter.toLowerCase()
          )}=${value}`;
        }
      }

      parsedBlocks += parsedBlock + "\n\n";
    }

    return parsedBlocks;
  }
}
