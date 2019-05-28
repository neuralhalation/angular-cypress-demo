angular-cypress-demo
====================
using cypress to automate demo.realworld.io

instructions
============

Install the following
---------------------

- ``npm install mocha``
- ``npm install tslint``
- ``npm install gulp-cli -g``
- ``npm install gulp -D``
- ``npm install cypress``
- ``npm install underscore``
- ``npm install --save-dev start-server-and-test``

Edit the package.json
---------------------

While debugging:

.. code-block:: JSON
    
    {
        "scripts": {
            "cypress:open": "cypress open",
            "test": "cypress open",
            "start": "gulp",
            "ci": "start-server-and-test start http://localhost:3000 test"
        }
    }

Production:

.. code-block:: JSON

    {
        "scripts": {
            "cypress:open": "cypress open",
            "test": "cypress run",
            "start": "gulp",
            "ci": "start-server-and-test start http://production.site test"
        }
    }

Then execute the command: ``npm run cypress:open``. This will create
the ``cypress`` folder.

Edit the tsconfig.json
----------------------

.. code-block:: JSON
    
    {
        "complilerOptions": {
            "allowJs": true,
            "baseUrl": "../node_modules",
            "types": [
                "cypress"
            ]
        },
        "include": [
            "**/*.*"
        ]
    }

haiku
=====

testing our own minds / passing or failing ourselves / gates of improvement