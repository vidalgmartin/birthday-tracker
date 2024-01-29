import Birthday from '../components/Birthday'
import BirthdayForm from '../components/BirthdayForm'

export default function BirthdayList() {
    
    return (
        <div className="birthday-page-container">
            <BirthdayForm />
            <div className="birthday-elements">
                Helloge
                <Birthday />
            </div>
        </div>
    )
}