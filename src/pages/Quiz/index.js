/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";

function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestions, setDataQuestions] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopic(params.id);
      setDataTopic(response);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestion(params.id);
      setDataQuestions(response);
    }
    fetchApi();
  }, []);
  

  return (
    <>
      <h2>Bai Quiz chu de: {dataTopic && dataTopic[0]?.name}</h2>

      <div className="form-quiz"> 
        <form>
          {dataQuestions.map((item, index) => (
            <div className="form-quiz__item" key={item._id}>
              <p>Cau {index + 1}: {item.question}</p>
              {item.answers.map((itemAns, indexAns) => (
                <div className="form-quiz__answer" key={indexAns}>
                  <input type="radio" name={item._id} value={indexAns} id={`quiz-${item._id}-${indexAns}`} />
                  <label htmlFor={`quiz-${item._id}-${indexAns}`}>{itemAns}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">
            submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Quiz;

// Khi component mới render lần đầu, dataTopic chưa có giá trị (vẫn undefined) 
// → nếu viết thẳng dataTopic[0].name thì sẽ bị lỗi: