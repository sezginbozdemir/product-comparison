import Papa from "papaparse";

export async function fetchCsvData(url) {
  const response = await fetch(url);
  const csv = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      header: true,
      complete: (results) => {
        const normalizedData = results.data.map((product) => ({
          ...product,
          category: product["Category"],
          brand: product["Manufacturer"],
          seller: product["Advertiser name"],
          productCode: product["Product code"],
          productName: product["Product name"]?.trim(),
          productUrl: product["Product affiliate"],
          productImg: product["Product picture"],
          productPrice: product["Price with VAT"],
          newPrice: product["Price with discount"],
        }));
        resolve(normalizedData);
      },
      error: (error) => reject(error),
    });
  });
}
