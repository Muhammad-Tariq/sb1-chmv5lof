export async function loadGeoJSON(filePath: string) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load GeoJSON file: ${filePath}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
    throw error;
  }
}