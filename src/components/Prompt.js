import { useEffect, useState } from 'react';
import '../styling/prompt.css';

const Prompt = ({handleGenerateButton, categories}) => {
    const [category, setCategory] = useState('any');
    const [amount, setAmount]= useState(1);
    const [difficulty, setDifficulty] = useState('any');

    const [limit, setLimit] = useState(null);

    useEffect(() => {

        if(category === 'any'){
            setLimit(50);
        } else {
            fetch(`https://opentdb.com/api_count.php?category=${category}`)
            .then((response) => response.json())
            .then((data) => {
                
                if(difficulty === 'any'){
                    setLimit(data.category_question_count.total_question_count);
                } else if(difficulty === 'easy'){
                    setLimit(data.category_question_count.total_easy_question_count);
                } else if(difficulty === 'medium'){
                    setLimit(data.category_question_count.total_medium_question_count);
                } else if(difficulty === 'hard'){
                    setLimit(data.category_question_count.total_hard_question_count);
                }
            })
        }
        

    }, [category, difficulty]);
    
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const renderAmountOptions = () => {
        let options = [];
        if(limit > 50){
            for(let i = 0; i < 50; i++){
                options.push(i + 1);
            }
        } else {
            for(let i = 0; i < limit; i++){
                options.push(i + 1);
            }
        }
        return options;
    }

    return (  
        <div className='prompt-container'>
          <div className="category-container">
            <h3>Select a category:</h3>
            <select value={category} onChange={handleCategoryChange}>
              <option value={'any'}>Any Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="type-container">
            <h3>Select the difficulty:</h3>
            <select value={difficulty} onChange={handleDifficultyChange}>
              <option value='any'>Any</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
          <div className="amount-container">
            <h3>Select the amount of questions:</h3>
            <select value={amount} onChange={handleAmountChange}>
              {renderAmountOptions().map((num, i) => (
                <option key={i} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <button onClick={() => handleGenerateButton(category, amount, difficulty)}>Generate Questions</button>
        </div>
    );
}
 
export default Prompt;