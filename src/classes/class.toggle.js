/**
 *
 * @param variables
 * @constructor
 */
DgToggle = function(variables) {
  this._variables = variables;
  if (!variables._state) { variables._state = 'off'; } // off or on
  if (!variables._mode) { variables._mode = 'waiting'; } // waiting or working
  if (variables._off) {
    var off = variables._off;
    if (off.waiting) { dg.attributesInit(off.waiting); }
    if (off.working) { dg.attributesInit(off.working); }
  }
  if (variables._on) {
    var on = variables._on;
    if (on.waiting) { dg.attributesInit(on.waiting); }
    if (on.working) { dg.attributesInit(on.working); }
  }
};

DgToggle.prototype.getVariables = function() {
  return this._variables;
};

DgToggle.prototype.id = function() {
  return this.getVariables()._attributes.id;
};

DgToggle.prototype.getState = function() {
  return this.getVariables()._state;
};

DgToggle.prototype.setState = function(state) {
  this.getVariables()._state = state;
};

DgToggle.prototype.getOppositeState = function() {
  return this.getState() == 'on' ? 'off' : 'on';
};

DgToggle.prototype.getMode = function() {
  return this.getVariables()._mode;
};

DgToggle.prototype.setMode = function(mode) {
  this.getVariables()._mode = mode;
};

DgToggle.prototype.getOppositeMode = function() {
  return this.isWorking() ? 'waiting' : 'working';
};

DgToggle.prototype.getWorker = function() {
  return this.getVariables()._worker;
};

/**
 * Gets a button render element.
 * @param state {String} Optional, 'on' or 'off', defaults to its opposite state.
 * @param mode {String} Optional, 'waiting' or 'working', defaults to 'waiting'.
 */
DgToggle.prototype.getButton = function(state, mode) {
  if (!state) { state = this.getState(); }
  if (!mode) { mode = this.getMode(); }
  var button = this.getVariables()['_' + state][mode];
  var attrs = button._attributes;
  if (!attrs.id) { attrs.id = this.id(); }
  if (!attrs.onclick) { attrs.onclick = 'dg_toggle.onclick(this)'; }
  return button;
};

DgToggle.prototype.html = function() {
  var button = this.getButton();
  button._attributes = dg.extend(this.getVariables()._attributes, button._attributes);
  return dg.render(button);
};

DgToggle.prototype.refresh = function() {
  var el = dg.qs('#' + this.id());
  var button = this.getButton();
  button._attributes = dg.extend(this.getVariables()._attributes, button._attributes);
  dg.addAttrs(el, button);
  el.innerHTML = button._value;
};

DgToggle.prototype.isWorking = function() {
  return this.getMode() == 'working';
};

DgToggle.prototype.turningOn = function() {
  return this.getState() == 'off' && this.isWorking();
};

DgToggle.prototype.turningOff = function() {
  return this.getState() == 'on' && this.isWorking();
};
