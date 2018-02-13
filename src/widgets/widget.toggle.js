dg.theme_toggle = function(variables) {
  var toggle = dg_toggle.create(variables);
  return toggle ? toggle.html() : '';
};
