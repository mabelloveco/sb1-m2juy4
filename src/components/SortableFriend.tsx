import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trophy } from 'lucide-react';
import type { Friend } from './TopFriends';

interface SortableFriendProps {
  friend: Friend;
  isEditing: boolean;
}

export function SortableFriend({ friend, isEditing }: SortableFriendProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: friend.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  const rank = parseInt(friend.status.split('#')[1]);
  const getTrophyColor = (rank: number) => {
    switch(rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-gray-300';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-white border border-gray-200 rounded-lg overflow-hidden ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      {isEditing && (
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 right-2 cursor-grab active:cursor-grabbing p-1 rounded-full bg-white/80 backdrop-blur-sm"
        >
          <GripVertical className="h-4 w-4 text-gray-500" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={friend.avatar}
              alt={friend.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {rank <= 3 && (
              <Trophy className={`h-4 w-4 absolute -top-1 -right-1 ${getTrophyColor(rank)}`} />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{friend.name}</h3>
            <p className="text-sm text-gray-500">{friend.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}