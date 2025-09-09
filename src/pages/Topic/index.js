import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicService";

function Topic() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTopic();
      setTopics(response);
    }
    fetchApi();
  }, []);

  return (
    <>
      <h2>Danh sach chu de</h2>

      {topics.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ten chu de</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {topics.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={"/quiz/" + item._id}>Lam bai</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Topic;