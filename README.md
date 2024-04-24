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

# ✨Prequel ✨

🎉 Welcome aboard, new Pineconers! 🌟 Your software engineering adventure begins here at Pinecone Academy, where innovation meets passion! 💻 We're thrilled that you've chosen to kickstart your journey with us and are ready to dive into a world of endless possibilities! 🚀 Get ready to soar, explore, and conquer the digital realm with us, Pineconers cheering you on every step of the way! 🌲💪

# Installation 💻

-

# 📚 Documentations 🌟

- [Monorepo Explained](#monorepo-explained) 🏗️
- [ESLINT Explained](#eslint-explained) 🛠️
- [Unit Testing Explained](#unit-testing-explained) 🧪
- [End to End (E2E) Testing Explained](#e2e-explained) 🌐
- [Pre-Commit Explained](#pre-commit-explained) 📝
- [Pull Request Actions Explained](#pull-request-action-explained) 🚀
- [Monorepo Workflow Explained](#workflow-explained) 🔄

### Monorepo Explained 🏗️

### Eslint Explained 🛠️

### Unit Testing Explained 🧪

### E2E Explained 🌐

### Pre-Commit Explained 📝

</br> Pre-Commit will be check Eslint, Test, Build, Preview.

   <ul>
    <li>Eslint -  check error and warning from your changes</li>
    <li>Test - check code coverage which is must be 100%, (E2E will be on dashboard, Unit testing on Service's)</li>
    <li>Build - check build error for deploying preview and production</li>
    <li>Preview - check error when deploying your changes on deploy url</li>
   </ul>

### Pull Request Actions Explained 🚀

</br> When you create pull request you need to add code-ready on the label. Which is running pull request action.
So the pull request action is check Eslint, Test, Build, Preview on the the preview environment. Sometimes your local pre-commit will be pass that 4 checks and it can be fail on the pull request action. The reason is different version of node and other dependency or it will be failed on the Apollo Graphql Federation. So we need to check that error from ci action.

[What is CI](https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration)

### Monorepo workflow Explained 🔄

### License

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)[![Pinecone Studio](https://img.shields.io/badge/Owned%20by-Pinecone%20Academy-green)](https://pinecone.mn)
