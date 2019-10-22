/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

define(['knockout', 'ojs/ojbootstrap', 'ojs/ojcollectiondataprovider', 'ojs/ojmodel', 'ojs/ojknockout', 'ojs/ojlistview'],
  function(ko, Bootstrap, CollectionDataProvider, model)
  {
    const restAPI = 'https://swapi.co/api';

    function viewModel()
    {
      const self = this;
      
      const CharacterModel = model.Model.extend({
        urlRoot: `${restAPI}/people/`
      });
      const CharacterCollection = model.Collection.extend({
        url: `${restAPI}/people/`,
        model: CharacterModel,
        parse: data => {
          return data.results.map(row => ({
            name: row.name,
            height: `${row.height} cm`,
            gender: row.gender,
            homeworld: row.homeworld
          }));
        }
      });

      const characterData = new CharacterCollection();
      self.dataProvider = new CollectionDataProvider(characterData);
    }
    return new viewModel();
  }
);