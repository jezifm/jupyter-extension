// file my_extension/main.js

define([
    'base/js/namespace'
], function(
    Jupyter
) {
    function load_ipython_extension() {
        let pad = function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };

        let handler = function () {
            let name = Jupyter.notebook.get_notebook_name();
            let new_name;

            let now = new Date();
            let year = now.getFullYear();
            let month = pad(now.getMonth()+1, 2);
            let date = pad(now.getDate(), 2);
            
            let has_date_prefix = /^\d+-\d+-\d+/.test(name);
            if (!has_date_prefix) {
                new_name = `${year}-${month}-${date} ${name}`;
            } else {
                new_name = name.replace(/^\d+-\d+-\d+/, `${year}-${month}-${date}`);
            }
            new_name = new_name.replace(/-Copy\d+$/, '');
            Jupyter.notebook.rename(new_name);
            console.log(`Notebook renamed to ${new_name}`);
        };

        let action = {
            icon: 'fa-check',
            help    : 'Fix date prefix to notebook name',
            help_index : 'zz',
            handler : handler
        };
        let prefix = 'my_extension';
        let action_name = 'fix-date-prefix';
        let full_action_name = Jupyter.actions.register(action, action_name, prefix);
        Jupyter.toolbar.add_buttons_group([full_action_name]);
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
