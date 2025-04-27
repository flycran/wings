function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function splitIntoParts<T>(arr: T[], rows = 3) {
  const shuffled = [...arr];
  shuffleArray(shuffled);

  const total = shuffled.length;
  const base = Math.floor(total / rows);
  const remainder = total % rows;

  const sizes = Array(rows)
    .fill(base)
    .map((val, index) => val + (index < remainder ? 1 : 0));

  // 修复关键错误：移除错误的 return
  const slicedParts = [];
  let currentIndex = 0;

  for (const size of sizes) {
    slicedParts.push(shuffled.slice(currentIndex, currentIndex + size));
    currentIndex += size;
  }

  return slicedParts; // 正确返回位置
}
