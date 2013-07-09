// ---------------------------
// Tree without children
// ---------------------------
test("countLeaves when model has no children", function() {
  var tree = new Tree({ label: "test", id: "1"});
  equal(tree.countLeaves(), 1, "No children so it's itself a child");
});

test("countLeaves when model has no children checked", function() {
  var tree = new Tree({ label: "test", id: "1"});
  equal(tree.countLeavesChecked(), 0, "No children checked");
});

test("countLeavesChecked when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  equal(tree.countLeavesChecked(), 1, "One child checked");
});

test("getLeavesChecked when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  equal(tree.getLeavesChecked().length, 1, "One child checked");
  equal(tree.getLeavesChecked()[0].get("id"), tree.get("id"), "One child checked");
});

test("getLeavesChecked when model is not checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: false});
  equal(tree.getLeavesChecked().length, 0, "One child checked");
});

test("areLeavesAllChecked when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  equal(tree.areLeavesAllChecked(), 1, "One child checked");
});

test("hasChildren when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  equal(tree.hasChildren(), false, "No children");
});

test("uncheck model and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: true });
  tree.uncheck();
  equal(tree.get("isChecked"), false, "Not checked");
});

test("check model and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  tree.check();
  equal(tree.get("isChecked"), true, "Not checked");
});

test("uncheckFromIds when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: 1});
  tree.uncheckFromIds(["1"]);
  equal(tree.get("isChecked"), false, "Not checked");
});

test("toggleFromIds when model is checked and has no children", function() {
  var tree = new Tree({ label: "test", id: "1", isChecked: false});
  tree.checkFromIds(["1"]);
  equal(tree.get("isChecked"), true, "Not checked");
});

// ---------------------------
// Empty Trees
// ---------------------------

test("getChildrenChecked when collection is empty", function() {
  var trees = new Trees();
  equal(trees.getLeavesChecked().length, 0, "Empty array");
});

test("countLeavesChecked when collection is empty", function() {
  var trees = new Trees();
  equal(trees.countLeavesChecked(), 0, "No children checked because collection has no models");
});

// ---------------------------
// Tree with children
// ---------------------------
test("countLeaves when model has children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2"}),
    new Tree({ label: "test", id: "3"}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.countLeaves(), 3, "> 0");
});

test("countLeavesChecked when model has no children checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2"}),
    new Tree({ label: "test", id: "3"}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.countLeavesChecked(), 0, "No children checked");
});

test("countLeavesChecked when model has children checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.countLeavesChecked(), 2, "Two child checked");
});

test("getLeavesChecked when two children are checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.getLeavesChecked().length, 2, "One child checked");
  equal(tree.getLeavesChecked()[0].get("id"), "2", "One child checked");
  equal(tree.getLeavesChecked()[1].get("id"), "3", "One child checked");
});

test("areLeavesAllChecked when has not all children checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.areLeavesAllChecked(), false, "Not all");
});

test("areLeavesAllChecked when model has all children checked", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5", isChecked: true})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.areLeavesAllChecked(), true, "All");
});

test("hasChildren when model is checked and has no children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5", isChecked: true})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  equal(tree.hasChildren(), true, "Has children");
});

test("uncheck when model is checked and has no children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5", isChecked: true})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  tree.uncheck();
  equal(tree.countLeavesChecked(), 0, "Not one checked");
});

test("check to true when model is checked and has no children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2"}),
    new Tree({ label: "test", id: "3"}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  tree.check();
  equal(tree.countLeavesChecked(), 3, "All children checked");
});

test("uncheckFromIds when model has children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5", isChecked: true})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  tree.uncheckFromIds(["5"]);
  equal(tree.countLeavesChecked(), 2, "Two checked");
});

test("checkFromIds when model has children", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2"}),
    new Tree({ label: "test", id: "3"}),
    new Tree({ label: "test", id: "5"})
  ]);
  var tree = new Tree({ label: "test", id: "1", children: trees});
  tree.checkFromIds(["2", "3"], true);
  equal(tree.countLeavesChecked(), 2, "Two checked");
});

// ---------------------------
// Filled Trees
// ---------------------------

test("getLeavesChecked when collection is filled", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  equal(trees.getLeavesChecked().length, 2, "Return two children checked");
});

test("countLeavesChecked when collection is filled", function() {
  var trees = new Trees([
    new Tree({ label: "test", id: "2", isChecked: true}),
    new Tree({ label: "test", id: "3", isChecked: true}),
    new Tree({ label: "test", id: "5"})
  ]);
  equal(trees.countLeavesChecked(), 2, "Two children are checked");
});
