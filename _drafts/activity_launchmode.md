---
title: Android Activity Launch Mode
date: 2021-09-21 15:25:45 Z
tags:
- Android
layout: article
key: 
comments: true
---

## Activity Lauch Mode
*lauchMode* meruapakan suatu instruksi yang dapat dimasukan kedalam attribute activity pada *AndroidManifest.xml* yang mendefinisikan bagaimana activity harus dijalankan (launch). 

<!--more-->

```xml
<activity
    android:name=".MainActivity"
    android:launchMode="singleTop">
</activity>
```

Terdapat 4 mode:
- *standard* (default)
- *singleTop*
- *singleTask*
- *singleInstance*

### *standard*
Mode ini merupakan mode default. Jika kita menjalankan activity maka instance baru dari activity itu akan dibuat dan dipush ke top back stack. Jadi bisa terdapat beberapa instance dari activity pada back stack yang berjalan.

### *singleTop*
Sama dengan mode *standard* instance activity akan selalu dibuat untuk dijalankan, tetapi jika terdapat activity yang sama yang berada pada di top back stack maka instance activity baru tidak akan dibuat melainkan menggunakan kembali instance yang ada di top tersebut dan mengirim intent ke activity melalui `onNewIntent()`.

### *singleTask*

### *singleInstance*


## Another Read
-[https://medium.com/@iammert/android-launchmode-visualized-8843fc833dbe](https://medium.com/@iammert/android-launchmode-visualized-8843fc833dbe)
-[https://developer.android.com/guide/topics/manifest/activity-element#lmode](https://developer.android.com/guide/topics/manifest/activity-element#lmode)
-[https://developer.android.com/guide/components/activities/tasks-and-back-stack](https://developer.android.com/guide/components/activities/tasks-and-back-stack)
-[https://inthecheesefactory.com/blog/understand-android-activity-launchmode/en](https://inthecheesefactory.com/blog/understand-android-activity-launchmode/en)