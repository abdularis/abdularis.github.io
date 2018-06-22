---
layout: article
title: "Mengenal dan Memahami Context pada Android"
key: 201806221
tags: Android Context 
comments: true
---

## Definisi
Untuk dapat memahami *Context* maka kita perlu mengetahui terlebih dahulu konteks secara umum kemudian relasinya terhadap class *Context* pada pemrograman aplikasi Android.
### Secara Umum
Konteks merupakan situasi atau kondisi yang berhubungan dengan suatu kejadian (keadaan) yang terjadi.

<!--more-->

Kontens merupakan aspek-aspek lingkungan (sesuatu yang ada pada lingkungan) yang berkaitan dengan hal tertentu. Dalam ilmu bahasa merupakan garis besar, situasi, events, atau informasi yang berhubungan dengan sesuatu yang dapat menambah kejelasan makna dan membuat kita memahami secara umum apa yang dimaksud oleh pembicara (dibicarakan).

> *Meriam Webster 10th dictionary:*
>- the parts of a discourse that surround a word or passage and can throw light on its meaning
>- the interrelated conditions in which something exists or occurs : ENVIRONMENT, SETTING

### Android
> **Android SDK Documentation:**
> Context is an interface to global information about an application environment. Context class is an abstract class and implemented by the android system. It allows access to application-specific resources and classes, launching activity, broadcasting and receiving intents, etc.

**Pertama**

*Context* dapat dikatakan sebagai asisten untuk dapat mengetahui serta menggunakan layanan atau keadaan sistem secara umum ataupun khusus.

**Kedua**

*Context* mengizinkan aplikasi android untuk dapat mengetahui state/keadaan lingkungan (sistem) dimana aplikasi tersebut berjalan (seperti *Theme*) sehingga aplikasi dapat berjalan dengan sesuai.
*Context* juga memberikan kemampuan untuk dapat mengakses data asset, sumber daya umum sistem seperti fitur *Software/Hardware*, *Database*, *Storage*, ataupun akses sumber daya aplikasi secara khusus seperti *resources* yang disimpan di direktori *res* & *assets*.

## Beberapa Penggunaan *Context*
- Memulai *Activity*
```java
Intent i = new Intent(context, MyActivity.class);
startActivity(i);
```
- Instansiasi *View*

Instansiasi *View* secara dinamis pada code java
```java
TextView tv = new TextView(context);
```
- Mengakses *Resources*
Akses ke *resources* yang ada pada direktori *res*

```java
String appNameString = context.getString(R.string.app_name);
int textColor = context.getResources().getColor(R.color.text_color);
```
- Membaca *Assets*

Membaca file yang disimpan pada direktori *assets/* (sejajar dengan direktori *res*)
```java
AssetManager am = context.getAssets();
InputStream dataStream = am.open("my_data.txt");
```
- Akses *SharedPreferences*

Mengambil instance dari *SharedPreferences* dengan argument *name* dan *mode*
```java
SharedPreferences myPrefs = getSharedPreferences("prefs_name", Context.MODE_PRIVATE);
```
- Mengakses *System Services*
```java
// akses notifikasi manager
NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
// akses activity service/manager
ActivityManager am = (ActivityManager) getSystemService(ACTIVITY_SERVICE);
// dsb.
```
- Layout Inflation

Baca dan menginstansi views yang dideklarasikan di layout xml
```java
LayoutInflater inflater = LayoutInflater.from(context);
inflater.inflate(R.layout.activity_main_layout, parent);
```
- Instance Local Broacast Manager
```java
Intent intent = new Intent("broacast_action_name");
LocalBroadcastManager lbm = LocalBroadcastManager.getInstance(this);
lbm.sendBroadcast(intent);
```

## Activity Context vs Application Context
*Activity Context* merupakan *Context* yang terikat pada *lifecycle* (siklus hidup) activity (karena memang *Activity* adalah *Context* itu sendiri), dapat digunakan untuk inflate *XML Layout*, instansiasi kelas *View* dan untuk kebutuhan lainnya yang dimana *lifecycle*-nya berdasarkan *lifecycle* activity.

*Application Context* dapat digunakan untuk kebutuhan kelas dimana *lifecycle* dari kelas tersebut terus ada sampai aplikasi benar-benar berhenti (mengikuti *lifecycle* dari kelas *Application*), misalnya seperti membuat kelas *singleton manager* untuk mengelola suatu *global resource* yang memerlukan *field* dan akses ke *Context*.

## Another Read
- [https://developer.android.com/reference/android/content/Context](https://developer.android.com/reference/android/content/Context)
- [https://stackoverflow.com/questions/3572463/what-is-context-on-android](https://stackoverflow.com/questions/3572463/what-is-context-on-android)
- [http://www.wingnity.com/blog/context-in-android/](http://www.wingnity.com/blog/context-in-android/)
