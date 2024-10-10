import Question from '../Question/Question'
import './Container.css'

export default function Container () { 
    return (
        <div  className="main-parent">
            <div className='question-container'>
                <Question/>
            </div>
        </div>
    )
}

