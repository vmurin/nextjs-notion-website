import React from 'react'

const ChatBotEmbed = () => {
    return (
      <script
      dangerouslySetInnerHTML={{
        __html: `
            (function(d, t) {
                var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                v.onload = function() {
                    window.voiceflow.chat.load({
                      verify: { projectID: '668172cc0adaae89c376f2f1' },
                      url: 'https://general-runtime.voiceflow.com',
                      versionID: 'production',
                      assistant: {
                        persistence: 'sessionStorage'
                      }
                    });
                }
                v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs"; v.type = "text/javascript"; s.parentNode.insertBefore(v, s);
                })(document, 'script');
        `
      }}
      />
    )
}
export default ChatBotEmbed;
