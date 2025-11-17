// services/analytics.ts

// Define a função gtag no objeto window para o TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: object) => void;
  }
}

/**
 * Rastreia uma visualização de página no Google Analytics.
 * Deve ser chamado sempre que o usuário navegar para uma nova "página" na SPA.
 * @param path - O caminho da página (ex: '/quem-somos', '/planos').
 * @param title - O título da página (ex: 'Quem Somos').
 */
export const trackPageView = (path: string, title: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  } else {
    console.warn('Função gtag do Google Analytics não encontrada. Visualização de página não rastreada.');
  }
};

/**
 * Rastreia um evento customizado no Google Analytics.
 * @param action - O nome do evento (ex: 'search').
 * @param params - Um objeto de parâmetros para o evento (ex: { search_term: 'restaurante' }).
 */
export const trackEvent = (action: string, params: object) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  } else {
    console.warn(`Função gtag do Google Analytics não encontrada. Evento "${action}" não rastreado.`);
  }
};
