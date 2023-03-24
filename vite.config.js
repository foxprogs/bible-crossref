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

// const fileName = {
//   cjs: `${getPackageName()}.cjs`,
//   es: `${getPackageName()}.js`,
// };

// const formats = Object.keys(fileName);

export default defineConfig({
  base: "./",
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: getPackageNameCamelCase(),
      // formats,
      fileName: getPackageName(),
    },
  },
});
