import { useGameContext } from '@/store/context.tsx';
import { Button } from '@/components/Button.tsx';


export function Info() {
  const { level, setLevel } = useGameContext();
  const handleNextLevel = () => setLevel(level + 1);
  return (
    <div className="flex flex-col items-center justify-around w-full gap-6 h-full py-[200px]">
      <div className="flex flex-col">
        <h1 className="text-4xl text-gray font-bold">Уровень {level +1} пройден</h1>
        <h2 className="text-5xl text-gray font-bold">Изумительно!</h2>
      </div>
      <Button onClick={handleNextLevel} title={`Уровень ${level +1}`} />
    </div>
  );
}
