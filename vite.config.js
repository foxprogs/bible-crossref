import { resolve } from 'path'
import { defineConfig } from 'vite'
import packageJson from "./package.json";

const getPackageName = () => {
  return packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, char => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: getPackageNameCamelCase(),
      fileName: getPackageName(),
    },
  },
});
