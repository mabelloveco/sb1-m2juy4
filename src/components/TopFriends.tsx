import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableFriend } from './SortableFriend';
import { GripVertical, AlertCircle } from 'lucide-react';

export interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: string;
}

const initialFriends: Friend[] = [
  {
    id: 1,
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=150',
    status: '#1 - Porsche Enthusiast',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=150',
    status: '#2 - JDM Lover',
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1600706432502-77a0e2e32795?w=150',
    status: '#3 - Muscle Car Builder',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=150',
    status: '#4 - Track Day Enthusiast',
  },
  {
    id: 5,
    name: 'James Lee',
    avatar: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=150',
    status: '#5 - Classic Car Collector',
  },
];

export default function TopFriends() {
  const [friends, setFriends] = useState(initialFriends.slice(0, 5));
  const [isEditing, setIsEditing] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFriends((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newOrder = arrayMove(items, oldIndex, newIndex);
        // Update status numbers after reordering
        return newOrder.map((friend, index) => ({
          ...friend,
          status: `#${index + 1} - ${friend.status.split(' - ')[1]}`
        }));
      });
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold">Top 5 Friends</h2>
            <div className="text-sm text-gray-500">({friends.length}/5)</div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-red-600 hover:text-red-700"
          >
            {isEditing ? 'Save Order' : 'Reorder Friends'}
          </button>
        </div>

        {friends.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <AlertCircle className="h-12 w-12 mb-2" />
            <p>No top friends added yet</p>
            <p className="text-sm">Add friends to your top 5 list</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={friends} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {friends.map((friend) => (
                  <SortableFriend
                    key={friend.id}
                    friend={friend}
                    isEditing={isEditing}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {isEditing && friends.length > 0 && (
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-center space-x-2">
            <GripVertical className="h-4 w-4" />
            <span>Drag and drop to reorder your top friends</span>
          </div>
        )}
      </div>
    </div>
  );
}