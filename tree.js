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
    const mid = Math.floor((start + end) / 2);
    const root = new Node(this.array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    this.root = root; // Update tree object attribute
    return root;
  }

  insert(value) {
    const newNode = new Node(value);
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
      } else {
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
      } else {
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
      } else {
        prev = temp;
        temp = temp.right;
      }
    }
    // Leaf deletion
    if (temp.left === null && temp.right === null) {
      if (prev.data > temp.data) {
        prev.left = null;
      } else {
        prev.right = null;
      }
      return this.root;
    }
    // Double child deletion
    if (temp.left !== null && temp.right !== null) {
      // Search minimum value of a tree
      const min = function TreeMin(root) {
        if (root.left !== null) {
          TreeMin(root.left);
        }
        return root.data;
      };
      temp.data = min(temp.right);
      // Delete duplicate from right subtree
      temp.right = null;
      return this.root;
    }
    // Single child deletion
    if (temp.left !== null || temp.right !== null) {
      let childBranch = null;
      if (temp.left !== null) {
        childBranch = temp.left;
      } else {
        childBranch = temp.right;
      }
      if (prev.data > temp.data) {
        prev.left = childBranch;
      } else {
        prev.right = childBranch;
      }
      return this.root;
    }
    return false;
  }

  levelorder(root = this.root) {
    if (root === null) return;
    const traversed = [];
    const queue = [root];
    while (queue.length > 0) {
      const current = queue[0];
      traversed.push(current.data);
      if (current.left !== null) { queue.push(current.left); }
      if (current.right !== null) { queue.push(current.right); }
      queue.shift();
    }

    return traversed;
  }
}

export default Tree;
