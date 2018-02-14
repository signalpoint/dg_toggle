/**
 * Creates a new toggle from a render element.
 * @param variables {Object} A dg8 render element.
 * @returns {DgToggle}
 */
dg_toggle.create = function(variables) {
  var attrs = variables._attributes;
  if (!attrs.id) { attrs.id = 'toggle-' + dg.salt(); }
  var id = attrs.id;
  dg._toggles[id] = new DgToggle(variables);
  return dg._toggles[id];
};

/**
 * Given a toggle id, this will return its object, or null if it doesn't exist.
 * @param id {String} The ID of the toggle in the DOM.
 * @returns {DgToggle|null}
 */
dg_toggle.load = function(id) {
  return dg._toggles[id] ? dg._toggles[id] : null;
};

/**
 * The onclick handler that actually does the toggling of the button and invoking of the worker.
 * @param toggleElement
 */
dg_toggle.onclick = function(toggleElement) {
  var id = toggleElement.getAttribute('id');
  var toggle = dg_toggle.load(id);
  if (!toggle) { return; }

  // If its already working, don't try to work anymore. Prevents double clicks.
  if (toggle.isWorking()) { return; }

  // When it is done working (later), set the button to its opposite state and set it back to "waiting".
  var done = function() {
    toggle.setState(toggle.getOppositeState());
    toggle.setMode('waiting');
    toggle.refresh();
  };

  // Set the button into "working" mode.
  toggle.setMode('working');

  // Update the button in the DOM to reflect its new state/mode.
  toggle.refresh();

  // Run the worker.
  var workerResponse = toggle.getWorker()(toggle, toggleElement);

  // If the worker returned false, the we do not need to proceed. Instead we just switch back to "waiting" and refresh.
  if (!workerResponse) {
    toggle.setMode('waiting');
    toggle.refresh();
  }
  else { // The worker responded positively, now circle back to done().
    if (jDrupal.isPromise(workerResponse)) { workerResponse.then(done); }
    else { done(); }
  }
};
