import { readFile, writeFile } from "fs/promises";
import { z } from "zod";
import { registryEntrySchema } from "./schema";
import { glob } from "glob";

console.log("Building registry...");

const registry: z.infer<typeof registryEntrySchema> = {
  name: "AutoForm",
  type: "registry:ui",
  registryDependencies: [
    "alert",
    "button",
    "calendar",
    "card",
    "checkbox",
    "form",
    "input",
    "label",
    "select",
    "skeleton",
    "switch",
    "textarea",
    "toggle",
  ],
  dependencies: ["zod", "@autoform/react"],
  devDependencies: [],
  tailwind: {
    config: {},
  },
  cssVars: {},
  files: [],
};

const files = await glob(`./src/components/ui/autoform/**/*`, { nodir: true });
for (const file of files) {
  const content = await readFile(file, "utf-8");
  registry.files!.push({
    path: file.replace("src/components/ui/", ""),
    target: file.replace("src/", ""),
    content,
    type: "registry:ui",
  });
}

await writeFile("./registry/autoform.json", JSON.stringify(registry, null, 2));

console.log("Registry built!");
