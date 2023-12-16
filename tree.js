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
    let prev = null; // This snapshots the temp variable just before it traverses
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

  find(value) {
    let temp = this.root;
    while (temp !== null) {
      if (temp.data === value) { return temp; }
      if (value < temp.data) {
        temp = temp.left;
      }
      else {
        temp = temp.right;
      }
    }
    return false;
  }

  delete(value) {
    let prev = null; // This snapshots the temp variable just before it traverses
    let temp = this.root;
    // Traversal to get to the previous node just before null
    while (temp !== null) {
      if (value === temp.data) { break; }
      if (value < temp.data) {
        prev = temp;
        temp = temp.left;
      }
      else {
        prev = temp;
        temp = temp.right;
      }
    }
    // For leaf deletion, check if both right and left are null
    if (temp.left === null && temp.right === null) {
      if (prev.data > temp.data) {
        prev.left = null;
      }
      else {
        prev.right = null;
      }
    }
    // For single child deletion, check if either right or left child is null, and link parent to opposite side's grandchild
    // Do the same in #2, but take the minimum of the deleted node's children
  }
}

export default Tree;