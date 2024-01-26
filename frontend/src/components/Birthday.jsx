import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Birthday() {
    const [birthdays, setBirthdays] = useState([])

    useEffect(() => {
        const fetchBirthdays = async () => {
            const res = await axios.get('/api/birthdays/')
            setBirthdays(res.data)
        }

        fetchBirthdays()
    }, [])
    
    return (
        <>
            {birthdays && birthdays.map((birthday) => (
                <div className="birthday-item" key={birthday._id}>
                    <div className="birthday-name">
                        <p>{birthday.name}</p>
                        <p>{birthday.birthday}</p>
                    </div>
                </div>
            ))}
        </>
    )
}