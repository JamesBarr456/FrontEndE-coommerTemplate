// [1,2,3,4,5,..., 7]
// [1,2,3,...,48, 49, 50]
export const generatePaginationNumbers = (
    currentPage: number,
    totalPages: number,
  ) => {
    const items = [];
    let startPage = Math.max(1, currentPage - 2); // Ajuste inicial para centrarse alrededor de la página actual
    const endPage = Math.min(totalPages, startPage + 4); // Asegurarse de no exceder el total de páginas
  
    // Si la página actual está cerca del final, ajustamos el rango
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
  
    // Generar los números de las páginas
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }
  
    return items;
  };