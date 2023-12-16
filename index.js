import Tree from './tree.js';

let tree = new Tree([1, 4, 5, 6, 7, 8])
let start = 0;
let end = tree.array.length - 1;

let BST = tree.buildTree(tree.array, start, end)

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
tree.delete(8)
prettyPrint(tree.root);
