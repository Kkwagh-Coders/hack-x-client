const colorArray = [
  '#FF5733',
  '#33FF57',
  '#5733FF',
  '#33FFFF',
  '#FF33FF',
  '#FFFF33',
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FF0000', // Red
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#8A2BE2', // BlueViolet
  '#7FFF00', // Chartreuse
  '#1E90FF', // DodgerBlue
  '#FF1493', // DeepPink
  '#FFD700', // Gold
  '#008080', // Teal
];

function getRandomColor(index: number): string {
  const randomIndex = index % colorArray.length;
  return colorArray[randomIndex];
}

export default getRandomColor;
