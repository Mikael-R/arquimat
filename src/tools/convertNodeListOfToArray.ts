function convertNodeListOfToArray<T extends Node = any>(
  nodeListOf: NodeListOf<T>,
): T[] {
  return Array.prototype.slice.call(nodeListOf);
}

export default convertNodeListOfToArray;
