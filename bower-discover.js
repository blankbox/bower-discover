var fs = require('fs-extra');

/**
 * Resolve the path of a bower component.
 * @param pkg {String} The bower component name.
 */
module.exports = function (pkg) {
    var root;
    try {
        var rc = fs.readJsonSync('.bowerrc');
        root = rc.directory || 'bower_components';
    } catch (err) {
        root = 'bower_components';
    }

    if (typeof pkg === 'undefined') {
      // Return a list of folders (thus bower components by name)
      return fs.readdirSync(root + '/');
    }

    root += '/' + pkg + '/';

    try {
      var config = fs.readJsonSync(root + '.bower.json');
      var main = config.main;
      // Force
      var paths = [].concat(main);

      return paths.map(function (path) {
        return root + path;
      });
    } catch (err) {
      return false;
    }
};
