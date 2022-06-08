import "./assets/styles/main.scss";
import TreemapSvgRenderer from "./diagrams/treemap/TreemapSvgRenderer";
// import Tree from "./structs/tree/Tree";
// import TreeRenderer from "./structs/tree/TreeRenderer";

// import TreeRenderer from "./structs/tree/Tree";
// import BinTreeRenderer from "./structs/bintree/TreeRenderer";
// import BinTree from './structs/bintree/Tree';

// const binTree = new BinTree();
// binTree.set(2)
// binTree.set(3)
// binTree.set(-2)
// binTree.set(4)
// binTree.set(5)
// binTree.set(-12)
// binTree.set(3.5)
// binTree.set(-9);
// binTree.set(-8);
// binTree.set(3.4);
// binTree.set(3.3);
// binTree.set(-7);
// binTree.set(-6);
// binTree.set(3.2);
// binTree.set(3.1);
// binTree.set(3.09);
// binTree.set(2.5);
// binTree.set(2.4);
// binTree.set(2.3);
// binTree.set(2.2);
// binTree.set(2.1);
// binTree.set(2.5);
// binTree.set(2.6);
// binTree.set(2.7);
// binTree.set(2.8);
// binTree.set(3.35);
// binTree.set(3.08);
// binTree.set(3.07);
// binTree.set(3.06);
// binTree.set(3.05);
// binTree.set(3.04);
// binTree.set(3.08);
// binTree.set(3.07);
// binTree.set(3.06);
// binTree.set(3.05);
// binTree.set(3.04);
// binTree.set(3.03);
// binTree.set(3.02);
// binTree.set(3.01);
// binTree.set(2.4);
// binTree.set(2.3);
// binTree.set(2.1);
// binTree.set(2.2);
// binTree.walk((node, level) => console.log(node, level));
// const max = 20;
// for (let index = 0; index < max; index++) {
//     binTree.set(Math.floor(Math.random() * max));
// }
// const tr = new BinTreeRenderer(binTree, 'tree');
// tr.draw();


// const tree = new Tree()

// tree.root.set(32)
// tree.root.set(12)
// tree.root.set(5231)

// tree.root.children[0].set(942)

// const TR = new TreeRenderer(tree, 'tree')
// TR.draw();

const tmr = new TreemapSvgRenderer([6, 6, 4, 3, 2, 2, 1], "treemap")
    // const tmr = new TreemapSvgRenderer([6], "treemap")
tmr.draw()