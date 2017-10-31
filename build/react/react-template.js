'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = function template(_ref) {
  var body = _ref.body,
      title = _ref.title;

  return '\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>' + title + '</title>\n      </head>\n      <body>\n        <div id="root">' + body + '</div>\n      </body>\n    </html>\n  ';
};

exports.default = template;