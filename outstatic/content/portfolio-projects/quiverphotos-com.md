---
title: 'QuiverPhotos.com'
status: 'published'
author:
  name: 'Chris Esplin'
  picture: 'https://avatars.githubusercontent.com/u/878947?v=4'
slug: 'quiverphotos-com'
description: 'Quiver Photos is a cross-platform backup tool for recovering full-resolution Google Photos libraries with EXIF metadata and Apple Live Photos intact.'
coverImage: '/images/quiver-photos-black-E5Nj.svg'
publishedAt: '2024-07-25T00:00:00.000Z'
---

### Project Summary

We started [Quiver Photos](https://www.quiverphotos.com) v1 in January of 2022. It was an exceptionally challenging project, and we were never satisfied with the original architecture.

The v1 app used a combination of a web app and a command line tool to index media item records and download them using the Google Photos API.

The Google Photos API stripped geolocation EXIF metadata, and Apple Live Photos recovery was never supported, leading to sub-optimal data recovery. Even worse, API rate limits throttled users to 10k calls a month, forcing large libraries to stall until the following month.

The solution was to rebuild the product around direct library recovery without relying on the limited API, preserving original media and metadata across hundreds of user libraries.

### Technology

Quiver Photos has evolved through a desktop rewrite (Golang, Wails, React, and PocketBase) into its current v3 architecture: a lightweight, cross-platform Go TUI paired with Cloudflare Pages functions and automated multi-platform GitHub releases.

The hardest aspect of [QuiverPhotos.com](https://www.quiverphotos.com) has been maintaining reliable macOS, Windows, and Linux support across inconsistent user environments and massive multi-terabyte photo libraries.
