export const randomize = (numElements: number): number[] => {
  const numbers: number[] = [];
  const indexes : number[] = [];
  const randomized: number[] = [];

  for (let i = 0; i < numElements; i++) {
    indexes.push(i);
    numbers.push(i + 1);
  }

  while(indexes.length > 0) {
    const _rand = Math.floor(Math.random() * indexes.length);
    
    const _idx = indexes.splice(_rand, 1)[0];
    randomized.push(numbers[_idx]);
  }
  
  return randomized;
};
