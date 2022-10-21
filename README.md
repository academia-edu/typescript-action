# typescript-action
> Typescript compiler [action](https://github.com/features/actions)

Compile your Typescript code and check for errors.

Forked from: https://github.com/iCrawl/action-tsc

## Usage

`.github/workflows/tsc.yml`
```yml
on:
  push:
  pull_request:

jobs:
  tsc:
    name: tsc
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: actions/setup-node@v1
      with:
        node-version: '16.14.2'
    - name: yarn install
      run: yarn install
    - name: tsc
      uses: academia-edu/typescript-action@v2
```

### Passing command-line parameters to `tsc`

You can pass the `--project` parameter to `tsc` if your `tsconfig.json` is not in the root of your project:

```yml
    - name: tsc compile
      uses: academia-edu/typescript-action@v2
      with:
        project: subdirectorywith_tsconfig
```

## Author

**action-tsc** © [iCrawl](https://github.com/iCrawl)  
Authored and maintained by iCrawl.

> GitHub [@iCrawl](https://github.com/iCrawl) · Twitter [@iCrawlToGo](https://twitter.com/iCrawlToGo)
