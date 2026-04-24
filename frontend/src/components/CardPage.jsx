import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Livecard from "./Livecard";

function CardPage() {
  const { id } = useParams();
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/card/${id}`)
      .then(res => setCardData(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!cardData) return <p>Loading...</p>;

  return <Livecard formData={cardData} />;
}

export default CardPage;