import * as React from 'react'

const BUNDLE = 'https://d1gl9sutig2omm.cloudfront.net/widget/v2/bundle.mjs'
const API_URL = 'https://732ym936tl.execute-api.eu-central-1.amazonaws.com'

export default function ChatBotEmbed() {
  React.useEffect(() => {
    let handle: { destroy: () => void } | undefined
    let cancelled = false

    import(/* webpackIgnore: true */ /* turbopackIgnore: true */ BUNDLE)
      .then(({ load }) =>
        load({
          api: API_URL,
          bot: 'vlad-murin'
        })
      )
      .then((h) => {
        if (cancelled) h.destroy()
        else handle = h
      })
      .catch((e) => console.error('[chat-widget]', e))

    return () => {
      cancelled = true
      handle?.destroy()
    }
  }, [])

  return null
}
