// file my_extension/main.js

define([
    'base/js/namespace'
], function(
    Jupyter
) {
    function load_ipython_extension() {
        var pad = function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };

        var handler = function () {
            // var name = Jupyter.notebook.get_notebook_name();
            var name = prompt();
            var has_date_prefix = /^\d+-\d+-\d+/.test(name);
            if (!has_date_prefix) {
                var now = new Date();
                var year = now.getFullYear();
                var month = pad(now.getMonth(), 2);
                var date = pad(now.getDate(), 2);
                var new_name = `${year}-${month}-${date} ${name}`;
                Jupyter.notebook.rename(new_name);
                console.log(`Notebook renamed to ${new_name}`);
            } else {
                console.log('Notebook already has date prefix');
            }
        };

        var action = {
            icon: 'fa-calendar-plus-o', // a font-awesome class used on buttons, etc
            help    : 'Add prefix to notebook name',
            help_index : 'zz',
            handler : handler
        };
        var prefix = 'my_extension';
        var action_name = 'add-prefix';

        var full_action_name = Jupyter.actions.register(action, action_name, prefix); // returns 'my_extension:show-alert'
        Jupyter.toolbar.add_buttons_group([full_action_name]);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
    // jupyter-notebook:rename-notebook
});
