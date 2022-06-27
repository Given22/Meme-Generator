import React from "react";


export default function Meme() {
  const [meme, setMeme] = React.useState({
    top_text: "",
    bottom_text: "",
    img_src: "",
  });
  
  const [memesData, setMemes] = React.useState('')
  
  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(data => setMemes(data.data.memes))
  }, [])
  
  async function getRandomMem() {
    const memes = memesData;
    const randomNumber = Math.floor(Math.random() * memes.length);
    setImg_src(await memes[randomNumber].url);
    document.getElementById("Meme").style.display = "flex";
  }
  
  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevInfo => {
      return { ...prevInfo, [name]: value}
    })
  }
  
  function setImg_src(url) {
    setMeme(function (prev) {
      return { ...prev, img_src: url };
    });
  }

  return (
    <section id="Meme_section">
      <div id="Form" className="row">
        <input
          type="text"
          className="col-5 input_text"
          placeholder="Top Text"
          name="top_text"
          value={meme.top_text}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          className="col-5 input_text"
          placeholder="Bottom Text"
          name="bottom_text"
          value={meme.bottom_text}
          onChange={handleChange}
        ></input>
        <button onClick={getRandomMem} className="col-12" id="btn_submit">
          Get a new meme image
        </button>
      </div>
      <div className="hidden" id="Meme">
        <p className="Meme_text top">{meme.top_text}</p>
        <img src={meme.img_src} alt="Meme" id="Meme_img" />
        <p className="Meme_text bottom">{meme.bottom_text}</p>
      </div>
    </section>
  );
}
