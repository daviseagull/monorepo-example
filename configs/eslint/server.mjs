import globals from "globals";
import { baseConfig } from "./base.mjs";

export const serverConfig = [
  ...baseConfig,
  { languageOptions: { globals: { ...globals.node } } },
];
