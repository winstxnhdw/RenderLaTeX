# @RenderLaTeX

![main.yml](https://github.com/winstxnhdw/RenderLaTeX/actions/workflows/main.yml/badge.svg)

[@RenderLaTeX](https://twitter.com/RenderLaTeX) is an ultra responsive serverless LaTeX/MathJax render bot for improving accessibility in Twitter's mathematics community.

<div align="center">
    <img src="resources/banner.png" />
</div>

## Setup

Install the dependencies.

```bash
yarn
```

## Project Objectives

Traditionally, bots such as [@saucenaopls](https://github.com/MakotoAme/twitter-saucenao) and [@aceCourtBot2](https://github.com/LuisMayo/ace-attorney-twitter-bot) must be spun up indefinitely to poll the Twitter servers for updates. These bots are expensive to maintain, while being slow and frustrating for their users. Instead, [@RenderLaTeX](https://twitter.com/RenderLaTeX) relies on [webhooks](https://developer.twitter.com/en/docs/twitter-api/premium/account-activity-api/guides/getting-started-with-webhooks) to receive tweets, enabling near instant response at no cost under acceptable loads. Specifically, [@RenderLaTeX's](https://twitter.com/RenderLaTeX) architecture was designed to meet the following objectives.

### Available always

RenderLaTeX should be available indefinitely without constant maintenance. This means that it should run on a cloud provider, like AWS. Points of failure are kept to a minimum as the bot is only dependent on the server it is hosted on and Twitter.

### Free forevever

The project should be free to maintain forever. I do not want to spend a single cent on this project. This is why the bot uses webhooks to receive events instead of spinning up a VPS even during periods of low traffic.

### Really responsive

AWS Lambda has one of the fastest cold start times with a generous free tier. This means that the bot can respond to tweets as soon as the webhook request is consumed. Additionally, the bot is not reliant on API requests as its MathJax engine renders LaTeX in-house.

## Credits

Many thanks to [Alyssa](https://github.com/alyssaxchua) for the amazing Twitter banner and profile picture!

