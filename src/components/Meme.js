import React from "react";
import {motion} from 'framer-motion'


export default function Meme() {
  const [meme, setMeme] = React.useState({
    top_text: "",
    bottom_text: "",
    img_src: "",
    show: false
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
    setMeme(prevInfo => {
      return {...prevInfo, 
        show:  true, 
        img_src: memes[randomNumber].url
      }})
  }
  
  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevInfo => {
      return { ...prevInfo, [name]: value}
    })
  }

  return (
    <section id="Meme_section">
      <div id="Form" className="row">
        <input
          type="text"
          className="col-5 input_text"
          placeholder="first text (top)"
          name="top_text"
          value={meme.top_text}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          className="col-5 input_text"
          placeholder="second text (bottom)"
          name="bottom_text"
          value={meme.bottom_text}
          onChange={handleChange}
        ></input>
        <button onClick={getRandomMem} className="col-12" id="btn_submit">
          Get a new meme image
        </button>
      </div>
      {meme.show && <div className="hidden" id="Meme">
        <motion.p drag className="Meme_text top">{meme.top_text}</motion.p>
        <img src={meme.img_src} alt="Meme" id="Meme_img" />
        <motion.p drag className="Meme_text bottom">{meme.bottom_text}</motion.p>
      </div>}
    </section>
  );
}
