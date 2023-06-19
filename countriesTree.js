import "./tree-item.js";

async function getCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  const filteredData = data.map(country => {
    return {
      name: country.name.common,
      region: country.region,
      subregion: country.subregion
    }
  })
  return filteredData
}


function makeTreeObject(countries) {
  const regions = {};

  countries.forEach(country => {
    if (!(Object.keys(regions).includes(country.region))) {
      regions[country.region] = {};
    }
    if (!(Object.keys(regions[country.region]).includes(country.subregion))) {
      regions[country.region][country.subregion] = [];
    }
    regions[country.region][country.subregion].push(country.name)
  })

  regions['Antarctic'] = 'French Southern and Antarctic Lands'
  return regions
}


function buildTree(data) {
  const tree = document.querySelector("div#tree");
  const root = document.createElement("tree-item");
  root.textContent = "Continentes";
  
  const regionKeys = Object.keys(data);
  regionKeys.forEach((region) => {
    const regionNode = document.createElement("tree-item");
    regionNode.slot = 'children';
    regionNode.textContent = region;
    if (region === 'Antarctic') {
      return;
    }
    const subregionKeys = Object.keys(data[region]);
    subregionKeys.forEach((subregion) => {
      const subregionNode = document.createElement("tree-item");
      subregionNode.slot = 'children';
      subregionNode.textContent = subregion;
      const countries = data[region][subregion];
      countries.forEach((country) => {
        const countryNode = document.createElement("tree-item");
        countryNode.slot = 'children';
        countryNode.textContent = country;
        subregionNode.appendChild(countryNode);
      })
      regionNode.appendChild(subregionNode);
    })
    root.appendChild(regionNode);
  });
  tree.appendChild(root);
}

getCountries()
  .then(countries => makeTreeObject(countries))
  .then(treeObject => buildTree(treeObject))