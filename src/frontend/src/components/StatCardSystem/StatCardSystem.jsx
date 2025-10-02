import { useContext, useMemo } from 'react';
import { TaskContext } from '@/contexts/TaskContext';
import StatCard from "@/components/StatCardSystem/StatCard";
import StatusCounter from "@/components/StatCardSystem/StatusCounter";
import toLocalMidnight from '@/utils/toLocalMidnight';
import isSameDay from '@/utils/isSameDay';
import testCardData from "@/utils/testCardData.json" with { type: 'json'}
import CardRow from './CardRow';
import { processingContext } from "@/contexts/ProcessingContext"

function StatCardSystem() {
  const { cardData, statusCount } = useContext(processingContext);

  return (
    <div className="w-[73.5%] mx-auto border-2 border-dashed pt-2">
        <h1 className="text-2xl pt-2 pb-4 text-left pl-8">Stat Card System</h1>

        <CardRow daysRegex={/monday|tuesday|wednesday|thursday/i}
        gridClassName = {"grid grid-cols-4"} cardData = {cardData}/>
        <CardRow daysRegex={/friday|saturday|sunday/i}
        gridClassName = {"grid grid-cols-3 mt-4"} cardData = {cardData}/>
        
        <div>
            <StatusCounter statusCount={statusCount} />
        </div>
    </div>
  );
}

export default StatCardSystem;