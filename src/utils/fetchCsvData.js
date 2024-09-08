import Papa from "papaparse";

export async function fetchCsvData(url) {
  const response = await fetch(url);
  const csv = await response.text(); // Read the entire CSV file as text
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      complete: (results) => {
        const normalizedData = results.data.map((product) => ({
          ...product,
          titlu: product.titlu?.trim(),
          categorie: product.categorie,
          brand: product.brand,
        }));
        resolve(normalizedData);
      },
      error: (error) => reject(error),
    });
  });
}
