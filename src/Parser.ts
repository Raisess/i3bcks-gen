export type Block = {
  name: string;
  label?: string;
  align?: string;
  color?: string;
  fullText?: string;
  shortText?: string;
  instance?: string;
  interval?: number | "once" | "persist" | "repeat";
  minWidth?: string;
  separator?: boolean;
  separatorBlockWidth?: number;
  signal?: number;
  urgent?: string;
  command?: string | (() => void);
  evalType?: "node" | "shell";
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
        if (key !== "name" && key !== "command" && key !== "evalType") {
          parsedBlock += this.parseField(key, value);
        } else if (key === "command") {
          if (block.evalType === "shell") {
            parsedBlock += this.parseField(key, value);
          } else if (block.evalType === "node") {
            const evaluation: string = (value as () => void)
              .toString()
              .split(/\n/)
              .map((item: string): string => item.trim())
              .join("");

            parsedBlock += this.parseField(key, `node -e '(${evaluation})();'`);
          }
        }
      }

      parsedBlocks += parsedBlock + "\n\n";
    }

    return parsedBlocks;
  }

  private parseField(key: string, value: unknown): string {
    return `\n${key.replace(
      /[A-Z]/g,
      (letter: string): string => "_" + letter.toLowerCase()
    )}=${value}`;
  }
}
