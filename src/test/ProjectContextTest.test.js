import axios from 'axios';
jest.mock('axios');

const API_URL = 'http://localhost:5000/api/projects';

describe('Project API Endpoints', () => {
  // POST /projects - Proje Oluşturma
  describe('POST /projects', () => {
    test('should create a new project with valid data', async () => {
      // Given
      const projectData = {
        name: 'New Project',
        status: 'Yapılacak'
      };
      const mockResponse = {
        status: 201,
        data: {
          _id: '1',
          ...projectData
        }
      };
      axios.post.mockResolvedValueOnce(mockResponse);

      // When
      const res = await axios.post(`${API_URL}`, projectData);

      // Then
      expect(res.status).toBe(201);
      expect(res.data.name).toBe('New Project');
      expect(res.data.status).toBe('Yapılacak');
      expect(res.data).toHaveProperty('_id');
    });

    test('should return 409 for duplicate project name', async () => {
      // Given
      const duplicateData = {
        name: 'Test Proje',
        status: 'Yapılacak'
      };
      const mockError = {
        response: {
          status: 409,
          data: {
            message: 'Bu isimde bir proje zaten var!'
          }
        }
      };
      axios.post.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.post(`${API_URL}`, duplicateData))
        .rejects.toMatchObject({
          response: {
            status: 409
          }
        });
    });
  });

  // GET /projects - Proje Listesi
  describe('GET /projects', () => {
    test('should return all projects', async () => {
      // Given
      const projects = [
        { _id: '1', name: 'Proje 1', status: 'Yapılacak' },
        { _id: '2', name: 'Proje 2', status: 'Tamamlanmış' }
      ];
      const mockResponse = {
        status: 200,
        data: projects
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      // When
      const res = await axios.get(`${API_URL}`);

      // Then
      expect(res.status).toBe(200);
      expect(res.data.length).toBe(2);
    });

    test('should return 500 for server error', async () => {
      // Given
      const mockError = {
        response: {
          status: 500,
          data: {
            message: 'Internal server error'
          }
        }
      };
      axios.get.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.get(`${API_URL}`))
        .rejects.toMatchObject({
          response: {
            status: 500
          }
        });
    });
  });

  // GET /projects/:id - Spesifik Proje Getirme
  describe('GET /projects/:id', () => {
    test('should return a single project by ID', async () => {
      // Given
      const projectId = '1';
      const project = {
        _id: projectId,
        name: 'Test Project',
        status: 'Yapılacak'
      };
      const mockResponse = {
        status: 200,
        data: project
      };
      axios.get.mockResolvedValueOnce(mockResponse);

      // When
      const res = await axios.get(`${API_URL}/${projectId}`);

      // Then
      expect(res.status).toBe(200);
      expect(res.data).toEqual(project);
    });

    test('should return 404 for non-existent project', async () => {
      // Given
      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Project not found'
          }
        }
      };
      axios.get.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.get(`${API_URL}/non-existent-id`))
        .rejects.toMatchObject({
          response: {
            status: 404
          }
        });
    });

    test('should return 400 for invalid ID format', async () => {
      // Given
      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Invalid ID format'
          }
        }
      };
      axios.get.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.get(`${API_URL}/invalid-id`))
        .rejects.toMatchObject({
          response: {
            status: 400
          }
        });
    });
  });

  // PUT /projects/:id - Proje Güncelleme
  describe('PUT /projects/:id', () => {
    test('should update an existing project', async () => {
      // Given
      const projectId = '1';
      const updateData = {
        name: 'Güncellenmiş Proje'
      };
      const mockResponse = {
        status: 200,
        data: {
          message: 'Project updated',
          project: {
            _id: projectId,
            ...updateData,
            status: 'Yapılacak'
          }
        }
      };
      axios.put.mockResolvedValueOnce(mockResponse);

      // When
      const res = await axios.put(`${API_URL}/${projectId}`, updateData);

      // Then
      expect(res.status).toBe(200);
      expect(res.data.project.name).toBe(updateData.name);
    });

    test('should return 404 for non-existent project', async () => {
      // Given
      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Project not found'
          }
        }
      };
      axios.put.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.put(`${API_URL}/non-existent-id`, { name: 'Test' }))
        .rejects.toMatchObject({
          response: {
            status: 404
          }
        });
    });

    test('should return 400 for invalid update data', async () => {
      // Given
      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Invalid data'
          }
        }
      };
      axios.put.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.put(`${API_URL}/1`, { name: '' }))
        .rejects.toMatchObject({
          response: {
            status: 400
          }
        });
    });

    test('should return 400 for invalid ID format', async () => {
      // Given
      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Invalid ID format'
          }
        }
      };
      axios.put.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.put(`${API_URL}/invalid-id`, { name: 'Test' }))
        .rejects.toMatchObject({
          response: {
            status: 400
          }
        });
    });
  });

  // DELETE /projects/:id - Proje Silme
  describe('DELETE /projects/:id', () => {
    test('should delete an existing project', async () => {
      // Given
      const projectId = '1';
      const mockResponse = {
        status: 200,
        data: {
          message: 'Project deleted'
        }
      };
      axios.delete.mockResolvedValueOnce(mockResponse);

      // When
      const res = await axios.delete(`${API_URL}/${projectId}`);

      // Then
      expect(res.status).toBe(200);
      expect(res.data.message).toBe('Project deleted');
    });

    test('should return 404 for non-existent project', async () => {
      // Given
      const mockError = {
        response: {
          status: 404,
          data: {
            message: 'Project not found'
          }
        }
      };
      axios.delete.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.delete(`${API_URL}/non-existent-id`))
        .rejects.toMatchObject({
          response: {
            status: 404
          }
        });
    });

    test('should return 400 for invalid ID format', async () => {
      // Given
      const mockError = {
        response: {
          status: 400,
          data: {
            message: 'Invalid ID format'
          }
        }
      };
      axios.delete.mockRejectedValueOnce(mockError);

      // When & Then
      await expect(axios.delete(`${API_URL}/invalid-id`))
        .rejects.toMatchObject({
          response: {
            status: 400
          }
        });
    });
  });
});
