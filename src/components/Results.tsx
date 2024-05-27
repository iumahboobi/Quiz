import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ResultsState } from '../types/types';
import { Button } from './ConfirmationModal';


const Container = styled.div`
margin: 12px auto;
`

const HeaderOne = styled.h1`
text-align: center;
color: #832e14;
letter-spacing: 0.5cap;
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;`


const ResultsContainer = styled.div`
margin: 0 auto;
background-color: #1d426230;
padding: 36px;
`
const ResultCard = styled.div`
    background-color: white;
    padding: 20px;
    margin: 10px auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const Points = styled.div<{ isCorrect: boolean }>`
color: ${props => props.isCorrect ? 'green' : 'red'};
`
const TotalResult = styled.div`
display: flex;
justify-content: space-between;
`
const Total = styled.p`

font-weight: 500;
font-size: large;
color: #0e2829;

`


export const Results: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state as ResultsState

    if (!state) {
        return <p>No Results to Display</p>
    }
    const { selectedOptions, questions } = state;

    // 1. calculate total

    const totalPoints = questions.reduce((total, question, index) => {
        const isAnswerCorrect = selectedOptions[index] === questions[index].correctAnswer
        return total + (isAnswerCorrect ? question.point : 0)
    }, 0)


    return (<ResultsContainer>

        <Container>
            <HeaderOne>Result</HeaderOne>
            {questions.map((question, index) => {

                const isCorrect = selectedOptions[index] === question.correctAnswer
                const points = isCorrect ? question.point : 0
                return (
                    <ResultCard>
                        <p>{`${question.text}`}</p>
                        <p>Your Answer:
                            <span style={{ color: isCorrect ? 'green' : 'red' }} > {`${selectedOptions[index]}`}</span>
                        </p>
                        <p>Correct Answer:
                            <span style={{ color: 'green' }} > {`${questions[index].correctAnswer}`}</span>
                        </p>
                        <Points isCorrect={isCorrect}>
                            Points Awarded : {points}
                        </Points>
                    </ResultCard>
                )


            })}

            <TotalResult>
                <Button onClick={() => navigate('/')}>Back to Quiz</Button>
                <Total>Total : {totalPoints} </Total>
            </TotalResult>
        </Container>

    </ResultsContainer>)
}