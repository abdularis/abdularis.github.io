---
layout: article
title: "Implement Launch Screen/Splash Screen for Android App - The Right Way"
key: 
tags: Android
comments: true
---

I've seen many people & friends implemented launch screen (splash screen) on their apps by creating a new activity that shows an image/brand or whatever is inside that launch screen, made it as a default launcher activity, used some codes to wait/delay (stay) on that launch screen activity for about *3 to 5 seconds*, then brought you to the main screen/feature of that app.

I think it's really weird to make user wait for nothing for that amount of time.

Todays post will show you how to make launch screen for android using a *theme* and won't delay anything. Here how it looks like.

<!--more-->

## Preview
<video controls="" autoplay="true" loop="true" name="media" style="display: block; margin: auto; border-radius: 0.3em">
    <source src="/assets/images/splash/vid.mp4" type="video/mp4">
</video>

The android project is available [here on github](https://github.com/abdularis/LaunchScreenExample)

I assume that you already familiar with basic android developement such as creating new project, activity, theme, etc.

We would have two activities `MainActivity` which is the main screen/feature and `LaunchScreenActivity`.

We won't have any code to delay execution of `MainActivity` in the `LaunchScreenActivity`.

## Launch Screen Appearance

![screenshot](/assets/images/splash/screenshot.jpg){:.rounded.center}

I'll use this logo as a sample brand icon, with the name `ic_logo.png`

![logo](/assets/images/splash/logo.png){:.center}

I am gonna use repeated seamless background image pattern, it's `img_bg_pattern.png`

![pattern](/assets/images/splash/pattern.jpg){:.center}

Make a new drawable called `bg_pattern.xml` to make this seamless pattern image repeated for a given space.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:opacity="opaque">
    <item android:drawable="@android:color/white"/>
    <item>
        <bitmap
            android:src="@drawable/img_bg_pattern"
            android:tileMode="repeat"/>
    </item>
</layer-list>
```

Create a drawable layer list background called `bg_launch_screen.xml` that we will use for the background of the launch activity theme.

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:opacity="opaque">
    <item android:drawable="@drawable/bg_pattern"/>
    <item>
        <bitmap
            android:src="@drawable/ic_logo"
            android:gravity="center"/>
    </item>
</layer-list>
```

**The resource directory would look like this**

![struktur](/assets/images/splash/dir_struct.png){:.rounded.center}

## The Theme
Then create new style in the `styles.xml` file with the name *LaunchScreenTheme*

```xml
<resources>

    <!-- ... -->

    <style name="LaunchScreenTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="android:windowBackground">@drawable/bg_launch_screen</item>
    </style>

    <!-- ... -->

</resources>

```

Apply the style to `LaunchScreenActivity` in the `AndroidManifest.xml` and also make `LaunchScreenActivity` as a default launcher activity. so this activity would launch when we run the the app.

```xml
<activity
    android:name=".LaunchScreenActivity"
    android:theme="@style/LaunchScreenTheme">
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>
```

Lastly, add code to start `MainActivity` of your app in `LaunchScreenActivity`

```java
public class LaunchScreenActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);
        finish();
    }

}
```

**Done.** build -> run.