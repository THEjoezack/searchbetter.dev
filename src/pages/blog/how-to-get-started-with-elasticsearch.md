---
templateKey: blog-post
title: How to get started with Elasticsearch
date: 2019-05-12T23:01:55.152Z
description: >-
  Want to starting learn about Elasticsearch and how to use it to make
  applications, but don't know where to start? Well, you're in the right spot -
  keep reading!
tags:
  - elasticsearch
  - docker
---
There is a lot to Elasticsearch and the ecosystem that surrounds it. The [search API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search.html) is tough enough to learn on its own without trying to figure out how to get things set up, data loading, and your app talking to it.

I started putting together some resources to help you get started with Elasticsearch if you are just learning about it. I'll keep adding to this post as I create more content.

## 1. Learn what it's used for.

Here's a post/video I made on the subject: [Elasticsearch is not just for search](https://analytics.codingblocks.net/blog/elasticsearch-is-not-just-for-search/)

IMHO, Elasticsearch has 4 major use cases:

* Full Text Search
* Aggregations
* Near Real Time Monitoring
* Monitoring / Alerting

## 2. Setup a local development environment

The easiest way to get Elasticsearch and its cousins up and running is with [Docker](https://www.docker.com/). It's worth setting up if you can, it makes life so much easier.

I created a quick, very quick, guide and [repository](https://github.com/codingblocks/simplified-elastic-stack) to setting up Elasticsearch. You can check out the [video](https://www.youtube.com/watch?v=Zaqe5rFtma4) here.

[![Watch the corresponding video](https://img.youtube.com/vi/Zaqe5rFtma4/0.jpg)](https://www.youtube.com/watch?v=Zaqe5rFtma4)

## 3. Make a little web app

Once you have things running locally, you can make a little app with a search box that will display the results. Here is a basic query that will search all text fields in all indexes:

```
GET /_search
{
  "query": {
    "simple_query_string": {
      "query": "Your Search Here"
    }
  }
}
```

I'd like to get a video together on this, so stay tuned!

## 4. Make it better

Now that you've got a little web app set up, you can start having fun! Add search auto-complete, paging, charts, faceted navigation, make some dashboards in Kibana etc.

I'll have some more info on this soon too, so stay in touch!

Have any other suggestions? [Let me know](https://analytics.codingblocks.net/contact)!
