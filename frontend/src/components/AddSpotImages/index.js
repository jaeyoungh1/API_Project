
import { useState } from 'react'

export const AddSpotImage = () => {
    const [url, setUrl] = useState('')

    if (url.length < 1) setUrl('https://www.electricmirror.com/portfolio-items/aria-4/image-coming-soon/')

    return (
        <form>
            <label className='create-spot-input-title'>Preview Image URL</label>
            <div className='create-spot-input'>
                <input
                    type='text'
                    placeholder='https://....'
                    value={url}
                    onChange={e => setUrl(e.target.value)}>
                </input>
            </div>
        </form>
    )
}