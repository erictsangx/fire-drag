interface Browser {
  storage: {
    local: {
      set: (payload: Record<string, any>) => Promise<void>
      get: (key: string) => Promise<Record<string, any>>
    },
  },
  runtime: {
    sendMessage: (payload: Record<string, any>) => Promise<void>
    onMessage: {
      addListener: (callback: (message: { type: string, content: string }) => void) => void
    }
  }
  tabs: {
    query: (payload: Record<string, any>) => Promise<any[]>
    create: (payload: Record<string, string>) => Promise<void>
  }
}

declare const browser: Browser