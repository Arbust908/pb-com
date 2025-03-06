export const parseResponse = (response: string) => {
  // Split on pause markers first
  const parts = response.split(/\[pause\]/gi);
  
  return parts
    .map(part => 
      part
        .replace(/\[thinking\].*?\]/gi, '') // Remove thinking markers
        .trim()
    )
    .filter(part => part.length > 0);
};