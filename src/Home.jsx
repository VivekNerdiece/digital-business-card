import { useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import Livecard from "./components/Livecard";
import './App.css'
import Navbar from "./components/Navbar/Navbar"

function Home({ setCardLink , cardLink}) {

  const [formData, setFormData] = useState({
    prefix: "",
    firstname: "",
    lastname: "",
    company: "",
    jobtitle: "",
    address: "",
    state: "",
    country: "",
    profilePicture: "",
    brandImage: "",
    actions: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "actions") {
        data.append("actions", JSON.stringify(formData.actions));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const res = await axios.post("http://localhost:5000/userdetails", data);

      const cardId = res.data.cardId;
      const cardURL = `http://localhost:5174/card/${cardId}`;

      setCardLink(cardURL);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
  <Navbar />
  
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-hidden"> 

      <div className="flex-1 min-w-0 p-4">
        <Form
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      </div>

      <div className="w-full lg:w-[350px] max-w-full flex justify-center">
        <div className="phone-frame ">
          <div className="phone-notch"></div>

          <div className="phone-screen">
           
            <Livecard formData={formData} cardLink={cardLink} />
          </div>
        </div>
      </div>

    </div>
    </div>
  );
}

export default Home;