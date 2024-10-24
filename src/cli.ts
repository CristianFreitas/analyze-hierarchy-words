import fs from "fs";
import { performance } from "perf_hooks";

interface Hierarchy {
  [key: string]: any;
}

function loadHierarchy(): { hierarchy: Hierarchy; loadTime: number } {
  const start = performance.now();
  const data = fs.readFileSync("dicts/hierarchy.json", "utf-8");
  const hierarchy = JSON.parse(data);
  const loadTime = performance.now() - start;
  return { hierarchy, loadTime };
}

function findWordsAtDepth(hierarchy: Hierarchy, depth: number, words: string[]): { [key: string]: number } {
  const result: { [key: string]: number } = {};

  function traverse(node: any, currentDepth: number) {
    if (Array.isArray(node)) {
      node.forEach((item: string) => {
        words.forEach(word => {
          const lowerCaseItem = normalizeString(item);
          const lowerCaseWord = normalizeString(word);
          if (lowerCaseItem === lowerCaseWord) {
            result[word] = (result[word] || 0) + 1;
          }
        });
      });
    } else if (typeof node === 'object' && currentDepth <= depth) {
      for (const key in node) {
        words.forEach(word => {
          const lowerCaseKey = normalizeString(key);
          const lowerCaseWord = normalizeString(word);
          if (lowerCaseKey === lowerCaseWord) {
            result[word] = (result[word] || 0) + 1;
          }
        });
        traverse(node[key], currentDepth + 1);
      }
    }
  }

  traverse(hierarchy, 0);
  return result;
}

function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentuações
    .toLowerCase()
    .trim();
}

function preprocessPhrase(phrase: string, compoundWords: string[]): string {
  let processedPhrase = phrase;
  compoundWords.forEach(compoundWord => {
    const normalizedCompound = normalizeString(compoundWord);
    const regex = new RegExp(`\\b${normalizedCompound.replace(/\s+/g, '\\s+')}\\b`, 'gi');
    processedPhrase = processedPhrase.replace(regex, compoundWord.replace(/\s/g, '_')); // Substitui espaços por underscore temporariamente para nao quebrar as palavras compostas
  });
  return processedPhrase;
}

export function analyzePhrase(phrase: string, depth: number, verbose: boolean) {
  const { hierarchy, loadTime } = loadHierarchy();

  // Palavras compostas mapeadas
  const compoundWords = ["polo aquatico", "copa do mundo", "champions league", "react native"];

  const preprocessedPhrase = preprocessPhrase(phrase, compoundWords);

  const cleanWords = preprocessedPhrase
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.replace(/_/g, ' '));

  const start = performance.now();
  const results = findWordsAtDepth(hierarchy, depth, cleanWords);
  const analysisTime = performance.now() - start;

  if (verbose) {
    console.log(`Tempo de carregamento dos parâmetros: ${loadTime}ms`);
    console.log(`Tempo de verificação da frase: ${analysisTime}ms`);
  }
  console.log(results)
  return results;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const depthIndex = args.indexOf("--depth");
  const depth = depthIndex !== -1 ? parseInt(args[depthIndex + 1], 10) : 0;
  const verbose = args.includes("--verbose");

  const phrase = args
    .filter(
      (arg) =>
        !arg.startsWith("--") && !arg.startsWith("-") && isNaN(Number(arg))
    )
    .join(" ");

  analyzePhrase(phrase, depth, verbose);
}
