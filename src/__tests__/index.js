const find = require("..");

test("balanced tree, index > 0", () => {
	//
	//       R
	//      / \
	//     n1  n2
	//    / \   \
	//   n3  x   n4
	//  / \
	// n5  n6
	//

	const n4 = { label: "n4", children: [] };
	const n5 = { label: "n5", children: [] };
	const n6 = { label: "n6", children: [] };
	const x = { label: "x", children: [] };
	const n3 = { label: "n3", children: [n5, n6] };
	const n1 = { label: "n1", children: [n3, x] };
	const n2 = { label: "n2", children: [n4] };
	const R = { label: "R", children: [n1, n2] };

	const tree = R;

	expect(find(tree, x)).toEqual([0, 1]);
});

test("unbalanced tree, linear", () => {
	//
	//         R
	//        /
	//       n1
	//      /
	//     n2
	//    /
	//   n3
	//  /
	// x
  //

	const x = { label: "x", children: [] };
	const n3 = { label: "n3", children: [x] };
	const n2 = { label: "n2", children: [n3] };
	const n1 = { label: "n1", children: [n2] };
	const R = { label: "R", children: [n1] };

	const tree = R;

	expect(find(tree, x)).toEqual([0, 0, 0, 0]);
});

test("balanced tree, single level, two children, last child", () => {
	//
	//   R
	//  / \
	// n1  x
	//

	const x = { label: "x", children: [] };
	const n1 = { label: "n1", children: [] };
	const R = { label: "R", children: [n1, x] };

	const tree = R;
	expect(find(tree, x)).toEqual([1]);
});

test("balanced tree, single level, three children, last child", () => {
	//
	//    R
	//    |
	//   -+-
	//  / | \
	// n1 n2 x
	//

	const x = { label: "x", children: [] };
	const n2 = { label: "n2", children: [] };
	const n1 = { label: "n1", children: [] };
	const R = { label: "R", children: [n1, n2, x] };

	const tree = R;
	expect(find(tree, x)).toEqual([2]);
});

test("single level, single child", () => {
	//
	// R
	// |
	// x
	//

	const x = { label: "x", children: [] };
	const R = { label: "R", children: [x] };

	const tree = R;
	expect(find(tree, x)).toEqual([0]);
});

test("balanced tree, two levels, linear", () => {
	//
	// R
	// |
	// n1
	// |
	// x
	//

	const x = { label: "x", children: [] };
	const n1 = { label: "n1", children: [x] };
	const R = { label: "R", children: [n1] };

	const tree = R;
	expect(find(tree, x)).toEqual([0, 0]);
});

test("root node", () => {
	//
	// R===x
	//

	const x = { label: "x", children: [] };
	const R = x;

	const tree = R;

	expect(find(tree, x)).toEqual([]);
});

test("balanced tree, node missing", () => {
	//       R
	//      / \
	//     n1  n2
	//    / \   \
	//   n3  n4  n5
	//  / \
	// n6  n7

	const n4 = { label: "n4", children: [] };
	const n5 = { label: "n5", children: [] };
	const n6 = { label: "n6", children: [] };
	const n7 = { label: "n7", children: [] };
	const n3 = { label: "n3", children: [n6, n7] };
	const n1 = { label: "n1", children: [n3, n4] };
	const n2 = { label: "n2", children: [n5] };
	const x = { label: "x", children: [] };
	const R = { label: "R", children: [n1, n2] };

	const tree = R;

	expect(find(tree, x)).toBe(false);
});
