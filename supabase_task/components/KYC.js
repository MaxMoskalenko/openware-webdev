import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function KYC({ session, handleSignOut }) {
    const [phone, setPhone] = useState(null)
    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [country, setCountry] = useState(null)
    const [city, setCity] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            const user = await supabase.auth.user()

            let { data, error, status } = await supabase
                .from('user_data')
                .select(`first_name, last_name, city, country, phone`)
                .eq('id', user.id)
                .single()
            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setPhone(data.phone)
                setLastName(data.last_name)
                setFirstName(data.first_name)
                setCountry(data.country)
                setCity(data.city)
            } else {
                const { data, error } = await supabase
                    .from('user_data')
                    .insert([
                        { id: user.id }
                    ])
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }
    async function updateData({ phone, first_name, last_name, country, city }) {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            const updates = {
                id: user.id,
                last_name: last_name,
                first_name: first_name,
                country: country,
                city: city,
                phone: phone,
                updated_at: new Date(),
            }

            if (last_name == '' || first_name == '' || country == '' || city == '' || phone == '' ||
                !last_name || !first_name || !country || !city || !phone) {
                alert("Some fields are empty");
                return
            }

            let { error } = await supabase.from('user_data').upsert(updates, {
                returning: 'minimal',
            })

            if (error) {
                throw error
            }
        } catch (error) {

            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            <div>
                <label htmlFor="fname">First Name</label>
                <input
                    id="fname"
                    type="text"
                    value={first_name || ''}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lname">Last Name</label>
                <input
                    id="lname"
                    type="text"
                    value={last_name || ''}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="text"
                    value={phone || ''}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input
                    id="country"
                    type="text"
                    value={country || ''}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    value={city || ''}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button block primary"
                    onClick={() => updateData({ first_name, last_name, phone, country, city })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                {/* <button className="button block" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button> */}
                <button className="button block" onClick={() => handleSignOut()}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}
