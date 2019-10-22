/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

define(['knockout', 'ojs/ojbootstrap', 'ojs/ojcollectiondataprovider', 'ojs/ojmodel', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojlistview'],
  function(ko, Bootstrap, CollectionDataProvider, model, ArrayDataProvider)
  {
    const restAPI = 'https://swapi.co/api';

    function viewModel()
    {
      const self = this;
      const characterArray = ko.observableArray([]);

      const CharacterModel = model.Model.extend({
        urlRoot: `${restAPI}/people/`
      });
      const CharacterCollection = model.Collection.extend({
        url: `${restAPI}/people/`,
        model: CharacterModel,
        parse: data => {
          return data.results.map(async (row) => {
            const planetId = row.homeworld.split('/');
            const planet = await getPlanet(planetId[5]);
            characterArray.push({
              name: row.name,
              height: `${row.height} cm`,
              gender: row.gender,
              homeworld: planet.name
            });
          });
        }
      });

      async function getPlanet(id) 
      {
        const PlanetCollection = model.Collection.extend({
          url: `${restAPI}/planets/${id}/`,
        });
        return await (new PlanetCollection()).fetch();
      }
      
      const characterData = new CharacterCollection();
      characterData.fetch();
      self.dataProvider = new ArrayDataProvider(characterArray);
    }
    return new viewModel();
  }
);