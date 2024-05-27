import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PrevArrow, NextArrow } from './CustomArrows';
import styled from 'styled-components';
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';

interface Question {
    text: string;
    options: string[];
    correctAnswer: string;
    point: number
}

const questions: Question[] = [
    {
        text: 'What is the capital of Afghanistan?',
        options: ['Brunei', 'Islamabad', 'Kabul', 'Tokyo'],
        correctAnswer: 'Kabul',
        point: 5
    },
    {
        text: 'What is the capital of Germany?',
        options: ['New York', 'Ankara', 'Berlin', 'Bern'],
        correctAnswer: 'Berlin',
        point: 5
    },
    {
        text: 'What is the capital of China?',
        options: ['Jerusalem', 'Beijing', 'Colombo', 'New Delhi'],
        correctAnswer: 'Beijing',
        point: 5
    },

];

export const QuizContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 12px;
`;

const StyledSlider = styled(Slider)`

.slick-slide {

   
}
`

const QuizTitle = styled.h1`
    text-align: center;
`;

const QuestionSlide = styled.div`
    background-color: #2ca6ad23;
`;

const QuestionSlideContainer = styled.div`

border: solid 2px #12545354 ;
`

const FlexContainer = styled.div`
display: flex;
justify-content: space-between;
padding: 0 32px;
justify-items: center;
`

const Form = styled.form`
text-align: left;
padding: 0 32px;
`

const Option = styled.div`
    margin-bottom: 10px;
`;

const Button = styled.button`
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #2ca6ad;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;


const Pages = styled.p `

text-align: center;
`

/**const Answer = styled.p<{ isCorrect: boolean }>`
    color: ${props => props.isCorrect ? 'green' : 'red'};
`; */

export const Quiz: React.FC = () => {

    //create an array for questions whose initial values are null or string
    const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>(Array(questions.length).fill(null))
    const [isAnswered, setIsAnswered] = useState<boolean[]>(Array(questions.length).fill(false))
    const [correctAnswers, setCorrectAnswers] = useState<boolean[]>(Array(questions.length).fill(false))
    const[isModalOpen,setIsModalOpen] =useState<boolean>(false)
    const navigate=useNavigate()

    const handleOptionChange = (index: number, option: string) => {

        //1. Selected cities added to array called selecteOptions
        const newSelectedOptions = [...selectedOptions]
        newSelectedOptions[index] = option
        setSelectedOptions(newSelectedOptions)

        //2. is Question answered?
        const newIsAnswered = [...isAnswered]
        newIsAnswered[index] = true
        setIsAnswered(newIsAnswered)

        //3. is question correctly answered?

        const newCorrectAnswers = [...correctAnswers]
        let correctAnswer = questions[index].correctAnswer
        newCorrectAnswers[index] = option === correctAnswer
        setCorrectAnswers(newCorrectAnswers)
    }
    const handleSubmit = () => {
        setIsModalOpen(true);
        
    };

    const handleConfirm =()=> {

        // 1. First we close confirmation modal and navigate to the Result component
        setIsModalOpen(false)
        navigate('/results',{state:{selectedOptions,correctAnswers,questions}})
    
    }

    const settings = {
        dots:false,
        infinite:false,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
        prevArrow: <PrevArrow/>,
        nextArrow:<NextArrow/>

    }

    return (
        <QuizContainer>
            <QuizTitle>Quiz</QuizTitle>
            <StyledSlider {...settings}>

                {questions.map((question, index) => (
                    <QuestionSlide key={index} >
                        <QuestionSlideContainer>
                            
                            <FlexContainer>
                                <p>{`${question.text}`}</p>
                                <p>{`Points: ${question.point}`}</p>
                            </FlexContainer>
                            <Form>
                                {question.options.map((option, optionIndex) => (
                                    <Option key={optionIndex}>
                                        <label>{option}
                                            <input type='radio' name={`question-${index}`} value={option} checked={selectedOptions[index] === option} onChange={() => handleOptionChange(index, option)} />
                                        </label>
                                    </Option>
                                ))}
                            </Form>
                            <Pages>{`${index + 1} / ${questions.length}`}</Pages>
                        </QuestionSlideContainer>
                    </QuestionSlide>
                ))}
            </StyledSlider>
            <Button onClick={handleSubmit}>Submit Test</Button>
                <ConfirmationModal isOpen={isModalOpen} onRequestClose={()=> setIsModalOpen(false)} onConfirm={handleConfirm} />
        </QuizContainer>
    );
};
