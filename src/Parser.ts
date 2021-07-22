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
  private parsedBlocks: Array<string> = [
    "command=/usr/share/i3blocks/$BLOCK_NAME\nseparator_block_width=20\nmarkup=none\n\n",
  ];

  constructor(private blocks: Array<Block>) {}

  public parse(): string {
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
            const expression: string = this.functionToString(
              value as () => unknown
            );

            parsedBlock += this.parseField(
              key,
              this.evaluateExpression(expression)
            );
          }
        }
      }

      this.parsedBlocks.push(parsedBlock);
    }

    // Need to add a blank space a the end of generated file,
    // if don't, the last block just doesn't work.
    this.parsedBlocks.push(" ");

    return this.parsedBlocks.join("\n\n");
  }

  private parseField(key: string, value: unknown): string {
    return `\n${key.replace(
      /[A-Z]/g,
      (letter: string): string => "_" + letter.toLowerCase()
    )}=${value}`;
  }

  private functionToString(funct: () => unknown): string {
    const expression: string = funct
      .toString()
      .split(/\n/)
      .map((item: string): string => item.trim())
      .join("");

    return expression;
  }

  private evaluateExpression(expression: string): string {
    return `node -e 'console.log((${expression})());'`;
  }
}
