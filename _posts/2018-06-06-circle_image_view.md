---
layout: article
permalink: circle_image_view
title: "Creating Custom Circle Image View for Android"
key: 201806061
tags: Android Java Custom-View
comments: true
---

Hello, *this is my first post in english :smile: :clap:*, todays post is about writing a custom android view, which is circle image view.

The end result of this custom view would be something like in the below figure:

![fig1](/assets/images/civ/fig.gif){:.rounded}

<!--more-->

> If you just want to use the library go to the github repo and read the usage instructions.
> It is available [here](https://github.com/abdularis/CircularImageView)

This circle image view will have:
* Border drawn around the circle
* Highlight the circle when touched
* The image would be scaled, cropped and centered automatically
* Touch event only happened when we touched inside the circle

## The Whole Class Codes
Before we start, I want to show you the whole code first (see the github repo also), I might not explain all line by line you could understand it better by your self, in this article i'll explain the key things that I think important
{% highlight java %}
public class CircleImageView extends ImageView {

    private static final int DEF_PRESS_HIGHLIGHT_COLOR = 0x32000000;

    private Shader mBitmapShader;
    private Matrix mShaderMatrix;

    private RectF mBitmapDrawBounds;
    private RectF mStrokeBounds;

    private Bitmap mBitmap;

    private Paint mBitmapPaint;
    private Paint mStrokePaint;
    private Paint mPressedPaint;

    private boolean mInitialized;
    private boolean mPressed;
    private boolean mHighlightEnable;

    public CircleImageView(Context context) {
        this(context, null);
    }

    public CircleImageView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);

        int strokeColor = Color.TRANSPARENT;
        float strokeWidth = 0;
        boolean highlightEnable = true;
        int highlightColor = DEF_PRESS_HIGHLIGHT_COLOR;

        if (attrs != null) {
            TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.CircleImageView, 0, 0);

            strokeColor = a.getColor(R.styleable.CircleImageView_strokeColor, Color.TRANSPARENT);
            strokeWidth = a.getDimensionPixelSize(R.styleable.CircleImageView_strokeWidth, 0);
            highlightEnable = a.getBoolean(R.styleable.CircleImageView_highlightEnable, true);
            highlightColor = a.getColor(R.styleable.CircleImageView_highlightColor, DEF_PRESS_HIGHLIGHT_COLOR);

            a.recycle();
        }

        mShaderMatrix = new Matrix();
        mBitmapPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mStrokePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mStrokeBounds = new RectF();
        mBitmapDrawBounds = new RectF();
        mStrokePaint.setColor(strokeColor);
        mStrokePaint.setStyle(Paint.Style.STROKE);
        mStrokePaint.setStrokeWidth(strokeWidth);

        mPressedPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mPressedPaint.setColor(highlightColor);
        mPressedPaint.setStyle(Paint.Style.FILL);

        mHighlightEnable = highlightEnable;
        mInitialized = true;

        setupBitmap();
    }

    @Override
    public void setImageResource(@DrawableRes int resId) {
        super.setImageResource(resId);
        setupBitmap();
    }

    @Override
    public void setImageDrawable(@Nullable Drawable drawable) {
        super.setImageDrawable(drawable);
        setupBitmap();
    }

    @Override
    public void setImageBitmap(@Nullable Bitmap bm) {
        super.setImageBitmap(bm);
        setupBitmap();
    }

    @Override
    public void setImageURI(@Nullable Uri uri) {
        super.setImageURI(uri);
        setupBitmap();
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);

        float halfStrokeWidth = mStrokePaint.getStrokeWidth() / 2f;
        updateCircleDrawBounds(mBitmapDrawBounds);
        mStrokeBounds.set(mBitmapDrawBounds);
        mStrokeBounds.inset(halfStrokeWidth, halfStrokeWidth);

        updateBitmapSize();
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        boolean processed = false;
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                if (!isInCircle(event.getX(), event.getY())) {
                    return false;
                }
                processed = true;
                mPressed = true;
                invalidate();
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                processed = true;
                mPressed = false;
                invalidate();
                if (!isInCircle(event.getX(), event.getY())) {
                    return false;
                }
                break;
        }
        return super.onTouchEvent(event) || processed;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        drawBitmap(canvas);
        drawStroke(canvas);
        drawHighlight(canvas);
    }

    public boolean isHighlightEnable() {
        return mHighlightEnable;
    }

    public void setHighlightEnable(boolean enable) {
        mHighlightEnable = enable;
        invalidate();
    }

    @ColorInt
    public int getHighlightColor() {
        return mPressedPaint.getColor();
    }

    public void setHighlightColor(@ColorInt int color) {
        mPressedPaint.setColor(color);
        invalidate();
    }

    @ColorInt
    public int getStrokeColor() {
        return mStrokePaint.getColor();
    }

    public void setStrokeColor(@ColorInt int color) {
        mStrokePaint.setColor(color);
        invalidate();
    }

    @Dimension
    public float getStrokeWidth() {
        return mStrokePaint.getStrokeWidth();
    }

    public void setStrokeWidth(@Dimension float width) {
        mStrokePaint.setStrokeWidth(width);
        invalidate();
    }

    protected void drawHighlight(Canvas canvas) {
        if (mHighlightEnable && mPressed) {
            canvas.drawOval(mBitmapDrawBounds, mPressedPaint);
        }
    }

    protected void drawStroke(Canvas canvas) {
        if (mStrokePaint.getStrokeWidth() > 0f) {
            canvas.drawOval(mStrokeBounds, mStrokePaint);
        }
    }

    protected void drawBitmap(Canvas canvas) {
        canvas.drawOval(mBitmapDrawBounds, mBitmapPaint);
    }

    protected void updateCircleDrawBounds(RectF bounds) {
        float contentWidth = getWidth() - getPaddingLeft() - getPaddingRight();
        float contentHeight = getHeight() - getPaddingTop() - getPaddingBottom();

        float left = getPaddingLeft();
        float top = getPaddingTop();
        if (contentWidth > contentHeight) {
            left += (contentWidth - contentHeight) / 2f;
        } else {
            top += (contentHeight - contentWidth) / 2f;
        }

        float diameter = Math.min(contentWidth, contentHeight);
        bounds.set(left, top, left + diameter, top + diameter);
    }

    private void setupBitmap() {
        if (!mInitialized) {
            return;
        }
        mBitmap = getBitmapFromDrawable(getDrawable());
        if (mBitmap == null) {
            return;
        }

        mBitmapShader = new BitmapShader(mBitmap, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP);
        mBitmapPaint.setShader(mBitmapShader);

        updateBitmapSize();
    }

    private void updateBitmapSize() {
        if (mBitmap == null) return;

        float dx;
        float dy;
        float scale;

        // scale up/down with respect to this view size and maintain aspect ratio
        // translate bitmap position with dx/dy to the center of the image
        if (mBitmap.getWidth() < mBitmap.getHeight()) {
            scale = mBitmapDrawBounds.width() / (float)mBitmap.getWidth();
            dx = mBitmapDrawBounds.left;
            dy = mBitmapDrawBounds.top - (mBitmap.getHeight() * scale / 2f) + (mBitmapDrawBounds.width() / 2f);
        } else {
            scale = mBitmapDrawBounds.height() / (float)mBitmap.getHeight();
            dx = mBitmapDrawBounds.left - (mBitmap.getWidth() * scale / 2f) + (mBitmapDrawBounds.width() / 2f);
            dy = mBitmapDrawBounds.top;
        }
        mShaderMatrix.setScale(scale, scale);
        mShaderMatrix.postTranslate(dx, dy);
        mBitmapShader.setLocalMatrix(mShaderMatrix);
    }

    private Bitmap getBitmapFromDrawable(Drawable drawable) {
        if (drawable == null) {
            return null;
        }

        if (drawable instanceof BitmapDrawable) {
            return ((BitmapDrawable) drawable).getBitmap();
        }

        Bitmap bitmap = Bitmap.createBitmap(
                drawable.getIntrinsicWidth(),
                drawable.getIntrinsicHeight(),
                Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);

        return bitmap;
    }

    private boolean isInCircle(float x, float y) {
        // find the distance between center of the view and x,y point
        double distance = Math.sqrt(
                Math.pow(mBitmapDrawBounds.centerX() - x, 2) + Math.pow(mBitmapDrawBounds.centerY() - y, 2)
        );
        return distance <= (mBitmapDrawBounds.width() / 2);
    }
}
{% endhighlight %}

### Define custom view
Extend the `ImageView` class and define some fields to store the state and necessary things for drawing (rendering), also implement the required constructors. `CircleImageView(Context context)` constructor is the default constructor could be used when instantiating view programmatically, the second one used when we define view in the xml layout file.
{% highlight java %}
public class CircleImageView extends ImageView {
	public CircleImageView(Context context) {
        this(context, null);
    }

    public CircleImageView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
	}
}
{% endhighlight %}

### Define XML attributes
We need to specify what property we want to be able to customize using xml attributes, in this case we want to change stroke (border) color, set its width, enable/disable circle hightlight and specify the highlight color.
~~~xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <declare-styleable name="CircleImageView">
        <attr name="strokeColor" format="color"/>
        <attr name="strokeWidth" format="dimension"/>
        <attr name="highlightEnable" format="boolean"/>
        <attr name="highlightColor" format="color"/>
    </declare-styleable>
</resources>
~~~
### Define fields
Declare member fields that we will be working with globally in the class
{% highlight java %}
public class CircleImageView extends ImageView {

	private static final int DEF_PRESS_HIGHLIGHT_COLOR = 0x32000000;

	private Shader mBitmapShader;
    private Matrix mShaderMatrix;

    private RectF mBitmapDrawBounds;
    private RectF mStrokeBounds;

    private Bitmap mBitmap;

    private Paint mBitmapPaint;
    private Paint mStrokePaint;
    private Paint mPressedPaint;

    private boolean mInitialized;
    private boolean mPressed;
    private boolean mHighlightEnable;

    // ...
}
{% endhighlight %}

### Initialize fields
Initialize all fields we have defined above in the second contructor, when we specify this view attributes in xml layout file this constructor would be called with the AttributeSet parameter containing those xml attributes.
First check if the AttributeSet is not null, if true then query all defined attributes.
{% highlight java %}
public class CircleImageView extends ImageView {

    // ...
    // ...

    public CircleImageView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);

        int strokeColor = Color.TRANSPARENT;
        float strokeWidth = 0;
        boolean highlightEnable = true;
        int highlightColor = DEF_PRESS_HIGHLIGHT_COLOR;

        if (attrs != null) {
            TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.CircleImageView, 0, 0);

            strokeColor = a.getColor(R.styleable.CircleImageView_strokeColor, Color.TRANSPARENT);
            strokeWidth = a.getDimensionPixelSize(R.styleable.CircleImageView_strokeWidth, 0);
            highlightEnable = a.getBoolean(R.styleable.CircleImageView_highlightEnable, true);
            highlightColor = a.getColor(R.styleable.CircleImageView_highlightColor, DEF_PRESS_HIGHLIGHT_COLOR);

            a.recycle();
        }

        mShaderMatrix = new Matrix();
        mBitmapPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mStrokePaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mStrokeBounds = new RectF();
        mBitmapDrawBounds = new RectF();
        mStrokePaint.setColor(strokeColor);
        mStrokePaint.setStyle(Paint.Style.STROKE);
        mStrokePaint.setStrokeWidth(strokeWidth);

        mPressedPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mPressedPaint.setColor(highlightColor);
        mPressedPaint.setStyle(Paint.Style.FILL);

        mHighlightEnable = highlightEnable;
        mInitialized = true;

        setupBitmap();
	}
}
{% endhighlight %}

> I'll implement/explain `setupBitmap()` later

we want to initialize/prepare bitmap when it was set before using xml attribute of the `ImageView` by calling `setupBitmap()`.
we call `super(context, attrs)` above so bitmap could already been made available by `ImageView` when we call `setupBitmap()`.

### Preparing bitmap
Before drawing (rendering) it needs to prepare the bitmap and get ready to draw. `getBitmapFromDrawable(Drawable drawable)` method is responsible for converting the drawable into a `Bitmap`.
If the drawable is instance of `BitmapDrawable` cast it to Bitmap an return, if not we create bitmap ourselves and copy the drawable image content by using `Canvas` with the bitmap to draw into, finally draw drawable using `drawable.draw(canvas)` then return the bitmap.
{% highlight java %}
public class CircleImageView extends ImageView {

    // ...
    // ...

    private Bitmap getBitmapFromDrawable(Drawable drawable) {
        if (drawable == null) {
            return null;
        }

        if (drawable instanceof BitmapDrawable) {
            return ((BitmapDrawable) drawable).getBitmap();
        }

        Bitmap bitmap = Bitmap.createBitmap(
                drawable.getIntrinsicWidth(),
                drawable.getIntrinsicHeight(),
                Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);

        return bitmap;
    }
}
{% endhighlight %}

Implement methods to update the rectangle bounds where the circle would be drawn. `updateCircleDrawBounds(RectF bounds)` and call it in `onSizeChanged()` (we'll update bounds when size of this view changed)
{% highlight java %}
public class CircleImageView extends ImageView {

    // ...
    // ...

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        // ...

        updateCircleDrawBounds(mBitmapDrawBounds);

        // ...
    }

    protected void updateCircleDrawBounds(RectF bounds) {
        float contentWidth = getWidth() - getPaddingLeft() - getPaddingRight();
        float contentHeight = getHeight() - getPaddingTop() - getPaddingBottom();

        float left = getPaddingLeft();
        float top = getPaddingTop();

        // we'll center bounds by translating left/top
        // so that the rendered circle always in the center of view
        if (contentWidth > contentHeight) {
            left += (contentWidth - contentHeight) / 2f;
        } else {
            top += (contentHeight - contentWidth) / 2f;
        }

		// we want to make this bounds always square (aspect ratio of 1:1)
        float diameter = Math.min(contentWidth, contentHeight);
        bounds.set(left, top, left + diameter, top + diameter);
    }
}
{% endhighlight %}


Next,`setupBitmap()` method is used to setup the bitmap so it's ready to draw. First check if it's initialized or not. Use function we have implemeted above `getBitmapFromDrawable(getDrawable())` to get the bitmap with `getDrawable()` to get image view drawable.
We used `BitmapShader`, `Shader` is class that represent and return horizontal spans of color during drawing using a Paint object.`BitmapShader` is used to draw a texture (bitmap) on the area defined by the `Canvas` draw command using a Paint that `BitmapShader` is assign to.
`Shader.TileMode.CLAMP` Arguments in the `BitmapShader` constructor is tile mode and clamp means that we’d replicate/draw the edge color of the texture when it’s smaller than the area of the canvas that we can draw on.

{% highlight java %}
public class CircleImageView extends ImageView {

    // ...
    // ...

    private void setupBitmap() {
        if (!mInitialized) {
            return;
        }
        mBitmap = getBitmapFromDrawable(getDrawable());
        if (mBitmap == null) {
            return;
        }

        mBitmapShader = new BitmapShader(mBitmap, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP);
        mBitmapPaint.setShader(mBitmapShader);

        updateBitmapSize();
    }
}
{% endhighlight %}

> Notice we use `updateBitmapSize()` method, let's implement it

This method is used to resize (scale up/down) the bitmap in the `BitmapShader` based on the size of view while maintaining aspect ratio of bitmap. We use `Matrix` to transform (scale and translation) bitmap. This will a little bit more involved.
> More explanation is in the code

{% highlight java %}
public class CircleImageView extends ImageView {

    // ...
    // ...

    private void updateBitmapSize() {
        if (mBitmap == null) return;

		// trainslate bitmap in the BitmapShader using dx and dy so that it's centered
        float dx;
        float dy;

        // scale factor
        float scale;

        // scale up/down with respect to this view size and maintain aspect ratio
        // translate bitmap position with dx/dy to the center of the image
        //
        // check do we want to scale based on width or height
        if (mBitmap.getWidth() < mBitmap.getHeight()) {
        	// if bitmp with is less than its height, we wanna scale based on its width
            // assign scale factor based on difference (ratio) between bitmap width and bitmap draw bounds
            scale = mBitmapDrawBounds.width() / (float)mBitmap.getWidth();
            // because we know that the scale was based on width, the width would fit
            // exaclty with bounds, so we just translate x with its left padding
            dx = mBitmapDrawBounds.left;
            // we want to center y(height) axis of the scaled bitmap,
            // the logial way to see this is:
            // at the first state bitmap would rendered at the top left area
            // by translating with top padding of the view,
            // translate up by half of bitmap height (so center of bitmap now in the top of the view),
            // translate down by half of the bitmap bounds (so center of bitmap would be in the center of the view (bitmap bounds))
            dy = mBitmapDrawBounds.top - (mBitmap.getHeight() * scale / 2f) + (mBitmapDrawBounds.width() / 2f);
        } else {
        	// the same concept goes the same here, the difference is we
            // translate (center) horizontal axis instead of vertical/y axis
            scale = mBitmapDrawBounds.height() / (float)mBitmap.getHeight();
            dx = mBitmapDrawBounds.left - (mBitmap.getWidth() * scale / 2f) + (mBitmapDrawBounds.width() / 2f);
            dy = mBitmapDrawBounds.top;
        }

        // apply this transformation into shader matrix -> bitmap shader
        mShaderMatrix.setScale(scale, scale);
        mShaderMatrix.postTranslate(dx, dy);
        mBitmapShader.setLocalMatrix(mShaderMatrix);
    }
}
{% endhighlight %}

### Drawing
At this point so far we are ready to do some drawing :). The code is straighforward, so let's do that
{% highlight java %}
public class CircleImageView extends ImageView {

    // ...

	@Override
    protected void onDraw(Canvas canvas) {
        drawBitmap(canvas);
        drawStroke(canvas);
        drawHighlight(canvas);
    }

    // ...

	protected void drawHighlight(Canvas canvas) {
        if (mHighlightEnable && mPressed) {
            canvas.drawOval(mBitmapDrawBounds, mPressedPaint);
        }
    }

    protected void drawStroke(Canvas canvas) {
        if (mStrokePaint.getStrokeWidth() > 0f) {
            canvas.drawOval(mStrokeBounds, mStrokePaint);
        }
    }

    protected void drawBitmap(Canvas canvas) {
    	// we draw an oval shape using draw bounds that we have set to always square and it would draw a circle in it
        // also the bitmap paint is set with the bitmap shader so the color
        // of the shape is the bitmap itself
        canvas.drawOval(mBitmapDrawBounds, mBitmapPaint);
    }

    // ...
}
{% endhighlight %}
Override `onDraw()` method, it'll be called automatically by the framework when we call `invalidate()` or when it needs to be redrawn.

### Touch event
Override `onTouchEvent()` method to receive events when view is touched.
{% highlight java %}
public class CircleImageView extends ImageView {

    // ...

	@Override
    public boolean onTouchEvent(MotionEvent event) {
        boolean processed = false;
        switch (event.getAction()) {
            case MotionEvent.ACTION_DOWN:
                if (!isInCircle(event.getX(), event.getY())) {
                    return false;
                }
                processed = true;
                mPressed = true;
                invalidate();
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                processed = true;
                mPressed = false;
                invalidate();
                if (!isInCircle(event.getX(), event.getY())) {
                    return false;
                }
                break;
        }
        return super.onTouchEvent(event) || processed;
    }

	// ...

    private boolean isInCircle(float x, float y) {
        // find the distance between center of the view and x,y point
        double distance = Math.sqrt(
                Math.pow(mBitmapDrawBounds.centerX() - x, 2) + Math.pow(mBitmapDrawBounds.centerY() - y, 2)
        );
        return distance <= (mBitmapDrawBounds.width() / 2);
    }
}
{% endhighlight %}
`isInCircle()` method is used to check if the touch coordinate x,y inside the circle view (bitmap) that we have drawn, in other words it'll emit touch event when someone touch inside the circle not anywhere on the view.
