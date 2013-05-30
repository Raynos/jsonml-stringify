module.exports = escapeHTML

function escapeHTML(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&#x27;')
      .replace(/'/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

