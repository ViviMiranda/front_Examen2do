import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/participantes';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Funciones para interactuar con la API
export const api = {
    getParticipants: () => apiClient.get('/listado'),
    searchParticipants: (query) => apiClient.get(`/listado/search?q=${encodeURIComponent(query)}`),
    getParticipantById: (idParticipante) => {
        console.log('Buscando participante:', idParticipante);
        return apiClient.get(`/participante/${idParticipante}`);
    },
    registerParticipant: (data) => {
        console.log('Enviando datos al servidor:', data);
        return apiClient.post('/registro', { participants: data });
    }
};