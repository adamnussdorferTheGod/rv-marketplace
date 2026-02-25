export function generatePdf(element: HTMLElement): void {
  // Clone the content into a print-friendly iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    window.print();
    return;
  }

  // Copy stylesheets
  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n');
      } catch {
        // Cross-origin stylesheets
        if (sheet.href) {
          return `@import url("${sheet.href}");`;
        }
        return '';
      }
    })
    .join('\n');

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Walk-In Deal Kit</title>
        <style>
          ${styles}
          @media print {
            body { margin: 0; padding: 16px; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          }
        </style>
      </head>
      <body>${element.innerHTML}</body>
    </html>
  `);
  doc.close();

  // Wait for styles to load, then print
  iframe.contentWindow?.addEventListener('afterprint', () => {
    document.body.removeChild(iframe);
  });

  setTimeout(() => {
    iframe.contentWindow?.print();
    // Clean up after a delay (in case afterprint doesn't fire)
    setTimeout(() => {
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    }, 5000);
  }, 500);
}
