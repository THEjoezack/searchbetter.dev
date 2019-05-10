---
templateKey: blog-post
title: Why use an Elasticsearch Library for .NET?
date: 2019-05-10T00:46:20.167Z
description: >-
  Even though Elasticsearch offers a comprehensive REST API, there are benefits
  to using a strongly-typed library like NEST.
tags:
  - elasticsearch
  - nest
  - .net
---
![Pedestrian risking their life by ignoring a guard rail](/img/aravind-kumar-732657-unsplash.jpg "This pic makes me nervous!")

Elasticsearch offers a comprehensive [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) that gives you complete control over your documents and indices. Most (all?) modern languages provide an easy way to interact with REST API, so why bother taking on a 3rd party library like [NEST](https://github.com/elastic/elasticsearch-net)?

I can think of two reasons, but first a little bit about NEST.

NEST is the official Elasticsearch library for .NET, published by Elastic Company and open-sourced under the [Apache 2 license](https://tldrlegal.com/license/apache-license-2.0-(apache-2.0)) (that's one of the "good" ones.)

NEST provides a fluent interface that lets you build Elasticsearch requests by chaining method calls together. The strongly typed library acts like guard rails, helping to prevent invalid requests and enabling development environments like Visual Studio and Visual Studio Code to provide code completion saves you typing and catches problems before you even compile your code.

NEST also provides a low-level client that you can use to send arbitrary requests to Elasticsearch in case you need to pass along requests generated outside of your system, so you aren't losing any capabilities.

### Sample query:
Gets the top 10 Podcasts from "[Coding Blocks](https://www.codingblocks.net/)" or about "Elasticsearch"
```
var response = client.Search<Podcast>(s => s
    .From(0)
    .Size(10)
    .Query(q => q
        .Term(t => t.Author, "Coding Blocks") || q
        .Match(mq => mq
          .Field(f => f.Episode).Query("Elasticsearch")
        )
    )
);
```

Now we're ready, so let's go back to our original question:

## Why use an Elasticsearch Library for .NET?

Because strongly typed libraries...

1. Protect you from generating most invalid requests at compile-time
2. Provide [IDEs](https://en.wikipedia.org/wiki/Integrated_development_environment) like Visual Studio and Code everything they need to offer [code completion](https://en.wikipedia.org/wiki/Intelligent_code_completion)

You may decide that these benefits aren't worth it for your organization, but I hope you consider them!

- - -


Photo by [Aravind Kumar](https://unsplash.com/photos/k9HBitO83mI)  on [Unsplash](https://unsplash.com/search/photos/guard-rails)
