import axios from 'axios';

const URLS = {
  getSchema: (id) => `/getSchema/${id}`,
  saveSchema: (id) => `/saveSchema/${id}`,
  getBoxes: (id) => `/getBoxes/${id}`,
  saveBox: (id) => `/saveBox/${id}`,
  getBuildingAreas: (id) => `/getBuildingAreas/${id}`,
  saveBuildingArea: (id) => `/saveBuildingArea/${id}`,
};

class ACADService {
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

  saveSchema = (id, data) => {
    return this.fetch({
      method: 'post',
      url: URLS.saveSchema(id),
      data
    });
  }
  
  getBoxes = (id) => {
    return this.fetch({
      method: 'get',
      url: URLS.getBoxes(id)
    });
  }

  saveBox = (id, data) => {
    return this.fetch({
      method: 'post',
      url: URLS.saveBox(id),
      data
    });
  }

  getBuildingAreas = (id) => {
    return this.fetch({
      method: 'get',
      url: URLS.getBuildingAreas(id)
    });
  }

  saveBuildingArea = (id, data) => {
    return this.fetch({
      method: 'post',
      url: URLS.saveBuildingArea(id),
      data
    });
  }
}

export default new ACADService();
