---
templateKey: blog-post
title: Three things to know about Regexp in Elasticsearch
date: 2019-05-03T03:46:12.693Z
description: >-
  Regular Expressions in Elasticsearch behave differently, and have some
  interesting and noteworthy points that are worth knowing.
tags:
  - Elasticsearch
  - Regular Expressions
---
There are 3 important things to know about regular expressions in Elasticsearch.

1. Matching is done at the token level, not the string

2. The operators and syntax are different from most other languages

3. Wildcard matchers dramatically affect performance



Below is a short description of my biggest ta



## Matching is done on the tokenized terms



Here is the key sentence from the documentation: "Elasticsearch will apply the regexp to the terms produced by the tokenizer for that field, and not to the original text of the field.”. This means that regular expressions only work against the [tokenizer}(https://www.elastic.co/guide/en/elasticsearch/reference/7.0/analysis-tokenizers.html) results of the text field you are querying against.



You can see what the regular expressions run against for a given string by running a query like this, though you will need to make sure that the tokenizer matches the field you are querying.



```
POST /_analyze

{

  "tokenizer": "standard",

  "text": “This text will get tokenized"

}
```



If you run this query, you can see that the string gets broken up into tokens: “This”, “Text”, “Will”, “Get”, “Tokenized”. Running a regular expression will attempt to match against each of these individual tokens. That means that you will not get matches for results like “This.*Tokenized” because there is no single token that contains both “This” and “Tokenized”. 



There is a workaround if you store or copy the full string to an unanalyzed text field. You can read more about that solution [here](http://www.ethanjoachimeldridge.info/tech-blog/elastic-search-regular-expressions-against-whole-string)





## Elasticsearch regular expressions are not fully [Perl Compatible](https://en.wikipedia.org/wiki/Perl_Compatible_Regular_Expressions)

Elasticsearch is missing some of the regex features common in other languages. The two most noticeable to me are shorthand characters like \d and \s and lookaheads.



That said, there is still a lot you can do. There are too many capabilities to list here, but it’s important that you don’t rely on your “muscle memory” from other programming languages because you may not be getting the results you expect…and you may not get an error message letting you know there’s a problem.



[Read more about Elasticsearch’s regular expressions.](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html#regexp-syntax)



## Wildcard matchers are slow

The documentation offers a few warnings about performance, advising you to use a long prefix before your regular expression starts and avoiding large wildcard searches.



Here’s a great quote:

"Regular expressions are dangerous because it’s easy to accidentally create an innocuous looking one that requires an exponential number of internal determinized automaton states (and corresponding RAM and CPU) for Lucene to execute."



There are a couple of settings that limit the performance impact of regular expressions. All of them may be adjusted at query time, although these limits seem pretty gratuitous to me already.

max_determinized_statessetting (default 10000)

max_regex_length (default 1000)



## Conclusion

I learned a few things when I was reading up about regular expressions in Elasticsearch, and I hope you did too. I would love to hear about anything interesting or weird you learned while working with them.
