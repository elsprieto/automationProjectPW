
# Automation project PW

- npm install
- npx install playwright

## command Exectuion
- npx playwright test --project=<env>

  env: QA, DEV, STG

- npx playwright test --project=<env> --grep <tag>

  tag: @regression, @visual, @functional, @home

## generate Report

- HTML default report:
    - npx playwright show-report

- ALLURE report:
    - allure generate allure-reports -o allure-report --clean