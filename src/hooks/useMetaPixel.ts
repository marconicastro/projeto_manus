import { useEffect } from 'react';

export const useMetaPixel = () => {
  useEffect(() => {
    // Verifica se estamos no lado do cliente
    if (typeof window !== 'undefined') {
      // Inicializa o Facebook Pixel
      !(function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      // Substitua 'SEU_PIXEL_ID' pelo seu ID real do pixel
      fbq('init', '68aef5df7fe9644ed8977c6d');
      fbq('track', 'PageView');
    }
  }, []);
};
