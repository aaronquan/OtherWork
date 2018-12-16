class Node{
	constructor(data, left=null, right=null){
		this.data = data;
		this.left = left;
		this.right = right;
	}
	insert(node){
		if(node.data < this.data){
			if(this.left === null){
				this.left = node;
			}else{
				this.left.insert(node);
			}
		}else{
			if(this.right === null){
				this.right = node;
			}else{
				this.right.insert(node);
			}
		}
	}
	//removes node and reconstructs tree
	remove(key){
		if(key < this.data){
			this.left = this.left.remove(key);
		}
		else if(key > this.data){
			this.right = this.right.remove(key);
		}else{
			//no children
			if(this.left === null && this.right === null){
				//this = null;
				return null;
			}
			//only right side
			else if(this.left === null){
				return this.right;
			}
			//only left side
			else if(this.right === null){
				return this.left;
			}else{
			//two children case
				var leftMostRight = this.right.findMin();
				this.data = leftMostRight.data;
				this.right = this.right.remove(leftMostRight.data);
			}
		}
		return this;
	}
	find(val){
		var current = this;
		while(current != null){
			if(current.data === val){
				return current;
			}
			else if(current.data > val){
				current = current.left;
			}
			else if(current.data < val){
				current = current.right;
			}
		}
		return null;

	}
	findMin(){
		if(this.left === null){
			return this;
		}
		return this.left.findMin();
	}
	orderedList(){
		if(this.left === null && this.right === null){
			return [this.data];
		}else if(this.left === null){
			return [this.data].concat(this.right.orderedList());
		}else if(this.right === null){
			return this.left.orderedList().concat([this.data]);
		}
		return this.left.orderedList().concat([this.data], this.right.orderedList());
	}
	//format (data, left, right)
	print(){
		if(this.left === null && this.right === null){
			return [this.data, null, null];
		}else if(this.left === null){
			return [this.data, null, this.right.print()];
		}else if(this.right === null){
			return [this.data, this.left.print(), null];
		}
		return [this.data, this.left.print(), this.right.print()];
	}
}

//binary search tree
class BinarySearchTree{
	constructor(){
		this.root = null;
	}
	insert(data){
		var node = new Node(data);
		if (this.root === null){
			this.root = node;
		}else{
			this.root.insert(node);
		}
	}
	remove(data){
		if(this.root === null){
			return;
		}
		this.root.remove(data);
	}
	search(val){
		return this.root.find(val)
	}
	nodesTo(val){
		var current = this.root;
		var nodeList = [];
		while(current != null){
			if(current.data === val){
				nodeList.unshift({'node':current, 'direction':null});
				return nodeList;
			}
			else if(current.data > val){
				nodeList.unshift({'node':current, 'direction':'l'});
				current = current.left;
			}
			else{
				nodeList.unshift({'node':current, 'direction':'r'});
				current = current.right;
			}
		}
		return null;
	}
	rotateLeft(val){
		//rotate steps
		//refer to https://www.youtube.com/watch?v=95s3ndZRGbk 1:56
		//create new node on right.left for left rotate (opposite for right rotate)
		//new node consists of, searched val, itself on opposite side, and node.left / right refer to diagram
		//shift node to right by using parent or root
		var nodeList = this.nodesTo(val);
		if(nodeList === null) return;
		var node = nodeList.shift()['node'];
		if(node.right === null) return;
		node.right.left = new Node(val, node.left, node.right.left);
		if(nodeList.length == 0){
			this.root = node.right;
		}else{
			var parent = nodeList.shift()
			if(parent['direction'] == 'l'){
				parent['node'].left = node.right;

			}else if(parent['direction'] == 'r'){
				parent['node'].right = node.right;
			}
		}
	}
	rotateRight(val){
		var nodeList = this.nodesTo(val);
		if(nodeList === null) return;
		var node = nodeList.shift()['node'];
		if(node.left === null) return;
		node.left.right = new Node(val, node.left.right, node.right);
		if(nodeList.length == 0){
			this.root = node.left;
		}else{
			var parent = nodeList.shift()
			if(parent['direction'] == 'l'){
				parent['node'].left = node.left;

			}else if(parent['direction'] == 'r'){
				parent['node'].right = node.left;
			}
		}
	}
	toList(){
		if(this.root === null){
			return [];
		}
		return this.root.orderedList();
	}
	printList(){
		console.log(this.toList());
	}
	printBFS(){
		if(this.root === null){
			console.log([]);
		}
		/*
		var q = [this.root];
		var nextNodes = [];
		var printLayer = [];
		while(q.length != 0){
			var curr = q.shift();
			printLayer.push(curr.data);
			if(curr.left != null){
				nextNodes.push(curr.left);
			}
			if(curr.right != null){
				nextNodes.push(curr.right);
			}
			if(q.length == 0){
				q = nextNodes;
				nextNodes = [];
				console.log(printLayer);
				printLayer = [];
			}
		}
		*/
		console.log(this.root.print());
	}
}

class TwoThreeTreeNode{
	constructor(data, left=null, right=null){
		this.data1 = data;
		this.left = left;
		this.right = right;
	}
	insert(val){}
	remove(val){}
	search(val){}
	hasChildren(){}
	getType(){}
}


class TwoNode extends TwoThreeTreeNode{
	constructor(data, left=null, right=null){
		super(data, left, right);
	}
	threeConvert(val){
		var threeNode;
		if(val > this.data1){
			threeNode = new ThreeNode(this.data1, val, this.left, null, this.right);
		}else{
			threeNode = new ThreeNode(val, this.data1, this.left, null, this.right);
		}
		return threeNode;
	}
	insertRight(val){
		if(this.right == null){
			return new ThreeNode(this.data1, val, this.left, null, null);
		}else if (val > this.right.data1){
			return null;
		}
		return new ThreeNode(this.data1, val, this.left, null, this.right);
	}
	insertLeft(val){
		if(this.left == null){
			return new ThreeNode(val, this.data1, null, null, this.right);
		}
		else if(val < this.left.data1){
			return null;
		}
		return new ThreeNode(val, this.data1, this.left, null, this.right);
	}
	hasChildren(){
		return (this.left == null || this.right == null)
	}
	getType(){
		return 'TwoNode';
	}

}

class ThreeNode extends TwoThreeTreeNode{
	constructor(d1, d2, left, middle, right){
		super(d1, left, right);
		this.data2 = d2;
		this.middle1 = middle;
		//this.data1 < this.data2
	}
	insertRight(val){
		if(this.right == null){
			if(this.hasChildren()){
				this.right = new TwoNode(val);
				return this;
			}
			else{
				return new FourNode(this.data1, this.data2, val);
			}
		}else if(this.right.getType() == 'TwoNode'){

		}
	}
	insertMiddle(val){
		if(this.middle1 == null){

		}
	}
	insertLeft(val){
		if(this.left == null){

		}
	}
	hasChildren(){
		return (this.left == null || this.middle1 == null || this.right == null);
	}
	getType(){
		return 'ThreeNode';
	}
}

class FourNode extends TwoThreeTreeNode{
	constructor(d1, d2, d3, left=null, mid1=null, mid2=null, right=null){
		super(d1, left, right);
		this.data2 = d2;
		this.data3 = d3;
		this.middle1 = mid1;
		this.middle2 = mid2;
	}
	splitNode(){

	}
	hasChildren(){
		return (this.left == null || this.middle1 == null || this.middle2 == null || this.right == null);
	}
	getType(){
		return 'FourNode';
	}
}

//2-3 node balanced tree implementation
class TwoThreeTree{
	constructor(){
		this.root = null;
		this.height = 0;
	}
	insert(val){
		if(this.root == null){
			this.root = new TwoNode(val);
			this.height++;
			return this.root;
		}else{
			var nodePath = this.root;
			var current = this.root;
			var insertNode = null;
			while(current != null){
				if(current.getType() == 'TwoNode'){
					if(val > current.data1){
						insertNode = current.insertRight(val);
						if(insertNode != null){
							current = insertNode; break;
						}
						current = current.right;
					}else{
						insertNode = current.insertLeft(val);
						if(insertNode != null){
							current = insertNode; break;
						}
						current = current.left;
					}
				}else if(current.getType() == 'ThreeNode'){
					if(val > current.data2){
						insertNode = current.insertRight(val);
						if(insertNode != null){
							current = insertNode; break;
						}
						current = current.right;
					}else if(val > current.data1){

					}else{

					}
				}else{
					//should be either 'TwoNode' or 'ThreeNode'
				}
				nodePath.append(current);
			}
		}
		return insertNode;
	}
}

class RedBlackTree{

}