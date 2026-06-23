const lint = (base, ext = "{js,ts,tsx}") => [
  `${base}/**/*.${ext}`,
  (files) => [
    `prettier --write ${files.join(" ")}`,
    `eslint --fix --config ${base}/eslint.config.mjs ${files.join(" ")}`,
  ],
];

export default Object.fromEntries([
  lint("apps/www"),
  lint("packages/next-image-plus"),
  lint("packages/eslint-config", "{js,mjs}"),
]);
