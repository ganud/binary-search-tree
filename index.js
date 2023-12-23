import Tree from './tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Driver script
const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
prettyPrint(tree.root);
console.log(`Tree balanced: ${tree.isBalanced()}`);
console.log(`Preorder: ${tree.preOrder()}`);
console.log(`Postorder: ${tree.postOrder()}`);
console.log(`Inorder: ${tree.inOrder()}`);
console.log('Performing unbalancing...');
tree.insert(312);
tree.insert(421);
tree.insert(560);
prettyPrint(tree.root);
console.log(`Tree balanced: ${tree.isBalanced()}`);
console.log('Rebalancing tree...');
tree.rebalance();
prettyPrint(tree.root);
console.log(`Tree balanced: ${tree.isBalanced()}`);
