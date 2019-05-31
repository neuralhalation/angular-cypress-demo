angular-cypress-demo
====================
using cypress to automate demo.realworld.io

Link to GitHub for demo.realworld.io_.

.. _demo.realworld.io: https://github.com/gothinkster/angularjs-realworld-example-app

Fantastic testing brought to you by Cypress_.

.. _Cypress: https://www.cypress.io

Direct inspiration and some code came from watching this_ video of a talk given by Brian Mann
at AssertJS_.

.. _this: https://youtu.be/5XQOK0v_YRE
.. _AssertJS: http://www.assertjs.com

Did you know that JavaScript supports first-order functions?

Data doesn't have to be hard. That's why I've included the use of Underscore.js_.

.. _Underscore.js: https://underscorejs.org

Instructions
============

Installs
--------

Base packages this project will install when ``npm install`` is run.

- ``npm install mocha``
- ``npm install tslint``
- ``npm install gulp-cli -g``
- ``npm install gulp -D``
- ``npm install cypress --save-dev``
- ``npm install underscore``
- ``npm install --save-dev start-server-and-test``

How to run this
---------------

After cloning, follow these steps to get the project running.

- ``npm install``
- ``npm run ci``

This will launch Cypress. From there, select which ``spec`` to execute.

Setting up from scratch
=======================

After doing the requisite installs, you'll need to change some configurations.

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

This will allow you to simply call ``cypress`` without prefixing with ``npm run`` or ``npx``.

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