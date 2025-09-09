/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionsService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";

function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestions, setDataQuestions] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedAnswers = [];

    for(let i = 0; i < e.target.elements.length; i++) { // e.target.elements.length nhung o input (dau tron)
      if(e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAnswers.push({
          questionId: name,
          answer: parseInt(value)
        });
      }
    }

    let options = {
      userId: getCookie("id"),
      topicId: params.id,
      answers: selectedAnswers
    };

    const response = await createAnswer(options);
    if(response) {
      navigate(`/result/${response.id}`);
    }
  }

  return (
    <>
      <h2>Bai Quiz chu de: {dataTopic && (<>{dataTopic.name}</>)}</h2>

      <div className="form-quiz"> 
        <form onSubmit={handleSubmit}>
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


/*
  Ta khong the nao cho {item.id} chỗ câu được vì có nhiều bài quiz id sẽ bắt đầu từ 40, 41 nếu
  mà item.id thế thì bắt đầu từ 40 à, nên là index.

  <input type="radio" name="" value="" id="" /> chỗ này thử để name rỗng, rồi để name là test xem thử nó như thế nào. 
  nếu để name rỗng thì nó sẽ tích hết, còn để name test thì nó sẽ chỉ tích được 1 câu, tích câu tiếp theo nó sẽ mất,
  name={item.id} đặt như này thì có nghĩa là cho mỗi cái ô input của mỗi câu nhóm chung lại là 1 id.
  nghĩa là cho cái ô input của câu 1 có id là 1, ô input câu 2 có id là 2.

  cái id thì đặt tên chi cũng được nhưng mà phải là chữ cái đứng đằng trước.

  value thì lưu cái kết quả của người chọn, ví dụ câu 1 người chọn chọn đáp án 2 thì lưu chỉ số là 1 để chập so sánh với cái 
  "correctAnswer": 2 của bên questions.


  <input type="radio" name={item.id} value={indexAns} id={`quiz-${item.id} /> nếu id của mình nối chỉ tới vậy thì trong một câu các ô tròn (trả lời)
  sẽ có cùng id nên là mình phải nối thêm <input type="radio" name={item.id} value={indexAns} id={`quiz-${item.id}-${indexAns}`} /> thì mỗi ô input trong mỗi câu sẽ
  không có cùng id, ví dụ câu 1 thì có 3 ô input thì 3 ô này đều có id khác nhau.

  trong react for là htmlFor.
*/