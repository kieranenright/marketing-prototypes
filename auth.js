(function() {
  var HASH = '957ba73084c59526e5cd6713ca6848eda6f01137a73da752aee4c9a9d263cae5';
  var KEY = 'hf-proto-auth';

  if (sessionStorage.getItem(KEY) === HASH) return;

  document.documentElement.style.overflow = 'hidden';

  var overlay = document.createElement('div');
  overlay.id = 'auth-gate';
  overlay.innerHTML = [
    '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#FAF8F3;position:fixed;inset:0;z-index:10000;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif">',
      '<div style="width:100%;max-width:380px;padding:0 24px;text-align:center">',
        '<img src="https://media.hellofresh.com/w_256,q_100,f_auto,c_limit,fl_lossy/hellofresh_website/logo/Hello_Fresh_Lockup.png" alt="HelloFresh" style="height:28px;margin-bottom:32px;opacity:0.7">',
        '<h2 style="font-size:20px;font-weight:700;color:#1D1D1D;margin-bottom:6px;letter-spacing:-0.02em">Internal Access</h2>',
        '<p style="font-size:14px;color:#6B6B6B;margin-bottom:28px;line-height:1.5">Enter the password to view prototypes.</p>',
        '<form id="auth-form" style="display:flex;flex-direction:column;gap:12px">',
          '<input id="auth-input" type="password" placeholder="Password" autocomplete="off" style="width:100%;padding:12px 16px;border:1px solid #E0D9CE;border-radius:10px;font-size:15px;font-family:inherit;background:#fff;outline:none;transition:border-color 0.2s">',
          '<button type="submit" style="width:100%;padding:12px 16px;border:none;border-radius:10px;font-size:14px;font-weight:600;font-family:inherit;background:#067A46;color:#fff;cursor:pointer;transition:background 0.2s">Continue</button>',
          '<p id="auth-error" style="font-size:13px;color:#DC2626;display:none;margin-top:4px">Incorrect password. Try again.</p>',
        '</form>',
      '</div>',
    '</div>'
  ].join('');

  document.body.appendChild(overlay);

  var input = document.getElementById('auth-input');
  var form = document.getElementById('auth-form');
  var error = document.getElementById('auth-error');

  input.focus();

  input.addEventListener('focus', function() {
    input.style.borderColor = '#067A46';
  });
  input.addEventListener('blur', function() {
    input.style.borderColor = '#E0D9CE';
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var val = input.value;
    crypto.subtle.digest('SHA-256', new TextEncoder().encode(val)).then(function(buf) {
      var hash = Array.from(new Uint8Array(buf)).map(function(b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
      if (hash === HASH) {
        sessionStorage.setItem(KEY, HASH);
        overlay.remove();
        document.documentElement.style.overflow = '';
      } else {
        error.style.display = 'block';
        input.value = '';
        input.focus();
        input.style.borderColor = '#DC2626';
      }
    });
  });
})();
