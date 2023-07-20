import { useState ,useEffect } from "react"
import {copy, linkIcon,loader,tick} from '../assets'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
// import { Article } from "@mui/icons-material";
import { useRef } from "react";


export default function Demo() {

  const [article,setarticle] = useState({
    URL:"",
    summary:""
  })
  const [history,sethistory] = useState([]) 
  const [isloading,setloading]= useState(false)
  const [error,seterror]=useState(false)
  const [errormsg,seterrormsg]=useState('')
  const [ishidden, sethiden] = useState(false)
  const [copied ,setcopied] = useState('')
  const myInputRef = useRef();









 useEffect(()=> {
    const history = JSON.parse(localStorage.getItem('articles'))
    if(history){
      sethistory(history)
    }
 },[])



 useEffect(() => {
  // This effect will run whenever the loading state changes
  if (!isloading) {
    const inputElement = myInputRef.current;
    if (inputElement) {
      inputElement.value = '';
    }
  }
}, [isloading]);



 async function handleform(e){
    e.preventDefault()
    setloading(true)
    sethiden(true)
        const options = {
          method: 'GET',
          url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
          params: {
            url: article.URL,
            length: '4'
          },
          headers: {
            'X-RapidAPI-Key': '5db409be98msh3def7fa02c9542cp1084b1jsnb03143c1c66c',
            'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
          }
        };

        try {
          const response = await axios.request(options);
          const data = response.data
          if(data?.summary){
            const alldata = {...article,summary:data.summary}
            const historydata = [alldata,...history]
            sethistory(historydata)
            setarticle(alldata)
            localStorage.setItem('articles',JSON.stringify(historydata))
            setloading(false)
            sethiden(false)
             myInputRef.current.value = '' ;
          }
        } catch (error) {
          seterror(true)
          seterrormsg(error)
        }
  }

  function handleCopy(copyurl){
    setcopied(copyurl)
    navigator.clipboard.writeText(copyurl)
    setTimeout(() => {
      setcopied('')
    }, 3000);
  }









  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col gap-3 w-full">
        <form className="relative flex justify-center items-center" onSubmit={handleform}>
          <img src={linkIcon} alt="link icon" className="absolute left-0 ml-3 w-5" />
          <input type="url" value={article.URL} onChange={(e)=>{setarticle({...article,URL:e.target.value})}} placeholder="Enter a URL" className="url_input peer"
          required
          ref={myInputRef}
         />
          <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            <SendIcon></SendIcon>
            </button>
        </form>
        <div className="max-h-60 flex flex-col gap-1 overflow-y-auto">
          {history.map((items,index)=>(
            <div key={`link-${index}`} 
            onClick={()=>{setarticle(items)}}
            className='link_card'
            >
              <div className="copy_btn">
                <img src={copied === items.URL ? tick : copy}
                 alt="copy-icon"
                  className="w-[60%] h-[60%] object-contain" 
                  onClick={()=>{handleCopy(items.URL)}}               
                />
              </div>
                <p className="font-satoshi text-blue-500 text-sm font-medium truncate">{items.URL}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 w-max-full flex justify-center items-center">
        {
          isloading && <img src={loader} alt="loader" className="w-20 h-20 object-contain"></img>
        }
        {
          error && <p className="font-inter font-bold  text-white text-center bg-red-700 px-4 py-3">well an error happen : <span className="text-sm font-satoshi ita">{errormsg}</span></p>
        }
        {article.summary && (
          <div className={`flex flex-col gap-3 ${ishidden?"hidden":''}`}>
            <h2 className="font-satoshi font-bold text-gray-600 text-xl">Article <span className="blue_gradient">Summary</span></h2>
            <div className="summary_box">
              <p className="font-inter font-medium text-sm">{article.summary}</p>
            </div>

          </div>
        )}

      </div>


    </section>
  )
}
