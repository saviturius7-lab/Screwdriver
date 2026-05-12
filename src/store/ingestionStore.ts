import { create } from 'zustand';

interface IngestionState {
  currentUploads: Array<{
    id: string;
    filename: string;
    status: 'uploading' | 'processing' | 'completed' | 'failed';
    progress: number;
    error?: string;
  }>;
  addUpload: (upload: any) => void;
  updateStatus: (id: string, status: any) => void;
}

export const useIngestionStore = create<IngestionState>((set) => ({
  currentUploads: [],
  addUpload: (upload) => set((state) => ({ 
    currentUploads: [...state.currentUploads, { ...upload, status: 'processing', progress: 0 }] 
  })),
  updateStatus: (id, statusData) => set((state) => ({
    currentUploads: state.currentUploads.map((u) => 
      u.id === id ? { ...u, ...statusData } : u
    )
  })),
}));
