---
templateKey: blog-post
title: 3 Reasons not to use the URI Search
date: 2017-01-04T15:04:10.000Z
description: >-
  There are two main ways of querying data in Elasticsearch. The URI Search is
  simple and convenient, and the Query DSL is verbose but powerful. In this
  post, we'll look at the pros and cons of each, and I'll tell you why you
  should just stick to the Query DSL.
tags:
  - elasticsearch
---
## Show me the ways!
Here is a sample [URI Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-uri-request.html) that is querying for podcasts with the title of "[Coding Blocks](https://www.codingblocks.net)":

```bash
# URI Search version
GET /podcasts/_search?q=title:"Coding Blocks"
```

As a human being (really, I assure you - why would you even think otherwise? Don't worry about it!) I find this request easy on the eyes and the [fingers](https://www.hanselman.com/blog/DoTheyDeserveTheGiftOfYourKeystrokes.aspx).

The [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) version of this query isn't so bad really but it does involve quite a few brackets, and you need to know a bit more about how the API works in order to write it:

```bash
# Query DSL version
GET /podcasts/_search
{
  "query": {
    "match": {
      "title": "Coding Blocks"
    }
  }
}
```


## What is good about URI Search?
What happens if you need to make a change? Say, I want to check for podcasts titled either "Coding Blocks" or "[MS Dev Show](https://msdevshow.com/)"?

Again, the URI Search is dead simple:

```bash
# URI Search version
GET /podcasts/_search?q=title:"Coding Blocks" OR title:"MS Dev Show"
```

But the Query DSL version has morphed. In addition to sprouting new brackets, you also have to introduce some additional property nesting. Yikes!

```bash
# Query DSL version
GET /podcasts/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "title": "Coding Blocks"
          }
        },
        {
          "match": {
            "title": "MS Dev Show"
          }
        }
      ]
    }
  }
}
````

So what's good about the Query URI version? It's simple and eloquent for simple and eloquent queries. It's quite powerful too, it supports all the same advanced features as the [Query String Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/query-dsl-query-string-query.html) and there are even [18 other parameters](https://www.elastic.co/guide/en/elasticsearch/reference/6.7/search-uri-request.html) you can pass to fine tune your results.

Not too shabby, but...

## What's not good about the URI search?

Here's a list of reasons I came up with for you to avoid using the URI search for anything but the laziest of curls.

#### 1. It gets ugly

As your queries get more advanced, the URI Search doesn't hold up very well. The syntax that's so simple and eloquent to begin with eventually starts to get harder and harder to read as you add conditions...and lets not forget what those 18 parameters would look like if you actually set them all.

#### 2. The capabilities are limited

More importantly, there are things you just can't do in the URI Search. The Elasticsearch query API is full of advanced features, like [aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html), and [scripting](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-script-fields.html), and [Geo fencing](https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-queries.html) that you just can't do.

#### 3. Little to no tooling support
Tools like [Kibana](https://www.elastic.co/products/kibana) or libraries like [Nest](https://github.com/elastic/elasticsearch-net) take advantage of the rigid-ish structure of json to offer nice intellisense and strong-ish typing around the Elastic API that help protect you from mistakes and ultimately save time. The URI Search skirks these rules, so these tools aren't available

## But what if I love URI Searches?
That's fine. Ultimately I think it's more valuable to start with, and stay with, the Query DSL. If you prefer the terse syntax and expressiveness of the Query String, and you've made your piece with the fact that you may have to rewrite that query then I wish you the best of luck.

Good luck.
