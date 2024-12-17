export const range = (start, end, step = 1) => {
    const array = [];
    if (typeof end === "undefined") {
      end = start;
      start = 0;
    }
    for (let i = start; i <= end; i += step) {
      array.push(i);
    }
    return array;
  };

  export const paginate = ({ currentPage, totalNumberOfPages }) => {
    const startPage = Math.max(currentPage - 4, 1);
    const endPage = Math.min(currentPage + 4, totalNumberOfPages);
    return range(startPage, endPage);
  };