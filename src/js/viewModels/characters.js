/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

define(['knockout', 'ojs/ojbootstrap', 'ojs/ojmodel', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojlistview', 
      'ojs/ojinputtext', 'ojs/ojlabel'],
  function(ko, Bootstrap, model, ArrayDataProvider)
  {
    const restAPI = 'https://swapi.co/api';
    const peopleApiUrl = `${restAPI}/people/`;

    function viewModel()
    {
      const self = this;
      self.searchValue = ko.observable('');
      const characterArray = ko.observableArray([]);
      const planetCache = {};
      
      const CharacterModel = model.Model.extend({
        urlRoot: peopleApiUrl
      });
      const CharacterCollection = model.Collection.extend({
        url: peopleApiUrl,
        model: CharacterModel,
        parse: data => {
          const characterPromise = data.results.map(async (row) => {
            const planetId = row.homeworld.split('/');
            const planet = await getPlanet(planetId[5]);
            return {
              name: row.name,
              height: `${row.height} cm`,
              gender: row.gender,
              homeworld: planet.name
            };
          });
          Promise.all(characterPromise).then(characters => {
            characterArray(characters);
          });
        }
      });

      async function getPlanet(id) 
      {
        if (planetCache[id]) {
          return await planetCache[id];
        }
        const PlanetCollection = model.Collection.extend({
          url: `${restAPI}/planets/${id}/`
        });
        planetCache[id] = (new PlanetCollection()).fetch();
        return await planetCache[id];
      }
      
      const characterData = new CharacterCollection();
      characterData.fetch();
      self.searchValue.subscribe((value) => {
        if (!value || value.length === 0) {
          characterData.url = peopleApiUrl;
        } else {
          characterData.url = `${peopleApiUrl}?search=${value}`;
        }
        // Reset the observable array, abort previous requests to eliminate race conditions and fetch new data
        characterArray([]);
        characterData.abort();
        characterData.fetch();        
      })
      self.dataProvider = new ArrayDataProvider(characterArray);
    }
    return new viewModel();
  }
);