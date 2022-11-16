const fs = require("fs");
const paths = {
  build: {
    root: "./dist",
    assets: "./dist/assets",
  },
  src: {
    imageAssets: "./src/assets/img",
    jsonAssets: "./src/assets/json",
  },
};

if (!fs.existsSync(paths.build.root)) {
  fs.mkdirSync(paths.build.root);
}

if (!fs.existsSync(paths.build.assets)) {
  const imageAssets = fs.readdirSync(paths.src.imageAssets);
  const jsonAssets = fs.readdirSync(paths.src.jsonAssets);

  fs.mkdirSync(paths.build.assets);
  fs.mkdirSync(`${paths.build.assets}/img`);
  fs.mkdirSync(`${paths.build.assets}/json`);

  for (const asset of imageAssets) {
    fs.copyFileSync(
      `${paths.src.imageAssets}/${asset}`,
      `${paths.build.assets}/img/${asset}`
    );
  }

  for (const asset of jsonAssets) {
    fs.copyFileSync(
      `${paths.src.jsonAssets}/${asset}`,
      `${paths.build.assets}/json/${asset}`
    );
  }
}
