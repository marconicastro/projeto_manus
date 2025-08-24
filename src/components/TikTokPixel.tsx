'use client';

import { useEffect, Suspense, useState } from 'react';

function TikTokPixelContent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Função para carregar o script do TikTok Pixel
    const loadTikTokPixel = () => {
      if (typeof window !== 'undefined') {
        // Verificar se o ttq já foi inicializado
        if (!(window as any).ttq) {
          (function(w: any, d: any, t: string) {
            w.TiktokAnalyticsObject = t;
            const ttq = w[t] = w[t] || [];
            ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
            ttq.setAndDefer = function(t: any, e: string) {
              t[e] = function(...args: any[]) {
                t.push([e].concat(args));
              };
            };
            for (let i = 0; i < ttq.methods.length; i++) {
              ttq.setAndDefer(ttq, ttq.methods[i]);
            }
            ttq.instance = function(t: string) {
              const e = ttq._i[t] || [];
              for (let n = 0; n < ttq.methods.length; n++) {
                ttq.setAndDefer(e, ttq.methods[n]);
              }
              return e;
            };
            ttq.load = function(e: string, n?: any) {
              const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
              const o = n && n.partner;
              ttq._i = ttq._i || {};
              ttq._i[e] = [];D2L2MR3C77U9PLHEQBV0
              ttq._i[e]._u = r;
              ttq._t = ttq._t || {};
              ttq._t[e] = +new Date();
              ttq._o = ttq._o || {};
              ttq._o[e] = n || {};
              const scriptElement = document.createElement("script");
              scriptElement.type = "text/javascript";
              scriptElement.async = !0;
              scriptElement.src = r + "?sdkid=" + e + "&lib=" + t;
              const firstScript = document.getElementsByTagName("script")[0];
              firstScript.parentNode?.insertBefore(scriptElement, firstScript);
            };

            ttq.load('D2L2MR3C77U9PLHEQBV0');
            ttq.page();
          })(window, document, 'ttq');
        } else {
          // Se já estiver carregado, apenas track a página
          (window as any).ttq.page();
        }
      }
    };

    if (isClient) {
      loadTikTokPixel();
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return null; // TikTok Pixel não requer noscript fallback
}

export default function TikTokPixel() {
  return (
    <Suspense fallback={null}>
      <TikTokPixelContent />
    </Suspense>
  );
}
