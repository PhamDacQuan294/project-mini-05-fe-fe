/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionsService";
import "./Result.css";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswer(params.id);
      const dataQuestions = await getListQuestion(dataAnswers[0].topicId);

      let resultFinal = [];

      for (let i = 0; i < dataQuestions.length; i++) {
        resultFinal.push({
          ...dataQuestions[i],
          ...dataAnswers[0].answers.find(item => item.questionId === dataQuestions[i]._id) //
        })
      }

      setDataResult(resultFinal);
    }
    fetchApi();
  }, []);

  
  return (
    <>
      <h1>Ket qua:</h1>
      <div className="result__list">
        {dataResult.map((item, index) => (
          <div className="result__item" key={item._id}>
            <p>
              Cau {index + 1}: {item.question}

              {item.correctAnswer === item.answer ? (
                <span className="result__tag result__tag--true">Dung</span>
              ) : (
                <span className="result__tag result__tag--false">Sai</span>
              )}
            </p>
            {item.answers.map((itemAns, indexAns) => {
              let className = "";
              let checked = false;

              if(item.answer === indexAns) {
                checked = true;
                className = "result__item--selected";
              }

              if(item.correctAnswer === indexAns) {
                className += " result__item--result";
              }

              return (
                <div className="result__answer" key={indexAns}>
                  <input type="radio" checked={checked} disabled/>
                  <label className={className}>{itemAns}</label>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}

export default Result;