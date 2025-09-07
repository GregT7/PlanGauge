// tests/connectionTest.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import connectionTest from "../utils/connectionTest"

// Mock `sonner` to capture toast calls
vi.mock('sonner', () => {
  const success = vi.fn()
  const error = vi.fn()
  return { toast: { success, error } }
})
import { toast } from 'sonner'

// Helper to build a fake fetch response
const mkResp = (ok, body = { ok }) => ({
  ok,
  json: async () => body,
})

describe('connectionTest()', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  it('shows success when Flask, DB, and Notion are all OK', async () => {
    // Order: Flask → Supabase → Notion
    global.fetch = vi.fn()
      .mockResolvedValueOnce(mkResp(true, { service: 'flask', ok: true }))
      .mockResolvedValueOnce(mkResp(true, { service: 'db', ok: true }))
      .mockResolvedValueOnce(mkResp(true, { service: 'notion', ok: true }))

    await connectionTest()

    expect(toast.error).not.toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalledTimes(1)
    expect(toast.success).toHaveBeenCalledWith('All systems are online!')
  })

  it('shows Flask error and stops when Flask is NOT ok', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce(mkResp(false, { service: 'flask', ok: false }))

    await connectionTest()

    expect(toast.error).toHaveBeenCalledWith('Flask is currently inaccessible...')
    // Should not even attempt DB/Notion fetches
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('shows DB error when Supabase is NOT ok (but Flask ok); no success toast', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce(mkResp(true, { service: 'flask', ok: true }))   // Flask
      .mockResolvedValueOnce(mkResp(false, { service: 'db', ok: false }))    // DB
      .mockResolvedValueOnce(mkResp(true, { service: 'notion', ok: true }))  // Notion

    await connectionTest()

    expect(toast.error).toHaveBeenCalledWith('Database (Supabase) is currently unavailable...')
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('shows Notion error when Notion is NOT ok (Flask & DB ok); no success toast', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce(mkResp(true, { service: 'flask', ok: true }))   // Flask
      .mockResolvedValueOnce(mkResp(true, { service: 'db', ok: true }))      // DB
      .mockResolvedValueOnce(mkResp(false, { service: 'notion', ok: false }))// Notion

    await connectionTest()

    expect(toast.error).toHaveBeenCalledWith('Notion is currently unavailable...')
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('shows internal error toast when fetch throws', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('boom'))

    await connectionTest()

    expect(toast.error).toHaveBeenCalledWith('Internal error! App may not be fully functional...')
    expect(toast.success).not.toHaveBeenCalled()
  })
})
