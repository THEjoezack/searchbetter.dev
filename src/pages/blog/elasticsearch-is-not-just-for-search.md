---
templateKey: blog-post
title: Elasticsearch is not just for search!
canonical: 'https://www.codingblocks.net/programming/elasticsearch-is-not-just-for-search/'
date: 2019-01-02T02:55:00.000Z
description: >-

  Elasticsearch is often described as an open-source, scalable, full-text search
  and analytics engine. This is true, but this sentence doesn’t really tell you
  much about what developers actually do with it.


  So, what do developers do with it? Well, let me tell you!
tags:
  - Elasticsearch
---
Many people who hear “search engine” may have preconceptions about what developers use them for, thanks to the strong correlation with services like [Google](https://www.google.com/), [Bing](https://www.bing.com/), or [Duck Duck Go](https://duckduckgo.com/). To be fair, the full-text search of Elasticsearch can get you similar, but far less sophisticated, results as something like Google but that’s only part of the picture.

Because of the nature of the underlying technology and the focus on horizontal scalability, Elasticsearch is also a fantastic analytics tool. “Analytics” is vague term though, so I wanted to list out 4 common use cases for Elasticsearch that are hopefully more relatable.

* * *

## 1. Full-Text Searches

Elasticsearch has great support for [text-analysis](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-analyzers.html). Things like synonyms, stopwords, stemming, phrases, fuzzy search, and relevance scoring are baked in and supported for [many different languages](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html). The example I like to give here is being responsible for the search box on something like Google. You search for “Teenage Karate Turtles” and end up with the results about “Teenage Mutant Ninja Turtles”. Cowabunga!

Elasticsearch also has [built-in support for autocomplete and suggestions](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-analyzer.html). Why make your customer guess when you can help guide them to the information that you have?

![](https://www.codingblocks.net/wp-content/uploads/2019/04/image.png)<figcaption>This is the use case a lot of people thing about for “search engines”</figcaption>

## 2.  E-Commerce / Faceted Navigation

Full-text search is great, but it’s only a small part of what developers use it for. Elasticsearch is also great at counting.

This is really important for e-commerce applications where users are actively looking for products that fit their needs. In those applications it’s common to provide users with a search box like the above Google example, but it’s also common to give them aggregate information about the search results so they can quickly hone in on the item they want to buy.

In the query snippet below, I’m asking Elasticsearch to search for a “Camera”, but I’m also asking for counts of results by brand, release date, and price range. As you can see, this query is a perfect fit for these types of use cases. (note: it returns the normal search results at the same time)

![](https://www.codingblocks.net/wp-content/uploads/2019/04/image-3.png)<figcaption>Check out that left navigation!</figcaption>


```
POST /products/_search?size=24 {
  "aggs": {
    "brand" : {
      "terms" : { "field" : "brand" }
    },
    "release_date" : {
      "date_histogram" : {
        "field" : "release_date",
        "interval" : "month"
      }
    },
    "range" : {
      "field" : "price",
      "ranges" : [
        { "to" : 100.0 },
        { "from" : 100.0, "to" : 200.0 },
        { "from" : 200.0 }
      ]
    }
  }
}
```

## 3. Logging and Analytics

The second use case borrowed features from the first, adding aggregation ability on top of the full-search capabilities to offer a great e-commerce story. Likewise, the third case, Logging and Analytics, builds upon the first two.

Elasticsearch is horizontally scalable, which means it can do really well with large amounts of data if you are willing to pony up for the hardware.

**How large, you say?**

It is common for organizations to deal in billions of documents across terabytes of data. Not too shabby! If you pair Elasticsearch’s horizontal scalability with it’s ability to count well, then you have the foundation for a great Logging and Analytics tool. Stream data in one end, and get charts and graphs out the other. The way Elasticsearch indexes the data means that this can be done really quickly and efficiently.

**How quick you say?**

“Nearly” real-time. In this case “nearly” means that there will be some delay between when the document is ingested and when it is ready for return, but the ingestion and processing is quick enough that the system doesn’t get backed up. You may have a 5 second delay, but (given the proper hardware) that delay should stay constant. The Elastic Company also provides a great tool, Kibana, for creating and managing visualizations built around the Elasticsearch API.

An example use case here might be a tool like [DataDog](https://www.datadoghq.com/) (who have sponsored episodes of Coding Blocks, but not this post) which keeps track of the health of your infrastructure. The abilities behind this 3rd use case aren’t so different from the first 2 although the final result looks quite different:

![](https://www.codingblocks.net/wp-content/uploads/2019/04/image-1.png)<figcaption>This is a custom dashboard based on near real-time analytics from DataDog</figcaption>

## 4. Monitoring and Notifications

Finally, Elasticsearch has support for “reverse-searches”, machine-learning, and notifications. This means that you can configure Elasticsearch to take actions on your behalf based on some pre-defined setup. This plays well with the real-time aggregations, and it fits nicely with the three other use cases.  
LIke when…

- Wikipedia sends an alert when there is an unusual pattern of editing or searching.
- Amazon sends an alert if a product is selling faster than expected
- DataDog sends a notification when critical servers aren’t performing well

These are handy abilities, and though they don’t necessarily make for a whole application these notifications can be critical to an organization and it’s especially nice when you get this functionality “for free” with the tool that’s already central to your products, like Elasticsearch.

![](https://www.codingblocks.net/wp-content/uploads/2019/04/image-2.png)<figcaption>Creating an alert based in Elastic’s Kibana tool to send an alert based on results from a machine learning job. </figcaption>

* * *

## In conclusion…

I mentioned four major use-cases that make sense for Elasticsearch and explained why they fit together so well. I hate to think of how many organizations are re-inventing the wheel when it comes to these abilities, so hopefully this post does you some good so that you know what your options are next time you are faced with a search or analytics problem.

PS: Like this post? Maybe you'd like [the podcast too!](https://www.codingblocks.net/podcast/search-driven-apps/)
