---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: csharp
  language: .net-csharp
  name: .net-csharp
---

# Lab: Bridge Pattern

## Objective

In this lab exercise, we'll delve into the Bridge pattern.
In this lab, we will refactor an existing design to use the Bridge pattern, separating the source of video content from the mode of video playback.
By doing so, we will gain a practical understanding of how the Bridge pattern works and recognize scenarios where it can be beneficial.

## Provided Code

Carefully review the provided code. Notice that we have multiple classes (`StreamingVideoBackgroundPlayer`, `LocalVideoBackgroundPlayer`, etc.) which combine two concerns: the source of the video (streaming or local) and the mode of playback (background or full screen).

When we play videos in the background, we're not displaying any video and so would like to fetch audio-only to save bandwidth.
However, when playing in the foreground we of course want to fetch both audio and video.

```{code-cell}
interface IVideo
{
    public void ShowNextFrame();
}
```

```{code-cell}
class StreamingVideoBackgroundPlayer : IVideo
{
    public string Url { get; set; }

    public void ShowNextFrame()
    {
        Console.WriteLine($"Fetching next audio-only frame from: {Url}.");
        Console.WriteLine($"Playing audio-only frame in the background.");
    }
}
```

```{code-cell}
class LocalVideoBackgroundPlayer : IVideo
{
    public string FilePath { get; set; }

    public void ShowNextFrame()
    {
        Console.WriteLine($"Reading next audio-only frame from: {FilePath}.");
        Console.WriteLine($"Playing audio-only frame in the background.");
    }
}
```

```{code-cell}
class StreamingVideoFullScreenPlayer : IVideo
{
    public string Url { get; set; }

    public void ShowNextFrame()
    {
        Console.WriteLine($"Fetching next audio-video frame from: {Url}.");
        Console.WriteLine($"Showing audio-video frame in full screen.");
    }
}
```

```{code-cell}
class LocalVideoFullScreenPlayer : IVideo
{
    public string FilePath { get; set; }

    public void ShowNextFrame()
    {
        Console.WriteLine($"Fetching next audio-video frame from: {FilePath}.");
        Console.WriteLine($"Showing audio-video frame in full screen.");
    }
}
```

```{code-cell}
IVideo video1 = new StreamingVideoBackgroundPlayer() { Url = "https://example.com" };
IVideo video2 = new StreamingVideoFullScreenPlayer() { Url = "https://example.com" };
IVideo video3 = new LocalVideoBackgroundPlayer() { FilePath = "Movie.mp4" };
IVideo video4 = new LocalVideoFullScreenPlayer() { FilePath = "Movie.mp4" };

video1.ShowNextFrame();
video2.ShowNextFrame();
video3.ShowNextFrame();
video4.ShowNextFrame();
```

## Instructions

### Step 1: Define video source abstraction

Begin by defining the source of our video. This is where we'll fetch our video content from, be it streaming or local.

- Define an `IVideoSource` interface with methods to fetch the next audio frame, the next audio-video frame, and the next video frame. Consider using the signatures `Frame NextAudioOnlyFrame()`, `Frame NextVideoOnlyFrame()`, and `Frame NextAudioVideoFrame()`.

```{note}
You might want to introduce an empty class to represent the concept of a `Frame`.
```

### Step 2: Define concrete video sources

- Create two classes called `StreamingVideo` and `LocalVideo` which both implement the interface `IVideoSource`.
- Pay attention to the output of the original code and carefully consider how the members here should be implemented.

### Step 3: Define player abstraction

After having defined our video sources, let's establish a means of playing video.

- Defining an abstract class called `VideoPlayer` that serves as the "bridge" between our video source and the mode of playback.
- It should take an instance of `IVideoSource` in the constructor.

### Step 4: Define concrete players

- Create two classes called `BackgroundPlayer` and `FullScreenPlayer` that inherit from the class `VideoPlayer`.
- Pay attention to the output of the original code and carefully consider how the method here should be implemented.

### Step 5: Refactor Main Code

Finally, update the main code to utilize our new classes and interfaces. Ensure we use composition to combine a video source with a playback mode.
It should look something like this:

```{code-cell}
:tags: [remove-input]
class Frame { }

interface IVideoSource
{
    Frame NextAudioFrame();
    Frame NextAudioVideoFrame();
}

class StreamingVideo : IVideoSource
{
    public string Url { get; set; }

    public Frame NextAudioFrame()
    {
        Console.WriteLine($"Fetching next audio-only frame from {Url}");
        return new Frame();
    }

    public Frame NextAudioVideoFrame()
    {
        Console.WriteLine($"Fetching next audio-video frame from {Url}");
        return new Frame();
    }
}

class LocalVideo : IVideoSource
{
    public string FilePath { get; set; }

    public Frame NextAudioFrame()
    {
        Console.WriteLine($"Reading next audio-only frame from {FilePath}");
        return new Frame();
    }

    public Frame NextAudioVideoFrame()
    {
        Console.WriteLine($"Reading next audio-video frame from {FilePath}");
        return new Frame();
    }
}

abstract class VideoPlayer
{
    protected IVideoSource Source;

    public VideoPlayer(IVideoSource source)
        => Source = source;

    public abstract void PlayNextFrame();
}

class BackgroundPlayer : VideoPlayer
{
    public BackgroundPlayer(IVideoSource source)
        : base(source) { }

    public override void PlayNextFrame()
    {
        Frame frame = Source.NextAudioFrame();
        Console.WriteLine("Play audio-only frame in the background.");
    }
}

class FullScreenPlayer : VideoPlayer
{
    public FullScreenPlayer(IVideoSource source)
        : base(source) { }

    public override void PlayNextFrame()
    {
        Frame frame = Source.NextAudioVideoFrame();
        Console.WriteLine("Show audio-video frame in full screen.");
    }
}
```

```{code-cell}
IVideoSource streamingVideo = new StreamingVideo() { Url = "https://example.com" };
IVideoSource localVideo = new LocalVideo() { FilePath = "Movie.mp4" };

VideoPlayer player1 = new BackgroundPlayer(streamingVideo);
VideoPlayer player2 = new FullScreenPlayer(streamingVideo);
VideoPlayer player3 = new BackgroundPlayer(localVideo);
VideoPlayer player4 = new FullScreenPlayer(localVideo);

player1.PlayNextFrame();
player2.PlayNextFrame();
player3.PlayNextFrame();
player4.PlayNextFrame();
```


```{admonition} 🤔 Reflection
Think about the difference between the starting code and the refactored code. How does the bridge pattern provide flexibility? Would it be easy to add another source or playback mode now? Did we eliminate duplication?
```

## Challenge

1. Implement a new playback mode called `MutedPlayer`. This player should play the next video frame but without any audio.
2. Create an instance of `MutedPlayer` using the streaming video source and test playing the next frame.

```{admonition} 🤔 Reflection
Consider how easy or challenging it was to add a new playback mode after refactoring the code. How does the bridge pattern support extensibility in our design?
```

