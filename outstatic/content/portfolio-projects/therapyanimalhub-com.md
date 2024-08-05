---
title: 'TherapyAnimalHub.com'
status: 'published'
author:
  name: 'Chris Esplin'
  picture: 'https://avatars.githubusercontent.com/u/878947?v=4'
slug: 'therapyanimalhub-com'
description: ''
coverImage: '/images/sitting-dog-black-U4OD.png'
publishedAt: '2024-07-26T00:00:00.000Z'
---

### Project Summary

[TherapyAnimalHub.com](https://www.therapyanimalhub.com) launched in early 2024 as a two-sided marketplace to connect Licensed Clinical Psychologists with apartment renters.

Emotional Support Animals are a United States phenomenon. In short, you can talk to your licensed physician or therapist and get a letter saying that you need your pet for emotional support. This letter can be taken to an apartment complex and the apartment complex must respect it and cannot charge you extra for having your pet in the apartment. The requirements for an ESA are much lower than that of a fully-fledged service animal. For instance, if you purchase and train a seeing eye dog, that dog can be certified as a service animal and you can take your seeing eye dog with you practically anywhere. An emotional support animal must clear a much lower bar.

A variety of telehealth-style services exist to connect patients and counselors. Therapy Animal Hub is quite similar, except that it includes an affiliate marketing program. By using affiliate partnerships, we're able to address a much larger market. Other services use a combination of SEO and pay-for-clicks advertisement.

### Technology

TherapyAnimalHub.com is built on Next.js and deployed to Vercel. It uses React Server Components and a Firebase backend.

The trickiest parts of this application are Stripe-related. It's a two-side marketplace, with the addition of affiliate partnerships, so we used Stripe Express Connect accounts for both the affiliates and the service providers. The providers get paid daily as they service new clients. The affiliates get paid monthly based on tracked promotion codes.

The application started as a simple intake form and grew dramatically as we discovered new business requirements. We're planning a full rewrite of the application layer, scheduled to launch in Q4 of 2024.
