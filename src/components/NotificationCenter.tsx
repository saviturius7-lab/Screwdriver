// src/components/NotificationCenter.tsx
import React, { useState } from 'react';
import { Bell, X, Info, AlertTriangle, CheckCircle, Trash2, MailOpen } from 'lucide-react';
import { useNotificationStore } from '../store/notificationStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-bg-card rounded-sm transition-colors relative group"
      >
        <Bell className={cn("w-5 h-5", unreadCount > 0 ? "text-brand-blue" : "text-text-dim")} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-blue rounded-full border-2 border-bg-main animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-96 bg-bg-main border border-border-subtle shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-border-subtle flex justify-between items-center bg-bg-card/50">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-white">Notifications</h4>
                  <p className="text-[10px] font-mono text-text-dim uppercase mt-1">{unreadCount} Unread Alerts</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={markAllAsRead} title="Mark all as read" className="p-1 hover:text-brand-blue text-text-dim transition-colors">
                        <MailOpen className="w-4 h-4" />
                    </button>
                    <button onClick={clearNotifications} title="Clear all" className="p-1 hover:text-red-500 text-text-dim transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:text-white text-text-dim transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
              </div>

              <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <Bell className="w-12 h-12 text-border-subtle mx-auto mb-4 opacity-20" />
                    <p className="text-[10px] font-mono text-text-dim uppercase">No active signals found</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={cn(
                        "p-4 border-b border-border-subtle hover:bg-bg-card transition-colors cursor-pointer group",
                        !n.read && "bg-brand-blue/5 border-l-2 border-l-brand-blue"
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1">
                          {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                          {n.type === 'info' && <Info className="w-4 h-4 text-brand-blue" />}
                          {n.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">{n.title}</span>
                            <span className="text-[8px] font-mono text-text-dim">{new Date(n.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-[10px] font-mono text-text-dim leading-relaxed uppercase pr-4">
                            {n.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-4 bg-bg-card/50 border-t border-border-subtle">
                <button className="w-full py-2 bg-brand-blue text-[10px] font-black uppercase tracking-widest text-white hover:bg-highlight transition-all">
                  View Intelligence Feed
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
