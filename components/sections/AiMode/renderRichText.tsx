import type { ReactNode } from 'react';

interface TableData {
  headers: string[];
  rows: string[][];
}

function parseTable(lines: string[]): TableData | null {
  if (lines.length < 3) return null;
  const headerCells = lines[0].split('|').map((c) => c.trim()).filter(Boolean);
  const separatorLine = lines[1];
  if (!separatorLine.includes('---')) return null;
  const rows = lines.slice(2).map((line) =>
    line.split('|').map((c) => c.trim()).filter(Boolean),
  );
  return { headers: headerCells, rows };
}

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={match.index}>{match[1]}</strong>);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function renderRichText(content: string): ReactNode[] {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Table detection
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1]?.includes('---')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const table = parseTable(tableLines);
      if (table) {
        elements.push(
          <table key={`table-${i}`}>
            <thead>
              <tr>
                {table.headers.map((h, hi) => (
                  <th key={hi}>{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>,
        );
        continue;
      }
    }

    // Unordered list items
    if (line.trimStart().startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith('- ')) {
        items.push(lines[i].trimStart().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`}>
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Heading (bold line that starts a section)
    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
      elements.push(
        <p key={`h-${i}`}>
          <strong>{line.slice(2, -2)}</strong>
        </p>,
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(<p key={`p-${i}`}>{renderInline(line)}</p>);
    i++;
  }

  return elements;
}
