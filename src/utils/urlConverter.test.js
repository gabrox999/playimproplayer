import { describe, it, expect } from 'vitest'
import { convertToEmbedUrl, getPlayerType, getFileExtension } from './urlConverter'

describe('convertToEmbedUrl', () => {
  it('converts standard YouTube URL to embed URL', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    const result = convertToEmbedUrl(url)
    expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('converts youtu.be short URL to embed URL', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ'
    const result = convertToEmbedUrl(url)
    expect(result).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('returns YouTube embed URL unchanged', () => {
    const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    const result = convertToEmbedUrl(url)
    expect(result).toBe(url)
  })

  it('converts Spotify track URL to embed URL', () => {
    const url = 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp'
    const result = convertToEmbedUrl(url)
    expect(result).toBe('https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp')
  })

  it('converts Spotify playlist URL to embed URL', () => {
    const url = 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M'
    const result = convertToEmbedUrl(url)
    expect(result).toBe('https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M')
  })

  it('returns Spotify embed URL unchanged', () => {
    const url = 'https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp'
    const result = convertToEmbedUrl(url)
    expect(result).toBe(url)
  })

  it('returns original URL for non-convertible URLs', () => {
    const url = 'https://example.com/some-page'
    const result = convertToEmbedUrl(url)
    expect(result).toBe(url)
  })

  it('handles invalid URLs gracefully', () => {
    const url = 'not-a-valid-url'
    const result = convertToEmbedUrl(url)
    expect(result).toBe(url)
  })
})

describe('getPlayerType', () => {
  it('detects YouTube URLs', () => {
    expect(getPlayerType('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('youtube')
    expect(getPlayerType('https://youtu.be/dQw4w9WgXcQ')).toBe('youtube')
  })

  it('detects Spotify URLs', () => {
    expect(getPlayerType('https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp')).toBe('spotify')
  })

  it('detects local audio files', () => {
    expect(getPlayerType('file:///path/to/song.mp3')).toBe('local-audio')
    expect(getPlayerType('file:///path/to/song.wav')).toBe('local-audio')
    expect(getPlayerType('file:///path/to/song.ogg')).toBe('local-audio')
    expect(getPlayerType('file:///path/to/song.flac')).toBe('local-audio')
  })

  it('detects local video files', () => {
    expect(getPlayerType('file:///path/to/video.mp4')).toBe('local-video')
    expect(getPlayerType('file:///path/to/video.webm')).toBe('local-video')
    expect(getPlayerType('file:///path/to/video.mov')).toBe('local-video')
  })

  it('detects local paths without file:// protocol', () => {
    expect(getPlayerType('/Users/someone/music/song.mp3')).toBe('local-audio')
    expect(getPlayerType('/home/user/videos/movie.mp4')).toBe('local-video')
  })

  it('returns generic for unrecognized URLs', () => {
    expect(getPlayerType('https://example.com/some-page')).toBe('generic')
  })

  it('handles invalid URLs gracefully', () => {
    expect(getPlayerType('not-a-valid-url')).toBe('generic')
  })
})

describe('getFileExtension', () => {
  it('extracts file extension from URL', () => {
    expect(getFileExtension('file.mp3')).toBe('mp3')
    expect(getFileExtension('path/to/file.wav')).toBe('wav')
    expect(getFileExtension('https://example.com/audio.ogg')).toBe('ogg')
  })

  it('returns lowercase extension', () => {
    expect(getFileExtension('file.MP3')).toBe('mp3')
    expect(getFileExtension('VIDEO.MP4')).toBe('mp4')
  })

  it('handles files with multiple dots', () => {
    expect(getFileExtension('my.song.file.mp3')).toBe('mp3')
  })

  it('handles URLs without extension', () => {
    expect(getFileExtension('https://example.com/file')).toBe('com/file')
  })
})
