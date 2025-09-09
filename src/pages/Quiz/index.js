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
    </>
  )
}

export default Quiz;

// Khi component mới render lần đầu, dataTopic chưa có giá trị (vẫn undefined) 
// → nếu viết thẳng dataTopic[0].name thì sẽ bị lỗi: