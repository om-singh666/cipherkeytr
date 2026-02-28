// =============================================
//   CipherKey — App Logic
// =============================================

// ---- DOM References ----
const userPasswordInput = document.getElementById('userPassword');
const toggleVisibilityBtn = document.getElementById('toggleVisibility');
const eyeIcon = document.getElementById('eyeIcon');
const generateBtn = document.getElementById('generateBtn');
const originalStrengthSection = document.getElementById('originalStrengthSection');
const originalBar = document.getElementById('originalBar');
const originalBadge = document.getElementById('originalBadge');
const originalDetails = document.getElementById('originalDetails');
const resultCard = document.getElementById('resultCard');
const generatedPasswordEl = document.getElementById('generatedPassword');
const generatedBar = document.getElementById('generatedBar');
const generatedBadge = document.getElementById('generatedBadge');
const generatedDetails = document.getElementById('generatedDetails');
const copyBtn = document.getElementById('copyBtn');
const copyIcon = document.getElementById('copyIcon');
const regenerateBtn = document.getElementById('regenerateBtn');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const includeUpper = document.getElementById('includeUpper');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const originalCompareFill = document.getElementById('originalCompareFill');
const generatedCompareFill = document.getElementById('generatedCompareFill');
const originalScore = document.getElementById('originalScore');
const generatedScore = document.getElementById('generatedScore');
const crackTimeOriginal = document.getElementById('crackTimeOriginal');
const crackTimeGenerated = document.getElementById('crackTimeGenerated');
const toast = document.getElementById('toast');

// ---- Particles ----
(function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#00f5d4', '#7b5ea7', '#f72585', '#06d6a0', '#4cc9f0'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

// ---- Typing Animation ----
(function typingEffect() {
  const texts = [
    'Turn your words into',
    'Transform keywords into',
    'Forge your phrases into',
    'Convert ideas into',
  ];
  let idx = 0;
  let charIdx = 0;
  let deleting = false;
  const el = document.getElementById('typingText');
  if (!el) return;

  function tick() {
    const current = texts[idx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx--);
    } else {
      el.textContent = current.substring(0, charIdx++);
    }

    if (!deleting && charIdx > current.length) {
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }
    if (deleting && charIdx < 0) {
      deleting = false;
      idx = (idx + 1) % texts.length;
      setTimeout(tick, 400);
      return;
    }

    setTimeout(tick, deleting ? 45 : 85);
  }
  tick();
})();

// ---- Toggle Visibility ----
toggleVisibilityBtn.addEventListener('click', () => {
  const isPassword = userPasswordInput.type === 'password';
  userPasswordInput.type = isPassword ? 'text' : 'password';
  eyeIcon.textContent = isPassword ? '🙈' : '👁️';
});

// ---- Slider ----
lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

// ---- Password Strength Analysis ----
function analyzeStrength(pwd) {
  if (!pwd) return { score: 0, label: 'Empty', checks: [] };

  let score = 0;
  const checks = [];

  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  const hasSymbol = /[^a-zA-Z0-9]/.test(pwd);
  const isLong = pwd.length >= 12;
  const isVeryLong = pwd.length >= 18;
  const noRepeat = !/(.)\1{2,}/.test(pwd);
  const noCommon = !/(password|123456|qwerty|abc123|letmein|monkey|dragon|master|welcome)/i.test(pwd);

  if (hasLower) { score += 10; checks.push({ label: 'Lowercase ✓', pass: true }); }
  else { checks.push({ label: 'Lowercase ✗', pass: false }); }

  if (hasUpper) { score += 15; checks.push({ label: 'Uppercase ✓', pass: true }); }
  else { checks.push({ label: 'Uppercase ✗', pass: false }); }

  if (hasDigit) { score += 15; checks.push({ label: 'Numbers ✓', pass: true }); }
  else { checks.push({ label: 'Numbers ✗', pass: false }); }

  if (hasSymbol) { score += 20; checks.push({ label: 'Symbols ✓', pass: true }); }
  else { checks.push({ label: 'Symbols ✗', pass: false }); }

  if (isLong) { score += 15; checks.push({ label: '12+ chars ✓', pass: true }); }
  else { checks.push({ label: '12+ chars ✗', pass: false }); }

  if (isVeryLong) { score += 10; checks.push({ label: '18+ chars ✓', pass: true }); }

  if (noRepeat) { score += 10; checks.push({ label: 'No repeats ✓', pass: true }); }
  else { checks.push({ label: 'No repeats ✗', pass: false }); }

  if (noCommon) { score += 5; checks.push({ label: 'Not common ✓', pass: true }); }
  else { checks.push({ label: 'Common word ✗', pass: false }); }

  score = Math.min(score, 100);
  let label;
  if (score <= 25) label = 'Weak';
  else if (score <= 50) label = 'Fair';
  else if (score <= 75) label = 'Good';
  else label = 'Fortress';

  return { score, label, checks };
}

// ---- Estimated Crack Time ----
function estimateCrackTime(pwd) {
  if (!pwd) return '—';
  const charsetSize = (
    (/[a-z]/.test(pwd) ? 26 : 0) +
    (/[A-Z]/.test(pwd) ? 26 : 0) +
    (/\d/.test(pwd) ? 10 : 0) +
    (/[^a-zA-Z0-9]/.test(pwd) ? 32 : 0)
  ) || 26;

  const combinations = Math.pow(charsetSize, pwd.length);
  const guessesPerSecond = 1e10; // 10 billion guesses/sec (modern GPU)
  const secondsToCrack = combinations / guessesPerSecond / 2;

  if (secondsToCrack < 1) return '< 1 second';
  if (secondsToCrack < 60) return `${Math.round(secondsToCrack)} seconds`;
  if (secondsToCrack < 3600) return `${Math.round(secondsToCrack / 60)} minutes`;
  if (secondsToCrack < 86400) return `${Math.round(secondsToCrack / 3600)} hours`;
  if (secondsToCrack < 2.628e6) return `${Math.round(secondsToCrack / 86400)} days`;
  if (secondsToCrack < 3.156e7) return `${Math.round(secondsToCrack / 2.628e6)} months`;
  if (secondsToCrack < 3.156e9) return `${Math.round(secondsToCrack / 3.156e7)} years`;
  if (secondsToCrack < 3.156e12) return `${Math.round(secondsToCrack / 3.156e9)}K years`;
  if (secondsToCrack < 3.156e15) return `${Math.round(secondsToCrack / 3.156e12)}M years`;
  return '🔒 Centuries+';
}

// ---- Apply Strength UI ----
function applyStrengthUI(analysis, barEl, badgeEl, detailsEl) {
  const { score, label, checks } = analysis;

  // color
  let color;
  if (score <= 25) color = '#ff4d4d';
  else if (score <= 50) color = '#ffd166';
  else if (score <= 75) color = '#06d6a0';
  else color = '#00f5d4';

  barEl.style.width = score + '%';
  barEl.style.background = color;
  barEl.style.boxShadow = `0 0 10px ${color}`;

  badgeEl.textContent = label;
  badgeEl.className = 'strength-badge';
  if (score <= 25) badgeEl.classList.add('weak');
  else if (score <= 50) badgeEl.classList.add('fair');
  else if (score <= 75) badgeEl.classList.add('good');
  else badgeEl.classList.add('strong');

  // details tags
  detailsEl.innerHTML = '';
  checks.forEach(c => {
    const tag = document.createElement('span');
    tag.className = 'strength-tag ' + (c.pass ? 'pass' : 'fail');
    tag.textContent = c.label;
    detailsEl.appendChild(tag);
  });
}

// ---- Password Generation ----
function generateStrongPassword(base) {
  // Keep user's original input intact (their @ # 123 etc. stay!)
  const baseClean = (base || 'secure').replace(/\s+/g, '');

  // Step 1: Apply MINIMAL leet mutations — max 2 chars so word stays readable
  const leetMap = { 'o': '0', 'a': '@', 'e': '3', 'i': '1', 's': '$' };
  let mutated = '';
  let mutCount = 0;
  for (const ch of baseClean) {
    const lc = ch.toLowerCase();
    if (mutCount < 2 && leetMap[lc] && Math.random() < 0.55 && includeSymbols.checked) {
      mutated += leetMap[lc];
      mutCount++;
    } else {
      mutated += ch;
    }
  }

  // Step 2: Capitalize the first lowercase alpha — looks intentional
  let result = '';
  let capped = false;
  for (const ch of mutated) {
    if (!capped && /[a-z]/.test(ch) && includeUpper.checked) {
      result += ch.toUpperCase();
      capped = true;
    } else {
      result += ch;
    }
  }

  // Step 3: Add SHORT memorable booster — only what's missing
  const symOpts = ['!', '#', '@', '*'];
  const numOpts = ['7', '42', '9', '23', '99'];
  let booster = '';
  if (includeSymbols.checked && !/[!@#$%^&*_+\-=?]/.test(result))
    booster += symOpts[Math.floor(Math.random() * symOpts.length)];
  if (includeNumbers.checked && !/\d/.test(result))
    booster += numOpts[Math.floor(Math.random() * numOpts.length)];
  result += booster;

  // Step 4: If slider asks for more length, pad with a memorable word (NOT random junk)
  const desiredLength = parseInt(lengthSlider.value);
  if (result.length < desiredLength) {
    const memWords = ['Key', 'Pro', 'Max', 'One', 'Safe', 'Lock'];
    result += memWords[Math.floor(Math.random() * memWords.length)];
    if (result.length < desiredLength) {
      result += symOpts[Math.floor(Math.random() * symOpts.length)];
      result += numOpts[Math.floor(Math.random() * numOpts.length)];
    }
  }

  return result.slice(0, Math.max(result.length, desiredLength));
}

// ---- Live Strength on Input ----
userPasswordInput.addEventListener('input', () => {
  const val = userPasswordInput.value;
  if (val.length === 0) {
    originalStrengthSection.style.display = 'none';
    return;
  }
  originalStrengthSection.style.display = 'block';
  const analysis = analyzeStrength(val);
  applyStrengthUI(analysis, originalBar, originalBadge, originalDetails);
});

// ---- Generate Button ----
function runGenerate() {
  const base = userPasswordInput.value.trim();

  // Animate button
  generateBtn.disabled = true;
  generateBtn.querySelector('.btn-text').textContent = 'Forging... ⚡';

  setTimeout(() => {
    const generated = generateStrongPassword(base);
    generatedPasswordEl.textContent = generated;

    // Analyze both
    const origAnalysis = analyzeStrength(base || '');
    const genAnalysis = analyzeStrength(generated);

    // Apply strength UIs
    applyStrengthUI(genAnalysis, generatedBar, generatedBadge, generatedDetails);

    // Comparison
    const origPct = origAnalysis.score;
    const genPct = genAnalysis.score;
    originalCompareFill.style.width = '0%';
    generatedCompareFill.style.width = '0%';
    originalScore.textContent = origPct + '%';
    generatedScore.textContent = genPct + '%';

    requestAnimationFrame(() => {
      setTimeout(() => {
        originalCompareFill.style.width = origPct + '%';
        generatedCompareFill.style.width = genPct + '%';
      }, 100);
    });

    // Crack times
    crackTimeOriginal.textContent = estimateCrackTime(base || 'x');
    crackTimeGenerated.textContent = estimateCrackTime(generated);

    // Show result card
    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    generateBtn.disabled = false;
    generateBtn.querySelector('.btn-text').textContent = 'Generate Strong Password';
  }, 600);
}

generateBtn.addEventListener('click', runGenerate);
regenerateBtn.addEventListener('click', runGenerate);

// Enter key triggers generate
userPasswordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') runGenerate();
});

// ---- Copy Button ----
copyBtn.addEventListener('click', () => {
  const pwd = generatedPasswordEl.textContent;
  if (!pwd) return;
  navigator.clipboard.writeText(pwd).then(() => {
    copyIcon.textContent = '✅';
    showToast();
    setTimeout(() => { copyIcon.textContent = '📋'; }, 2000);
  });
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2500);
}
