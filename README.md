# Range-collection app

## For development 👨‍💻
* Recommendations:
    * Turn on TSLint and point to configuration `./tsconfig.json` for consistent code style
    * Use `yarn` as package manager
    * Use node `v10.15.0` and up

1) Install globally TypeScript and nodemon (`yarn global add typescript nodemon`)
2) Install deps using `yarn`
3) Run `yarn watch`

## For testing 👨‍🔬
1) Install deps using `yarn` (if not installed before)
2) Run `yarn test`

## For production 🏁
1) Install deps using `yarn` (if not installed before)
2) Build app using `yarn build`
3) Run `node build/Index.js`
