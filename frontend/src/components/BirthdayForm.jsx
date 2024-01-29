import { useState } from 'react'

export default function BirthdayForm() {
    const  [ name, setName ] = useState('')
    const [ birthday, setBirthday ] = useState('')
    const [ error, setError ] = useState(null)
    
    const handleSubmit = async (e) =>  {
        e.preventDefault()

        if(!name || !birthday) {
            setError('Please fill in the blanks')
            return
        }

        const response = await fetch('/api/birthdays', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, birthday })
        })

        if(!response.ok) {
            console.error('Failed to submit birthday')
            return
        }
        else {
            // extract and parse the json data for a cleaner response
            const json = await response.json()

            setName('')
            setBirthday('')
            setError(null)
            console.log('Submitted successfully:', json);
        }
    }

    return (
        <div className="birthday-form-container">

            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    className="name-input"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label>Birthday:</label>
                <input
                    className="birthday-input"
                    type="text"
                    onChange={(e) => setBirthday(e.target.value)}
                    value={birthday}
                />

                <button>Submit</button>
                {error && <div className="error">{error}</div>}
            </form>

        </div>
    )
}