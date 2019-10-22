/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

define(['knockout', 'ojs/ojbootstrap', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojlistview'],
  function(ko, Bootstrap, ArrayDataProvider)
  {
      function viewModel()
      {
        const self = this;

        /* self.connected = () => {
          const data = [{name: 'Lea'}];
          self.dataProvider = new ArrayDataProvider(data, 
            { keys: data.map(function(value) {
                  return value.name;
              })}); 
        } */

          
        const data = [
          {name: 'Luke', gender: 'male', height: '175 cm', homeworld: 'Tatooine'},
          {name: 'Obi', gender: 'male', height: '180 cm', homeworld: 'Force'},
          {name: 'Chewwie', gender: 'male', height: '210 cm', homeworld: 'Kashyyk'},
          {name: 'Han', gender: 'male', height: '165 cm', homeworld: '??'},
          {name: 'Jarjar', gender: '???', height: '160 cm', homeworld: 'Naboo'}
        ];
        self.dataProvider = new ArrayDataProvider(data, 
          { keys: data.map(function(value) {
                return value.name;
            })}); 
      }
      return viewModel;
  });