import { Loader } from "lucide-react";

export const LoadingText = () => {

  const texts = [
    {
      text : '🔍',
      delayStep : 0
    },
    {
      text : '🔍',
      delayStep : 0.2
    },
    {
      text : '🔍',
      delayStep : 0.4
    }
  ]
  
  return (
    <>
      <div className='flex justify-center items-center  h-full '>

        {texts.map((item,index)=>(
          <div
            key={index}
            className="text-white animate-bounce  "
            style={{ 
              animationDelay : `${item.delayStep}s`, 
              animationFillMode: "both",
            }}
          >
            {item.text}
          </div>
        ))}

      </div>
    </>
  );
};


export const Spinner = ()=>{
  return (
    <div className=" animate-spin duration-400 ">
      <Loader size={20} />
    </div>
  )
}