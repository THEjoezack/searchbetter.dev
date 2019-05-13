---
templateKey: blog-post
title: Analyzing Git History with Elasticsearch
date: 2019-05-05T21:35:05.421Z
description: >-
  I imported the git history from Dev.to into Elasticsearch, and did some basic
  analysis on the data in Kibana.
tags:
  - elasticsearch
  - kibana
  - git
  - datavis
---
Importing Git History into Elasticsearch is a [not very much fun](https://analytics.codingblocks.net/blog/importing-git-history-to-elasticsearch/) thanks to the lack of git formatting options, but it's cool once you get it working!

*Check out the video showing the results!*

[![Check out the video showing the results of analyzing git history with Elasticsearch!](https://img.youtube.com/vi/ejeHzxOBiOQ/0.jpg)](https://www.youtube.com/watch?v=ejeHzxOBiOQ)

Each commit has 22 data points, including a one-to-many list of changed files. 

I imported the git history from [dev.to](https://github.com/thepracticaldev/dev.to) to see how things looked.

Now I can run simple queries like this to see things like how many commits were made by each contributor:

![Query for Commits by Author in Kibana Dev Tools](/img/devtools.png "Query for Commits by Author in Kibana Dev Tools")

That's nice and all, but I'd prefer something visual so I put together a few simple charts in [Kibana](https://www.elastic.co/products/kibana).

Below you'll see a screenshot of the charts I put together. The cool thing is, that I can apply filters and searches at the top of the dashboard and it will affect all the charts.

![Unfiltered dashboard](/img/kibana-1.png "Unfiltered dashboard")

This lets me do cool things, like look at commits by Ben Halpern in the last 90 days that involve "tags". I'm being lazy, so anything text fields that contain "tags" will match this filter, but I was pretty happy with the results, shown below:

![Dashboard of commits by Ben Halpern in the last 90 days, about "tags"](/img/kibana-2.png "Dashboard of commits by Ben Halpern in the last 90 days, about \"tags\"")

Pretty cool right?

## Conclusion
Eventually I'd like to take some time to clean-up the import process so it's easier to run, but for now I'm going to take some time exploring a couple of my own projects to see what  I can dig up.

I do have some questions for you though:
* What would it look like if you analyzed your projects with Elasticsearch?
* What other types of analysis would you like to see?
