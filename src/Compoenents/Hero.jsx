import {logo} from '../assets'
export default function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
        <nav className="w-full flex justify-between items-center pt-3 mp-10">
        <img src={logo} alt="logo" className='w-32' />
        <button className='black_btn'>
            Git hub
        </button>
        </nav>
        <h1 className='head_text'>Summarize Articles with <br /> <span className='orange_gradient'>Sumz-AI</span></h1>
        <h2 className='desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum debitis quaerat animi veritatis consequuntur, dolorum, reiciendis perferendis recusandae deserunt totam cupiditate ducimus consequatur, repellendus natus. Adipisci ab tenetur fugiat eveniet?</h2>
    </header>
  )
}
