export const sortByWeight = (dogs, order) => {
    return [...dogs].sort((a, b) => {
      const weightA = a.weight?.metric ? parseInt(a.weight.metric.split(" ")[0]) : parseInt(a.weight);
      const weightB = b.weight?.metric ? parseInt(b.weight.metric.split(" ")[0]) : parseInt(b.weight);
  
      return order === "W-l" ? weightA - weightB : weightB - weightA;
    });
  };