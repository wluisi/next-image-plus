# Releasing `next-image-plus`

Follow these steps to publish a new version of the `next-image-plus` package.

## Steps

- bump **next-image-plus** `package.json` to the next version, i.e, `1.0.0`
- push changes to github `main` branch.
- **github:** create a new release and tag, i.e, `v1.0.0`
- **npm:** run a fresh build `npm run next-image-plus:build`
- **npm:** publish with beta tag `npm publish --workspace=packages/next-image-plus`
- **npm:** set new version to latest `npm dist-tag add next-image-plus@1.0.0 latest`
