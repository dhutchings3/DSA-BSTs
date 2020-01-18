// 1. Draw a BST
// Given the data 3,1,4,6,9,2,5,7, if you were to insert this into
//  an empty binary search tree, what would the tree look like? 
//  (Draw the tree, no coding needed here.)
// Draw the BST with the keys - E A S Y Q U E S T I O N


// 2. Remove the root
// Show how the above trees would look like if you deleted the root of each tree. 
// (Draw the trees, no coding needed here.)

// 3. Create a BST class
// Walk through the binary search tree code in the curriculum and understand
// it well. Then write a BinarySearchTree class with its core functions 
// (insert(), remove(), find()) from scratch.

// Create a binary search tree called BST and insert 3,1,4,6,9,2,5,7 into 
// your tree. Compare your result with the result from the 1st exercise.
// Create a binary search tree called BST and insert E A S Y Q U E S T I O N 
// into your tree. Compare your result with the result from the 1st exercise.

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
  
    insert(key, value) {
      // If the tree is empty then this key being inserted is the root node of the tree
      if (this.key == null) {
        this.key = key;
        this.value = value;
      } else if (key < this.key) {
        /* If the tree already exists, then start at the root,
          and compare it to the key you want to insert.
          If the new key is less than the node's key
          then the new node needs to live in the left-hand branch */
        if (this.left == null) {
          /* If the existing node does not have a left child,
              meaning that if the `left` pointer is empty,
              then we can just instantiate and insert the new node
              as the left child of that node, passing `this` as the parent */
          this.left = new BinarySearchTree(key, value, this);
        } else {
          /* If the node has an existing left child,
              then we recursively call the `insert` method
              so the node is added further down the tree */
          this.left.insert(key, value);
        }
      } else {
        /* Similarly, if the new key is greater than the node's key
      then you do the same thing, but on the right-hand side */
        if (this.right == null) {
          this.right = new BinarySearchTree(key, value, this);
        } else {
          this.right.insert(key, value);
        }
      }
    }
  
    find(key) {
      // If the item is found at the root then return that value
      if (this.key == key) {
        return this.value;
      }
      /* If the item you are looking for is less than the root
         then follow the left child.
         If there is an existing left child,
         then recursively check its left and/or right child
         until you find the item */
      else if (key < this.key && this.left) {
        return this.left.find(key);
      }
      /* If the item you are looking for is greater than the root
         then follow the right child.
         If there is an existing right child,
         then recursively check its left and/or right child
         until you find the item */
      else if (key > this.key && this.right) {
        return this.right.find(key);
      }
      // You have searched the tree and the item is not in the tree
      else {
        throw new Error('Key Error');
      }
    }
  
    remove(key) {
      if (this.key == key) {
        if (this.left && this.right) {
            const successor = this.right._findMin();
            this.key = successor.key;
            this.value = successor.value;
            successor.remove(successor.key);
        }
        /* If the node only has a left child,
            then you replace the node with its left child */
        else if (this.left) {
          this._replaceWith(this.left);
        }
        /* And similarly if the node only has a right child
            then you replace it with its right child */
        else if (this.right) {
          this._replaceWith(this.right);
        }
        /* If the node has no children then
            simply remove it and any references to it
            by calling "this._replaceWith(null)" */
        else {
          this._replaceWith(null);
        }
      }
      else if (key < this.key && this.left) {
        this.left.remove(key);
      }
      else if (key > this.key && this.right) {
        this.right.remove(key);
      }
      else {
        throw new Error('Key Error');
      }
    }
  
    _replaceWith(node) {
      if (this.parent) {
        if (this == this.parent.left) {
          this.parent.left = node;
        }
        else if (this == this.parent.right) {
          this.parent.right = node;
        }
  
        if (node) {
          node.parent = this.parent;
        }
      } else {
        if (node) {
          this.key = node.key;
          this.value = node.value;
          this.left = node.left;
          this.right = node.right;
        } else {
            this.key = null;
            this.value = null;
            this.left = null;
            this.right = null;
        }
      }
    }
  
    _findMin() {
      if (!this.left) {
        return this;
      }
      return this.left._findMin();
    }
  }
  
  module.exports = BinarySearchTree