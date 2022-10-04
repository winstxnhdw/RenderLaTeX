# @RenderLaTeX

![main.yml](https://github.com/winstxnhdw/RenderLaTeX/actions/workflows/main.yml/badge.svg)

[@RenderLaTeX](https://twitter.com/RenderLaTeX) is an ultra responsive serverless LaTeX/MathJax render bot for Twitter. Traditionally, Twitter bots, like [@saucenaopls](https://github.com/MakotoAme/twitter-saucenao) and [@aceCourtBot2](https://github.com/LuisMayo/ace-attorney-twitter-bot) must be spun up indefinitely to poll the Twitter servers for updates. These bots are are expensive to maintain, while being slow and frustrating for their users. [@RenderLaTeX](https://twitter.com/RenderLaTeX) relies on [webhooks](https://developer.twitter.com/en/docs/twitter-api/premium/account-activity-api/guides/getting-started-with-webhooks) instead of polling to receive tweets, allowing near instant response at virtually no costs.

## Setup

Install the dependencies.

```bash
yarn
```

## Project Objectives

RenderLaTeX's architecture was designed to meet the following objectives.

### Available indefinitely

RenderLaTeX should be available indefinitely without constant maintenance. This means that it should run on a cloud provider, like AWS. Points of failure are kept to a minimum as the bot is only dependent on the server it is hosted on and Twitter.

### Free to maintain

The project should be free to maintain forever. I do not want to spend a single cent on this project. This is why the bot uses Twitter's webhooks to receive events.

### Responsive

AWS Lambda has one of the fastest cold start times with a generous free tier. This means that the bot can respond to tweets as soon as the webhook request is consumed. Additionally, the bot is not reliant on API requests as its MathJax engine renders LaTeX in-house.
