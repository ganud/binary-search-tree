import Node from './node.js';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }

  buildTree(array, start, end) {
    array.sort((a, b) => a - b);
    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    this.root = root; // Update tree object attribute
    return this.root;
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
    // While there are nodes left to visit
    while (queue.length > 0) {
      const current = queue[0]; // Get the most recent element of queue
      traversed.push(current.data); // Mark node as explored
      if (current.left !== null) { queue.push(current.left); } // Add possible explorations to queue
      if (current.right !== null) { queue.push(current.right); }
      queue.shift(); // Remove the explored node from queue
    }

    return traversed;
  }

  inOrder(root = this.root, traversed = []) {
    if (root === null) return;

    this.inOrder(root.left, traversed);
    traversed.push(root.data);
    this.inOrder(root.right, traversed);

    return traversed;
  }

  preOrder(root = this.root, traversed = []) {
    if (root === null) return;

    traversed.push(root.data);
    this.preOrder(root.left, traversed);
    this.preOrder(root.right, traversed);

    return traversed;
  }

  postOrder(root = this.root, traversed = []) {
    if (root === null) return;

    this.postOrder(root.left, traversed);
    this.postOrder(root.right, traversed);
    traversed.push(root.data);

    return traversed;
  }

  height(node) {
    if (node === null) { return -1; }
    // Get heights of left and right bsts
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    // Greater of the two heights
    return Math.max(leftHeight + 1, rightHeight + 1);
  }

  depth(node) {
    let temp = this.root;
    let distance = 0;
    while (temp !== null) {
      if (temp.data === node.data) { return distance; }
      if (node.data < temp.data) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
      distance++;
    }
  }

  isBalanced(node = this.root) {
    // Get heights of left and right bsts
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    // Greater of the two heights
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return true;
  }

  rebalance(root = this.root) {
    if (root === null) return;
    const inOrder = this.inOrder(root);
    root = this.buildTree(inOrder, 0, inOrder.length - 1);
  }
}

export default Tree;
