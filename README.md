# Olive Helps: Whisper Style Comparisons

Comparing four different styles of how to create whispers

After discussion with team, it's been decided:

- Updateable whisper?
  - Class style (see UpdateableClassWhisper.ts)
- Non-updateable whisper?
  - Export default style (see ExportDefaultWhisper.ts)

## Requirements

You will need to install [Olive Helps](https://oliveai.com/olive-helps/).

Install [Node.js](https://nodejs.org/), clone this repo, and install the project dependencies with:

```shell
npm install
```

Then compile and package the project with:

```shell
npm run build
```

## Other Commands

```shell
# ESLint and Prettier
npm run lint          # Check for issues
npm run lint:fix      # Fix all auto-fixable issues

# Jest
npm run test          # Run unit tests
npm run test:coverage # Run unit tests with coverage report
```
