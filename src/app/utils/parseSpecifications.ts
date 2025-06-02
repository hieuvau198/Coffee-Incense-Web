// src\app\utils\parseSpecifications.ts

// Parse textarea "Tên: Giá trị" to { Tên: Giá trị }
export function parseSpecifications(input: string): Record<string, string> {
  if (!input) return {};
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .reduce((acc, line) => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) acc[key.trim()] = rest.join(':').trim();
      return acc;
    }, {} as Record<string, string>);
}

