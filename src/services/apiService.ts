// src/services/apiService.ts

const API_BASE = '/api/v1';

export const apiService = {
  // Hiring Signals
  getLiveSignals: () => fetch(`${API_BASE}/hiring/live`).then(res => res.json()),
  getHiringTrends: () => fetch(`${API_BASE}/hiring/trends`).then(res => res.json()),
  
  // Analytics
  getPredictions: () => fetch(`${API_BASE}/analytics/company-predictions`).then(res => res.json()),
  getPackageTrends: () => fetch(`${API_BASE}/analytics/package-trends`).then(res => res.json()),
  
  // Student Intelligence
  syncGithub: (username: string) => fetch(`${API_BASE}/students/github-sync/${username}`).then(res => res.json()),
  getStudentInsights: (id: string) => fetch(`${API_BASE}/students/profile/insights/${id}`).then(res => res.json()),
  
  // Matching
  getMatches: (id: string) => fetch(`${API_BASE}/matching/student/${id}`).then(res => res.json()),
  
  // Preparation
  generateStrategy: (company: string) => fetch(`${API_BASE}/prep/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company })
  }).then(res => res.json()),
  getQuestions: (company: string) => fetch(`${API_BASE}/prep/questions/${company}`).then(res => res.json()),
  
  // RAG / Assistant
  askAssistant: (q: string, context?: string) => {
    const url = new URL(`${API_BASE}/rag/prep-guide`, window.location.origin);
    url.searchParams.append('q', q);
    if (context) url.searchParams.append('company', context);
    return fetch(url.toString()).then(res => res.json());
  }
};
