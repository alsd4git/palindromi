const DATA_URL = "data/palindromes.txt";

export function parsePalindromes(data) {
  if (typeof data !== "string") {
    throw new TypeError("Palindrome data must be a string.");
  }

  return data
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function filterPalindromes(palindromes, query) {
  const normalizedQuery = query.trim().toLocaleLowerCase("it-IT");

  if (!normalizedQuery) {
    return palindromes;
  }

  return palindromes.filter((palindrome) =>
    palindrome.toLocaleLowerCase("it-IT").includes(normalizedQuery),
  );
}

function matchesQuery(palindrome, query) {
  return filterPalindromes([palindrome], query).length === 1;
}

export function createPalindromeListItem(document, index, palindrome) {
  const item = document.createElement("li");
  const number = document.createElement("span");
  const text = document.createElement("span");

  number.className = "entry-number";
  number.textContent = `${index}.`;
  text.textContent = palindrome;
  item.append(number, text);

  return item;
}

export function renderPalindromes(document, list, palindromes) {
  const fragment = document.createDocumentFragment();

  palindromes.forEach(({ index, value }) => {
    fragment.append(createPalindromeListItem(document, index, value));
  });

  list.replaceChildren(fragment);
}

async function loadPalindromes() {
  const response = await fetch(DATA_URL);

  if (!response.ok) {
    throw new Error(`Unable to load palindrome data (${response.status}).`);
  }

  return parsePalindromes(await response.text());
}

export async function bootstrap(document) {
  const list = document.querySelector("#palindromes");
  const search = document.querySelector("#search");
  const results = document.querySelector("#results");
  const error = document.querySelector("#error");

  try {
    const palindromes = await loadPalindromes();

    const update = () => {
      const entries = palindromes
        .map((value, index) => ({ index: index + 1, value }))
        .filter(({ value }) => matchesQuery(value, search.value));

      renderPalindromes(document, list, entries);
      results.textContent = `${entries.length} di ${palindromes.length} palindromi`;
    };

    search.addEventListener("input", update);
    update();
  } catch (cause) {
    list.replaceChildren();
    error.hidden = false;
    error.textContent = "Impossibile caricare la raccolta. Riprova più tardi.";
    results.textContent = "Raccolta non disponibile.";
    console.error(cause);
  } finally {
    list.setAttribute("aria-busy", "false");
  }
}

if (typeof document !== "undefined") {
  void bootstrap(document);
}
