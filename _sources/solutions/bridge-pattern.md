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

# Solution: Bridge Pattern

Here are example solutions to the code questions and reflection questions.

## Step 1: Define video source abstraction

```{code-cell}
class Frame { }

interface IVideoSource
{
    Frame NextAudioFrame();
    Frame NextAudioVideoFrame();
    Frame NextVideoFrame();
}
```

## Step 2: Define concrete video sources

```{code-cell}
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

    public Frame NextVideoFrame()
    {
        Console.WriteLine($"Fetching next video-only frame from {Url}");
        return new Frame();
    }
}
```

```{code-cell}
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
        Console.WriteLine($"Reading next audio/video frame from {FilePath}");
        return new Frame();
    }

    public Frame NextVideoFrame()
    {
        Console.WriteLine($"Reading next video-only frame from {FilePath}");
        return new Frame();
    }
}
```

## Step 3: Define player abstraction

```{code-cell}
abstract class VideoPlayer
{
    protected IVideoSource Source;

    public VideoPlayer(IVideoSource source)
        => Source = source;

    public abstract void PlayNextFrame();
}
```

## Step 4: Define concrete players

```{code-cell}
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

## Reflection 1

The bridge pattern has allowed us to decouple the source of the video from its playback mode. In the initial code, for each combination of source and playback, we had a separate class, leading to combinatorial explosion as new sources or modes are added. After refactoring, we can independently add new sources or playback modes without having to create new combinations for each.

The Bridge pattern indeed offers flexibility. Now, adding another source or playback mode would mean just extending our current structure, without duplicating the existing code. Yes, we eliminated the duplication of the logic related to where the video is coming from and how it is being played.

## Challenge

```{code-cell}
class MutedPlayer : VideoPlayer
{
    public MutedPlayer(IVideoSource source)
        : base(source) { }

    public override void PlayNextFrame()
    {
        Frame frame = Source.NextVideoFrame();
        Console.WriteLine("Show video frame with audio muted.");
    }
}
```

```{code-cell}
IVideoSource streamingVideoChallenge = new StreamingVideo() { Url = "https://example.com" };
VideoPlayer mutedPlayer = new MutedPlayer(streamingVideoChallenge);
mutedPlayer.PlayNextFrame();
```

## Reflection 2

After refactoring with the bridge pattern, adding a new playback mode was straightforward. We simply needed to define the behavior for this new mode without touching the source implementations. The bridge pattern has allowed us to extend our design with minimal changes, ensuring extensibility and reducing complexity.


