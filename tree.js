import Node from './node.js';

class Tree {
  constructor(array) {
    this.array = array;
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2)
    let root = new Node(this.array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }
}

export default Tree;