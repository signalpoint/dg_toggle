# dg_toggle

The Toggle widget for DrupalGap. A handy widget to make a button or link toggle-able. Some example use cases:

- follow/unfollow button
- join/leave button
- bookmark/remove button

## Usage

```
var html = dg.theme('toggle', {

    // Optional attributes to attach to each toggle button state/mode. 
    _attributes: {
      'data-bundle': 'article',
      'data-entity-id': 123,
      class: ['fa', 'fa-bookmark']
    },

    // Optional default state for the toggle button. Defaults to 'off'.
    //_state: example.condition() ? 'on' : 'off',

    // Configuration for the "off" state.
    _off: {

     // The "off and waiting to be turned on" button.
     waiting: {
       _value: dg.t('Save'),
       _type: 'button',
       _attributes: {
         title: dg.t('Save to bookmarks')
       }
     },

     // The "off but working to turn on" button.
     working: {
       _value: dg.t('Saving'),
       _type: 'button',
       _attributes: {
         title: dg.t('Saving to bookmarks')
       }
     }
    },

    // Configuration for the "on" state.
    _on: {

     // The "on and waiting to be turned off" button.
     waiting: {
       _value: dg.t('Saved'),
       _type: 'button',
       _attributes: {
         title: dg.t('Remove from bookmarks')
       }
     },

     // The "on but working to turn off" button.
     working: {
       _value: dg.t('Removing'),
       _type: 'button',
       _attributes: {
         title: dg.t('Removing from bookmarks')
       }
     }
    },

    // Handles the toggling of the button state.
    _worker: function(toggle, button) {

      // For example...

      // Abort if the user is anonymous.
      if (dg.currentUser().isAnonymous()) {
        dg.toast(dg.t('You must login to save content.'));
        return false;
      }

      return new Promise(function(ok, err) {

          // The button has been toggled, do stuff examples...

          var bundle = button.getAttribute('data-bundle');
          var entityId = button.getAttribute('data-entity-id');

          if (toggle.turningOn()) {

            // The button is turning on, make a REST call to Drupal, then resolve.
            example.restCallOn().then(ok);

          }
          else if (toggle.turningOff()) {

            // The button is turning off, make a REST call to Drupal, then resolve.
            example.restCallOff().then(ok);

          }

      });
    }

});
```
