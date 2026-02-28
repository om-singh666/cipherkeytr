# 🔐 CipherKey — Smart Password Generator

> **Cybersecurity tool that transforms your keywords into ultra-secure passwords — with live strength analysis.**

🌐 **Live Site:** [https://om-singh666.github.io/cipherkey/](https://om-singh666.github.io/cipherkey/)

---

## ✨ Features

- **Live Strength Meter** — Real-time color-coded password strength as you type (Weak → Fair → Good → Fortress)
- **Smart Password Generator** — Takes your keywords and mutates them into a secure password using leet-speak substitutions + randomization
- **Side-by-Side Comparison** — Animated bars comparing your original vs. generated password strength
- **Crack Time Estimator** — Shows estimated brute-force time for both passwords
- **Customizable** — Control length (12–32 chars), uppercase, numbers, and symbols
- **One-click Copy** — Copy your generated password with a toast notification
- **Beautiful UI** — Cyberpunk dark theme with floating particles, animated gradient text, glassmorphism cards

---

## 🚀 How to Use

1. **Enter** your keywords or a base password in the input field
2. **Watch** the strength meter analyze your input in real time
3. **Click** "Generate Strong Password" to get a secure version
4. **Compare** your original vs. the generated password
5. **Copy** and use it wherever you need!

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| HTML5 | Structure & semantics |
| Vanilla CSS | Animations, glassmorphism, responsive layout |
| JavaScript (ES6+) | Logic, strength analysis, password generation |

No frameworks. No dependencies. Just pure web tech.

---

## 📂 Project Structure

```
cipherkey/
├── index.html   # Main page
├── style.css    # All styles & animations
├── app.js       # Password logic & UI interactions
└── README.md    # You're reading this!
```

---

## 🔒 How Strength is Calculated

The strength score (0–100) checks for:
- ✅ Lowercase letters
- ✅ Uppercase letters
- ✅ Numbers
- ✅ Special symbols
- ✅ Length ≥ 12 characters
- ✅ Length ≥ 18 characters
- ✅ No repeated character sequences
- ✅ Not a commonly known password

---

## 📸 Screenshot

> A beautiful dark cyberpunk UI with interactive strength indicators and side-by-side password comparison.

---

## 📄 License

MIT License — free to use, modify, and share.

---

<p align="center">Built with ❤️ for cybersecurity enthusiasts</p>
