import { readFile, writeFile } from "fs/promises";
import { z } from "zod";
import { registryEntrySchema } from "./schema";
import { glob } from "glob";

console.log("Building registry...");

const registry: z.infer<typeof registryEntrySchema> = {
  name: "AutoForm",
  type: "registry:ui",
  registryDependencies: [
    "accordion",
    "button",
    "calendar",
    "card",
    "checkbox",
    "form",
    "input",
    "label",
    "popover",
    "radio-group",
    "select",
    "separator",
    "switch",
    "textarea",
    "tooltip",
    "toggle",
  ],
  dependencies: [],
  devDependencies: [],
  tailwind: {
    config: {},
  },
  cssVars: {},
  // meta: {
  //   importSpecifier: "AutoForm",
  //   moduleSpecifier: "@/components/auto-form",
  // },
  files: [],
};

const srcRegistry = structuredClone(registry);

const files = await glob(`./src/components/ui/auto-form/**/*`, { nodir: true });
for (const file of files) {
  const content = await readFile(file, "utf-8");
  registry.files!.push({
    path: file.replace("src/components/ui/auto-form/", ""),
    target: file.replace("src/", ""),
    content,
    type: "registry:ui",
  });
  srcRegistry.files!.push({
    path: file.replace("src/components/ui/auto-form/", ""),
    target: file,
    content,
    type: "registry:ui",
  });
}

await writeFile("./registry/auto-form.json", JSON.stringify(registry, null, 2));
await writeFile(
  "./registry/auto-form-src.json",
  JSON.stringify(srcRegistry, null, 2)
);

console.log("Registry built!");
