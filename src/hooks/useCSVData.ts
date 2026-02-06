import { useState, useEffect } from "react";

interface CSVParseOptions {
  hasHeader?: boolean;
}

export function useCSVData<T>(
  filePath: string,
  parser: (rows: string[][], headers: string[]) => T[],
  options: CSVParseOptions = { hasHeader: true }
): { data: T[]; loading: boolean; error: string | null } {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        setLoading(true);
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}`);
        }
        const text = await response.text();
        const lines = text.trim().split("\n");
        
        if (lines.length === 0) {
          setData([]);
          return;
        }

        const headers = options.hasHeader 
          ? lines[0].split(",").map(h => h.trim())
          : [];
        
        const dataLines = options.hasHeader ? lines.slice(1) : lines;
        const rows = dataLines.map(line => {
          // Handle CSV with commas inside quotes
          const values: string[] = [];
          let current = "";
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
              values.push(current.trim());
              current = "";
            } else {
              current += char;
            }
          }
          values.push(current.trim());
          return values;
        });

        const parsedData = parser(rows, headers);
        setData(parsedData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
  }, [filePath, parser, options.hasHeader]);

  return { data, loading, error };
}
