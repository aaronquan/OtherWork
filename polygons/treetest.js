function treeTestInsertions(tree){
	tree.insert(2);
	tree.insert(5);
	tree.insert(-3);
	tree.insert(10);
	tree.insert(1);
	tree.insert(4);
	tree.insert(-4);
	tree.insert(3);
}

function testBST(){
	var bst = new BinarySearchTree();
	treeTestInsertions(bst);
	bst.printList();
	bst.printBFS();
	
	rotateTest();

}

function rotateTest(){
	var bst = new BinarySearchTree();
	bst.insert(1);
	bst.insert(3);
	bst.insert(0);
	bst.insert(-1);
	bst.insert(2);
	bst.insert(4);
	bst.rotateRight(1);
	bst.printList();
	bst.printBFS();
}


function test23Tree(){
	var ttt = new twoThreeTree();
	treeTestInsertions(ttt);
}
