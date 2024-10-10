import './Result.css' 
import data from './../JSON/ResultExp.json' 

interface DataType {
  title: string ,
  personality: string[] ,
  onTheTop: string[] ,
  personalityThings1: string ,
  perList1: string[] ,
  personalityThings2: string ,
  perList2: string[] ,
  personalityThings3: string ,
  growingUp: string ,
  grownigList: string[] ,
  sugGrown: string ,
  sugGrownList: string[] ,
  stress: string ,
  jobSatisfactionList: string[] ,
  jobs: string 
}
  
export default function Result() {
  const personType = localStorage.getItem('result')
  const dataArr: DataType = data[personType as keyof typeof data] 

  return (
    <main className='main-elem'>
      <section className='main-section'>
        <div className='type'>
          <h3>تیپ شخصیت شما:</h3>
          <h1>{personType}</h1>
          <h2>{dataArr.title}</h2>
        </div>
        <div className='type-exp'>
            <p>{dataArr.onTheTop}</p>
        </div>
      </section>
      <section className='personality-section'>
        <h2>خصوصیات شخصیتی</h2>
        <div className='personality-items'>
            <div className="personality">
              {dataArr.personalityThings1}
            </div>
            <div className="personality">
              {dataArr.personalityThings2}
            </div>
            <div className="personality">
              {dataArr.personalityThings3}
            </div>
        </div>
      </section>
      <section className='growing'>
        <h2>حوزه های بالقوه برای رشد <i className="bi bi-bar-chart-fill"></i></h2>
        <p>{dataArr.growingUp}</p>
        <ul className='list-parent'>
          {dataArr.grownigList.map((item , index) => <li key={index} className='grwon-list'>{item}</li>)}
        </ul>
        <p>{dataArr.sugGrown}</p>
        <ul className='list-parent'>
          {dataArr.sugGrownList.map((item , index) => <li key={index} className='grwon-list'>{item}</li>)}
        </ul>
      </section>
      <div className='stress'>
        <p>{dataArr.stress}</p>
      </div>
      <section className='job-satisfaction'>
        <h2>رضایت شغلی تیپ‌های {personType} با انجام کارهایی با شرایط زیر حاصل می‌شود: <i className="bi bi-gear-wide"></i></h2>
        <ul className='list-parent2'>
          {dataArr.jobSatisfactionList.map((item,index) => <li className='items' key={index}>{item}</li>)}
        </ul>
      </section>
      <section className='jobs'>
        <h2>شغل های مناسب برای {personType}</h2>
        <p>{dataArr.jobs}</p>
      </section>
    </main>
  ) 
}