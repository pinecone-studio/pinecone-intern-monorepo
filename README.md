<p align="center">
  <h1>✨ Welcome to Pinecone Intern Monorepo ✨</h1>
</p>

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Pinecone Studio](https://img.shields.io/badge/Owned%20by-Pinecone%20Academy-green)](https://pinecone.mn)
[![Node.js](https://img.shields.io/badge/Node.js-v18.0-green.svg)](https://nodejs.org/)
[![Monorepo](https://img.shields.io/badge/Monorepo-Yes-blueviolet)](https://en.wikipedia.org/wiki/Monorepo)
[![Unit Testing](https://img.shields.io/badge/Unit%20Testing-Yes-brightgreen)](#)
[![End to End Testing](https://img.shields.io/badge/End%20to%20End%20Testing-Yes-brightgreen)](#)
[![ESLint](https://img.shields.io/badge/ESLint-Yes-brightgreen)](#)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-Yes-brightgreen)](#)

## ✨Prequel ✨

🎉 Welcome aboard, new Pineconers! 🌟 Your software engineering adventure begins here at Pinecone Academy, where innovation meets passion! 💻 We're thrilled that you've chosen to kickstart your journey with us and are ready to dive into a world of endless possibilities! 🚀 Get ready to soar, explore, and conquer the digital realm with us, Pineconers cheering you on every step of the way! 🌲💪

## 📚 Documentations 🌟

- [Monorepo](#monorepo) 🏗️
- [ESLINT](#eslint) 🛠️
- [Unit Testing](#unit-testing) 🧪
- [End to End (E2E) Testing](#e2e-testing) 🌐
- [Pre-Commit](#pre-commit) 📝
- [Pull Request Actions](#pull-request-actions) 🚀
- [Monorepo Workflow](#monorepo-workflow) 🔄

## Monorepo 

A Monorepo (short for "monolithic repository") is a version control system where multiple projects are stored within a single repository. This includes standalone projects as well as those sharing common codebases. Tech giants like Google, Facebook, and Microsoft widely employ Monorepos.


- **Improved Code Sharing and Reusability:** Share code libraries and components across projects, promoting consistency and reducing redundancy.
- **Simplified Dependency Management:** Centralize dependencies to avoid version conflicts and streamline management.
- **Enhanced Collaboration:** Facilitate collaboration between teams working on different projects within the Monorepo.
- **Global Visibility:** Gain a comprehensive view of the codebase for better refactoring and optimization.


### Useful Links 🌟

- [Nx Documentation](https://nx.dev/getting-started/intro) 📘
- [Monorepo vs Multi-Repo: A Comparison](https://kinsta.com/blog/monorepo-vs-multi-repo/) 🔄
- [ThoughtWorks Insights on Monorepo vs Multirepo](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/monorepo-vs-multirepo) 🌐

## ESLint

ESLint is a popular JavaScript linting tool used to enforce coding standards and identify problematic patterns in code. It helps maintain consistency, improve code quality, and catch errors early in the development process.


- **Code Consistency:** Ensure consistent code style across your project, making it easier to read and maintain.
- **Error Detection:** Catch common errors and potential bugs in your code before they cause issues in production.
- **Customizable Rules:** Tailor ESLint's rules to match your project's specific coding standards and best practices.
- **Integration with Editors:** Seamlessly integrate ESLint with code editors to receive real-time feedback and suggestions.


### Useful Links 🌟

- [ESLint Documentation](https://eslint.org/docs/user-guide/getting-started) 📘
- [ESLint Rules](https://eslint.org/docs/rules/) 📜
- [Integrating ESLint with VSCode](https://eslint.org/docs/user-guide/integrations#visual-studio-code) ⚙️

## Unit-Testing

Jest is a powerful JavaScript testing framework designed for simplicity and flexibility. It is commonly used for unit testing to ensure the correctness of individual units or components of code.


- **Automated Testing:** Write automated tests to verify the functionality of your code, reducing manual testing efforts.
- **Mocking Support:** Easily mock dependencies and external services for isolated testing of components.
- **Snapshot Testing:** Capture snapshots of components to detect unexpected changes and regressions.
- **Code Coverage Reporting:** Generate code coverage reports to track the percentage of code covered by tests.

### Useful Links 🌟

- [Jest Documentation](https://jestjs.io/docs/getting-started) 📘
- [Jest Matchers](https://jestjs.io/docs/expect) 🎯
- [Mocking Dependencies with Jest](https://jestjs.io/docs/es6-class-mocks) 🤖
- [Unit Testing Best Practices](https://www.freecodecamp.org/news/unit-testing-best-practices-with-examples/) 🔍
- [Mocking Best Practices](https://jestjs.io/docs/en/manual-mocks) 🎭

## E2E-Testing

Cypress is a modern JavaScript-based end-to-end testing framework that allows you to simulate user interactions and test your application's functionality across multiple layers.

- **Realistic User Scenarios:** Mimic real user interactions with your application, including form submissions, clicks, and navigation.
- **Browser Support:** Test your application in various browsers to ensure cross-browser compatibility and consistent behavior.
- **Visual Testing:** Capture screenshots and videos during tests to visually validate the correctness of UI elements.
- **Easy Debugging:** Cypress provides a built-in test runner with debugging capabilities, making it easier to identify and fix issues.
- **Mocking and Stubbing:** Mock backend APIs and services for isolated testing of frontend functionality.


### Useful Links 🌟

- [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress) 📘
- [Writing Your First Test with Cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test) 🛠️
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices) 🔍

## Pre-Commit 

Running Pre-Commit checks before committing to GitHub ensures that your code meets quality standards and is ready for deployment. It helps catch errors early, maintains consistent coding practices, and ensures a reliable build and deployment process

- **Eslint:** Checks errors and warnings from your changes to maintain code quality.

- **Test:** Ensures code coverage is 100%, with Unit tests on Services and components on Dashboards.

- **Build:** Checks for build errors to ensure smooth deployment to preview and production environments.

These checks help maintain code quality, prevent common errors, and ensure a smooth deployment process.

## Pull-Request-Action

- After creating a pull request, ensure that your code has been reviewed by your teammates and lead, and add the ![Team Reviewed](https://img.shields.io/badge/Team%20Reviewed-brightgreen) label to signify completion of these reviews.

- Once the code has been reviewed and approved, add the ![PR status: Code ready](https://img.shields.io/badge/PR%20status-Code%20ready-purple) label, which triggers the Pull Request Action.

- This action checks **Eslint, Test, Build, and Preview** on the preview environment. It's important to note that sometimes your local Pre-Commit may pass these checks, but they can fail during the Pull Request Action. This could be due to different versions of Node or other dependencies, or issues with Apollo GraphQL Federation. Hence, it's crucial to identify and resolve such errors using the CI action.

### Useful links

- [What is CI](https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration)
- [What is CD](https://www.atlassian.com/continuous-delivery/ci-vs-ci-vs-cd)
- [Continuous Integration Best Practices](https://www.atlassian.com/continuous-delivery/continuous-integration)
- [Continuous Deployment Best Practices](https://www.redhat.com/en/topics/devops/what-is-ci-cd)
- [CI/CD with GitHub Actions](https://docs.github.com/en/actions/guides/about-continuous-integration)

## Monorepo-Workflow

- In our project, we utilize a monorepo structure, which allows us to manage multiple services efficiently. Here are some key points to help you work effectively within our monorepo:

### Running Services

- Each service can be run using the following Nx command:

```
npx nx serve service-name
```

### Federation Setup

- All services are part of a federation, enabling seamless integration and collaboration. To run the federation locally with services, use the following command:

- Running federation locally with service that is running on localhost

```json
npx nx dev-local federation service-name
```

### Developing the Frontend (Dashboard):

There are two scenarios for working on the frontend:

1. Frontend-only Changes:
    For changes that only affect the frontend (dashboard), use:

    ```json
    npx nx dev cms-dashboard
    ```
    
    This starts the frontend and connects it to the federation testing environment.
    
2. Frontend Changes with Service Interaction:
    If your frontend changes interact with a specific service (e.g., articles), you'll need to run both the service and the frontend locally:

   Start the desired service:

    ```json
    npx nx dev-local federation articles-service
    ```
    
    Start the frontend:

    ```json
    nx dev-local cms-dashboard
    ```

    This will start federation locally with the desired service running locally and a dashboard using the local federation

### Adding secrets to ENV:

Run the following command with your specific value:

1. Add this to your project.json

```json

 "add-secrets": {
      "executor": "@pinecone-intern-monorepo/secrets:add"
    },
```

```json

yarn nx run {project-name}:add-secrets --group {project-name} --env {which environment: values are [dev, testing, prod ] } --username admin --password X7vfUp1FelZcaPk5 --key {secret key name (MUST BE CAPITAL LETTERS AND USE UNDERSCORE) } --value {secret key value}

```

2. How to retrieve secrets to your project: Add the following to your project.json

```json

 "get-secrets": {
      "executor": "@pinecone-intern-monorepo/secrets:get",
      "defaultConfiguration": "production", // which env
      "configurations": {
        "production": {
          "groups": ["hrms-dashboard", "file-management"], // project-name
          "env": "prod" // which environment
        }
      }
    },

```

3. To check secrets, run following command

```json
npx nx get-secrets { project-name }

```



# Happy Coding! 🚀
We hope you have a successful and enjoyable time working at Pinecone Studio. Happy coding! 🌟
    




### License

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)[![Pinecone Studio](https://img.shields.io/badge/Owned%20by-Pinecone%20Academy-green)](https://pinecone.mn)
