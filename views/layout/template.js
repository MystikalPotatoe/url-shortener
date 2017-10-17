'use strict';

const template = function ({ body, title }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
};

export default template;