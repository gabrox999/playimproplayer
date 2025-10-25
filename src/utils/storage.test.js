import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadResources, saveResources, loadPages, savePages, importData } from './storage'

describe('storage utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  describe('loadResources', () => {
    it('returns empty array when no resources are stored', () => {
      const result = loadResources()
      expect(result).toEqual([])
    })

    it('loads stored resources from localStorage', () => {
      const mockResources = [
        { id: 1, title: 'Test Song', url: 'https://example.com/song.mp3' }
      ]
      localStorage.setItem('music-resources', JSON.stringify(mockResources))

      const result = loadResources()
      expect(result).toEqual(mockResources)
    })

    it('returns empty array on parse error', () => {
      localStorage.setItem('music-resources', 'invalid-json')

      const result = loadResources()
      expect(result).toEqual([])
    })
  })

  describe('saveResources', () => {
    it('saves resources to localStorage', () => {
      const mockResources = [
        { id: 1, title: 'Test Song', url: 'https://example.com/song.mp3' }
      ]

      saveResources(mockResources)

      const stored = localStorage.getItem('music-resources')
      expect(JSON.parse(stored)).toEqual(mockResources)
    })

    it('handles save errors gracefully', () => {
      const mockError = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full')
      })

      expect(() => saveResources([{ id: 1 }])).not.toThrow()

      mockError.mockRestore()
    })
  })

  describe('loadPages', () => {
    it('returns default page when no pages are stored', () => {
      const result = loadPages()
      expect(result).toEqual([{
        id: 1,
        name: 'Page 1',
        icon: '🎵',
        color: '#3b82f6'
      }])
    })

    it('loads stored pages from localStorage', () => {
      const mockPages = [
        { id: 1, name: 'Rock', icon: '🎸', color: '#ff0000' },
        { id: 2, name: 'Jazz', icon: '🎷', color: '#0000ff' }
      ]
      localStorage.setItem('music-pages', JSON.stringify(mockPages))

      const result = loadPages()
      expect(result).toEqual(mockPages)
    })

    it('returns default page on parse error', () => {
      localStorage.setItem('music-pages', 'invalid-json')

      const result = loadPages()
      expect(result).toEqual([{
        id: 1,
        name: 'Page 1',
        icon: '🎵',
        color: '#3b82f6'
      }])
    })
  })

  describe('savePages', () => {
    it('saves pages to localStorage', () => {
      const mockPages = [
        { id: 1, name: 'Rock', icon: '🎸', color: '#ff0000' }
      ]

      savePages(mockPages)

      const stored = localStorage.getItem('music-pages')
      expect(JSON.parse(stored)).toEqual(mockPages)
    })
  })

  describe('importData', () => {
    it('imports new format with resources and pages', async () => {
      const mockData = {
        version: '1.0',
        resources: [{ id: 1, title: 'Song', pageId: 1 }],
        pages: [{ id: 1, name: 'Page 1' }]
      }
      const file = new File([JSON.stringify(mockData)], 'test.json', { type: 'application/json' })

      const result = await importData(file)

      expect(result.resources).toEqual(mockData.resources)
      expect(result.pages).toEqual(mockData.pages)
    })

    it('assigns resources without pageId to first page', async () => {
      const mockData = {
        version: '1.0',
        resources: [
          { id: 1, title: 'Song 1' }, // No pageId
          { id: 2, title: 'Song 2', pageId: 5 } // Has pageId
        ],
        pages: [{ id: 2, name: 'Page 1' }]
      }
      const file = new File([JSON.stringify(mockData)], 'test.json', { type: 'application/json' })

      const result = await importData(file)

      expect(result.resources[0].pageId).toBe(2) // First page id
      expect(result.resources[1].pageId).toBe(5) // Original pageId preserved
    })

    it('imports old format (just resources array)', async () => {
      const mockResources = [{ id: 1, title: 'Song' }]
      const file = new File([JSON.stringify(mockResources)], 'test.json', { type: 'application/json' })

      const result = await importData(file)

      expect(result.resources).toEqual([{ id: 1, title: 'Song', pageId: 1 }])
      expect(result.pages).toEqual([{
        id: 1,
        name: 'Page 1',
        icon: '🎵',
        color: '#3b82f6'
      }])
    })

    it('rejects invalid JSON', async () => {
      const file = new File(['invalid-json'], 'test.json', { type: 'application/json' })

      await expect(importData(file)).rejects.toThrow('Invalid JSON file')
    })

    it('handles missing resources and pages in new format', async () => {
      const mockData = { version: '1.0' }
      const file = new File([JSON.stringify(mockData)], 'test.json', { type: 'application/json' })

      const result = await importData(file)

      expect(result.resources).toEqual([])
      expect(result.pages).toEqual([{
        id: 1,
        name: 'Page 1',
        icon: '🎵',
        color: '#3b82f6'
      }])
    })
  })
})
