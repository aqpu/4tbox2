// data/tools.ts

export type ToolCategoryId =
  | "text"
  | "dev"
  | "encode"
  | "network"
  | "security"
  | "calculators";

export type ToolStatus = "stable" | "beta" | "soon";

export type ToolDefinition = {
  id: string;
  name: string;
  slug: string;
  category: ToolCategoryId;
  tag?: string;
  status?: ToolStatus;
  featured?: boolean;
  descriptionShort: string;
  descriptionLong?: string;
  keywords?: string[];
};

export const TOOLS: ToolDefinition[] = [
  {
    id: "word-counter",
    name: "Word Counter",
    slug: "/tools/text/word-counter",
    category: "text",
    tag: "TXT",
    status: "stable",
    featured: true,
    descriptionShort:
      "Count words, characters, lines and estimated reading time as you type.",
    keywords: ["word counter", "character counter", "reading time"],
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    slug: "/tools/text/text-case-converter",
    category: "text",
    tag: "CASE",
    status: "stable",
    featured: true,
    descriptionShort:
      "Convert text to lower, UPPER, Title Case, sentence case, snake_case, camelCase and more.",
    keywords: [
      "text case converter",
      "uppercase",
      "lowercase",
      "title case",
      "snake case",
      "camel case",
    ],
  },
  {
    id: "text-diff-checker",
    name: "Text Diff Checker",
    slug: "/tools/text/text-diff",
    category: "text",
    tag: "DIFF",
    status: "stable",
    featured: true,
    descriptionShort:
      "Compare two pieces of text side by side and highlight the differences.",
    keywords: ["text diff", "diff checker", "compare text"],
  },

  // DEV
  {
    id: "json-formatter",
    name: "JSON Formatter",
    slug: "/tools/dev/json-formatter",
    category: "dev",
    tag: "JSON",
    status: "stable",
    featured: true,
    descriptionShort:
      "Format, validate and pretty-print JSON online, or minify it in one click.",
    keywords: ["json formatter", "json validator", "pretty print json"],
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "/tools/dev/regex-tester",
    category: "dev",
    tag: "REGEX",
    status: "beta",
    featured: true,
    descriptionShort:
      "Test and debug regular expressions live against sample text.",
    keywords: ["regex tester", "regex online", "javascript regex"],
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    slug: "/tools/dev/jwt-decoder",
    category: "dev",
    tag: "JWT",
    status: "beta",
    featured: true,
    descriptionShort:
      "Decode JSON Web Tokens (JWT) in your browser and inspect header and payload.",
    keywords: ["jwt decoder", "decode jwt", "jwt token"],
  },

  // ENCODE
  {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    slug: "/tools/encode/base64",
    category: "encode",
    tag: "B64",
    status: "stable",
    featured: true,
    descriptionShort: "Encode and decode Base64 strings directly in your browser.",
  },
  {
    id: "url-encoder-decoder",
    name: "URL Encoder / Decoder",
    slug: "/tools/encode/url",
    category: "encode",
    tag: "URL",
    status: "stable",
    featured: true,
    descriptionShort: "Encode or decode URLs and query strings safely.",
  },

  // SECURITY
  {
    id: "password-generator",
    name: "Password Generator",
    slug: "/tools/security/password-generator",
    category: "security",
    tag: "PWD",
    status: "stable",
    featured: true,
    descriptionShort:
      "Generate strong passwords with custom length and character sets.",
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    slug: "/tools/security/hash-generator",
    category: "security",
    tag: "HASH",
    status: "beta",
    featured: true,
    descriptionShort:
      "Generate MD5, SHA-1 or SHA-256 hashes for quick checks and verification.",
  },

  // NETWORK
  {
    id: "my-ip",
    name: "My IP",
    slug: "/tools/network/my-ip",
    category: "network",
    tag: "IP",
    status: "stable",
    featured: true,
    descriptionShort:
      "Check your IP address and basic browser / network information.",
  },

  // CALCULATORS
  {
    id: "reading-time",
    name: "Reading Time Estimator",
    slug: "/tools/calculators/reading-time",
    category: "calculators",
    tag: "READ",
    status: "stable",
    featured: true,
    descriptionShort: "Estimate how long a text takes to read.",
  },
];

export function getToolById(id: string) {
  return TOOLS.find((t) => t.id === id);
}

export function getToolsByCategory(category: ToolCategoryId) {
  return TOOLS.filter((t) => t.category === category);
}

export function getFeaturedTools() {
  return TOOLS.filter((t) => t.featured);
}
