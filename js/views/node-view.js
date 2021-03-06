/*

Copyright (C) 2013 Acquisio Inc. V0.1.1

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
var templateNode = _.template('\
  <a>\
    <%=(hasChildren ? "<span class=tree-view-chevron>&#9658</span>" : "")%>\
    <input id="<%=autoId%>" type="checkbox" <%=(isChecked ? "checked" : "")%> class="tree-view-checkbox" data-id="<%=id%>"/>\
    <label for="<%=autoId%>" class="tree-view-label"><span class="tree-view-icon"></span><%=label%></label>\
  </a>\
  <ul class="tree-view-list">\
  </ul>\
  ');

NodeView = Marionette.CompositeView.extend({
  tagName: "li",
  className: "tree-view-node",
  template: templateNode,
  chevronRight: "&#9658;",
  chevronDown: "&#9660;",

  ui: {
    chevron: ".tree-view-chevron",
    label: ".tree-view-label",
    checkbox: ".tree-view-checkbox",
    list: ".tree-view-list",
    icon: ".tree-view-icon"
  },

  initialize: function(options) {
    this.template = options.template || this.template;

    if (this.model.hasChildren())
      this.$el.addClass("tree-view-branch");
    else
      this.$el.addClass("tree-view-leaf");
  },

  bindCollection: function() {
    this.collection = this.model.get("children");
    this.collection.off("checked");
    this.collection.on("checked", this.triggerChange, this);
    this.collection.on("checked", this.toggleMyself, this);
  },

  triggerChange: function() {
    this.model.trigger("checked");
  },

  onRender: function() {
    this.bindCollection();
    this.toggleMyself();
    if (this.model.get("class")) this.ui.icon.addClass(this.model.get("class"));
  },

  appendHtml: function(collectionView, itemView){
    collectionView.ui.list.append(itemView.el);
  },

  serializeData: function() {
    return {
      autoId: _.uniqueId(),
      hasChildren: this.model.hasChildren(),
      label: this.model.get("label"),
      isChecked: this.model.get("isChecked"),
      id: this.model.id
    };
  },

  events: {
    "click .tree-view-chevron": "toggleView",
    "click .tree-view-checkbox": "onCheck"
  },

  modelEvents: {
    "change:isChecked": "toggleCheck"
  },

  toggleMyself: function() {
    if (!this.model.hasChildren()) {
      this.ui.checkbox.prop("checked", this.model.get("isChecked"));
      return;
    }

    if (this.model.areLeavesAllChecked()) {
      this.model.check();
    } else if (this.model.countLeavesChecked() > 0 && this.model.hasChildren()) {
      this.ui.checkbox.prop("indeterminate", true);
    } else {
      this.model.set('isChecked', false);
      this.ui.checkbox.prop("checked", false);
      this.ui.checkbox.prop("indeterminate", false);
    }
  },

  toggleCheck: function() {
    this.ui.checkbox.prop("checked", this.model.get("isChecked"));
    this.ui.checkbox.prop("indeterminate", false);
    return false;
  },

  toggleView: function() {
    this._renderChildren();
    this.$el.toggleClass("open");
    this.switchChevron();
    return false;
  },

  switchChevron: function() {
    if (!this.model.hasChildren()) return;

    if (this.$el.hasClass("open")) {
      this.ui.chevron.html(this.chevronDown);
    } else {
      this.ui.chevron.html(this.chevronRight);
    }
  },

  onCheck: function(e) {
    e.stopPropagation();
    this.model.toggleCheck();
    this.model.collection.trigger("checked");
  },

  expand: function() {
    this._renderChildren();
    this.$el.addClass("open");
    this.switchChevron();
    this.children.each(function(child) { child.expand(); });
  },

  collapse: function() {
    this.$el.removeClass("open");
    this.switchChevron();
    this.children.each(function(child) { child.collapse(); });
  }
});
