---
title: Extending Circle Image View to Create Circle Avatar Image View
date: 2018-06-20 00:00:00 Z
tags:
- Android
- Java
- Custom-View
layout: article
key: 20180620
comments: true
---

In this post I'm gonna create an circle avatar image custom view which is a subclass of circle image view, so before start reading this, make sure you've read and understand the post about [Creating Custom Circle Image View]({% post_url 2018-06-06-circle_image_view %}).

This is how circle avatar image view looks like.

![figure1](/assets/images/aiv/fig1.gif){:.rounded}

It can show either an image or initial character.

<!--more-->

The project is available [here on Github](https://github.com/abdularis/CircularImageView)

## Reuse CircleImageView
Extend the `CircleImageView` class to reuse the functionality. Define two static final integer to represent two state for either showing an initial or an image.

```java
public class AvatarImageView extends CircleImageView {
    public static final int SHOW_INITIAL = 1;
    public static final int SHOW_IMAGE = 2;
}
```

## Define XML Attributes
This attributes is used to customize the view in xml layout.
```xml
<declare-styleable name="AvatarImageView">
    <attr name="avatarBackgroundColor" format="color"/>
    <attr name="textSize" format="dimension"/>
    <attr name="textColor" format="color"/>
    <attr name="text" format="string"/>
    <attr name="state" format="enum">
        <enum name="INITIAL" value="1"/>
        <enum name="IMAGE" value="2"/>
    </attr>
</declare-styleable>
```

## Define member variables
```java
public class AvatarImageView extends CircleImageView {
    // ...
    private Paint mTextPaint; // used to draw a text/initial character
    private Rect mTextBounds; // rectangle bounds of initial character

    private Paint mBackgroundPaint; // used to draw filled circle for text/initial background
    private RectF mBackgroundBounds; // bounds of the circle

    @NonNull
    private String mInitial; // holding a character to be drawn
    @NonNull
    private String mText; // holding whole text (in case we need it)

    private int mShowState; // the current state of avatar view
    // ...
}
```

## Important methods
These are explanations of some methods that I consider more important.
### Updating background circle bounds
When the view size changed the `mBackgroundBounds` needs to be updated to make size and position of bounds correct by calling the super class method `updateCircleDrawBounds()`
```java
public class AvatarImageView extends CircleImageView {
    // ...
    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);
        updateCircleDrawBounds(mBackgroundBounds);
    }
    // ...
}
```

### Updating text bounds
Bounds or dimension of a character is needed to calculate the correct position for the character to be rendered in the center.
This method would be called when the text changed, for example inside the setter method for text or text size and in constructor for initialization.
```java
public class AvatarImageView extends CircleImageView {
    // ...
    private void updateTextBounds() {
        mTextPaint.getTextBounds(mInitial, 0, mInitial.length(), mTextBounds);
    }
    // ...
}
```

### Drawing
If the state is `SHOW_IMAGE` then render straightly using parent `onDraw()` method.
If it's `SHOW_INITIAL` then render the text and background.
```java
public class AvatarImageView extends CircleImageView {
    // ...
    @Override
    protected void onDraw(Canvas canvas) {
        if (mShowState == SHOW_INITIAL) {
        	// this is centered y coordinate for text
            float textBottom = mBackgroundBounds.centerY() - mTextBounds.exactCenterY();
            canvas.drawOval(mBackgroundBounds, mBackgroundPaint);
            canvas.drawText(mInitial, mBackgroundBounds.centerX(), textBottom, mTextPaint);
            drawStroke(canvas);
            drawHighlight(canvas);
        } else {
            super.onDraw(canvas);
        }
    }
    // ...
}
```
