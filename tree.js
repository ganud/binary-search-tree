import Node from './node.js';

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2)
    let root = new Node(this.array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    this.root = root; // Update tree object attribute
    return root;
  }

  insert(value) {
    let newNode = new Node(value);
    // if BST is empty set it as newNode
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let prev = null;
    let temp = this.root;
    // Traversal to get to the previous node just before null
    while (temp !== null) {
      if (value < temp.data) {
        prev = temp;
        temp = temp.left;
      }
      else {
        prev = temp;
        temp = temp.right;
      }
    }

    if (prev.data > value) prev.left = newNode;
    else prev.right = newNode;
  }
}

export default Tree;