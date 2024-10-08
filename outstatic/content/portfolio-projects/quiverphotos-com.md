---
title: 'QuiverPhotos.com'
status: 'published'
author:
  name: 'Chris Esplin'
  picture: 'https://avatars.githubusercontent.com/u/878947?v=4'
slug: 'quiverphotos-com'
description: 'I started Quiver Photos v1 back in January of 2022. It was an exceptionally challenging project, and I was never satisfied with the result.'
coverImage: '/images/quiver-photos-black-E5Nj.svg'
publishedAt: '2024-07-25T00:00:00.000Z'
---

### Project Summary

We started [Quiver Photos](https://www.quiverphotos.com) v1 in January of 2022. It was an exceptionally challenging project, and we were never satisfied with the result.

The v1 app used a combination of a web app and a command line tool, known as the "desktop app", to index media item records and then download them using the Google Photos API.

The Google Photos API stripped geo location EXIF metadata, and Apple Live Photos recovery was never supported, leading to sub-optimal data recovery.

Even worse, the Google Photos API throttled the application to 10k calls a month. As the app got more popular, users would hit API limits and have to wait until the next month to recover their libraries.

The only solution was to rewrite the entire thing as a desktop application that scrapes photos.google.com directly.

This rewrite was completed in early 2024 and has attracted hundreds of users in just a few months.

### Technology

The desktop application uses [PocketBase](https://pocketbase.io/) as a database solution and [Wails](https://wails.io/) for the desktop application itself. The Wails desktop app is written in a combination of Golang and React. It runs on a lightweight web client.

The hardest aspect of [QuiverPhotos.com](https://www.quiverphotos.com) has been maintaining MacOS, Windows, and Linux compatibility. All three platforms work well for most users, but user systems and libraries are inconsistent, leading to difficult-to-diagnose bug reports.
