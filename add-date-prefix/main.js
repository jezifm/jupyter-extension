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

        // Add date prefix overwrite
        var handler = function () {
            var name = prompt('New notebook name');
            var has_date_prefix = /^\d+-\d+-\d+/.test(name);
            if (!has_date_prefix) {
                var now = new Date();
                var year = now.getFullYear();
                var month = pad(now.getMonth()+1, 2);
                var date = pad(now.getDate(), 2);
                var new_name = `${year}-${month}-${date} ${name}`;
                Jupyter.notebook.rename(new_name);
                console.log(`Notebook renamed to ${new_name}`);
            } else {
                console.log('Notebook already has date prefix');
            }
        };

        var action = {
            icon: 'fa-calendar-plus-o',
            help    : 'Add prefix to notebook name',
            help_index : 'zz',
            handler : handler
        };
        var prefix = 'my_extension';
        var action_name = 'add-prefix';

        var full_action_name = Jupyter.actions.register(action, action_name, prefix);
        Jupyter.toolbar.add_buttons_group([full_action_name]);

        // Rename date prefix, remove copy
        var handler1 = function () {
            var now = new Date();
            var year = now.getFullYear();
            var month = pad(now.getMonth()+1, 2);
            var date = pad(now.getDate(), 2);

            var name = Jupyter.notebook.get_notebook_name();
            var name_regexp = /(?:(?<date>^\d+-\d+-\d+)[ -])?(?<name>.*)/;
            var groups = name.match(name_regexp).groups;
            var name_src = groups.name.replace(/-Copy\d+$/, '');

            var new_name = `${year}-${month}-${date} ${name_src}`;

            if (name != new_name) {
                Jupyter.notebook.rename(new_name);
                console.log(`Notebook naming fixed to ${new_name}`);
            } else {
                console.log('Notebook name is already correct');
            }
        };

        var action1 = {
            icon: 'fa-calendar-check-o',
            help    : 'Fix prefix to notebook name',
            help_index : 'zz1',
            handler : handler1
        };
        var prefix1 = 'my_extension1';
        var action_name1 = 'add-prefix1';

        var full_action_name1 = Jupyter.actions.register(action1, action_name1, prefix1);
        Jupyter.toolbar.add_buttons_group([full_action_name1]);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
