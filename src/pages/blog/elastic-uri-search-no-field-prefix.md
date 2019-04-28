---
templateKey: blog-post
title: 'Elastic URI Search, no field prefix?'
date: 2019-04-22T02:34:26.699Z
description: >
  I ran into an situation where an Elastic URI Search with no field prefix gave
  me decent looking results, but I didn't know how those results we gathered so
  I did a bit of documentation diving and learned a couple new things!
tags:
  - elasticsearch
  - TIL
---
I ran into an situation where an Elastic URI Search with no field prefix gave me decent looking results, but I didn't know how those results we gathered so I did a bit of documentation diving and learned a couple new things!

## That was weird...
There are two main ways of querying data in Elasticsearch.

1. [URI Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-uri-request.html)

2. [Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)



The URI Search is much simpler, relying fully on data passed as query parameters in the url of a GET or POST request. The Query DSL is not simple, but as far as I can tell is superior in every other way.

I was poking around in the documentation trying to figure out if there was something I was missing. As best I can tell it will save you some typing, and other than it probably only exists for legacy reasons. 

```bash
GET /podcasts/_search?q=title:Coding Blocks
```

HOWEVER, I did stumble into a question.

The documentation gives you an example where you pass a field key and search value pair in through the "q" parameter. However, I typo'd and ended up running a search with no field specified....and I still got results.

```bash
GET /podcasts/_search?q="Coding Blocks"
```

## What if you don't pass a field prefix in a URI Search?

I expected an error there, so I took a look at the documentation and noticed an optional parameter "df" that let you specify a default field to search.

```bash
GET /podcasts/_search?q="Coding Blocks"&df=title
```

Well, ok - cool, except I didn't pass a df in my query. What happens if you don't pass a field *or* a "df"?

The URI Search documentation won't tell you, but if you dig into the [Query String Query(https://www.elastic.co/guide/en/elasticsearch/reference/6.7/query-ds l-query-string-query.html) docs over on the Query DSL side of the fence then the docs are more specific. If there is no field prefix, and no default field specified, then Elastic will use the "default_field" specified on the index itself, which defaults to "*.*"

## What does \*.\* mean?
\*.\*  is a special case that (according to the docs) "extracts all fields in the mapping that are eligible to term queries and filters the metadata fields." What does that mean for us? Elastic is nice enough to search for our term across every field that makes sense. That means that my search for "Coding Blocks" won't bother trying to search in date or numeric fields. Pretty handy, right?


Additionally, I didn't even realize that you could set a default_field on an index, so I thought that was pretty interesting. I also noticed that there was a note in the docs that there has been a recent change here in 7.0, where the total number of fields you _can_ search here is governed by another setting: "indices.query.bool.max_clause_count" which is initially set to 1024. That seems like a health limit to me but I figured it was worth calling out. In 7.0 a warning will be raised and logged and all fields will still be queries but I imagine future releases will get more strict.

## Summary
To sum things up:
1. You don't _have_ to pass a field prefix in URI Searches
2. Elastic figures out which fields to use, but going with whichever it finds first in this ordered list: URI String field prefix, df query parameter, default_field index setting, or *.*
3. \*.\* currently searches all the fields that you might expect, but eventually might be limited by a new 7.0 setting: *indices.query.bool.max_clause_count*
4. This should never come up because you should use the Query String API anyway, and even if you did you should probably not be lazy and just specify the field(s) you want to search :)

Well, that was fun. You learn something new every day!
