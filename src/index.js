function find(R, x) {
	let node = R;
	let index = 0;
	const path = [];
	const stack = [node];

	if (R === x) {
		return path;
	}

	while (stack.length > 0) {
		if (index < node.children.length) {
			stack.push(node);
			node = node.children[index];
			path.push(index);
			index = 0;
			if (node === x) {
				return path;
			}
		} else {
			node = stack.pop();
			index = path.pop() + 1;
		}
	}

	// Not found, giving up
	return false;
}

module.exports = find;