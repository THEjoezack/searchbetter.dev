---
templateKey: blog-post
title: Importing Git History to Elasticsearch
date: 2019-05-04T18:01:31.106Z
description: >-
  Ever wanted to explore source control changes with Elasticsearch? Below are
  the steps I took for importing a repository via the bulk API.
tags:
  - Elasticsearch
  - Git
  - Project
---
Roll up your sleeves! This following steps are not pretty, though they are simple. 

> Cleaning things up and releasing them in a tidy package would be a great project for somebody!

Below is a messy series of commands and scripts that will gather the git history of a repository and convert it to the [bulk import format for Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html).

Requires [node](https://nodejs.org/en/) and [bash](https://www.gnu.org/software/bash/).

## 0. Grab the scripts from Github

```bash
git clone https://github.com/codingblocks/git-to-elasticsearch
```

## 1. Export git history in json-ish format

Change directory to the repository you want to import, and export the base history. (note you may have to adjust the path of the redirected file in the scripts below)

I found it easier to just do this in two passes and then join the data later in code.

```bash
git --no-pager log --name-status > ../git-to-elasticsearch/files.txt
```

```bash
git log --pretty=format:'{%n "commit": "%H",%n "abbreviated_commit": "%h",%n "tree": "%T",%n "abbreviated_tree": "%t",%n "parent": "%P",%n "abbreviated_parent": "%p",%n "refs": "%D",%n "encoding": "%e",%n "subject": "%s",%n "sanitized_subject_line": "%f",%n "body": "%b",%n "commit_notes": "%N",%n "verification_flag": "%G?",%n "signer": "%GS",%n "signer_key": "%GK",%n "author": {%n "name": "%aN",%n "email": "%aE",%n "date": "%aD"%n },%n "commiter": {%n "name": "%cN",%n "email": "%cE",%n "date": "%cD"%n }%n},' | sed "$ s/,$//" | sed ':a;N;$!ba;s/\r\n\([^{]\)/\\n\1/g'| awk 'BEGIN { print("[") } { print($0) } END { print("]") }' > ../git-to-elasticsearch/history.txt
```

The above script was based off of the work in this [gist](https://gist.github.com/sergey-shpak/40fe8d2534c5e5941b9db9e28132ca0b).

## 2. Format the data

This will join the history.txt and files.txt files and format them for import to Elasticsearch.

```bash
node git2json.js
```

## 3. Import to Elasticsearch

This script will upload your file to Elasticsearch:

```bash
./import.sh
```

A copy of the fully formatted finaljson.json file has been gernated, but as long as everything has 

Here's a link to documentation for quickly spinning up an Elastic Stack cluster:
https://searchbetter.dev/blog/quickstart-guide-elastic-stack-for-devs/

```bash
rm history.txt files.txt finaljson.json
```

## 5. Have fun!

Here are a couple ideas on what you migh query now with Elastic. tay tuned for my next blog post and I'll show you how to answer all of these questions and more about one of my favorite sites: [dev.to](https://dev.to/)

* What files are changed the most often?
* Who are the most active authors?
* What time of day is the most committed?

- - -

#### Troubleshooting:

Q: _Having a hard time redirecting input on [WSL?](https://docs.microsoft.com/en-us/windows/wsl/install-win10)?_
A: Try pasting the git commands into a .sh file first, and then redirecting that execution to the file

Q: _Having trouble reading files on Windows or [WSL?](https://docs.microsoft.com/en-us/windows/wsl/install-win10)_
A: Try converting the file to ascii

In dos:

```dos
cmd /c /a type history.txt>history.txt
cmd /c /a type files.txt>files.txt
```

Q: _Having a hard time with large repositories?_
A: Elastic will prohibit uploads greater than 100mb by default, you can [change that settings](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html) but you might be better off [splitting the file up](https://stackoverflow.com/questions/7764755/how-to-split-a-file-into-equal-parts-without-breaking-individual-lines?rq=1) (though make sure to do it only after an even line!)
