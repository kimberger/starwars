### Running the Application

This application uses Node Version Manager (nvm),
please see https://github.com/nvm-sh/nvm for information
on installing and using nvm.

- `nvm use`
- `yarn install` or `npm install`
- `yarn start` or `npm start`

### Running Tests

- `yarn test` or `npm test`

### Bundle analysis

- `yarn build` or `npm build`
- `yarn analyze` or `npm analyze`

### Considerations

- Caching of character and film requests
- Lower level testing at ui/component level
- Add error handling
- Isolate axios usage to make it easier to replace the library in future
- Implement code splitting
- Change http calls to https before making request so that it works on secure sites
