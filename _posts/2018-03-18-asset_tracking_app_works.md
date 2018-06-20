---
layout: article
title: "How Asset/Vehicle Tracking App Works? - In a Nutshell"
key: 201803181
tags: Android GPS Location 
comments: true
---

You might have used or knew about some mobile application espicially for android that track a location of other device or people in some way and present to you with some additional interesting information. These are apps like *Uber*, *Grab*, *Gojek* and many apps for finding lost device, etc.

This post will explain the basic concept behind those apps using commercially available technology solution such as *firebase* :fire:. The sample project is available on [this github repo](#).

<!--more-->

![interactions](/assets/images/ata/hiw.jpg){:.center}

We can use firebase realtime database or firebase firestore as our realtime location storage.
- The first(left) device will get continous update of its location from *gps*, *network*, etc.
- Then write/update the location data into specifig firebase firestore document in some way.
- Lastly, the second(right) device read and listen to this specific firebase firestore document where the location data was written. Then visualize on map or process the location data as we need.

Hope it help you undestrand the simple basic concept of this kind of app.