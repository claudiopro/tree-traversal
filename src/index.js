/**
 * This function looks for a target node <code>x</code> in a tree with root node
 * <code>R</code>. The node <code>x</code> may or may not appear in the tree.
 * If it does appear, the function will return the list of indices of each node
 * in the path from the root node to <code>x</code> in the parent's collection of
 * child nodes.
 * If the function can't find <code>x</code>, it will return false after exploring
 * the entire tree with O(number of nodes) time complexity.
 *
 * Example
 *
 * The node x is present and is the second child of the first child of the root.
 * The return value of <code>find(R, x)</code> is <code>[0, 1]</code>.
 *
 *         R
 *        / \
 *       n1  n2
 *      / \   \
 *     n3  x   n4
 *    / \
 *   n5  n6
 *
 *
 * @param node R the reference to the root node. We assume each node in the tree has
 *      at least an array <code>children</code>, containing a list of its
 *      child nodes.
 * @param node x the reference to the node we want to find in the tree. It may or may
 *      not appear in the tree.
 * @returns Array<number>|false the function returns the path to the target node as
 *      a list of indices of each node in the path in the parent's collection of child
 *      nodes.
 */

function find(R, x) {
  // This variable holds the reference to the node we're currently traversing
  let node = R;
  // This variable holds the index of the child to explore in the node's
  // collection of children
  let index = 0;
  // This variable will hold a sequence of indices of nodes that represents
  // the path to the desired node x if found
  const path = [];
  // This variable is a stack to hold the list of nodes we're currently traversing.
  // The stack contains at any moment the sequence of nodes from the root to the
  // current node. When finding x, it will contain the sequence of nodes from the
  // root to x.
  const stack = [node];

  // If the node we're looking for is the root, return immediately
  if (R === x) {
    return path;
  }

  // If not, let's start accumulating nodes to inspect into a stack
  // Let's traverse the tree depth-first, that is, descending into
  // child nodes before looking at the siblings of the current node.
  while (stack.length > 0) {
    // If we still haven't traversed all children of the current node,
    // descend into the next child to compare it to x
    if (index < node.children.length) {
      // Push the parent node to the stack so we can backtrack when we
      // traversed all children
      stack.push(node);
      // Descend into the child at index
      node = node.children[index];
      // Tentatively add the child's index to the path
      path.push(index);
      // Reset the index to 0 to traverse the child's own child nodes
      index = 0;
      // If we found x, return the path
      if (node === x) {
        return path;
      }
    } else {
      // We have reached the bottom of the current subtree. Let's pop
      // the previous node from the stack...
      node = stack.pop();
      // ...and increment the index of the child node to explore, to
      // move to the adjacent subtree
      index = path.pop() + 1;
    }
  }

  // We could not find x in this tree, giving up
  return false;
}

module.exports = find;
