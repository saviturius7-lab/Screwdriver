// src/store/notificationStore.ts
import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: '1',
      type: 'warning',
      title: 'Hiring Spike',
      message: 'Sudden influx of roles detected at NVIDIA. Strategy recommended.',
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'System Synced',
      message: 'GitHub profiles for Batch 2024 processed successfully.',
      timestamp: new Date().toISOString(),
      read: true,
    }
  ],
  unreadCount: 1,
  addNotification: (notification) => set((state) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      read: false,
    };
    return {
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    };
  }),
  markAsRead: (id) => set((state) => {
    const notifications = state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    return {
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    };
  }),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
    unreadCount: 0,
  })),
  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));
