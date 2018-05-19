import axios from 'axios';

const URLS = {
  getSchema: (id) => `/getSchema/${id}`,
  getBoxes: (id) => `/getBoxes/${id}`,
  getBuildingAreas: (id) => `/getBuildingAreas/${id}`,
  saveBuildingArea: (id) => `/saveBuildingArea/${id}`,
};

class SchemaService {
  constructor() {
    this.fetch = axios.create({
      baseURL: 'http://localhost:8888/api'
    });
  }

  getSchema = (id) => {
    return this.fetch({
      method: 'get',
      url: URLS.getSchema(id)
    });
  }
  
  getBoxes = (id) => {
    return this.fetch({
      method: 'get',
      url: URLS.getBoxes(id)
    });
  }

  getBuildingAreas = (id) => {
    return this.fetch({
      method: 'get',
      url: URLS.getBuildingAreas(id)
    });
  }
}

export default new SchemaService();
