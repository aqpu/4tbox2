// lib/tools-index.ts

export type ToolMeta = {
  id: string;
  name: string;
  path: string;
  category: string;
  subcategory: string;
  description: string;
  keywords: string[];
  aliases?: string[];
  popular?: boolean;
};

export const toolsIndex: ToolMeta[] = [
  // TEXT TOOLS
  {
    id: "word-counter",
    name: "Word Counter",
    path: "/tools/text/word-counter",
    category: "Text Tools",
    subcategory: "Basic",
    description: "Cuenta palabras, caracteres y velocidad de escritura.",
    keywords: ["word counter", "contador palabras", "texto", "wpm", "escritura"],
    aliases: ["contador de palabras", "wordcount"],
    popular: true,
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    path: "/tools/text/text-case-converter",
    category: "Text Tools",
    subcategory: "Basic",
    description: "Convierte texto a mayúsculas, minúsculas, título, etc.",
    keywords: ["mayúsculas", "minúsculas", "upper", "lower", "case"],
    aliases: ["cambiar mayusculas", "case converter"],
    popular: false,
  },
  {
    id: "remove-duplicates",
    name: "Remove Duplicates",
    path: "/tools/text/remove-duplicates",
    category: "Text Tools",
    subcategory: "Cleaning",
    description: "Elimina líneas duplicadas de una lista.",
    keywords: ["duplicados", "lista", "emails", "limpiar", "unique"],
    aliases: ["remove duplicate lines"],
    popular: true,
  },
  {
    id: "whitespace-remover",
    name: "Whitespace Remover",
    path: "/tools/text/whitespace-remover",
    category: "Text Tools",
    subcategory: "Cleaning",
    description: "Limpia espacios, tabs y líneas vacías.",
    keywords: ["espacios", "tabs", "whitespace", "limpiar", "texto"],
    aliases: ["space remover"],
    popular: false,
  },
  {
    id: "text-reverse",
    name: "Text Reverse",
    path: "/tools/text/text-reverse",
    category: "Text Tools",
    subcategory: "Transform",
    description:
      "Invierte texto por caracteres, palabras o en modo espejo, en tiempo real.",
    keywords: ["reverse", "invertir", "espejo", "text reverse"],
    aliases: ["reverse text", "texto al revés"],
    popular: true,
  },
  {
    id: "text-compare",
    name: "Text Compare",
    path: "/tools/text/text-compare",
    category: "Text Tools",
    subcategory: "Transform",
    description: "Compara dos textos y resalta diferencias línea por línea.",
    keywords: ["diff", "comparar", "texto", "changes", "compare"],
    aliases: ["text diff", "comparador de texto"],
    popular: true,
  },

  // DEVELOPER
  {
    id: "json-formatter",
    name: "JSON Formatter",
    path: "/tools/dev/json-formatter",
    category: "Developer Tools",
    subcategory: "Formatting",
    description: "Valida, formatea y minifica JSON, con opción de ordenar claves.",
    keywords: ["json", "formatter", "minify", "beautify", "dev"],
    aliases: ["pretty json", "json beautifier"],
    popular: true,
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    path: "/tools/dev/uuid-generator",
    category: "Developer Tools",
    subcategory: "Utilities",
    description: "Genera múltiples UUID v4 listos para usar.",
    keywords: ["uuid", "id", "random", "guid"],
    aliases: ["uuid generator"],
    popular: false,
  },
  {
    id: "regex-tester",
    name: "Regex Tester",
    path: "/tools/dev/regex-tester",
    category: "Developer Tools",
    subcategory: "Utilities",
    description: "Prueba expresiones regulares con flags y texto resaltado.",
    keywords: ["regex", "expresiones regulares", "match", "search"],
    aliases: ["regex test", "tester regex"],
    popular: true,
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    path: "/tools/dev/jwt-decoder",
    category: "Developer Tools",
    subcategory: "Utilities",
    description: "Decodifica el header y payload de un token JWT.",
    keywords: ["jwt", "token", "auth", "decode"],
    aliases: ["decode jwt", "jwt viewer"],
    popular: true,
  },

  // ENCODE / DECODE
  {
    id: "base64",
    name: "Base64 Encoder / Decoder",
    path: "/tools/encode/base64",
    category: "Encode / Decode",
    subcategory: "Base64",
    description: "Codifica y decodifica texto en Base64.",
    keywords: ["base64", "encode", "decode", "codec"],
    aliases: ["base64 encoder", "base64 decoder"],
    popular: true,
  },
  {
    id: "url-encoder",
    name: "URL Encoder",
    path: "/tools/encode/url-encoder",
    category: "Encode / Decode",
    subcategory: "URL",
    description: "Codifica texto para usarlo en URLs.",
    keywords: ["url encode", "escape", "encoder"],
    aliases: [],
    popular: false,
  },
  {
    id: "url-decoder",
    name: "URL Decoder",
    path: "/tools/encode/url-decoder",
    category: "Encode / Decode",
    subcategory: "URL",
    description: "Decodifica texto de URLs.",
    keywords: ["url decode", "unescape", "decoder"],
    aliases: [],
    popular: false,
  },

  // SECURITY
  {
    id: "password-generator",
    name: "Password Generator",
    path: "/tools/security/password-generator",
    category: "Security",
    subcategory: "Passwords",
    description: "Genera contraseñas seguras con diferentes niveles.",
    keywords: ["password", "contraseña", "generator", "seguridad"],
    aliases: ["password maker"],
    popular: true,
  },

  // CONVERTERS
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    path: "/tools/converters/qr-code-generator",
    category: "Converters",
    subcategory: "Codes",
    description: "Genera códigos QR a partir de texto o URLs.",
    keywords: ["qr", "code", "generator", "qr code"],
    aliases: [],
    popular: false,
  },
  {
    id: "csv-json",
    name: "CSV ↔ JSON",
    path: "/tools/converters/csv-json",
    category: "Converters",
    subcategory: "Codes",
    description: "Convierte entre CSV y JSON.",
    keywords: ["csv", "json", "convert", "tabla", "datos"],
    aliases: ["csv to json", "json to csv"],
    popular: true,
  },

  // GENERATORS
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    path: "/tools/generators/lorem-ipsum",
    category: "Generators",
    subcategory: "Text",
    description: "Genera texto de relleno Lorem Ipsum.",
    keywords: ["lorem ipsum", "dummy text", "placeholder"],
    aliases: [],
    popular: false,
  },

  // NETWORK
  {
    id: "my-ip",
    name: "My IP",
    path: "/tools/network/my-ip",
    category: "Network",
    subcategory: "IP & Info",
    description: "Muestra tu IP pública y detalles básicos.",
    keywords: ["ip", "network", "public ip"],
    aliases: ["mi ip", "what is my ip"],
    popular: true,
  },

  // CALCULATORS
  {
    id: "word-density",
    name: "Word Density Calculator",
    path: "/tools/calculators/word-density",
    category: "Calculators",
    subcategory: "SEO / Text",
    description: "Calcula la densidad de palabras en un texto.",
    keywords: ["seo", "densidad", "keywords"],
    aliases: ["keyword density"],
    popular: false,
  },

  // SOCIAL / YOUTUBE
  {
    id: "youtube-ratio",
    name: "YouTube Views/Subs Ratio",
    path: "/tools/social/youtube-ratio",
    category: "Social / YouTube",
    subcategory: "Analytics",
    description: "Analiza la relación entre vistas, suscriptores y vídeos.",
    keywords: ["youtube", "ratio", "views", "subs", "canal"],
    aliases: ["youtube analytics", "views per sub"],
    popular: true,
  },
];
