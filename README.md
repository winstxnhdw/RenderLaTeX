# @RenderLaTeX

[![main.yml](https://github.com/winstxnhdw/RenderLaTeX/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/RenderLaTeX/actions/workflows/main.yml)
[![update-webhook.yml](https://github.com/winstxnhdw/RenderLaTeX/actions/workflows/update-webhook.yml/badge.svg)](https://github.com/winstxnhdw/RenderLaTeX/actions/workflows/update-webhook.yml)
[![dependabot.yml](https://github.com/winstxnhdw/RenderLaTeX/actions/workflows/dependabot.yml/badge.svg)](https://github.com/winstxnhdw/RenderLaTeX/actions/workflows/dependabot.yml)

[@RenderLaTeX](https://twitter.com/RenderLaTeX) is a reliable and responsive serverless in-memory LaTeX/MathJax render bot for improving accessibility in Twitter's mathematics community.

<div align="center">
    <img src="resources/banner.png" />
</div>

## Setup

Install the dependencies.

```bash
yarn
```

Generate the bot's OAuth 2.0 token.

```bash
yarn oauth
```

## Project Objectives

Traditionally, bots such as [@saucenaopls](https://github.com/MakotoAme/twitter-saucenao) and [@aceCourtBot2](https://github.com/LuisMayo/ace-attorney-twitter-bot) must be spun up indefinitely to poll the Twitter servers for updates. These bots are expensive to maintain, while being slow and frustrating for their users due to Twitter rate limits. Instead, [@RenderLaTeX](https://twitter.com/RenderLaTeX) relies on [webhooks](https://developer.twitter.com/en/docs/twitter-api/premium/account-activity-api/guides/getting-started-with-webhooks) to receive tweets, enabling near instant response at no cost under acceptable loads. Specifically, [@RenderLaTeX's](https://twitter.com/RenderLaTeX) architecture was designed to meet the following objectives.

### Available always

Ensuring the continuous availability of the bot without requiring frequent upkeep is paramount. For this reason, the bot is hosted on a cloud provider such as AWS, minimising potential points of failure, as it relies solely on the server it is hosted on and Twitter.

### Free forever

It is imperative that the project remain cost-free to maintain indefinitely. To achieve this goal, the bot leverages webhooks to receive events, eschewing the costly option of spinning up a VPS, even during low traffic periods.

### Really responsive

By harnessing the increased performance of AWS Lambda Function URLs, the bot can deliver near-instant responses to incoming tweets. Furthermore, the bot's MathJax engine empowers it to independently render LaTeX, circumventing the need for external API requests.

## Credits

Many thanks to [Alyssa](https://github.com/alyssaxchua) for the amazing Twitter banner and profile picture!
