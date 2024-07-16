import React, { useState } from 'react';

type Props = {
  letters: string[]; // массив букв на игровом поле
};

const GameBoard: React.FC<Props> = ({ letters }) => {
  const [selectedWord, setSelectedWord] = useState<string>(''); // текущее выделенное слово
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]); // индексы выбранных букв

  const handleMouseDown = (index: number) => {
    // Обработчик нажатия на букву
    setSelectedWord(letters[index]); // начать новое слово с этой буквы
    setSelectedIndices([index]); // установить текущий индекс
  };

  const handleMouseEnter = (index: number) => {
    // Обработчик наведения на букву
    if (selectedIndices.length > 0 && index !== selectedIndices[selectedIndices.length - 1]) {
      // добавить букву к текущему слову, если это новая буква и не предыдущая
      setSelectedWord(prev => prev + letters[index]);
      setSelectedIndices(prev => [...prev, index]);
    }
  };

  const handleMouseUp = () => {
    // Обработчик отпускания кнопки мыши
    // здесь можно добавить логику для проверки слова и его расположения
    console.log('Выбранное слово:', selectedWord);

    // Сбросить выбор
    setSelectedWord('');
    setSelectedIndices([]);
  };

  return (
    <div className="bg-gray-300 rounded-full p-8">
      <div className="grid grid-cols-5 gap-2">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`flex justify-center items-center w-12 h-12 rounded-full cursor-pointer select-none ${selectedIndices.includes(index) ? 'bg-pink-300' : ''}`}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseUp={handleMouseUp}
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
